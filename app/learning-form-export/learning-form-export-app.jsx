import Image from 'next/image';
const {Button}=window.DesignSystem_cbd181;

const EX_YEARS=['2569','2568','2567','2566'];

const EX_REPORTS=[
{key:'quarterly',title:'Report รายงานผล QIR รายไตรมาส',
 desc:'รูปแบบหน้ารายงาน QIR ของปีที่ผ่านมา สำหรับนำเสนอคณะกรรมการ Work System — ผลการรายงาน QIR รายไตรมาส ทั้งระดับองค์กรและสายงาน',
 fields:['ชื่อกระบวนการ','ผลการดำเนินงานรายไตรมาส (Q1-Q4)'],
 sheets:['ระดับองค์กร','แยกตามสายงาน','แยกตามเขต'],
 note:'เดิมต้องคัดลอกข้อมูลไปวางใน Excel เพื่อใช้ประชุม — ระบบจะ generate ข้อมูลพร้อมใช้ให้เลย'},
{key:'annual',title:'Report รายงานผลรายปี',
 desc:'กระบวนการที่ผ่านการคัดเลือกจากสายงานและเขตแล้ว พร้อมแนวทางและความคืบหน้าตามแผน',
 fields:['ชื่อกระบวนการที่จะปรับปรุง','แนวทางการปรับปรุง','ความสอดคล้องกับ BA','กิจกรรมตามแผนที่ดำเนินงาน (%)'],
 sheets:['แยกตามสายงาน','แยกตามเขต'],
 note:null}
];

const EX_SCOPES=[['org','ระดับองค์กร (ทุกหน่วยงาน)'],['line','เฉพาะสายงานของตัวเอง'],['own','เฉพาะหน่วยงานของตัวเอง']];
const EX_FORMATS=[['xlsx','Excel (.xlsx)'],['pdf','PDF']];

function TopBar(){
  return React.createElement('header',{className:'ttb'},
    React.createElement('a',{className:'back-link',href:'#',onClick:e=>{e.preventDefault();history.back();}},React.createElement(Icon,{name:'chevron-left',size:16}),'กลับ'),
    React.createElement('span',{className:'ttb-divider'}),
    React.createElement(Image,{className:'ttb-logo',src:'/assets/sla-logo-checkmark.png',alt:'SLA',width:28,height:28}),
    React.createElement('div',{className:'ttb-word'},
      React.createElement('span',{className:'ttb-title'},'PEA-SLA Tracking System'),
      React.createElement('span',{className:'ttb-sub'},'Export Learning Form / QIR')
    )
  );
}

