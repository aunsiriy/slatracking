import Image from 'next/image';
import Link from 'next/link';
const {Button,Badge}=window.DesignSystem_cbd181;

function TopBar(){
  return React.createElement('header',{className:'ptop'},
    React.createElement('div',{className:'ptop-left'},
      React.createElement(Link,{className:'ptop-back',href:'/'},React.createElement(Icon,{name:'corner-up-left',size:16}),'กลับ'),
      React.createElement(Image,{className:'ptop-logo',src:'/assets/sla-logo-checkmark.png',alt:'SLA',width:36,height:36}),
      React.createElement('div',{className:'ptop-word'},
        React.createElement('span',{className:'ptop-title'},'PEA-SLA Tracking System'),
        React.createElement('span',{className:'ptop-sub'},'P1-P11 / QIR ประจำปี')
      )
    )
  );
}

function StatusIcon({color}){
  return React.createElement('span',{className:`pstatus-icon pstatus-icon--${color}`},React.createElement(Icon,{name:'file-text',size:14}));
}

function TreeRow({node,depth,onQirClick}){
  const [open,setOpen]=React.useState(true);
  const hasChildren=node.children&&node.children.length>0;
  return React.createElement(React.Fragment,null,
    React.createElement('tr',{className:'ptree-row'},
      React.createElement('td',{className:'ptree-name',style:{paddingLeft:(20+depth*28)+'px'}},
        hasChildren?React.createElement('button',{className:'ptree-toggle',onClick:()=>setOpen(v=>!v)},React.createElement(Icon,{name:open?'minus-circle':'plus-circle',size:16})):React.createElement('span',{className:'ptree-toggle-spacer'}),
        React.createElement('span',null,node.name)
      ),
      React.createElement('td',null),
      window.P11_COLUMNS.map(c=>React.createElement('td',{key:c})),
      React.createElement('td',{className:'ptree-qir'},node.qir&&React.createElement('button',{className:'pqir-btn',onClick:()=>onQirClick(node)},React.createElement(Icon,{name:'file-text',size:15})))
    ),
    open&&hasChildren&&node.children.map(ch=>React.createElement(TreeRow,{key:ch.id,node:ch,depth:depth+1,onQirClick}))
  );
}

function App(){
  const [month,setMonth]=React.useState('กรกฎาคม');
  const [year,setYear]=React.useState('2569');
  const [search,setSearch]=React.useState('');
  const filters=['สายงานดิจิทัลและการสื่อสาร','ผู้ช่วยผู้ว่าการดิจิทัลและการสื่อสาร (ดิจิทัล)','กองออกแบบและพัฒนาระบบดิจิทัล 2'];
  const [activeFilters,setActiveFilters]=React.useState(filters);
  function removeFilter(f){setActiveFilters(activeFilters.filter(x=>x!==f));}
  function goToQir(node){window.location.href='/qir-annual-form';}
  return React.createElement(React.Fragment,null,
    React.createElement(TopBar),
    React.createElement('main',{className:'pcontent'},
      React.createElement('div',{className:'ppage-head'},
        React.createElement('h1',null,'P1-P11 / QIR ประจำปี'),
        React.createElement('div',{className:'ppage-head-filters'},
          React.createElement('div',{className:'pselect'},
            React.createElement('select',{value:month,onChange:e=>setMonth(e.target.value)},window.P11_MONTHS.map(m=>React.createElement('option',{key:m,value:m},'เดือน '+m))),
            React.createElement(Icon,{name:'chevron-down',size:14})
          ),
          React.createElement('div',{className:'pselect'},
            React.createElement('select',{value:year,onChange:e=>setYear(e.target.value)},window.P11_YEARS.map(y=>React.createElement('option',{key:y,value:y},'ปี '+y))),
            React.createElement(Icon,{name:'chevron-down',size:14})
          )
        )
      ),
      React.createElement('div',{className:'card psearch-card'},
        React.createElement('span',{className:'psearch-label'},'ค้นหา'),
        React.createElement('div',{className:'psearch-row'},
          React.createElement('div',{className:'psearch-input'},React.createElement(Icon,{name:'search',size:16}),
            React.createElement('input',{placeholder:'ค้นหา...',value:search,onChange:e=>setSearch(e.target.value)})
          ),
          React.createElement(Button,{variant:'secondary',size:'md',leadingIcon:React.createElement(Icon,{name:'filter',size:15})},'ตัวกรอง '+activeFilters.length),
          React.createElement(Button,{variant:'primary',size:'md',leadingIcon:React.createElement(Icon,{name:'search',size:15})},'ค้นหา')
        )
      ),
      React.createElement('div',{className:'pfilter-chips'},
        React.createElement('span',{className:'pfilter-label'},'ตัวกรอง :'),
        activeFilters.map(f=>React.createElement('span',{key:f,className:'pchip'},f,React.createElement('button',{onClick:()=>removeFilter(f)},React.createElement(Icon,{name:'x',size:13}))))
      ),
      React.createElement('div',{className:'plegend-row'},
        React.createElement('span',{className:'plegend-label'},'สถานะ QIR :'),
        window.P11_STATUS_LEGEND.map(s=>React.createElement('span',{key:s.key,className:'plegend-item'},React.createElement(StatusIcon,{color:s.color}),s.label)),
        React.createElement('a',{href:'#',className:'plegend-sla'},'เกณฑ์ SLA',React.createElement(Icon,{name:'help-circle',size:13}))
      ),
      React.createElement('div',{className:'card ptable-card'},
        React.createElement('table',{className:'ptable'},
          React.createElement('thead',null,React.createElement('tr',null,
            React.createElement('th',null,'หน่วยงาน'),
            React.createElement('th',null,'สรุปรายงานภาพรวม P1-P11'),
            window.P11_COLUMNS.map(c=>React.createElement('th',{key:c},c)),
            React.createElement('th',null,'QIR')
          )),
          React.createElement('tbody',null,
            window.P11_TREE.map(node=>React.createElement(TreeRow,{key:node.id,node,depth:0,onQirClick:goToQir}))
          )
        )
      )
    )
  );
}

export default App;
