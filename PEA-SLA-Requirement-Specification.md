# PEA-SLA Requirement Specification

**ระบบติดตามข้อตกลงระดับการให้บริการ — การไฟฟ้าส่วนภูมิภาค**
PEA Service Level Agreement Tracking System (PEA-SLA)
เวอร์ชัน: 1.0 | ปีงบประมาณ: 2568 | รูปแบบ: Hybrid Co-delivery

---

## 1. Project Overview

### 1.1 วัตถุประสงค์

การไฟฟ้าส่วนภูมิภาค (กฟภ.) พัฒนาระบบ PEA-SLA เพื่อยกระดับการบริหารจัดการข้อตกลงระดับการให้บริการ จากกระบวนการ Google Sheet/Excel สู่ระบบดิจิทัลครบวงจร สอดคล้องกับโครงสร้างสถาปัตยกรรมธุรกิจ (Business Architecture) ของ กฟภ.

**เป้าหมายหลัก:**
- สร้างระบบติดตาม SLA ที่เชื่อมโยงกับโครงสร้าง BA ขององค์กรอย่างครบวงจร
- รองรับการรายงานผลรายเดือน/รายปีแบบ Manual พร้อม Workflow อนุมัติหลายระดับ
- เปิดใช้การติดตามสถานะแบบ Real-time ตามระดับสายงาน ฝ่าย เขต และกอง
- รองรับการวิเคราะห์ข้อมูล Dashboard และออกรายงานตาม BA ที่กำหนด
- เชื่อมต่อกับระบบอื่นๆ ของ กฟภ. เช่น HR Platform, PEA Work D, SAP ผ่าน RESTful API

### 1.2 ขอบเขตระบบ

ระบบครอบคลุมผู้ใช้ 3 กลุ่มหลัก และ feature หลัก 6 module ตามโครงสร้าง Business Architecture ของ กฟภ.

---

## 2. Stakeholders & Personas

### Persona A — กนอ. (ผู้ดูแลระบบ / กองพัฒนาระบบงานองค์กร)

| หัวข้อ | รายละเอียด |
|--------|-----------|
| **ชื่อบทบาท** | ผู้ดูแลระบบ / System Admin |
| **สังกัด** | กองพัฒนาระบบงานองค์กร (กพอ.) |
| **หน้าที่หลัก** | ตั้งค่า BA Master, กำหนด KPI/SLA, เปิด-ปิดรอบรายงาน, จัดการสิทธิ์ผู้ใช้, ล็อกข้อมูล |
| **Pain Point** | ข้อมูล SLA กระจายใน Excel หลายไฟล์, ติดตามสถานะหน่วยงานยาก, ออกรายงานสรุปใช้เวลานาน |
| **Goal** | จัดการ BA Master ครบในที่เดียว, ติดตามสถานะรายงานทุกหน่วยงานได้แบบ Real-time, ล็อกรอบได้โดยมั่นใจว่าข้อมูลครบถ้วน |

### Persona B — ผู้รับผิดชอบระดับสายงาน / ฝ่าย / เขต / กอง

| หัวข้อ | รายละเอียด |
|--------|-----------|
| **ชื่อบทบาท** | ผู้บันทึกและตรวจสอบรายงาน SLA |
| **สังกัด** | สายงาน / ฝ่าย / เขต / กอง ตามโครงสร้าง กฟภ. |
| **หน้าที่หลัก** | กรอกผลการดำเนินงาน SLA รายเดือน ส่งรายงาน ตรวจสอบ และรับรองผล |
| **Pain Point** | ไม่รู้ว่าต้องรายงาน KPI ไหนบ้าง, ไม่ทราบ deadline, ถูกคืนแก้ไขโดยไม่รู้สาเหตุชัดเจน |
| **Goal** | รู้รายการที่ต้องรายงานชัดเจน, ส่งรายงานได้สะดวก, ติดตามสถานะได้แบบ Real-time |

### Persona C — พนักงาน กฟภ. ระดับหน้างาน

| หัวข้อ | รายละเอียด |
|--------|-----------|
| **ชื่อบทบาท** | ผู้ใช้งานทั่วไป |
| **สังกัด** | หน่วยงาน/แขวงในพื้นที่ทั่วประเทศ |
| **หน้าที่หลัก** | ดูโครงสร้าง BA, ดูผล SLA ของตนเองและหน่วยงาน, กรอก Learning Form ที่ได้รับ Assign |
| **Pain Point** | ไม่เข้าใจโครงสร้าง BA ขององค์กร, ไม่รู้ว่างานตัวเองสัมพันธ์กับ SLA ไหน |
| **Goal** | เข้าใจภาพรวมองค์กร, ดูผล SLA ของหน่วยงานตนเองได้ง่าย |

### Role ทั้งหมดในระบบ

| # | Role | สิทธิ์การเข้าถึง |
|---|------|----------------|
| 1 | Super Admin (กนอ.) | ดูแลระบบทั้งหมด จัดการ BA Master ทุกหน่วยงาน |
| 2 | ผู้บริหารระดับสายงาน | ดูภาพรวมทุกฝ่ายในสายงาน รับรองผล อนุมัติ |
| 3 | ผู้บริหารระดับฝ่าย/เขต | ดูได้เฉพาะฝ่าย/เขตที่รับผิดชอบ ส่งและตรวจสอบรายงาน |
| 4 | ผู้บริหารระดับกอง | ดูและกรอกได้เฉพาะกองของตนเอง |
| 5 | พนักงานหน้างาน | ดูข้อมูล BA, SLA ของตนเอง กรอก Learning Form ที่ได้รับ Assign |

---

## 3. Functional Requirements

### F01 — Dashboard และภาพรวมข้อมูล `[Must Have]` `Phase 1`

**คำอธิบาย:** หน้าจอหลักที่รวบรวมข้อมูลผล SLA และสถานะการรายงานทั่วองค์กร แสดงผลแบบ Real-time และแตกต่างตาม Role

