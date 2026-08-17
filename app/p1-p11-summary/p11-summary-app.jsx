import Image from 'next/image';
import Link from 'next/link';
const {Button,Badge}=window.DesignSystem_cbd181;

const SUM_MONTHS=['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'];

function TopBar(){
  return React.createElement('header',{className:'ptop'},
    React.createElement(Link,{className:'ptop-back',href:'/p1-p11-overview'},React.createElement(Icon,{name:'chevron-left',size:16}),'กลับ'),
    React.createElement('div',{className:'ptop-left'},
      React.createElement(Image,{className:'ptop-logo',src:'/assets/sla-logo-checkmark.png',alt:'SLA',width:36,height:36}),
      React.createElement('div',{className:'ptop-word'},
        React.createElement('span',{className:'ptop-title'},'PEA-SLA Tracking System'),
        React.createElement('span',{className:'ptop-sub'},'สรุปรายงานภาพรวม P1-P11')
      )
    )
  );
}

function StatusIcon({color}){
  return React.createElement('span',{className:`pstatus-icon pstatus-icon--${color}`},React.createElement(Icon,{name:'file-search-02',size:14}));
}

function PersonCell({name,position}){
  return React.createElement('div',{className:'psum-person'},
    React.createElement('span',{className:'psum-avatar'},React.createElement(Icon,{name:'user-01',size:18})),
    React.createElement('div',{className:'psum-person-text'},
      React.createElement('span',null,name||'-'),
      React.createElement('span',{className:'psum-person-pos'},position||'-')
    )
  );
}

function App(){
  const [unit,setUnit]=React.useState('การไฟฟ้าส่วนภูมิภาคจังหวัดพิษณุโลก');
  const [year,setYear]=React.useState('2569');
  const [reported,setReported]=React.useState({});
  React.useEffect(()=>{
    const params=new URLSearchParams(window.location.search);
    const u=params.get('unit')||'การไฟฟ้าส่วนภูมิภาคจังหวัดพิษณุโลก';
    const y=params.get('year')||'2569';
    setUnit(u);
    setYear(y);
    try{setReported(JSON.parse(localStorage.getItem('p11_reported_'+y)||'{}'));}catch(e){}
  },[]);
  return React.createElement(React.Fragment,null,
    React.createElement(TopBar),
    React.createElement('main',{className:'pcontent'},
      React.createElement('nav',{className:'psum-crumb'},
        React.createElement(Link,{href:'/learning-form-overview'},'ข้อเสนอโอกาสในการปรับปรุงฯ (QIR)'),
        React.createElement(Icon,{name:'chevron-right',size:14}),
        React.createElement(Link,{href:'/p1-p11-overview'},'P1-P11 / QIR ประจำปี'),
        React.createElement(Icon,{name:'chevron-right',size:14}),
        React.createElement('span',{className:'is-current'},'การรายงานผลข้อตกลงระดับการให้บริการ (SLA)')
      ),
      React.createElement('div',{className:'psum-head'},
        React.createElement('h1',null,unit),
        React.createElement('p',null,'สรุปรายงานภาพรวม P1-P11 ประจำปี '+year)
      ),
      React.createElement('div',{className:'psum-divider'}),
      React.createElement('div',{className:'plegend-row'},
        React.createElement('span',{className:'plegend-label'},'สถานะ QIR :'),
        window.P11_STATUS_LEGEND.map(s=>React.createElement('span',{key:s.key,className:'plegend-item'},React.createElement(StatusIcon,{color:s.color}),s.label)),
        React.createElement('div',{className:'psum-export'},
          React.createElement(Button,{variant:'secondary',size:'md',trailingIcon:React.createElement(Icon,{name:'chevron-down',size:15})},'ส่งออกข้อมูล')
        )
      ),
      React.createElement('div',{className:'card ptable-card'},
        React.createElement('table',{className:'ptable psum-table'},
          React.createElement('thead',null,React.createElement('tr',null,
            React.createElement('th',null,'เดือน'),
            React.createElement('th',{className:'is-center'},'ผู้บันทึก'),
            React.createElement('th',{className:'is-center'},'ผู้อนุมัติ'),
            React.createElement('th',{className:'is-center'},'รายงานผล')
          )),
          React.createElement('tbody',null,
            SUM_MONTHS.map(m=>{
              const r=reported[m];
              return React.createElement('tr',{key:m,className:'ptree-row'},
                React.createElement('td',{className:'psum-month'},m+' '+year),
                React.createElement('td',{className:'is-center'},React.createElement(PersonCell,r&&r.recorder?r.recorder:{})),
                React.createElement('td',{className:'is-center'},React.createElement(PersonCell,r&&r.approver?r.approver:{})),
                React.createElement('td',{className:'is-center'},
                  React.createElement('button',{className:'pqir-btn'+(r?' pqir-btn--success':' pqir-btn--error'),onClick:()=>{window.location.href='/p1-p11-sla-report-form?unit='+encodeURIComponent(unit)+'&year='+year+'&month='+encodeURIComponent(m);}},React.createElement(Icon,{name:'file-search-02',size:15}))
                )
              );
            })
          )
        )
      ),
      React.createElement('div',{className:'psum-foot'},
        React.createElement(Button,{variant:'secondary',size:'md',leadingIcon:React.createElement(Icon,{name:'chevron-left',size:16}),onClick:()=>{window.location.href='/p1-p11-overview';}},'ย้อนกลับ')
      )
    )
  );
}

export default App;
