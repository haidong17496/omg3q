// src/components/planning/PlanDetailView.js
import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../../theme/Theme';
import { calculatePlanResources, calculateDaysToGoal } from '../../utils/CalculatorLogic';
import { formatNumber } from '../../utils/format';

import TargetSelector from './TargetSelector';
import EventOptimizer from './EventOptimizer';

export default function PlanDetailView({ plan, onSave, onClose, categories, globalFarmRates, insets }) {
  const [planName, setPlanName] = useState(plan.planName || 'Kế hoạch mới');
  const [targets, setTargets] = useState(plan.targets || []);
  const [inventory, setInventory] = useState(plan.inventory || {});
  const [invInputText, setInvInputText] = useState({});
  const [lastInventoryState, setLastInventoryState] = useState(null);

  const [showTargetSelector, setShowTargetSelector] = useState(false);
  const [showOptimizer, setShowOptimizer] = useState(false);

  useEffect(() => {
    const initText = {};
    Object.keys(inventory).forEach(k => {
      initText[k] = inventory[k] === 0 ? '' : parseFloat(inventory[k].toFixed(4)).toString();
    });
    setInvInputText(initText);
  }, []); 

  const neededResources = useMemo(() => {
    if (targets.length === 0) return {};
    return calculatePlanResources(targets, categories);
  }, [targets, categories]);

  const analysisResult = useMemo(() => {
    if (!neededResources) return null;
    return calculateDaysToGoal(neededResources, inventory, {}, globalFarmRates);
  }, [neededResources, inventory, globalFarmRates]);

  const handleSave = () => {
    onSave({ ...plan, planName, targets, inventory });
  };

  const parseSmartInput = (text) => {
    if (!text) return 0;
    if (text.includes('/')) {
      const [n, d] = text.split('/');
      return parseFloat(d) !== 0 ? parseFloat(n) / parseFloat(d) : 0;
    }
    return parseFloat(text) || 0;
  };

  const updateInventoryItem = (code, textVal) => {
    setInvInputText(prev => ({ ...prev, [code]: textVal }));
  };

  const finalizeInventoryItem = (code) => {
    const val = parseSmartInput(invInputText[code]);
    setInventory(prev => ({ ...prev, [code]: val }));
    setInvInputText(prev => ({ 
      ...prev, 
      [code]: val === 0 ? '' : parseFloat(val.toFixed(4)).toString() 
    }));
  };

  const handleApplyOptimizer = (allocation) => {
    setLastInventoryState({ ...inventory });
    const newInv = { ...inventory };
    Object.keys(allocation).forEach(code => {
      newInv[code] = (newInv[code] || 0) + allocation[code];
    });
    setInventory(newInv);
    
    const newText = { ...invInputText };
    Object.keys(newInv).forEach(k => {
      newText[k] = newInv[k] === 0 ? '' : parseFloat(newInv[k].toFixed(4)).toString();
    });
    setInvInputText(newText);
    setShowOptimizer(false);
  };

  const handleUndo = () => {
    if (lastInventoryState) {
      setInventory(lastInventoryState);
      const newText = {};
      Object.keys(lastInventoryState).forEach(k => {
        newText[k] = lastInventoryState[k] === 0 ? '' : parseFloat(lastInventoryState[k].toFixed(4)).toString();
      });
      setInvInputText(newText);
      setLastInventoryState(null);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={{padding: 5}}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <TextInput style={styles.titleInput} value={planName} onChangeText={setPlanName} placeholder="Tên kế hoạch..." placeholderTextColor="#666"/>
        <TouchableOpacity onPress={handleSave} style={styles.saveBtn}>
          <MaterialCommunityIcons name="content-save-check" size={24} color={COLORS.primary} />
          <Text style={styles.saveText}>LƯU</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0} 
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          
          {/* SECTION 1: MỤC TIÊU */}
          <View style={styles.section}>
            <View style={styles.secHeader}>
              <Text style={styles.secTitle}>1. MỤC TIÊU ({targets.length})</Text>
              <TouchableOpacity onPress={() => setShowTargetSelector(true)} style={styles.addBtn} hitSlop={{top:10, bottom:10, left:10, right:10}}>
                <Text style={styles.addBtnText}>+ THÊM</Text>
              </TouchableOpacity>
            </View>
            {targets.map((t, idx) => (
              <View key={idx} style={styles.targetItem}>
                <View style={{flex: 1}}>
                  <Text style={styles.catName}>{categories.find(c => c.id === t.catId)?.name}</Text>
                  <Text style={styles.pathText}>{t.start.type} [{t.start.tier}.{t.start.step}] ➜ {t.end.type} [{t.end.tier}.{t.end.step}]</Text>
                </View>
                <TouchableOpacity onPress={() => setTargets(prev => prev.filter((_, i) => i !== idx))} style={{padding: 8}}>
                  <MaterialCommunityIcons name="minus-circle-outline" size={20} color="#666" />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {/* DASHBOARD */}
          {analysisResult && (
            <View style={styles.dashboard}>
              <Text style={styles.dashLabel}>DỰ KIẾN HOÀN THÀNH</Text>
              <Text style={styles.dashValue}>{analysisResult.totalDays} <Text style={{fontSize: 20}}>Ngày</Text></Text>
              <View style={styles.dashActions}>
                <TouchableOpacity style={styles.actionBtn} onPress={() => setShowOptimizer(true)}>
                  <MaterialCommunityIcons name="gift-outline" size={18} color="#fff" />
                  <Text style={styles.actionText}>CÂN BẰNG</Text>
                </TouchableOpacity>
                {lastInventoryState && (
                   <TouchableOpacity style={[styles.actionBtn, {borderColor: '#FFA500'}]} onPress={handleUndo}>
                    <MaterialCommunityIcons name="undo-variant" size={18} color="#FFA500" />
                    <Text style={[styles.actionText, {color: '#FFA500'}]}>HOÀN TÁC</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}

          {/* SECTION 2: KHO ĐỒ */}
          {analysisResult && (
            <View style={styles.section}>
              <Text style={styles.secTitle}>2. CHI TIẾT KHO ĐỒ</Text>
              <View style={styles.tableHeader}>
                <Text style={[styles.colName, {flex: 3, textAlign: 'left'}]}>NGUYÊN LIỆU</Text>
                <Text style={[styles.colName, {flex: 1, textAlign: 'center'}]}>CẦN</Text>
                <Text style={[styles.colName, {flex: 1, textAlign: 'center'}]}>CÓ</Text>
              </View>
              {analysisResult.resourceAnalysis.map(res => (
                <View key={res.code} style={styles.row}>
                  <View style={{flex: 3}}>
                    <Text style={[styles.resName, {color: res.color}]} numberOfLines={1}>{res.short_name}</Text>
                    <Text style={styles.daysLeft}>{res.days === '∞' ? '---' : `${res.days}n nữa`}</Text>
                  </View>
                  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={[styles.cellValue, {color: '#fff'}]}>{formatNumber(res.total_needed)}</Text>
                  </View>
                  <View style={{flex: 1}}>
                    <TextInput 
                      style={styles.inputCell} 
                      keyboardType="default"
                      value={invInputText[res.code] || ''}
                      onChangeText={(v) => updateInventoryItem(res.code, v)}
                      onEndEditing={() => finalizeInventoryItem(res.code)}
                    />
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Khoảng trống lớn ở đáy để đẩy input lên khi keyboard hiện */}
          <View style={{height: 300}} />
        </ScrollView>
      </KeyboardAvoidingView>

      <TargetSelector 
        visible={showTargetSelector} 
        categories={categories}
        onClose={() => setShowTargetSelector(false)}
        onConfirm={(item) => {
          setTargets([...targets, item]);
          setShowTargetSelector(false);
        }}
      />

      <EventOptimizer 
        visible={showOptimizer}
        onClose={() => setShowOptimizer(false)}
        onApply={handleApplyOptimizer}
        activePlanNeeded={neededResources}
        currentInventory={inventory}
        globalFarmRates={globalFarmRates}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderBottomColor: '#222' },
  titleInput: { flex: 1, color: '#fff', fontSize: 18, fontWeight: 'bold', marginHorizontal: 10 },
  saveBtn: { alignItems: 'center' },
  saveText: { color: COLORS.primary, fontSize: 10, fontWeight: 'bold' },
  scrollContent: { padding: 16 },
  section: { marginBottom: 25 },
  secHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  secTitle: { color: '#888', fontSize: 11, fontWeight: '900', letterSpacing: 1 },
  addBtn: { backgroundColor: '#222', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12 },
  addBtnText: { color: COLORS.primary, fontSize: 10, fontWeight: 'bold' },
  targetItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0a0a0a', padding: 12, borderRadius: 10, marginBottom: 8, borderWidth: 1, borderColor: '#1a1a1a' },
  catName: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
  pathText: { color: '#666', fontSize: 11, marginTop: 2 },
  
  dashboard: { backgroundColor: '#0f0f12', padding: 20, borderRadius: 20, alignItems: 'center', marginBottom: 25, borderWidth: 1, borderColor: COLORS.primary },
  dashLabel: { color: COLORS.primary, fontSize: 10, fontWeight: 'bold' },
  dashValue: { color: '#fff', fontSize: 40, fontWeight: '900', marginVertical: 5 },
  dashActions: { flexDirection: 'row', gap: 10, marginTop: 10 },
  actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#444', backgroundColor: '#1a1a1a' },
  actionText: { color: '#fff', fontSize: 11, fontWeight: 'bold' },

  tableHeader: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#222', paddingBottom: 8, marginBottom: 8 },
  colName: { color: '#666', fontSize: 10, fontWeight: 'bold' },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#111' },
  resName: { fontWeight: 'bold', fontSize: 13 },
  daysLeft: { color: '#fff', fontSize: 9, marginTop: 2 },
  cellValue: { textAlign: 'center', fontWeight: 'bold', fontSize: 13 },
  inputCell: { flex: 1, backgroundColor: '#0a0a0a', color: COLORS.primary, textAlign: 'center', padding: 8, borderRadius: 8, borderWidth: 1, borderColor: '#222', fontWeight: 'bold' }
});