| Feature ID | รายละเอียด | Priority |
|-----------|-----------|---------|
| F01-01 | Dashboard ภาพรวมองค์กร: ผล SLA รายปี, % ความสำเร็จ, KPI ผ่าน/ไม่ผ่าน, จำนวนรายงานครบ/ยังไม่ครบ | Must Have |
| F01-02 | Dashboard ตาม BA: แสดงผลแยกตาม Building Block / Key Work Process / Work Process / Job | Must Have |
| F01-03 | Dashboard Self-Tracking: ผล SLA เฉพาะของ user และหน่วยงานที่สังกัด | Must Have |
| F01-04 | Dashboard Unit-Tracking: ผล SLA รายหน่วยงานตามสิทธิ์ที่กำหนด | Must Have |
| F01-05 | Graph แนวโน้มรายเดือน ย้อนหลัง 3 ปี เปรียบเทียบระหว่างหน่วยงาน | Should Have |
| F01-06 | Filter: สายงาน, ฝ่าย, กอง, เขต, Building Block, Work Process, ช่วงเวลา | Must Have |
| F01-07 | Widget สรุปสถานะรอบรายงาน: รายงานแล้ว / ยังไม่รายงาน / ล่าช้า / รับรองแล้ว / ล็อกแล้ว | Must Have |
| F01-08 | Drill-down จาก Dashboard ลงรายละเอียดรายหน่วยงาน/รายตัวชี้วัด | Must Have |
| F01-09 | Export รายงาน Dashboard เป็น Excel, CSV หรือ PDF ตาม Template กฟภ. | Must Have |

**Acceptance Criteria:**
- Dashboard โหลดภายใน 3 วินาที
- ข้อมูลอัปเดตแบบ Real-time ไม่เกิน 30 วินาที
- แต่ละ Role เห็นข้อมูลตามสิทธิ์ที่กำหนดเท่านั้น
- ดูย้อนหลังได้ไม่น้อยกว่า 3 ปี

---

### F02 — Business Architecture (BA) Management `[Must Have]` `Phase 1`

**คำอธิบาย:** ระบบจัดการข้อมูลสถาปัตยกรรมธุรกิจและ SLA Master ที่เป็นต้นแบบสำหรับทุกหน่วยงาน เข้าใช้งานได้เฉพาะ กนอ.

| Feature ID | รายละเอียด | Priority |
|-----------|-----------|---------|
| F02-01 | จัดการโครงสร้าง BA: Building Block, Key Work Process, Work Process, Job | Must Have |
| F02-02 | จัดการ KPI/SLA: ชื่อ, ค่าเป้าหมาย, เกณฑ์การประเมิน, สูตรคำนวณ, รอบรายงาน | Must Have |
| F02-03 | กำหนด Version และ Effective Date ของ SLA Master แต่ละรายการ | Must Have |
| F02-04 | กำหนดหน่วยงานผู้รับผิดชอบ และผู้รับบริการ ของ KPI/SLA แต่ละตัว | Must Have |
| F02-05 | กำหนดแหล่งข้อมูลในการตรวจสอบ และสถานะการใช้งาน (Active/Inactive) | Must Have |
| F02-06 | CRUD: เพิ่ม, แก้ไข, ปิดใช้งาน, ค้นหา, กรอง และ Export ข้อมูล Master | Must Have |
| F02-07 | แสดงโครงสร้าง BA แบบ Hierarchy Tree ให้ผู้ใช้ทั่วไปดูได้ (View Only) | Must Have |
| F02-08 | Import ข้อมูล SLA Master จาก Excel/CSV พร้อมตรวจสอบ Duplicate และ Mapping | Must Have |
| F02-09 | Audit Trail: บันทึกประวัติการแก้ไข BA Master ทุก action พร้อม Timestamp | Must Have |

**Acceptance Criteria:**
- เฉพาะ Role กนอ. เข้าใช้งาน CRUD ได้
- ผู้ใช้ทั่วไปดูโครงสร้าง BA ได้แบบ Read-only
- Import Excel ตรวจสอบ Duplicate และแสดงผลก่อน Confirm เข้าระบบ

---

### F03 — SLA รายงานผล (Manual Reporting) `[Must Have]` `Phase 1`

**คำอธิบาย:** ระบบกรอกผลการดำเนินงาน SLA แบบ Manual สำหรับหน่วยงานผู้รับผิดชอบ รองรับ Draft, Submit, Review, Approve และ Lock

| Feature ID | รายละเอียด | Priority |
|-----------|-----------|---------|
| F03-01 | แสดงรายการ KPI/SLA ที่หน่วยงานต้องรายงานในรอบปัจจุบัน | Must Have |
| F03-02 | กรอกผลรายงาน: จำนวนงานส่งมอบ, จำนวนที่รับได้, จำนวนที่ไม่ผ่านเป้าหมาย | Must Have |
| F03-03 | กรอกระยะเวลาเป้าหมายและระยะเวลาดำเนินการจริง | Must Have |
| F03-04 | บันทึกสาเหตุที่ไม่เป็นไปตามเป้าหมาย และแนวทางการแก้ไข | Must Have |
| F03-05 | แนบเอกสารหลักฐาน: PDF, DOCX, XLSX, JPG, PNG สูงสุด 10MB | Must Have |
| F03-06 | แนบ URL หลักฐานประกอบ พร้อม Preview | Should Have |
| F03-07 | Auto-save ทุก 30 วินาที รองรับบันทึกร่างก่อน Submit | Must Have |
| F03-08 | Validation ก่อน Submit: ตรวจสอบความครบถ้วนแสดงช่องที่ยังขาดอยู่ | Must Have |
| F03-09 | แสดงสถานะรายงานตลอดเวลา: ยังไม่รายงาน / บันทึกร่าง / ส่งแล้ว / ถูกคืน / รับรอง / ล็อก | Must Have |
| F03-10 | Comment Thread ระหว่างผู้บันทึก ผู้ตรวจสอบ และผู้อนุมัติ ภายในรายการเดียวกัน | Must Have |

