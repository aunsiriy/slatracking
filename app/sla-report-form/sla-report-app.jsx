import Image from 'next/image';
import Link from 'next/link';
const {Button,Badge,InputField,Textarea}=window.DesignSystem_cbd181;

const SLA_FORM_GUIDE=[
{part:'ขั้นที่ 1',title:'เลือกรายการทางซ้าย',desc:'กล่อง "ต้องกรอก" ทางซ้ายมือจะเรียงรายการให้อัตโนมัติ โดยเริ่มจากรายการที่เลยกำหนดส่งก่อน ตามด้วยรายการที่ยังไม่ถึงกำหนด คลิกรายการใดก็ได้เพื่อเปิดกรอกทางขวามือ'},
{part:'ขั้นที่ 2',title:'กรอกข้อมูลทางขวาแล้วกด "ถัดไป"',desc:'กรอกผลการดำเนินงาน (%) ระบบจะแจ้งผ่าน/ไม่ผ่านทันที ตามด้วยรายละเอียดการดำเนินงาน และแนวทางแก้ไข (กรณีผลไม่ผ่านเกณฑ์) แล้วกด "ถัดไป" เพื่อไปยังรายการถัดไปที่ยังไม่ครบ หากกดตอนกรอกไม่ครบ ช่องที่ขาดจะขึ้นกรอบสีแดงให้แก้ไข'},
{part:'ขั้นที่ 3',title:'กด "ยืนยันส่งทั้งหมด"',desc:'เมื่อกรอกครบทุกรายการ ตัวเลขในกล่อง "ต้องกรอก" จะเปลี่ยนเป็นเครื่องหมายถูกสีเขียว และปุ่ม "ถัดไป" ทางขวาจะกดไม่ได้เพราะไม่มีรายการให้ไปต่อแล้ว ให้กดปุ่ม "ยืนยันส่งทั้งหมด" ที่แถบด้านล่างสุดของหน้าเพื่อส่งรายงานทั้งหมดให้ กนอ. ในครั้งเดียว'},
{part:'สัญลักษณ์',title:'สีสถานะในแถบรอบรายงาน',desc:'เขียว = ผ่าน SLA, แดง = ไม่ผ่าน SLA หรือเลยกำหนดส่งของรอบปัจจุบัน, เทา = ยังไม่ถึงรอบ ทุกรอบกดเข้าไปดูหรือกรอกล่วงหน้าได้ตลอด แม้เป็นรอบที่ยังไม่ถึงกำหนดส่งจริง'},
{part:'หมายเหตุ',title:'ประเภทรายงานที่ต้องกรอก',desc:'แอดมินจะมอบหมายให้แต่ละฝ่ายทำรายงานเพียงประเภทเดียวเท่านั้น คือ "รายงานผล SLA รายเดือน" หรือ "รายงานผลตัวชี้วัดกระบวนการ รายไตรมาส" อย่างใดอย่างหนึ่ง ไม่มีฝ่ายใดต้องทำทั้งสองแบบพร้อมกัน หน้านี้จะแสดงเฉพาะประเภทที่ฝ่ายของท่านได้รับมอบหมาย'},
{part:'หมายเหตุ',title:'แก้ไขรายการที่ยืนยันแล้วได้',desc:'รายการที่ "รายงานแล้ว" สามารถกด "แก้ไขข้อมูล" เพื่อปรับผลการดำเนินงาน รายละเอียด หรือแนวทางแก้ไขได้ภายหลัง แต่จะแก้ไขได้เฉพาะผู้ที่มีรายชื่อเป็นผู้มีสิทธิ์กรอกของรายการนั้นเท่านั้น ทุกครั้งที่แก้ไขจะถูกบันทึกไว้ใน "ประวัติการแก้ไข" ของรายการนั้น'}
];

function TopBar(){
  return React.createElement('header',{className:'rtop'},
    React.createElement('div',{className:'rtop-left'},
      React.createElement(Link,{className:'rtop-back',href:'/'},React.createElement(Icon,{name:'chevron-left',size:16}),'กลับ'),
      React.createElement(Image,{className:'rtop-logo',src:'/assets/sla-logo-checkmark.png',alt:'SLA',width:36,height:36}),
      React.createElement('div',{className:'rtop-word'},
        React.createElement('span',{className:'rtop-title'},'SLA Tracking System')
      )
    )
  );
}

function Breadcrumb(){
  return React.createElement('div',{className:'rbreadcrumb'},
    React.createElement(Link,{href:'/'},'หน้าหลัก'),
    React.createElement(Icon,{name:'chevron-right',size:14}),
    React.createElement('span',{className:'is-current'},'รายงานผล SLA (ระดับฝ่าย)')
  );
}

function FormGuideModal({onClose}){
  const [open,setOpen]=React.useState(0);
  return React.createElement('div',{className:'modal-overlay',onClick:onClose},
    React.createElement('div',{className:'modal-card lfguide-modal',onClick:e=>e.stopPropagation()},
      React.createElement('div',{className:'modal-head'},
        React.createElement('h3',null,'คำอธิบายรายละเอียดการใช้งาน'),
        React.createElement('button',{className:'lfa-modal-close',onClick:onClose},React.createElement(Icon,{name:'x',size:18}))
      ),
      React.createElement('div',{className:'lfguide-list'},
        SLA_FORM_GUIDE.map((g,i)=>React.createElement('div',{key:i,className:'lfguide-item'+(open===i?' is-open':'')},
          React.createElement('button',{type:'button',className:'lfguide-item-head',onClick:()=>setOpen(o=>o===i?-1:i)},
            React.createElement('span',{className:'lfguide-item-part'},g.part),
            React.createElement('span',{className:'lfguide-item-title'},g.title),
            React.createElement(Icon,{name:open===i?'chevron-down':'chevron-right',size:16})
          ),
          open===i&&React.createElement('p',{className:'lfguide-item-desc'},g.desc)
        ))
      )
    )
  );
}

const ASSIGNMENT_DEMO_OPTIONS=[
  {key:'monthly',label:'มอบหมาย: รายงานผล SLA รายเดือน'},
  {key:'quarterly',label:'มอบหมาย: รายงานผลตัวชี้วัดกระบวนการ รายไตรมาส'}
];

