import Image from 'next/image';
import Link from 'next/link';
const {Button,InputField,Checkbox,Avatar}=window.DesignSystem_cbd181;

const QLF_LINE_NAME='สายงานดิจิทัลและการสื่อสาร';
const QLF_DEPT_SUBMISSIONS=[
  {id:'fpj',dept:'ฝ่ายพัฒนาระบบดิจิทัล (ฝพจ.)',proposals:[
    {id:'fpj-1',proposal:'ปรับปรุงตัวชี้วัดกระบวนการให้สะท้อนประสิทธิภาพและครอบคลุมผลลัพธ์',processKey:'s131',
     activities:[
       {name:'จัดทำแนวทางปรับปรุงตัวชี้วัดกระบวนการ',weight:50},
       {name:'สื่อสารและอบรมการใช้ตัวชี้วัดชุดใหม่ให้หน่วยงานในสังกัด',weight:50}
     ]},
    {id:'fpj-2',proposal:'ลดระยะเวลาการอนุมัติงานพัฒนาระบบด้วยเวิร์กโฟลว์ดิจิทัล',processKey:'s132',
     activities:[
       {name:'ออกแบบเวิร์กโฟลว์อนุมัติอิเล็กทรอนิกส์',weight:60},
       {name:'นำร่องใช้งานกับ 2 กระบวนการหลัก',weight:40}
     ]}
  ]},
  {id:'fdk',dept:'ฝ่ายกลยุทธ์ดิจิทัลและบริหารจัดการข้อมูล (ฝดข.)',proposals:[
    {id:'fdk-1',proposal:'ยกระดับการบูรณาการข้อมูลระหว่างระบบให้เป็นมาตรฐานเดียวกัน',processKey:'s132',
     activities:[
       {name:'ทบทวนสถาปัตยกรรมข้อมูลองค์กรและจัดทำ Data Catalog กลาง',weight:60},
       {name:'กำหนดมาตรฐานการแลกเปลี่ยนข้อมูลระหว่างระบบ',weight:40}
     ]}
  ]},
  {id:'fpd',dept:'ฝ่ายปฏิบัติการและบำรุงรักษาระบบดิจิทัล (ฝปด.)',proposals:[
    {id:'fpd-1',proposal:'รวมศูนย์การเฝ้าระวังและแจ้งเตือนระบบให้ตอบสนองได้เร็วขึ้น',processKey:'s131',
     activities:[
       {name:'รวมศูนย์การเฝ้าระวังและแจ้งเตือนระบบ (Monitoring & Alerting)',weight:100}
     ]}
  ]},
  {id:'frs',dept:'ฝ่ายระบบสื่อสาร (ฝรส.)',proposals:[
    {id:'frs-1',proposal:'จัดทำมาตรฐานการเชื่อมต่อโครงข่ายสื่อสารภายใน',processKey:'s132',
     activities:[
       {name:'จัดทำเอกสารมาตรฐานการเชื่อมต่อโครงข่ายสื่อสาร',weight:100}
     ]},
    {id:'frs-2',proposal:'ยกระดับความมั่นคงปลอดภัยของโครงข่ายสื่อสาร',processKey:'s132',
     activities:[
       {name:'ประเมินช่องโหว่และจัดทำแผนป้องกันเชิงรุก',weight:40},
       {name:'ติดตั้งระบบเฝ้าระวังภัยคุกคามโครงข่าย',weight:60}
     ]}
  ]}
];
function qlfProcessLabel(key){const p=(window.LF_BA_PROCESS_OPTIONS||[]).find(x=>x.key===key);return p?p.label:key;}
const QLF_STEPS=['คัดเลือก QIR ของฝ่าย','สรุปและยืนยัน'];

function TopBar(){
  return React.createElement('header',{className:'ttb'},
    React.createElement('div',{className:'ttb-left'},
      React.createElement(Link,{href:'/qir-line-overview',className:'back-link'},React.createElement(Icon,{name:'chevron-right',size:16,style:{transform:'rotate(180deg)'}}),'กลับ'),
      React.createElement('span',{className:'ttb-divider'}),
      React.createElement(Image,{src:'/sla-logo.svg',alt:'SLA',className:'ttb-logo',width:28,height:28}),
      React.createElement('span',{className:'ttb-title'},'SLA Tracking System')
    ),
    React.createElement('div',{className:'ttb-right'},
      React.createElement(Button,{variant:'tertiary',size:'sm',iconOnly:true,leadingIcon:React.createElement(Icon,{name:'bell',size:19}),'aria-label':'การแจ้งเตือน'}),
      React.createElement(Avatar,{variant:'text',size:'sm',text:'สด'})
    )
  );
}

