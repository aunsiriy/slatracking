import Image from 'next/image';
import Link from 'next/link';
const {Button,InputField,Textarea,Badge,Checkbox}=window.DesignSystem_cbd181;

function TopBar(){
  return React.createElement('header',{className:'lfctop'},
    React.createElement('div',{className:'lfctop-left'},
      React.createElement(Link,{className:'lfctop-back',href:'/learning-form-overview-admin'},React.createElement(Icon,{name:'chevron-left',size:16}),'กลับ'),
      React.createElement(Image,{className:'lfctop-logo',src:'/assets/sla-logo-checkmark.png',alt:'SLA',width:36,height:36}),
      React.createElement('div',{className:'lfctop-word'},
        React.createElement('span',{className:'lfctop-title'},'PEA-SLA Tracking System'),
        React.createElement('span',{className:'lfctop-sub'},'สร้าง Learning Form')
      )
    )
  );
}

function Breadcrumb(){
  return React.createElement('div',{className:'lfcbreadcrumb'},
    React.createElement(Link,{href:'/'},'หน้าหลัก'),
    React.createElement(Icon,{name:'chevron-right',size:14}),
    React.createElement(Link,{href:'/learning-form-overview-admin'},'ภาพรวม Learning Form'),
    React.createElement(Icon,{name:'chevron-right',size:14}),
    React.createElement('span',{className:'is-current'},'สร้าง Learning Form')
  );
}

function PersonRow({label,person,onChange}){
  function set(field,value){onChange({...person,[field]:value});}
  function setEmpId(v){
    const digits=v.replace(/[^0-9]/g,'').slice(0,6);
    if(digits.length===6){
      const found=window.lfcLookupEmployee(digits);
      if(found){onChange({...person,empId:digits,name:found.name,position:found.position,tel:found.tel});return;}
    }
    set('empId',digits);
  }
  return React.createElement('div',{className:'lfc-person-row'},
    React.createElement('div',{className:'lfc-person-label'},label),
    React.createElement('div',{className:'lfc-person-fields'},
      React.createElement(InputField,{fieldType:'default',size:'md',label:'รหัสพนักงาน',placeholder:'รหัสพนักงาน',leadingIcon:React.createElement(Icon,{name:'search',size:16}),value:person.empId,onChange:setEmpId}),
      React.createElement(InputField,{fieldType:'default',size:'md',label:'ชื่อ-สกุล',placeholder:'ชื่อ-สกุล',value:person.name,onChange:v=>set('name',v)}),
      React.createElement(InputField,{fieldType:'default',size:'md',label:'ตำแหน่ง',placeholder:'ตำแหน่ง',value:person.position,onChange:v=>set('position',v)}),
      React.createElement(InputField,{fieldType:'default',size:'md',label:'โทร',placeholder:'โทร',value:person.tel,onChange:v=>set('tel',v)})
    )
  );
}

function ParticipantsRow({people,onChange}){
  function updateAt(i,next){onChange(people.map((p,idx)=>idx===i?next:p));}
  function addPerson(){onChange([...people,{name:'',position:'',empId:'',tel:''}]);}
  function removePerson(i){onChange(people.filter((_,idx)=>idx!==i));}
  return React.createElement('div',{className:'lfc-person-row'},
    React.createElement('div',{className:'lfc-label-row'},
      React.createElement('div',{className:'lfc-person-label'},'ผู้เข้าร่วมจัดทำ'),
      React.createElement(Button,{variant:'tertiary',size:'sm',className:'lfc-btn-purple',leadingIcon:React.createElement(Icon,{name:'plus',size:14}),onClick:addPerson},'เพิ่มคน')
    ),
    people.map((p,i)=>{
      function setEmpId(v){
        const digits=v.replace(/[^0-9]/g,'').slice(0,6);
        if(digits.length===6){
          const found=window.lfcLookupEmployee(digits);
          if(found){updateAt(i,{...p,empId:digits,name:found.name,position:found.position,tel:found.tel});return;}
        }
        updateAt(i,{...p,empId:digits});
      }
      return React.createElement('div',{key:i,className:'lfc-participant-row'},
        React.createElement('div',{className:'lfc-person-fields'},
          React.createElement(InputField,{fieldType:'default',size:'md',placeholder:'ค้นหารหัสพนักงาน',leadingIcon:React.createElement(Icon,{name:'search',size:16}),value:p.empId,onChange:setEmpId}),
          React.createElement(InputField,{fieldType:'default',size:'md',placeholder:'ชื่อ-สกุล',value:p.name,onChange:v=>updateAt(i,{...p,name:v})}),
          React.createElement(InputField,{fieldType:'default',size:'md',placeholder:'ตำแหน่ง',value:p.position,onChange:v=>updateAt(i,{...p,position:v})}),
          React.createElement(InputField,{fieldType:'default',size:'md',placeholder:'โทร',value:p.tel,onChange:v=>updateAt(i,{...p,tel:v})})
        ),
        people.length>1&&React.createElement('button',{className:'lfc-objective-remove',onClick:()=>removePerson(i)},React.createElement(Icon,{name:'x',size:15}))
      );
    })
  );
}