function AssignmentDemoControl({assignedType,setAssignedType}){
  return React.createElement('div',{className:'assign-demo'},
    React.createElement('div',{className:'assign-demo-label'},
      React.createElement(Icon,{name:'settings',size:14}),
      'สาธิต: แอดมินมอบหมายให้ฝ่ายนี้ทำ'
    ),
    React.createElement('div',{className:'assign-demo-opts'},
      ASSIGNMENT_DEMO_OPTIONS.map(o=>React.createElement('button',{key:o.key,type:'button',
        className:'assign-demo-opt'+(assignedType===o.key?' is-active':''),onClick:()=>setAssignedType(o.key)},o.label))
    )
  );
}

// Now that ผ่าน SLA is the box's only remaining axis (ตรงเวลา was removed), a single whole-box
// color can represent it without conflating two different facts — green once every reported
// item that round passed, red the moment any one of them didn't. A box with nothing reported
// yet just shows "ยังไม่ถึงรอบ" in neutral gray instead of an alarming 0/6.
function PeriodBox({period,isSelected,onSelect,summary}){
  const untouched=period.status==='upcoming'&&summary.reported===0;
  const variant=summary.reported===0?'neutral':(summary.pass===summary.reported?'pass':'fail');
  return React.createElement('button',{type:'button',onClick:()=>onSelect(period.key),
    className:'period-box period-box--'+variant+(period.isCurrent?' is-current':'')+(isSelected&&!period.isCurrent?' is-selected':'')},
    period.isCurrent&&React.createElement('span',{className:'period-box-badge'},'รอบปัจจุบัน'),
    React.createElement('div',{className:'period-box-label'},period.label),
    period.range&&React.createElement('div',{className:'period-box-range'},period.range),
    untouched?
      React.createElement('div',{className:'period-box-status'},'ยังไม่ถึงรอบ'):
      React.createElement('div',{className:'period-box-metric'},
        React.createElement('i',{className:'dot '+(summary.pass===summary.reported?'dot-success':'dot-error')}),
        'ผ่าน '+summary.pass+'/'+summary.reported
      )
  );
}

function PeriodBar({tab,selectedKey,onSelect,itemsForPeriodKey,activeItem,onOpenHistory}){
  const periods=tab==='monthly'?window.SLA_REPORT_PERIODS_MONTHLY:window.SLA_REPORT_PERIODS_QUARTERLY;
  return React.createElement('div',{className:'period-bar'},
    React.createElement('div',{className:'period-bar-head'},
      React.createElement('span',{className:'period-bar-title'},'รอบรายงาน · ปี 2569'),
      React.createElement('div',{className:'period-bar-head-right'},
        React.createElement('div',{className:'period-legend'},
          React.createElement('span',{className:'period-legend-item'},React.createElement('i',{className:'dot dot-success'}),'ผ่าน SLA ครบทุกรายการ'),
          React.createElement('span',{className:'period-legend-item'},React.createElement('i',{className:'dot dot-error'}),'มีรายการไม่ผ่าน SLA'),
          React.createElement('span',{className:'period-legend-item'},React.createElement('i',{className:'dot dot-gray'}),'ยังไม่ถึงรอบ')
        ),
        activeItem&&React.createElement('button',{type:'button',className:'period-history-btn',onClick:onOpenHistory},
          React.createElement(Icon,{name:'clock',size:14}),'ดูประวัติการรายงาน'
        )
      )
    ),
    React.createElement('div',{className:'period-grid period-grid--'+tab},
      periods.map(p=>React.createElement(PeriodBox,{key:p.key,period:p,isSelected:p.key===selectedKey,onSelect,summary:periodSummary(itemsForPeriodKey(p.key))}))
    )
  );
}

function computeStatus(result,target){
  if(result===''||result===null||isNaN(Number(result)))return null;
  return Number(result)>=Number(target)?'pass':'fail';
}

function itemIsComplete(item){
  const status=computeStatus(item.result,item.target);
  const detailOk=item.detail.trim().length>0;
  const improvementOk=status!=='fail'||item.improvement.trim().length>0;
  const resultOk=item.result!==''&&!isNaN(Number(item.result));
  return resultOk&&detailOk&&improvementOk;
}

function findEmployee(id){return (window.EMPLOYEES||[]).find(e=>e.id===id);}
function employeeDisplay(emp){return emp?(emp.name+' · เบอร์ภายใน '+emp.ext):'';}
function currentUserDisplay(){
  const emp=findEmployee(window.CURRENT_USER&&window.CURRENT_USER.employeeId);
  return emp?employeeDisplay(emp):(window.CURRENT_USER?window.CURRENT_USER.name:'-');
}

// Authorization is checked by employee id against the item's own authorizedPreparers list —
// never by the logged-in account's ฝ่าย/กอง. This same canEdit() guard is what the save
// function itself re-checks (see saveSubmittedEdit in App), not just whether the UI shows
// the edit button — the closest a client-only build can get to "checked API-side too".
function canEdit(item){
  const uid=window.CURRENT_USER&&window.CURRENT_USER.employeeId;
  return !!(uid&&(item.authorizedPreparers||[]).includes(uid));
}

const EDIT_FIELD_LABELS={result:'ผลการดำเนินงาน (%)',detail:'รายละเอียดการดำเนินงาน',improvement:'แนวทางการแก้ไขปรับปรุง'};
function formatLogTime(iso){
  if(!iso)return '-';
  try{return new Date(iso).toLocaleString('th-TH',{dateStyle:'medium',timeStyle:'short'});}catch(e){return iso;}
}
function truncateText(s){
  const t=String(s||'').trim();
  return t.length>70?t.slice(0,70)+'…':t;
}
// Diffs only the 3 editable fields; returns one log entry per field that actually changed.
// Used both for the very first confirm (diffed against blank) and every later edit.
function buildLogEntries(oldItem,draft,editorId,editedAt){
  return ['result','detail','improvement']
    .filter(f=>draft[f]!==undefined&&String(draft[f])!==String(oldItem[f]||''))
    .map(f=>({field:f,oldValue:oldItem[f]||'',newValue:draft[f],editedBy:editorId,editedAt}));
}

