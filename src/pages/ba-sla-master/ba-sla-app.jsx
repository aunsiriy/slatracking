const {Button,Badge,Avatar,InputField,Radio,Toggle,FeaturedIcon}=window.DesignSystem_cbd181;

const TABS=[
{key:'org',icon:'building',label:'ตั้งค่าหน่วยงาน'},
{key:'arch',icon:'layout-grid',label:'ตั้งค่า Business Architecture'},
{key:'sla',icon:'file-text',label:'ตั้งค่า SLA Master'},
{key:'users',icon:'users',label:'จัดการผู้ใช้งานระบบ'},
{key:'kpi',icon:'trending-up',label:'วิเคราะห์ภาระงานและผลการดำเนินงาน KPI'}
];

function TopBar(){
  return React.createElement('header',{className:'ttb'},
    React.createElement('div',{className:'ttb-left'},
      React.createElement('a',{href:'index.html',className:'back-link'},React.createElement(Icon,{name:'chevron-right',size:16,style:{transform:'rotate(180deg)'}}),'กลับหน้าหลัก'),
      React.createElement('span',{className:'ttb-divider'}),
      React.createElement('img',{src:'sla-logo.svg',alt:'SLA',className:'ttb-logo'}),
      React.createElement('span',{className:'ttb-title'},'BA & SLA Master')
    ),
    React.createElement('div',{className:'ttb-right'},
      React.createElement(Button,{variant:'tertiary',size:'sm',iconOnly:true,leadingIcon:React.createElement(Icon,{name:'bell',size:19}),'aria-label':'การแจ้งเตือน'}),
      React.createElement(Avatar,{variant:'text',size:'sm',text:'สด'})
    )
  );
}

function TopTabs({active,setActive}){
  return React.createElement('div',{className:'top-tabs-wrap'},
    React.createElement('nav',{className:'top-tabs'},
      TABS.map(t=>React.createElement(Button,{key:t.key,variant:'tertiary',size:'md',className:'top-tab'+(active===t.key?' is-active':''),leadingIcon:React.createElement(Icon,{name:t.icon,size:18}),onClick:()=>setActive(t.key)},t.label))
    )
  );
}

const LEVEL_PALETTE=['brand','blue','success','warning','gray','error'];
const levelColorCache={};
function levelColor(level){
  if(levelColorCache[level])return levelColorCache[level];
  let h=0;for(let i=0;i<level.length;i++)h=(h*31+level.charCodeAt(i))>>>0;
  const c=LEVEL_PALETTE[h%LEVEL_PALETTE.length];
  levelColorCache[level]=c;
  return c;
}

function countNodes(nodes){
  let total=0,maxDepth=0;
  const byLevel={'สายงาน':0,'ฝ่าย':0,'กอง':0};
  function bucket(level){
    if(level==='สายงาน'||level==='กลุ่มสนับสนุน'||level==='ผู้ช่วยผู้ว่าการ'||level==='กลุ่มธุรกิจจำหน่าย บริการ'||level==='กลุ่มธุรกิจลงทุน'||level==='กลุ่มยุทธศาสตร์พัฒนา'||level==='กลุ่มเครือข่ายและบริการ')return 'สายงาน';
    if(level==='ฝ่าย/สำนัก')return 'ฝ่าย';
    if(level==='กอง/ร.ร.ช่าง กฟภ./สนง.'||level==='แผนก/ส่วนงาน')return 'กอง';
    return null;
  }
  function walk(list,d){
    list.forEach(n=>{total++;if(d>maxDepth)maxDepth=d;const b=bucket(n.level);if(b)byLevel[b]++;if(n.children&&n.children.length)walk(n.children,d+1);});
  }
  walk(nodes,0);
  return {total,maxDepth,byLevel};
}

function filterTree(nodes,search){
  const s=search.trim().toLowerCase();
  if(!s)return nodes;
  function walk(list){
    return list.reduce((acc,n)=>{
      const children=n.children?walk(n.children):[];
      const selfMatch=n.name.toLowerCase().includes(s)||n.code.toLowerCase().includes(s)||n.level.toLowerCase().includes(s);
      if(selfMatch||children.length){
        acc.push({...n,children,_forceOpen:true});
      }
      return acc;
    },[]);
  }
  return walk(nodes);
}

function OrgTreeNode({node,depth,allOpen,onEdit,onDelete}){
  const [open,setOpen]=React.useState(depth<1);
  React.useEffect(()=>{if(node._forceOpen)setOpen(true);},[node._forceOpen]);
  React.useEffect(()=>{if(allOpen!=null)setOpen(allOpen);},[allOpen]);
  const hasChildren=node.children&&node.children.length>0;
  return React.createElement('div',{className:'org-node'},
    React.createElement('div',{className:'org-row',style:{paddingLeft:depth*24}},
      hasChildren?React.createElement(Button,{variant:'tertiary',size:'sm',iconOnly:true,className:'org-caret',onClick:()=>setOpen(v=>!v),leadingIcon:React.createElement(Icon,{name:open?'chevron-down':'chevron-right',size:15})}):React.createElement('span',{className:'org-caret-spacer'}),
      React.createElement(Badge,{label:node.level,type:'pill-color',color:levelColor(node.level),size:'sm'}),
      node.code&&React.createElement('span',{className:'org-code'},node.code),
      React.createElement('span',{className:'org-name'},node.name),
      React.createElement(Badge,{label:node.status==='active'?'ใช้งาน':'ปิดใช้งาน',type:'pill-color',color:node.status==='active'?'success':'gray',size:'sm'}),
      React.createElement('div',{className:'org-actions'},
        React.createElement(Button,{variant:'link-color',size:'sm',leadingIcon:React.createElement(Icon,{name:'edit',size:14}),onClick:()=>onEdit(node)},'แก้ไข'),
        React.createElement(Button,{variant:'link-color',size:'sm',className:'org-delete',leadingIcon:React.createElement(Icon,{name:'trash',size:14}),onClick:()=>onDelete(node)},'ลบ')
      )
    ),
    hasChildren&&open&&React.createElement('div',{className:'org-children'},
      node.children.map(c=>React.createElement(OrgTreeNode,{key:c.id,node:c,depth:depth+1,allOpen,onEdit,onDelete}))
    )
  );
}