**Acceptance Criteria:**
- Auto-save ทำงานทุก 30 วินาที โดยไม่กระทบ UX
- Validation แสดง error message ภาษาไทยชัดเจน
- ฟอร์มแสดงสถานะปัจจุบันตลอดเวลา
- ผู้บันทึกเห็นประวัติการเปลี่ยนแปลงสถานะของรายงานตนเองได้

---

### F04 — SLA Workflow การส่ง ตรวจสอบ และรับรองผล `[Must Have]` `Phase 1`

**คำอธิบาย:** ระบบ Workflow 7 ขั้นตอนสำหรับกระบวนการรายงาน ตรวจสอบ รับรอง และล็อกข้อมูล SLA

| Feature ID | รายละเอียด | Priority |
|-----------|-----------|---------|
| F04-01 | รองรับ 7 สถานะ Workflow: ยังไม่รายงาน, บันทึกร่าง, ส่งรายงานแล้ว, ถูกคืนแก้ไข, ส่งใหม่หลังแก้ไข, รับรองผลแล้ว, ล็อกข้อมูลแล้ว | Must Have |
| F04-02 | ตรวจสอบสถานะรอบรายงาน: รายงายรายเดือน, รายไตรมาส ตามที่กนอ. กำหนด | Must Have |
| F04-03 | ระบุผู้ดำเนินการ วันเวลา เหตุผลการคืนแก้ไข ในทุก Transition | Must Have |
| F04-04 | ผู้ตรวจสอบ (Reviewer) คืนรายงานได้พร้อมเหตุผล ผู้บันทึกแก้ไขและส่งใหม่ | Must Have |
| F04-05 | ผู้อนุมัติ (Approver) รับรองผลได้ หรือส่งกลับไปผู้ตรวจสอบ | Must Have |
| F04-06 | กนอ. ล็อกข้อมูลรอบรายงานได้ หลังจากทุกรายการรับรองครบ | Must Have |
| F04-07 | Audit Trail: บันทึกประวัติทุก action พร้อม ผู้ดำเนินการ, วันเวลา, ค่าก่อน/หลัง, เหตุผล | Must Have |
| F04-08 | แก้ไขข้อมูลหลังปิดรอบต้องใช้สิทธิ์พิเศษ พร้อมเหตุผลและ Audit Trail | Must Have |
| F04-09 | แสดง Timeline ประวัติการเปลี่ยนสถานะของแต่ละรายการรายงาน | Should Have |

**Acceptance Criteria:**
- Workflow ครบทุก Transition ตาม 7 สถานะ
- ไม่สามารถย้อนกลับข้ามขั้นตอนได้ เว้นแต่มีสิทธิ์พิเศษ
- ทุก Transition บันทึก Audit Trail ครบถ้วน

---

### F05 — กำหนดรอบรายงานและติดตามสถานะ `[Must Have]` `Phase 1`

**คำอธิบาย:** เครื่องมือสำหรับ กนอ. ในการกำหนดรอบรายงาน มอบหมายรายการ และติดตามสถานะรายหน่วยงาน

| Feature ID | รายละเอียด | Priority |
|-----------|-----------|---------|
| F05-01 | กำหนดรอบรายงาน: วันเปิดรับข้อมูล, วันครบกำหนดส่ง, วันปิดรอบ | Must Have |
| F05-02 | มอบหมาย KPI/SLA แต่ละรายการให้หน่วยงานที่รับผิดชอบรายงานผล | Must Have |
| F05-03 | แสดงสถานะรายงานผลรายหน่วยงาน: รายงานแล้ว / ยังไม่รายงาน / ล่าช้า / ถูกคืน / รับรอง / ล็อก | Must Have |
| F05-04 | Status Summary Bar แสดงจำนวนรายการในแต่ละสถานะแบบ Realtime | Must Have |
| F05-05 | ปฏิทินรอบรายงาน: แสดงรอบปัจจุบัน, ที่ผ่านมา และที่จะถึง | Should Have |
| F05-06 | แจ้งเตือน กนอ. เมื่อมีหน่วยงานที่เกินกำหนดส่ง | Must Have |

**Acceptance Criteria:**
- กนอ. กำหนดรอบรายงานใหม่ได้ภายใน 5 นาที
- สถานะอัปเดตแบบ Real-time เมื่อหน่วยงานดำเนินการ

---

### F06 — Learning Form & QIR `[Must Have]` `Phase 2`

**คำอธิบาย:** ระบบประเมินผลและปรับปรุงกระบวนการ เชื่อมโยงกับ SLA ที่ไม่ผ่านเกณฑ์ รองรับการ Assign และ Approve ระดับหน่วยงาน

| Feature ID | รายละเอียด | Priority |
|-----------|-----------|---------|
| F06-01 | สร้าง QIR อัตโนมัติจาก KPI/SLA ที่ไม่ผ่านเกณฑ์ | Must Have |
| F06-02 | Assign ผู้รับผิดชอบ (Assignee) และผู้อนุมัติ (Approver) แยกต่างหากสำหรับแต่ละ form | Must Have |
| F06-03 | บันทึก QIR: สาเหตุ, ประเภทข้อยกเว้น, ช่วงเวลา, ผู้บันทึก, ผู้พิจารณา, สถานะ | Must Have |
| F06-04 | สร้าง Learning Form รายปีจาก QIR ที่ผ่านการพิจารณา: วิเคราะห์ว่าควรปรับปรุงกระบวนการไหน | Must Have |
| F06-05 | ผู้บริหารระดับสูงเลือก QIR เพื่อนำใส่ Learning Form ของหน่วยงานได้ | Must Have |
| F06-06 | ติดตามสถานะแผนแก้ไข: กำหนดแล้วเสร็จ, ผู้รับผิดชอบ, สถานะการดำเนินการ | Must Have |
| F06-07 | แสดงรายการที่ยังค้างดำเนินการใน Dashboard และรายงานติดตามผล | Must Have |
| F06-08 | ตรวจสอบสิทธิ์การสร้างข้อมูลตามสังกัด ตามเงื่อนไขที่กนอ. กำหนด | Must Have |
| F06-09 | Audit Trail: ประวัติทุก action ใน Learning Form และ QIR | Must Have |