// A result counts as "reported" once it holds a parseable number — independent of the item's
// status label, so a forced-submitted historical snapshot with a blanked-out result (an
// unreported round) is still correctly excluded from pass-rate denominators.
function hasReportedResult(item){
  return item.result!==''&&item.result!==null&&item.result!==undefined&&!isNaN(Number(item.result));
}
function resultChipInfo(item){
  if(!hasReportedResult(item))return {variant:'pending',label:'-'};
  const st=computeStatus(item.result,item.target);
  return st==='pass'?{variant:'pass',label:'ผ่าน '+item.result+'%'}:{variant:'fail',label:'ไม่ผ่าน '+item.result+'%'};
}
function formatShortDate(iso){
  if(!iso)return '-';
  try{return new Date(iso).toLocaleDateString('th-TH',{day:'numeric',month:'short'});}catch(e){return '-';}
}
// Month-level ผ่าน count is rolled up from item-level facts, never judged on its own — only
// counted among items that actually have a reported result, since unreported items have no
// result to judge yet.
function periodSummary(items){
  const total=items.length;
  const reportedItems=items.filter(hasReportedResult);
  const pass=reportedItems.filter(it=>computeStatus(it.result,it.target)==='pass').length;
  return {total,pass,reported:reportedItems.length};
}
const CHIP_META={
  pass:{cls:'success',icon:'check'},fail:{cls:'error',icon:'x'},
  pending:{cls:'muted',icon:null}
};
function StatusChip({variant,label}){
  const m=CHIP_META[variant]||CHIP_META.pending;
  return React.createElement('span',{className:'result-chip result-chip--'+m.cls},
    m.icon&&React.createElement(Icon,{name:m.icon,size:12}),
    label
  );
}

function pendingReason(item){
  if(item.status==='overdue')return {type:'overdue',text:'เลยกำหนด '+item.dueDate};
  return {type:'normal',text:'ส่งภายใน '+item.dueDate};
}
const REASON_PRIORITY={overdue:0,normal:1};

function sortPending(items){
  return [...items].sort((a,b)=>REASON_PRIORITY[pendingReason(a).type]-REASON_PRIORITY[pendingReason(b).type]);
}

function itemLabel(item){return item.slaName||item.metricName;}

// Every period still ahead of the current one gets its own blank, fully editable item set
// (seeded from the current period's metadata) so it can be filled in advance — not just
// viewed. Already-reported past periods stay read-only, driven off each item's `history`
// instead (see snapshotItems in App).
function blankItemFromBase(it){
  return {...it,status:'not_reported',result:'',detail:'',improvement:'',preparer:'',first_confirmed_at:null,historyLog:[]};
}
function buildInitialEditable(periods,baseItems){
  const map={};
  periods.forEach(p=>{
    if(p.isCurrent)map[p.key]=baseItems;
    else if(p.status==='upcoming')map[p.key]=baseItems.map(blankItemFromBase);
  });
  return map;
}

function PendingList({items,activeId,onSelect}){
  const completeCount=items.filter(itemIsComplete).length;
  if(items.length===0)return React.createElement('div',{className:'card sidebar-card'},
    React.createElement('div',{className:'sidebar-card-head'},
      React.createElement('div',{className:'sidebar-card-title'},'ต้องกรอก ',React.createElement('span',{className:'sidebar-count-badge sidebar-count-badge--muted'},0))
    ),
    React.createElement('div',{className:'sidebar-done-box'},
      React.createElement(Icon,{name:'check-circle',size:18}),
      React.createElement('span',null,'รอบนี้รายงานครบทุกรายการแล้ว')
    )
  );
  return React.createElement('div',{className:'card sidebar-card'},
    React.createElement('div',{className:'sidebar-card-head'},
      React.createElement('div',{className:'sidebar-card-title'},'ต้องกรอก ',React.createElement('span',{className:'sidebar-count-badge'},items.length)),
      React.createElement('span',{className:'sidebar-progress'},'ครบแล้ว '+completeCount+'/'+items.length)
    ),
    React.createElement('div',{className:'sidebar-list'},
      items.map((item,i)=>{
        const complete=itemIsComplete(item);
        const reason=pendingReason(item);
        const isActive=item.id===activeId;
        return React.createElement('button',{key:item.id,type:'button',className:'sidebar-item'+(isActive?' is-active':'')+(complete?' is-complete':''),onClick:()=>onSelect(item.id)},
          React.createElement('span',{className:'sidebar-item-num'+(complete?' is-done':'')},complete?React.createElement(Icon,{name:'check',size:13}):i+1),
          React.createElement('div',{className:'sidebar-item-body'},
            React.createElement('div',{className:'sidebar-item-title'},item.level1+' · '+itemLabel(item)),
            React.createElement('div',{className:'sidebar-item-reason sidebar-item-reason--'+reason.type},reason.text)
          )
        );
      })
    )
  );
}

function SubmittedList({items,activeId,onSelect}){
  if(items.length===0)return null;
  return React.createElement('div',{className:'card sidebar-card sidebar-card--submitted'},
    React.createElement('div',{className:'sidebar-card-head'},
      React.createElement('div',{className:'sidebar-card-title'},'รายงานแล้ว ',React.createElement('span',{className:'sidebar-count-badge sidebar-count-badge--muted'},items.length))
    ),
    React.createElement('div',{className:'sidebar-list'},
      items.map(item=>{
        const isActive=item.id===activeId;
        return React.createElement('button',{key:item.id,type:'button',className:'sidebar-item sidebar-item--submitted'+(isActive?' is-active':''),onClick:()=>onSelect(item.id)},
          React.createElement('div',{className:'sidebar-item-body'},
            React.createElement('div',{className:'sidebar-item-title'},item.level1+' · '+itemLabel(item))
          ),
          React.createElement(StatusChip,resultChipInfo(item))
        );
      })
    )
  );
}

function stepLabel(n,text){
  return React.createElement(React.Fragment,null,
    React.createElement('span',{className:'step-num'},n),
    React.createElement('span',null,text)
  );
}