function collectByLevel(nodes,levelName,acc){
  nodes.forEach(n=>{if(n.level===levelName)acc.push(n);if(n.children&&n.children.length)collectByLevel(n.children,levelName,acc);});
  return acc;
}
function getDivisionOptions(){
  const root=window.ORG_TREE[0];
  return root&&root.children?Array.from(new Set(root.children.map(n=>n.name))):[];
}
function getFlorOptions(){
  return Array.from(new Set(collectByLevel(window.ORG_TREE,'ฝ่าย/สำนัก',[]).map(n=>n.name)));
}

function Toast({message,onDone}){
  React.useEffect(()=>{const t=setTimeout(onDone,2600);return ()=>clearTimeout(t);},[]);
  return React.createElement('div',{className:'toast'},React.createElement(Icon,{name:'check',size:16}),message);
}

function AddOrgModal({onClose,onSubmit}){
  const [level,setLevel]=React.useState('สายงาน');
  const [parent,setParent]=React.useState('');
  const [code,setCode]=React.useState('');
  const [name,setName]=React.useState('');
  const [group,setGroup]=React.useState('');
  const [status,setStatus]=React.useState('active');
  const GROUP_OPTIONS=['กลุ่มสนับสนุน','ผู้ช่วยผู้ว่าการ','ฝ่าย/สำนัก','กอง/ร.ร.ช่าง กฟภ./สนง.','แผนก/ส่วนงาน'];
  const divisionOptions=React.useMemo(getDivisionOptions,[]);
  const florOptions=React.useMemo(getFlorOptions,[]);
  const LEVEL_LABELS={'สายงาน':{nameLabel:'ชื่อสายงาน',codePlaceholder:'เช่น กพอ.',submitLabel:'เพิ่มสายงาน',title:'เพิ่มสายงานใหม่'},
    'ฝ่าย':{nameLabel:'ชื่อฝ่าย',codePlaceholder:'เช่น ฝบว.',submitLabel:'เพิ่มฝ่าย',title:'เพิ่มฝ่ายใหม่'},
    'กอง':{nameLabel:'ชื่อกอง',codePlaceholder:'เช่น กสต.',submitLabel:'เพิ่มกอง',title:'เพิ่มกองใหม่'}
  };
  const cfg=LEVEL_LABELS[level];
  function handleLevelChange(l){setLevel(l);setParent('');}
  function handleSubmit(){onSubmit(cfg.submitLabel.replace('เพิ่ม','เพิ่ม')+'เรียบร้อยแล้ว');}
  return React.createElement('div',{className:'modal-overlay',onClick:onClose},
    React.createElement('div',{className:'modal-card',onClick:e=>e.stopPropagation()},
      React.createElement('div',{className:'modal-head'},
        React.createElement('h3',null,cfg.title),
        React.createElement(Button,{variant:'tertiary',size:'sm',iconOnly:true,className:'modal-close',leadingIcon:React.createElement(Icon,{name:'x',size:18}),onClick:onClose,'aria-label':'ปิด'})
      ),
      React.createElement('div',{className:'modal-body'},
        React.createElement('div',{className:'modal-field'},
          React.createElement('label',{className:'modal-label'},'ระดับ'),
          React.createElement('div',{className:'modal-radio-row'},
            ['สายงาน','ฝ่าย','กอง'].map(l=>React.createElement(Radio,{key:l,size:'sm',name:'org-level',value:l,label:l,isChecked:level===l,onChange:()=>handleLevelChange(l)}))
          )
        ),
        level==='ฝ่าย'&&React.createElement('div',{className:'modal-field'},
          React.createElement('label',{className:'modal-label'},'สายงานที่สังกัด'),
          React.createElement('select',{className:'modal-select',value:parent,onChange:e=>setParent(e.target.value)},
            React.createElement('option',{value:''},'เลือกสายงาน...'),
            divisionOptions.map(o=>React.createElement('option',{key:o,value:o},o))
          )
        ),
        level==='กอง'&&React.createElement('div',{className:'modal-field'},
          React.createElement('label',{className:'modal-label'},'ฝ่ายหรือสายงานที่สังกัด'),
          React.createElement('select',{className:'modal-select',value:parent,onChange:e=>setParent(e.target.value)},
            React.createElement('option',{value:''},'เลือกหน่วยงาน...'),
            florOptions.map(o=>React.createElement('option',{key:o,value:o},o))
          )
        ),
        React.createElement('div',{className:'modal-field'},
          React.createElement('label',{className:'modal-label'},'กลุ่ม'),
          React.createElement('select',{className:'modal-select',value:group,onChange:e=>setGroup(e.target.value)},
            React.createElement('option',{value:''},'เลือกกลุ่ม...'),
            GROUP_OPTIONS.map(o=>React.createElement('option',{key:o,value:o},o))
          )
        ),
        React.createElement(InputField,{fieldType:'default',label:'ตัวย่อ',placeholder:cfg.codePlaceholder,size:'md',value:code,onChange:setCode}),
        React.createElement(InputField,{fieldType:'default',label:cfg.nameLabel,placeholder:'ระบุชื่อเต็มของหน่วยงาน',size:'md',value:name,onChange:setName}),
        React.createElement('div',{className:'modal-field'},
          React.createElement(Toggle,{size:'md',label:'สถานะใช้งาน',isChecked:status==='active',onChange:checked=>setStatus(checked?'active':'inactive')})
        )
      ),
      React.createElement('div',{className:'modal-footer'},
        React.createElement(Button,{variant:'secondary',size:'md',onClick:onClose},'ยกเลิก'),
        React.createElement(Button,{variant:'primary',size:'md',onClick:handleSubmit},cfg.submitLabel)
      )
    )
  );
}

