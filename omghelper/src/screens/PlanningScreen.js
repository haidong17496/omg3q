// src/screens/PlanningScreen.js
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

import { usePlanManager } from '../hooks/usePlanManager';
import { getCategories } from '../database/queries';
import { COLORS } from '../theme/Theme';

import PlanDetailView from '../components/planning/PlanDetailView';

export default function PlanningScreen() {
  const insets = useSafeAreaInsets();
  const { plans, loading: plansLoading, savePlan, deletePlan } = usePlanManager();
  
  const [categories, setCategories] = useState([]);
  const [globalFarmRates, setGlobalFarmRates] = useState({});
  const [dataLoading, setDataLoading] = useState(true);

  // State quản lý Plan đang mở
  const [activePlan, setActivePlan] = useState(null); 
  
  // State Custom Alert
  const [deleteId, setDeleteId] = useState(null);

  // 1. Load Data Hệ Thống
  useEffect(() => {
    const initData = async () => {
      try {
        const cats = getCategories().filter(c => 
          ['general', 'god_weapon', 'pet', 'equipment', 'accessory', 'treasure', 'handbook'].includes(c.code)
        );
        setCategories(cats);
        const rates = await AsyncStorage.getItem('global_farm_rates');
        if (rates) setGlobalFarmRates(JSON.parse(rates));
      } catch (e) {
        console.error("Init Error:", e);
      } finally {
        setDataLoading(false);
      }
    };
    initData();
  }, []);

  // 2. Reload Rates
  useFocusEffect(useCallback(() => {
    AsyncStorage.getItem('global_farm_rates').then(r => { if (r) setGlobalFarmRates(JSON.parse(r)); });
  }, []));

  // 3. Handle Back Button (Android)
  useEffect(() => {
    const onBackPress = () => {
      if (deleteId) { setDeleteId(null); return true; } // Đóng popup xóa
      if (activePlan) { setActivePlan(null); return true; } // Đóng detail
      return false; // Default behavior
    };
    const sub = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => sub.remove();
  }, [activePlan, deleteId]);

  // --- ACTIONS ---
  const handleCreate = () => {
    setActivePlan({ id: Date.now(), planName: 'Kế hoạch mới', targets: [], inventory: {} });
  };

  const handleConfirmDelete = () => {
    if (deleteId) {
      deletePlan(deleteId);
      setDeleteId(null);
    }
  };

  const handleSaveActivePlan = (updatedPlan) => {
    savePlan(updatedPlan);
    setActivePlan(null);
  };

  if (plansLoading || dataLoading) {
    return <View style={styles.centered}><ActivityIndicator size="large" color={COLORS.primary} /></View>;
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.headerTitle}>LẬP KẾ HOẠCH</Text>

      {plans.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Chưa có kế hoạch nào.</Text>
          <Text style={styles.emptySub}>Nhấn + để tạo mới.</Text>
        </View>
      ) : (
        <FlatList
          data={plans}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => setActivePlan(item)}>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{item.planName}</Text>
                <Text style={styles.cardSub}>{item.targets?.length || 0} mục tiêu</Text>
              </View>
              <TouchableOpacity onPress={() => setDeleteId(item.id)} style={{ padding: 10 }}>
                <MaterialCommunityIcons name="trash-can-outline" size={24} color="#666" />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      )}

      <TouchableOpacity style={styles.fab} onPress={handleCreate}>
        <MaterialCommunityIcons name="plus" size={32} color="#fff" />
      </TouchableOpacity>

      {/* REPLACEMENT FOR MODAL: Full Screen View */}
      {activePlan && (
        <View style={styles.fullScreenOverlay}>
          <PlanDetailView 
            plan={activePlan}
            categories={categories}
            globalFarmRates={globalFarmRates}
            insets={insets}
            onSave={handleSaveActivePlan}
            onClose={() => setActivePlan(null)}
          />
        </View>
      )}

      {/* CUSTOM DELETE ALERT */}
      {deleteId && (
        <View style={styles.alertOverlay}>
          <View style={styles.alertBox}>
            <Text style={styles.alertTitle}>Xác nhận xóa</Text>
            <Text style={styles.alertMsg}>Bạn có chắc muốn xóa kế hoạch này không?</Text>
            <View style={styles.alertActions}>
              <TouchableOpacity onPress={() => setDeleteId(null)} style={styles.alertBtn}>
                <Text style={styles.alertBtnText}>HỦY</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleConfirmDelete} style={[styles.alertBtn, {backgroundColor: '#ff4444'}]}>
                <Text style={[styles.alertBtnText, {color:'#fff'}]}>XÓA</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' },
  headerTitle: { color: '#fff', fontSize: 28, fontWeight: '900', marginHorizontal: 20, marginVertical: 15 },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', opacity: 0.5 },
  emptyText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  emptySub: { color: '#888', marginTop: 5 },
  
  card: { 
    flexDirection: 'row', alignItems: 'center', 
    backgroundColor: '#111', padding: 20, borderRadius: 15, marginBottom: 12,
    borderWidth: 1, borderColor: '#222'
  },
  cardTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  cardSub: { color: '#666', fontSize: 12, marginTop: 4 },
  
  fab: {
    position: 'absolute', right: 20, bottom: 30,
    width: 60, height: 60, borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: 'center', alignItems: 'center',
    shadowColor: COLORS.primary, shadowOpacity: 0.4, shadowRadius: 10, elevation: 5
  },

  fullScreenOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
    zIndex: 100 // Đè lên trên list
  },

  // Custom Alert Styles
  alertOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center', zIndex: 200 },
  alertBox: { width: '80%', backgroundColor: '#1a1a1a', borderRadius: 15, padding: 20, borderWidth: 1, borderColor: '#333' },
  alertTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  alertMsg: { color: '#ccc', fontSize: 14, marginBottom: 20 },
  alertActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10 },
  alertBtn: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8, backgroundColor: '#333' },
  alertBtnText: { color: '#fff', fontSize: 12, fontWeight: 'bold' }
});