**Acceptance Criteria:**
- QIR สร้างได้จาก SLA ที่ไม่ผ่านโดยอัตโนมัติ
- ผู้รับผิดชอบและผู้อนุมัติเห็น Task ของตนเองชัดเจน
- สถานะแผนแก้ไขแสดงใน Dashboard ของ กนอ. และหัวหน้าหน่วยงาน

---

### F07 — Role and Permission Management `[Must Have]` `Phase 1`

**คำอธิบาย:** ระบบควบคุมการเข้าถึงข้อมูลตามบทบาทและขอบเขตสังกัด รองรับ RBAC และ Single Sign-On

| Feature ID | รายละเอียด | Priority |
|-----------|-----------|---------|
| F07-01 | รองรับ 5 Role ตามตาราง Role ด้านบน พร้อม Data Scope ตามสังกัด | Must Have |
| F07-02 | Role-Based Access Control (RBAC) ระดับ Feature และระดับข้อมูล | Must Have |
| F07-03 | Data Scoping: พนักงานหน้างานเห็นเฉพาะหน่วยงานตน, ผู้บริหารเขตเห็นเฉพาะเขตตน | Must Have |
| F07-04 | จัดการผู้ใช้: เพิ่ม, แก้ไข, ระงับ, กำหนด Role และขอบเขตสิทธิ์ | Must Have |
| F07-05 | Integration กับ PEA HR Data Platform — Sync โครงสร้างองค์กร บุคลากร สังกัด | Must Have |
| F07-06 | Single Sign-On (SSO) ผ่าน PEA Email / Active Directory | Must Have |
| F07-07 | บันทึก Access Log: ทุกการเข้าถึงที่สำคัญพร้อม Timestamp | Must Have |

**Acceptance Criteria:**
- ผู้ใช้ที่ไม่มีสิทธิ์ไม่สามารถเข้าถึงข้อมูลหน่วยงานอื่นได้
- SSO ทำงานร่วมกับ Active Directory ของ กฟภ.
- Role ที่ Sync มาจาก HR Platform อัปเดตอัตโนมัติเมื่อโครงสร้างเปลี่ยน

---

### F08 — Notification System `[Must Have]` `Phase 2`

**คำอธิบาย:** ระบบแจ้งเตือนอัตโนมัติผ่านหลายช่องทาง ตามสิทธิ์บทบาทและสังกัดผู้ใช้งาน

| ช่องทาง | รายละเอียด |
|---------|-----------|
| In-App Notification | แจ้งเตือนภายในระบบ SLA Tracking |
| PEA Work D Super App | ผ่าน PEA Work D ช่องทางหลักขององค์กร |
| Webex | สำหรับหน่วยงานที่กำหนด |
| Email (@pea.co.th) | แจ้งเตือนผ่าน email กฟภ. (กรณีสำคัญ) |

**การแจ้งเตือนตาม Role:**

ผู้รับผิดชอบ/ผู้บันทึกรับแจ้งเตือนเมื่อ: เปิดรอบรายงาน, Deadline ใกล้ถึง (7 วัน / 3 วัน / วันครบ), รายงานถูกคืนแก้ไข, รายงานได้รับการรับรอง, มีข้อมูลที่ Mapping ไม่ได้

กนอ. รับแจ้งเตือนเมื่อ: มีหน่วยงานเกินกำหนดส่ง, Integration กับระบบอื่นเกิดข้อผิดพลาด, มีข้อมูลที่ไม่สามารถ Mapping ได้

ผู้ตรวจสอบ/ผู้อนุมัติรับแจ้งเตือนเมื่อ: มีรายงานรอตรวจสอบ/รออนุมัติ, มีรายการค้างนานเกินกำหนด

---

### F09 — API Integration `[Must Have]` `Phase 2`

**คำอธิบาย:** เชื่อมต่อกับระบบอื่นๆ ของ กฟภ. ผ่าน RESTful API เพื่อรับข้อมูล ส่งข้อมูล และแจ้งเตือน

| ระบบที่ต้อง Integrate | ข้อมูลที่รับส่ง |
|---------------------|----------------|
| PEA HR Data Platform | บุคลากร, โครงสร้างองค์กร, ตำแหน่ง, สังกัด, สถานะพนักงาน |
| PEA Work D Super App | ส่ง Notification, ดึงข้อมูล Role และ Data Scope |
| Webex | ส่ง Notification |
| SAP | ข้อมูลประกอบ SLA สำหรับรายการที่ดึงอัตโนมัติได้ |
| EPM / Dashboard กลาง | ส่งออกผล SLA ที่รับรองแล้ว |
| DDOC / DMSX | เชื่อมเอกสารหลักฐาน |
| Tempo (Distributed Tracing) | Monitoring, Log, OpenTelemetry |

**มาตรฐาน API:** RESTful | Swagger/OpenAPI 3.0 | Webhook Support | Interface Specification ต้องได้รับความเห็นชอบก่อนพัฒนา

---

## 4. Non-Functional Requirements

