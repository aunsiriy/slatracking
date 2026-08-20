import Image from 'next/image';
import Link from 'next/link';
const {Button,Badge,InputField,Avatar}=window.DesignSystem_cbd181;

function TopBar(){
  return React.createElement('header',{className:'ttb'},
    React.createElement('div',{className:'ttb-left'},
      React.createElement(Link,{href:'/',className:'back-link'},React.createElement(Icon,{name:'chevron-right',size:16,style:{transform:'rotate(180deg)'}}),'กลับ'),
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
    React.createElement('span',{className:'is-current'},'QIR สายงาน')
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

function QirGroupList({qirGroups,setGroupIssue,updateQir,addQirRow,removeQirRow,duplicateGroup,removeGroup}){
  return qirGroups.map((g,gi)=>{
    const qirTotal=g.rows.reduce((s,r)=>s+(Number(r.weight)||0),0);
    return React.createElement('div',{key:g.id,className:'lqir-group'},
      React.createElement('div',{className:'lqir-group-head'},
        React.createElement('div',{className:'lqir-group-select'},
          React.createElement('span',{className:'lfield-label'},'ประเด็นพิจารณา'),
          React.createElement('select',{className:'lqir-issue-select',value:g.issueKey,onChange:e=>setGroupIssue(g.id,e.target.value)},
            window.LF_ISSUES.map(o=>React.createElement('option',{key:o.key,value:o.key},o.title))
          )
        ),
        React.createElement('div',{className:'lqir-group-actions'},
          React.createElement(Button,{variant:'secondary',size:'sm',leadingIcon:React.createElement(Icon,{name:'copy-01',size:14}),onClick:()=>duplicateGroup(g.id)},'ทำซ้ำกลุ่มนี้'),
          qirGroups.length>1&&React.createElement(Button,{variant:'secondary-destructive',size:'sm',onClick:()=>removeGroup(g.id)},'ลบกลุ่ม')
        )
      ),
      React.createElement('table',{className:'ltable'},
        React.createElement('thead',null,React.createElement('tr',null,['รายการ','กิจกรรมที่จะดำเนินการ','น้ำหนัก',''].map((h,i)=>React.createElement('th',{key:i},h)))),
        React.createElement('tbody',null,g.rows.map((r,i)=>React.createElement('tr',{key:r.id},
          React.createElement('td',null,i+1),
          React.createElement('td',null,React.createElement(InputField,{fieldType:'default',size:'sm',value:r.activity,onChange:v=>updateQir(g.id,r.id,'activity',v)})),
          React.createElement('td',{className:'lqir-weight'},React.createElement(InputField,{fieldType:'default',size:'sm',value:String(r.weight),onChange:v=>updateQir(g.id,r.id,'weight',v.replace(/[^0-9]/g,''))})),
          React.createElement('td',null,
            React.createElement(Button,{variant:'secondary',size:'sm',onClick:()=>updateQir(g.id,r.id,'saved',true)},'บันทึก'),
            React.createElement('button',{className:'lqir-remove',onClick:()=>removeQirRow(g.id,r.id)},React.createElement(Icon,{name:'x',size:15}))
          )
        )))
      ),
      React.createElement(Button,{variant:'tertiary',size:'sm',className:'lfc-btn-purple',leadingIcon:React.createElement(Icon,{name:'plus',size:14}),onClick:()=>addQirRow(g.id)},'เพิ่มกิจกรรม'),
      React.createElement('div',{className:'lqir-footer'},
        React.createElement('span',null,'Info :: น้ำหนักรวมกัน ไม่เกิน 100'),
        React.createElement('span',{className:'lqir-total'},qirTotal)
      ),
      React.createElement('div',{className:'lqir-status'+(qirTotal===100?' is-ok':qirTotal>100?' is-error':'')},
        React.createElement(Icon,{name:qirTotal===100?'check':'alert-triangle',size:14}),
        qirTotal===100?'น้ำหนักรวมครบ 100 — สามารถบันทึกได้':qirTotal>100?'น้ำหนักรวมเกิน 100 — กรุณาปรับแก้':'น้ำหนักรวมยังไม่ครบ 100'
      )
    );
  });
}

function App(){
  const [qirGroups,setQirGroups]=React.useState([{id:Date.now(),issueKey:window.LF_ISSUES[0].key,rows:window.LF_QIR_ACTIVITIES.map(r=>({...r}))}]);
  const [confirmToast,setConfirmToast]=React.useState(false);
  function setGroupIssue(gid,key){setQirGroups(qirGroups.map(g=>g.id===gid?{...g,issueKey:key}:g));}
  function updateQir(gid,rid,field,value){setQirGroups(qirGroups.map(g=>g.id!==gid?g:{...g,rows:g.rows.map(r=>r.id===rid?{...r,[field]:value}:r)}));}
  function addQirRow(gid){setQirGroups(qirGroups.map(g=>g.id!==gid?g:{...g,rows:[...g.rows,{id:Date.now(),activity:'',weight:0,saved:false}]}));}
  function removeQirRow(gid,rid){setQirGroups(qirGroups.map(g=>g.id!==gid?g:{...g,rows:g.rows.filter(r=>r.id!==rid)}));}
  function addGroup(){setQirGroups([...qirGroups,{id:Date.now(),issueKey:window.LF_ISSUES[0].key,rows:[{id:Date.now()+1,activity:'',weight:0,saved:false}]}]);}
  function duplicateGroup(gid){
    const g=qirGroups.find(x=>x.id===gid);
    if(!g)return;
    const idx=qirGroups.findIndex(x=>x.id===gid);
    const copy={id:Date.now(),issueKey:g.issueKey,rows:g.rows.map((r,i)=>({...r,id:Date.now()+i+1,saved:false}))};
    const next=[...qirGroups];
    next.splice(idx+1,0,copy);
    setQirGroups(next);
  }
  function removeGroup(gid){setQirGroups(qirGroups.filter(g=>g.id!==gid));}
  const allComplete=qirGroups.every(g=>g.rows.reduce((s,r)=>s+(Number(r.weight)||0),0)===100);
  function handleConfirm(){
    setConfirmToast(true);
    setTimeout(()=>{window.location.href='/';},1500);
  }
  return React.createElement(React.Fragment,null,
    React.createElement(TopBar),
    React.createElement('main',{className:'lfcontent'},
      React.createElement(Breadcrumb),
      React.createElement('div',{className:'lfpage-head'},
        React.createElement('div',null,
          React.createElement('h1',null,'QIR สายงาน'),
          React.createElement('p',null,'คัดเลือกและจัดกลุ่มกิจกรรม QIR ตามประเด็นพิจารณาสำหรับสายงาน')
        )
      ),
      React.createElement(SectionCard,{title:'QIR — บันทึกกิจกรรมที่จะดำเนินการ',hint:'จัดกลุ่มกิจกรรมตามประเด็นพิจารณา — น้ำหนักรวมของแต่ละกลุ่มต้องเท่ากับ 100',
        action:React.createElement(Button,{variant:'primary',size:'sm',leadingIcon:React.createElement(Icon,{name:'plus',size:14}),onClick:addGroup},'เพิ่มกลุ่มประเด็นพิจารณา')},
        React.createElement(QirGroupList,{qirGroups,setGroupIssue,updateQir,addQirRow,removeQirRow,duplicateGroup,removeGroup})
      ),
      React.createElement('div',{className:'qlf-actions'},
        React.createElement(Button,{variant:'secondary',size:'md',onClick:()=>{window.location.href='/';}},'ยกเลิก'),
        React.createElement(Button,{variant:'primary',size:'md',isDisabled:!allComplete,onClick:handleConfirm},'ยืนยันคัดเลือก')
      )
    ),
    confirmToast&&React.createElement('div',{className:'ltoast'},React.createElement(Icon,{name:'check-circle',size:16}),'ยืนยันการคัดเลือก QIR เรียบร้อยแล้ว')
  );
}

export default App;
