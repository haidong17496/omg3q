// src/components/TalentGallery.js
import React, { useState, useEffect, useMemo } from 'react';
import { 
  View, Text, Image, TouchableOpacity, StyleSheet, 
  FlatList, Dimensions, BackHandler, Pressable, ScrollView 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview'; 
import { COLORS } from '../theme/Theme';

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 3;
const ITEM_WIDTH = (width - 40) / COLUMN_COUNT;

/**
 * Component hiển thị danh sách hình ảnh/thiên phú.
 * 100% Data-Driven: Phân nhóm dựa trên config 'match' hoặc bảng qualities SQLite.
 */
export default function TalentGallery({ data, onToggleDetail, config, allQualities }) {
  const insets = useSafeAreaInsets();
  const [selectedItem, setSelectedItem] = useState(null); 
  const [selectedMap, setSelectedMap] = useState(null);     
  const [selectedSkill, setSelectedSkill] = useState(null); 
  
  const safeData = (data && Array.isArray(data)) ? data : [];

  // Xử lý nút Back trên Android
  useEffect(() => {
    const onBackPress = () => {
      if (selectedSkill) { setSelectedSkill(null); return true; }
      if (selectedMap) { setSelectedMap(null); onToggleDetail(false); return true; }
      if (selectedItem) { setSelectedItem(null); onToggleDetail(false); return true; }
      return false; 
    };
    const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => subscription.remove();
  }, [selectedItem, selectedMap, selectedSkill]);

  /**
   * TẠO TỪ ĐIỂN MÀU SẮC ĐỘNG
   * Lấy từ bảng qualities trong SQLite truyền xuống
   */
  const dynamicDescColors = useMemo(() => {
    const colorMap = { '5 sao': '#FF4B2B' }; 
    if (allQualities && Array.isArray(allQualities)) {
      allQualities.forEach(q => {
        const keyword = q.name.split(' ')[0].toLowerCase();
        colorMap[keyword] = q.color_code;
      });
    }
    return colorMap;
  }, [allQualities]);

  /**
   * LOGIC PHÂN NHÓM ĐỘNG
   */
  const groupedData = useMemo(() => {
    if (safeData.length === 0) return [];
    
    // TRƯỜNG HỢP 1: Phân nhóm theo cấu hình Groups (Tướng, Hồn Thạch...)
    if (config?.groups && Array.isArray(config.groups)) {
      return config.groups.map(group => {
        const items = safeData.filter(item => {
          if (!group.match) return false;
          // Lọc item dựa trên quy tắc match trong DB
          return Object.keys(group.match).some(field => {
            const allowedValues = group.match[field];
            return Array.isArray(allowedValues) && allowedValues.includes(item[field]);
          });
        });

        // Sắp xếp item trong nhóm theo sort_order từ data.json
        items.sort((a, b) => (a.sort_order || 999) - (b.sort_order || 999));
        
        return { 
          id: group.code, 
          title: group.name, 
          color: group.color || COLORS.primary, 
          items 
        };
      }).filter(g => g.items.length > 0);
    }

    // TRƯỜNG HỢP 2: Phân nhóm theo Section (Ví dụ: danh mục Khác)
    if (config?.processorType === 'grouped_section') {
      const sections = [...new Set(safeData.map(i => i.section).filter(Boolean))];
      return sections.map(s => ({
        id: s,
        title: s.toUpperCase(),
        color: COLORS.primary,
        items: safeData.filter(item => item.section === s)
      })).filter(g => g.items.length > 0);
    }

    // TRƯỜNG HỢP 3: Phân nhóm mặc định theo Phẩm chất (Ví dụ: Thần binh, Trang bị)
    if (!allQualities || allQualities.length === 0) return [];
    
    // Fix lỗi: Đảm bảo tên biến đồng nhất là sortedQualities
    const sortedQualities = [...allQualities].sort((a, b) => b.id - a.id);

    return sortedQualities.map(q => {
      const items = safeData.filter(i => i.quality === q.code);
      const displayTitle = q.name.toUpperCase().includes('PHẨM') 
                           ? q.name.toUpperCase() 
                           : `PHẨM ${q.name.toUpperCase()}`;
      return {
        id: q.code,
        title: displayTitle,
        color: q.color_code,
        items: items
      };
    }).filter(g => g.items.length > 0);

  }, [safeData, config, allQualities]);

  const renderColoredDesc = (text) => {
    if (!text) return null;
    return text.split('\n').map((line, index) => {
      const lowerLine = line.toLowerCase();
      const matchKey = Object.keys(dynamicDescColors).find(key => lowerLine.includes(key));
      const textColor = matchKey ? dynamicDescColors[matchKey] : '#ddd';
      return (
        <Text key={index} style={[styles.modalDescLine, { color: textColor }]}>
          {line.trim()}
        </Text>
      );
    });
  };

  const openDetail = (item) => {
    if (item.nodes) setSelectedMap(item); 
    else setSelectedItem(item); 
    onToggleDetail(true);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemBox} onPress={() => openDetail(item)} activeOpacity={0.7}>
      <View style={[styles.imageWrapper, { borderColor: COLORS.qualities[item.quality] || '#333' }]}>
        <Image source={{ uri: item.thumb }} style={styles.thumbImage} resizeMode="cover" />
      </View>
      <Text numberOfLines={2} style={styles.itemName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderMapContent = () => {
    if (!selectedMap) return null;
    const ratio = (selectedMap.aspect_ratio && selectedMap.aspect_ratio > 0) ? selectedMap.aspect_ratio : 1.77;
    const isVeryWide = ratio > 1.5; 
    const baseWidth = width - 24; 
    const displayWidth = isVeryWide ? baseWidth * 1.8 : baseWidth; 
    const displayHeight = displayWidth / ratio;

    const MapView = (
      <View style={{ 
        width: displayWidth, height: displayHeight, alignSelf: 'center', 
        position: 'relative', borderRadius: isVeryWide ? 0 : 15,
        backgroundColor: '#1a1a1a', overflow: 'hidden', borderWidth: 1, borderColor: '#333'
      }}>
        <Image source={{ uri: selectedMap.bg_image }} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
        {selectedMap.nodes.map((node, idx) => (
          <TouchableOpacity 
            key={idx} 
            style={{ position: 'absolute', left: `${node.x}%`, top: `${node.y}%`, width: `${node.w}%`, height: `${node.h}%`, zIndex: 10 }}
            onPress={() => setSelectedSkill({ ...node, color: COLORS.qualities[selectedMap.quality] })} 
          />
        ))}
      </View>
    );

    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        {isVeryWide && <Text style={styles.hintTextSwipe}>(Vuốt ngang để xem toàn bộ)</Text>}
        <View style={{ height: displayHeight + 20 }}> 
          <ScrollView horizontal={isVeryWide} showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 12, alignItems: 'center' }}>
            {MapView}
          </ScrollView>
        </View>
      </View>
    );
  };

  const generateHtml = (item) => {
    const isHtmlViewer = config?.processorType === 'html_viewer';
    return `
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
          <style>
            body { margin: 0; padding: 12px; background-color: #000; display: flex; flex-direction: column; align-items: center; }
            img { width: 100%; height: auto; display: block; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.5); margin-bottom: 15px; }
            .label { color: #555; font-size: 11px; margin-bottom: 6px; font-weight: bold; text-transform: uppercase; align-self: flex-start; margin-left: 2%; letter-spacing: 1px; }
          </style>
        </head>
        <body>
          ${isHtmlViewer ? `<div class="label">Minh họa</div><img src="${item.thumb}" />` : ''}
          <div class="label">Thông số chi tiết</div>
          <img src="${item.detail}" />
        </body>
      </html>
    `;
  };

  return (
    <View style={{ flex: 1 }}> 
      <FlatList
        data={groupedData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.section}>
            <View style={[styles.headerContainer, { borderLeftColor: item.color }]}>
              <Text style={[styles.sectionHeader, { color: item.color }]}>{item.title}</Text>
            </View>
            <FlatList data={item.items} numColumns={COLUMN_COUNT} keyExtractor={(i) => i.slug || Math.random().toString()} renderItem={renderItem} scrollEnabled={false} />
          </View>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 12 }}
      />

      {/* LAYER 1: SKILL TREE MAP */}
      {selectedMap && (
        <View style={[styles.fullScreenOverlay, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
          <View style={styles.toolbar}>
             <TouchableOpacity onPress={() => {setSelectedMap(null); onToggleDetail(false);}} style={styles.closeBtnBack}>
              <MaterialCommunityIcons name="arrow-left" size={28} color="#fff" />
              <Text style={styles.headerTitle}>Quay lại</Text>
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingBottom: 50 }}>
            {renderMapContent()}
            <Text style={styles.hintText}>* Chạm vào biểu tượng để xem thông tin</Text>
          </ScrollView>
        </View>
      )}

      {/* LAYER 2: SKILL POPUP (Rich Text) */}
      {selectedSkill && (
        <View style={styles.customModalOverlay}>
          <Pressable style={styles.modalBackdrop} onPress={() => setSelectedSkill(null)} />
          <View style={[styles.modalContent, { borderColor: selectedSkill.color }]}>
            <Text style={[styles.modalTitle, { color: selectedSkill.color }]}>{selectedSkill.name}</Text>
            <View style={styles.modalBody}>{renderColoredDesc(selectedSkill.desc)}</View>
            <TouchableOpacity style={styles.modalCloseBtn} onPress={() => setSelectedSkill(null)}>
              <Text style={styles.modalCloseText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* LAYER 3: CHI TIẾT WebView */}
      {selectedItem && (
        <View style={[styles.fullScreenOverlay, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
          <View style={styles.toolbar}>
             <TouchableOpacity onPress={() => {setSelectedItem(null); onToggleDetail(false);}} style={styles.closeBtnBack}>
              <MaterialCommunityIcons name="arrow-left" size={28} color="#fff" />
              <Text style={styles.headerTitle}>Quay lại</Text>
            </TouchableOpacity>
          </View>
          <WebView 
            originWhitelist={['*']} 
            source={{ html: generateHtml(selectedItem) }} 
            style={{ backgroundColor: '#000' }} 
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginBottom: 15 },
  headerContainer: { borderLeftWidth: 4, paddingLeft: 10, marginVertical: 10, backgroundColor: 'rgba(255,255,255,0.03)', paddingVertical: 6 },
  sectionHeader: { fontSize: 12, fontWeight: '900', letterSpacing: 1 },
  itemBox: { width: ITEM_WIDTH, alignItems: 'center', marginBottom: 15, paddingHorizontal: 5 },
  imageWrapper: { width: ITEM_WIDTH - 20, height: ITEM_WIDTH - 20, borderRadius: 15, borderWidth: 2, padding: 3, backgroundColor: '#1a1a1a', justifyContent: 'center', alignItems: 'center' },
  thumbImage: { width: '100%', height: '100%', borderRadius: 10 },
  itemName: { color: '#eee', fontSize: 10, marginTop: 6, fontWeight: 'bold', textAlign: 'center', height: 25 },
  fullScreenOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#000', zIndex: 99999 },
  toolbar: { flexDirection: 'row', alignItems: 'center', height: 55, backgroundColor: '#16161a', borderBottomWidth: 1, borderBottomColor: '#333' },
  closeBtnBack: { flexDirection: 'row', alignItems: 'center', gap: 8, height: '100%', paddingHorizontal: 15, minWidth: 120 },
  headerTitle: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  hintTextSwipe: { color: '#666', textAlign: 'center', marginBottom: 8, fontSize: 11, fontStyle: 'italic' },
  hintText: { color: '#666', fontSize: 11, fontStyle: 'italic', textAlign: 'center', marginTop: 10 },
  customModalOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 1000000 },
  modalBackdrop: { ...StyleSheet.absoluteFillObject },
  modalContent: { width: '85%', backgroundColor: '#1E1E24', borderRadius: 12, padding: 20, borderWidth: 1 },
  modalTitle: { fontSize: 16, fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center', marginBottom: 15 },
  modalBody: { marginBottom: 20 },
  modalDescLine: { fontSize: 14, lineHeight: 22, textAlign: 'left', marginBottom: 4 },
  modalCloseBtn: { backgroundColor: '#333', paddingVertical: 10, borderRadius: 6, alignItems: 'center' },
  modalCloseText: { color: '#fff', fontWeight: 'bold' },
});