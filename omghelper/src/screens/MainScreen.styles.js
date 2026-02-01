import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../theme/Theme';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background },

  // --- FILTER BAR LƠ LỬNG ---
  bottomBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingBottom: 15,
    zIndex: 1,
  },
  compactBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1E1E24', // Màu tối sáng hơn tí để nổi bật
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 30, // Bo tròn kiểu viên thuốc
    borderWidth: 1,
    borderColor: '#333',
    // Đổ bóng xịn
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
    width: '100%',
  },
  barLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  breadcrumbText: { color: '#fff', fontSize: 13, fontWeight: '700' },
  arrow: { color: '#555', fontWeight: 'bold' },
  
  filterIconBg: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: COLORS.primary, 
    paddingVertical: 6, 
    paddingHorizontal: 12, 
    borderRadius: 20,
    gap: 4
  },
  filterBtnText: { color: '#fff', fontSize: 12, fontWeight: 'bold' }
});