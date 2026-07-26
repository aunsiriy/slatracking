import { ORG_TREE } from '@/src/shared/org-tree-data.js';

const {Button:SmButton,Badge:SmBadge,InputField:SmInputField,Toggle:SmToggle,Radio:SmRadio,Textarea:SmTextarea}=window.DesignSystem_cbd181;

function monthLabel(k){const idx=parseInt(k.replace('M',''),10)-1;return ['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'][idx]||k;}
function periodDefaults(type){return type==='quarter'?{Q1:'',Q2:'',Q3:'',Q4:''}:{M1:'',M2:'',M3:'',M4:'',M5:'',M6:'',M7:'',M8:'',M9:'',M10:'',M11:'',M12:''};}
function avgOf(values){const nums=Object.values(values).map(v=>parseFloat(v)).filter(v=>!isNaN(v));if(!nums.length)return null;return (nums.reduce((a,b)=>a+b,0)/nums.length).toFixed(1);}

function PeoplePicker({value,onChange}){
  const [q,setQ]=React.useState(value?(window.EMPLOYEES.find(e=>e.id===value)?window.EMPLOYEES.find(e=>e.id===value).name+' ('+value+')':''):'');
  const [open,setOpen]=React.useState(false);
  const matches=window.EMPLOYEES.filter(e=>!q||e.name.includes(q)||e.id.includes(q));
  return React.createElement('div',{className:'people-picker'},
    React.createElement(SmInputField,{fieldType:'default',size:'md',placeholder:'พิมพ์ชื่อหรือรหัสพนักงาน',value:q,onChange:v=>{setQ(v);setOpen(true);onChange('');},onFocus:()=>setOpen(true)}),
    open&&React.createElement('div',{className:'people-picker-menu'},
      matches.length?matches.map(e=>React.createElement('div',{key:e.id,className:'people-picker-item',onMouseDown:()=>{onChange(e.id);setQ(e.name+' ('+e.id+')');setOpen(false);}},
        React.createElement('div',{className:'ppi-name'},e.name,' ',React.createElement('span',{className:'mono'},'('+e.id+')')),
        React.createElement('div',{className:'ppi-meta'},e.position+' · '+e.unit)
      )):React.createElement('div',{className:'people-picker-empty'},'ไม่พบพนักงาน')
    )
  );
}

function collectAllKong(nodes,acc){
  (nodes||[]).forEach(n=>{
    if(n.level==='กอง/ร.ร.ช่าง กฟภ./สนง.')acc.push(n.name);
    if(n.children)collectAllKong(n.children,acc);
  });
  return acc;
}
let ALL_KONG_NAMES=null;
function getAllKongNames(){
  if(!ALL_KONG_NAMES)ALL_KONG_NAMES=collectAllKong(ORG_TREE,[]);
  return ALL_KONG_NAMES;
}

function SlaFormKong({initial,unitName,onClose,onSubmit}){
  const l=window.BA_LEVELS;
  const kongNames=React.useMemo(()=>{
    const names=getAllKongNames();
    return unitName&&!names.includes(unitName)?[unitName,...names]:names;
  },[]);
  const [owner,setOwner]=React.useState(initial?initial.owner:(unitName||(kongNames[0]||'')));
  const [level0,setLevel0]=React.useState(initial?initial.level0:'S1');
  const [level1,setLevel1]=React.useState(initial?initial.level1:'S1.1');
  const [level2,setLevel2]=React.useState(initial?initial.level2:'');
  const [name,setName]=React.useState(initial?initial.name:'');
  const [slaAgreement,setSlaAgreement]=React.useState(initial?initial.slaAgreement:'');
  const [servedBy,setServedBy]=React.useState(initial?initial.servedBy:'');
  const [preparer,setPreparer]=React.useState(initial?initial.preparer:window.CURRENT_USER.employeeId);
  const periodType='month';
  const [values,setValues]=React.useState(initial?initial.values:periodDefaults('month'));
  const [source,setSource]=React.useState(initial?initial.source:'');
  const [status,setStatus]=React.useState(initial?initial.status!=='inactive':true);

  const l1Options=l.l1.filter(x=>x.parent===level0);
  const l2Options=l.l2.filter(x=>x.parent===level1);
  function changeLevel0(v){setLevel0(v);setLevel1('');setLevel2('');}
  function changeLevel1(v){setLevel1(v);setLevel2('');}
  function setVal(k,v){setValues(o=>({...o,[k]:v}));}
  const isValid=owner&&level0&&level1&&preparer.trim()!=='';

  return React.createElement('div',{className:'sla-form-page'},
      React.createElement('div',{className:'sla-form-page-head'},
        React.createElement('button',{type:'button',className:'owner-edit-link sla-back-link',onClick:onClose},React.createElement(Icon,{name:'chevron-left',size:14}),'กลับ'),
        React.createElement('h3',null,initial?'แก้ไข SLA (ระดับกอง)':'เพิ่ม SLA (ระดับกอง)')
      ),
      React.createElement('div',{className:'sla-form-page-body'},
        React.createElement('div',{className:'modal-field'},
          React.createElement('label',{className:'modal-label'},'ชื่อกองที่รายงาน',React.createElement('span',{className:'modal-label-required'},' *')),
          React.createElement('select',{className:'modal-select',value:owner,onChange:e=>setOwner(e.target.value)},
            kongNames.map(n=>React.createElement('option',{key:n,value:n},n))
          )
        ),
        React.createElement(SmTextarea,{label:'ข้อตกลงระดับการให้บริการ (SLA ที่หน่วยงานกำหนด)',placeholder:'ระบุรายละเอียดข้อตกลงระดับการให้บริการ',size:'md',value:slaAgreement,onChange:setSlaAgreement}),
        React.createElement('div',{className:'modal-field'},
          React.createElement('label',{className:'modal-label'},'LEVEL 0 กระบวนการสำคัญ (Key Work Process)',React.createElement('span',{className:'modal-label-required'},' *')),
          React.createElement('select',{className:'modal-select',value:level0,onChange:e=>changeLevel0(e.target.value)},
            React.createElement('option',{value:''},'เลือก Level 0'),
            l.l0.map(o=>React.createElement('option',{key:o.code,value:o.code},o.code+' · '+o.name))
          )
        ),
        React.createElement('div',{className:'modal-field'},
          React.createElement('label',{className:'modal-label'},'Level 1 — กระบวนการทำงาน (Work Process)',React.createElement('span',{className:'modal-label-required'},' *')),
          React.createElement('select',{className:'modal-select',value:level1,disabled:!level0,onChange:e=>changeLevel1(e.target.value)},
            React.createElement('option',{value:''},level0?'เลือก Level 1':'เลือก Level 0 ก่อน'),
            l1Options.map(o=>React.createElement('option',{key:o.code,value:o.code},o.code+' · '+o.name))
          )
        ),
        React.createElement('div',{className:'modal-field'},
          React.createElement('label',{className:'modal-label'},'Level 2 — งาน (Jobs)'),
          React.createElement('select',{className:'modal-select',value:level2,disabled:!level1,onChange:e=>setLevel2(e.target.value)},
            React.createElement('option',{value:''},'เลือก Level 2'),
            l2Options.map(o=>React.createElement('option',{key:o.code,value:o.code},o.code+' · '+o.name))
          )
        ),
        React.createElement(SmInputField,{fieldType:'default',label:'ผู้รับบริการ SLA',placeholder:'เช่น หน่วยงานที่เกี่ยวข้อง, ผู้ใช้งาน, ทุกหน่วยงาน',size:'md',value:servedBy,onChange:setServedBy}),
        React.createElement('div',{className:'modal-field'},
          React.createElement('label',{className:'modal-label'},'ค่าเป้าหมาย ตามผลการรายงาน (ม.ค.–ธ.ค. Free Text)'),
          React.createElement('div',{className:'period-grid','data-period':'month'},
            Object.keys(values).map(k=>React.createElement('div',{key:k,className:'period-cell'},
              React.createElement('span',{className:'period-cell-label'},monthLabel(k)),
              React.createElement('input',{type:'text',className:'period-input',value:values[k],onChange:e=>setVal(k,e.target.value)})
            ))
          )
        ),
        React.createElement(SmInputField,{fieldType:'default',label:'แหล่งข้อมูลตรวจสอบ',placeholder:'เช่น ระบบสารบรรณอิเล็กทรอนิกส์ (ddoc.pea.co.th) / KM-Si',size:'md',value:source,onChange:setSource}),
        React.createElement('div',{className:'modal-field'},
          React.createElement('label',{className:'modal-label'},'รหัสพนักงานผู้กรอกข้อมูล ',React.createElement('span',{className:'modal-label-required'},'*')),
          React.createElement(PeoplePicker,{value:preparer,onChange:setPreparer})
        ),
        React.createElement('div',{className:'modal-field'},
          React.createElement('label',{className:'modal-label'},'สถานะการใช้งาน'),
          React.createElement('div',{className:'modal-field-row'},
            React.createElement(SmToggle,{checked:status,onChange:setStatus}),
            React.createElement('span',{className:'sm-status-text'},status?'เปิดใช้งาน':'ปิดใช้งาน')
          )
        )
      ),
      React.createElement('div',{className:'sla-form-page-footer'},
        React.createElement(SmButton,{variant:'secondary',size:'md',onClick:onClose},'ยกเลิก'),
        React.createElement(SmButton,{variant:'primary',size:'md',isDisabled:!isValid,onClick:()=>isValid&&onSubmit({formType:'kong',level0,level1,level2,name,owner,servedBy,preparer,periodType,values,source,slaAgreement,status:status?'active':'inactive'})},initial?'บันทึก':'เพิ่ม SLA')
      )
  );
}

