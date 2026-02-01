// src/components/FilterModal.js
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Pressable, ScrollView, StyleSheet, Dimensions, Animated, Easing } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../theme/Theme';

const { width, height: SCREEN_HEIGHT } = Dimensions.get('window');
const CONTAINER_W = width - 32; 
const CAT_WIDTH = (CONTAINER_W - (6 * 3)) / 4;
const QUAL_WIDTH = (CONTAINER_W - (6 * 4)) / 5;

export default function FilterModal({ 
  visible, onClose, categories, qualities, types, 
  selectedCat, setSelectedCat, selectedQual, setSelectedQual, selectedType, setSelectedType,
  availableTypeIds = [], availableQualIds = [] 
}) {
  const insets = useSafeAreaInsets();
  const [showContent, setShowContent] = useState(visible);
  const animValue = useRef(new Animated.Value(0)).current;

  const TOP_OFFSET = insets.top + 60;
  const MAX_MODAL_HEIGHT = SCREEN_HEIGHT - TOP_OFFSET;

  // Lấy danh sách phẩm chất hiển thị
  const allQualities = qualities.filter(q => ['tc10', 'hiem', 'hot', 'do', 'danh_tuong'].includes(q.code));

  // --- LOGIC MỚI: Đổi tên dựa vào Config ---
  const getQualityDisplayName = (q) => {
    // Check xem category hiện tại có config đổi tên ko (VD: Thần binh)
    const aliases = selectedCat?.filterConfig?.qualityAlias;
    if (aliases && aliases[q.code]) {
      return aliases[q.code];
    }
    // Mặc định
    if (q.code === 'danh_tuong') return 'D.Tướng';
    return q.name;
  };

  const handleSelectCategory = (cat) => {
    setSelectedCat(cat);
    // --- LOGIC MỚI: Auto close dựa vào Config ---
    if (cat?.filterConfig?.autoClose) {
      setTimeout(() => { onClose(); }, 150);
    }
  };

  const basicTypes = types.filter(t => ['tien_cap', 'dot_pha_cam', 'dot_pha_do', 'chan'].includes(t.code));
  const systemTypes = types.filter(t => !['tien_cap', 'dot_pha_cam', 'dot_pha_do', 'chan'].includes(t.code));

  useEffect(() => {
    if (visible) {
      setShowContent(true);
      Animated.timing(animValue, { toValue: 1, duration: 300, useNativeDriver: true, easing: Easing.out(Easing.cubic) }).start();
    } else {
      Animated.timing(animValue, { toValue: 0, duration: 250, useNativeDriver: true, easing: Easing.in(Easing.cubic) }).start(() => setShowContent(false));
    }
  }, [visible]);

  if (!showContent) return null;

  const backdropOpacity = animValue.interpolate({ inputRange: [0, 1], outputRange: [0, 1] });
  const sheetTranslateY = animValue.interpolate({ inputRange: [0, 1], outputRange: [SCREEN_HEIGHT, 0] });

  return (
    <View style={styles.overlay}>
      <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]}>
        <Pressable style={{ flex: 1 }} onPress={onClose} />
      </Animated.View>

      <Animated.View style={[styles.sheet, { bottom: 0, maxHeight: MAX_MODAL_HEIGHT, transform: [{ translateY: sheetTranslateY }] }]}>
        <View style={styles.header}>
          <Text style={styles.title}>CẤU HÌNH TRA CỨU</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <MaterialCommunityIcons name="close" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={true} contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]} bounces={false}>
          <Text style={styles.sectionTitle}>DANH MỤC CHÍNH</Text>
          <View style={styles.gridRow}>
            {categories.map(cat => (
              <TouchableOpacity key={cat.id} onPress={() => handleSelectCategory(cat)} style={[styles.boxCat, selectedCat?.id === cat.id && styles.boxActive]}>
                <MaterialCommunityIcons name={cat.icon || 'circle'} size={20} color={selectedCat?.id === cat.id ? '#fff' : '#666'} />
                <Text numberOfLines={1} style={[styles.textSmall, selectedCat?.id === cat.id && styles.textActive]}>{cat.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Tiêu đề thay đổi động dựa vào việc có Alias hay không */}
          <Text style={styles.sectionTitle}>
            {selectedCat?.filterConfig?.qualityAlias ? 'LOẠI THẦN BINH' : 'PHẨM CHẤT / TƯ CHẤT'}
          </Text>
          
          <View style={styles.gridRow}>
            {allQualities.map(q => {
              const isAvailable = availableQualIds.includes(q.id);
              const isSelected = selectedQual?.id === q.id;
              return (
                <TouchableOpacity key={q.id} onPress={() => isAvailable && setSelectedQual(q)}
                  style={[styles.boxQual, isSelected && { backgroundColor: q.color_code, borderColor: q.color_code }, !isAvailable && styles.boxDisabled]}>
                  <Text style={[styles.textQual, { color: isSelected ? '#000' : (isAvailable ? q.color_code : '#444') }]}>{getQualityDisplayName(q)}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.sectionTitle}>NÂNG CẤP CƠ BẢN</Text>
          <View style={styles.gridType}>
            {basicTypes.map(t => {
              const isAvail = availableTypeIds.includes(t.id);
              const isSel = selectedType?.id === t.id;
              return (
                <TouchableOpacity key={t.id} onPress={() => isAvail && setSelectedType(t)} style={[styles.boxType, isSel && styles.boxActive, !isAvail && styles.boxDisabled]}>
                  <Text numberOfLines={1} style={[styles.textType, isSel && styles.textActive, !isAvail && styles.textDisabled]}>{t.name}</Text>
                  {isSel && <MaterialCommunityIcons name="check" size={12} color="#fff" />}
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.sectionTitle}>HỆ THỐNG PHẨM CHẤT</Text>
          <View style={styles.gridType}>
            {systemTypes.map(t => {
              const isAvail = availableTypeIds.includes(t.id);
              const isSel = selectedType?.id === t.id;
              return (
                <TouchableOpacity key={t.id} onPress={() => isAvail && setSelectedType(t)} style={[styles.boxType, isSel && styles.boxActive, !isAvail && styles.boxDisabled]}>
                  <Text numberOfLines={1} style={[styles.textType, isSel && styles.textActive, !isAvail && styles.textDisabled]}>{t.name}</Text>
                  {isSel && <MaterialCommunityIcons name="check" size={12} color="#fff" />}
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: { ...StyleSheet.absoluteFillObject, zIndex: 9999 },
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.8)' },
  sheet: { position: 'absolute', left: 0, right: 0, backgroundColor: '#1E1E24', borderTopLeftRadius: 20, borderTopRightRadius: 20, overflow: 'hidden', shadowColor: "#000", shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 5 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 14, borderBottomWidth: 1, borderBottomColor: '#2d2d30', backgroundColor: '#23232a', zIndex: 10 },
  scrollContent: { paddingHorizontal: 16, paddingTop: 5 },
  title: { color: '#fff', fontWeight: 'bold', fontSize: 13, letterSpacing: 0.8 },
  closeBtn: { padding: 6, backgroundColor: '#333', borderRadius: 50 },
  sectionTitle: { color: '#666', fontSize: 9, fontWeight: '900', marginTop: 14, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 },
  gridRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  boxCat: { width: CAT_WIDTH, height: 52, backgroundColor: '#141418', borderRadius: 8, borderWidth: 1, borderColor: '#333', justifyContent: 'center', alignItems: 'center', gap: 2 },
  textSmall: { fontSize: 9, color: '#666', fontWeight: 'bold', textAlign: 'center' },
  boxQual: { width: QUAL_WIDTH, paddingVertical: 14, borderRadius: 8, borderWidth: 1, borderColor: '#333', justifyContent: 'center', alignItems: 'center', backgroundColor: '#141418' },
  textQual: { fontSize: 10, fontWeight: '900', textAlign: 'center' },
  gridType: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', gap: 6 },
  boxType: { width: '31.8%', paddingVertical: 14, paddingHorizontal: 4, backgroundColor: '#141418', borderRadius: 8, borderWidth: 1, borderColor: '#333', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4 },
  textType: { color: '#aaa', fontSize: 10, fontWeight: 'bold', textAlign: 'center' },
  boxActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  textActive: { color: '#fff', fontWeight: 'bold' },
  boxDisabled: { opacity: 0.4, backgroundColor: '#0f0f12', borderColor: '#222' },
  textDisabled: { color: '#444' }
});