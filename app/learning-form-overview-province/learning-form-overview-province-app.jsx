import Image from 'next/image';
import Link from 'next/link';
const {Button,Avatar}=window.DesignSystem_cbd181;

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
    React.createElement('span',{className:'is-current'},'ภาพรวม Learning Form — การไฟฟ้าจังหวัด')
  );
}

function MenuCards({onGuide}){
  const cards=[
    {icon:'help-circle',title:'คำอธิบายแบบฟอร์ม',desc:'รายละเอียดการกรอกข้อมูลส่วนที่ 0-7 ของ Learning Form พร้อมคำนิยามแต่ละหัวข้อ',cta:'ดูคำอธิบาย',onClick:onGuide},
    {icon:'download-01',title:'Export Learning Form',desc:'ดาวน์โหลดแบบฟอร์มที่กรอกแล้วเป็นไฟล์ PDF / Excel เพื่อจัดเก็บหรือส่งต่อ',cta:'Export',href:'/learning-form-export',disabled:true}
  ];
  return React.createElement('div',{className:'lfmenu-grid'},
    cards.map((c,i)=>React.createElement('div',{key:i,className:'card lfmenu-card'},
      React.createElement('div',{className:'lfmenu-card-top'},
        React.createElement('span',{className:'lfmenu-icon'},React.createElement(Icon,{name:c.icon,size:22}))
      ),
      React.createElement('h3',{className:'lfmenu-title'},c.title),
      React.createElement('p',{className:'lfmenu-desc'},c.desc),
      React.createElement(Button,{variant:'secondary',size:'md',className:'lfmenu-cta-corner',isDisabled:!!c.disabled,trailingIcon:React.createElement(Icon,{name:'arrow-right',size:16}),onClick:()=>{if(c.disabled)return;if(c.onClick)c.onClick();else window.location.href=c.href;}},c.cta)
    ))
  );
}

function FormGuideModal({onClose}){
  const [open,setOpen]=React.useState(0);
  return React.createElement('div',{className:'modal-overlay',onClick:onClose},
    React.createElement('div',{className:'modal-card lfguide-modal',onClick:e=>e.stopPropagation()},
      React.createElement('div',{className:'modal-head'},
        React.createElement('h3',null,'คำอธิบายแบบฟอร์ม'),
        React.createElement('button',{className:'lfa-modal-close',onClick:onClose},React.createElement(Icon,{name:'x',size:18}))
      ),
      React.createElement('div',{className:'lfguide-list'},
        window.LFO_FORM_GUIDE.map((g,i)=>React.createElement('div',{key:i,className:'lfguide-item'+(open===i?' is-open':'')},
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

function LearningFormEmpty(){
  return React.createElement('div',{className:'card lfempty-card'},
    React.createElement(Image,{src:'/assets/mascot-searching.png',alt:'',width:112,height:112,className:'lfempty-img'}),
    React.createElement('h3',{className:'lfempty-title'},'ยังไม่เปิดใช้งาน Learning Form สำหรับการไฟฟ้าจังหวัด'),
    React.createElement('p',{className:'lfempty-text'},'ส่วนนี้อยู่ระหว่างรอสรุปแนวทางการจัดทำ Learning Form ของหน่วยงานระดับ กฟฟ. เมื่อกำหนดเรียบร้อยแล้วจะเปิดให้กรอกและติดตามสถานะได้ที่หน้านี้'),
    React.createElement(Button,{variant:'primary',size:'md',className:'lfempty-cta',trailingIcon:React.createElement(Icon,{name:'arrow-right',size:16}),onClick:()=>{window.location.href='/p1-p11-overview';}},'ทำ QIR ของตัวเอง')
  );
}

function App(){
  const [guideOpen,setGuideOpen]=React.useState(false);
  return React.createElement(React.Fragment,null,
    React.createElement(TopBar),
    React.createElement('main',{className:'lfcontent'},
      React.createElement(Breadcrumb),
      React.createElement('div',{className:'lfpage-head'},
        React.createElement('div',null,
          React.createElement('h1',null,'ภาพรวม PEA Learning Form — การไฟฟ้าจังหวัด'),
          React.createElement('p',null,'ดูคำอธิบายแบบฟอร์มของ Learning Form')
        )
      ),
      React.createElement(MenuCards,{onGuide:()=>setGuideOpen(true)}),
      React.createElement(LearningFormEmpty)
    ),
    guideOpen&&React.createElement(FormGuideModal,{onClose:()=>setGuideOpen(false)})
  );
}

export default App;