function SlaFormFai({initial,unitName,onClose,onSubmit}){
  const l=window.BA_LEVELS;
  const [level0,setLevel0]=React.useState(initial?initial.level0:'S1');
  const [level1,setLevel1]=React.useState(initial?initial.level1:'S1.1');
  const [name,setName]=React.useState(initial?initial.name:'');
  const [slaAgreement,setSlaAgreement]=React.useState(initial?initial.slaAgreement:'');
  const [servedBy,setServedBy]=React.useState(initial?initial.servedBy:'');
  const [preparer,setPreparer]=React.useState(initial?initial.preparer:window.CURRENT_USER.employeeId);
  const [periodType,setPeriodType]=React.useState(initial?initial.periodType:'quarter');
  const [values,setValues]=React.useState(initial?initial.values:periodDefaults('quarter'));
  const [source,setSource]=React.useState(initial?initial.source:'');
  const [status,setStatus]=React.useState(initial?initial.status!=='inactive':true);

  const l1Options=l.l1.filter(x=>x.parent===level0);
  function changeLevel0(v){setLevel0(v);setLevel1('');}
  function changePeriodType(v){setPeriodType(v);setValues(periodDefaults(v));}
  function setVal(k,v){setValues(o=>({...o,[k]:v}));}
  const avg=periodType==='quarter'?avgOf(values):null;
  const isValid=level0&&level1&&name.trim()!==''&&preparer.trim()!=='';

  return React.createElement('div',{className:'sla-form-page'},
      React.createElement('div',{className:'sla-form-page-head'},
        React.createElement('button',{type:'button',className:'owner-edit-link sla-back-link',onClick:onClose},React.createElement(Icon,{name:'chevron-left',size:14}),'กลับ'),
        React.createElement('h3',null,initial?'แก้ไข SLA (ระดับฝ่าย)':'เพิ่ม SLA (ระดับฝ่าย)')
      ),
      React.createElement('div',{className:'sla-form-page-body'},
        React.createElement('div',{className:'modal-field'},
          React.createElement('label',{className:'modal-label'},'ชื่อฝ่ายที่รายงาน'),
          React.createElement('div',{className:'owner-readonly'},React.createElement('span',null,unitName))
        ),
        React.createElement(SmInputField,{fieldType:'default',label:React.createElement(React.Fragment,null,'ตัวชี้วัดกระบวนการ (ระดับฝ่าย) ',React.createElement('span',{className:'modal-label-required'},'*')),placeholder:'เช่น ระยะเวลาแก้ไขไฟฟ้าขัดข้อง',size:'md',value:name,onChange:setName}),
        React.createElement(SmTextarea,{label:'ข้อตกลงระดับการให้บริการ (SLA)',placeholder:'ระบุรายละเอียดข้อตกลงระดับการให้บริการ',size:'md',value:slaAgreement,onChange:setSlaAgreement}),
        React.createElement('div',{className:'modal-field'},
          React.createElement('label',{className:'modal-label'},'LEVEL 0 กระบวนการสำคัญ (Key Work Process)',React.createElement('span',{className:'modal-label-required'},' *')),
          React.createElement('select',{className:'modal-select',value:level0,onChange:e=>changeLevel0(e.target.value)},
            React.createElement('option',{value:''},'เลือก Level 0'),
            l.l0.map(o=>React.createElement('option',{key:o.code,value:o.code},o.code+' · '+o.name))
          )
        ),
        React.createElement('div',{className:'modal-field'},
          React.createElement('label',{className:'modal-label'},'Level 1 — กระบวนการทำงาน (Work Process)',React.createElement('span',{className:'modal-label-required'},' *')),
          React.createElement('select',{className:'modal-select',value:level1,disabled:!level0,onChange:e=>setLevel1(e.target.value)},
            React.createElement('option',{value:''},level0?'เลือก Level 1':'เลือก Level 0 ก่อน'),
            l1Options.map(o=>React.createElement('option',{key:o.code,value:o.code},o.code+' · '+o.name))
          )
        ),
        React.createElement(SmInputField,{fieldType:'default',label:'ผู้รับบริการ SLA',placeholder:'เช่น หน่วยงานที่เกี่ยวข้อง, ผู้ใช้งาน, ทุกหน่วยงาน',size:'md',value:servedBy,onChange:setServedBy}),
        React.createElement('div',{className:'modal-field'},
          React.createElement('label',{className:'modal-label'},'ประเภทการรายงาน'),
          React.createElement('div',{className:'period-radio-row'},
            React.createElement(SmRadio,{size:'sm',name:'period-type-fai',value:'quarter',label:'รายไตรมาส',isChecked:periodType==='quarter',onChange:()=>changePeriodType('quarter')}),
            React.createElement(SmRadio,{size:'sm',name:'period-type-fai',value:'month',label:'รายเดือน (12 เดือน)',isChecked:periodType==='month',onChange:()=>changePeriodType('month')})
          )
        ),
        React.createElement('div',{className:'modal-field'},
          React.createElement('label',{className:'modal-label'},'ค่าเป้าหมาย ตามผลการรายงาน ('+(periodType==='quarter'?'Q1–Q4 ตัวเลข':'ม.ค.–ธ.ค. Free Text')+')'),
          React.createElement('div',{className:'period-grid','data-period':periodType},
            Object.keys(values).map(k=>React.createElement('div',{key:k,className:'period-cell'},
              React.createElement('span',{className:'period-cell-label'},periodType==='quarter'?k:monthLabel(k)),
              periodType==='quarter'?React.createElement('input',{type:'number',className:'period-input',value:values[k],onChange:e=>setVal(k,e.target.value)}):React.createElement('input',{type:'text',className:'period-input',value:values[k],onChange:e=>setVal(k,e.target.value)})
            ))
          ),
          periodType==='quarter'&&React.createElement('div',{className:'period-avg'},'ค่าเฉลี่ยอัตโนมัติ: ',React.createElement('strong',null,avg!==null?avg:'—'))
        ),
        React.createElement(SmInputField,{fieldType:'default',label:'แหล่งข้อมูลตรวจสอบ',placeholder:'เช่น ระบบสารบรรณอิเล็กทรอนิกส์ (ddoc.pea.co.th) / KM-Si',size:'md',value:source,onChange:setSource}),
        React.createElement('div',{className:'modal-field'},
          React.createElement('label',{className:'modal-label'},'รหัสพนักงานผู้กรอกข้อมูล ',React.createElement('span',{className:'modal-label-required'},'*')),
          React.createElement(PeoplePicker,{value:preparer,onChange:setPreparer})
        ),
        React.createElement('div',{className:'modal-field'},
          React.createElement('label',{className:'modal-label'},'สถานะการใช้งาน'),
          React.createElement('div',{className:'modal-field-row'},
            React.createElement(SmToggle,{checked:status,onChange:setStatus}),
            React.createElement('span',{className:'sm-status-text'},status?'เปิดใช้งาน':'ปิดใช้งาน')
          )
        )
      ),
      React.createElement('div',{className:'sla-form-page-footer'},
        React.createElement(SmButton,{variant:'secondary',size:'md',onClick:onClose},'ยกเลิก'),
        React.createElement(SmButton,{variant:'primary',size:'md',isDisabled:!isValid,onClick:()=>isValid&&onSubmit({formType:'fai',level0,level1,name,owner:unitName,servedBy,preparer,periodType,values,source,slaAgreement,status:status?'active':'inactive'})},initial?'บันทึก':'เพิ่ม SLA')
      )
  );
}