function App(){
  const [years,setYears]=React.useState(['2569']);
  const [reports,setReports]=React.useState(['quarterly']);
  const [scope,setScope]=React.useState('org');
  const [format,setFormat]=React.useState('xlsx');
  const [toast,setToast]=React.useState('');
  function toggle(list,setList,v){setList(list.includes(v)?list.filter(x=>x!==v):[...list,v]);}
  const fileCount=years.length*reports.length;
  const ready=fileCount>0;
  const pickedReports=EX_REPORTS.filter(r=>reports.includes(r.key));
  React.useEffect(()=>{if(!toast)return;const t=setTimeout(()=>setToast(''),2600);return()=>clearTimeout(t);},[toast]);
  return React.createElement(React.Fragment,null,
    React.createElement(TopBar),
    React.createElement('main',{className:'excontent'},
      React.createElement('nav',{className:'excrumb'},
        React.createElement('a',{href:'#',onClick:e=>{e.preventDefault();history.back();}},'ภาพรวม Learning Form'),
        React.createElement(Icon,{name:'chevron-right',size:14}),
        React.createElement('span',{className:'is-current'},'Export Learning Form / QIR')
      ),
      React.createElement('div',{className:'exhead'},
        React.createElement('h1',null,'Export Learning Form / QIR'),
        React.createElement('p',null,'เลือกปีและชุดรายงานที่ต้องการ — ระบบจะ generate ไฟล์พร้อมใช้งานสำหรับการประชุมโดยไม่ต้องคัดลอกข้อมูลเอง')
      ),
      React.createElement('div',{className:'exgrid'},
        React.createElement('div',{className:'excol'},
          React.createElement('div',{className:'card exsection'},
            React.createElement('div',{className:'exsection-head'},
              React.createElement('span',{className:'exstep'},'1'),
              React.createElement('h3',null,'เลือกปีที่ต้องการ'),
              React.createElement('p',{className:'exsection-hint'},'เลือกได้มากกว่าหนึ่งปี')
            ),
            React.createElement('div',{className:'exyears'},
              EX_YEARS.map(y=>React.createElement('button',{key:y,type:'button',className:'exyear'+(years.includes(y)?' is-active':''),onClick:()=>toggle(years,setYears,y)},
                years.includes(y)&&React.createElement(Icon,{name:'check',size:14}),'ปี '+y
              ))
            )
          ),
          React.createElement('div',{className:'card exsection'},
            React.createElement('div',{className:'exsection-head'},
              React.createElement('span',{className:'exstep'},'2'),
              React.createElement('h3',null,'เลือกชุดรายงาน'),
              React.createElement('p',{className:'exsection-hint'},'เลือกพร้อมกันได้หลายชุด')
            ),
            React.createElement('div',{className:'exreports'},
              EX_REPORTS.map(r=>{
                const on=reports.includes(r.key);
                return React.createElement('div',{key:r.key,className:'exreport'+(on?' is-active':''),onClick:()=>toggle(reports,setReports,r.key)},
                  React.createElement('span',{className:'exreport-check'},on&&React.createElement(Icon,{name:'check',size:12})),
                  React.createElement('div',{className:'exreport-body'},
                    React.createElement('div',{className:'exreport-title'},r.title),
                    React.createElement('p',{className:'exreport-desc'},r.desc),
                    React.createElement('div',{className:'exreport-fields'},r.fields.map(f=>React.createElement('span',{key:f,className:'exfield'},f))),
                    React.createElement('div',{className:'exsheets'},r.sheets.map(s=>React.createElement('span',{key:s,className:'exsheet'},React.createElement(Icon,{name:'file-05',size:12}),'ชีท: '+s))),
                    r.note&&React.createElement('div',{className:'exreport-note'},React.createElement(Icon,{name:'info-circle',size:14}),React.createElement('span',null,r.note))
                  )
                );
              })
            )
          ),
          React.createElement('div',{className:'card exsection'},
            React.createElement('div',{className:'exsection-head'},
              React.createElement('span',{className:'exstep'},'3'),
              React.createElement('h3',null,'ขอบเขตข้อมูลและรูปแบบไฟล์')
            ),
            React.createElement('div',{className:'exradio-row',style:{marginBottom:'12px'}},
              EX_SCOPES.map(([k,label])=>React.createElement('button',{key:k,type:'button',className:'exradio'+(scope===k?' is-active':''),onClick:()=>setScope(k)},
                React.createElement('span',{className:'exradio-dot'}),label
              ))
            ),
            React.createElement('div',{className:'exradio-row'},
              EX_FORMATS.map(([k,label])=>React.createElement('button',{key:k,type:'button',className:'exradio'+(format===k?' is-active':''),onClick:()=>setFormat(k)},
                React.createElement('span',{className:'exradio-dot'}),label
              ))
            )
          )
        ),
        React.createElement('div',{className:'card exsummary'},
          React.createElement('h3',null,'สรุปรายการที่จะ Export'),
          React.createElement('p',{className:'exsummary-sub'},'ตรวจสอบก่อนสั่งดาวน์โหลด'),
          React.createElement('div',{className:'exsum-count'},
            React.createElement('strong',null,fileCount),
            React.createElement('span',null,'ไฟล์ '+(format==='xlsx'?'Excel':'PDF'))
          ),
          React.createElement('div',{className:'exsum-block'},
            React.createElement('div',{className:'exsum-label'},'ปีที่เลือก'),
            React.createElement('div',{className:'exsum-val'},years.length?years.map(y=>'ปี '+y).join(', '):React.createElement('span',{className:'exsum-empty'},'ยังไม่เลือกปี'))
          ),
          React.createElement('div',{className:'exsum-block'},
            React.createElement('div',{className:'exsum-label'},'ชุดรายงาน'),
            pickedReports.length?React.createElement('div',{className:'exsum-list'},
              pickedReports.map(r=>React.createElement('div',{key:r.key,className:'exsum-item'},React.createElement(Icon,{name:'check-circle',size:14}),r.title))
            ):React.createElement('span',{className:'exsum-empty'},'ยังไม่เลือกชุดรายงาน')
          ),
          React.createElement('div',{className:'exsum-block'},
            React.createElement('div',{className:'exsum-label'},'ขอบเขตข้อมูล'),
            React.createElement('div',{className:'exsum-val'},(EX_SCOPES.find(s=>s[0]===scope)||[])[1])
          ),
          React.createElement('div',{className:'exsum-block',style:{paddingBottom:0}},
            React.createElement('div',{className:'exsum-actions'},
              React.createElement(Button,{variant:'primary',size:'md',isDisabled:!ready,leadingIcon:React.createElement(Icon,{name:'download-01',size:16}),onClick:()=>ready&&setToast('กำลัง generate '+fileCount+' ไฟล์ — ระบบจะดาวน์โหลดให้อัตโนมัติ')},'Export ทั้งหมด'),
              React.createElement(Button,{variant:'secondary',size:'md',onClick:()=>{setYears([]);setReports([]);}},'ล้างค่า')
            )
          )
        )
      ),
      toast&&React.createElement('div',{className:'extoast'},React.createElement(Icon,{name:'check-circle',size:16}),toast)
    )
  );
}

export default App;