| ด้าน | ข้อกำหนด |
|------|---------  |
| **Performance** | Page load < 3 วินาที \| รองรับผู้ใช้งานพร้อมกันตามจำนวนจริงของ กฟภ. \| API response < 1 วินาที \| Export รายงานแล้วเสร็จภายใน 30 วินาที |
| **Availability** | Uptime 99.5% ต่อปี \| Backup อัตโนมัติรายวัน \| Rollback Plan กรณีเกิดปัญหาขณะ Deploy |
| **Security** | HTTPS/TLS \| Encrypt ข้อมูลสำคัญในฐานข้อมูล \| RBAC ทุก Endpoint \| Log การเข้าถึงครบถ้วน \| ผ่าน Security Scan ตามมาตรฐาน กฟภ. |
| **Compatibility** | Chrome, Edge, Firefox, Safari เวอร์ชันล่าสุด \| Responsive Design \| iOS และ Android |
| **Usability** | ผู้ใช้ใหม่ทำงานหลักได้ภายใน 15 นาทีโดยไม่ต้องอบรม \| ภาษาไทยเป็นหลัก |
| **PDPA** | แสดงข้อมูลบุคลากรเท่าที่จำเป็น \| จำกัดการเข้าถึงข้อมูลส่วนบุคคลตามสิทธิ์ |
| **Maintainability** | Unit Test Coverage ≥ 70% \| API Version Control \| Technical Documentation ครบ |
| **Scalability** | รองรับการขยายตัวโดยไม่ต้อง Rearchitect ใหม่ |
| **Logging** | Access Log, Error Log, Audit Log, Performance Log \| เชื่อมต่อ Tempo ผ่าน OpenTelemetry |

---

## 5. Data Models

### 5.1 SLA Master — Data Structure

```yaml
SLAMaster:
  id: uuid
  ba_id: uuid                   # เชื่อมกับ Business Architecture
  building_block: string        # ชื่อ Building Block
  key_work_process: string      # Key Work Process
  work_process: string          # Work Process
  job: string                   # รายละเอียดงาน
  kpi_name: string              # ชื่อ KPI/SLA
  target_value: number          # ค่าเป้าหมาย
  evaluation_criteria: string   # เกณฑ์การประเมิน
  formula: string               # สูตรคำนวณ
  responsible_unit: string      # หน่วยงานผู้รับผิดชอบ
  service_recipient: string     # ผู้รับบริการ
  data_source: string           # แหล่งข้อมูลในการตรวจสอบ
  report_cycle: enum            # monthly | quarterly | yearly
  status: enum                  # active | inactive
  version: string               # เวอร์ชันของข้อมูล
  effective_date: date          # วันที่มีผลบังคับใช้
  created_by: uuid
  created_at: datetime
  updated_at: datetime
```

### 5.2 SLA Report Record

```yaml
SLAReport:
  id: uuid
  sla_master_id: uuid           # อ้างอิง SLA Master
  report_period:
    year: integer               # ปีรายงาน (พ.ศ.)
    month: integer              # เดือนรายงาน
    cycle: string               # รอบรายงาน
  responsible_unit: string      # หน่วยงานผู้รับผิดชอบ (ระดับกอง+)
  submitted_by: uuid            # ผู้บันทึกข้อมูล
  data:
    total_delivered: number     # จำนวนงานที่ส่งมอบ
    total_received: number      # จำนวนงานที่รับบริการได้รับ
    failed_count: number        # จำนวนงานที่ไม่ผ่านเป้าหมาย
    target_duration: number     # ระยะเวลาเป้าหมาย
    actual_duration: number     # ระยะเวลาดำเนินการจริง
    sla_result: enum            # pass | fail
    failure_reason: string      # สาเหตุที่ไม่ได้ตามเป้าหมาย
    improvement_plan: string    # แนวทางการแก้ไข
    service_recipient_unit: string  # หน่วยงานผู้รับบริการ
    notes: string               # หมายเหตุ
  attachments:
    - filename: string
      url: string
      uploaded_at: datetime
  evidence_urls: [string]       # URL หลักฐานประกอบ
  status: enum                  # draft | submitted | returned | resubmitted | certified | locked
  workflow_history:
    - action: string
      actor_id: uuid
      timestamp: datetime
      reason: string
      from_status: string
      to_status: string
  submitted_at: datetime
  certified_at: datetime
  certified_by: uuid
  locked_at: datetime
  locked_by: uuid
```

### 5.3 Report Period

```yaml
ReportPeriod:
  id: uuid
  name: string                  # ชื่อรอบรายงาน เช่น "มิถุนายน 2567"
  year: integer
  month: integer
  open_date: date               # วันเปิดรับข้อมูล
  deadline: date                # วันครบกำหนดส่ง
  close_date: date              # วันปิดรอบรายงาน
  status: enum                  # upcoming | open | closed | locked
  created_by: uuid
  created_at: datetime
```

### 5.4 User & Role

```yaml
User:
  id: uuid
  pea_employee_id: string       # รหัสพนักงาน กฟภ.
  full_name: string
  email: string                 # @pea.co.th
  role: enum                    # super_admin | line_manager | division_manager | unit_manager | staff
  scope:
    lines: [string]             # สายงานที่รับผิดชอบ
    divisions: [string]         # ฝ่ายที่รับผิดชอบ
    districts: [string]         # เขตที่รับผิดชอบ
    units: [string]             # กองที่รับผิดชอบ
  is_active: boolean
  last_synced_at: datetime      # วันที่ Sync ล่าสุดจาก HR Platform
```

### 5.5 QIR & Learning Form

```yaml
QIR:
  id: uuid
  sla_report_id: uuid           # อ้างอิงรายงาน SLA ที่ไม่ผ่าน
  sla_master_id: uuid
  exception_type: string        # ประเภทข้อยกเว้น
  exception_period:
    from: date
    to: date
  root_cause: string            # สาเหตุ
  improvement_plan: string      # แนวทางแก้ไข
  assignee_id: uuid             # ผู้รับผิดชอบ
  approver_id: uuid             # ผู้อนุมัติ
  due_date: date                # กำหนดแล้วเสร็จ
  status: enum                  # open | in_progress | resolved | closed
  reviewer_notes: string
  created_at: datetime

LearningForm:
  id: uuid
  year: integer                 # ปีที่ประเมิน
  unit_id: string               # หน่วยงาน
  qir_ids: [uuid]               # QIR ที่นำมาวิเคราะห์
  analysis: string              # การวิเคราะห์มุมมองหลายด้าน
  recommendation: string        # ควรปรับปรุงกระบวนการใด
  action_plan: string           # แผนกิจกรรมที่จะดำเนินการ
  assignee_id: uuid
  approver_id: uuid
  status: enum                  # draft | submitted | approved
  created_at: datetime
```