// Report status is exactly 3 values — ยังไม่รายงาน (blue) / รายงานเกินกำหนด (red) /
// รายงานแล้ว (green). ผลลัพธ์ (ผ่าน/ไม่ผ่าน) is a wholly separate badge below, never merged in.
const REPORT_STATUS_META={
  not_reported:{label:'ยังไม่รายงาน',color:'blue'},
  overdue:{label:'รายงานเกินกำหนด',color:'error'},
  submitted:{label:'รายงานแล้ว',color:'success'}
};

function StatusMetaRow({item}){
  const isSubmitted=item.status==='submitted';
  const meta=REPORT_STATUS_META[item.status]||REPORT_STATUS_META.not_reported;
  const dueLabel=isSubmitted?null:('กำหนดส่ง '+item.dueDate);
  const result=resultChipInfo(item);
  return React.createElement('div',{className:'panel-status-row'},
    React.createElement('span',{className:'panel-status-pair'},
      React.createElement('span',{className:'panel-status-label'},'สถานะรายงาน'),
      React.createElement(Badge,{label:meta.label,type:'pill-color',color:meta.color,size:'sm'})
    ),
    result.variant!=='pending'&&React.createElement('span',{className:'panel-status-pair'},
      React.createElement('span',{className:'panel-status-label'},'ผลลัพธ์'),
      React.createElement(StatusChip,result)
    ),
    dueLabel&&React.createElement('span',{className:'panel-status-pair panel-status-due'},React.createElement(Icon,{name:'clock',size:14}),dueLabel)
  );
}

// Moved out of each item's panel and up to the period-bar instead — one "ดูประวัติการรายงาน"
// button there opens this modal for whichever item is currently active, rather than every
// item carrying its own inline collapsible table.
function HistoryModal({item,onClose}){
  const rows=item.history||[];
  return React.createElement('div',{className:'modal-overlay',onClick:onClose},
    React.createElement('div',{className:'modal-card history-modal',onClick:e=>e.stopPropagation()},
      React.createElement('div',{className:'modal-head'},
        React.createElement('h3',null,'ประวัติการรายงาน · '+itemLabel(item)),
        React.createElement('button',{className:'lfa-modal-close',onClick:onClose},React.createElement(Icon,{name:'x',size:18}))
      ),
      rows.length===0?
        React.createElement('div',{className:'history-log-empty'},'ยังไม่มีประวัติการรายงานของรายการนี้'):
        React.createElement('div',{className:'history-table-wrap'},
          React.createElement('table',{className:'history-table'},
            React.createElement('thead',null,React.createElement('tr',null,
              ['รอบ','ผล','เป้า','ผลลัพธ์','ส่งเมื่อ','สถานะรายงาน','ผู้บันทึก'].map(h=>React.createElement('th',{key:h},h))
            )),
            React.createElement('tbody',null,
              rows.map((r,i)=>React.createElement('tr',{key:i},
                React.createElement('td',null,r.period),
                React.createElement('td',null,r.reported?r.result+'%':'-'),
                React.createElement('td',null,r.target+'%'),
                React.createElement('td',null,r.reported?React.createElement(StatusChip,{variant:r.outcome==='pass'?'pass':'fail',label:r.outcome==='pass'?'ผ่าน':'ไม่ผ่าน'}):'-'),
                React.createElement('td',null,formatShortDate(r.confirmedAt)),
                React.createElement('td',null,r.reported?React.createElement(Badge,{label:'รายงานแล้ว',type:'pill-color',color:'success',size:'sm'}):React.createElement(Badge,{label:'ยังไม่รายงาน',type:'pill-color',color:'blue',size:'sm'})),
                React.createElement('td',null,r.reported?r.recorder:'-')
              ))
            )
          )
        )
    )
  );
}

function EditableStepFields({draft,setField,target,showMissing}){
  const status=computeStatus(draft.result,target);
  const missing=f=>showMissing&&!String(draft[f]||'').trim()?'จำเป็นต้องกรอก':undefined;
  return React.createElement(React.Fragment,null,
    React.createElement('div',{className:'result-input-col'},
      React.createElement(InputField,{fieldType:'default',label:stepLabel(1,'กรอกผลการดำเนินงาน (%)'),size:'md',type:'text',value:String(draft.result),placeholder:'กรอกตัวเลขร้อยละ',isRequired:true,onChange:v=>setField('result',v.replace(/[^0-9.]/g,'')),error:missing('result')})
    ),
    React.createElement(Textarea,{label:stepLabel(2,'รายละเอียดการดำเนินงาน'),placeholder:'อธิบายรายละเอียดการดำเนินงาน...',isRequired:true,value:draft.detail,onChange:v=>setField('detail',v),error:missing('detail')}),
    status==='fail'&&React.createElement(Textarea,{label:stepLabel(3,'แนวทางการแก้ไขปรับปรุง'),placeholder:'ระบุสาเหตุ แนวทางแก้ไข และกำหนดเวลาที่แล้วเสร็จ',isRequired:true,value:draft.improvement,onChange:v=>setField('improvement',v),error:missing('improvement')})
  );
}

function SubmittedEditForm({item,onSave,onCancel}){
  const [draft,setDraft]=React.useState({result:String(item.result),detail:item.detail,improvement:item.improvement});
  const [showMissing,setShowMissing]=React.useState(false);
  function setField(k,v){setDraft(d=>({...d,[k]:v}));}
  function isComplete(){
    const status=computeStatus(draft.result,item.target);
    const resultOk=draft.result!==''&&!isNaN(Number(draft.result));
    const detailOk=draft.detail.trim().length>0;
    const improvementOk=status!=='fail'||draft.improvement.trim().length>0;
    return resultOk&&detailOk&&improvementOk;
  }
  function handleSave(){
    if(!isComplete()){setShowMissing(true);return;}
    onSave(draft);
  }
  return React.createElement(React.Fragment,null,
    React.createElement(EditableStepFields,{draft,setField,target:item.target,showMissing}),
    React.createElement('div',{className:'edit-form-actions'},
      React.createElement(Button,{variant:'secondary',size:'md',onClick:onCancel},'ยกเลิก'),
      React.createElement(Button,{variant:'primary',size:'md',onClick:handleSave},'บันทึกการแก้ไข')
    )
  );
}