function UnitCombobox({units,levelLabel,selected,onToggle}){
  const [query,setQuery]=React.useState('');
  const [open,setOpen]=React.useState(false);
  const wrapRef=React.useRef(null);

  React.useEffect(()=>{
    function onDocClick(e){if(wrapRef.current&&!wrapRef.current.contains(e.target))setOpen(false);}
    document.addEventListener('mousedown',onDocClick);
    return ()=>document.removeEventListener('mousedown',onDocClick);
  },[]);

  const selectedUnits=units.filter(u=>selected.has(u.key));
  const filtered=units.filter(u=>u.name.toLowerCase().includes(query.trim().toLowerCase()));

  return React.createElement('div',{className:'lfc-combobox',ref:wrapRef},
    React.createElement('div',{className:'lfc-combobox-box',onClick:()=>setOpen(true)},
      selectedUnits.map(u=>React.createElement(Badge,{key:u.key,label:u.name,type:'pill-color',color:'gray',size:'sm',icon:'x-close',onDismiss:e=>{e.stopPropagation();onToggle(u.key);}})),
      React.createElement('input',{
        className:'lfc-combobox-input',
        placeholder:selectedUnits.length?'':'ค้นหาหน่วยงานจากโครงสร้างองค์กร',
        value:query,
        onFocus:()=>setOpen(true),
        onChange:e=>{setQuery(e.target.value);setOpen(true);}
      })
    ),
    open&&React.createElement('div',{className:'lfc-combobox-dropdown'},
      filtered.length===0
        ?React.createElement('div',{className:'lfc-combobox-empty'},'ไม่พบหน่วยงาน')
        :filtered.map(u=>React.createElement('label',{key:u.key,className:'lfc-unit-row'},
            React.createElement(Checkbox,{isChecked:selected.has(u.key),onChange:()=>onToggle(u.key),size:'sm'}),
            React.createElement('span',{className:'lfc-unit-name'},u.name),
            React.createElement('span',{className:'ba-tag'},levelLabel[u.level])
          ))
    )
  );
}