function SlaCard({item,onEdit,onDelete}){
  const l=window.BA_LEVELS;
  const l0=l.l0.find(x=>x.code===item.level0);
  const l1=l.l1.find(x=>x.code===item.level1);
  const l2=item.level2?l.l2.find(x=>x.code===item.level2):null;
  const avg=avgOf(item.values||{});
  const emp=window.EMPLOYEES.find(e=>e.id===item.preparer);
  return React.createElement('div',{className:'sla-card'},
    React.createElement('div',{className:'sla-card-top'},
      React.createElement('div',{className:'sla-card-breadcrumb'},[
        item.level0&&(item.level0+' · '+(l0?l0.name:'')),
        item.level1&&(item.level1+' · '+(l1?l1.name:'')),
        item.level2&&(item.level2+' · '+(l2?l2.name:''))
      ].filter(Boolean).join(' ▸ ')),
      React.createElement(SmBadge,{label:item.status==='active'?'ใช้งาน':'ปิดใช้งาน',type:'pill-color',color:item.status==='active'?'success':'gray',size:'sm'})
    ),
    !item.level2&&React.createElement('div',null,React.createElement('span',{className:'report-field-label'},'ตัวชี้วัดกระบวนการ'),React.createElement('h4',{className:'sla-card-title'},item.name)),
    item.slaAgreement&&React.createElement('div',null,React.createElement('span',{className:'report-field-label'},'ข้อตกลงการให้บริการ (SLA)'),React.createElement('div',{className:'sla-card-agreement'},item.slaAgreement)),
    React.createElement('div',{className:'sla-card-meta-grid'},
      React.createElement('div',null,React.createElement('span',{className:'report-field-label'},'หน่วยงานรับผิดชอบ'),React.createElement('div',null,item.owner)),
      React.createElement('div',null,React.createElement('span',{className:'report-field-label'},'ผู้กรอกข้อมูล'),React.createElement('div',null,emp?emp.name:item.preparer)),
      React.createElement('div',null,React.createElement('span',{className:'report-field-label'},'ประเภท'),React.createElement('div',null,item.periodType==='quarter'?'รายไตรมาส':'รายเดือน')),
      React.createElement('div',null,React.createElement('span',{className:'report-field-label'},'ค่าเฉลี่ยเป้าหมาย'),React.createElement('div',null,avg!==null?avg:'—')),
      item.servedBy&&React.createElement('div',null,React.createElement('span',{className:'report-field-label'},'ผู้รับบริการ SLA'),React.createElement('div',null,item.servedBy)),
      item.source&&React.createElement('div',null,React.createElement('span',{className:'report-field-label'},'แหล่งข้อมูลตรวจสอบ'),React.createElement('div',null,item.source))
    ),
    React.createElement('div',{className:'sla-card-actions'},
      React.createElement(SmButton,{variant:'tertiary',size:'sm',leadingIcon:React.createElement(Icon,{name:'edit',size:14}),onClick:onEdit},'แก้ไข'),
      React.createElement(SmButton,{variant:'tertiary',size:'sm',leadingIcon:React.createElement(Icon,{name:'trash',size:14}),onClick:onDelete},'ลบ')
    )
  );
}