function EditOrgModal({node,onClose,onSubmit}){
  const [code,setCode]=React.useState(node.code||'');
  const [name,setName]=React.useState(node.name);
  const [status,setStatus]=React.useState(node.status);
  return React.createElement('div',{className:'modal-overlay',onClick:onClose},
    React.createElement('div',{className:'modal-card',onClick:e=>e.stopPropagation()},
      React.createElement('div',{className:'modal-head'},
        React.createElement('h3',null,'แก้ไขหน่วยงาน'),
        React.createElement(Button,{variant:'tertiary',size:'sm',iconOnly:true,className:'modal-close',leadingIcon:React.createElement(Icon,{name:'x',size:18}),onClick:onClose,'aria-label':'ปิด'})
      ),
      React.createElement('div',{className:'modal-body'},
        React.createElement('div',{className:'modal-field'},
          React.createElement('label',{className:'modal-label'},'ระดับ'),
          React.createElement(Badge,{label:node.level,type:'pill-color',color:levelColor(node.level),size:'sm'})
        ),
        React.createElement(InputField,{fieldType:'default',label:'ตัวย่อ',size:'md',value:code,onChange:setCode}),
        React.createElement(InputField,{fieldType:'default',label:'ชื่อหน่วยงาน',size:'md',value:name,onChange:setName}),
        React.createElement('div',{className:'modal-field'},
          React.createElement(Toggle,{size:'md',label:'สถานะใช้งาน',isChecked:status==='active',onChange:checked=>setStatus(checked?'active':'inactive')})
        )
      ),
      React.createElement('div',{className:'modal-footer'},
        React.createElement(Button,{variant:'secondary',size:'md',onClick:onClose},'ยกเลิก'),
        React.createElement(Button,{variant:'primary',size:'md',onClick:()=>onSubmit('บันทึกเรียบร้อยแล้ว')},'บันทึก')
      )
    )
  );
}
function DeleteOrgModal({node,onClose,onConfirm}){
  return React.createElement('div',{className:'modal-overlay',onClick:onClose},
    React.createElement('div',{className:'modal-card modal-card--sm',onClick:e=>e.stopPropagation()},
      React.createElement('div',{className:'modal-head'},
        React.createElement('h3',null,React.createElement(Icon,{name:'alert-triangle',size:18,className:'delete-warn-icon-inline'}),'ยืนยันการลบหน่วยงาน'),
        React.createElement(Button,{variant:'tertiary',size:'sm',iconOnly:true,className:'modal-close',leadingIcon:React.createElement(Icon,{name:'x',size:18}),onClick:onClose,'aria-label':'ปิด'})
      ),
      React.createElement('div',{className:'modal-body'},
        React.createElement('p',{className:'delete-warn-text'},
          'คุณกำลังจะลบ ',
          React.createElement(Badge,{label:node.level,type:'pill-color',color:levelColor(node.level),size:'sm'}),
          ' ',
          React.createElement('strong',null,node.name),
          node.children&&node.children.length>0?' และหน่วยงานย่อยอีก '+node.children.length+' หน่วยงานภายใต้':''
        ),
        React.createElement('p',{className:'delete-warn-sub'},'การกระทำนี้ไม่สามารถย้อนกลับได้')
      ),
      React.createElement('div',{className:'modal-footer'},
        React.createElement(Button,{variant:'secondary',size:'md',onClick:onClose},'ยกเลิก'),
        React.createElement(Button,{variant:'primary',size:'md',className:'btn-danger',onClick:()=>onConfirm('ลบหน่วยงานเรียบร้อยแล้ว')},'ลบหน่วยงาน')
      )
    )
  );
}
function OrgPanel(){
  const [year,setYear]=React.useState('2569');
  const [search,setSearch]=React.useState('');
  const [modalOpen,setModalOpen]=React.useState(false);
  const [editingNode,setEditingNode]=React.useState(null);
  const [deletingNode,setDeletingNode]=React.useState(null);
  const [allOpen,setAllOpen]=React.useState(null);
  const [toast,setToast]=React.useState(null);
  const stats=React.useMemo(()=>countNodes(window.ORG_TREE),[]);
  const filtered=React.useMemo(()=>filterTree(window.ORG_TREE,search),[search]);
  function handleAdded(message){setModalOpen(false);setToast(message);}
  function handleEdited(message){setEditingNode(null);setToast(message);}
  function handleDeleted(message){setDeletingNode(null);setToast(message);}
  return React.createElement('div',{className:'card panel'},
    React.createElement('div',{className:'panel-head'},
      React.createElement('div',null,
        React.createElement('h2',null,'ตั้งค่าหน่วยงาน'),
        React.createElement('p',null,'โครงสร้างหน่วยงานเรียงลำดับตามลำดับชั้นขององค์กร ดึงข้อมูลจากฐานข้อมูลองค์กร — เพิ่ม/แก้ไข/ลบได้ทุกลำดับชั้น')
      ),
      React.createElement('div',{className:'panel-head-actions'},
        React.createElement('select',{className:'year-select',value:year,onChange:e=>setYear(e.target.value)},
          ['2569','2568','2567'].map(y=>React.createElement('option',{key:y,value:y},'ปี '+y))
        ),
        React.createElement(Button,{variant:'primary',size:'md',leadingIcon:React.createElement(Icon,{name:'plus',size:16}),onClick:()=>setModalOpen(true)},'เพิ่มหน่วยงานใหม่')
      )
    ),
    React.createElement('div',{className:'org-toolbar'},
      React.createElement('div',{className:'org-search'},
        React.createElement(InputField,{fieldType:'default',placeholder:'ค้นหาหน่วยงาน...',size:'md',value:search,onChange:setSearch,leadingIcon:React.createElement(Icon,{name:'search',size:17})})
      ),
      React.createElement('div',{className:'org-summary'},
        React.createElement(Badge,{label:'หน่วยงานทั้งหมด '+stats.total,type:'pill-color',color:'brand',size:'md'}),
        React.createElement(Badge,{label:'สายงาน '+stats.byLevel['สายงาน'],type:'pill-color',color:'blue',size:'md'}),
        React.createElement(Badge,{label:'ฝ่าย '+stats.byLevel['ฝ่าย'],type:'pill-color',color:'blue',size:'md'}),
        React.createElement(Badge,{label:'กอง '+stats.byLevel['กอง'],type:'pill-color',color:'blue',size:'md'}),
        React.createElement(Badge,{label:'ลึกสุด '+(stats.maxDepth+1)+' ชั้น',type:'pill-color',color:'gray',size:'md'})
      ),
      React.createElement('div',{className:'org-expand-actions'},
        React.createElement(Button,{variant:'secondary',size:'sm',onClick:()=>setAllOpen(o=>o===true?null:true)},'ขยายทั้งหมด'),
        React.createElement(Button,{variant:'secondary',size:'sm',onClick:()=>setAllOpen(o=>o===false?null:false)},'ยุบทั้งหมด')
      )
    ),
    React.createElement('div',{className:'org-tree'},
      filtered.length?filtered.map(n=>React.createElement(OrgTreeNode,{key:n.id,node:n,depth:0,allOpen,onEdit:setEditingNode,onDelete:setDeletingNode})):
      React.createElement('div',{className:'org-empty'},'ไม่พบหน่วยงานที่ตรงกับเงื่อนไข')
    ),
    modalOpen&&React.createElement(AddOrgModal,{onClose:()=>setModalOpen(false),onSubmit:handleAdded}),
    editingNode&&React.createElement(EditOrgModal,{node:editingNode,onClose:()=>setEditingNode(null),onSubmit:handleEdited}),
    deletingNode&&React.createElement(DeleteOrgModal,{node:deletingNode,onClose:()=>setDeletingNode(null),onConfirm:handleDeleted}),
    toast&&React.createElement(Toast,{message:toast,onDone:()=>setToast(null)})
  );
}