function App(){
  const [processCode,setProcessCode]=React.useState('');
  const [objectives,setObjectives]=React.useState(['','']);
  function updateObjective(i,v){setObjectives(objectives.map((o,idx)=>idx===i?v:o));}
  function addObjective(){setObjectives([...objectives,'']);}
  function removeObjective(i){setObjectives(objectives.filter((_,idx)=>idx!==i));}
  const [recorder,setRecorder]=React.useState({name:'',position:'',empId:'',tel:''});
  const [reviewer,setReviewer]=React.useState({name:'',position:'',empId:'',tel:''});
  const [approver,setApprover]=React.useState({name:'',position:'',empId:'',tel:''});
  const [participants,setParticipants]=React.useState([{name:'',position:'',empId:'',tel:''}]);
  const [year,setYear]=React.useState(window.LFC_YEARS[0]);
  const [selected,setSelected]=React.useState(()=>new Set());

  function toggleUnit(key){setSelected(s=>{const n=new Set(s);n.has(key)?n.delete(key):n.add(key);return n;});}

  const isValid=processCode.trim().length>0&&selected.size>0;

  function handleSubmit(){
    if(!isValid){
      const missing=[];
      if(!processCode.trim())missing.push('ชื่อกระบวนการ');
      if(selected.size===0)missing.push('หน่วยงานผู้รับผิดชอบ');
      window.alert('กรุณากรอกข้อมูลให้ครบถ้วน: '+missing.join(', '));
      return;
    }
    const node=window.BA_LEVELS.l1.find(n=>n.code===processCode);
    const processName=node?node.code+' '+node.name:processCode;
    const unitKeys=Array.from(selected);
    const newItems=unitKeys.map((k,idx)=>{
      const u=window.LFC_UNITS.find(x=>x.key===k);
      return {id:Date.now()+idx,process:processName,unit:u.name,level:u.level,year,status:'draft'};
    });
    sessionStorage.setItem('lfoa_pending_assign',JSON.stringify({items:newItems,year,count:unitKeys.length}));
    window.alert('บันทึกและมอบหมายเรียบร้อยแล้ว');
    window.location.href='/learning-form-overview-admin';
  }

  return React.createElement(React.Fragment,null,
    React.createElement(TopBar),
    React.createElement('main',{className:'lfccontent'},
      React.createElement(Breadcrumb),
      React.createElement('div',{className:'lfcpage-head'},
        React.createElement('h1',null,'สร้าง Learning Form'),
        React.createElement('p',null,'กรอกข้อมูลพื้นฐานของกระบวนการ แล้วมอบหมายให้หน่วยงานที่ต้องจัดทำ')
      ),
      React.createElement('div',{className:'card lfc-card'},
        React.createElement('div',{className:'lfc-bar'},'การประเมินและปรับปรุงกระบวนการ'),
        React.createElement('div',{className:'lfc-section'},
          React.createElement('span',{className:'lfc-label'},'ชื่อกระบวนการ',React.createElement('span',{className:'lfc-required'},' *')),
          React.createElement('select',{className:'lfc-select',value:processCode,onChange:e=>setProcessCode(e.target.value)},
            React.createElement('option',{value:''},'เลือกกระบวนการ (Business Architecture Level 1)'),
            window.BA_LEVELS.l1.map(n=>React.createElement('option',{key:n.code,value:n.code},n.code+' · '+n.name))
          )
        ),
        React.createElement('div',{className:'lfc-section'},
          React.createElement('span',{className:'lfc-label'},'ปีงบประมาณ',React.createElement('span',{className:'lfc-required'},' *')),
          React.createElement('select',{className:'lfc-select',value:year,onChange:e=>setYear(e.target.value)},
            window.LFC_YEARS.map(y=>React.createElement('option',{key:y,value:y},'ปี '+y))
          )
        ),
        React.createElement('div',{className:'lfc-section'},
          React.createElement('span',{className:'lfc-label'},'มอบหมายให้หน่วยงานผู้รับผิดชอบ',React.createElement('span',{className:'lfc-required'},' *')),
          React.createElement(UnitCombobox,{units:window.LFC_UNITS,levelLabel:window.LFC_LEVEL_LABEL,selected,onToggle:toggleUnit})
        ),
        React.createElement('div',{className:'lfc-section'},
          React.createElement('div',{className:'lfc-label-row'},
            React.createElement('span',{className:'lfc-label'},'วัตถุประสงค์ของกระบวนการ'),
            React.createElement(Button,{variant:'tertiary',size:'sm',leadingIcon:React.createElement(Icon,{name:'plus',size:14}),onClick:addObjective},'เพิ่มข้อ')
          ),
          objectives.map((o,i)=>React.createElement('div',{key:i,className:'lfc-objective-row'},
            React.createElement('span',{className:'lfc-objective-num'},(i+1)+'.'),
            React.createElement(InputField,{fieldType:'default',size:'md',placeholder:'ระบุวัตถุประสงค์',value:o,onChange:v=>updateObjective(i,v)}),
            objectives.length>1&&React.createElement('button',{className:'lfc-objective-remove',onClick:()=>removeObjective(i)},React.createElement(Icon,{name:'x',size:15}))
          ))
        ),
        React.createElement(PersonRow,{label:'ผู้บันทึกข้อมูล',person:recorder,onChange:setRecorder}),
        React.createElement(PersonRow,{label:'ผู้ตรวจสอบข้อมูล',person:reviewer,onChange:setReviewer}),
        React.createElement(PersonRow,{label:'ผู้อนุมัติข้อมูล',person:approver,onChange:setApprover}),
        React.createElement(ParticipantsRow,{people:participants,onChange:setParticipants})
      ),
      React.createElement('div',{className:'lfc-actions'},
        React.createElement(Button,{variant:'secondary',size:'md',onClick:()=>{window.location.href='/learning-form-overview-admin';}},'ยกเลิก'),
        React.createElement(Button,{variant:'primary',size:'md',onClick:handleSubmit},'บันทึกและมอบหมาย')
      )
    )
  );
}

export default App;
