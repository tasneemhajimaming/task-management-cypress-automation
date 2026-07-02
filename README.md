# QA Technical Test - Cypress Automation

## ภาพรวมโปรเจกต์

โปรเจกต์นี้เป็นการทำ Automated Test สำหรับระบบ Task Management โดยใช้ Cypress เพื่อทดสอบ flow หลักของระบบ ได้แก่ Login และ Task Management

เป้าหมายหลักคือแสดงแนวคิดการออกแบบ Test, โครงสร้างโค้ดที่อ่านง่าย และการเขียน Automated Test ที่สามารถดูแลต่อได้

---

## เครื่องมือที่ใช้

- Cypress
- JavaScript

---

## แนวทางการทดสอบ (Test Approach)

- แบ่งการทดสอบตาม Feature (Login / Task)
- ใช้ Custom Command (`cy.login()`) เพื่อลดการเขียนโค้ดซ้ำ
- เน้นการทดสอบ Flow หลักของผู้ใช้งาน (End-to-End Flow)
- ตรวจสอบผลลัพธ์จาก UI เป็นหลัก (Observable Behavior)
- ใช้แนวคิด Positive Testing เป็นหลัก

---

## Test Case

Test Case ถูกจัดทำในไฟล์ Excel

- ไฟล์: ``

---

## โครงสร้างโปรเจกต์

```
cypress/
 ├── e2e/
 │    ├── login.cy.js
 │    └── task.cy.js
 ├── support/
 │    └── commands.js
```

---

## วิธีการรันโปรเจกต์

ติดตั้ง dependency

```bash
npm install
```

เปิด Cypress Test Runner

```bash
npx cypress open
```

หรือรันแบบ headless

```bash
npx cypress run
```

---

## Assumptions

- ใช้บัญชีทดสอบ:
  - Email: admin@example.com
  - Password: admin123
- โฟกัสการทดสอบเฉพาะ Main Flow ของระบบ
- ไม่ครอบคลุม edge case ทุกกรณี

---

## ปัญหาที่พบ (Observed Issue)

### ฟีเจอร์: Create New Task

**พฤติกรรมที่พบ:**

- เมื่อกดปุ่ม "Create New Task"
- ระบบมีการส่ง Network Request ไปยัง `/tasks/new`
- แต่ UI ไม่เปลี่ยนหน้าไปยังฟอร์มสร้าง Task
- อย่างไรก็ตาม หากเข้าผ่าน URL `/tasks/new` โดยตรง จะสามารถใช้งานหน้า Create Task ได้ตามปกติ

---

### ผลลัพธ์ที่คาดหวัง (Expected Behavior)

- เมื่อกดปุ่ม "Create New Task"
- ควรมีการเปลี่ยนหน้าไปยัง `/tasks/new`
- ผู้ใช้งานควรเข้าสู่หน้าฟอร์มสร้าง Task ได้ทันที

---

### ผลลัพธ์ที่เกิดขึ้นจริง (Actual Behavior)

- มี Network Request ไปยัง `/tasks/new`
- UI ไม่เปลี่ยนหน้า (ไม่เกิด navigation)
- พฤติกรรมไม่สอดคล้องกับการใช้งานของผู้ใช้

---

### การวิเคราะห์เบื้องต้น (QA Perspective)

- เป็นลักษณะของ **UI Navigation Inconsistency**
- อาจเกิดจาก routing ไม่ถูก trigger หลัง API call หรือ event handler ไม่ทำงานสมบูรณ์
- สามารถใช้เป็น exploratory test case เพื่อยืนยันพฤติกรรมของระบบเพิ่มเติม

---

## สรุป

โปรเจกต์นี้แสดงให้เห็น:
- ความสามารถในการออกแบบ Test Case
- การเขียน Cypress Automation Test
- การจัดโครงสร้างโปรเจกต์ให้ maintainable
- การสังเกตพฤติกรรมระบบที่ไม่สอดคล้อง (UI vs Network)