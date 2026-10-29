import Image from 'next/image';
import Link from 'next/link';
const {Button,Badge,InputField,Textarea}=window.DesignSystem_cbd181;

const SLA_FORM_GUIDE=[
{part:'ขั้นที่ 1',title:'เลือกรายการทางซ้าย',desc:'กล่อง "ต้องกรอก" ทางซ้ายมือจะเรียงรายการให้อัตโนมัติ โดยเริ่มจากรายการที่เลยกำหนดส่งก่อน ตามด้วยรายการที่ยังไม่ถึงกำหนด คลิกรายการใดก็ได้เพื่อเปิดกรอกทางขวามือ'},
{part:'ขั้นที่ 2',title:'กรอกข้อมูลทางขวาแล้วกด "ถัดไป"',desc:'กรอกผลการดำเนินงาน (%) ระบบจะแจ้งผ่าน/ไม่ผ่านทันที ตามด้วยรายละเอียดการดำเนินงาน และแนวทางแก้ไข (กรณีผลไม่ผ่านเกณฑ์) แล้วกด "ถัดไป" เพื่อไปยังรายการถัดไปที่ยังไม่ครบ หากกดตอนกรอกไม่ครบ ช่องที่ขาดจะขึ้นกรอบสีแดงให้แก้ไข'},
{part:'ขั้นที่ 3',title:'กด "ยืนยันส่งทั้งหมด"',desc:'เมื่อกรอกครบทุกรายการ ตัวเลขในกล่อง "ต้องกรอก" จะเปลี่ยนเป็นเครื่องหมายถูกสีเขียว และปุ่มทางขวาจะเปลี่ยนเป็น "ตรวจทานและส่ง" ให้กดปุ่ม "ยืนยันส่งทั้งหมด" ด้านล่างสุดของหน้าเพื่อส่งรายงานทั้งหมดให้ กนอ. ในครั้งเดียว'},
{part:'สัญลักษณ์',title:'สีสถานะในแถบรอบรายงาน',desc:'เขียว = ครบแล้ว, เหลือง = มีรายการต้องแก้ไข, แดง = เลยกำหนด, เทา = ยังไม่ถึงรอบ (กดไม่ได้)'},
{part:'หมายเหตุ',title:'รายการที่รายงานในระดับกอง',desc:'หน้านี้รายงานผล SLA รายเดือนลงถึงระดับงานย่อย (Level 2 Jobs) เช่น S1.3.1, S1.3.2 ซึ่งเป็นงานภายใต้กระบวนการ (Level 1) ของฝ่าย — ระดับกองไม่มีรายงานผลตัวชี้วัดกระบวนการรายไตรมาส'},
{part:'หมายเหตุ',title:'แก้ไขรายการที่ยืนยันแล้วได้',desc:'รายการที่ "รายงานแล้ว" สามารถกด "แก้ไขข้อมูล" เพื่อปรับผลการดำเนินงาน รายละเอียด หรือแนวทางแก้ไขได้ภายหลัง แต่จะแก้ไขได้เฉพาะผู้ที่มีรายชื่อเป็นผู้มีสิทธิ์กรอกของรายการนั้นเท่านั้น ทุกครั้งที่แก้ไขจะถูกบันทึกไว้ใน "ประวัติการแก้ไข" ของรายการนั้น'}
];

function TopBar(){
  return React.createElement('header',{className:'rtop'},
    React.createElement('div',{className:'rtop-left'},
      React.createElement(Link,{className:'rtop-back',href:'/'},React.createElement(Icon,{name:'corner-up-left',size:16}),'กลับ'),
      React.createElement(Image,{className:'rtop-logo',src:'/assets/sla-logo-checkmark.png',alt:'SLA',width:36,height:36}),
      React.createElement('div',{className:'rtop-word'},
        React.createElement('span',{className:'rtop-title'},'SLA Tracking System'),
        React.createElement('span',{className:'rtop-sub'},'รายงานผลการดำเนินงาน SLA')
      )
    )
  );
}

