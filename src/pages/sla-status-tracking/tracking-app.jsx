const {Button,Badge,Avatar,InputField}=window.DesignSystem_cbd181;

function Sidebar(){
  const [open,setOpen]=React.useState(true);
  return React.createElement('aside',{className:'tsb'},
    React.createElement('div',{className:'tsb-brand'},
      React.createElement('img',{src:'sla-logo.svg',alt:'SLA',className:'tsb-logo'}),
      React.createElement('span',{className:'tsb-brand-text'},'SLA Tracking')
    ),
    React.createElement('nav',{className:'tsb-nav'},
      React.createElement('a',{href:'#',className:'tsb-item'},React.createElement(Icon,{name:'layout-grid',size:19}),React.createElement('span',null,'แดชบอร์ด'),React.createElement(Icon,{name:'chevron-down',size:15,className:'tsb-item-chevron'})),
      React.createElement('div',{className:'tsb-group'},
        React.createElement(Button,{variant:'tertiary',size:'md',className:'tsb-item tsb-group-head',leadingIcon:React.createElement(Icon,{name:'clock',size:19}),trailingIcon:React.createElement(Icon,{name:open?'chevron-down':'chevron-right',size:15}),onClick:()=>setOpen(v=>!v)},'ติดตามสถานะ'),
        open&&React.createElement('div',{className:'tsb-sub'},
          window.NAV_ITEMS[1].children.map((c,i)=>React.createElement('a',{key:c.key,href:'#',className:'tsb-sub-item'+(i===0?' is-active':'')},c.label))
        )
      )
    ),
    React.createElement('div',{className:'tsb-footer'},
      React.createElement('a',{href:'#',className:'tsb-item'},React.createElement(Icon,{name:'book',size:19}),React.createElement('span',null,'คู่มือ')),
      React.createElement('a',{href:'#',className:'tsb-item'},React.createElement(Icon,{name:'alert-triangle',size:19}),React.createElement('span',null,'แจ้งปัญหาและข้อเสนอแนะ')),
      React.createElement('a',{href:'#',className:'tsb-item'},React.createElement(Icon,{name:'help-circle',size:19}),React.createElement('span',null,'FAQs'))
    )
  );
}

function TopBar(){
  return React.createElement('header',{className:'ttb'},
    React.createElement(Button,{variant:'tertiary',size:'sm',iconOnly:true,leadingIcon:React.createElement(Icon,{name:'layout-grid',size:19}),'aria-label':'เมนู'}),
    React.createElement('div',{className:'ttb-right'},
      React.createElement('div',{className:'icon-btn-wrap'},
        React.createElement(Button,{variant:'tertiary',size:'sm',iconOnly:true,leadingIcon:React.createElement(Icon,{name:'bell',size:19}),'aria-label':'การแจ้งเตือน'}),
        React.createElement('span',{className:'ttb-dot'})
      ),
      React.createElement(Avatar,{variant:'text',size:'sm',text:'มจ'})
    )
  );
}

function Breadcrumb(){
  return React.createElement('div',{className:'breadcrumb'},
    React.createElement('span',null,'ติดตามสถานะ'),
    React.createElement(Icon,{name:'chevron-right',size:14}),
    React.createElement('span',{className:'is-current'},'P2 : กระบวนการแก้กระแสไฟฟ้าขัดข้อง')
  );
}

function KpiCards(){
  return React.createElement('section',{className:'tkpi-grid'},
    window.KPI.map(k=>React.createElement('div',{key:k.key,className:'tkpi-card',style:{background:k.bg,borderColor:k.border}},
      React.createElement('span',{className:'tkpi-label'},k.label),
      React.createElement('span',{className:'tkpi-value',style:{color:k.color}},k.value)
    ))
  );
}