function hashStr(s){let h=0;for(let i=0;i<s.length;i++){h=(h*31+s.charCodeAt(i))|0;}return Math.abs(h);}
function collectTopLevel(nodes,level,acc){
  (nodes||[]).forEach(n=>{
    if(n.status!=='active')return;
    if(n.level===level){acc.push(n);return;}
    if(n.children)collectTopLevel(n.children,level,acc);
  });
  return acc;
}
function buildFaiKongChildren(node,directOnly){
  const faiNodes=directOnly?(node.children||[]).filter(c=>c.level==='ฝ่าย/สำนัก'&&c.status==='active'):collectTopLevel(node.children,'ฝ่าย/สำนัก',[]);
  return faiNodes.map(fai=>{
    const units=collectTopLevel(fai.children,'กอง/ร.ร.ช่าง กฟภ./สนง.',[]).map(u=>{
      const h=hashStr(u.id);
      return {id:u.id,code:u.code,name:u.name,slaCount:3+(h%13),responsibleCount:h%10<3?0:1+(h%3)};
    });
    return units.length?{id:fai.id,code:fai.code,name:fai.name,children:units}:null;
  }).filter(Boolean);
}
const REGION_PREFIX={'สายงานภาคกลาง':'กฟก','สายงานภาคตะวันออกเฉียงเหนือ':'กฟฉ','สายงานภาคใต้':'กฟต','สายงานภาคเหนือ':'กฟน'};
function buildOrgSlaTree(){
  const root=ORG_TREE[0];
  const flat=[];
  function addSayngan(node,displayName,displayCode,directOnly){
    const kids=buildFaiKongChildren(node,directOnly);
    flat.push({id:node.id,code:displayCode||node.code,name:displayName||node.name,children:kids.length?kids:undefined});
  }
  addSayngan(root,root.name,root.code,true);
  const phakCoordUnits=[];
  (root.children||[]).forEach(top=>{
    if(top.level==='ฝ่าย/สำนัก')return;
    (top.children||[]).forEach(c=>{
      if(c.level==='กอง/ร.ร.ช่าง กฟภ./สนง.'&&c.status==='active'&&c.name.includes('กองประสานงานภาค'))phakCoordUnits.push({id:c.id,code:c.code,name:c.name,slaCount:3+(hashStr(c.id)%13),responsibleCount:hashStr(c.id)%10<3?0:1+(hashStr(c.id)%3)});
    });
  });
  if(phakCoordUnits.length)flat.push({id:'sayngan-phak',code:'ภ',name:'สายงานภาค',children:phakCoordUnits});
  (root.children||[]).forEach(top=>{
    if(top.level==='ฝ่าย/สำนัก')return;
    const khetChildren=collectTopLevel(top.children,'การไฟฟ้าเขต',[]);
    if(khetChildren.length){
      const prefix=REGION_PREFIX[top.name];
      khetChildren.forEach((khet,i)=>{
        const shortCode=prefix?prefix+'.'+(i+1):khet.code;
        addSayngan(khet,top.name+' ('+shortCode+')',shortCode);
      });
    }else{
      addSayngan(top,top.name,top.code);
    }
  });
  return flat.filter(n=>n.children?n.children.length>0:true);
}
function treeSlaSum(node){return node.children?node.children.reduce((a,c)=>a+treeSlaSum(c),0):(node.slaCount||0);}
function treeRespSum(node){return node.children?node.children.reduce((a,c)=>a+treeRespSum(c),0):(node.responsibleCount||0);}
function treeAllAssigned(node){return node.children?node.children.every(treeAllAssigned):node.responsibleCount>0;}
function nodeItemMatch(node,item){return node.children?(!item.level2&&item.owner===node.name):(!!item.level2&&item.owner===node.name);}
function leafNames(node,acc){if(!node.children){acc.push(node.name);return acc;}node.children.forEach(c=>leafNames(c,acc));return acc;}
function realSlaCount(node,items){const names=leafNames(node,[]);return items.filter(it=>names.includes(it.owner)).length;}
function realAssignedUnits(node,items){const names=leafNames(node,[]);const withSla=new Set(items.filter(it=>names.includes(it.owner)).map(it=>it.owner));return withSla.size;}
function treeLeafCount(node){return node.children?node.children.reduce((a,c)=>a+treeLeafCount(c),0):1;}
function countUnassigned(node){
  if(!node.children)return node.responsibleCount===0?1:0;
  return node.children.reduce((a,c)=>a+countUnassigned(c),0);
}
function treeFilter(node,q,statusFilter){
  if(!node.children){
    const matchQ=!q||node.name.includes(q);
    const matchStatus=statusFilter==='all'||(statusFilter==='assigned'?node.responsibleCount>0:node.responsibleCount===0);
    return matchQ&&matchStatus?node:null;
  }
  const selfMatch=!q||node.name.includes(q);
  const kids=node.children.map(c=>treeFilter(c,selfMatch?'':q,statusFilter)).filter(Boolean);
  return kids.length?{...node,children:kids}:null;
}

const LEVEL_LABEL=['สายงาน','ฝ่าย','กอง'];
const LEVEL_BADGE_COLOR=['purple','blue','success'];
function OrgTreeItem({node,depth,selectedId,onSelect}){
  const [open,setOpen]=React.useState(depth<1);
  const hasChildren=node.children&&node.children.length>0;
  const isSelected=selectedId===node.id;
  const selectable=depth>0;
  function handleClick(){
    if(hasChildren)setOpen(!open);
    if(selectable)onSelect(node);
  }
  return React.createElement(React.Fragment,null,
    React.createElement('div',{className:'org-tree-row'+(isSelected?' org-tree-row--selected':'')+(!selectable?' org-tree-row--group':''),style:{paddingLeft:14+depth*20+'px'},onClick:handleClick},
      hasChildren?React.createElement('button',{type:'button',className:'org-tree-caret',onClick:e=>{e.stopPropagation();setOpen(!open);}},React.createElement(Icon,{name:open?'chevron-down':'chevron-right',size:14})):React.createElement('span',{className:'org-tree-caret org-tree-caret--spacer'}),
      React.createElement(SmBadge,{label:LEVEL_LABEL[depth]||'',type:'pill-color',color:LEVEL_BADGE_COLOR[depth]||'gray',size:'sm'}),
      React.createElement('span',{className:'org-tree-name'},node.name)
    ),
    hasChildren&&open&&node.children.map(c=>React.createElement(OrgTreeItem,{key:c.id,node:c,depth:depth+1,selectedId:selectedId,onSelect:onSelect}))
  );
}

