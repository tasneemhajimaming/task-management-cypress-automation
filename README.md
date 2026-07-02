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

- [Task_Management_Test_Cases](./Task_Management_Test_Cases.xlsx)

---

## โครงสร้างโปรเจกต์

```
cypress/
 ├── e2e/
 │    ├── auth.cy.js
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
## Automated Test Coverage

Authentication
- Successful Login
- Invalid Password
- Invalid Email Format
- Logout

Task Management
- Create Task
- Edit Task
- Delete Task
- Filter by Status
- Sort by Title

## Observed Issue

### Feature

Create New Task

### Expected Behavior

เมื่อผู้ใช้คลิกปุ่ม **Create New Task**
ระบบควรนำผู้ใช้ไปยังหน้า `/tasks/new`
และแสดงฟอร์มสำหรับสร้าง Task ใหม่

### Actual Behavior (Manual Testing)

- ระบบส่ง Network Request ไปยัง `/tasks/new`
- UI ไม่เปลี่ยนหน้า
- ผู้ใช้ยังคงอยู่ที่หน้า Task List

อย่างไรก็ตาม เมื่อเปิด `/tasks/new` โดยตรง
สามารถเข้าหน้าสร้าง Task ได้ตามปกติ

### Automated Testing Result

จากการทดสอบด้วย Cypress พบว่า

- สามารถคลิกปุ่ม **Create New Task** ได้
- ระบบนำทางไปยังหน้า `/tasks/new`
- หน้า Create Task แสดงผลและสามารถดำเนินการทดสอบต่อได้ตามปกติ

อย่างไรก็ตาม ผลลัพธ์ดังกล่าวแตกต่างจากการทดสอบแบบ Manual โดยเมื่อผู้ใช้คลิกปุ่ม **Create New Task** ระบบจะเปลี่ยน URL ไปยัง `/tasks/new` เพียงชั่วครู่ ก่อนนำผู้ใช้กลับมายังหน้า `/tasks`

จากการตรวจสอบเพิ่มเติม พบว่า Request ไปยัง `/tasks/new` ได้รับสถานะ **HTTP 200 (Success)** จึงเป็นข้อสังเกตว่าพฤติกรรมดังกล่าวอาจเกิดจาก Logic ภายใน Application (เช่น Client-side Routing หรือ Redirect) มากกว่าปัญหาที่ตัว Link เอง

จึงได้บันทึกพฤติกรรมนี้ไว้เป็น **Observed Issue** เพื่อใช้ประกอบการพิจารณาและตรวจสอบเพิ่มเติม

### QA Observation

พบความแตกต่างของพฤติกรรมระหว่าง Manual Testing และ Automated Testing
จึงบันทึกไว้เป็นข้อสังเกตสำหรับการตรวจสอบเพิ่มเติมของ Demo Application

## สรุป

โปรเจกต์นี้แสดงให้เห็น:
- ความสามารถในการออกแบบ Test Case
- การเขียน Cypress Automation Test
- การจัดโครงสร้างโปรเจกต์ให้ maintainable
- การสังเกตพฤติกรรมระบบที่ไม่สอดคล้อง (UI vs Network)