// src/database/data/soul_stone.js

// Hàm helper để tạo data (Tạm thời comment lại chờ có số liệu chuẩn)
/*
const genSoulStone = (tier, resCode, baseAmt) => {
    const data = [];
    for (let s = 1; s <= 20; s++) {
        // Ví dụ: Mỗi bậc tốn bao nhiêu Hồn thạch đơn + Mảnh
        // data.push({ type: 'tien_cap', tier, step: s, res: 'ht_don', amt: s * 50 }); 
        // data.push({ type: 'tien_cap', tier, step: s, res: resCode, amt: Math.ceil(s / 2) });
    }
    return data;
};
*/

// Hiện tại chưa có data chuẩn nên để mảng rỗng
export const soulStoneData = [
    // ...genSoulStone(0, 'manh_ht_tim', 1), // Tím
    // ...genSoulStone(1, 'manh_ht_cam', 2), // Cam
    // ...genSoulStone(2, 'manh_ht_do', 3),  // Đỏ
];