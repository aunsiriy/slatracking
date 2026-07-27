import Link from 'next/link';
import { ORG_TREE } from '@/src/shared/org-tree-data.js';

const {Button,Badge,InputField,FeaturedIcon}=window.DesignSystem_cbd181;
function BvTreeItem({node,depth,selectedId,onSelect}){
  const [open,setOpen]=React.useState(depth<1);
  const hasChildren=node.children&&node.children.length>0;
  const selectable=!!node.children||depth>0;
  const isSelected=selectedId===node.id;
  function handleClick(){if(selectable)onSelect(node);if(hasChildren)setOpen(true);}
  const label=depth===0?'สายงาน':(node.children?'ฝ่าย':'กอง');
  const color=depth===0?'purple':(node.children?'blue':'success');
  return React.createElement('div',null,
    React.createElement('div',{className:'bv-tree-row'+(isSelected?' bv-tree-row--selected':''),style:{paddingLeft:14+depth*20+'px'},onClick:handleClick},
      hasChildren?React.createElement('button',{type:'button',className:'bv-tree-caret',onClick:e=>{e.stopPropagation();setOpen(!open);}},React.createElement(Icon,{name:open?'chevron-down':'chevron-right',size:14})):React.createElement('span',{className:'bv-tree-caret bv-tree-caret--spacer'}),
      React.createElement(Badge,{label,type:'pill-color',color,size:'sm'}),
      React.createElement('span',{className:'bv-tree-name'},node.name)
    ),
    hasChildren&&open&&node.children.map(c=>React.createElement(BvTreeItem,{key:c.id,node:c,depth:depth+1,selectedId,onSelect}))
  );
}

function findNodePathBv(nodes,id,path){
  for(const n of nodes){
    const next=[...path,n];
    if(n.id===id)return next;
    if(n.children){const r=findNodePathBv(n.children,id,next);if(r)return r;}
  }
  return null;
}
function treeFilterBv(node,q){
  if(!node.children){
    if(!q||node.name.includes(q))return node;
    return null;
  }
  const kids=node.children.map(c=>treeFilterBv(c,q)).filter(Boolean);
  if(!q||node.name.includes(q)||kids.length)return {...node,children:kids.length?kids:node.children};
  return null;
}

function ViewSlaCard({item}){
  const l=window.BA_LEVELS;
  const l0=l.l0.find(x=>x.code===item.level0);
  const l1=l.l1.find(x=>x.code===item.level1);
  const l2=item.level2?l.l2.find(x=>x.code===item.level2):null;
  const avg=(()=>{const nums=Object.values(item.values||{}).map(v=>parseFloat(v)).filter(v=>!isNaN(v));return nums.length?(nums.reduce((a,b)=>a+b,0)/nums.length).toFixed(1):null;})();
  return React.createElement('div',{className:'bv-card'},
    React.createElement('div',{className:'bv-card-top'},
      React.createElement('div',{className:'bv-card-breadcrumb'},[
        item.level0&&(item.level0+' · '+(l0?l0.name:'')),
        item.level1&&(item.level1+' · '+(l1?l1.name:'')),
        item.level2&&(item.level2+' · '+(l2?l2.name:''))
      ].filter(Boolean).join(' ▸ ')),
      React.createElement(Badge,{label:item.status==='active'?'ใช้งาน':'ปิดใช้งาน',type:'pill-color',color:item.status==='active'?'success':'gray',size:'sm'})
    ),
    !item.level2&&item.name&&item.name!=='-'&&React.createElement('div',null,React.createElement('span',{className:'bv-field-label'},'ตัวชี้วัดกระบวนการ'),React.createElement('h4',{className:'bv-card-title'},item.name)),
    item.slaAgreement&&React.createElement('div',null,React.createElement('span',{className:'bv-field-label'},'ข้อตกลงการให้บริการ (SLA)'),React.createElement('div',{className:'bv-card-agreement'},item.slaAgreement)),
    React.createElement('div',{className:'bv-card-meta-grid'},
      React.createElement('div',null,React.createElement('span',{className:'bv-field-label'},'หน่วยงานรับผิดชอบ'),React.createElement('div',null,item.owner)),
      React.createElement('div',null,React.createElement('span',{className:'bv-field-label'},'ค่าเฉลี่ยเป้าหมาย'),React.createElement('div',null,avg!==null?avg:'—')),
      item.servedBy&&React.createElement('div',null,React.createElement('span',{className:'bv-field-label'},'ผู้รับบริการ SLA'),React.createElement('div',null,item.servedBy)),
      item.source&&React.createElement('div',null,React.createElement('span',{className:'bv-field-label'},'แหล่งข้อมูลตรวจสอบ'),React.createElement('div',null,item.source))
    )
  );
}

