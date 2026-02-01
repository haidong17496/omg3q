// src/components/UpgradeMatrix.js
import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { formatNumber } from '../utils/format';
import { getGridColumnStrategy } from '../utils/LayoutStrategy';

/**
 * Component hiển thị ma trận nâng cấp.
 * Update: Hồi sinh tính năng hiển thị Tổng nguyên liệu theo từng Tầng (Tier Summary).
 */
export default function UpgradeMatrix({ data, typeCode, layoutConfig, viewConfig }) {
  
  const { groupedData, grandTotal } = useMemo(() => {
    if (!data || !Array.isArray(data) || data.length === 0) {
      return { groupedData: null, grandTotal: {} };
    }

    const total = {};
    const isSpecial = viewConfig?.isSpecialTier;

    const grouped = data.reduce((acc, item) => {
      if (!item) return acc;

      let tierDisplay = isSpecial
        ? item.tier
        : item.step === 0 ? item.tier : item.tier + 1;
      
      if (typeCode === 'chan' && !isSpecial) {
        tierDisplay = item.step === 0 ? item.tier - 1 : item.tier;
      }

      if (!acc[tierDisplay]) acc[tierDisplay] = {};
      const stepKey = item.step === 0 ? 'MAX' : item.step;
      if (!acc[tierDisplay][stepKey]) acc[tierDisplay][stepKey] = [];

      acc[tierDisplay][stepKey].push(item);

      if (!total[item.res_code]) {
        total[item.res_code] = {
          amount: 0,
          name: item.res_name,
          color: item.res_color,
          unit: item.unit,
        };
      }
      total[item.res_code].amount += item.amount;

      return acc;
    }, {});

    return {
      groupedData: grouped,
      grandTotal: total,
    };
  }, [data, typeCode, viewConfig]);

  // Logic kiểm tra hiển thị Sao
  const shouldShowStar = () => {
    const config = viewConfig?.useStarLabel;
    if (!config) return false;
    if (Array.isArray(config)) return config.includes(typeCode);
    return config === true;
  };
  const showStar = shouldShowStar();

  // Hàm sort nguyên liệu (Hiếm xuống cuối hoặc lên đầu tùy ý, ở đây để Hiếm sau cùng)
  const sortResources = (a, b) => {
    const rareUnits = ['viên', 'con', 'túi', 'TBinh', 'mảnh', 'DT', 'đá'];
    const aIsRare = rareUnits.includes(a.unit);
    const bIsRare = rareUnits.includes(b.unit);
    if (aIsRare && !bIsRare) return 1;
    if (!aIsRare && bIsRare) return -1;
    return 0;
  };

  if (!groupedData) {
    return (
      <View style={{ padding: 40, alignItems: 'center' }}>
        <Text style={{ color: '#666', fontSize: 14, fontStyle: 'italic' }}>
          Không có dữ liệu hiển thị
        </Text>
      </View>
    );
  }

  const sortedOverall = Object.values(grandTotal).sort(sortResources);

  return (
    <View style={styles.container}>
      {/* Tổng Overall (Chỉ hiện nếu không phải Special Tier) */}
      {!viewConfig?.isSpecialTier && (
        <View style={styles.summaryContainer}>
          {sortedOverall.map((item, index) => (
            <View key={index} style={styles.summaryBox}>
              <Text style={styles.sumLabel}>
                TỔNG {item.name.toUpperCase()}
              </Text>
              <View style={styles.sumValueRow}>
                <Text style={[styles.sumValue, { color: item.color }]}>
                  {formatNumber(item.amount)}
                </Text>
                <Text style={styles.sumUnit}>{item.unit}</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {Object.keys(groupedData)
        .sort((a, b) => a - b)
        .map((tierKey) => {
          const stepsData = groupedData[tierKey];
          const tierIdx = parseInt(tierKey);

          // --- LOGIC MỚI: TÍNH TỔNG CHO TỪNG TIER (Tier Summary) ---
          const tierTotal = {};
          // Duyệt qua tất cả các step trong tier này để cộng dồn
          Object.values(stepsData).flat().forEach(item => {
            if (!tierTotal[item.res_code]) {
              tierTotal[item.res_code] = {
                amount: 0,
                color: item.res_color,
                short_name: item.res_short_name,
                unit: item.unit
              };
            }
            tierTotal[item.res_code].amount += item.amount;
          });
          // Sắp xếp để hiển thị đẹp
          const sortedTierTotal = Object.values(tierTotal).sort(sortResources);
          // -----------------------------------------------------------

          const sortedSteps = Object.keys(stepsData).sort((a, b) => {
            if (viewConfig?.isSpecialTier) {
              if (a === 'MAX') return -1;
              if (b === 'MAX') return 1;
            } else {
              if (a === 'MAX') return 1;
              if (b === 'MAX') return -1;
            }
            return parseInt(a) - parseInt(b);
          });

          const columns = getGridColumnStrategy(layoutConfig, typeCode, sortedSteps.length);
          const cellWidth = `${99.8 / columns}%`;

          const cardTitle = viewConfig?.tierLabels?.[tierIdx] || 
                           (typeCode === 'chan' ? `GIÁC TỈNH TẦNG ${tierIdx + 1}` : `TẦNG ${tierKey}`);

          return (
            <View key={tierKey} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.headerText}>{cardTitle}</Text>
                
                {/* HIỂN THỊ TỔNG TIER Ở GÓC PHẢI */}
                <View style={styles.headerSummary}>
                  {sortedTierTotal.map((res, idx) => (
                    <Text key={idx} style={[styles.miniSum, { color: res.color }]}>
                      {formatNumber(res.amount)}{' '}
                      <Text style={{ fontSize: 10, fontWeight: 'normal', color: '#888' }}>
                        {res.short_name}
                      </Text>
                    </Text>
                  ))}
                </View>
                {/* -------------------------------- */}
              </View>

              <View style={styles.grid}>
                {sortedSteps.map((stepKey) => {
                  const cellRes = [...stepsData[stepKey]].sort(sortResources);
                  return (
                    <View
                      key={stepKey}
                      style={[styles.cell, { width: cellWidth }]}>
                      <View style={styles.stepLabelRow}>
                        <Text style={styles.stepLabel}>
                          {stepKey === 'MAX'
                            ? (viewConfig?.maxLabel || 'MAX')
                            : (showStar ? `${stepKey} ` : `Bậc ${stepKey}`)}
                        </Text>
                        {showStar && stepKey !== 'MAX' && (
                          <MaterialCommunityIcons
                            name="star"
                            size={10}
                            color="#FFD700"
                          />
                        )}
                      </View>
                      {cellRes.map((res, idx) => (
                        <View key={idx} style={styles.resRow}>
                          <Text
                            style={[styles.amount, { color: res.res_color }]}>
                            {formatNumber(res.amount)}
                          </Text>
                          <Text style={styles.resName}>
                            {res.res_short_name}
                          </Text>
                        </View>
                      ))}
                    </View>
                  );
                })}
              </View>
            </View>
          );
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 8, paddingBottom: 150 },
  summaryContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    flexWrap: 'wrap',
    gap: 8,
  },
  summaryBox: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#333',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  sumLabel: {
    color: '#888',
    fontSize: 9,
    fontWeight: 'bold',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  sumValueRow: { flexDirection: 'row', alignItems: 'baseline', gap: 4 },
  sumValue: { fontSize: 16, fontWeight: 'bold' },
  sumUnit: { fontSize: 10, color: '#666' },
  card: {
    backgroundColor: '#16161a',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333',
  },
  cardHeader: {
    backgroundColor: '#2d2d30',
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  headerText: {
    color: '#FFD700',
    fontWeight: 'bold',
    fontSize: 12,
    letterSpacing: 0.5,
  },
  // Style mới cho Tier Summary
  headerSummary: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  miniSum: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  cell: {
    paddingVertical: 12,
    paddingHorizontal: 2,
    borderWidth: 0.5,
    borderColor: '#2d2d30',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 95,
  },
  stepLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  stepLabel: { fontSize: 10, color: '#aaa', fontWeight: 'bold' },
  resRow: { alignItems: 'center', marginBottom: 4 },
  amount: { fontSize: 15, fontWeight: 'bold' },
  resName: { fontSize: 10, color: '#999', marginTop: -2 },
});