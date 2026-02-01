// src/screens/SettingsScreen.js
import React, { useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, TextInput, 
  ActivityIndicator, TouchableOpacity, LayoutAnimation, Platform, UIManager, KeyboardAvoidingView 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { db } from '../database/db';
import { COLORS } from '../theme/Theme';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const [data, setData] = useState([]);
  const [farmRates, setFarmRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [expandedGroup, setExpandedGroup] = useState(null);
  const [textInputs, setTextInputs] = useState({});

  useEffect(() => {
    const loadData = async () => {
      try {
        const rows = db.getAllSync(`
          SELECT DISTINCT 
            q.name as qualName, q.color_code as color, q.id as qualId,
            c.name as catName, r.name as resName, r.code as resCode, r.short_name as resShort
          FROM upgrade_data ud
          JOIN categories c ON ud.category_id = c.id
          JOIN resources r ON ud.resource_id = r.id
          JOIN qualities q ON r.quality_id = q.id
          WHERE q.code NOT IN ('common', 'tim', 'cam')
          ORDER BY q.id DESC, c.sort_order ASC
        `);

        const grouped = rows.reduce((acc, row) => {
          if (!acc[row.qualName]) acc[row.qualName] = { name: row.qualName, color: row.color, items: [] };
          acc[row.qualName].items.push(row);
          return acc;
        }, {});

        const groupedArray = Object.values(grouped);
        setData(groupedArray);
        if (groupedArray.length > 0) setExpandedGroup(groupedArray[0].name);

        const savedRates = await AsyncStorage.getItem('global_farm_rates');
        if (savedRates) {
          const parsed = JSON.parse(savedRates);
          setFarmRates(parsed);
          const initialText = {};
          Object.keys(parsed).forEach(k => initialText[k] = parsed[k] === 0 ? "" : parsed[k].toString());
          setTextInputs(initialText);
        }
      } catch (e) { console.error(e); } finally { setLoading(false); }
    };
    loadData();
  }, []);

  const toggleGroup = (groupName) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedGroup(prev => prev === groupName ? null : groupName);
  };

  const handleEndEditing = async (code, val) => {
    let finalRate = 0;
    if (val && val.includes('/')) {
      const [num, den] = val.split('/');
      if (parseFloat(den) !== 0) finalRate = parseFloat(num) / parseFloat(den);
    } else {
      finalRate = parseFloat(val) || 0;
    }
    const newRates = { ...farmRates, [code]: finalRate };
    setFarmRates(newRates);
    await AsyncStorage.setItem('global_farm_rates', JSON.stringify(newRates));
    const display = finalRate === 0 ? "" : parseFloat(finalRate.toFixed(4)).toString();
    setTextInputs(prev => ({ ...prev, [code]: display }));
  };

  if (loading) return <View style={styles.centered}><ActivityIndicator color={COLORS.primary}/></View>;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.headerSection}>
        <Text style={styles.title}>HIỆU SUẤT CÀY</Text>
        <Text style={styles.subtitle}>Thiết lập số lượng nguyên liệu kiếm được mỗi ngày.</Text>
      </View>
      
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} // Offset cho header
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          {data.map((group, idx) => {
            const isExpanded = expandedGroup === group.name;
            return (
              <View key={idx} style={styles.groupContainer}>
                <TouchableOpacity style={[styles.accordionHeader, { borderLeftColor: group.color }]} onPress={() => toggleGroup(group.name)}>
                  <Text style={[styles.groupTitle, { color: group.color }]}>{group.name.toUpperCase()}</Text>
                  <MaterialCommunityIcons name={isExpanded ? "chevron-up" : "chevron-down"} size={20} color={group.color} />
                </TouchableOpacity>
                {isExpanded && (
                  <View style={styles.groupContent}>
                    {group.items.map((item, i) => (
                      <View key={i} style={styles.row}>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.catLabel}>{item.catName} ({item.resShort})</Text>
                          <Text style={styles.resName}>{item.resName}</Text>
                        </View>
                        <View style={styles.inputWrap}>
                          <TextInput
                            style={styles.input}
                            keyboardType="default"
                            placeholder="0"
                            placeholderTextColor="#333"
                            value={textInputs[item.resCode] || ""}
                            onChangeText={(v) => setTextInputs({...textInputs, [item.resCode]: v})}
                            onEndEditing={(e) => handleEndEditing(item.resCode, e.nativeEvent.text)}
                          />
                          <Text style={styles.unit}>/ ngày</Text>
                        </View>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            );
          })}
          {/* Tăng padding bottom để scroll được lên cao */}
          <View style={{ height: 250 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerSection: { paddingHorizontal: 20, paddingTop: 20, marginBottom: 20 },
  title: { color: '#fff', fontSize: 24, fontWeight: '900' },
  subtitle: { color: '#888', fontSize: 11, marginTop: 5 },
  scrollContent: { paddingHorizontal: 16 },
  groupContainer: { marginBottom: 12, borderRadius: 10, overflow: 'hidden' },
  accordionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 18, backgroundColor: '#0a0a0a', borderLeftWidth: 4, borderWidth: 1, borderColor: '#111' },
  groupTitle: { fontSize: 13, fontWeight: '900' },
  groupContent: { backgroundColor: '#050505', paddingHorizontal: 10, paddingBottom: 10 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#0a0a0a' },
  catLabel: { color: COLORS.primary, fontSize: 10, fontWeight: '900', marginBottom: 3, textTransform: 'uppercase' },
  resName: { fontSize: 14, fontWeight: 'bold', color: '#FFF' }, 
  inputWrap: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  input: { backgroundColor: '#000', color: COLORS.primary, width: 80, textAlign: 'center', paddingVertical: 10, borderRadius: 8, fontWeight: '900', borderWidth: 1, borderColor: '#1a1a1a' },
  unit: { color: '#FFF', fontSize: 10, fontWeight: 'bold' }
});