function BbL1Row({l1}){
  const [open,setOpen]=React.useState(true);
  return React.createElement('div',{className:'bb-l1'},
    React.createElement('div',{className:'bb-l1-head',onClick:()=>setOpen(!open)},
      React.createElement(Icon,{name:open?'chevron-down':'chevron-right',size:14}),
      React.createElement(Badge,{label:l1.code,type:'pill-color',color:'blue',size:'sm'}),
      React.createElement('span',{className:'bb-l1-name'},l1.name),
      React.createElement('span',{className:'bb-l1-count'},(l1.children||[]).length+' งาน')
    ),
    open&&React.createElement('div',{className:'bb-l2-list'},
      (l1.children&&l1.children.length)?l1.children.map(l2=>React.createElement('div',{key:l2.id,className:'bb-l2-row'},
        React.createElement(Badge,{label:l2.code,type:'pill-color',color:'warning',size:'sm'}),
        React.createElement('span',{className:'bb-l2-name'},l2.name),
        l2.unit&&React.createElement('span',{className:'bb-l2-unit'},l2.unit)
      )):React.createElement('div',{className:'bb-l2-empty'},'ไม่มีข้อมูลระดับงาน (Job)')
    )
  );
}

function BbView(){
  const groups=window.BA_GROUPS;
  const [groupKey,setGroupKey]=React.useState(groups[0].key);
  const group=groups.find(g=>g.key===groupKey);
  const [selectedL0Id,setSelectedL0Id]=React.useState(group.children[0].id);
  React.useEffect(()=>{setSelectedL0Id(group.children[0]&&group.children[0].id);},[groupKey]);
  const l0=group.children.find(n=>n.id===selectedL0Id)||group.children[0];
  const l1Count=(l0.children||[]).length;
  const l2Count=(l0.children||[]).reduce((a,n1)=>a+(n1.children||[]).length,0);
  return React.createElement(React.Fragment,null,
    React.createElement('div',{className:'bb-group-tabs'},
      groups.map(g=>React.createElement('button',{key:g.key,type:'button',className:'bb-group-tab'+(g.key===groupKey?' is-active':''),onClick:()=>setGroupKey(g.key)},g.shortLabel))
    ),
    React.createElement('p',{className:'bb-group-hint'},group.hint),
    React.createElement('div',{className:'bb-layout'},
      React.createElement('div',{className:'bb-sidebar'},
        group.children.map(n0=>React.createElement('div',{key:n0.id,className:'bb-sidebar-item'+(n0.id===l0.id?' bb-sidebar-item--active':''),onClick:()=>setSelectedL0Id(n0.id)},
          React.createElement(Badge,{label:n0.code,type:'pill-color',color:'purple',size:'sm'}),
          React.createElement('span',null,n0.name)
        ))
      ),
      React.createElement('div',{className:'bb-detail'},
        React.createElement('div',{className:'bb-l0-card'},
          React.createElement('div',{className:'bb-l0-head'},
            React.createElement(Badge,{label:l0.code,type:'pill-color',color:'purple',size:'md'}),
            React.createElement('h3',null,l0.name)
          ),
          React.createElement('p',{className:'bb-l0-sub'},'LEVEL 0 · กระบวนการสำคัญ (Key Work Process) · '+l1Count+' กระบวนการทำงาน · '+l2Count+' งาน')
        ),
        React.createElement('div',{className:'bb-l1-list'},
          (l0.children||[]).map(l1=>React.createElement(BbL1Row,{key:l1.id,l1}))
        )
      )
    )
  );
}

