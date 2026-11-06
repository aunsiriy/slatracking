const {Button,Badge}=window.DesignSystem_cbd181;
const PS_VIEW=(typeof window!=='undefined'&&new URLSearchParams(window.location.search).get('view')==='1');

const SUM_MONTHS=['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'];

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
    React.createElement(window.PageHeader,{
      backHref:'/p1-p11-overview',
      systemSubtitle:'สรุปรายงานภาพรวม P1-P11',
      breadcrumb:[
        {label:'ข้อเสนอโอกาสในการปรับปรุงฯ (QIR)',href:'/learning-form-overview'},
        {label:'P1-P11 / QIR ประจำปี',href:'/p1-p11-overview'},
        {label:'การรายงานผลข้อตกลงระดับการให้บริการ (SLA)'}
      ],
      title:unit,
      actions:React.createElement(Button,{variant:'secondary',size:'md',trailingIcon:React.createElement(Icon,{name:'chevron-down',size:15})},'ส่งออกข้อมูล'),
      subtitle:'สรุปรายงานภาพรวม P1-P11 ประจำปี '+year
    }),
    React.createElement('main',{className:'pcontent'},
      React.createElement('div',{className:'plegend-row'},
        React.createElement('span',{className:'plegend-label'},'สถานะ QIR :'),
        window.P11_STATUS_LEGEND.map(s=>React.createElement('span',{key:s.key,className:'plegend-item'},React.createElement(StatusIcon,{color:s.color}),s.label))
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
                  React.createElement('button',{className:'pqir-btn'+(r?' pqir-btn--success':' pqir-btn--error'),onClick:()=>{window.location.href='/p1-p11-sla-report-form?unit='+encodeURIComponent(unit)+'&year='+year+'&month='+encodeURIComponent(m)+(PS_VIEW?'&view=1':'');}},React.createElement(Icon,{name:'file-search-02',size:15}))
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
