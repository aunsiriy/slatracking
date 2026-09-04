import Image from 'next/image';
import Link from 'next/link';
const {Button,Badge,Avatar}=window.DesignSystem_cbd181;

const QLO_LINE_NAME='สายงานดิจิทัลและการสื่อสาร';
const QLO_ROWS=[
  {year:'2569',recorder:'สวิชญา พฤกษหิรัญ',picked:0,lineAdded:0,date:'—',status:'pending'},
  {year:'2568',recorder:'สวิชญา พฤกษหิรัญ',picked:6,lineAdded:2,date:'05/10/2568',status:'submitted'},
  {year:'2567',recorder:'ธงชัย มีนวล',picked:5,lineAdded:1,date:'28/09/2567',status:'submitted'},
  {year:'2566',recorder:'ธงชัย มีนวล',picked:4,lineAdded:0,date:'01/10/2566',status:'submitted'}
];
const QLO_STATUS={
  submitted:{label:'ส่งคัดเลือกแล้ว',color:'success'},
  pending:{label:'ยังไม่ได้ส่งคัดเลือก',color:'warning'}
};

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
    React.createElement('span',{className:'is-current'},'ภาพรวม QIR สายงาน')
  );
}

function KpiCards({rows}){
  const total=rows.length;
  const submitted=rows.filter(r=>r.status==='submitted').length;
  const pending=total-submitted;
  const cards=[
    {icon:'calendar',label:'รอบปีทั้งหมด',value:total,color:'brand'},
    {icon:'check-circle',label:'ส่งคัดเลือกแล้ว',value:submitted,color:'success'},
    {icon:'clock',label:'ยังไม่ได้ส่ง',value:pending,color:'warning'}
  ];
  return React.createElement('div',{className:'qlo-kpi-grid'},
    cards.map((c,i)=>React.createElement('div',{key:i,className:'card qlo-kpi-card'},
      React.createElement('span',{className:'qlo-kpi-icon qlo-kpi-icon--'+c.color},React.createElement(Icon,{name:c.icon,size:18})),
      React.createElement('div',null,
        React.createElement('div',{className:'qlo-kpi-value'},c.value),
        React.createElement('div',{className:'qlo-kpi-label'},c.label)
      )
    ))
  );
}

function App(){
  const rows=QLO_ROWS;
  const [yearFilter,setYearFilter]=React.useState('all');
  const [search,setSearch]=React.useState('');
  const yearOptions=rows.map(r=>r.year);
  const q=search.trim().toLowerCase();
  const filtered=rows
    .filter(r=>yearFilter==='all'||r.year===yearFilter)
    .filter(r=>!q||[r.year,r.recorder,(QLO_STATUS[r.status]||{}).label,r.date].join(' ').toLowerCase().includes(q));
  const hasFilter=yearFilter!=='all'||q!=='';
  function clearFilter(){setYearFilter('all');setSearch('');}
  function goSelect(){window.location.href='/qir-line-form';}
  return React.createElement(React.Fragment,null,
    React.createElement(TopBar),
    React.createElement('main',{className:'lfcontent'},
      React.createElement(Breadcrumb),
      React.createElement('div',{className:'lfpage-head'},
        React.createElement('div',null,
          React.createElement('h1',null,'ภาพรวม QIR สายงาน'),
          React.createElement('p',null,'ติดตามสถานะการคัดเลือก QIR ระดับสายงานของ '+QLO_LINE_NAME+' ในแต่ละรอบปี')
        ),
        React.createElement(Button,{variant:'primary',size:'md',leadingIcon:React.createElement(Icon,{name:'plus',size:16}),onClick:goSelect},'คัดเลือกประจำปี')
      ),
      React.createElement(KpiCards,{rows}),
      React.createElement('div',{className:'card lsection'},
        React.createElement('div',{className:'lsection-head'},
          React.createElement('div',null,
            React.createElement('h3',null,'ประวัติการคัดเลือกรายปี'),
            React.createElement('p',{className:'lsection-hint'},'แต่ละปีระบุว่าได้ส่งผลการคัดเลือก QIR ของสายงานเรียบร้อยแล้วหรือยัง')
          )
        ),
        React.createElement('div',{className:'qlo-filters'},
          React.createElement('div',{className:'qlo-search'},
            React.createElement(Icon,{name:'search',size:15}),
            React.createElement('input',{placeholder:'ค้นหาปี / ผู้คัดเลือก / สถานะ...',value:search,onChange:e=>setSearch(e.target.value)})
          ),
          React.createElement('select',{className:'qlo-select',value:yearFilter,onChange:e=>setYearFilter(e.target.value)},
            React.createElement('option',{value:'all'},'ทุกปี'),
            yearOptions.map(y=>React.createElement('option',{key:y,value:y},'ประจำปี '+y))
          ),
          hasFilter&&React.createElement(Button,{variant:'secondary',size:'md',onClick:clearFilter},'ล้างค่า')
        ),
        filtered.length===0
          ?React.createElement('div',{className:'qlo-empty'},
            React.createElement(Icon,{name:'search',size:22}),
            React.createElement('span',{className:'qlo-empty-title'},'ไม่พบข้อมูลตามที่ค้นหา'),
            React.createElement('span',{className:'qlo-empty-sub'},'ลองปรับคำค้นหรือเลือกปีใหม่'),
            React.createElement(Button,{variant:'secondary',size:'sm',onClick:clearFilter},'ล้างตัวกรอง')
          )
          :React.createElement('table',{className:'ltable qlo-table'},
            React.createElement('thead',null,React.createElement('tr',null,
              ['ประจำปี','ผู้คัดเลือก','ข้อเสนอที่คัดเลือก','QIR ของสายงาน','วันที่ส่ง','สถานะ',''].map((h,i)=>React.createElement('th',{key:i},h))
            )),
            React.createElement('tbody',null,filtered.map(r=>{
              const s=QLO_STATUS[r.status];
              return React.createElement('tr',{key:r.year,className:'qlo-row',onClick:goSelect},
                React.createElement('td',null,'ปี '+r.year),
                React.createElement('td',null,r.recorder),
                React.createElement('td',null,r.picked?r.picked+' ข้อเสนอ':'—'),
                React.createElement('td',null,r.lineAdded?r.lineAdded+' รายการ':'—'),
                React.createElement('td',null,r.date),
                React.createElement('td',null,React.createElement(Badge,{label:s.label,type:'pill-color',color:s.color,size:'sm'})),
                React.createElement('td',{className:'qlo-row-action'},
                  React.createElement(Button,{variant:'tertiary',size:'sm',trailingIcon:React.createElement(Icon,{name:'arrow-right',size:14}),onClick:e=>{e.stopPropagation();goSelect();}},r.status==='pending'?'คัดเลือก':'ดูรายละเอียด')
                )
              );
            }))
          )
      )
    )
  );
}

export default App;