function HistoryLogModal({item,onClose}){
  const rows=[...(item.historyLog||[])].reverse();
  return React.createElement('div',{className:'modal-overlay',onClick:onClose},
    React.createElement('div',{className:'modal-card history-log-modal',onClick:e=>e.stopPropagation()},
      React.createElement('div',{className:'modal-head'},
        React.createElement('h3',null,'ประวัติการแก้ไข'),
        React.createElement('button',{className:'lfa-modal-close',onClick:onClose},React.createElement(Icon,{name:'x',size:18}))
      ),
      React.createElement('div',{className:'history-log-list'},
        rows.length?rows.map((r,i)=>{
          const emp=findEmployee(r.editedBy);
          return React.createElement('div',{key:i,className:'history-log-item'},
            React.createElement('div',{className:'history-log-item-head'},
              React.createElement('span',{className:'history-log-item-field'},EDIT_FIELD_LABELS[r.field]||r.field),
              React.createElement('span',{className:'history-log-item-time'},formatLogTime(r.editedAt))
            ),
            React.createElement('div',{className:'history-log-item-who'},'โดย '+(emp?emp.name:(r.editedBy||'-'))),
            React.createElement('div',{className:'history-log-item-diff'},
              React.createElement('span',{className:'history-log-old'},r.oldValue?truncateText(r.oldValue):'(ว่าง)'),
              React.createElement(Icon,{name:'arrow-right',size:12}),
              React.createElement('span',{className:'history-log-new'},r.newValue?truncateText(r.newValue):'(ว่าง)')
            )
          );
        }):React.createElement('div',{className:'history-log-empty'},'ยังไม่มีประวัติการแก้ไข')
      )
    )
  );
}

function ReportPanel({item,onChange,onSaveEdit,variant,pendingIndex,pendingTotal,allPendingComplete,onPrev,onNext,isHistorical}){
  const isQuarterly=variant==='quarterly';
  const isSubmitted=item.status==='submitted';
  const status=computeStatus(item.result,item.target);
  const [showMissing,setShowMissing]=React.useState(false);
  const [isEditing,setIsEditing]=React.useState(false);
  const [logOpen,setLogOpen]=React.useState(false);
  React.useEffect(()=>{setShowMissing(false);setIsEditing(false);setLogOpen(false);},[item.id]);

  function set(field,value){onChange({...item,[field]:value});}
  function handleNext(){
    if(!itemIsComplete(item)){setShowMissing(true);return;}
    setShowMissing(false);
    onNext();
  }

  const missing=f=>showMissing&&!String(item[f]||'').trim()?'จำเป็นต้องกรอก':undefined;
  const editable=!isHistorical&&canEdit(item);
  // Before submission this is just a preview of who's filing (the logged-in user); once
  // submitted it becomes the actual recorded preparer — either way it's never something the
  // user types in themselves, so it belongs with the other read-only reference fields.
  const preparerDisplay=isSubmitted?(()=>{const emp=findEmployee(item.preparer);return emp?employeeDisplay(emp):'-';})():currentUserDisplay();

  // Everything about the item itself (SLA metadata the user never edits) lives in its own
  // tinted, bordered section — visually read-only reference info, not a row of fake inputs —
  // kept clearly apart from whatever comes after it (the actual fill-in fields or, once
  // submitted, the user's own entered values).
  const headerBlock=React.createElement('div',{className:'panel-ref-section',key:'ref'},
    React.createElement('div',{className:'panel-tags'},
      React.createElement('span',{className:'ba-tag'},item.level0+' · '+item.level0Label),
      React.createElement('span',{className:'ba-tag ba-tag--sub'},item.level1+' · '+item.level1Label)
    ),
    React.createElement('div',{className:'panel-title-group'},
      React.createElement('span',{className:'panel-title-kicker'},isQuarterly?'ตัวชี้วัดกระบวนการ':'ข้อตกลงการให้บริการ (SLA)'),
      React.createElement('h2',{className:'panel-title'},itemLabel(item))
    ),
    React.createElement(StatusMetaRow,{item}),
    React.createElement('div',{className:'panel-ref-grid'},
      React.createElement('div',{className:'report-field'},
        React.createElement('span',{className:'report-field-label'},'ค่าเป้าหมาย (กำหนดโดย กนอ.)'),
        React.createElement('div',{className:'report-field-static'},item.target+'%')
      ),
      !isQuarterly&&React.createElement('div',{className:'report-field'},
        React.createElement('span',{className:'report-field-label'},'ผู้รับบริการ SLA'),
        React.createElement('div',{className:'report-field-static'},item.customer)
      ),
      React.createElement('div',{className:'report-field'},
        React.createElement('span',{className:'report-field-label'},'แหล่งข้อมูลตรวจสอบ'),
        React.createElement('div',{className:'report-field-static'},item.source)
      ),
      React.createElement('div',{className:'report-field'},
        React.createElement('span',{className:'report-field-label'},'ผู้กรอกข้อมูล'),
        React.createElement('div',{className:'report-field-static'},preparerDisplay)
      )
    )
  );

  if(isSubmitted){
    const improvementText=item.improvement.trim()?item.improvement:(status==='pass'?'ไม่มี (ผ่านเกณฑ์)':'-');
    return React.createElement('div',{className:'card panel-card'},
      headerBlock,
      isEditing?
        React.createElement(React.Fragment,null,
          React.createElement('div',{className:'panel-fill-heading'},
            React.createElement(Icon,{name:'edit',size:16}),
            'แก้ไขข้อมูลผลการดำเนินงาน'
          ),
          React.createElement(SubmittedEditForm,{item,
            onSave:draft=>{onSaveEdit(item,draft);setIsEditing(false);},
            onCancel:()=>setIsEditing(false)
          })
        ):
        React.createElement(React.Fragment,null,
          React.createElement('div',{className:'panel-view-grid'},
            React.createElement('div',{className:'report-field'},
              React.createElement('span',{className:'report-field-label'},'ผลการดำเนินงาน'),
              React.createElement('div',{className:'report-field-static'},item.result+'%')
            ),
            React.createElement('div',{className:'report-field'},
              React.createElement('span',{className:'report-field-label'},'รายละเอียดการดำเนินงาน'),
              React.createElement('div',{className:'report-field-static report-field-static--multiline'},item.detail)
            )
          ),
          React.createElement('div',{className:'report-field'},
            React.createElement('span',{className:'report-field-label'},'แนวทางการแก้ไขปรับปรุง'),
            React.createElement('div',{className:'report-field-static report-field-static--multiline'},improvementText)
          ),
          React.createElement('div',{className:'panel-edit-actions'},
            isHistorical?null:(editable?
              React.createElement(Button,{variant:'secondary',size:'md',leadingIcon:React.createElement(Icon,{name:'edit',size:16}),onClick:()=>setIsEditing(true)},'แก้ไขข้อมูล'):
              React.createElement('span',{className:'panel-no-edit-note'},React.createElement(Icon,{name:'lock-01',size:13}),'คุณไม่มีสิทธิ์แก้ไขรายการนี้')),
            React.createElement('button',{type:'button',className:'panel-log-link',onClick:()=>setLogOpen(true)},React.createElement(Icon,{name:'clock',size:14}),'ประวัติการแก้ไข')
          )
        ),
      logOpen&&React.createElement(HistoryLogModal,{item,onClose:()=>setLogOpen(false)})
    );
  }

  return React.createElement('div',{className:'card panel-card'},
    headerBlock,
    React.createElement('div',{className:'panel-fill-heading'},
      React.createElement(Icon,{name:'edit',size:16}),
      'กรอกข้อมูลผลการดำเนินงาน'
    ),
    React.createElement('div',{className:'result-input-col'},
      React.createElement(InputField,{fieldType:'default',label:stepLabel(1,'กรอกผลการดำเนินงาน (%)'),size:'md',type:'text',value:String(item.result),placeholder:'กรอกตัวเลขร้อยละ',isRequired:true,onChange:v=>set('result',v.replace(/[^0-9.]/g,'')),error:missing('result')})
    ),
    React.createElement(Textarea,{label:stepLabel(2,'รายละเอียดการดำเนินงาน'),placeholder:'อธิบายรายละเอียดการดำเนินงาน...',isRequired:true,value:item.detail,onChange:v=>set('detail',v),error:missing('detail')}),
    status==='fail'&&React.createElement(Textarea,{label:stepLabel(3,'แนวทางการแก้ไขปรับปรุง'),placeholder:'ระบุสาเหตุ แนวทางแก้ไข และกำหนดเวลาที่แล้วเสร็จ',isRequired:true,value:item.improvement,onChange:v=>set('improvement',v),error:missing('improvement')}),
    React.createElement('div',{className:'panel-footer-nav'},
      React.createElement('span',{className:'panel-footer-count'},'รายการที่ '+(pendingIndex+1)+' จาก '+pendingTotal),
      React.createElement('div',{className:'panel-footer-btns'},
        React.createElement(Button,{variant:'secondary',size:'md',isDisabled:pendingIndex===0,leadingIcon:React.createElement(Icon,{name:'chevron-left',size:16}),onClick:onPrev},'ก่อนหน้า'),
        React.createElement(Button,{variant:'primary',size:'md',isDisabled:allPendingComplete,trailingIcon:React.createElement(Icon,{name:'arrow-right',size:16}),onClick:handleNext},'ถัดไป')
      )
    )
  );
}