function cloneTree(nodes){return JSON.parse(JSON.stringify(nodes));}
function treeUpdate(nodes,id,updater){
  return nodes.map(n=>n.id===id?updater(n):(n.children?{...n,children:treeUpdate(n.children,id,updater)}:n));
}
function treeDelete(nodes,id){
  return nodes.filter(n=>n.id!==id).map(n=>n.children?{...n,children:treeDelete(n.children,id)}:n);
}
function treeInsert(nodes,parentId,child){
  return nodes.map(n=>{
    if(n.id===parentId)return {...n,children:[...(n.children||[]),child]};
    if(n.children)return {...n,children:treeInsert(n.children,parentId,child)};
    return n;
  });
}
function countChildren(node){return node.children?node.children.length:0;}
function ownUnitCount(node){
  if(!node.unit)return 0;
  return new Set(node.unit.split(',').map(s=>s.trim()).filter(Boolean)).size;
}
function unitCount(node){
  const units=new Set();
  (node.children||[]).forEach(c=>{if(c.unit)c.unit.split(',').forEach(u=>units.add(u.trim()));});
  return units.size;
}
function unitNames(node){
  const units=new Set();
  if(node.unit)node.unit.split(',').forEach(u=>units.add(u.trim()));
  (node.children||[]).forEach(c=>{if(c.unit)c.unit.split(',').forEach(u=>units.add(u.trim()));});
  return Array.from(units).join(', ');
}
function archSearch(children,term){
  const q=term.trim().toLowerCase();
  if(!q)return [];
  const results=[];
  children.forEach(l0=>{
    if((l0.code+' '+l0.name).toLowerCase().includes(q))results.push({level:0,node:l0,l0});
    (l0.children||[]).forEach(l1=>{
      if((l1.code+' '+l1.name).toLowerCase().includes(q))results.push({level:1,node:l1,l0});
      (l1.children||[]).forEach(l2=>{
        if((l2.code+' '+l2.name).toLowerCase().includes(q))results.push({level:2,node:l2,l0,l1});
      });
    });
  });
  return results;
}
function ArchSearchResults({results,onJump}){
  if(!results.length)return React.createElement('div',{className:'arch-empty'},'ไม่พบผลลัพธ์ที่ตรงกับคำค้นหา');
  return React.createElement('div',{className:'arch-search-results'},
    results.map((r,i)=>React.createElement('button',{key:i,className:'arch-search-row',onClick:()=>onJump(r)},
      React.createElement(Badge,{label:r.level===0?'LEVEL 0':r.level===1?'L1':'L2',type:'pill-color',color:ARCH_LEVEL_COLOR[r.level],size:'sm'}),
      React.createElement('span',{className:'arch-code'},r.node.code),
      React.createElement('span',{className:'arch-name'},r.node.name),
      React.createElement('span',{className:'arch-search-path'},r.level>0&&(r.l0.code+(r.level===2?' › '+r.l1.code:'')))
    ))
  );
}

const ARCH_LEVEL_COLOR={0:'purple',1:'blue',2:'warning'};
const ARCH_LEVEL_HINT={0:'กระบวนการทำงานที่สำคัญ - ระดับสายงานเป็นผู้รับผิดชอบ',1:'กระบวนการทำงาน (Work Process) ระดับฝ่ายเป็นผู้รับผิดชอบ',2:'งาน (Job) · กอง รับผิดชอบ'};

