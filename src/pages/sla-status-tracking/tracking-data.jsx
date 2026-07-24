const NAV_ITEMS = [
{key:'dashboard',icon:'layout-grid',label:'แดชบอร์ด'},
{key:'tracking',icon:'clock',label:'ติดตามสถานะ',children:[
  {key:'p2',label:'P2 : กระบวนการแก้กระแสไฟฟ้าขัดข้อง'},
  {key:'p3',label:'P3 : กระบวนการขอใช้ไฟฟ้า'},
  {key:'p3b',label:'P3: กระบวนการขอใช้ไฟฟ้ากรณีขยายเขต'},
  {key:'p4',label:'P4 : กระบวนการด้านมิเตอร์ กรณีต่อกลับมิเตอร์'},
  {key:'p5',label:'P5 : กระบวนการตอบข้อร้องเรียน'},
  {key:'p6',label:'P6 : กระบวนการดับไฟล่วงหน้าแบบมีแผน'},
  {key:'p9',label:'P9 : กระบวนการโอนชื่อผู้ใช้ไฟฟ้าและเปลี่ยนหลักทรัพย์ค้ำประกัน'},
  {key:'p10',label:'P10 : กระบวนงานการจ่ายคืนหลักประกันการใช้ไฟฟ้า'}
]}
];

const KPI = [
{key:'fail',label:'ไม่ผ่าน SLA',value:10,bg:'var(--pea-bg-error-primary)',border:'var(--pea-border-error-subtle)',color:'var(--pea-fg-error-primary)'},
{key:'near',label:'ใกล้ครบกำหนด SLA',value:10,bg:'var(--pea-bg-warning-primary)',border:'#fee18f',color:'var(--pea-fg-warning-secondary)'},
{key:'pass',label:'ผ่าน SLA',value:86,bg:'var(--pea-bg-success-primary)',border:'#abefc6',color:'var(--pea-fg-success-primary)'}
];

const FILTERS = ['01/06/2568 - 19/06/2568','การไฟฟ้าส่วนภูมิภาคสำนักงานใหญ่','สาขาทั้งหมด'];

const TABS = [{key:'all',label:'คำร้องทั้งหมด',count:106},{key:'open',label:'ยังไม่ปิดงาน',count:28},{key:'closed',label:'ปิดงาน',count:78}];

function slaTag(kind){
  if(kind==='fail') return {label:'ไม่ผ่าน SLA 0 วัน 03:27 ชั่วโมง',bg:'var(--pea-bg-error-secondary)',color:'var(--pea-fg-error-secondary)'};
  if(kind==='near') return {label:'ใกล้ครบกำหนด SLA เหลือเวลา 20 ชั่วโมง',bg:'var(--pea-bg-warning-secondary)',color:'var(--pea-fg-warning-secondary)'};
  return {label:'ผ่าน SLA',bg:'var(--pea-bg-success-secondary)',color:'var(--pea-fg-success-secondary)'};
}

const ROWS = [
{id:1,caseNo:'6240017428',ba:'กฟอ.วังโป่ง',date:'12/06/2568 23:00:00 น.',status:'03 จ่ายไฟคืนครั้งหมด',sla:'fail'},
{id:2,caseNo:'6240017429',ba:'กฟอ.วังโป่ง',date:'12/06/2568 23:00:00 น.',status:'03 จ่ายไฟคืนครั้งหมด',sla:'near'},
{id:3,caseNo:'6240017430',ba:'กฟอ.วังโป่ง',date:'12/06/2568 23:00:00 น.',status:'03 จ่ายไฟคืนครั้งหมด',sla:'pass'},
{id:4,caseNo:'6240017431',ba:'กฟอ.วังโป่ง',date:'12/06/2568 23:00:00 น.',status:'03 จ่ายไฟคืนครั้งหมด',sla:'pass'},
{id:5,caseNo:'6240017432',ba:'กฟอ.วังโป่ง',date:'12/06/2568 23:00:00 น.',status:'03 จ่ายไฟคืนครั้งหมด',sla:'pass'},
{id:6,caseNo:'6240017433',ba:'กฟอ.เมืองเพชรบูรณ์',date:'12/06/2568 21:40:00 น.',status:'03 จ่ายไฟคืนครั้งหมด',sla:'pass'},
{id:7,caseNo:'6240017434',ba:'กฟอ.หล่มสัก',date:'12/06/2568 19:12:00 น.',status:'02 อยู่ระหว่างซ่อมแซม',sla:'near'},
{id:8,caseNo:'6240017435',ba:'กฟอ.วิเชียรบุรี',date:'12/06/2568 18:05:00 น.',status:'03 จ่ายไฟคืนครั้งหมด',sla:'pass'},
{id:9,caseNo:'6240017436',ba:'กฟอ.หนองไผ่',date:'12/06/2568 15:30:00 น.',status:'03 จ่ายไฟคืนครั้งหมด',sla:'fail'},
{id:10,caseNo:'6240017437',ba:'กฟอ.บึงสามพัน',date:'12/06/2568 14:02:00 น.',status:'03 จ่ายไฟคืนครั้งหมด',sla:'pass'}
];

Object.assign(window,{NAV_ITEMS,KPI,FILTERS,TABS,ROWS,slaTag});
