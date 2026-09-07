import Image from 'next/image';
import Link from 'next/link';
const {Button,Checkbox,Textarea,InputField}=window.DesignSystem_cbd181;

function TopBar(){
  return React.createElement('header',{className:'qtop'},
    React.createElement('div',{className:'qtop-left'},
      React.createElement(Link,{className:'qtop-back',href:'/p1-p11-overview'},React.createElement(Icon,{name:'chevron-left',size:16}),'กลับ'),
      React.createElement('span',{className:'qtop-divider'}),
      React.createElement(Image,{className:'qtop-logo',src:'/assets/sla-logo-checkmark.png',alt:'SLA',width:36,height:36}),
      React.createElement('div',{className:'qtop-word'},
        React.createElement('span',{className:'qtop-title'},'PEA-SLA Tracking System'),
        React.createElement('span',{className:'qtop-sub'},'ข้อเสนอโอกาสในการปรับปรุงกระบวนการ (QIR)')
      )
    )
  );
}

function Breadcrumb(){
  return React.createElement('div',{className:'qbreadcrumb'},
    React.createElement(Link,{href:'/'},'ข้อเสนอโอกาสการปรับปรุงฯ (QIR)'),
    React.createElement(Icon,{name:'chevron-right',size:13}),
    React.createElement(Link,{href:'/p1-p11-overview'},'P1-P11 / QIR ประจำปี'),
    React.createElement(Icon,{name:'chevron-right',size:13}),
    React.createElement('span',{className:'is-current'},'ข้อเสนอโอกาสในการปรับปรุงกระบวนการ (QIR)')
  );
}

function CriteriaList(){
  const [checked,setChecked]=React.useState({2:true});
  function toggle(id){setChecked(c=>({...c,[id]:!c[id]}));}
  return React.createElement('div',{className:'qcriteria'},
    window.QIR_CRITERIA.map(c=>React.createElement('div',{key:c.id,className:'qcriteria-group'},
      React.createElement(Checkbox,{label:c.label,checked:!!checked[c.id],onChange:()=>toggle(c.id)}),
      c.children&&React.createElement('div',{className:'qcriteria-children'},
        c.children.map(ch=>React.createElement(Checkbox,{key:ch.id,label:ch.label,checked:!!checked[ch.id],onChange:()=>toggle(ch.id)}))
      )
    ))
  );
}

function SuggestionList(){
  const [checked,setChecked]=React.useState({1:true});
  const [details,setDetails]=React.useState({});
  function toggle(id){setChecked(c=>({...c,[id]:!c[id]}));}
  function setDetail(id,field,value){setDetails(d=>({...d,[id]:{...d[id],[field]:value}}));}
  return React.createElement('div',{className:'qsuggestions'},
    window.QIR_SUGGESTIONS.map(s=>React.createElement('div',{key:s.id,className:'qsuggestion-group'},
      React.createElement(Checkbox,{label:s.label,checked:!!checked[s.id],onChange:()=>toggle(s.id)}),
      checked[s.id]&&React.createElement('div',{className:'qsuggestion-detail'},
        React.createElement(Textarea,{label:'วัตถุประสงค์',value:(details[s.id]||{}).goal||'',onChange:v=>setDetail(s.id,'goal',v)}),
        React.createElement(Textarea,{label:'เหตุผลในการปรับปรุง',value:(details[s.id]||{}).reason||'',onChange:v=>setDetail(s.id,'reason',v)}),
        React.createElement(Textarea,{label:'วิธีการแก้ไข',value:(details[s.id]||{}).method||'',onChange:v=>setDetail(s.id,'method',v)})
      )
    ))
  );
}

const QA_PROCESS_OPTIONS=['E6.2 กระบวนการบริหารจัดการโครงการ','E6.3 กระบวนการพัฒนาระบบดิจิทัล'];