function ArchNodeModal({title,groupLabel,levelLabel,initial,onClose,onSubmit,codeExample}){
  const [code,setCode]=React.useState(initial?initial.code:'');
  const [name,setName]=React.useState(initial?initial.name:'');
  const [unitList,setUnitList]=React.useState(initial&&initial.unit?initial.unit.split(',').map(s=>s.trim()).filter(Boolean):[]);
  const [status,setStatus]=React.useState(initial?initial.status:'active');
  const [owners,setOwners]=React.useState(initial?(initial.owners||[]):[]);
  const divisionOptions=React.useMemo(getDivisionOptions,[]);
  const unitOptions=React.useMemo(()=>levelLabel==='LEVEL 1 (Work Process)'?getFlorOptions():Array.from(new Set(collectByLevel(window.ORG_TREE,'กอง/ร.ร.ช่าง กฟภ./สนง.',[]).map(n=>n.name))),[levelLabel]);
  function toggleOwner(name){setOwners(o=>o.includes(name)?o.filter(x=>x!==name):[...o,name]);}
  function toggleUnit(name){setUnitList(o=>o.includes(name)?o.filter(x=>x!==name):[...o,name]);}
  const isValid=code.trim()!==''&&name.trim()!==''&&(levelLabel==='LEVEL 0'?owners.length>0:unitList.length>0);
  return React.createElement('div',{className:'modal-overlay',onClick:onClose},
    React.createElement('div',{className:'modal-card',onClick:e=>e.stopPropagation()},
      React.createElement('div',{className:'modal-head'},
        React.createElement('h3',null,title),
        React.createElement(Button,{variant:'tertiary',size:'sm',iconOnly:true,className:'modal-close',leadingIcon:React.createElement(Icon,{name:'x',size:18}),onClick:onClose,'aria-label':'ปิด'})
      ),
      React.createElement('div',{className:'modal-body'},
        React.createElement('div',{className:'modal-field'},
          React.createElement('label',{className:'modal-label'},'อยู่ในกลุ่ม / ระดับ'),
          React.createElement('div',{className:'modal-field-static'},groupLabel+' — '+levelLabel)
        ),
        React.createElement(InputField,{fieldType:'default',label:React.createElement(React.Fragment,null,'รหัส (Code) ',React.createElement('span',{className:'modal-label-required'},'*')),placeholder:codeExample||'เช่น S1, S2',size:'md',value:code,onChange:setCode}),
        React.createElement(InputField,{fieldType:'default',label:React.createElement(React.Fragment,null,'ชื่อ (Name) ',React.createElement('span',{className:'modal-label-required'},'*')),placeholder:'ระบุชื่อกระบวนการ/งาน',size:'md',value:name,onChange:setName}),
        levelLabel!=='LEVEL 0'&&React.createElement('div',{className:'modal-field'},
          React.createElement('label',{className:'modal-label'},'หน่วยงานรับผิดชอบ (เลือกได้หลาย'+(levelLabel==='LEVEL 1 (Work Process)'?'ฝ่าย':'กอง')+')',React.createElement('span',{className:'modal-label-required'},' *')),
          unitList.length>0&&React.createElement('div',{className:'modal-selected-chips'},
            unitList.map(o=>React.createElement('span',{key:o,className:'modal-selected-chip'},o,React.createElement('button',{onClick:()=>toggleUnit(o)},React.createElement(Icon,{name:'x',size:12}))))
          ),
          React.createElement('div',{className:'modal-owner-list'},
            unitOptions.map(o=>React.createElement('label',{key:o,className:'modal-owner-row'},
              React.createElement('input',{type:'checkbox',checked:unitList.includes(o),onChange:()=>toggleUnit(o)}),o
            ))
          )
        ),
        levelLabel==='LEVEL 0'&&React.createElement('div',{className:'modal-field'},
          React.createElement('label',{className:'modal-label'},'สายงานที่รับผิดชอบ (เลือกได้หลายรายการ)',React.createElement('span',{className:'modal-label-required'},' *')),
          owners.length>0&&React.createElement('div',{className:'modal-selected-chips'},
            owners.map(o=>React.createElement('span',{key:o,className:'modal-selected-chip'},o,React.createElement('button',{onClick:()=>toggleOwner(o)},React.createElement(Icon,{name:'x',size:12}))))
          ),
          React.createElement('div',{className:'modal-owner-list'},
            divisionOptions.map(o=>React.createElement('label',{key:o,className:'modal-owner-row'},
              React.createElement('input',{type:'checkbox',checked:owners.includes(o),onChange:()=>toggleOwner(o)}),o
            ))
          )
        ),
        React.createElement('div',{className:'modal-field'},
          React.createElement(Toggle,{size:'md',label:'สถานะใช้งาน',isChecked:status==='active',onChange:checked=>setStatus(checked?'active':'inactive')})
        )
      ),
      React.createElement('div',{className:'modal-footer'},
        React.createElement(Button,{variant:'secondary',size:'md',onClick:onClose},'ยกเลิก'),
        React.createElement(Button,{variant:'primary',size:'md',isDisabled:!isValid,onClick:()=>isValid&&onSubmit({code,name,unit:unitList.join(', '),status,owners})},initial?'บันทึก':'เพิ่ม')
      )
    )
  );
}

function ArchDeleteModal({node,onClose,onConfirm}){
  return React.createElement('div',{className:'modal-overlay',onClick:onClose},
    React.createElement('div',{className:'modal-card modal-card--sm',onClick:e=>e.stopPropagation()},
      React.createElement('div',{className:'modal-head'},
        React.createElement('h3',null,React.createElement(Icon,{name:'alert-triangle',size:18,className:'delete-warn-icon-inline'}),'ยืนยันการลบ'),
        React.createElement(Button,{variant:'tertiary',size:'sm',iconOnly:true,className:'modal-close',leadingIcon:React.createElement(Icon,{name:'x',size:18}),onClick:onClose,'aria-label':'ปิด'})
      ),
      React.createElement('div',{className:'modal-body'},
        React.createElement('p',{className:'delete-warn-text'},
          'คุณกำลังจะลบ ',React.createElement('strong',null,node.code+' '+node.name),
          countChildren(node)>0?' และรายการย่อยอีก '+countChildren(node)+' รายการภายใต้':''
        ),
        React.createElement('p',{className:'delete-warn-sub'},'การกระทำนี้ไม่สามารถย้อนกลับได้')
      ),
      React.createElement('div',{className:'modal-footer'},
        React.createElement(Button,{variant:'secondary',size:'md',onClick:onClose},'ยกเลิก'),
        React.createElement(Button,{variant:'primary',size:'md',className:'btn-danger',onClick:()=>onConfirm('ลบเรียบร้อยแล้ว')},'ลบ')
      )
    )
  );
}