function Breadcrumb(){
  return React.createElement('div',{className:'rbreadcrumb'},
    React.createElement(Link,{href:'/'},'หน้าหลัก'),
    React.createElement(Icon,{name:'chevron-right',size:14}),
    React.createElement('span',{className:'is-current'},'รายงานผล SLA (ระดับกอง)')
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

const PERIOD_STATUS_META={
  done:{label:'ครบแล้ว'},
  needs_fix:{label:'มีรายการต้องแก้ไข'},
  overdue:{label:'เลยกำหนด'},
  upcoming:{label:'ยังไม่ถึงรอบ'}
};

function PeriodBox({period,isSelected,onSelect}){
  const disabled=period.status==='upcoming';
  const meta=PERIOD_STATUS_META[period.status];
  const statusLabel=period.status==='needs_fix'&&period.pendingCount?meta.label+' · '+period.pendingCount:meta.label;
  return React.createElement('button',{type:'button',disabled,onClick:()=>onSelect(period.key),
    className:'period-box period-box--'+period.status+(period.isCurrent?' is-current':'')+(isSelected&&!period.isCurrent?' is-selected':'')+(disabled?' is-disabled':'')},
    period.isCurrent&&React.createElement('span',{className:'period-box-badge'},'รอบปัจจุบัน'),
    React.createElement('div',{className:'period-box-label'},period.label),
    React.createElement('div',{className:'period-box-status'},statusLabel)
  );
}

function PeriodBar({selectedKey,onSelect}){
  const periods=window.SLA_REPORT_L2_PERIODS_MONTHLY;
  return React.createElement('div',{className:'period-bar'},
    React.createElement('div',{className:'period-bar-head'},
      React.createElement('span',{className:'period-bar-title'},'รอบรายงาน · ปี 2569'),
      React.createElement('div',{className:'period-legend'},
        React.createElement('span',{className:'period-legend-item'},React.createElement('i',{className:'dot dot-success'}),'ครบแล้ว'),
        React.createElement('span',{className:'period-legend-item'},React.createElement('i',{className:'dot dot-warning'}),'มีรายการต้องแก้ไข'),
        React.createElement('span',{className:'period-legend-item'},React.createElement('i',{className:'dot dot-error'}),'เลยกำหนด'),
        React.createElement('span',{className:'period-legend-item'},React.createElement('i',{className:'dot dot-gray'}),'ยังไม่ถึงรอบ')
      )
    ),
    React.createElement('div',{className:'period-grid'},
      periods.map(p=>React.createElement(PeriodBox,{key:p.key,period:p,isSelected:p.key===selectedKey,onSelect}))
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

function pendingReason(item){
  if(item.status==='overdue')return {type:'overdue',text:'เลยกำหนด '+item.dueDate};
  return {type:'normal',text:'ส่งภายใน '+item.dueDate};
}
const REASON_PRIORITY={overdue:0,normal:1};

function sortPending(items){
  return [...items].sort((a,b)=>REASON_PRIORITY[pendingReason(a).type]-REASON_PRIORITY[pendingReason(b).type]);
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
            React.createElement('div',{className:'sidebar-item-title'},item.level2+' · '+item.slaName),
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
        const status=computeStatus(item.result,item.target);
        const isActive=item.id===activeId;
        return React.createElement('button',{key:item.id,type:'button',className:'sidebar-item sidebar-item--submitted'+(isActive?' is-active':''),onClick:()=>onSelect(item.id)},
          React.createElement('div',{className:'sidebar-item-body'},
            React.createElement('div',{className:'sidebar-item-title'},item.level2+' · '+item.slaName)
          ),
          React.createElement(Badge,{label:(status==='pass'?'ผ่าน':'ไม่ผ่าน')+' '+item.result+'%',type:'pill-color',color:status==='pass'?'success':'error',size:'sm'})
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
  const status=computeStatus(item.result,item.target);
  const isSubmitted=item.status==='submitted';
  const meta=REPORT_STATUS_META[item.status]||REPORT_STATUS_META.not_reported;
  const dueLabel=isSubmitted?null:('กำหนดส่ง '+item.dueDate);
  return React.createElement('div',{className:'panel-status-row'},
    React.createElement('span',{className:'panel-status-pair'},
      React.createElement('span',{className:'panel-status-label'},'สถานะรายงาน'),
      React.createElement(Badge,{label:meta.label,type:'pill-color',color:meta.color,size:'sm'})
    ),
    status&&React.createElement('span',{className:'panel-status-pair'},
      React.createElement('span',{className:'panel-status-label'},'ผลลัพธ์'),
      React.createElement(Badge,{label:status==='pass'?'ผ่าน':'ไม่ผ่าน',type:'pill-color',color:status==='pass'?'success':'error',size:'sm'})
    ),
    dueLabel&&React.createElement('span',{className:'panel-status-pair panel-status-due'},React.createElement(Icon,{name:'clock',size:14}),dueLabel)
  );
}

function HistorySection({item}){
  const [open,setOpen]=React.useState(false);
  const rows=item.history||[];
  if(rows.length===0)return null;
  return React.createElement('div',{className:'history-section'},
    React.createElement('button',{type:'button',className:'history-toggle',onClick:()=>setOpen(v=>!v)},
      React.createElement(Icon,{name:'chevron-down',size:14,className:'history-chevron'+(open?' is-open':'')}),
      'ดูประวัติการรายงาน ('+rows.length+' รอบ)'
    ),
    open&&React.createElement('div',{className:'history-table-wrap'},
      React.createElement('table',{className:'history-table'},
        React.createElement('thead',null,React.createElement('tr',null,
          ['รอบ','ผล','เป้า','ผลลัพธ์','สถานะรายงาน','ผู้บันทึก'].map(h=>React.createElement('th',{key:h},h))
        )),
        React.createElement('tbody',null,
          rows.map((r,i)=>React.createElement('tr',{key:i},
            React.createElement('td',null,r.period),
            React.createElement('td',null,r.result+'%'),
            React.createElement('td',null,r.target+'%'),
            React.createElement('td',null,React.createElement(Badge,{label:r.outcome==='pass'?'ผ่าน':'ไม่ผ่าน',type:'pill-color',color:r.outcome==='pass'?'success':'error',size:'sm'})),
            React.createElement('td',null,React.createElement(Badge,{label:'รายงานแล้ว',type:'pill-color',color:'blue',size:'sm'})),
            React.createElement('td',null,r.recorder)
          ))
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

function ReportPanel({item,onChange,onSaveEdit,pendingIndex,pendingTotal,allPendingComplete,onPrev,onNext,isHistorical}){
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

  const headerBlock=[
    React.createElement('div',{className:'panel-tags',key:'tags'},
      React.createElement('span',{className:'ba-tag'},item.level0+' · '+item.level0Label),
      React.createElement('span',{className:'ba-tag'},item.level1+' · '+item.level1Label),
      React.createElement('span',{className:'ba-tag ba-tag--sub'},item.level2+' · '+item.level2Label)
    ),
    React.createElement('h2',{className:'panel-title',key:'title'},item.slaName),
    React.createElement(StatusMetaRow,{item,key:'status'}),
    React.createElement('div',{className:'panel-static-grid',key:'static-grid'},
      React.createElement('div',{className:'report-field'},
        React.createElement('span',{className:'report-field-label'},'ค่าเป้าหมาย (กำหนดโดย กนอ.)'),
        React.createElement('div',{className:'report-field-static'},item.target+'%')
      ),
      React.createElement('div',{className:'report-field'},
        React.createElement('span',{className:'report-field-label'},'ผู้รับบริการ SLA'),
        React.createElement('div',{className:'report-field-static'},item.customer)
      ),
      React.createElement('div',{className:'report-field'},
        React.createElement('span',{className:'report-field-label'},'แหล่งข้อมูลตรวจสอบ'),
        React.createElement('div',{className:'report-field-static'},item.source)
      )
    )
  ];

  if(isSubmitted){
    const improvementText=item.improvement.trim()?item.improvement:(status==='pass'?'ไม่มี (ผ่านเกณฑ์)':'-');
    const preparerEmp=findEmployee(item.preparer);
    return React.createElement('div',{className:'card panel-card'},
      ...headerBlock,
      isEditing?
        React.createElement(SubmittedEditForm,{item,
          onSave:draft=>{onSaveEdit(item,draft);setIsEditing(false);},
          onCancel:()=>setIsEditing(false)
        }):
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
          React.createElement('div',{className:'report-field'},
            React.createElement('span',{className:'report-field-label'},'ผู้กรอกข้อมูล'),
            React.createElement('div',{className:'report-field-static'},preparerEmp?employeeDisplay(preparerEmp):'-')
          ),
          React.createElement('div',{className:'panel-edit-actions'},
            isHistorical?null:(editable?
              React.createElement(Button,{variant:'secondary',size:'md',leadingIcon:React.createElement(Icon,{name:'edit',size:16}),onClick:()=>setIsEditing(true)},'แก้ไขข้อมูล'):
              React.createElement('span',{className:'panel-no-edit-note'},React.createElement(Icon,{name:'lock-01',size:13}),'คุณไม่มีสิทธิ์แก้ไขรายการนี้')),
            React.createElement('button',{type:'button',className:'panel-log-link',onClick:()=>setLogOpen(true)},React.createElement(Icon,{name:'clock',size:14}),'ประวัติการแก้ไข')
          )
        ),
      React.createElement(HistorySection,{item}),
      logOpen&&React.createElement(HistoryLogModal,{item,onClose:()=>setLogOpen(false)})
    );
  }

  return React.createElement('div',{className:'card panel-card'},
    ...headerBlock,
    React.createElement('div',{className:'result-input-col'},
      React.createElement(InputField,{fieldType:'default',label:stepLabel(1,'กรอกผลการดำเนินงาน (%)'),size:'md',type:'text',value:String(item.result),placeholder:'กรอกตัวเลขร้อยละ',isRequired:true,onChange:v=>set('result',v.replace(/[^0-9.]/g,'')),error:missing('result')})
    ),
    React.createElement(Textarea,{label:stepLabel(2,'รายละเอียดการดำเนินงาน'),placeholder:'อธิบายรายละเอียดการดำเนินงาน...',isRequired:true,value:item.detail,onChange:v=>set('detail',v),error:missing('detail')}),
    status==='fail'&&React.createElement(Textarea,{label:stepLabel(3,'แนวทางการแก้ไขปรับปรุง'),placeholder:'ระบุสาเหตุ แนวทางแก้ไข และกำหนดเวลาที่แล้วเสร็จ',isRequired:true,value:item.improvement,onChange:v=>set('improvement',v),error:missing('improvement')}),
    React.createElement('div',{className:'report-field'},
      React.createElement('span',{className:'report-field-label'},'ผู้กรอกข้อมูล'),
      React.createElement('div',{className:'report-field-static'},currentUserDisplay())
    ),
    React.createElement('div',{className:'panel-footer-nav'},
      React.createElement('span',{className:'panel-footer-count'},'รายการที่ '+(pendingIndex+1)+' จาก '+pendingTotal),
      React.createElement('div',{className:'panel-footer-btns'},
        React.createElement(Button,{variant:'secondary',size:'md',isDisabled:pendingIndex===0,leadingIcon:React.createElement(Icon,{name:'chevron-left',size:16}),onClick:onPrev},'ก่อนหน้า'),
        React.createElement(Button,{variant:'primary',size:'md',trailingIcon:React.createElement(Icon,{name:'arrow-right',size:16}),onClick:handleNext},allPendingComplete?'ตรวจทานและส่ง':'ถัดไป')
      )
    ),
    React.createElement(HistorySection,{item})
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
  const [items,setItems]=React.useState(window.SLA_REPORT_L2_ITEMS);
  const [guideOpen,setGuideOpen]=React.useState(false);
  const p=window.SLA_REPORT_L2_PERIOD;
  const periods=window.SLA_REPORT_L2_PERIODS_MONTHLY;
  const currentPeriodKey=(periods.find(pr=>pr.isCurrent)||periods[0]).key;

  const [selectedPeriodKey,setSelectedPeriodKeyRaw]=React.useState(currentPeriodKey);
  const isHistoricalView=selectedPeriodKey!==currentPeriodKey;
  const selectedPeriod=periods.find(pr=>pr.key===selectedPeriodKey);
  const historyIndex=periods.findIndex(pr=>pr.key===selectedPeriodKey);
  const snapshotItems=React.useMemo(()=>{
    if(!isHistoricalView)return null;
    return items.map(it=>{
      const h=(it.history||[])[historyIndex];
      if(!h)return null;
      return {...it,status:'submitted',result:String(h.result),target:h.target,detail:h.detail,improvement:''};
    }).filter(Boolean);
  },[isHistoricalView,historyIndex,items]);

  const livePendingItems=sortPending(items.filter(i=>i.status!=='submitted'));
  const liveSubmittedItems=items.filter(i=>i.status==='submitted');
  const pendingItems=isHistoricalView?[]:livePendingItems;
  const submittedItems=isHistoricalView?snapshotItems:liveSubmittedItems;
  const displayItems=isHistoricalView?snapshotItems:items;
  const incompleteCount=livePendingItems.filter(i=>!itemIsComplete(i)).length;
  const canSubmitAll=livePendingItems.length>0&&incompleteCount===0;

  const [activeId,setActiveId]=React.useState(()=>{
    const pend=sortPending(window.SLA_REPORT_L2_ITEMS.filter(i=>i.status!=='submitted'));
    return pend[0]?pend[0].id:(window.SLA_REPORT_L2_ITEMS[0]?window.SLA_REPORT_L2_ITEMS[0].id:null);
  });

  function selectPeriod(key){
    setSelectedPeriodKeyRaw(key);
    if(key===currentPeriodKey){
      setActiveId(livePendingItems[0]?livePendingItems[0].id:(items[0]?items[0].id:null));
    }else{
      setActiveId(items[0]?items[0].id:null);
    }
    document.querySelector('.report-layout')?.scrollIntoView({behavior:'smooth',block:'start'});
  }

  function updateItem(next){setItems(items.map(i=>i.id===next.id?next:i));}
  function submitAll(){
    const editorId=window.CURRENT_USER&&window.CURRENT_USER.employeeId;
    const now=new Date().toISOString();
    setItems(items.map(i=>{
      if(i.status==='submitted')return i;
      const entries=buildLogEntries({result:'',detail:'',improvement:''},{result:i.result,detail:i.detail,improvement:i.improvement},editorId,now);
      return {...i,status:'submitted',preparer:editorId,
        first_confirmed_at:i.first_confirmed_at||now,
        historyLog:[...(i.historyLog||[]),...entries]};
    }));
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
    setItems(items.map(i=>i.id===item.id?next:i));
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

  const activeItem=(displayItems||[]).find(i=>i.id===activeId)||null;
  const activePendingIndex=activeItem?livePendingItems.findIndex(i=>i.id===activeItem.id):-1;
  const allPendingComplete=livePendingItems.length>0&&incompleteCount===0;

  function goPrev(){
    if(activePendingIndex>0)setActiveId(livePendingItems[activePendingIndex-1].id);
  }
  function goNext(){
    const after=livePendingItems.slice(activePendingIndex+1).find(i=>!itemIsComplete(i));
    if(after){setActiveId(after.id);return;}
    const anyIncomplete=livePendingItems.find(i=>!itemIsComplete(i));
    if(anyIncomplete){setActiveId(anyIncomplete.id);return;}
    const bar=document.querySelector('.report-submit-bar');
    if(bar)bar.scrollIntoView({behavior:'smooth',block:'center'});
  }

  return React.createElement(React.Fragment,null,
    React.createElement(TopBar),
    React.createElement('main',{className:'rcontent'},
      React.createElement(Breadcrumb),
      React.createElement('div',{className:'rpage-head'},
        React.createElement('div',{className:'rpage-head-top'},
          React.createElement('div',null,
            React.createElement('h1',null,'รายงานผลการดำเนินงาน SLA (ระดับกอง)'),
            React.createElement('div',{className:'rpage-head-subtitle'},window.SLA_REPORT_L2_DEPT.name)
          ),
          React.createElement('div',{className:'rpage-head-actions'},
            React.createElement(Button,{variant:'secondary',size:'md',leadingIcon:React.createElement(Icon,{name:'help-circle',size:16}),onClick:()=>setGuideOpen(true)},'คำอธิบายรายละเอียด'),
            React.createElement(Link,{className:'rlevel-switch',href:'/sla-report-form'},'สลับไปหน้ารายงานระดับฝ่าย',React.createElement(Icon,{name:'arrow-right',size:14}))
          )
        ),
        React.createElement('div',{className:'rpage-head-meta'},
          isHistoricalView?
            React.createElement(Badge,{label:'รอบ '+selectedPeriod.label+' 2569 · ย้อนหลัง',type:'pill-color',color:'gray',icon:'dot',size:'md'}):
            React.createElement(Badge,{label:'รอบ '+p.name,type:'pill-color',color:'brand',icon:'dot',size:'md'}),
          !isHistoricalView&&React.createElement('span',{className:'rpage-deadline'},React.createElement(Icon,{name:'clock',size:14}),'กำหนดส่ง '+p.deadline)
        )
      ),
      React.createElement(PeriodBar,{selectedKey:selectedPeriodKey,onSelect:selectPeriod}),
      React.createElement('div',{className:'report-layout'},
        React.createElement('div',{className:'sidebar-col'},
          React.createElement(PendingList,{items:pendingItems,activeId,onSelect:setActiveId}),
          React.createElement(SubmittedList,{items:submittedItems,activeId,onSelect:setActiveId})
        ),
        React.createElement('div',{className:'panel-col'},
          activeItem?React.createElement(ReportPanel,{
            item:activeItem,onChange:updateItem,onSaveEdit:saveSubmittedEdit,
            pendingIndex:activePendingIndex,pendingTotal:livePendingItems.length,
            allPendingComplete,onPrev:goPrev,onNext:goNext,isHistorical:isHistoricalView
          }):React.createElement(PanelEmpty)
        )
      ),
      React.createElement('div',{className:'report-submit-spacer'})
    ),
    isHistoricalView?
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
    guideOpen&&React.createElement(FormGuideModal,{onClose:()=>setGuideOpen(false)})
  );
}

export default App;