function Breadcrumb(){
  return React.createElement('div',{className:'lfbreadcrumb'},
    React.createElement(Link,{href:'/'},'หน้าหลัก'),
    React.createElement(Icon,{name:'chevron-right',size:14}),
    React.createElement(Link,{href:'/qir-line-overview'},'ภาพรวม QIR สายงาน'),
    React.createElement(Icon,{name:'chevron-right',size:14}),
    React.createElement('span',{className:'is-current'},'คัดเลือก QIR สายงาน')
  );
}

function SectionCard({title,hint,action,children}){
  return React.createElement('div',{className:'card lsection'},
    React.createElement('div',{className:'lsection-head'},
      React.createElement('div',null,
        React.createElement('h3',null,title),
        hint&&React.createElement('p',{className:'lsection-hint'},hint)
      ),
      action
    ),
    children
  );
}

function Stepper({step,setStep}){
  return React.createElement('div',{className:'qlf-vstepper'},
    QLF_STEPS.map((label,i)=>React.createElement('button',{
      key:label,type:'button',
      className:'qlf-vstep'+(i===step?' is-active':'')+(i<step?' is-done':''),
      onClick:()=>{if(i<step)setStep(i);}},
      React.createElement('span',{className:'qlf-vstep-num'},i<step?React.createElement(Icon,{name:'check',size:13}):i+1),
      React.createElement('span',{className:'qlf-vstep-label'},label)
    ))
  );
}

function ProposalCard({proposal,selectable,checked,onToggle}){
  const total=proposal.activities.reduce((s,a)=>s+(Number(a.weight)||0),0);
  return React.createElement('div',{className:'qlf-prop-card'+(selectable&&checked?' is-selected':'')},
    React.createElement('div',{className:'qlf-dept-info'},
      selectable&&React.createElement('span',{className:'qlf-prop-check'},React.createElement(Checkbox,{size:'sm',isChecked:!!checked,onChange:onToggle})),
      React.createElement('div',{className:'qlf-dept-info-items'},
        React.createElement('div',{className:'qlf-dept-info-item'},
          React.createElement('span',{className:'qlf-dept-info-label'},'ข้อเสนอโอกาสในการปรับปรุงกระบวนการ (QIR)'),
          React.createElement('span',{className:'qlf-dept-info-value'},proposal.proposal)
        ),
        React.createElement('div',{className:'qlf-dept-info-item'},
          React.createElement('span',{className:'qlf-dept-info-label'},'สอดคล้องกับกระบวนการ'),
          React.createElement('span',{className:'qlf-dept-info-value'},qlfProcessLabel(proposal.processKey))
        )
      )
    ),
    React.createElement('table',{className:'ltable'},
      React.createElement('thead',null,React.createElement('tr',null,['รายการ','กิจกรรมที่จะดำเนินการ','น้ำหนัก'].map((h,i)=>React.createElement('th',{key:i},h)))),
      React.createElement('tbody',null,proposal.activities.map((a,i)=>React.createElement('tr',{key:i},
        React.createElement('td',null,i+1),
        React.createElement('td',null,a.name),
        React.createElement('td',{className:'lqir-weight'},a.weight)
      )))
    ),
    React.createElement('div',{className:'qlf-dept-foot'},
      React.createElement('span',null,'น้ำหนักรวม'),
      React.createElement('span',{className:'lqir-total'},total)
    )
  );
}

function DeptBlock({dept,proposals,selectable,selectedIds,onToggle}){
  return React.createElement('div',{className:'qlf-dept-block'},
    React.createElement('div',{className:'qlf-dept-block-head'},
      React.createElement('span',{className:'qlf-dept-block-icon'},React.createElement(Icon,{name:'building',size:18})),
      React.createElement('span',{className:'qlf-dept-name'},dept),
      React.createElement('span',{className:'qlf-dept-block-count'},proposals.length+' ข้อเสนอ')
    ),
    React.createElement('div',{className:'qlf-prop-list'},
      proposals.map(p=>React.createElement(ProposalCard,{
        key:p.id,proposal:p,selectable,
        checked:selectedIds?selectedIds.includes(p.id):false,
        onToggle:onToggle?()=>onToggle(p.id):undefined
      }))
    )
  );
}

