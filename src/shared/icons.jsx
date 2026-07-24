const ICON_MAP = {
'building':'building-02','file-text':'file-02','book':'book-open-01','chevron-right':'chevron-right',
'chevron-down':'chevron-down','bell':'bell-01','search':'search','clock':'clock','calendar':'calendar',
'check':'check','alert-triangle':'alert-triangle','lock':'lock-01','lock-open':'lock-unlocked-01',
'edit':'edit-02','corner-up-left':'corner-up-left','shield-check':'shield-tick','users':'users-01',
'list-check':'clipboard-check','dots-vertical':'dots-vertical','x':'x','arrow-right':'arrow-right','external-link':'link-external-01','download':'download-01','layout-grid':'layout-grid-01',
'settings':'settings-01','help-circle':'help-circle','home':'home-02','sparkles':'stars-01',
'trending-up':'trend-up-01','map-pin':'marker-pin-01','trash':'trash-01','plus':'plus','filter':'filter-lines','tool':'tool-01'
};
function Icon({name,size=20,className='',style}){
  const cls=ICON_MAP[name]||name;
  return React.createElement('span',{className:'icon '+cls+(className?' '+className:''),style:{width:size,height:size,display:'inline-block',flexShrink:0,...style},'aria-hidden':'true'});
}
Object.assign(window,{Icon});
