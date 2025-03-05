# ServicePro: ระบบจัดการบริการมืออาชีพ

![โลโก้ ServicePro](https://via.placeholder.com/1200x400?text=ServicePro)

## ภาพรวม

ServicePro เป็นแพลตฟอร์มการจัดการบริการที่ครบวงจร สร้างด้วย React, TypeScript และ Tailwind CSS ออกแบบมาสำหรับธุรกิจที่ให้บริการทำความสะอาด บริการซ่อมบำรุง และบริการมืออาชีพอื่นๆ มอบอินเตอร์เฟซที่ใช้งานง่ายสำหรับลูกค้าในการเลือกดู จอง และจัดการนัดหมายบริการ

## 🌟 คุณสมบัติ

- **การจัดการหมวดหมู่บริการ**: เลือกดูและจองบริการจากหลากหลายหมวดหมู่
- **การจองบริการแบบโต้ตอบ**: อินเตอร์เฟซที่ใช้งานง่ายสำหรับการจองบริการ
- **ระบบตะกร้าสินค้า**: เพิ่มบริการลงตะกร้าและดำเนินการชำระเงิน
- **การแจ้งเตือนแบบเรียลไทม์**: รับการอัพเดทสถานะบริการ
- **การยืนยันตัวตนด้วยใบหน้า (ตัวเลือกเสริม)**: การตรวจสอบผู้ใช้ขั้นสูงด้วยการจดจำใบหน้า
- **ระบบแชทสด**: รับความช่วยเหลือผ่านระบบแชทในตัว
- **สาธิตบริการแบบโต้ตอบ**: สำรวจคุณสมบัติบริการผ่านการสาธิตแบบโต้ตอบ
- **การออกแบบที่ตอบสนอง**: ฟังก์ชันการทำงานครบถ้วนทั้งบนเดสก์ท็อปและมือถือ
- **รองรับหลายภาษา**: อินเตอร์เฟซมีให้เลือกหลายภาษารวมถึงไทยและอังกฤษ
- **การยืนยันตัวตนผู้ใช้**: การเข้าสู่ระบบและการจัดการบัญชีที่ปลอดภัย

## 🛠️ เทคโนโลยี

- **ฟรอนต์เอนด์**: React 18, TypeScript
- **การจัดแต่งสไตล์**: Tailwind CSS
- **การจัดการสถานะ**: React Context API
- **การจดจำใบหน้า**: face-api.js (คุณสมบัติเสริม)
- **ตัวจัดการแพ็คเกจ**: npm/vite
- **สภาพแวดล้อมการพัฒนา**: Vite

## 🚀 เริ่มต้นใช้งาน

### ความต้องการเบื้องต้น

- Node.js (v14 หรือใหม่กว่า)
- npm หรือ yarn

### การติดตั้ง

1. โคลนที่เก็บโค้ด:
```bash
git clone https://github.com/yourusername/service-pro.git
cd service-pro
```

2. ติดตั้งการพึ่งพา:
```bash
npm install
```

3. (ตัวเลือก) เพื่อเปิดใช้งานคุณสมบัติการยืนยันตัวตนด้วยใบหน้า:
```bash
sh install-face-api.sh
```

4. เริ่มเซิร์ฟเวอร์สำหรับการพัฒนา:
```bash
npm run dev
```

5. เปิด [http://localhost:5173](http://localhost:5173) ในเบราว์เซอร์ของคุณ

## 📋 โครงสร้างโปรเจค

```
project/
├── public/             # ไฟล์และทรัพยากรคงที่
├── src/                # ไฟล์ซอร์สโค้ด
│   ├── components/     # คอมโพเนนต์ React
│   │   ├── face/       # คอมโพเนนต์การยืนยันตัวตนด้วยใบหน้า
│   │   ├── chat/       # คอมโพเนนต์ระบบแชท
│   │   └── checkout/   # คอมโพเนนต์ขั้นตอนการชำระเงิน
│   ├── context/        # นิยาม React context
│   ├── data/          # ไฟล์ข้อมูล JSON
│   ├── pages/         # คอมโพเนนต์หน้า
│   ├── utils/         # ฟังก์ชันยูทิลิตี้
│   ├── App.tsx        # คอมโพเนนต์หลักของแอพ
│   └── main.tsx       # จุดเริ่มต้นของแอพพลิเคชัน
├── tailwind.config.js  # การตั้งค่า Tailwind CSS
├── package.json       # การพึ่งพาของโปรเจค
└── README.md          # เอกสารประกอบโปรเจค
```

## 💡 วิธีใช้งาน

### การเลือกดูบริการ

เลือกดูหมวดหมู่บริการต่างๆ ผ่านเมนูนำทางด้านบน แต่ละการ์ดบริการแสดงข้อมูลสำคัญรวมถึงราคา คำอธิบาย และตัวเลือกที่มี

### การจองบริการ

1. เลือกหมวดหมู่บริการ
2. เลือกบริการที่คุณต้องการ
3. กำหนดค่าตัวเลือกบริการถ้ามี
4. คลิก "เพิ่มลงตะกร้า"
5. ดำเนินการชำระเงินเมื่อพร้อม

### การยืนยันตัวตนด้วยใบหน้า

คุณสมบัติการยืนยันตัวตนด้วยใบหน้าให้ความปลอดภัยเพิ่มเติมสำหรับการจองบริการ:

1. คลิกปุ่ม "Face ID" ในแถบนำทาง
2. อนุญาตการเข้าถึงกล้องเมื่อได้รับแจ้ง
3. จัดตำแหน่งใบหน้าของคุณในกรอบ
4. รอให้การตรวจสอบเสร็จสิ้น

หมายเหตุ: ผู้ใช้ครั้งแรกต้องลงทะเบียนใบหน้าโดยเข้าถึงการตั้งค่าโปรไฟล์

### ระบบแชทช่วยเหลือ

ต้องการความช่วยเหลือ? ใช้ระบบแชทในตัวของเรา:

1. คลิกปุ่มแชทที่มุมขวาล่าง
2. พิมพ์คำถามหรือเลือกจากหัวข้อที่แนะนำ
3. รับความช่วยเหลือแบบเรียลไทม์จากทีมสนับสนุนของเรา

## 📷 ภาพหน้าจอ

![หน้าหลัก](https://via.placeholder.com/800x450?text=หน้าหลัก)
![หน้าบริการ](https://via.placeholder.com/800x450?text=หน้าบริการ)
![ระบบแชท](https://via.placeholder.com/800x450?text=ระบบแชท)
![การยืนยันตัวตนด้วยใบหน้า](https://via.placeholder.com/800x450?text=การยืนยันตัวตนด้วยใบหน้า)

## 🧰 การกำหนดค่าขั้นสูง

### ตัวแปรสภาพแวดล้อม

สร้างไฟล์ `.env` ในไดเรกทอรีราก:

```
VITE_API_URL=your_api_url
VITE_FACE_API_MODEL_PATH=path_to_models
```

### โมเดล Face API

หากใช้คุณสมบัติการยืนยันตัวตนด้วยใบหน้า ให้ดาวน์โหลดโมเดลที่จำเป็น:

```bash
mkdir -p public/models
# ดาวน์โหลดโมเดลจาก https://github.com/justadudewhohacks/face-api.js/tree/master/weights
# วางไว้ในไดเรกทอรี public/models
```

## 📝 ลิขสิทธิ์

โปรเจคนี้ได้รับอนุญาตภายใต้ MIT License - ดูรายละเอียดในไฟล์ LICENSE

## 🙏 กิตติกรรมประกาศ

- [Tailwind CSS](https://tailwindcss.com/) สำหรับเฟรมเวิร์กการจัดแต่งสไตล์
- [Face-api.js](https://github.com/justadudewhohacks/face-api.js/) สำหรับฟังก์ชันการจดจำใบหน้า
- [React](https://reactjs.org/) สำหรับไลบรารี UI
- [Vite](https://vitejs.dev/) สำหรับเครื่องมือบิลด์และสภาพแวดล้อมการพัฒนา