function QirGroupList({qirGroups,setGroupProposal,setGroupProcess,updateQir,addQirRow,removeQirRow,duplicateGroup,removeGroup}){
  return qirGroups.map((g,gi)=>{
    const qirTotal=g.rows.reduce((s,r)=>s+(Number(r.weight)||0),0);
    return React.createElement('div',{key:g.id,className:'lqir-group'},
      React.createElement('div',{className:'lqir-group-toolbar'},
        React.createElement('span',{className:'lqir-group-name'},'กลุ่ม QIR ที่ '+(gi+1)),
        React.createElement('div',{className:'lqir-group-actions'},
          React.createElement(Button,{variant:'tertiary',size:'sm',leadingIcon:React.createElement(Icon,{name:'copy-01',size:14}),onClick:()=>duplicateGroup(g.id)},'ทำซ้ำกลุ่มนี้'),
          React.createElement(Button,{variant:'tertiary',size:'sm',className:'lqir-btn-danger',leadingIcon:React.createElement(Icon,{name:'trash',size:14}),onClick:()=>removeGroup(g.id)},'ลบกลุ่ม')
        )
      ),
      React.createElement('div',{className:'lqir-group-head'},
        React.createElement('div',{className:'lqir-group-selects lqir-group-selects--stack'},
          React.createElement('div',{className:'lqir-group-select'},
            React.createElement('span',{className:'lfield-label'},'ข้อเสนอโอกาสในการปรับปรุงกระบวนการ (QIR)'),
            React.createElement(InputField,{fieldType:'default',size:'sm',placeholder:'ระบุข้อเสนอโอกาสในการปรับปรุงกระบวนการ',value:g.proposal||'',onChange:v=>setGroupProposal(g.id,v)})
          ),
          React.createElement('div',{className:'lqir-group-select'},
            React.createElement('span',{className:'lfield-label'},'สอดคล้องกับกระบวนการ'),
            React.createElement('select',{className:'lqir-issue-select',value:g.processKey,onChange:e=>setGroupProcess(g.id,e.target.value)},
              window.LF_BA_PROCESS_OPTIONS.map(o=>React.createElement('option',{key:o.key,value:o.key},o.label))
            )
          )
        )
      ),
      React.createElement('table',{className:'ltable'},
        React.createElement('thead',null,React.createElement('tr',null,['รายการ','กิจกรรมที่จะดำเนินการ','น้ำหนัก',''].map((h,i)=>React.createElement('th',{key:i},h)))),
        React.createElement('tbody',null,g.rows.map((r,i)=>React.createElement('tr',{key:r.id},
          React.createElement('td',null,i+1),
          React.createElement('td',null,React.createElement(InputField,{fieldType:'default',size:'sm',value:r.activity,onChange:v=>updateQir(g.id,r.id,'activity',v)})),
          React.createElement('td',{className:'lqir-weight'},React.createElement(InputField,{fieldType:'default',size:'sm',value:String(r.weight),onChange:v=>updateQir(g.id,r.id,'weight',v.replace(/[^0-9]/g,''))})),
          React.createElement('td',null,
            React.createElement('button',{className:'lqir-remove',onClick:()=>removeQirRow(g.id,r.id)},React.createElement(Icon,{name:'x',size:15}))
          )
        )))
      ),
      React.createElement(Button,{variant:'tertiary',size:'sm',className:'lfc-btn-purple',leadingIcon:React.createElement(Icon,{name:'plus',size:14}),onClick:()=>addQirRow(g.id)},'เพิ่มกิจกรรม'),
      React.createElement('div',{className:'lqir-footer'},
        React.createElement('span',null,'Info :: น้ำหนักรวมกัน ไม่เกิน 100'),
        React.createElement('div',{className:'lqir-total-status'},
          React.createElement('span',{className:'lqir-total'},qirTotal),
          React.createElement('span',{className:'lqir-status-inline'+(qirTotal===100?' is-ok':' is-error')},
            React.createElement(Icon,{name:qirTotal===100?'check':'alert-triangle',size:14}),
            qirTotal===100?'น้ำหนักรวมครบ 100':qirTotal>100?'กรุณาปรับแก้':'ยังไม่ครบ'
          )
        )
      )
    );
  });
}