function SearchBar(){
  return React.createElement('div',{className:'card search-card'},
    React.createElement('div',{className:'search-row'},
      React.createElement('div',{className:'search-input-wrap'},
        React.createElement(InputField,{fieldType:'default',label:'ค้นหา',placeholder:'ค้นหาหมายเลขเหตุการณ์',size:'md',leadingIcon:React.createElement(Icon,{name:'search',size:18})})
      ),
      React.createElement('div',{className:'search-actions'},
        React.createElement(Button,{variant:'secondary',size:'md',leadingIcon:React.createElement(Icon,{name:'settings',size:16})},'ตัวกรอง ',React.createElement('span',{className:'filter-count'},'3')),
        React.createElement(Button,{variant:'primary',size:'md',leadingIcon:React.createElement(Icon,{name:'search',size:16})},'ค้นหา')
      )
    )
  );
}

function FilterChips(){
  return React.createElement('div',{className:'filter-row'},
    React.createElement('span',{className:'filter-row-label'},'ตัวกรอง :'),
    window.FILTERS.map((f,i)=>React.createElement('span',{key:i,className:'filter-chip'},f,React.createElement(Icon,{name:'x',size:14}))),
    React.createElement('div',{className:'filter-spacer'}),
    React.createElement(Button,{variant:'secondary',size:'sm',trailingIcon:React.createElement(Icon,{name:'chevron-down',size:15})},React.createElement(Icon,{name:'download',size:16}),' ส่งออกข้อมูล')
  );
}

function Tabs({active,setActive}){
  return React.createElement('div',{className:'tabs-row'},
    window.TABS.map(t=>React.createElement(Button,{key:t.key,variant:'tertiary',size:'md',className:'tab-btn'+(active===t.key?' is-active':''),onClick:()=>setActive(t.key)},
      t.label,React.createElement('span',{className:'tab-count'},t.count)
    ))
  );
}

function DataTable(){
  const cols=['ลำดับ','หมายเลขเหตุการณ์','กฟภ. ที่รับผิดชอบ','วันที่เริ่มดับไฟ','สถานะคำร้อง','สถานะ SLA'];
  return React.createElement('table',{className:'data-table'},
    React.createElement('thead',null,React.createElement('tr',null,
      cols.map(c=>React.createElement('th',{key:c},c,React.createElement(Icon,{name:'chevron-down',size:13,className:'th-sort'})))
    )),
    React.createElement('tbody',null,
      window.ROWS.map(r=>{
        const tag=window.slaTag(r.sla);
        return React.createElement('tr',{key:r.id},
          React.createElement('td',null,r.id),
          React.createElement('td',null,React.createElement('a',{href:'#',className:'case-link'},r.caseNo)),
          React.createElement('td',null,r.ba),
          React.createElement('td',null,r.date),
          React.createElement('td',null,r.status),
          React.createElement('td',null,React.createElement('span',{className:'sla-pill',style:{background:tag.bg,color:tag.color}},tag.label))
        );
      })
    )
  );
}

function TablePagination(){
  return React.createElement('div',{className:'pagination-row'},
    React.createElement('div',{className:'pagination-info'},
      'แสดง 1 ถึง 10 จาก 106 รายการ ',
      React.createElement('select',null,React.createElement('option',null,'10'))
    ),
    React.createElement('div',{className:'pagination-controls'},
      ['«','‹','1','2','…','10','11','»'].map((p,i)=>React.createElement(Button,{key:i,variant:'tertiary',size:'sm',className:'page-btn'+(p==='1'?' is-active':'')},p))
    )
  );
}

function App(){
  const [tab,setTab]=React.useState('all');
  return React.createElement('div',{className:'shell'},
    React.createElement(Sidebar,null),
    React.createElement('div',{className:'main-col'},
      React.createElement(TopBar,null),
      React.createElement('main',{className:'content'},
        React.createElement(Breadcrumb,null),
        React.createElement('h1',{className:'page-title'},'P2 : กระบวนการแก้กระแสไฟฟ้าขัดข้อง'),
        React.createElement(KpiCards,null),
        React.createElement(SearchBar,null),
        React.createElement(FilterChips,null),
        React.createElement('div',{className:'card table-card'},
          React.createElement(Tabs,{active:tab,setActive:setTab}),
          React.createElement('div',{className:'table-scroll'},React.createElement(DataTable,null)),
          React.createElement(TablePagination,null)
        )
      )
    )
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
