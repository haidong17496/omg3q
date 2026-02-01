// src/components/planning/TargetSelector.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet } from 'react-native';
import { COLORS } from '../../theme/Theme';
import { getPathForCategory } from '../../constants/Config';

const TYPE_NAME_MAP = {
  tien_cap: 'Tiến Cấp', dot_pha_cam: 'Đột Phá Cam', dot_pha_do: 'Đột Phá Đỏ', chan: 'Giác Tỉnh',
  kim: 'Tăng Kim', am_kim: 'Ám Kim', tu_kim: 'Tử Kim', thai_kim: 'Thái Kim', ban_kim: 'Bàn Kim', luu_kim: 'Lưu Kim',
};

export default function TargetSelector({ visible, onClose, onConfirm, categories }) {
  const [draftItem, setDraftItem] = useState(null);
  const [selectorTarget, setSelectorTarget] = useState(null); // 'start' or 'end'

  // Init khi mở modal
  useEffect(() => {
    if (visible && categories.length > 0) {
      const firstCat = categories[0];
      const path = getPathForCategory(firstCat.code);
      setDraftItem({
        catId: firstCat.id,
        catCode: firstCat.code,
        qty: 1,
        start: parsePathNode(path[0]),
        end: parsePathNode(path[path.length - 1]),
      });
    }
  }, [visible, categories]);

  const parsePathNode = (nodeStr) => ({
    pathKey: nodeStr,
    type: nodeStr.split('@')[0],
    qual: nodeStr.split('@')[1],
    tier: '', step: ''
  });

  const getDisplayName = (typeCode) => TYPE_NAME_MAP[typeCode] || typeCode;

  const handleSelectCategory = (c) => {
    const path = getPathForCategory(c.code);
    setDraftItem({
      ...draftItem,
      catId: c.id, catCode: c.code,
      start: parsePathNode(path[0]),
      end: parsePathNode(path[path.length - 1]),
    });
  };

  const handlePathSelect = (pathKey) => {
    const node = parsePathNode(pathKey);
    if (selectorTarget === 'start') {
      setDraftItem({ ...draftItem, start: { ...draftItem.start, ...node } });
    } else {
      setDraftItem({ ...draftItem, end: { ...draftItem.end, ...node } });
    }
    setSelectorTarget(null);
  };

  if (!visible || !draftItem) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.content}>
        <Text style={styles.title}>THIẾT LẬP MỤC TIÊU</Text>
        
        {/* Category Picker */}
        <Text style={styles.label}>DANH MỤC</Text>
        <View style={styles.grid}>
          {categories.map(c => (
            <TouchableOpacity key={c.id} 
              style={[styles.catBtn, draftItem.catId === c.id && styles.catBtnActive]}
              onPress={() => handleSelectCategory(c)}>
              <Text style={styles.catText} numberOfLines={1}>{c.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Start / End Selector */}
        <View style={styles.row}>
          <TargetInputBlock label="HIỆN TẠI" data={draftItem.start} 
            onOpenSelect={() => setSelectorTarget('start')}
            onChangeTier={(v) => setDraftItem({...draftItem, start: {...draftItem.start, tier: v}})}
            onChangeStep={(v) => setDraftItem({...draftItem, start: {...draftItem.start, step: v}})}
            getDisplayName={getDisplayName}
          />
          <TargetInputBlock label="MỤC TIÊU" data={draftItem.end} 
            onOpenSelect={() => setSelectorTarget('end')}
            onChangeTier={(v) => setDraftItem({...draftItem, end: {...draftItem.end, tier: v}})}
            onChangeStep={(v) => setDraftItem({...draftItem, end: {...draftItem.end, step: v}})}
            getDisplayName={getDisplayName}
          />
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity onPress={onClose} style={styles.btnCancel}><Text style={styles.btnText}>HỦY</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => onConfirm(draftItem)} style={styles.btnConfirm}><Text style={styles.btnText}>XÁC NHẬN</Text></TouchableOpacity>
        </View>
      </View>

      {/* Dropdown Overlay */}
      {selectorTarget && (
        <View style={styles.dropOverlay}>
          <TouchableOpacity style={StyleSheet.absoluteFill} onPress={() => setSelectorTarget(null)} />
          <View style={styles.dropContent}>
            <Text style={styles.dropTitle}>CHỌN CHẶNG</Text>
            <ScrollView style={{ maxHeight: 300 }}>
              {getPathForCategory(draftItem.catCode).map(s => (
                <TouchableOpacity key={s} style={styles.dropItem} onPress={() => handlePathSelect(s)}>
                  <Text style={styles.dropText}>{getDisplayName(s.split('@')[0])}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
}

// Sub-component cho gọn
const TargetInputBlock = ({ label, data, onOpenSelect, onChangeTier, onChangeStep, getDisplayName }) => (
  <View style={{ flex: 1, marginHorizontal: 5 }}>
    <Text style={styles.label}>{label}</Text>
    <TouchableOpacity style={styles.dropdown} onPress={onOpenSelect}>
      <Text style={styles.dropdownText}>{getDisplayName(data.type)}</Text>
    </TouchableOpacity>
    <View style={{ flexDirection: 'row', gap: 5, marginTop: 8 }}>
      <View style={{ flex: 1 }}>
        <Text style={styles.subLabel}>Tầng</Text>
        <TextInput style={[styles.input, data.type === 'tien_cap' && { opacity: 0.3 }]} 
          keyboardType="numeric" editable={data.type !== 'tien_cap'}
          value={data.type === 'tien_cap' ? '0' : data.tier} onChangeText={onChangeTier} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.subLabel}>Bậc</Text>
        <TextInput style={styles.input} keyboardType="numeric" 
          value={data.step} onChangeText={onChangeStep} />
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.95)', justifyContent: 'center', padding: 16, zIndex: 2000 },
  content: { backgroundColor: '#0a0a0a', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: '#222' },
  title: { color: '#fff', fontSize: 18, fontWeight: '900', textAlign: 'center', marginBottom: 20 },
  label: { color: '#888', fontSize: 10, fontWeight: 'bold', marginBottom: 8, marginTop: 10 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  catBtn: { width: '23%', padding: 10, backgroundColor: '#111', borderRadius: 8, borderWidth: 1, borderColor: '#333', alignItems: 'center' },
  catBtnActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  catText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  row: { flexDirection: 'row', marginTop: 10 },
  dropdown: { backgroundColor: '#000', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#333' },
  dropdownText: { color: '#fff', fontSize: 11, fontWeight: 'bold', textAlign: 'center' },
  subLabel: { color: '#666', fontSize: 9, marginBottom: 4 },
  input: { backgroundColor: '#000', color: COLORS.primary, textAlign: 'center', padding: 10, borderRadius: 8, borderWidth: 1, borderColor: '#222', fontWeight: 'bold' },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 25 },
  btnCancel: { padding: 15 },
  btnConfirm: { backgroundColor: COLORS.primary, paddingHorizontal: 30, paddingVertical: 12, borderRadius: 10 },
  btnText: { color: '#fff', fontWeight: 'bold' },
  dropOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center', zIndex: 3000 },
  dropContent: { width: '80%', backgroundColor: '#111', borderRadius: 15, padding: 15, borderWidth: 1, borderColor: '#444' },
  dropTitle: { color: '#fff', textAlign: 'center', fontWeight: 'bold', marginBottom: 10 },
  dropItem: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#222' },
  dropText: { color: '#fff', textAlign: 'center' }
});