function PanelEmpty(){
  return React.createElement('div',{className:'card panel-card panel-empty'},
    React.createElement(Icon,{name:'check-circle',size:28}),
    React.createElement('div',{className:'panel-empty-title'},'ไม่มีรายการที่ต้องกรอกในรอบนี้'),
    React.createElement('div',{className:'panel-empty-desc'},'เลือกรายการในกล่อง "รายงานแล้ว" ทางซ้ายเพื่อดูรายละเอียดที่ส่งไปแล้ว')
  );
}

function App(){
  // Every department is assigned exactly one report type by the admin — never both.
  const [assignedType,setAssignedType]=React.useState(window.SLA_REPORT_DEPT.assignedReportType||'monthly');
  const [tab,setTab]=React.useState(assignedType);
  const [guideOpen,setGuideOpen]=React.useState(false);
  const [historyOpen,setHistoryOpen]=React.useState(false);
  const p=tab==='monthly'?window.SLA_REPORT_PERIOD:window.SLA_REPORT_QUARTER_PERIOD;
  const periods=tab==='monthly'?window.SLA_REPORT_PERIODS_MONTHLY:window.SLA_REPORT_PERIODS_QUARTERLY;
  const currentPeriodKey=(periods.find(pr=>pr.isCurrent)||periods[0]).key;
  const baseItems=tab==='monthly'?window.SLA_REPORT_ITEMS:window.SLA_REPORT_QUARTERLY_ITEMS;

  // The current period plus every period still ahead of it each keep their own live,
  // editable item set (ปัจจุบัน + กรอกล่วงหน้า) — only already-reported past periods are
  // read-only, driven off each item's history instead (see snapshotItems below).
  const [monthlyEditable,setMonthlyEditable]=React.useState(()=>buildInitialEditable(window.SLA_REPORT_PERIODS_MONTHLY,window.SLA_REPORT_ITEMS));
  const [quarterlyEditable,setQuarterlyEditable]=React.useState(()=>buildInitialEditable(window.SLA_REPORT_PERIODS_QUARTERLY,window.SLA_REPORT_QUARTERLY_ITEMS));
  const editableByPeriod=tab==='monthly'?monthlyEditable:quarterlyEditable;
  const setEditableByPeriod=tab==='monthly'?setMonthlyEditable:setQuarterlyEditable;

  const [selectedMonthKey,setSelectedMonthKey]=React.useState(null);
  const [selectedQuarterKey,setSelectedQuarterKey]=React.useState(null);
  const selectedPeriodKey=(tab==='monthly'?selectedMonthKey:selectedQuarterKey)||currentPeriodKey;
  const setSelectedPeriodKey=tab==='monthly'?setSelectedMonthKey:setSelectedQuarterKey;
  const selectedPeriod=periods.find(pr=>pr.key===selectedPeriodKey);
  const isEditablePeriod=!!editableByPeriod[selectedPeriodKey];
  const isFuturePeriod=isEditablePeriod&&selectedPeriodKey!==currentPeriodKey;
  const isReadOnlyHistoricalView=!isEditablePeriod;

  // Single source of truth for "what are this period's items" — the sidebar, the monthly
  // summary table, and the period-bar's per-box ratios all call this instead of keeping their
  // own derived copies, so they can never drift apart from one another.
  function itemsForPeriodKey(key){
    if(editableByPeriod[key])return editableByPeriod[key];
    const idx=periods.findIndex(pr=>pr.key===key);
    if(idx===-1)return [];
    return baseItems.map(it=>{
      const h=(it.history||[])[idx];
      if(!h)return null;
      return {...it,status:'submitted',result:h.reported?String(h.result):'',target:h.target,
        detail:h.reported?h.detail:'',improvement:'',first_confirmed_at:h.reported?h.confirmedAt:null};
    }).filter(Boolean);
  }

  const activeItems=itemsForPeriodKey(selectedPeriodKey);
  const livePendingItems=isReadOnlyHistoricalView?[]:sortPending(activeItems.filter(i=>i.status!=='submitted'));
  const liveSubmittedItems=isReadOnlyHistoricalView?[]:activeItems.filter(i=>i.status==='submitted');
  const pendingItems=livePendingItems;
  const submittedItems=isReadOnlyHistoricalView?activeItems:liveSubmittedItems;
  const incompleteCount=livePendingItems.filter(i=>!itemIsComplete(i)).length;
  const canSubmitAll=livePendingItems.length>0&&incompleteCount===0;

  React.useEffect(()=>{
    setTab(assignedType);
  },[assignedType]);

  const [activeId,setActiveId]=React.useState(null);
  React.useEffect(()=>{
    setSelectedPeriodKey(null);
    const list=tab==='monthly'?window.SLA_REPORT_ITEMS:window.SLA_REPORT_QUARTERLY_ITEMS;
    const pend=sortPending(list.filter(i=>i.status!=='submitted'));
    setActiveId(pend[0]?pend[0].id:(list[0]?list[0].id:null));
  },[tab]);

  function selectPeriod(key){
    setSelectedPeriodKey(key);
    const periodEditable=editableByPeriod[key];
    if(periodEditable){
      const pend=sortPending(periodEditable.filter(i=>i.status!=='submitted'));
      setActiveId(pend[0]?pend[0].id:(periodEditable[0]?periodEditable[0].id:null));
    }else{
      setActiveId(baseItems[0]?baseItems[0].id:null);
    }
    document.querySelector('.report-layout')?.scrollIntoView({behavior:'smooth',block:'start'});
  }

  function updateItem(next){
    setEditableByPeriod(prev=>({...prev,[selectedPeriodKey]:(prev[selectedPeriodKey]||[]).map(i=>i.id===next.id?next:i)}));
  }
  function submitAll(){
    const editorId=window.CURRENT_USER&&window.CURRENT_USER.employeeId;
    const now=new Date().toISOString();
    setEditableByPeriod(prev=>({...prev,[selectedPeriodKey]:(prev[selectedPeriodKey]||[]).map(i=>{
      if(i.status==='submitted')return i;
      const entries=buildLogEntries({result:'',detail:'',improvement:''},{result:i.result,detail:i.detail,improvement:i.improvement},editorId,now);
      return {...i,status:'submitted',preparer:editorId,
        first_confirmed_at:i.first_confirmed_at||now,
        historyLog:[...(i.historyLog||[]),...entries]};
    })}));
  }
  // Re-checked here, not just by hiding the "แก้ไขข้อมูล" button — this is the function
  // every edit actually goes through, so an unauthorized employee id can never get a write
  // applied even if something else on the page tried to call it directly.
  function saveSubmittedEdit(item,draft){
    if(!canEdit(item))return;
    const editorId=window.CURRENT_USER&&window.CURRENT_USER.employeeId;
    const entries=buildLogEntries(item,draft,editorId,new Date().toISOString());
    if(entries.length===0)return;
    const next={...item,...draft,historyLog:[...(item.historyLog||[]),...entries]};
    setEditableByPeriod(prev=>({...prev,[selectedPeriodKey]:(prev[selectedPeriodKey]||[]).map(i=>i.id===item.id?next:i)}));
  }

  const [draftNote,setDraftNote]=React.useState('');
  const draftTimerRef=React.useRef(null);
  function saveDraft(){
    setDraftNote('บันทึกร่างล่าสุด '+new Date().toLocaleTimeString('th-TH',{hour:'2-digit',minute:'2-digit'})+' น.');
    if(draftTimerRef.current)clearTimeout(draftTimerRef.current);
    draftTimerRef.current=setTimeout(()=>setDraftNote(''),4000);
  }
  function goToFirstIncomplete(){
    const first=livePendingItems.find(i=>!itemIsComplete(i));
    if(!first)return;
    setActiveId(first.id);
    document.querySelector('.panel-col')?.scrollIntoView({behavior:'smooth',block:'start'});
  }

  const activeItem=(activeItems||[]).find(i=>i.id===activeId)||null;
  const activePendingIndex=activeItem?livePendingItems.findIndex(i=>i.id===activeItem.id):-1;
  const allPendingComplete=livePendingItems.length>0&&incompleteCount===0;

  function goPrev(){
    if(activePendingIndex>0)setActiveId(livePendingItems[activePendingIndex-1].id);
  }
  // Only reachable while at least one pending item is still incomplete — once everything is
  // done the "ถัดไป" button that calls this is disabled, since the always-visible submit bar
  // below is the one real way to submit (no more "ตรวจทานและส่ง" standing in for it).
  function goNext(){
    const after=livePendingItems.slice(activePendingIndex+1).find(i=>!itemIsComplete(i));
    if(after){setActiveId(after.id);return;}
    const anyIncomplete=livePendingItems.find(i=>!itemIsComplete(i));
    if(anyIncomplete)setActiveId(anyIncomplete.id);
  }

  return React.createElement(React.Fragment,null,
    React.createElement(TopBar),
    React.createElement('main',{className:'rcontent'},
      React.createElement(Breadcrumb),
      React.createElement(AssignmentDemoControl,{assignedType,setAssignedType}),
      React.createElement('div',{className:'rpage-head'},
        React.createElement('div',{className:'rpage-head-top'},
          React.createElement('div',null,
            React.createElement('h1',null,tab==='monthly'?'รายงานผลการดำเนินงาน SLA (ระดับฝ่าย)':'รายงานผลตัวชี้วัดกระบวนการ (ระดับฝ่าย)'),
            React.createElement('div',{className:'rpage-head-subtitle'},window.SLA_REPORT_DEPT.name)
          ),
          React.createElement('div',{className:'rpage-head-actions'},
            React.createElement(Button,{variant:'secondary',size:'md',leadingIcon:React.createElement(Icon,{name:'help-circle',size:16}),onClick:()=>setGuideOpen(true)},'คำอธิบายรายละเอียด'),
            React.createElement(Link,{className:'rlevel-switch',href:'/sla-report-form-level2'},'สลับไปหน้ารายงานระดับกอง',React.createElement(Icon,{name:'arrow-right',size:14}))
          )
        ),
        React.createElement('div',{className:'rpage-head-meta'},
          isReadOnlyHistoricalView?
            React.createElement(Badge,{label:'รอบ '+selectedPeriod.label+' 2569 · ย้อนหลัง',type:'pill-color',color:'gray',icon:'dot',size:'md'}):
          isFuturePeriod?
            React.createElement(Badge,{label:'รอบ '+selectedPeriod.label+' 2569 · กรอกล่วงหน้า',type:'pill-color',color:'blue',icon:'dot',size:'md'}):
            React.createElement(Badge,{label:'รอบ '+p.name,type:'pill-color',color:'brand',icon:'dot',size:'md'}),
          !isReadOnlyHistoricalView&&!isFuturePeriod&&React.createElement('span',{className:'rpage-deadline'},React.createElement(Icon,{name:'clock',size:14}),'กำหนดส่ง '+p.deadline)
        )
      ),
      React.createElement(PeriodBar,{tab,selectedKey:selectedPeriodKey,onSelect:selectPeriod,itemsForPeriodKey,activeItem,onOpenHistory:()=>setHistoryOpen(true)}),
      React.createElement('div',{className:'report-layout'},
        React.createElement('div',{className:'sidebar-col'},
          React.createElement(PendingList,{items:pendingItems,activeId,onSelect:setActiveId}),
          React.createElement(SubmittedList,{items:submittedItems,activeId,onSelect:setActiveId})
        ),
        React.createElement('div',{className:'panel-col'},
          activeItem?React.createElement(ReportPanel,{
            item:activeItem,onChange:updateItem,onSaveEdit:saveSubmittedEdit,variant:tab,
            pendingIndex:activePendingIndex,pendingTotal:livePendingItems.length,
            allPendingComplete,onPrev:goPrev,onNext:goNext,isHistorical:isReadOnlyHistoricalView
          }):React.createElement(PanelEmpty)
        )
      ),
      React.createElement('div',{className:'report-submit-spacer'})
    ),
    isReadOnlyHistoricalView?
      React.createElement('div',{className:'report-submit-bar'},
        React.createElement('div',{className:'report-submit-left'},
          React.createElement('span',{className:'report-submit-history-note'},
            React.createElement(Icon,{name:'clock',size:15}),
            'กำลังดูรายงานย้อนหลัง รอบ '+selectedPeriod.label+' 2569 — รายงานครบแล้ว ไม่สามารถแก้ไขได้'
          )
        ),
        React.createElement('div',{className:'report-submit-right'},
          React.createElement(Button,{variant:'secondary',size:'md',leadingIcon:React.createElement(Icon,{name:'corner-up-left',size:16}),onClick:()=>selectPeriod(currentPeriodKey)},'กลับไปรอบปัจจุบัน')
        )
      ):
      React.createElement('div',{className:'report-submit-bar'},
        React.createElement('div',{className:'report-submit-left'},
          isFuturePeriod&&React.createElement('span',{className:'report-submit-future-note'},
            React.createElement(Icon,{name:'clock',size:15}),
            'กำลังกรอกล่วงหน้า รอบ '+selectedPeriod.label+' 2569'
          ),
          livePendingItems.length===0?
            React.createElement('span',{className:'submitted-note'},React.createElement(Icon,{name:'check',size:16}),'ส่งรายงานครบทุกรายการแล้ว'):
            incompleteCount>0&&React.createElement('span',{className:'report-submit-hint'},
              React.createElement(Icon,{name:'alert-triangle',size:15}),
              'ยังกรอกไม่ครบ '+incompleteCount+' จาก '+livePendingItems.length+' รายการ',
              React.createElement('button',{type:'button',className:'report-submit-jump',onClick:goToFirstIncomplete},'ไปที่รายการที่ยังไม่ครบ')
            ),
          draftNote&&React.createElement('span',{className:'report-submit-draft-note'},draftNote)
        ),
        React.createElement('div',{className:'report-submit-right'},
          React.createElement(Button,{variant:'secondary',size:'md',leadingIcon:React.createElement(Icon,{name:'save-01',size:16}),onClick:saveDraft},'บันทึกร่าง'),
          React.createElement(Button,{variant:'primary',size:'md',isDisabled:!canSubmitAll,trailingIcon:React.createElement(Icon,{name:'arrow-right',size:16}),onClick:submitAll},'ยืนยันส่งทั้งหมด')
        )
      ),
    guideOpen&&React.createElement(FormGuideModal,{onClose:()=>setGuideOpen(false)}),
    historyOpen&&activeItem&&React.createElement(HistoryModal,{item:activeItem,onClose:()=>setHistoryOpen(false)})
  );
}

export default App;
