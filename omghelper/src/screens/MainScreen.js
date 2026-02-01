// src/screens/MainScreen.js
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView, BackHandler, ToastAndroid, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native'; 

import { useUpgradeData } from '../hooks/useUpgradeData';
import { useGalleryData } from '../hooks/useGalleryData';
import UpgradeMatrix from '../components/UpgradeMatrix';
import FilterModal from '../components/FilterModal';
import TalentGallery from '../components/TalentGallery';
import { COLORS } from '../theme/Theme';
import styles from './MainScreen.styles';

export default function MainScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { loading, categories, qualities, allQualities, types, selectedCat, setSelectedCat, selectedQual, setSelectedQual, selectedType, setSelectedType, availableTypeIds, availableQualIds, matrixData } = useUpgradeData();
  const galleryData = useGalleryData();

  const [showFilter, setShowFilter] = useState(false);
  const [viewMode, setViewMode] = useState('matrix'); 
  const [isDetailOpen, setIsDetailOpen] = useState(false); 
  const lastBackPressed = useRef(0);

  useEffect(() => {
    if (selectedCat?.viewConfig) setViewMode(selectedCat.viewConfig.defaultView || 'matrix');
  }, [selectedCat]);

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: { display: isDetailOpen ? 'none' : 'flex', backgroundColor: '#16161a', borderTopWidth: 1, borderTopColor: '#222', height: 60 + insets.bottom, paddingBottom: insets.bottom > 0 ? insets.bottom : 8, paddingTop: 8 }
    });
  }, [isDetailOpen, insets.bottom]);

  useFocusEffect(useCallback(() => {
    const onBackPress = () => {
      if (showFilter) { setShowFilter(false); return true; }
      if (isDetailOpen) return false; 
      const now = Date.now();
      if (lastBackPressed.current && (now - lastBackPressed.current < 2000)) { BackHandler.exitApp(); return true; }
      lastBackPressed.current = now;
      ToastAndroid.show("Nhấn BACK lần nữa để thoát", ToastAndroid.SHORT);
      return true;
    };
    const sub = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => sub.remove();
  }, [showFilter, isDetailOpen]));

  const getGalleryContent = () => {
    if (!selectedCat) return [];
    // Log để kiểm tra xem có lấy đúng Key từ DB không
    const dataKey = selectedCat.galleryConfig?.dataKey || selectedCat.code;
    const content = galleryData[dataKey] || [];
    if (content.length === 0) {
       console.log(`⚠️ Không tìm thấy ảnh cho Key: [${dataKey}]. Kiểm tra lại master.js hoặc data.json`);
    }
    return content;
  };

  const renderModeToggle = () => {
    const config = selectedCat?.viewConfig;
    if (!config?.enableMatrix || !config?.enableGallery) return null;
    return (
      <View style={localStyles.toggleContainer}>
        <TouchableOpacity onPress={() => setViewMode('matrix')} style={[localStyles.toggleBtn, viewMode === 'matrix' && localStyles.toggleBtnActive]}>
          <MaterialCommunityIcons name="calculator" size={16} color={viewMode === 'matrix' ? '#fff' : '#666'} />
          <Text style={[localStyles.toggleText, viewMode === 'matrix' && localStyles.toggleTextActive]}>Nguyên Liệu</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setViewMode('gallery')} style={[localStyles.toggleBtn, viewMode === 'gallery' && localStyles.toggleBtnActive]}>
          <MaterialCommunityIcons name="image-multiple" size={16} color={viewMode === 'gallery' ? '#fff' : '#666'} />
          <Text style={[localStyles.toggleText, viewMode === 'gallery' && localStyles.toggleTextActive]}>Thiên Phú</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderFilterBar = () => {
    const qualName = selectedCat?.filterConfig?.qualityAlias?.[selectedQual?.code] || selectedQual?.name;
    return (
      <TouchableOpacity style={styles.compactBar} onPress={() => setShowFilter(true)} activeOpacity={0.8}>
        <View style={styles.barLeft}>
          <MaterialCommunityIcons name={selectedCat?.icon || 'circle'} size={20} color={COLORS.primary} />
          <Text style={styles.breadcrumbText} numberOfLines={1}>{selectedCat?.name} » {qualName} » {selectedType?.name}</Text>
        </View>
        <View style={styles.filterIconBg}>
           <MaterialCommunityIcons name="tune-variant" size={16} color="#fff" /><Text style={styles.filterBtnText}>Lọc</Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) return <View style={styles.centered}><ActivityIndicator size="large" color={COLORS.primary}/></View>;

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, paddingTop: insets.top + 10 }}>
        {renderModeToggle()}
        {viewMode === 'matrix' ? (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 150 }}>
            {selectedType && <UpgradeMatrix data={matrixData} typeCode={selectedType.code} layoutConfig={selectedCat?.layoutConfig} viewConfig={selectedCat?.viewConfig} />}
          </ScrollView>
        ) : (
          <TalentGallery config={selectedCat?.galleryConfig} data={getGalleryContent()} onToggleDetail={(isOpen) => setIsDetailOpen(isOpen)} allQualities={allQualities} />
        )}
      </View>
      {!showFilter && !isDetailOpen && <View style={styles.bottomBarContainer}>{renderFilterBar()}</View>}
      <FilterModal visible={showFilter} onClose={() => setShowFilter(false)} categories={categories} qualities={qualities} types={types} selectedCat={selectedCat} setSelectedCat={setSelectedCat} selectedQual={selectedQual} setSelectedQual={setSelectedQual} selectedType={selectedType} setSelectedType={setSelectedType} availableTypeIds={availableTypeIds} availableQualIds={availableQualIds} />
    </View>
  );
}

const localStyles = StyleSheet.create({
  toggleContainer: { flexDirection: 'row', backgroundColor: '#16161a', marginHorizontal: 20, marginBottom: 10, borderRadius: 12, padding: 4, borderWidth: 1, borderColor: '#2d2d30' },
  toggleBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, borderRadius: 8, gap: 6 },
  toggleBtnActive: { backgroundColor: COLORS.primary },
  toggleText: { color: '#666', fontSize: 12, fontWeight: 'bold' },
  toggleTextActive: { color: '#fff' }
});