function ArchLevel2Row({node,l0,l1,group,onEdit,onDelete}){
  const [open,setOpen]=React.useState(false);
  const [editing,setEditing]=React.useState(false);
  const [code,setCode]=React.useState(node.code);
  const [name,setName]=React.useState(node.name);
  const [unitList,setUnitList]=React.useState(node.unit?node.unit.split(',').map(s=>s.trim()).filter(Boolean):[]);
  const [status,setStatus]=React.useState(node.status);
  const unitOptions=React.useMemo(()=>Array.from(new Set(collectByLevel(window.ORG_TREE,'กอง/ร.ร.ช่าง กฟภ./สนง.',[]).map(n=>n.name))),[]);
  React.useEffect(()=>{setCode(node.code);setName(node.name);setUnitList(node.unit?node.unit.split(',').map(s=>s.trim()).filter(Boolean):[]);setStatus(node.status);},[node]);
  function toggleUnit(name){setUnitList(o=>o.includes(name)?o.filter(x=>x!==name):[...o,name]);}
  function startEdit(e){e.stopPropagation();setEditing(true);setOpen(true);}
  function cancelEdit(){setEditing(false);setCode(node.code);setName(node.name);setUnitList(node.unit?node.unit.split(',').map(s=>s.trim()).filter(Boolean):[]);setStatus(node.status);}
  function save(){onEdit({...node,code,name,unit:unitList.join(', '),status});setEditing(false);}
  return React.createElement('div',{className:'arch-l2-item'},
    React.createElement('div',{className:'arch-l2-row',onClick:()=>!editing&&setOpen(v=>!v)},
      React.createElement(Icon,{name:open?'chevron-down':'chevron-right',size:14,className:'arch-l2-caret'}),
      React.createElement(Badge,{label:'LEVEL 2',type:'pill-color',color:ARCH_LEVEL_COLOR[2],size:'sm'}),
      React.createElement('span',{className:'arch-code'},node.code),
      React.createElement('span',{className:'arch-name'},node.name),
      node.unit&&React.createElement('span',{className:'arch-unit-tag'},node.unit.split(',').length+' กอง'),
      React.createElement('div',{className:'arch-row-actions',onClick:e=>e.stopPropagation()},
        !editing&&React.createElement(Button,{variant:'tertiary',size:'sm',iconOnly:true,leadingIcon:React.createElement(Icon,{name:'edit',size:14}),onClick:startEdit,'aria-label':'แก้ไข'}),
        React.createElement(Button,{variant:'tertiary',size:'sm',iconOnly:true,className:'org-delete',leadingIcon:React.createElement(Icon,{name:'trash',size:14}),onClick:()=>onDelete(node),'aria-label':'ลบ'})
      )
    ),
    open&&React.createElement('div',{className:'arch-l2-detail'},
      editing?React.createElement(React.Fragment,null,
        React.createElement(InputField,{fieldType:'default',label:'รหัส',size:'sm',value:code,onChange:setCode}),
        React.createElement(InputField,{fieldType:'default',label:'ชื่องาน',size:'sm',value:name,onChange:setName}),
        React.createElement('div',{className:'modal-field'},
          React.createElement('label',{className:'modal-label'},'กองที่รับผิดชอบทั้งหมด (เลือกได้หลายกอง)'),
          unitList.length>0&&React.createElement('div',{className:'modal-selected-chips'},
            unitList.map(o=>React.createElement('span',{key:o,className:'modal-selected-chip'},o,React.createElement('button',{onClick:()=>toggleUnit(o)},React.createElement(Icon,{name:'x',size:12}))))
          ),
          React.createElement('div',{className:'modal-owner-list'},
            unitOptions.map(o=>React.createElement('label',{key:o,className:'modal-owner-row'},
              React.createElement('input',{type:'checkbox',checked:unitList.includes(o),onChange:()=>toggleUnit(o)}),o
            ))
          )
        ),
        React.createElement('div',{className:'modal-field'},React.createElement(Toggle,{size:'sm',label:'สถานะใช้งาน',isChecked:status==='active',onChange:checked=>setStatus(checked?'active':'inactive')})),
        React.createElement('div',{className:'arch-l2-detail-actions'},
          React.createElement(Button,{variant:'secondary',size:'sm',onClick:cancelEdit},'ยกเลิก'),
          React.createElement(Button,{variant:'primary',size:'sm',onClick:save},'บันทึก')
        )
      ):React.createElement(React.Fragment,null,
        React.createElement('div',{className:'arch-l2-detail-grid'},
          React.createElement('div',{className:'arch-l2-detail-field'},React.createElement('span',{className:'report-field-label'},'Layer'),React.createElement('div',null,group.shortLabel)),
          React.createElement('div',{className:'arch-l2-detail-field'},React.createElement('span',{className:'report-field-label'},'Building Block'),React.createElement('div',null,l0.code+' '+l0.name)),
          React.createElement('div',{className:'arch-l2-detail-field'},React.createElement('span',{className:'report-field-label'},'Key Work Process'),React.createElement('div',null,l1.code+' '+l1.name)),
          React.createElement('div',{className:'arch-l2-detail-field'},React.createElement('span',{className:'report-field-label'},'กองที่รับผิดชอบทั้งหมด'),React.createElement('div',null,node.unit||'—')),
          React.createElement('div',{className:'arch-l2-detail-field'},React.createElement('span',{className:'report-field-label'},'ปี'),React.createElement('div',null,'2569')),
          React.createElement('div',{className:'arch-l2-detail-field'},React.createElement('span',{className:'report-field-label'},'สถานะ'),React.createElement(Badge,{label:node.status==='active'?'เปิดใช้งาน':'ปิดใช้งาน',type:'pill-color',color:node.status==='active'?'success':'gray',size:'sm'}))
        )
      )
    )
  );
}

function ArchLevel1Row({node,group,l0,onEdit,onDelete,onAddL2,onEditL2,onDeleteL2}){
  const [open,setOpen]=React.useState(false);
  const hasChildren=node.children&&node.children.length>0;
  return React.createElement('div',{className:'arch-l1-card'},
    React.createElement('div',{className:'arch-l1-row'},
      React.createElement(Button,{variant:'tertiary',size:'sm',iconOnly:true,onClick:()=>setOpen(v=>!v),leadingIcon:React.createElement(Icon,{name:open?'chevron-down':'chevron-right',size:15})}),
      React.createElement(Badge,{label:'LEVEL 1',type:'pill-color',color:ARCH_LEVEL_COLOR[1],size:'sm'}),
      React.createElement('span',{className:'arch-code'},node.code),
      React.createElement('span',{className:'arch-name'},node.name),
      React.createElement('span',{className:'arch-meta'},countChildren(node)+' งาน'+(ownUnitCount(node)?' - '+ownUnitCount(node)+' ฝ่าย':'')),
      React.createElement(Badge,{label:node.status==='active'?'เปิดใช้งาน':'ปิดใช้งาน',type:'pill-color',color:node.status==='active'?'success':'gray',size:'sm'}),
      React.createElement('div',{className:'arch-row-actions'},
        React.createElement(Button,{variant:'tertiary',size:'sm',iconOnly:true,leadingIcon:React.createElement(Icon,{name:'edit',size:14}),onClick:()=>onEdit(node),'aria-label':'แก้ไข'}),
        React.createElement(Button,{variant:'tertiary',size:'sm',iconOnly:true,className:'org-delete',leadingIcon:React.createElement(Icon,{name:'trash',size:14}),onClick:()=>onDelete(node),'aria-label':'ลบ'})
      )
    ),
    open&&React.createElement('div',{className:'arch-l2-list'},
      React.createElement('div',{className:'arch-l2-list-hint'},'LEVEL 2 งาน (Jobs) ระดับกองเป็นผู้รับผิดชอบ'+(unitCount(node)?' ( '+unitCount(node)+' กอง )':'')),
      (node.children||[]).map(c=>React.createElement(ArchLevel2Row,{key:c.id,node:c,l0,l1:node,group,onEdit:onEditL2,onDelete:onDeleteL2})),
      React.createElement(Button,{variant:'primary',size:'sm',className:'arch-add-job-btn',leadingIcon:React.createElement(Icon,{name:'plus',size:14}),onClick:()=>onAddL2(node)},'เพิ่ม Job')
    )
  );
}

