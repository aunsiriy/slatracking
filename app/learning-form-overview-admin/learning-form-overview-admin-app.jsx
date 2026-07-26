import Image from 'next/image';
import Link from 'next/link';
const {Button,Badge,InputField}=window.DesignSystem_cbd181;

function TopBar(){
  return React.createElement('header',{className:'lfatop'},
    React.createElement('div',{className:'lfatop-left'},
      React.createElement(Image,{className:'lfatop-logo',src:'/assets/sla-logo-checkmark.png',alt:'SLA',width:36,height:36}),
      React.createElement('div',{className:'lfatop-word'},
        React.createElement('span',{className:'lfatop-title'},'PEA-SLA Tracking System'),
        React.createElement('span',{className:'lfatop-sub'},'ภาพรวม Learning Form & QIR (กนอ.)')
      )
    ),
    React.createElement(Link,{className:'lfatop-back',href:'/'},React.createElement(Icon,{name:'corner-up-left',size:16}),'กลับไปหน้าหลัก')
  );
}

function Breadcrumb(){
  return React.createElement('div',{className:'lfabreadcrumb'},
    React.createElement(Link,{href:'/'},'หน้าหลัก'),
    React.createElement(Icon,{name:'chevron-right',size:14}),
    React.createElement('span',{className:'is-current'},'ภาพรวม Learning Form')
  );
}

function KpiCards({year}){
  const s=window.LFOA_SUMMARY;
  const cards=[
    {icon:'book',label:'Learning Form ทั้งหมด (ทุกหน่วยงาน)',value:s.total,color:'brand'},
    {icon:'calendar',label:`Learning Form ปี ${year}`,value:s.byYear[year]||0,color:'blue'},
    {icon:'clock',label:'รอดำเนินการ',value:s.pendingCount,color:'warning'}
  ];
  return React.createElement('div',{className:'lfakpi-grid'},
    cards.map((c,i)=>React.createElement('div',{key:i,className:'card lfakpi-card'},
      React.createElement('span',{className:`lfakpi-icon lfakpi-icon--${c.color}`},React.createElement(Icon,{name:c.icon,size:18})),
      React.createElement('div',null,
        React.createElement('div',{className:'lfakpi-value'},c.value),
        React.createElement('div',{className:'lfakpi-label'},c.label)
      )
    ))
  );
}

function MenuCards(){
  const cards=[
    {icon:'building',title:'Learning Form สายงานเขต / สำนักงานใหญ่',desc:'แบบฟอร์มทบทวนผลการดำเนินงานและวางแผนปรับปรุงกระบวนการ ระดับฝ่าย/เขต/สำนักงานใหญ่',cta:'ไปที่ Learning Form',href:'/learning-form'},
    {icon:'map-pin',title:'Learning Form สำหรับสำนักงานการไฟฟ้า',desc:'ภาพรวมเกณฑ์ P1-P11 และแบบฟอร์ม QIR ประจำปี สำหรับหน่วยงาน กฟฟ.',cta:'ไปที่ P1-P11 Overview',href:'/p1-p11-overview'}
  ];
  return React.createElement('div',{className:'lfamenu-grid'},
    cards.map((c,i)=>React.createElement('div',{key:i,className:'card lfamenu-card'},
      React.createElement('span',{className:'lfamenu-icon'},React.createElement(Icon,{name:c.icon,size:22})),
      React.createElement('h3',{className:'lfamenu-title'},c.title),
      React.createElement('p',{className:'lfamenu-desc'},c.desc),
      React.createElement(Button,{variant:'primary',size:'md',trailingIcon:React.createElement(Icon,{name:'arrow-right',size:16}),onClick:()=>{window.location.href=c.href;}},c.cta)
    ))
  );
}