function findNodePath(tree,id,path){
  for(const n of tree){
    const p=[...path,n];
    if(n.id===id)return p;
    if(n.children){const r=findNodePath(n.children,id,p);if(r)return r;}
  }
  return null;
}

function SlaOverview({items,onAdd,onEdit,onDelete,onSelectNode}){
  const tree=React.useMemo(buildOrgSlaTree,[]);
  const [treeQ,setTreeQ]=React.useState('');
  const [statusFilter,setStatusFilter]=React.useState('all');
  const [selectedId,setSelectedId]=React.useState(()=>{
    const root=tree.find(n=>n.id===ORG_TREE[0].id);
    const secretariat=root&&root.children&&root.children.find(c=>c.name.includes('เลขานุการองค์กร'));
    return secretariat?secretariat.id:null;
  });
  const totalSayngan=tree.length;
  const totalDept=tree.reduce((a,sa)=>a+sa.children.length,0);
  const totalUnit=tree.reduce((a,sa)=>a+treeLeafCount(sa),0);
  const totalSla=tree.reduce((a,sa)=>a+treeSlaSum(sa),0);
  const unassigned=tree.reduce((a,sa)=>a+countUnassigned(sa),0);
  const filteredTree=tree.map(sa=>treeFilter(sa,treeQ,statusFilter)).filter(Boolean);
  const path=selectedId?findNodePath(tree,selectedId,[]):null;
  const selectedNode=path?path[path.length-1]:null;
  React.useEffect(()=>{if(onSelectNode)onSelectNode(selectedNode);},[selectedNode&&selectedNode.id]);
  return React.createElement(React.Fragment,null,
    React.createElement('div',{className:'sla-stat-grid sla-stat-grid--5'},
      React.createElement('div',{className:'sla-stat-card'},React.createElement('div',{className:'sla-stat-label'},'สายงานทั้งหมด'),React.createElement('div',{className:'sla-stat-value'},totalSayngan)),
      React.createElement('div',{className:'sla-stat-card'},React.createElement('div',{className:'sla-stat-label'},'ฝ่ายทั้งหมด'),React.createElement('div',{className:'sla-stat-value'},totalDept)),
      React.createElement('div',{className:'sla-stat-card'},React.createElement('div',{className:'sla-stat-label'},'กองทั้งหมด'),React.createElement('div',{className:'sla-stat-value'},totalUnit)),
      React.createElement('div',{className:'sla-stat-card'},React.createElement('div',{className:'sla-stat-label'},'SLA ทั้งหมด'),React.createElement('div',{className:'sla-stat-value'},totalSla)),
      React.createElement('div',{className:'sla-stat-card sla-stat-card--warn'},React.createElement('div',{className:'sla-stat-label'},'ยังไม่กำหนดผู้กรอก'),React.createElement('div',{className:'sla-stat-value'},unassigned))
    ),
    React.createElement('div',{className:'sla-master-detail'},
      React.createElement('div',{className:'org-tree-panel'},
        React.createElement(SmInputField,{fieldType:'default',size:'md',placeholder:'ค้นหาชื่อหรือรหัสหน่วยงาน...',value:treeQ,onChange:setTreeQ}),
        React.createElement('div',{className:'org-tree-filter'},
          React.createElement('select',{className:'modal-select',value:statusFilter,onChange:e=>setStatusFilter(e.target.value)},
            React.createElement('option',{value:'all'},'ทุกสถานะ'),
            React.createElement('option',{value:'assigned'},'กำหนดผู้กรอกแล้ว'),
            React.createElement('option',{value:'unassigned'},'ยังไม่กำหนด')
          )
        ),
        React.createElement('div',{className:'org-tree-list'},
          filteredTree.map(sa=>React.createElement(OrgTreeItem,{key:sa.id,node:sa,depth:0,selectedId:selectedId,onSelect:n=>setSelectedId(n.id)}))
        )
      ),
      React.createElement('div',{className:'org-detail-panel'},
        selectedNode?React.createElement(React.Fragment,null,
          React.createElement('div',{className:'org-detail-head'},
            React.createElement('div',null,
              React.createElement('div',{className:'org-detail-breadcrumb'},path.map((n,i)=>React.createElement(React.Fragment,{key:n.id},i>0&&React.createElement('span',{className:'org-detail-breadcrumb-sep'},'▸'),React.createElement('span',null,LEVEL_LABEL[i]+' '+n.name)))),
              React.createElement('h3',{className:'org-detail-title'},selectedNode.name),
              React.createElement('p',{className:'org-detail-subtitle'},items.filter(it=>nodeItemMatch(selectedNode,it)).length+' SLA · ตั้งค่าแล้ว '+(items.some(it=>nodeItemMatch(selectedNode,it))?1:0)+' หน่วยงาน')
            ),
            React.createElement(SmButton,{variant:'primary',size:'md',leadingIcon:React.createElement(Icon,{name:'plus',size:16}),onClick:()=>onAdd(selectedNode,path.length-1)},path.length-1===1?'เพิ่ม SLA ระดับฝ่าย':'เพิ่ม SLA ระดับกอง')
          ),
          React.createElement('div',{className:'sla-card-list'},
            items.filter(item=>nodeItemMatch(selectedNode,item)).map(item=>React.createElement(SlaCard,{key:item.id,item:item,onEdit:()=>onEdit(item),onDelete:()=>onDelete(item)}))
          )
        ):React.createElement('div',{className:'org-detail-empty'},React.createElement(Icon,{name:'building-07',size:28}),React.createElement('p',null,'เลือกสายงาน ฝ่าย หรือกองทางซ้ายเพื่อดูรายละเอียด SLA'))
      )
    )
  );
}

function collectAllUnitNames(nodes,acc){
  (nodes||[]).forEach(n=>{
    if(n.level==='ฝ่าย/สำนัก'||n.level==='กอง/ร.ร.ช่าง กฟภ./สนง.')acc.push(n.name);
    if(n.children)collectAllUnitNames(n.children,acc);
  });
  return acc;
}
let ALL_UNIT_NAMES=null;
function getAllUnitNames(){
  if(!ALL_UNIT_NAMES)ALL_UNIT_NAMES=collectAllUnitNames(ORG_TREE,[]);
  return ALL_UNIT_NAMES;
}