function SelectStep({selectedIds,setSelectedIds,onNext}){
  function toggle(id){setSelectedIds(selectedIds.includes(id)?selectedIds.filter(x=>x!==id):[...selectedIds,id]);}
  return React.createElement(React.Fragment,null,
    React.createElement(SectionCard,{
      title:'QIR ของฝ่ายภายใต้ '+QLF_LINE_NAME,
      hint:'เลือกข้อเสนอโอกาสในการปรับปรุงกระบวนการ (QIR) ของแต่ละฝ่ายที่จะนำเข้าสู่การพิจารณาระดับสายงาน'},
      React.createElement('div',{className:'qlf-dept-list'},
        QLF_DEPT_SUBMISSIONS.map(sub=>React.createElement(DeptBlock,{key:sub.id,dept:sub.dept,proposals:sub.proposals,selectable:true,selectedIds,onToggle:toggle}))
      )
    ),
    React.createElement('div',{className:'qlf-actions'},
      React.createElement('span',{className:'qlf-count'},'เลือกแล้ว '+selectedIds.length+' ข้อเสนอ'),
      React.createElement(Button,{variant:'secondary',size:'md',onClick:()=>{window.location.href='/qir-line-overview';}},'ยกเลิก'),
      React.createElement(Button,{variant:'primary',size:'md',isDisabled:selectedIds.length===0,trailingIcon:React.createElement(Icon,{name:'arrow-right',size:16}),onClick:onNext},'ถัดไป')
    )
  );
}

function ConfirmStep({selectedGroups,selectedCount,qirGroups,groupHandlers,addGroup,onBack,onSave,saveDisabled}){
  return React.createElement(React.Fragment,null,
    React.createElement('div',{className:'qlf-confirm-sections'},
      React.createElement(SectionCard,{
        title:'QIR ของสายงาน (เพิ่มโดยผู้คัดเลือก)',
        hint:'ผู้คัดเลือกสายงานสามารถเพิ่มกิจกรรม QIR ในระดับสายงานได้ที่นี่ — จะใส่หรือไม่ใส่ก็ได้ (ไม่บังคับ)',
        action:React.createElement(Button,{variant:'primary',size:'sm',leadingIcon:React.createElement(Icon,{name:'plus',size:14}),onClick:addGroup},'เพิ่ม QIR')},
        qirGroups.length>0
          ?React.createElement(QirGroupList,Object.assign({qirGroups},groupHandlers))
          :React.createElement('div',{className:'qlf-empty'},'ยังไม่มี QIR ของสายงาน — จะเพิ่มหรือไม่ก็ได้ หากต้องการเพิ่ม กด "เพิ่ม QIR" เพื่อเพิ่มกิจกรรมของคุณเอง')
      ),
      React.createElement(SectionCard,{
        title:'QIR ของฝ่ายที่คัดเลือก ('+selectedCount+')',
        hint:'ข้อมูล QIR ของฝ่ายที่คัดเลือกมาไม่สามารถแก้ไขได้'},
        selectedGroups.length>0
          ?React.createElement('div',{className:'qlf-dept-list'},
              selectedGroups.map(grp=>React.createElement(DeptBlock,{key:grp.id,dept:grp.dept,proposals:grp.proposals}))
            )
          :React.createElement('div',{className:'qlf-empty'},'ยังไม่ได้เลือกข้อเสนอ QIR ของฝ่ายใด')
      )
    ),
    React.createElement('div',{className:'qlf-actions'},
      React.createElement(Button,{variant:'secondary',size:'md',leadingIcon:React.createElement(Icon,{name:'chevron-left',size:16}),onClick:onBack},'ย้อนกลับ'),
      React.createElement(Button,{variant:'primary',size:'md',isDisabled:saveDisabled,leadingIcon:React.createElement(Icon,{name:'check',size:16}),onClick:onSave},'บันทึกผล')
    )
  );
}

function ConfirmSaveModal({onCancel,onConfirm}){
  return React.createElement('div',{className:'qlf-modal-overlay',onClick:onCancel},
    React.createElement('div',{className:'qlf-modal',onClick:e=>e.stopPropagation()},
      React.createElement('span',{className:'qlf-modal-icon'},React.createElement(Icon,{name:'check-circle',size:26})),
      React.createElement('h3',{className:'qlf-modal-title'},'ยืนยันบันทึกผลการคัดเลือก'),
      React.createElement('p',{className:'qlf-modal-text'},'คุณได้ทำการคัดเลือก QIR ของสายงานประจำปีนี้เรียบร้อยแล้ว ระบบจะบันทึกผลและส่งเข้าสู่การพิจารณาระดับสายงาน — สามารถกลับมาแก้ไขได้ภายหลัง'),
      React.createElement('div',{className:'qlf-modal-foot'},
        React.createElement(Button,{variant:'secondary',size:'md',onClick:onCancel},'ยกเลิก'),
        React.createElement(Button,{variant:'primary',size:'md',onClick:onConfirm},'ยืนยัน')
      )
    )
  );
}