function AssignModal({onClose,onAssign}){
  const [selected,setSelected]=React.useState(()=>new Set());
  const [year,setYear]=React.useState(window.LFOA_YEARS[0]);
  function toggle(key){setSelected(s=>{const n=new Set(s);n.has(key)?n.delete(key):n.add(key);return n;});}
  const isValid=selected.size>0;
  return React.createElement('div',{className:'modal-overlay',onClick:onClose},
    React.createElement('div',{className:'modal-card',onClick:e=>e.stopPropagation()},
      React.createElement('div',{className:'modal-head'},
        React.createElement('h3',null,'สร้าง Learning Form เพื่อมอบหมาย'),
        React.createElement('button',{className:'lfa-modal-close',onClick:onClose},React.createElement(Icon,{name:'x',size:18}))
      ),
      React.createElement('div',{className:'modal-body'},
        React.createElement('div',{className:'modal-field'},
          React.createElement('label',{className:'modal-label'},'ปีงบประมาณ',React.createElement('span',{className:'modal-label-required'},' *')),
          React.createElement('select',{className:'modal-select',value:year,onChange:e=>setYear(e.target.value)},
            window.LFOA_YEARS.map(y=>React.createElement('option',{key:y,value:y},'ปี '+y))
          )
        ),
        React.createElement('div',{className:'modal-field'},
          React.createElement('label',{className:'modal-label'},'มอบหมายให้หน่วยงาน',React.createElement('span',{className:'modal-label-required'},' *')),
          React.createElement('div',{className:'lfa-unit-list'},
            window.LFOA_UNITS.map(u=>React.createElement('label',{key:u.key,className:'lfa-unit-row'},
              React.createElement('input',{type:'checkbox',checked:selected.has(u.key),onChange:()=>toggle(u.key)}),
              React.createElement('span',{className:'lfa-unit-name'},u.name),
              React.createElement('span',{className:'ba-tag'},window.LFOA_LEVEL_LABEL[u.level])
            ))
          )
        )
      ),
      React.createElement('div',{className:'modal-footer'},
        React.createElement(Button,{variant:'secondary',size:'md',onClick:onClose},'ยกเลิก'),
        React.createElement(Button,{variant:'primary',size:'md',disabled:!isValid,onClick:()=>{onAssign(Array.from(selected),year);}},'มอบหมาย')
      )
    )
  );
}

function RecentList({year,setYear,items:allItems}){
  const items=allItems.filter(it=>it.year===year);
  return React.createElement('div',{className:'card lfalist-card'},
    React.createElement('div',{className:'lfalist-head'},
      React.createElement('h3',null,'Learning Form ล่าสุด (ทุกหน่วยงาน)'),
      React.createElement('div',{className:'lfayear-filter'},
        window.LFOA_YEARS.map(y=>React.createElement('button',{key:y,className:'lfayear-btn'+(y===year?' is-active':''),onClick:()=>setYear(y)},'ปี '+y))
      )
    ),
    React.createElement('div',{className:'lfalist-rows'},
      items.length===0?React.createElement('div',{className:'lfalist-empty'},'ไม่มี Learning Form ในปีที่เลือก'):
      items.map((it,i)=>{
        const s=window.LFOA_STATUS_MAP[it.status];
        return React.createElement('div',{key:i,className:'lfalist-row'},
          React.createElement('div',{className:'lfalist-row-main'},
            React.createElement('div',{className:'lfalist-row-process'},it.process),
            React.createElement('div',{className:'lfalist-row-unit'},it.unit)
          ),
          React.createElement('span',{className:'ba-tag'},window.LFOA_LEVEL_LABEL[it.level]),
          React.createElement(Badge,{label:s.label,type:'pill-color',color:s.color,size:'sm'})
        );
      })
    )
  );
}

function App(){
  const [year,setYear]=React.useState(window.LFOA_YEARS[0]);
  const [items,setItems]=React.useState(window.LFOA_ITEMS);
  const [modalOpen,setModalOpen]=React.useState(false);
  const [toast,setToast]=React.useState(null);
  React.useEffect(()=>{window.LFOA_ITEMS=items;},[items]);
  React.useEffect(()=>{if(!toast)return;const t=setTimeout(()=>setToast(null),2600);return()=>clearTimeout(t);},[toast]);
  function handleAssign(unitKeys,y){
    const newItems=unitKeys.map((k,idx)=>{
      const u=window.LFOA_UNITS.find(x=>x.key===k);
      return {id:Date.now()+idx,process:'Learning Form ที่มอบหมายใหม่',unit:u.name,level:u.level,year:y,status:'draft'};
    });
    setItems(prev=>[...newItems,...prev]);
    setYear(y);
    setModalOpen(false);
    setToast(`มอบหมาย Learning Form ให้ ${unitKeys.length} หน่วยงานแล้ว`);
  }
  return React.createElement(React.Fragment,null,
    React.createElement(TopBar),
    React.createElement('main',{className:'lfacontent'},
      React.createElement(Breadcrumb),
      React.createElement('div',{className:'lfapage-head'},
        React.createElement('div',null,
          React.createElement('h1',null,'ภาพรวม Learning Form'),
          React.createElement('p',null,'สรุปจำนวน Learning Form ทั้งองค์กร และมอบหมายการจัดทำให้หน่วยงานต่างๆ')
        ),
        React.createElement(Button,{variant:'primary',size:'md',leadingIcon:React.createElement(Icon,{name:'plus',size:16}),onClick:()=>setModalOpen(true)},'สร้าง Learning Form เพื่อมอบหมาย')
      ),
      React.createElement(KpiCards,{year}),
      React.createElement(MenuCards),
      React.createElement(RecentList,{year,setYear:setYear,items}),
      modalOpen&&React.createElement(AssignModal,{onClose:()=>setModalOpen(false),onAssign:handleAssign}),
      toast&&React.createElement('div',{className:'toast'},React.createElement(Icon,{name:'check',size:16}),toast)
    )
  );
}

export default App;