function CopySlaModal({sourceNode,sourceItems,year,onClose,onCopy}){
  const [selected,setSelected]=React.useState(()=>new Set(sourceItems.map(it=>it.id)));
  const [targetUnit,setTargetUnit]=React.useState('');
  const [targetYear,setTargetYear]=React.useState(year);
  const unitNames=React.useMemo(()=>getAllUnitNames(),[]);
  function toggle(id){setSelected(s=>{const n=new Set(s);n.has(id)?n.delete(id):n.add(id);return n;});}
  const isValid=selected.size>0&&targetUnit;
  return React.createElement('div',{className:'modal-overlay',onClick:onClose},
    React.createElement('div',{className:'modal-card copy-sla-modal',onClick:e=>e.stopPropagation()},
      React.createElement('div',{className:'modal-head'},
        React.createElement('h3',null,React.createElement(Icon,{name:'clipboard',size:18,className:'copy-sla-head-icon'}),'คัดลอก SLA'),
        React.createElement(SmButton,{variant:'tertiary',size:'sm',iconOnly:true,className:'modal-close',leadingIcon:React.createElement(Icon,{name:'x',size:18}),onClick:onClose,'aria-label':'ปิด'})
      ),
      React.createElement('p',{className:'copy-sla-source'},'จาก: ',React.createElement('strong',null,sourceNode?sourceNode.name:'-'),' · ปี พ.ศ. '+year),
      React.createElement('div',{className:'modal-body'},
        React.createElement('div',{className:'copy-sla-toolbar'},
          React.createElement('span',{className:'copy-sla-count-label'},'เลือก SLA ที่ต้องการคัดลอก ('+selected.size+'/'+sourceItems.length+')'),
          React.createElement('div',{className:'copy-sla-toolbar-btns'},
            React.createElement(SmButton,{variant:'tertiary',size:'sm',onClick:()=>setSelected(new Set(sourceItems.map(it=>it.id)))},'เลือกทั้งหมด'),
            React.createElement(SmButton,{variant:'tertiary',size:'sm',onClick:()=>setSelected(new Set())},'ยกเลิกทั้งหมด')
          )
        ),
        React.createElement('div',{className:'copy-sla-list'},
          sourceItems.length?sourceItems.map(it=>React.createElement('label',{key:it.id,className:'copy-sla-item'+(selected.has(it.id)?' copy-sla-item--checked':'')},
            React.createElement('input',{type:'checkbox',checked:selected.has(it.id),onChange:()=>toggle(it.id)}),
            React.createElement('div',null,
              React.createElement('div',{className:'copy-sla-item-title'},it.name&&it.name!=='-'?it.name:(it.slaAgreement||'(ไม่มีชื่อ SLA)')),
              it.slaAgreement&&it.name&&it.name!=='-'&&React.createElement('div',{className:'copy-sla-item-sub'},React.createElement(Icon,{name:'clock',size:13}),it.slaAgreement)
            )
          )):React.createElement('div',{className:'copy-sla-empty'},'หน่วยงานนี้ยังไม่มี SLA ให้คัดลอก')
        ),
        React.createElement('div',{className:'copy-sla-targets'},
          React.createElement('div',{className:'modal-field'},
            React.createElement('label',{className:'modal-label'},'หน่วยงานปลายทาง'),
            React.createElement('select',{className:'modal-select',value:targetUnit,onChange:e=>setTargetUnit(e.target.value)},
              React.createElement('option',{value:''},'— เลือกหน่วยงาน —'),
              unitNames.map(n=>React.createElement('option',{key:n,value:n},n))
            )
          ),
          React.createElement('div',{className:'modal-field'},
            React.createElement('label',{className:'modal-label'},'ปีปลายทาง'),
            React.createElement('select',{className:'modal-select',value:targetYear,onChange:e=>setTargetYear(e.target.value)},
              ['2569','2568','2567'].map(y=>React.createElement('option',{key:y,value:y},'พ.ศ. '+y))
            )
          )
        )
      ),
      React.createElement('div',{className:'modal-footer'},
        React.createElement(SmButton,{variant:'secondary',size:'md',onClick:onClose},'ยกเลิก'),
        React.createElement(SmButton,{variant:'primary',size:'md',isDisabled:!isValid,leadingIcon:React.createElement(Icon,{name:'clipboard',size:16}),onClick:()=>isValid&&onCopy(sourceItems.filter(it=>selected.has(it.id)),targetUnit,targetYear)},'คัดลอก '+selected.size+' รายการ')
      )
    )
  );
}

