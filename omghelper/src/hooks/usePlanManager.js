// src/hooks/usePlanManager.js
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'user_plans_v10';

export function usePlanManager() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) setPlans(JSON.parse(saved));
    } catch (e) {
      console.error("Load plans error:", e);
    } finally {
      setLoading(false);
    }
  };

  const savePlansToStorage = async (newPlans) => {
    try {
      setPlans(newPlans);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newPlans));
    } catch (e) {
      console.error("Save plans error:", e);
    }
  };

  const savePlan = (plan) => {
    const exists = plans.find(p => p.id === plan.id);
    let newPlans;
    if (exists) {
      newPlans = plans.map(p => (p.id === plan.id ? plan : p));
    } else {
      newPlans = [plan, ...plans];
    }
    savePlansToStorage(newPlans);
  };

  const deletePlan = (planId) => {
    const newPlans = plans.filter(p => p.id !== planId);
    savePlansToStorage(newPlans);
  };

  return { plans, loading, savePlan, deletePlan };
}