function ArchDetail({group,selected,onAdd,onEdit,onDelete,onEditL2}){
  return React.createElement('div',{className:'arch-detail'},
    React.createElement('div',{className:'arch-breadcrumb'},group.shortLabel,React.createElement(Icon,{name:'chevron-right',size:13}),selected.code),
    React.createElement('div',{className:'arch-level0-card'},
      React.createElement('div',{className:'arch-level0-top'},
        React.createElement(Badge,{label:'LEVEL 0',type:'pill-color',color:ARCH_LEVEL_COLOR[0],size:'md'}),
        React.createElement('span',{className:'arch-level0-hint'},ARCH_LEVEL_HINT[0]+(selected.owners&&selected.owners.length?' · รับผิดชอบ '+selected.owners.length+' หน่วยงาน':'')),
        React.createElement('div',{className:'arch-row-actions'},
          React.createElement(Button,{variant:'secondary',size:'sm',leadingIcon:React.createElement(Icon,{name:'edit',size:14}),onClick:()=>onEdit(0,selected)},'แก้ไข'),
          React.createElement(Button,{variant:'secondary',size:'sm',className:'btn-danger-outline',leadingIcon:React.createElement(Icon,{name:'trash',size:14}),onClick:()=>onDelete(0,selected)},'ลบ')
        )
      ),
      React.createElement('h3',null,selected.code+' '+selected.name),
      React.createElement('div',{className:'arch-level0-meta'},
        React.createElement('span',null,selected.code),React.createElement('span',null,'·'),
        React.createElement('span',null,countChildren(selected)+' กระบวนการทำงาน (L1)'),
        React.createElement(Badge,{label:selected.status==='active'?'เปิดใช้งาน':'inactive',type:'pill-color',color:selected.status==='active'?'success':'gray',size:'sm'}),
        selected.owners&&selected.owners.length>0&&React.createElement('span',{className:'arch-level0-owners'},'สายงานที่รับผิดชอบ: '+selected.owners.join(', '))
      )
    ),
    React.createElement('div',{className:'arch-level1-head'},
      React.createElement(Badge,{label:'LEVEL 1',type:'pill-color',color:ARCH_LEVEL_COLOR[1],size:'md'}),
      React.createElement('span',{className:'arch-level0-hint'},ARCH_LEVEL_HINT[1]+(unitCount(selected)?' ( '+unitCount(selected)+' ฝ่าย )':'')),
      React.createElement(Button,{variant:'primary',size:'sm',className:'arch-add-l1-btn',leadingIcon:React.createElement(Icon,{name:'plus',size:14}),onClick:()=>onAdd(1,selected)},'เพิ่ม Work Process')
    ),
    React.createElement('div',{className:'arch-l1-list'},
      (selected.children||[]).map(c=>React.createElement(ArchLevel1Row,{key:c.id,node:c,group,l0:selected,
        onEdit:n=>onEdit(1,n),onDelete:n=>onDelete(1,n),
        onAddL2:n=>onAdd(2,n),onEditL2,onDeleteL2:n=>onDelete(2,n)
      }))
    )
  );
}

function ArchPanel(){
  const [archYear,setArchYear]=React.useState('2569');
  const [groups,setGroups]=React.useState(()=>cloneTree(window.BA_GROUPS));
  const [activeGroup,setActiveGroup]=React.useState(groups[0].key);
  const [search,setSearch]=React.useState('');
  const group=groups.find(g=>g.key===activeGroup);
  const [selectedId,setSelectedId]=React.useState(group.children[0]&&group.children[0].id);
  const selected=group.children.find(n=>n.id===selectedId)||group.children[0];
  const [addCtx,setAddCtx]=React.useState(null);
  const [editCtx,setEditCtx]=React.useState(null);
  const [deleteCtx,setDeleteCtx]=React.useState(null);
  const [toast,setToast]=React.useState(null);

  function switchGroup(key){
    setActiveGroup(key);
    const g=groups.find(x=>x.key===key);
    setSelectedId(g.children[0]&&g.children[0].id);
  }
  function updateGroupChildren(fn){
    setGroups(gs=>gs.map(g=>g.key===activeGroup?{...g,children:fn(g.children)}:g));
  }
  function handleAddSubmit(values){
    const {level,parentNode}=addCtx;
    const child={id:'n'+Date.now(),code:values.code,name:values.name,status:values.status,unit:values.unit,children:level<2?[]:undefined};
    if(level===0){
      updateGroupChildren(children=>[...children,child]);
    }else{
      updateGroupChildren(children=>treeInsert(children,parentNode.id,child));
    }
    setAddCtx(null);setToast('เพิ่มเรียบร้อยแล้ว');
  }
  function handleEditSubmit(values){
    const {node}=editCtx;
    updateGroupChildren(children=>treeUpdate(children,node.id,n=>({...n,...values})));
    setEditCtx(null);setToast('บันทึกเรียบร้อยแล้ว');
  }
  function handleDirectEditL2(updatedNode){
    updateGroupChildren(children=>treeUpdate(children,updatedNode.id,()=>updatedNode));
    setToast('บันทึกเรียบร้อยแล้ว');
  }
  function handleDeleteConfirm(){
    const {node}=deleteCtx;
    updateGroupChildren(children=>treeDelete(children,node.id));
    if(node.id===selectedId)setSelectedId(group.children.find(n=>n.id!==node.id)?.id);
    setDeleteCtx(null);setToast('ลบเรียบร้อยแล้ว');
  }
  const levelLabelOf=l=>l===0?'LEVEL 0':l===1?'LEVEL 1 (Work Process)':'L2 (Job)';
  function codeExampleFor(level,parentNode){
    const map={governance:'เช่น S1, S2',core:'เช่น C1, C2',enable:'เช่น E1, E2'};
    if(level===0)return map[activeGroup]||'เช่น S1, S2';
    if(level===1)return parentNode?'เช่น '+parentNode.code+'.1, '+parentNode.code+'.2':'เช่น C1.1, C1.2';
    return parentNode?'เช่น '+parentNode.code+'.1, '+parentNode.code+'.2':'เช่น C1.1.1, C1.1.2';
  }
  const searchResults=React.useMemo(()=>archSearch(group.children,search),[group,search]);
  function jumpToResult(r){setSelectedId(r.l0.id);setSearch('');}

  return React.createElement('div',{className:'card panel'},
    React.createElement('div',{className:'panel-head'},
      React.createElement('div',null,React.createElement('h2',null,'PEA สถาปัตกรรมธุรกิจ (PEA Business Architecture)'),React.createElement('p',null,'โครงสร้าง 3 ระดับ : LEVEL 0 กระบวนการสำคัญ (Key Work Process) ▸ LEVEL 1 กระบวนการทำงาน (Work Process) ▸ LEVEL 2 งาน (Job)')),
      React.createElement('div',{className:'panel-head-actions'},
        React.createElement('select',{className:'year-select',value:archYear,onChange:e=>setArchYear(e.target.value)},
          ['2569','2568','2567'].map(y=>React.createElement('option',{key:y,value:y},'ปี '+y))
        ),
        React.createElement(Button,{variant:'secondary',size:'md',leadingIcon:React.createElement(Icon,{name:'download',size:16})},'Export โครงสร้าง')
      )
    ),
    React.createElement('div',{className:'arch-search-bar'},
      React.createElement(InputField,{fieldType:'default',placeholder:'กระบวนการสำคัญ, กระบวนการทำงาน, งาน...',size:'md',value:search,onChange:setSearch,leadingIcon:React.createElement(Icon,{name:'search',size:17}),style:{width:'326px',height:'40px'}})
    ),
    React.createElement('div',{className:'arch-tabs'},
      groups.map(g=>React.createElement('button',{key:g.key,className:'arch-tab'+(activeGroup===g.key?' is-active':''),onClick:()=>switchGroup(g.key)},g.shortLabel))
    ),
    React.createElement('div',{className:'arch-tab-banner'},
      React.createElement(FeaturedIcon,{icon:'building-07',size:'md',color:'gray',variant:'light'}),
      React.createElement('div',null,
        React.createElement('div',{className:'arch-tab-banner-title'},group.shortLabel),
        React.createElement('div',{className:'arch-tab-banner-desc'},group.hint)
      )
    ),
    search.trim()?React.createElement(ArchSearchResults,{results:searchResults,onJump:jumpToResult}):React.createElement('div',{className:'arch-body'},
      React.createElement('div',{className:'arch-sidebar'},
        React.createElement(Button,{variant:'primary',size:'md',className:'arch-add-bb-btn',leadingIcon:React.createElement(Icon,{name:'plus',size:14}),onClick:()=>setAddCtx({level:0,parentNode:null})},'เพิ่ม Building Block'),
        React.createElement('div',{className:'arch-block-list'},
          group.children.map(n=>React.createElement('button',{key:n.id,className:'arch-block-item'+(selected&&selected.id===n.id?' is-active':''),onClick:()=>setSelectedId(n.id)},
            React.createElement('span',{className:'arch-block-code'},n.code),
            React.createElement('span',{className:'arch-block-name'},n.name)
          ))
        )
      ),
      selected?React.createElement(ArchDetail,{group,selected,
        onAdd:(level,parentNode)=>setAddCtx({level,parentNode}),
        onEdit:(level,node)=>setEditCtx({level,node}),
        onDelete:(level,node)=>setDeleteCtx({level,node}),
        onEditL2:handleDirectEditL2
      }):React.createElement('div',{className:'arch-empty'},'ยังไม่มี Building Block ในกลุ่มนี้')
    ),
    addCtx&&React.createElement(ArchNodeModal,{title:'เพิ่ม'+(addCtx.level===0?' Building Block':addCtx.level===1?' Work Process':' Job'),groupLabel:group.label,levelLabel:levelLabelOf(addCtx.level),codeExample:codeExampleFor(addCtx.level,addCtx.parentNode),onClose:()=>setAddCtx(null),onSubmit:handleAddSubmit}),
    editCtx&&React.createElement(ArchNodeModal,{title:'แก้ไข '+editCtx.node.code,groupLabel:group.label,levelLabel:levelLabelOf(editCtx.level),initial:editCtx.node,codeExample:codeExampleFor(editCtx.level,null),onClose:()=>setEditCtx(null),onSubmit:handleEditSubmit}),
    deleteCtx&&React.createElement(ArchDeleteModal,{node:deleteCtx.node,onClose:()=>setDeleteCtx(null),onConfirm:handleDeleteConfirm}),
    toast&&React.createElement(Toast,{message:toast,onDone:()=>setToast(null)})
  );
}

