# QA Technical Test - Automated Test Project

## Project Overview

โปรเจกต์นี้เป็นการสร้าง Automated Test สำหรับเว็บแอปพลิเคชัน Task Management ที่ทดสอบจากหน้าจอ Login ไปยัง Task flow หลัก โดยเน้นคุณภาพของโค้ดทดสอบ โครงสร้างโปรเจกต์ที่อ่านง่าย และการออกแบบ Test Case ที่ชัดเจน

- เว็บไซต์ทดสอบ: `https://app-testing-sea-02.azurewebsites.net/login`
- เป้าหมายหลัก: ทดสอบ flow `Login` และ `Task Management`
- โฟกัส: ความอ่านง่ายของโค้ด, ความ maintainable, และแนวคิด QA แบบมืออาชีพ

## Tools & Tech Stack

- Framework: `Cypress`
- Language: `JavaScript`
- Dependencies:
  - `cypress` v15.x
- Configuration:
  - `cypress.config.js` กำหนด `baseUrl` เป็น `https://app-testing-sea-02.azurewebsites.net`

## Test Strategy / Approach

แนวทางการออกแบบการทดสอบประกอบด้วย:

- Positive testing: ตรวจสอบ flow หลัก เช่น Login สำเร็จ, Logout, Edit Task
- Exploratory testing: สังเกต behavior ที่ไม่สอดคล้องระหว่าง UI กับ routing/network
- Bug discovery mindset: ค้นหา inconsistency ที่เกิดจาก transition หรือ navigation
- UI testing: ยืนยันว่าหน้าจอแสดงผลตาม expectation หลัง action แต่ละขั้น

นอกจากนี้ยังออกแบบให้:

- แยก scenario ตาม feature เพื่อให้โค้ดง่ายต่อการขยาย
- ใช้ custom command `cy.login()` เพื่อเพิ่ม reuse และลด duplication
- ให้ความสำคัญกับ observable outcome เช่น `My Tasks` ต้องปรากฏหลัง login

## Test Case Design (Google Sheet)

Test case ถูกออกแบบและบันทึกใน Google Sheet เพื่อให้ทีมสามารถอ่านและตรวจสอบได้ง่าย

คอลัมน์หลักใน template:

- `Test Case ID` - รหัสกรณีทดสอบที่ชัดเจน เช่น `AUTH-01`, `CRUD-02`, `FILT-01`
- `Description` - อธิบายการทำงานหรือเป้าหมายของกรณีทดสอบ
- `Steps` - รายละเอียดขั้นตอนการทดสอบแบบทีละขั้น
- `Expected Result` - ผลลัพธ์ที่คาดหวังหลังทำตาม steps

สรุป test case หลัก:

- Login สำเร็จด้วยข้อมูล admin
- Login ไม่สำเร็จเมื่อ password ผิด
- Logout สำเร็จและ redirect กลับหน้า login
- แสดงรายการ Task ในหน้า My Tasks
- แก้ไข Task แล้วกลับไปดูรายการได้
- ฟิลเตอร์ Tasks ตามสถานะและ Priority
- ตรวจสอบ behavior ของปุ่ม Create New Task

## Observed Issue / Potential Bug

### Observed behavior

พบพฤติกรรมที่น่าสนใจหลังจาก login สำเร็จ:

- คลิกปุ่ม `Create New Task`
- ระบบมี network request ไปยัง `/tasks/new`
- UI ยังคงอยู่บนหน้าเดิม และไม่มี navigation ไปยัง `/tasks/new`
- หากเข้า URL `/tasks/new` โดยตรง จะเข้าหน้าได้ปกติ

### Expected behavior

- เมื่อคลิกปุ่ม `Create New Task` หน้า UI ควรเรียก route `/tasks/new`
- ควรเปลี่ยนหน้าให้ผู้ใช้เข้าสู่ฟอร์มสร้าง task ใหม่ทันที

### Actual behavior

- network request ถูกยิง แต่ UI ไม่ได้เปลี่ยนหน้า
- routing behavior ไม่สอดคล้องกับ user interaction

### QA mindset ที่สะท้อน

- นี่เป็น `behavioral inconsistency` ระหว่าง UI, routing และ network
- สามารถนำไปเป็น `exploratory test case` เพื่อยืนยันการทำงานของ navigation
- แสดงแนวคิดว่าการทดสอบไม่ใช่แค่ดูข้อความหรือ element แต่ต้องสังเกต flow ทั้งระบบ

## Project Structure

โครงสร้างโปรเจกต์สะท้อนแนวทางแยกความรับผิดชอบอย่างชัดเจน:

- `cypress/e2e/` - เก็บไฟล์ test case หลัก
  - `login.cy.js`
  - `logout.cy.js`
  - `edit.cy.js`
  - `filter.cy.js`
- `cypress/fixtures/` - เก็บข้อมูล mock หรือ data ที่ใช้ในการทดสอบ
- `cypress/support/` - เก็บ custom commands และการตั้งค่าที่ใช้ร่วมกัน
  - `commands.js` มี `cy.login()` เพื่อ reuse flow login
- `cypress.config.js` - กำหนดค่า baseUrl และ node event
- `package.json` - กำหนด dependency และสคริปต์ของโปรเจกต์

## How to Run Tests

1. ติดตั้ง dependency:

```bash
npm install
```

2. เปิด Cypress Test Runner:

```bash
npx cypress open
```

3. หรือรันแบบ headless:

```bash
npx cypress run
```

4. หากต้องการรันเฉพาะไฟล์:

```bash
npx cypress run --spec "cypress/e2e/login.cy.js"
```

## Assumptions / Limitations

- ข้อมูล login ใช้บัญชี `admin@example.com` กับ `admin123`
- การทดสอบปัจจุบันมุ่งเน้น flow หลัก ไม่ได้ครอบคลุมทุก edge case ของ Task CRUD
- ยังไม่มีการจัดการ test data ที่ซับซ้อน เช่น mock API หรือ database isolation
- ไม่มีการตรวจสอบ accessibility หรือ performance ในเวอร์ชันนี้

## Future Improvements

แผนต่อไปเพื่อเพิ่มคุณภาพและความน่าเชื่อถือของโปรเจกต์:

- Integrate กับ `CI/CD` เพื่อรัน tests อัตโนมัติเมื่อมี pull request
- เพิ่ม reporting เช่น `HTML report` หรือ dashboard จาก Cypress
- ขยาย coverage ให้รวม `Create Task`, `Delete Task`, `Sort` และ `กรณี negative` เพิ่มเติม
- เพิ่ม layer ของ `page object` หรือ `component abstraction` เพื่อให้โค้ด maintainable มากขึ้น
- เพิ่ม exploratory / regression test สำหรับ inconsistency ที่พบในหน้า `/tasks/new`