function App(){
  const [step,setStep]=React.useState(0);
  React.useEffect(()=>{window.scrollTo({top:0,behavior:'auto'});},[step]);
  const [selectedIds,setSelectedIds]=React.useState([]);
  const [qirGroups,setQirGroups]=React.useState([]);
  const [confirmOpen,setConfirmOpen]=React.useState(false);
  const [saveToast,setSaveToast]=React.useState(false);
  function setGroupProposal(gid,text){setQirGroups(qirGroups.map(g=>g.id===gid?{...g,proposal:text}:g));}
  function setGroupProcess(gid,key){setQirGroups(qirGroups.map(g=>g.id===gid?{...g,processKey:key}:g));}
  function updateQir(gid,rid,field,value){setQirGroups(qirGroups.map(g=>g.id!==gid?g:{...g,rows:g.rows.map(r=>r.id===rid?{...r,[field]:value}:r)}));}
  function addQirRow(gid){setQirGroups(qirGroups.map(g=>g.id!==gid?g:{...g,rows:[...g.rows,{id:Date.now(),activity:'',weight:0,saved:false}]}));}
  function removeQirRow(gid,rid){setQirGroups(qirGroups.map(g=>g.id!==gid?g:{...g,rows:g.rows.filter(r=>r.id!==rid)}));}
  function addGroup(){setQirGroups([...qirGroups,{id:Date.now(),proposal:'',processKey:window.LF_BA_PROCESS_OPTIONS[0].key,rows:[{id:Date.now()+1,activity:'',weight:0,saved:false}]}]);}
  function duplicateGroup(gid){
    const g=qirGroups.find(x=>x.id===gid);
    if(!g)return;
    const idx=qirGroups.findIndex(x=>x.id===gid);
    const copy={id:Date.now(),proposal:g.proposal,processKey:g.processKey,rows:g.rows.map((r,i)=>({...r,id:Date.now()+i+1,saved:false}))};
    const next=[...qirGroups];
    next.splice(idx+1,0,copy);
    setQirGroups(next);
  }
  function removeGroup(gid){setQirGroups(qirGroups.filter(g=>g.id!==gid));}
  const groupHandlers={setGroupProposal,setGroupProcess,updateQir,addQirRow,removeQirRow,duplicateGroup,removeGroup};
  const selectedGroups=QLF_DEPT_SUBMISSIONS
    .map(s=>({id:s.id,dept:s.dept,proposals:s.proposals.filter(p=>selectedIds.includes(p.id))}))
    .filter(s=>s.proposals.length>0);
  const ownIncomplete=qirGroups.some(g=>g.rows.reduce((s,r)=>s+(Number(r.weight)||0),0)!==100);
  function handleSave(){setConfirmOpen(true);}
  function confirmSave(){
    setConfirmOpen(false);
    setSaveToast(true);
    setTimeout(()=>{window.location.href='/qir-line-overview';},1500);
  }
  return React.createElement(React.Fragment,null,
    React.createElement(TopBar),
    React.createElement('main',{className:'lfcontent'},
      React.createElement(Breadcrumb),
      React.createElement('div',{className:'lfpage-head'},
        React.createElement('div',null,
          React.createElement('h1',null,'QIR สายงาน'),
          React.createElement('p',null,'คัดเลือก QIR ของฝ่ายภายใต้สายงาน แล้วสรุปยืนยันผลการคัดเลือก')
        )
      ),
      React.createElement('div',{className:'qlf-layout'},
        React.createElement(Stepper,{step,setStep}),
        React.createElement('div',{className:'qlf-main'},
          step===0
            ?React.createElement(SelectStep,{selectedIds,setSelectedIds,onNext:()=>setStep(1)})
            :React.createElement(ConfirmStep,{selectedGroups,selectedCount:selectedIds.length,qirGroups,groupHandlers,addGroup,onBack:()=>setStep(0),onSave:handleSave,saveDisabled:ownIncomplete})
        )
      )
    ),
    confirmOpen&&React.createElement(ConfirmSaveModal,{onCancel:()=>setConfirmOpen(false),onConfirm:confirmSave}),
    saveToast&&React.createElement('div',{className:'ltoast'},React.createElement(Icon,{name:'check-circle',size:16}),'บันทึกผลการคัดเลือก QIR เรียบร้อยแล้ว')
  );
}

export default App;