function KpiPanel(){
  const maxV=Math.max(...window.KPI_TREND);
  return React.createElement('div',{className:'panel-stack'},
    React.createElement('div',{className:'card panel'},
      React.createElement('div',{className:'panel-head'},
        React.createElement('div',null,React.createElement('h2',null,'แนวโน้มผลการดำเนินงาน KPI องค์กร'),React.createElement('p',null,'ร้อยละความสำเร็จ SLA รายเดือน (12 เดือนล่าสุด)'))
      ),
      React.createElement('div',{className:'trend-chart'},
        window.KPI_TREND.map((v,i)=>React.createElement('div',{key:i,className:'trend-bar-wrap'},
          React.createElement('div',{className:'trend-bar',style:{height:(v/maxV*100)+'%'}}),
          React.createElement('span',{className:'trend-value'},v)
        ))
      )
    ),
    React.createElement('div',{className:'card panel'},
      React.createElement('div',{className:'panel-head'},
        React.createElement('div',null,React.createElement('h2',null,'ภาระงานและอัตราผ่าน SLA รายหน่วยงาน'))
      ),
      React.createElement('div',{className:'table-scroll'},
        React.createElement('table',{className:'data-table'},
          React.createElement('thead',null,React.createElement('tr',null,['หน่วยงาน','รายงานทั้งหมด','ตรงเวลา','ล่าช้า','อัตราผ่าน SLA'].map(c=>React.createElement('th',{key:c},c)))),
          React.createElement('tbody',null,window.WORKLOAD_KPI.map((w,i)=>React.createElement('tr',{key:i},
            React.createElement('td',null,w.unit),
            React.createElement('td',null,w.reports),
            React.createElement('td',null,w.onTime),
            React.createElement('td',null,w.late),
            React.createElement('td',null,React.createElement('span',{className:'rate-pill',style:{background:w.passRate>=90?'var(--pea-bg-success-secondary)':'var(--pea-bg-warning-secondary)',color:w.passRate>=90?'var(--pea-fg-success-secondary)':'var(--pea-fg-warning-secondary)'}},w.passRate+'%'))
          )))
        )
      )
    )
  );
}

function App(){
  const [tab,setTab]=React.useState('org');
  const panels={org:OrgPanel,sla:window.SlaPanel,arch:ArchPanel,kpi:KpiPanel,users:window.UserManagementPanel};
  const Panel=panels[tab];
  return React.createElement(React.Fragment,null,
    React.createElement(TopBar,null),
    React.createElement(TopTabs,{active:tab,setActive:setTab}),
    React.createElement('main',{className:'page'},
      React.createElement('div',{className:'settings-content'},React.createElement(Panel,null))
    )
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