---

## 6. Acceptance Criteria (ภาพรวม)

| # | เงื่อนไข | วิธีทดสอบ |
|---|---------|----------|
| AC-01 | ผู้รับผิดชอบกรอกและส่งรายงาน SLA ได้ภายใน 10 นาที (กรณีปกติ) | Usability Test |
| AC-02 | กนอ. เปิดรอบรายงานและมอบหมาย KPI/SLA ให้หน่วยงานได้ภายใน 5 นาที | Functional Test |
| AC-03 | Dashboard แต่ละ Role แสดงข้อมูลตามสิทธิ์ ไม่มี data leak | Security Test |
| AC-04 | Workflow 7 สถานะทำงานครบทุก Transition และบันทึก Audit Trail ครบ | Functional Test |
| AC-05 | Export รายงาน PDF/Excel ได้ภายใน 30 วินาทีหลังกด Export | Performance Test |
| AC-06 | SSO ด้วย PEA Email เข้าสู่ระบบสำเร็จ | Integration Test |
| AC-07 | แจ้งเตือน PEA Work D ส่งถึงผู้รับภายใน 1 นาทีหลัง trigger | Integration Test |
| AC-08 | Import SLA Master จาก Excel ตรวจสอบ Duplicate และแสดงผลก่อน Confirm | Functional Test |
| AC-09 | ระบบรองรับ Responsive ใช้งานได้บน Desktop, Tablet และ Mobile | Compatibility Test |
| AC-10 | ผ่าน Security Scan ตามมาตรฐาน กฟภ. ไม่มีช่องโหว่ระดับ High | Security Test |

---

## 7. Glossary

| คำ / คำย่อ | ความหมาย |
|-----------|---------  |
| PEA-SLA | PEA Service Level Agreement Tracking System |
| กนอ. / กพอ. | กองพัฒนาระบบงานองค์กร — ผู้ดูแลและตั้งค่าระบบ |
| SLA | Service Level Agreement — ข้อตกลงระดับการให้บริการ |
| BA | Business Architecture — สถาปัตยกรรมธุรกิจ |
| KPI | Key Performance Indicator — ตัวชี้วัดหลัก |
| Building Block | หน่วยงานหลักระดับสูงสุดใน BA ของ กฟภ. |
| Key Work Process | กระบวนการทำงานหลักใน BA |
| Work Process | กระบวนการย่อยภายใน Key Work Process |
| Job | รายละเอียดงานปลีกย่อยภายใน Work Process |
| QIR | Quality Improvement Report — รายงานการปรับปรุงคุณภาพ |
| Learning Form | แบบฟอร์มประเมินผลรายปีเพื่อออก QIR ใหม่ |
| TOR | Terms of Reference — เอกสารขอบเขตงาน |
| RBAC | Role-Based Access Control — ควบคุมสิทธิ์ตามบทบาท |
| SSO | Single Sign-On — ยืนยันตัวตนครั้งเดียวเข้าได้หลายระบบ |
| Audit Trail | บันทึกประวัติการดำเนินการทุก action เพื่อตรวจสอบย้อนหลัง |
| Effective Date | วันที่ข้อมูลมีผลบังคับใช้ |
| MoSCoW | Must Have / Should Have / Could Have / Won't Have |

---

## 8. Design Principles

### หลักการออกแบบสำหรับผลิตภัณฑ์ (Core Product Principles)

```
P1. Portal-first Experience
    หน้า Home หลัง Login ต้องเป็น Portal ที่บอก "สถานะ" และ "สิ่งที่ต้องทำ" ทันที
    → Status Summary Bar 7 สถานะ มองเห็นได้ทันที
    → Quick Access แสดงงานที่รอดำเนินการพร้อม Count Badge
    → Role Widget บอกสิทธิ์ตัวเองชัดเจน ไม่ต้องเดา

P2. Role-aware Interface
    ผู้ใช้แต่ละ Role เห็น Feature ที่เกี่ยวข้องกับตนเองเท่านั้น
    → กนอ. เห็น BA Master Management, Lock Period, ภาพรวมทุกหน่วยงาน
    → ผู้รับผิดชอบเห็น รายการที่ต้องรายงาน, สถานะ Workflow, งานค้าง
    → พนักงานหน้างาน เห็น BA Overview, SLA ของตัวเอง, Learning Form ที่ได้รับ

P3. Workflow Transparency
    ผู้ใช้ต้องรู้เสมอว่ารายงานของตนอยู่ในสถานะใด และขั้นตอนถัดไปคืออะไร
    → สถานะแสดงด้วย Color + Icon + Text เสมอ ไม่ใช้สีเพียงอย่างเดียว
    → Timeline ประวัติการเปลี่ยนสถานะ พร้อมผู้ดำเนินการและวันเวลา
    → เหตุผลการคืนแก้ไขแสดงชัดเจนใน Comment Thread

P4. Error Prevention > Error Recovery
    ตรวจสอบความครบถ้วนของข้อมูลก่อน Submit ทุกครั้ง
    → Validation แสดง Warning ก่อน ไม่ปล่อยให้ Submit ข้อมูลไม่สมบูรณ์
    → Confirm Dialog ก่อน Lock Period เสมอ
    → Auto-save ป้องกันข้อมูลสูญหาย

P5. Bilingual Interface
    UI Text เป็นภาษาไทยเป็นหลัก
    → Technical Terms คงไว้เป็นภาษาอังกฤษ (KPI, SLA, BA, QIR, Dashboard)
    → อธิบาย Term ด้วยภาษาที่เข้าใจง่าย พร้อม Tooltip

P6. Audit-ready Data
    ทุก action ที่สำคัญต้องมี Audit Trail รองรับ
    → ผู้ดำเนินการ, วันเวลา, ค่าก่อน/หลัง, เหตุผล บันทึกครบทุกครั้ง
    → Export Audit Trail ได้เพื่อตรวจสอบย้อนหลัง
```

---

### Heuristic Evaluation (Nielsen's 10 Usability Heuristics)