function ActivityTable(){
  const [proposal,setProposal]=React.useState('');
  const [processKey,setProcessKey]=React.useState(QA_PROCESS_OPTIONS[0]);
  const [rows,setRows]=React.useState([{id:1,activity:'',weight:''}]);
  const total=rows.reduce((s,r)=>s+(Number(r.weight)||0),0);
  function update(id,field,value){setRows(rows.map(r=>r.id===id?{...r,[field]:value}:r));}
  function addRow(){setRows([...rows,{id:Date.now(),activity:'',weight:''}]);}
  function removeRow(id){setRows(rows.length>1?rows.filter(r=>r.id!==id):rows);}
  return React.createElement('div',{className:'qactivity'},
    React.createElement('div',{className:'qfield'},
      React.createElement('span',{className:'qfield-label'},'ข้อเสนอโอกาสในการปรับปรุงกระบวนการ (QIR)'),
      React.createElement(InputField,{fieldType:'default',size:'sm',placeholder:'ระบุข้อเสนอโอกาสในการปรับปรุงกระบวนการ',value:proposal,onChange:setProposal})
    ),
    React.createElement('div',{className:'qfield'},
      React.createElement('span',{className:'qfield-label'},'สอดคล้องกับกระบวนการ'),
      React.createElement(window.SelectMenu,{value:processKey,onChange:setProcessKey,options:QA_PROCESS_OPTIONS})
    ),
    rows.every(r=>!r.activity)&&React.createElement('div',{className:'qactivity-warn'},'กรุณาเพิ่มกิจกรรมอย่างน้อย 1 รายการ'),
    React.createElement('table',{className:'qtable'},
      React.createElement('thead',null,React.createElement('tr',null,
        React.createElement('th',null,'รายการ'),React.createElement('th',null,'กิจกรรมที่จะดำเนินการ'),
        React.createElement('th',null,'น้ำหนัก'),React.createElement('th',null)
      )),
      React.createElement('tbody',null,rows.map((r,i)=>React.createElement('tr',{key:r.id},
        React.createElement('td',null,i+1),
        React.createElement('td',null,
          React.createElement(InputField,{fieldType:'default',size:'sm',placeholder:'กรุณาระบุกิจกรรม',value:r.activity,onChange:v=>update(r.id,'activity',v)})
        ),
        React.createElement('td',{className:'qweight-cell'},React.createElement(InputField,{fieldType:'default',size:'sm',value:String(r.weight),onChange:v=>update(r.id,'weight',v.replace(/[^0-9]/g,''))})),
        React.createElement('td',null,React.createElement('button',{className:'qrow-remove',onClick:()=>removeRow(r.id)},React.createElement(Icon,{name:'x',size:15})))
      )))
    ),
    React.createElement('button',{type:'button',className:'qactivity-add-link',onClick:addRow},React.createElement(Icon,{name:'plus',size:14}),'เพิ่มกิจกรรม'),
    React.createElement('div',{className:'qactivity-footer'},
      React.createElement('span',null,'Info :: น้ำหนักรวมกัน ไม่เกิน 100'),
      React.createElement('div',{className:'qactivity-footer-total'},
        React.createElement('span',{className:'qactivity-total-value'+(total===100?' is-ok':total>100?' is-error':'')},total),
        React.createElement('span',{className:'qactivity-status'+(total===100?' is-ok':' is-error')},
          React.createElement(Icon,{name:total===100?'check':'alert-triangle',size:14}),
          total===100?'น้ำหนักรวมครบ 100':total>100?'กรุณาปรับแก้':'ยังไม่ครบ'
        )
      )
    )
  );
}

function App(){
  const m=window.QIR_ANNUAL_META;
  return React.createElement(React.Fragment,null,
    React.createElement(TopBar),
    React.createElement('main',{className:'qcontent'},
      React.createElement(Breadcrumb),
      React.createElement('div',{className:'qpage-head'},
        React.createElement('div',null,
          React.createElement('h1',null,m.division),
          React.createElement('p',null,'ข้อเสนอโอกาสในการปรับปรุงกระบวนการ (QIR) ประจำปี '+m.year)
        ),
        React.createElement('button',{className:'qexport-btn'},'ส่งออกข้อมูล',React.createElement(Icon,{name:'chevron-down',size:14}))
      ),
      React.createElement('div',{className:'card qsection'},
        React.createElement('div',{className:'qsection-head'},
          React.createElement('h3',null,'กระบวนงาน'),
          React.createElement('p',{className:'qsection-hint'},'กระบวนงานและหลักเกณฑ์การพิจารณาคัดเลือก QIR')
        ),
        React.createElement('div',{className:'qfield'},
          React.createElement('span',{className:'qfield-label'},'กระบวนงาน ',React.createElement('span',{className:'qrequired'},'*')),
          React.createElement('div',{className:'qfield-static'},m.process)
        ),
        React.createElement('div',{className:'qfield'},
          React.createElement('span',{className:'qfield-label'},'หลักเกณฑ์ (Criteria) การพิจารณาคัดเลือก QIR ดังนี้ ',React.createElement('span',{className:'qrequired'},'*')),
          React.createElement('span',{className:'qfield-hint'},'(เลือกอย่างน้อย 1 ข้อ)'),
          React.createElement(CriteriaList)
        )
      ),
      React.createElement('div',{className:'card qsection'},
        React.createElement('div',{className:'qsection-head'},
          React.createElement('h3',null,'ข้อเสนอแนะ'),
          React.createElement('p',{className:'qsection-hint'},'เสนอแนะอย่างน้อย 1 ด้าน')
        ),
        React.createElement(SuggestionList)
      ),
      React.createElement('div',{className:'card qsection'},
        React.createElement('div',{className:'qsection-head'},
          React.createElement('h3',null,'กิจกรรม/ขั้นตอน ที่จะดำเนินการ ',React.createElement('span',{className:'qrequired'},'*')),
          React.createElement('p',{className:'qsection-hint'},'ผลรวมน้ำหนักต้องเท่ากับ 100')
        ),
        React.createElement(ActivityTable)
      ),
      React.createElement('div',{className:'qform-footer'},
        React.createElement(Button,{variant:'secondary',size:'md',onClick:()=>{window.location.href='/p1-p11-overview';}},'ย้อนกลับ'),
        React.createElement(Button,{variant:'primary',size:'md'},'บันทึก')
      )
    )
  );
}

export default App;