function buildSeedSlaItems(){
    const preparer=window.CURRENT_USER.employeeId;
    const baseSource='ระบบสารบรรณ, ระบบเอกสารอิเล็กทรอนิกส์';
    const baseServed='สายงานดิจิทัลและการสื่อสาร, สายงานบริหารองค์กร, สำนักตรวจสอบภายใน';
    return [
      {id:1,formType:'fai',level0:'E5',level1:'E5.1',level2:'',name:'1. มีการนำเสนอแผนการดำเนินงานของระบบการจัดการองค์กรที่สำคัญตามหลักเกณฑ์การประเมินกระบวนการปฏิบัติงาน และการจัดการ Core Business Enablers ให้คณะกรรมการ กฟภ. ให้ความเห็นชอบ/อนุมัติ',owner:'ฝ่ายเลขานุการองค์กร',servedBy:baseServed,preparer,periodType:'quarter',values:{Q1:'',Q2:'',Q3:'',Q4:''},source:baseSource,slaAgreement:'ความสำเร็จของการนำเสนอแผนการดำเนินงานของระบบจัดการองค์กรที่สำคัญ 4 ระบบงาน ให้คณะกรรมการ กฟภ. ให้ความเห็นชอบ/อนุมัติ ภายในเดือนธันวาคมของทุกปี',status:'active'},
      {id:2,formType:'fai',level0:'E5',level1:'E5.1',level2:'',name:'2. มีการนำเสนอผลการดำเนินงานตามระบบการจัดการองค์กรที่สำคัญตามหลักเกณฑ์การประเมินกระบวนการปฏิบัติงาน และการจัดการ Core Business Enablers ให้คณะกรรมการ กฟภ. ทราบ',owner:'ฝ่ายเลขานุการองค์กร',servedBy:baseServed,preparer,periodType:'quarter',values:{Q1:'',Q2:'',Q3:'',Q4:''},source:baseSource,slaAgreement:'ความสำเร็จของการนำเสนอผลการดำเนินงานตามระบบจัดการองค์กรที่สำคัญ 4 ระบบงาน ให้คณะกรรมการ กฟภ. ทราบ เป็นรายไตรมาส',status:'active'},
      {id:3,formType:'kong',level0:'E5',level1:'E5.1',level2:'E5.1.7',name:'-',owner:'กองกิจการผู้บริหารระดับสูง',preparer,periodType:'quarter',values:{Q1:'',Q2:'',Q3:'',Q4:''},source:baseSource,slaAgreement:'ความสำเร็จของการจัดส่งสรุปประเด็นข้อสั่งการสำคัญ ๆ ของ ผวก. ที่ครบถ้วนถูกต้อง ภายใน 5 วันทำการ',status:'active'},
      {id:4,formType:'kong',level0:'E5',level1:'E5.1',level2:'E5.1.7',name:'-',owner:'กองสนับสนุนคณะกรรมการและผู้บริหารระดับสูง',preparer,periodType:'quarter',values:{Q1:'',Q2:'',Q3:'',Q4:''},source:'ระบบสารบรรณ, PLMS',slaAgreement:'ความสำเร็จของการจัดส่งวาระการประชุมให้คณะกรรมการกิจการสัมพันธ์ กฟภ. ล่วงหน้าก่อนวันประชุมอย่างน้อย 7 วัน',status:'active'},
      {id:5,formType:'kong',level0:'E5',level1:'E5.1',level2:'E5.1.7',name:'-',owner:'กองกิจการคณะกรรมการ',preparer,periodType:'quarter',values:{Q1:'',Q2:'',Q3:'',Q4:''},source:baseSource,slaAgreement:'ความสำเร็จของการจัดส่งรายงานการประชุมที่ถูกต้อง ครบถ้วน ภายใน 15 วัน หลังจากรับรองรายงานการประชุม',status:'active'},
      {id:6,formType:'kong',level0:'E5',level1:'E5.1',level2:'E5.1.9',name:'-',owner:'กองประสานงานภาคเหนือ',servedBy:'กฟน.ในสังกัด (กฟน.1-3)',preparer,periodType:'quarter',values:{Q1:'',Q2:'',Q3:'',Q4:''},source:'ระบบสารบรรณอิเล็กทรอนิกส์ /ระบบ INFOMA ของ กฟภ./ระเบียบ กฟภ. /ระบบ SAP/ระบบ HR number/โปรแกรมจัดทำคำสั่งอัตโนมัติ CUPID',slaAgreement:'ความสำเร็จของการจัดทำคำสั่งย้าย แต่งตั้งและเปลี่ยนตำแหน่งพนักงาน ระดับบังคับบัญชา (เทียบเท่าระดับ 7-8), นักวิชาการระดับ 8-11, ผู้ชำนาญการระดับ 8-9 ของสายงานภาค (น/ฉ/ก/ต ตามสังกัด) และส่งสำเนาคำสั่งที่ ผผก.(น/ฉ/ก/ต) อนุมัติให้ กฟน./กฟฉ./กฟก./กฟต. 1-3 และหน่วยงานที่เกี่ยวข้อง ดำเนินการต่อไป ภายใน 3 วันทำการ นับจากวันออกเลขที่คำสั่ง',status:'active'},
      {id:7,formType:'kong',level0:'E5',level1:'E5.1',level2:'E5.1.9',name:'-',owner:'กองประสานงานภาคตะวันออกเฉียงเหนือ',servedBy:'กฟฉ.ในสังกัด (กฟฉ.1-3)',preparer,periodType:'quarter',values:{Q1:'',Q2:'',Q3:'',Q4:''},source:'ระบบสารบรรณอิเล็กทรอนิกส์ /ระบบ INFOMA ของ กฟภ./ระเบียบ กฟภ. /ระบบ SAP/ระบบ HR number/โปรแกรมจัดทำคำสั่งอัตโนมัติ CUPID',slaAgreement:'ความสำเร็จของการจัดทำคำสั่งย้าย แต่งตั้งและเปลี่ยนตำแหน่งพนักงาน ระดับบังคับบัญชา (เทียบเท่าระดับ 7-8), นักวิชาการระดับ 8-11, ผู้ชำนาญการระดับ 8-9 ของสายงานภาค (น/ฉ/ก/ต ตามสังกัด) และส่งสำเนาคำสั่งที่ ผผก.(น/ฉ/ก/ต) อนุมัติให้ กฟน./กฟฉ./กฟก./กฟต. 1-3 และหน่วยงานที่เกี่ยวข้อง ดำเนินการต่อไป ภายใน 3 วันทำการ นับจากวันออกเลขที่คำสั่ง',status:'active'},
      {id:8,formType:'kong',level0:'E5',level1:'E5.1',level2:'E5.1.9',name:'-',owner:'กองประสานงานภาคกลาง',servedBy:'กฟก.ในสังกัด (กฟก.1-3)',preparer,periodType:'quarter',values:{Q1:'',Q2:'',Q3:'',Q4:''},source:'ระบบสารบรรณอิเล็กทรอนิกส์ /ระบบ INFOMA ของ กฟภ./ระเบียบ กฟภ. /ระบบ SAP/ระบบ HR number/โปรแกรมจัดทำคำสั่งอัตโนมัติ CUPID',slaAgreement:'ความสำเร็จของการจัดทำคำสั่งย้าย แต่งตั้งและเปลี่ยนตำแหน่งพนักงาน ระดับบังคับบัญชา (เทียบเท่าระดับ 7-8), นักวิชาการระดับ 8-11, ผู้ชำนาญการระดับ 8-9 ของสายงานภาค (น/ฉ/ก/ต ตามสังกัด) และส่งสำเนาคำสั่งที่ ผผก.(น/ฉ/ก/ต) อนุมัติให้ กฟน./กฟฉ./กฟก./กฟต. 1-3 และหน่วยงานที่เกี่ยวข้อง ดำเนินการต่อไป ภายใน 3 วันทำการ นับจากวันออกเลขที่คำสั่ง',status:'active'},
      {id:9,formType:'kong',level0:'E5',level1:'E5.1',level2:'E5.1.9',name:'-',owner:'กองประสานงานภาคใต้',servedBy:'กฟต.ในสังกัด (กฟต.1-3)',preparer,periodType:'quarter',values:{Q1:'',Q2:'',Q3:'',Q4:''},source:'ระบบสารบรรณอิเล็กทรอนิกส์ /ระบบ INFOMA ของ กฟภ./ระเบียบ กฟภ. /ระบบ SAP/ระบบ HR number/โปรแกรมจัดทำคำสั่งอัตโนมัติ CUPID',slaAgreement:'ความสำเร็จของการจัดทำคำสั่งย้าย แต่งตั้งและเปลี่ยนตำแหน่งพนักงาน ระดับบังคับบัญชา (เทียบเท่าระดับ 7-8), นักวิชาการระดับ 8-11, ผู้ชำนาญการระดับ 8-9 ของสายงานภาค (น/ฉ/ก/ต ตามสังกัด) และส่งสำเนาคำสั่งที่ ผผก.(น/ฉ/ก/ต) อนุมัติให้ กฟน./กฟฉ./กฟก./กฟต. 1-3 และหน่วยงานที่เกี่ยวข้อง ดำเนินการต่อไป ภายใน 3 วันทำการ นับจากวันออกเลขที่คำสั่ง',status:'active'},
      {id:10,formType:'kong',level0:'E5',level1:'E5.1',level2:'E5.1.7',name:'-',owner:'กองกิจการคณะกรรมการ',preparer,periodType:'quarter',values:{Q1:'',Q2:'',Q3:'',Q4:''},source:baseSource,slaAgreement:'ความสำเร็จของการจัดส่งมติที่ประชุมที่ถูกต้อง ครบถ้วน ภายใน 2 วันทำการ หลัง ผวก. ให้ความเห็นชอบ',status:'active'}
    ];
}

