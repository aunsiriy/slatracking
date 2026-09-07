'use client';

// Standardised single-select dropdown used across the app in place of the
// native <select> (whose option list can't be styled to match the design
// system). Renders its own trigger + a fixed-positioned panel so it never
// gets clipped by scroll containers. Exposed as window.SelectMenu.
//
// Props:
//   options   : array of { value, label } or plain strings
//   value     : current value (compared as string)
//   onChange  : (value) => void
//   placeholder, className, disabled, ariaLabel

const SELECT_MENU_CSS = `
.peasel{position:relative;display:block}
.peasel-trigger{width:100%;min-height:40px;padding:8px 12px;border:1px solid var(--pea-border-secondary);border-radius:8px;font-size:13.5px;font-family:inherit;color:var(--pea-text-primary);background:#fff;display:flex;align-items:center;justify-content:space-between;gap:8px;cursor:pointer;text-align:left;line-height:1.4}
.peasel-trigger:hover:not(:disabled){border-color:var(--pea-border-primary)}
.peasel-trigger:disabled{background:var(--pea-bg-secondary);color:var(--pea-text-tertiary);cursor:not-allowed}
.peasel-trigger.is-open{border-color:var(--pea-border-brand);box-shadow:0 0 0 3px var(--pea-bg-brand-primary)}
.peasel-label{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1;min-width:0}
.peasel-label.is-placeholder{color:var(--pea-text-placeholder)}
.peasel-chev{flex-shrink:0;color:var(--pea-text-tertiary)}
.peasel-panel{background:#fff;border:1px solid var(--pea-border-secondary);border-radius:10px;box-shadow:0 12px 28px rgba(16,24,40,.16);padding:6px;display:flex;flex-direction:column;gap:2px;z-index:1000;max-height:min(320px,60vh);overflow-y:auto}
.peasel-option{display:flex;align-items:center;justify-content:space-between;gap:10px;width:100%;padding:9px 10px;border:none;background:none;border-radius:7px;font-size:13.5px;font-family:inherit;color:var(--pea-text-primary);cursor:pointer;text-align:left;line-height:1.4}
.peasel-option:hover{background:var(--pea-bg-secondary-hover)}
.peasel-option.is-selected{color:var(--pea-text-brand-secondary);font-weight:600;background:var(--pea-bg-brand-primary)}
.peasel-option-check{flex-shrink:0;color:var(--pea-fg-brand-primary)}
.peasel-empty{padding:10px;font-size:13px;color:var(--pea-text-tertiary);text-align:center}
`;

function peaselEnsureStyle(){
  if(typeof document==='undefined')return;
  if(document.getElementById('peasel-css'))return;
  const el=document.createElement('style');
  el.id='peasel-css';
  el.textContent=SELECT_MENU_CSS;
  document.head.appendChild(el);
}

function SelectMenu({options,value,onChange,placeholder,className,disabled,ariaLabel,style}){
  peaselEnsureStyle();
  const [open,setOpen]=React.useState(false);
  const [rect,setRect]=React.useState(null);
  const ref=React.useRef(null);
  const triggerRef=React.useRef(null);
  const norm=(options||[]).map(o=>(o&&typeof o==='object')?{value:o.value,label:o.label==null?String(o.value):o.label}:{value:o,label:String(o)});
  React.useEffect(()=>{
    function onDoc(e){if(ref.current&&!ref.current.contains(e.target))setOpen(false);}
    function onKey(e){if(e.key==='Escape')setOpen(false);}
    document.addEventListener('mousedown',onDoc);
    document.addEventListener('keydown',onKey);
    return ()=>{document.removeEventListener('mousedown',onDoc);document.removeEventListener('keydown',onKey);};
  },[]);
  React.useEffect(()=>{
    if(!open)return;
    function pos(){if(triggerRef.current)setRect(triggerRef.current.getBoundingClientRect());}
    pos();
    window.addEventListener('scroll',pos,true);
    window.addEventListener('resize',pos);
    return ()=>{window.removeEventListener('scroll',pos,true);window.removeEventListener('resize',pos);};
  },[open]);
  const selected=norm.find(o=>String(o.value)===String(value));
  return React.createElement('div',{className:'peasel'+(className?' '+className:''),ref,style},
    React.createElement('button',{type:'button',ref:triggerRef,className:'peasel-trigger'+(open?' is-open':''),disabled:!!disabled,'aria-haspopup':'listbox','aria-expanded':open,'aria-label':ariaLabel,onClick:()=>{if(!disabled)setOpen(o=>!o);}},
      React.createElement('span',{className:'peasel-label'+(selected?'':' is-placeholder')},selected?selected.label:(placeholder||'เลือก')),
      React.createElement(Icon,{name:open?'chevron-up':'chevron-down',size:16,className:'peasel-chev'})
    ),
    open&&rect&&React.createElement('div',{className:'peasel-panel',role:'listbox',style:{position:'fixed',top:Math.round(rect.bottom+4),left:Math.round(rect.left),width:Math.round(Math.max(rect.width,140))}},
      norm.length?norm.map(o=>React.createElement('button',{
        key:String(o.value),type:'button',role:'option','aria-selected':String(o.value)===String(value),
        className:'peasel-option'+(String(o.value)===String(value)?' is-selected':''),
        onClick:()=>{if(onChange)onChange(o.value);setOpen(false);}
      },
        React.createElement('span',null,o.label),
        String(o.value)===String(value)&&React.createElement(Icon,{name:'check',size:14,className:'peasel-option-check'})
      )):React.createElement('div',{className:'peasel-empty'},'ไม่มีตัวเลือก')
    )
  );
}

if(typeof window!=='undefined'){window.SelectMenu=SelectMenu;peaselEnsureStyle();}