function BaStructureView(){
  const [pageTab,setPageTab]=React.useState('org');
  const tree=React.useMemo(window.buildOrgSlaTree,[]);
  const items=React.useMemo(window.buildSeedSlaItems,[]);
  const [q,setQ]=React.useState('');
  const [selectedId,setSelectedId]=React.useState(()=>{
    const root=tree.find(n=>n.id===ORG_TREE[0].id);
    const sec=root&&root.children&&root.children.find(c=>c.name.includes('เลขานุการองค์กร'));
    return sec?sec.id:(tree[0]?tree[0].id:null);
  });
  const filteredTree=tree.map(n=>treeFilterBv(n,q)).filter(Boolean);
  const path=selectedId?findNodePathBv(tree,selectedId,[]):null;
  const selectedNode=path?path[path.length-1]:null;
  const displayed=selectedNode?items.filter(it=>window.nodeItemMatch(selectedNode,it)):[];

  return React.createElement(React.Fragment,null,
    React.createElement('header',{className:'bv-header'},
      React.createElement(Link,{href:'/',className:'bv-back'},React.createElement(Icon,{name:'corner-up-left',size:15}),'กลับ'),
      React.createElement('div',{className:'bv-header-title'},
        React.createElement(FeaturedIcon,{icon:React.createElement(Icon,{name:'building',size:20}),size:'md',color:'brand'}),
        React.createElement('div',null,
          React.createElement('h1',null,'โครงสร้าง Business Architecture & SLA'),
          React.createElement('p',null,'มุมมองอ้างอิงแบบดูอย่างเดียว — ไม่สามารถแก้ไขข้อมูลได้')
        )
      ),
      React.createElement(Badge,{label:'View only',type:'pill-color',color:'gray',size:'md'})
    ),
    React.createElement('div',{className:'bv-page-tabs'},
      React.createElement('button',{type:'button',className:'bv-page-tab'+(pageTab==='org'?' is-active':''),onClick:()=>setPageTab('org')},React.createElement(Icon,{name:'building',size:16}),'SLA ตามหน่วยงาน'),
      React.createElement('button',{type:'button',className:'bv-page-tab'+(pageTab==='bb'?' is-active':''),onClick:()=>setPageTab('bb')},React.createElement(Icon,{name:'layout-grid',size:16}),'Building Block (Business Architecture)')
    ),
    React.createElement('main',{className:'bv-page'},
      pageTab==='bb'?React.createElement(BbView,null):
      React.createElement('div',{className:'bv-layout'},
        React.createElement('div',{className:'bv-tree-panel'},
          React.createElement(InputField,{fieldType:'default',size:'md',placeholder:'ค้นหาชื่อหรือรหัสหน่วยงาน...',value:q,onChange:setQ}),
          React.createElement('div',{className:'bv-tree-list'},
            filteredTree.map(n=>React.createElement(BvTreeItem,{key:n.id,node:n,depth:0,selectedId,onSelect:node=>setSelectedId(node.id)}))
          )
        ),
        React.createElement('div',{className:'bv-detail-panel'},
          selectedNode?React.createElement(React.Fragment,null,
            React.createElement('div',{className:'bv-detail-breadcrumb'},path.map((n,i)=>React.createElement(React.Fragment,{key:n.id},i>0&&React.createElement('span',{className:'bv-detail-breadcrumb-sep'},'▸'),React.createElement('span',null,(i===0?'สายงาน':(n.children?'ฝ่าย':'กอง'))+' '+n.name)))),
            React.createElement('h3',{className:'bv-detail-title'},selectedNode.name),
            React.createElement('p',{className:'bv-detail-subtitle'},displayed.length+' SLA ที่กำหนดไว้'),
            React.createElement('div',{className:'bv-card-list'},
              displayed.length?displayed.map(it=>React.createElement(ViewSlaCard,{key:it.id,item:it})):
              React.createElement('div',{className:'bv-empty-sub'},'หน่วยงานนี้ยังไม่มี SLA ที่กำหนดไว้')
            )
          ):React.createElement('div',{className:'bv-empty'},React.createElement(Icon,{name:'building',size:28}),React.createElement('p',null,'เลือกสายงาน ฝ่าย หรือกองทางซ้ายเพื่อดูโครงสร้าง BA และ SLA'))
        )
      )
    )
  );
}

export default BaStructureView;