ระบบ PEA-SLA ต้องผ่านการตรวจสอบตาม Nielsen's 10 Heuristics ดังนี้:

| # | Heuristic | การนำไปใช้ในระบบ |
|---|-----------|----------------|
| H1 | **Visibility of System Status** | Status Summary Bar 7 สถานะแสดงแบบ Real-time, Period Widget บอกรอบปัจจุบัน, Notice Banner แจ้งเตือนเมื่อมีงานรอ, สถานะรายงานแสดงตลอดเวลา |
| H2 | **Match Between System and Real World** | ใช้ภาษาไทยตลอด ชื่อ Module ตรงกับงานจริงของพนักงาน สถานะใช้ภาษาที่ใช้ใน Workflow จริง เช่น "ถูกคืนแก้ไข" แทน "Rejected" |
| H3 | **User Control and Freedom** | Notice Banner ปิดได้, Draft Save ก่อน Submit, Breadcrumb ในหน้าลึก, ยืนยันก่อน Lock Period |
| H4 | **Consistency and Standards** | Design Token ตาม PEA Design System ตลอดระบบ, Badge สี/รูปแบบเดิมทุกหน้า, Icon ชุดเดียว (Tabler Icons), สถานะชื่อเดียวกันทุกที่ |
| H5 | **Error Prevention** | Validation ก่อน Submit, Confirm Dialog ก่อน Lock, ตรวจ Duplicate ตอน Import, แจ้งเตือนเมื่อข้อมูลไม่ครบก่อนถึง Deadline |
| H6 | **Recognition rather than Recall** | Quick Access แสดงงานที่ต้องทำพร้อม Count, Role Widget บอกสิทธิ์ตัวเอง, Module Card ระบุ Audience ชัดเจน, รายการ KPI ที่ต้องรายงานแสดงอัตโนมัติ |
| H7 | **Flexibility and Efficiency of Use** | Quick Access Shortcuts, Filter/Search ทุก List, Export Excel/PDF, Bulk Action สำหรับ Admin |
| H8 | **Aesthetic and Minimalist Design** | แสดงเฉพาะ Feature ที่ Role นั้นเกี่ยวข้อง, White Space เพียงพอ, ลำดับชั้นสี 3 ระดับ |
| H9 | **Help Users Recognize and Recover from Errors** | Error Message ภาษาไทยชัดเจน บอกสาเหตุและวิธีแก้ไข, เหตุผลการคืนแก้ไขแสดงใน Comment Thread |
| H10 | **Help and Documentation** | คู่มือการใช้งานเข้าถึงได้ใน Nav, FAQ, แจ้งปัญหาและข้อเสนอแนะ, Tooltip อธิบาย Technical Term |

---

### UI Principles — CRAP

หลักการออกแบบ Visual ตาม CRAP Principles (Robin Williams):

```
C — Contrast (ความแตกต่าง)
    ใช้ความแตกต่างของสีและขนาดเพื่อบ่งบอก Priority และ Hierarchy
    ตัวอย่าง:
    - ตัวเลขสถิติหลัก (จำนวนรายการ, % ความสำเร็จ) แสดงด้วย
      font-size 20–28px / font-weight 700 เพื่อให้เด่นจาก Label
    - Status Badge (สีเขียว/เหลือง/แดง/เทา) ต้องมี Contrast
      กับ Background อย่างน้อย 4.5:1 (WCAG AA)
    - CTA Button หลัก (#a80689) ต้องแตกต่างจากปุ่ม Secondary
      อย่างชัดเจนทั้งสีและ Size

R — Repetition (ความสม่ำเสมอ)
    ทำซ้ำ Visual Element เดิมเพื่อสร้างความคุ้นเคยและลด Cognitive Load
    ตัวอย่าง:
    - Module Card ทุกอันใช้โครงสร้าง Card Body / Card Footer เดิมเสมอ
    - Status Color ต้องใช้สม่ำเสมอใน Status Bar, Badge,
      Activity Log, Dashboard และ Notification ทุกที่
    - Icon ชุด Tabler Icons ใช้ตลอดระบบ ไม่ผสม Icon Library อื่น

A — Alignment (การจัดวาง)
    ทุก Element ต้องอยู่บน Grid ที่ชัดเจน ไม่วางแบบสุ่ม
    ตัวอย่าง:
    - Content Area จัด Max-width 1100px + Centered
    - Form Fields จัดเป็น Left-aligned Column พร้อม Label ชิดซ้าย
    - ตัวเลข (%, จำนวน) จัด Right-aligned ในตาราง Dashboard
    - Action Buttons จัด Right-aligned ในทุก Card Footer

P — Proximity (ความใกล้ชิด)
    จัดกลุ่ม Element ที่เกี่ยวข้องกันให้อยู่ใกล้กัน
    ตัวอย่าง:
    - Status Dot + Count + Label อยู่ใน Status Cell เดียวกัน
    - Module Icon + Badge + Title + Description อยู่ใน Card Body
    - Period Status + Deadline + Progress Bar อยู่ใน Period Widget
    - Quick Access Icon + Name + Sub-label + Count Badge
      อยู่ใน Quick Item เดียวกัน ไม่กระจาย
```

---

### UX Design — Laws of UX

ออกแบบ User Experience ตาม Laws of UX ที่เกี่ยวข้องกับระบบนี้:

| Law | หลักการ | การนำไปใช้ |
|-----|--------|-----------|
| **Hick's Law** | ยิ่งมีตัวเลือกมาก ยิ่งตัดสินใจช้า | Module Cards แสดงเฉพาะ 3 Module หลัก ไม่ยัด Feature ทุกอย่างไว้หน้า Home · Quick Access แสดงเฉพาะงานที่ต้องทำของ Role นั้น |
| **Fitts's Law** | Target ที่ใหญ่และอยู่ใกล้ คลิกได้ง่ายกว่า | Primary Button ขนาด min 36×36px · Quick Item ทั้งแถวคลิกได้ ไม่เฉพาะตัวอักษร · Module Card ทั้งใบ Hover ได้ |
| **Miller's Law** | สมองจำได้ 7±2 หน่วยในคราวเดียว | Status Bar แสดงพอดี 7 สถานะ ตรงกับ Workflow จริง · Form แบ่งเป็น Section ไม่เกิน 5–7 Fields ต่อ Section |
| **Jakob's Law** | ผู้ใช้คุ้นเคยกับระบบอื่นอยู่แล้ว ใช้ Pattern เดียวกัน | Topbar Navigation ตาม SaaS มาตรฐาน · Form Layout ตาม Google Forms · Table + Filter ตาม Excel ที่คุ้นเคย |
| **Peak-End Rule** | ผู้ใช้จำ "จุดสูงสุด" และ "จุดสุดท้าย" | หน้า "ส่งรายงานสำเร็จ" แสดง Confirmation ชัดเจนพร้อม Summary · หน้า "รับรองผลแล้ว" แสดง ✅ และ % ผล SLA |
| **Zeigarnik Effect** | คนจำงานที่ค้างไว้ได้ดีกว่างานที่เสร็จแล้ว | Count Badge บน Quick Access แสดงงานค้าง · Notice Banner แจ้งเตือนกรณีมีงานรอ · Status Bar แสดง "ยังไม่รายงาน" ชัดเจน |
| **Aesthetic-Usability Effect** | ระบบที่สวยงามดูเหมือนใช้งานง่ายกว่า | ลงทุนใน Visual Polish ของ Module Card, Hero Banner, Status Badge และ Micro-animation ของ Card Hover |
| **Doherty Threshold** | Response Time > 400ms ทำให้สูญเสีย Engagement | Dashboard โหลด < 3 วินาที · Status อัปเดต < 30 วินาที · Export เสร็จ < 30 วินาที |

---

### Accessibility Standards — WCAG 2.1

ระบบต้องผ่านมาตรฐาน **WCAG 2.1 ระดับ AA** ครอบคลุม 4 หลักการ (POUR):

#### Perceivable (รับรู้ได้)
```
1.1.1 Non-text Content
      - Icon ทุกตัวต้องมี aria-label ภาษาไทย
        เช่น aria-label="รายงาน SLA ประจำเดือน"
      - Chart และ Progress Bar ต้องมี Text Alternative

1.3.1 Info and Relationships
      - Form Label ต้องเชื่อมกับ Input ด้วย htmlFor/id ทุกครั้ง
      - Status Badge ต้องมีทั้ง Color + Text + Icon ไม่ใช้สีเพียงอย่างเดียว

1.4.1 Use of Color
      - Status (รับรองแล้ว/ถูกคืน/ล่าช้า) ต้องมี Icon และ Text กำกับเสมอ
      - ไม่ใช้สีเพียงอย่างเดียวในการสื่อความหมาย

1.4.3 Contrast Minimum (AA)
      - Body Text บน Background ≥ 4.5:1
      - Large Text (18px+ หรือ Bold 14px+) ≥ 3:1
      - Badge, Status Chip, ปุ่มทุกตัวต้องผ่าน 4.5:1
```

#### Operable (ใช้งานได้)
```
2.1.1 Keyboard
      - ทุก Interactive Element เข้าถึงได้ด้วย Keyboard
      - Quick Item, Module Card, Status Cell ต้อง Focus ได้
      - Modal/Drawer ต้อง Trap Focus ขณะเปิด

2.4.3 Focus Order
      - Tab Order สมเหตุสมผลตาม Reading Direction (บน→ล่าง, ซ้าย→ขวา)

2.4.7 Focus Visible
      - Focus Ring ชัดเจน: 2px solid #cf07aa พร้อม 2px white offset
      - ไม่ซ่อน outline ใด ๆ
```

#### Understandable (เข้าใจได้)
```
3.1.1 Language of Page
      - <html lang="th"> สำหรับ Thai version

3.3.1 Error Identification
      - Error Message ระบุ Field ที่ผิดพลาดชัดเจนเป็นภาษาไทย
        เช่น "กรุณากรอกจำนวนงานที่ส่งมอบ — ต้องเป็นตัวเลขมากกว่า 0"
      - Error แสดงเป็น Text ไม่ใช่แค่ขอบสีแดง

3.3.2 Labels or Instructions
      - Field ที่ซับซ้อน (เช่น สูตรคำนวณ, ค่าเป้าหมาย)
        ต้องมี Helper Text อธิบายสั้นๆ ใต้ Input พร้อมตัวอย่าง
```

#### Robust (ทนทาน)
```
4.1.2 Name, Role, Value
      - Custom Component ทุกตัว (Status Badge, Period Widget, Quick Item)
        ต้องมี role, aria-label, aria-expanded ตามความเหมาะสม
      - Status Cell ที่ Active: aria-selected="true"
      - รายงานที่ Submit สำเร็จ: aria-label="ส่งรายงานสำเร็จ — สถานะ: ส่งรายงานแล้ว"
```

## Design System Summary
```
Brand:       #a80689 Magenta (Primary) / #edaa2b Amber (Secondary)
Font:        IBM Plex Sans Thai — Display, Title / Google Sans — Body, Label
Weights:     400 / 500 / 600 / 700
Spacing:     4px base → 6 / 8 / 10 / 12 / 16 / 20 / 24 / 32 / 40 / 48px
Radius:      6px badges/chips · 8px buttons/inputs · 10px dropdowns · 12px cards · 16px modals
Breakpoints: 375 / 768 / 1024 / 1100px (max content width)
Icons:       Tabler Icons (@tabler/icons-webfont)
Theme:       Light (default) · data-brand="pea" data-theme="light"
Tokens:      ดู pea-sla-design-spec.md
```

*เอกสารนี้จัดทำโดย กองพัฒนาระบบงานองค์กร การไฟฟ้าส่วนภูมิภาค*
*PEA-SLA Requirement Specification v1.0 | ปีงบประมาณ 2568*