function SlaPanel(){
  const [items,setItems]=React.useState(buildSeedSlaItems);
  const [modal,setModal]=React.useState(null);
  const [confirmDelete,setConfirmDelete]=React.useState(null);
  const [toast,setToast]=React.useState(null);
  const [year,setYear]=React.useState('2569');
  const [currentNode,setCurrentNode]=React.useState(null);
  const [copyModalOpen,setCopyModalOpen]=React.useState(false);

  function handleSubmit(data){
    if(modal.initial){
      setItems(items.map(it=>it.id===modal.initial.id?{...it,...data}:it));
      setToast('บันทึก SLA เรียบร้อยแล้ว');
    }else{
      setItems([{id:Date.now(),...data},...items]);
      setToast('เพิ่ม SLA เรียบร้อยแล้ว');
    }
    setModal(null);
  }

  function handleCopy(copiedItems,targetUnit,targetYear){
    const now=Date.now();
    const newItems=copiedItems.map((it,i)=>({...it,id:now+i,owner:targetUnit,status:'active'}));
    setItems([...newItems,...items]);
    setCopyModalOpen(false);
    setToast('คัดลอก SLA '+newItems.length+' รายการเรียบร้อยแล้ว');
  }

  return React.createElement('div',{className:'card panel'},
    !modal&&React.createElement('div',{className:'panel-head'},
      React.createElement('div',null,
        React.createElement('h2',null,'ตั้งค่า SLA Master'),
        React.createElement('p',null,'กำหนด KPI/SLA ต้นแบบ ผูกกับโครงสร้าง BA และค่าเป้าหมายรายงวด')
      ),
      React.createElement('div',{className:'panel-head-actions'},
        React.createElement('select',{className:'modal-select year-select',value:year,onChange:e=>setYear(e.target.value)},
          ['2569','2568','2567'].map(y=>React.createElement('option',{key:y,value:y},'ปี '+y))
        ),
        React.createElement(SmButton,{variant:'secondary',size:'md',leadingIcon:React.createElement(Icon,{name:'download',size:16})},'Export SLA'),
        React.createElement(SmButton,{variant:'secondary',size:'md',leadingIcon:React.createElement(Icon,{name:'upload-cloud-01',size:16})},'Import Excel'),
        React.createElement(SmButton,{variant:'secondary',size:'md',isDisabled:!currentNode,leadingIcon:React.createElement(Icon,{name:'clipboard',size:16}),onClick:()=>setCopyModalOpen(true)},'คัดลอก SLA')
      )
    ),
    modal?(modal.formType==='fai'?React.createElement(SlaFormFai,{initial:modal.initial,unitName:modal.unitName,onClose:()=>setModal(null),onSubmit:handleSubmit}):React.createElement(SlaFormKong,{initial:modal.initial,unitName:modal.unitName,onClose:()=>setModal(null),onSubmit:handleSubmit})):
    React.createElement(SlaOverview,{items:items,onAdd:(node,levelIdx)=>setModal({initial:null,formType:levelIdx===1?'fai':'kong',unitName:node.name}),onEdit:item=>setModal({initial:item,formType:item.formType==='fai'?'fai':'kong',unitName:item.owner}),onDelete:item=>setConfirmDelete(item),onSelectNode:setCurrentNode}),
    copyModalOpen&&currentNode&&React.createElement(CopySlaModal,{sourceNode:currentNode,sourceItems:items.filter(it=>nodeItemMatch(currentNode,it)),year:year,onClose:()=>setCopyModalOpen(false),onCopy:handleCopy}),
    confirmDelete&&React.createElement('div',{className:'modal-overlay',onClick:()=>setConfirmDelete(null)},
      React.createElement('div',{className:'modal-card confirm-modal',onClick:e=>e.stopPropagation()},
        React.createElement('div',{className:'modal-head'},
          React.createElement('h3',null,React.createElement(Icon,{name:'alert-triangle',size:18,className:'delete-warn-icon-inline'}),'ยืนยันการลบ SLA'),
          React.createElement(SmButton,{variant:'tertiary',size:'sm',iconOnly:true,className:'modal-close',leadingIcon:React.createElement(Icon,{name:'x',size:18}),onClick:()=>setConfirmDelete(null),'aria-label':'ปิด'})
        ),
        React.createElement('div',{className:'modal-body'},
          React.createElement('p',{className:'delete-warn-text'},'กำลังจะลบ "'+confirmDelete.name+'"'),
          React.createElement('p',{className:'delete-warn-sub'},'การกระทำนี้ไม่สามารถย้อนกลับได้')
        ),
        React.createElement('div',{className:'modal-footer'},
          React.createElement(SmButton,{variant:'secondary',size:'md',onClick:()=>setConfirmDelete(null)},'ยกเลิก'),
          React.createElement(SmButton,{variant:'primary',size:'md',className:'btn-danger',onClick:()=>{setItems(items.filter(i=>i.id!==confirmDelete.id));setConfirmDelete(null);setToast('ลบ SLA เรียบร้อยแล้ว');}},'ลบ')
        )
      )
    ),
    toast&&React.createElement(Toast,{message:toast,onDone:()=>setToast(null)})
  );
}

Object.assign(window,{SlaPanel,buildSeedSlaItems,buildOrgSlaTree,nodeItemMatch});
