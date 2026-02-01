// src/components/planning/EventOptimizer.js
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../theme/Theme';
import { optimizeEventAllocation, calculateDaysToGoal } from '../../utils/CalculatorLogic';
import { formatNumber } from '../../utils/format';

export default function EventOptimizer({ visible, onClose, onApply, activePlanNeeded, currentInventory, globalFarmRates }) {
  const insets = useSafeAreaInsets();
  const [balanceGroups, setBalanceGroups] = useState([{ id: Date.now(), selection: [], budget: '', rates: {} }]);
  const [batchResult, setBatchResult] = useState(null);

  const scrollRef = useRef(null);
  const prevGroupsLen = useRef(1);

  useEffect(() => {
    if (visible && balanceGroups.length > prevGroupsLen.current) {
      setTimeout(() => {
        scrollRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
    prevGroupsLen.current = balanceGroups.length;
  }, [balanceGroups.length, visible]);

  // --- LOGIC GỢI Ý (ADVICE) ---
  const bottleneckAdvice = useMemo(() => {
    if (!activePlanNeeded) return null;
    const analysis = calculateDaysToGoal(activePlanNeeded, currentInventory, {}, globalFarmRates).resourceAnalysis;
    const list = analysis.filter(r => r.remaining > 0);
    if (list.length < 1) return null;

    list.sort((a, b) => {
      const da = a.days === '∞' ? 9999999 : a.days;
      const db = b.days === '∞' ? 9999999 : b.days;
      return db - da;
    });

    const first = list[0];
    const second = list[1] || null;
    const third = list[2] || { days: 0 }; 
    let tDays = (third && third.days !== '∞') ? third.days : (second && second.days !== '∞' ? second.days : 0);

    let n1 = 0, n2 = 0, isInf = false;
    if (first.days === '∞') { n1 = first.remaining; isInf = true; }
    else n1 = Math.ceil((first.days - tDays) * (first.rate || 0));

    if (second) {
      if (second.days === '∞') { n2 = second.remaining; isInf = true; }
      else if (second.days > tDays) n2 = Math.ceil((second.days - tDays) * (second.rate || 0));
    }

    return { first, second, tDays, n1, n2, isInf };
  }, [activePlanNeeded, currentInventory, globalFarmRates]);

  const parseSmartInput = (text) => {
    if (!text) return 0;
    if (text.includes('/')) {
      const [n, d] = text.split('/');
      return parseFloat(d) !== 0 ? parseFloat(n) / parseFloat(d) : 0;
    }
    return parseFloat(text) || 0;
  };

  const runBatchOptimization = () => {
    let simInv = { ...currentInventory };
    let totalAlloc = {};
    let groupRes = [];

    for (const group of balanceGroups) {
      if (group.selection.length === 0) continue;
      const budget = parseInt(group.budget) || 0;
      if (budget <= 0) continue;

      const groupRates = {};
      group.selection.forEach(c => groupRates[c] = parseSmartInput(group.rates[c] || '1'));

      const res = optimizeEventAllocation(group.selection, activePlanNeeded, simInv, globalFarmRates, budget, groupRates);
      
      Object.keys(res.allocation).forEach(c => {
        simInv[c] = (simInv[c] || 0) + res.allocation[c];
        totalAlloc[c] = (totalAlloc[c] || 0) + res.allocation[c];
      });
      groupRes.push({ id: group.id, chestsUsed: res.chestsUsed });
    }

    const final = calculateDaysToGoal(activePlanNeeded, simInv, {}, globalFarmRates);
    setBatchResult({ totalAllocation: totalAlloc, groupResults: groupRes, finalDays: final.totalDays });
  };

  const handleApply = () => {
    if (batchResult) onApply(batchResult.totalAllocation);
  };

  if (!visible) return null;

  return (
    <View style={[styles.container, { 
      paddingTop: Math.max(insets.top + 10, 20), 
      paddingBottom: Math.max(insets.bottom + 10, 20),
      paddingHorizontal: 16
    }]}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>TỐI ƯU HÓA SỰ KIỆN</Text>
          <TouchableOpacity onPress={onClose}><MaterialCommunityIcons name="close" size={24} color="#fff" /></TouchableOpacity>
        </View>

        {bottleneckAdvice && (
          <View style={styles.adviceBox}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
              <MaterialCommunityIcons name={bottleneckAdvice.isInf ? 'alert-octagon' : 'lightbulb-on'} size={16} color={bottleneckAdvice.isInf ? '#ff4444' : COLORS.primary} />
              <Text style={[styles.adviceTitle, bottleneckAdvice.isInf && { color: '#ff4444' }]}>GỢI Ý TẬP TRUNG</Text>
            </View>
            <View>
              {bottleneckAdvice.n1 > 0 && <AdviceLine item={bottleneckAdvice.first} amount={bottleneckAdvice.n1} />}
              {bottleneckAdvice.second && bottleneckAdvice.n2 > 0 && <AdviceLine item={bottleneckAdvice.second} amount={bottleneckAdvice.n2} />}
              <Text style={styles.adviceFooter}>➜ Mục tiêu: Đưa về <Text style={{color: COLORS.primary}}>{bottleneckAdvice.tDays} ngày</Text>.</Text>
            </View>
          </View>
        )}

        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{flex: 1}}>
          <ScrollView ref={scrollRef} style={{ flex: 1 }} contentContainerStyle={{ padding: 15 }} keyboardShouldPersistTaps="handled">
            {balanceGroups.map((group, idx) => (
              <View key={group.id} style={styles.groupBox}>
                <View style={styles.groupHeader}>
                  <Text style={styles.groupTitle}>NHÓM {idx + 1}</Text>
                  {balanceGroups.length > 1 && (
                    <TouchableOpacity onPress={() => setBalanceGroups(prev => prev.filter(g => g.id !== group.id))}>
                      <MaterialCommunityIcons name="delete-circle" size={24} color="#ff4444" />
                    </TouchableOpacity>
                  )}
                </View>

                <View style={styles.resGrid}>
                  {activePlanNeeded && Object.values(activePlanNeeded).map(res => (
                    <TouchableOpacity key={res.code} 
                      style={[styles.resBtn, group.selection.includes(res.code) && styles.resBtnActive]}
                      onPress={() => {
                          setBalanceGroups(prev => prev.map(g => {
                            if (g.id !== group.id) return g;
                            const isSel = g.selection.includes(res.code);
                            const newSel = isSel ? g.selection.filter(c => c !== res.code) : [...g.selection, res.code];
                            return { ...g, selection: newSel };
                          }));
                      }}>
                      <Text style={[styles.resBtnText, group.selection.includes(res.code) && { color: '#000' }]}>{res.short_name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {group.selection.map(code => (
                  <View key={code} style={styles.rateRow}>
                    <Text style={styles.rateLabel}>• {activePlanNeeded[code]?.short_name}</Text>
                    <TextInput style={styles.rateInput} value={group.rates[code] || '1'} 
                      onChangeText={v => setBalanceGroups(prev => prev.map(g => g.id === group.id ? {...g, rates: {...g.rates, [code]: v}} : g))} />
                    <Text style={styles.unitText}>SL/Rương</Text>
                  </View>
                ))}

                <TextInput style={styles.budgetInput} placeholder="Tổng số rương..." placeholderTextColor="#444" 
                  keyboardType="numeric" value={group.budget}
                  onChangeText={v => setBalanceGroups(prev => prev.map(g => g.id === group.id ? {...g, budget: v} : g))} />
              </View>
            ))}

            {/* PHẦN HIỂN THỊ KẾT QUẢ ĐÃ ĐƯỢC KHÔI PHỤC */}
            {batchResult && (
              <View style={styles.resultBox}>
                <Text style={styles.resultHeader}>KẾT QUẢ ĐỀ XUẤT</Text>
                
                {batchResult.groupResults.map((gr, idx) => (
                  <View key={gr.id} style={styles.resultGroup}>
                    <Text style={styles.resultGroupTitle}>NHÓM {idx + 1}:</Text>
                    {Object.keys(gr.chestsUsed).map(code => {
                      if (gr.chestsUsed[code] <= 0) return null;
                      return (
                        <View key={code} style={styles.resultRow}>
                          <Text style={styles.resultLabel}>{activePlanNeeded[code]?.short_name}</Text>
                          <Text style={styles.resultValue}>Dùng <Text style={{color: COLORS.primary}}>{gr.chestsUsed[code]}</Text> Rương</Text>
                        </View>
                      );
                    })}
                  </View>
                ))}

                <Text style={styles.resultDays}>Thời gian mới: {batchResult.finalDays} Ngày</Text>
                
                <TouchableOpacity style={styles.applyBtn} onPress={handleApply}>
                  <Text style={{color: '#fff', fontWeight: 'bold'}}>ÁP DỤNG VÀO KHO</Text>
                </TouchableOpacity>
              </View>
            )}
            
            <View style={{height: 200}} />
          </ScrollView>
        </KeyboardAvoidingView>
        
        <View style={styles.footer}>
           <TouchableOpacity style={styles.footerBtn} onPress={() => setBalanceGroups([...balanceGroups, {id: Date.now(), selection: [], budget: '', rates: {}}])}>
             <MaterialCommunityIcons name="plus" size={20} color="#fff" /><Text style={styles.footerBtnText}>THÊM NHÓM</Text>
           </TouchableOpacity>
           <TouchableOpacity style={[styles.footerBtn, {backgroundColor: COLORS.primary}]} onPress={runBatchOptimization}>
             <MaterialCommunityIcons name="calculator" size={20} color="#fff" /><Text style={styles.footerBtnText}>TÍNH TOÁN</Text>
           </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const AdviceLine = ({ item, amount }) => (
  <Text style={styles.adviceText}>• Mua <Text style={{fontWeight:'bold', color: '#fff'}}>{formatNumber(amount)}</Text> <Text style={{color: item.color, fontWeight:'bold'}}>{item.short_name}</Text></Text>
);

const styles = StyleSheet.create({
  container: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.95)', justifyContent: 'center', zIndex: 1500 },
  card: { backgroundColor: '#0a0a0a', borderRadius: 20, borderWidth: 1, borderColor: '#222', flex: 1, overflow: 'hidden' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, borderBottomWidth: 1, borderBottomColor: '#222' },
  title: { color: '#fff', fontSize: 16, fontWeight: '900' },
  adviceBox: { margin: 15, padding: 15, backgroundColor: '#111', borderRadius: 10, borderLeftWidth: 4, borderLeftColor: COLORS.primary },
  adviceTitle: { color: COLORS.primary, fontSize: 10, fontWeight: 'bold', marginLeft: 6 },
  adviceText: { color: '#ccc', fontSize: 11, marginTop: 2 },
  adviceFooter: { color: '#888', fontSize: 10, fontStyle: 'italic', marginTop: 4 },
  groupBox: { backgroundColor: '#0f0f0f', padding: 15, borderRadius: 15, marginBottom: 15, borderWidth: 1, borderColor: '#222' },
  groupHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  groupTitle: { color: COLORS.primary, fontWeight: 'bold' },
  resGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 10 },
  resBtn: { padding: 8, backgroundColor: '#000', borderRadius: 8, borderWidth: 1, borderColor: '#333' },
  resBtnActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  resBtnText: { color: '#fff', fontSize: 10 },
  rateRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 10 },
  rateLabel: { color: '#ccc', fontSize: 11, flex: 1 },
  rateInput: { width: 60, backgroundColor: '#000', color: COLORS.primary, textAlign: 'center', borderRadius: 6, borderWidth: 1, borderColor: '#333', paddingVertical: 4 },
  unitText: { color: '#666', fontSize: 9 },
  budgetInput: { backgroundColor: '#000', color: '#fff', padding: 12, borderRadius: 10, borderWidth: 1, borderColor: '#222', textAlign: 'center', fontWeight: 'bold' },
  
  // Style cho phần Kết quả đề xuất
  resultBox: { padding: 15, backgroundColor: '#1a1a1a', borderRadius: 10, marginTop: 10, borderWidth: 1, borderColor: COLORS.primary },
  resultHeader: { color: COLORS.primary, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  resultGroup: { marginBottom: 10, borderBottomWidth: 1, borderBottomColor: '#333', paddingBottom: 5 },
  resultGroupTitle: { color: '#888', fontSize: 10, fontWeight: 'bold', marginBottom: 4 },
  resultRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
  resultLabel: { color: '#fff', fontSize: 12 },
  resultValue: { color: '#ccc', fontSize: 12, fontWeight: 'bold' },
  
  resultDays: { color: '#fff', fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 },
  applyBtn: { backgroundColor: '#333', padding: 12, borderRadius: 8, alignItems: 'center' },
  
  footer: { flexDirection: 'row', padding: 15, gap: 10, borderTopWidth: 1, borderTopColor: '#222' },
  footerBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 12, backgroundColor: '#222', borderRadius: 10, gap: 5 },
  footerBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 12 }
});