// Builds the pdfmake docDefinition for the Learning Form's "Export PDF" feature, matching
// the PEA_Learning_Form Word template's layout (purple header bars, bordered tables with
// merged cells, Sarabun font). Kept as a pure data-in/docDefinition-out module — no DOM,
// no fetch — so it can be exercised identically from the browser (learning-form-app.jsx)
// and from a plain Node script for visual regression checks against the template.
//
// Phase 1 covers ส่วนที่ 0 (ข้อมูลพื้นฐาน) and ส่วนที่ 1 (แผนภาพก่อนปรับปรุง) only; the
// remaining sections (2-6) are added in later phases following the same conventions.

var LF_PDF_PURPLE = '#68349A';
var LF_PDF_FONT = 'Sarabun';

function lfPdfHeaderBar(text) {
  return {
    table: { widths: ['*'], body: [[{ text: text, fillColor: LF_PDF_PURPLE, color: '#fff', bold: true, alignment: 'center', fontSize: 13, margin: [0, 4, 0, 4] }]] },
    layout: { hLineWidth: function () { return 1; }, vLineWidth: function () { return 1; }, hLineColor: function () { return '#000'; }, vLineColor: function () { return '#000'; } },
    margin: [0, 0, 0, 0]
  };
}

function lfPdfValueCell(text) {
  return { text: text || '-', fontSize: 10, margin: [6, 6, 6, 6] };
}
function lfPdfSubLabelCell(text) {
  return { text: text, bold: true, fontSize: 10, margin: [6, 6, 6, 6], fillColor: '#fff', noWrap: true };
}

var LF_PDF_TABLE_BORDER = { hLineWidth: function () { return 1; }, vLineWidth: function () { return 1; }, hLineColor: function () { return '#000'; }, vLineColor: function () { return '#000'; } };
var LF_PDF_YELLOW = '#FAE495';
var LF_PDF_LAVENDER = '#D0B9E6';

// Renders a fixed option list as plain-text checkboxes ("[x] label" / "[ ] label") — safe
// with any font, unlike Unicode ☑/☐ glyphs which aren't guaranteed to be in every typeface.
function lfPdfCheckLines(options, selectedKeys) {
  var sel = selectedKeys || [];
  return options.map(function (o) { return (sel.indexOf(o.key) > -1 ? '[x] ' : '[ ] ') + o.label; }).join('\n');
}
function lfPdfGroupBar(text, colSpan, fillColor) {
  var row = [{ text: text, fillColor: fillColor, bold: true, alignment: 'center', fontSize: 10.5, margin: [4, 4, 4, 4], colSpan: colSpan }];
  for (var i = 1; i < colSpan; i++) row.push({});
  return row;
}

// ส่วนที่ 0 — ข้อมูลพื้นฐานการประเมินและปรับปรุงกระบวนการ
function lfPdfBuildMetaSection(data) {
  var baOptions = data.baOptions || [];
  var processNames = baOptions.map(function (o) { return o.label; }).join('\n');
  var objectivesList = baOptions.map(function (o, i) { return (i + 1) + '. ' + (o.objective || '-'); }).join('\n');

  function personRows(label, person, rowSpan) {
    return [
      { text: label, fillColor: LF_PDF_PURPLE, color: '#fff', bold: true, fontSize: 10, margin: [6, 6, 6, 6], rowSpan: rowSpan || 1, noWrap: true },
      lfPdfValueCell(person.name),
      lfPdfSubLabelCell('ตำแหน่ง :'),
      lfPdfValueCell(person.position),
      lfPdfSubLabelCell('รหัสพนักงาน :'),
      lfPdfValueCell(person.empId),
      lfPdfSubLabelCell('โทร :'),
      lfPdfValueCell(person.tel)
    ];
  }
  function personContinuationRows(person) {
    return [
      {}, lfPdfValueCell(person.name),
      lfPdfSubLabelCell('ตำแหน่ง :'), lfPdfValueCell(person.position),
      lfPdfSubLabelCell('รหัสพนักงาน :'), lfPdfValueCell(person.empId),
      lfPdfSubLabelCell('โทร :'), lfPdfValueCell(person.tel)
    ];
  }

  var participants = data.meta.participants && data.meta.participants.length ? data.meta.participants : [{ name: '-', position: '-', empId: '-', tel: '-' }];
  var body = [
    [{ text: 'ชื่อกระบวนการ :', fillColor: LF_PDF_PURPLE, color: '#fff', bold: true, fontSize: 10, margin: [6, 6, 6, 6] }, { text: processNames, fontSize: 10, margin: [6, 6, 6, 6], colSpan: 7 }, {}, {}, {}, {}, {}, {}],
    [{ text: 'วัตถุประสงค์ของกระบวนการ :', fillColor: LF_PDF_PURPLE, color: '#fff', bold: true, fontSize: 10, margin: [6, 6, 6, 6], colSpan: 8 }, {}, {}, {}, {}, {}, {}, {}],
    [{ text: objectivesList, fontSize: 10, margin: [6, 6, 6, 6], colSpan: 8 }, {}, {}, {}, {}, {}, {}, {}],
    personRows('ผู้บันทึกข้อมูล :', data.recorder),
    personRows('ผู้ตรวจสอบข้อมูล :', data.meta.reviewer),
    personRows('ผู้อนุมัติข้อมูล :', data.meta.approver)
  ];
  participants.forEach(function (p, i) {
    body.push(i === 0 ? personRows('ผู้เข้าร่วมจัดทำ :', p, participants.length) : personContinuationRows(p));
  });
  body.push([{ text: 'หน่วยงานผู้รับผิดชอบ :', fillColor: LF_PDF_PURPLE, color: '#fff', bold: true, fontSize: 10, margin: [6, 6, 6, 6], colSpan: 8 }, {}, {}, {}, {}, {}, {}, {}]);
  body.push([{ text: data.meta.division || '-', fontSize: 10, margin: [6, 6, 6, 6], colSpan: 8 }, {}, {}, {}, {}, {}, {}, {}]);

  return [
    lfPdfHeaderBar('การประเมินและปรับปรุงกระบวนการ'),
    {
      // Fixed pixel widths throughout (never '*' — pdfmake's star-column sizing silently
      // overflows the page with long/multi-line cell text) and always a bit LESS than the
      // page's full content width (712pt here) — summing to the exact width also overflows,
      // confirmed via a minimal repro. Leaving ~20pt of slack avoids both failure modes.
      table: { widths: [108, 258, 48, 66, 78, 56, 36, 42], body: body, dontBreakRows: true },
      layout: LF_PDF_TABLE_BORDER,
      margin: [0, 0, 0, 0]
    }
  ];
}

// ส่วนที่ 2 — ผลการดำเนินงานตามตัวชี้วัด (Leading/Lagging) ย้อนหลัง 3 ปี + ประเด็นพิจารณา
function lfPdfMetricRow(item, data) {
  var stepLines = [item.subProcess || '-', '', '[' + (item.isCritical ? 'x' : ' ') + '] Critical point', '[' + (item.isControl ? 'x' : ' ') + '] Control Point'].join('\n');
  var analysisCell, planCell;
  if (item.isControl) {
    analysisCell = { text: lfPdfCheckLines(data.controlCriteria, item.controlCriteria), fontSize: 9, margin: [5, 5, 5, 5] };
    planCell = { text: item.controlFix || '-', fontSize: 9, margin: [5, 5, 5, 5] };
  } else {
    var analysisSel = item.analysisList && item.analysisList.length ? item.analysisList : (item.analysis ? [item.analysis] : []);
    analysisCell = { text: lfPdfCheckLines(data.analysisOptions, analysisSel) + '\n\n' + (item.analysisDetail || '-'), fontSize: 9, margin: [5, 5, 5, 5] };
    planCell = { text: lfPdfCheckLines(data.followupOptions, item.followup) + '\n\n' + (item.improvementDetail || '-'), fontSize: 9, margin: [5, 5, 5, 5] };
  }
  return [
    { text: stepLines, fontSize: 9, margin: [5, 5, 5, 5] },
    { text: item.metric || '-', fontSize: 9, margin: [5, 5, 5, 5] },
    { text: item.competitorTarget || '-', fontSize: 9, margin: [5, 5, 5, 5] },
    { text: item.target || '-', fontSize: 9, margin: [5, 5, 5, 5] },
    { text: item.result2568 || '-', fontSize: 9, margin: [5, 5, 5, 5] },
    { text: item.result2567 || '-', fontSize: 9, margin: [5, 5, 5, 5] },
    { text: item.result2566 || '-', fontSize: 9, margin: [5, 5, 5, 5] },
    analysisCell, planCell
  ];
}
function lfPdfBuildMetricsSection(data) {
  var widths = [100, 140, 55, 50, 45, 45, 45, 106, 106];
  var body = [
    [
      { text: 'ขั้นตอน', fillColor: LF_PDF_PURPLE, color: '#fff', bold: true, fontSize: 9.5, margin: [5, 8, 5, 8] },
      { text: 'ตัวชี้วัด', fillColor: LF_PDF_PURPLE, color: '#fff', bold: true, fontSize: 9.5, margin: [5, 8, 5, 8] },
      { text: 'ผลเทียบคู่แข่ง/คู่เทียบ', fillColor: LF_PDF_PURPLE, color: '#fff', bold: true, fontSize: 8.5, margin: [4, 8, 4, 8] },
      { text: 'เป้าหมายปี ' + data.year, fillColor: LF_PDF_PURPLE, color: '#fff', bold: true, fontSize: 8.5, margin: [4, 8, 4, 8] },
      { text: data.year, fillColor: LF_PDF_PURPLE, color: '#fff', bold: true, fontSize: 9.5, margin: [4, 8, 4, 8] },
      { text: String(Number(data.year) - 1), fillColor: LF_PDF_PURPLE, color: '#fff', bold: true, fontSize: 9.5, margin: [4, 8, 4, 8] },
      { text: String(Number(data.year) - 2), fillColor: LF_PDF_PURPLE, color: '#fff', bold: true, fontSize: 9.5, margin: [4, 8, 4, 8] },
      { text: 'ผลการวิเคราะห์', fillColor: LF_PDF_PURPLE, color: '#fff', bold: true, fontSize: 9.5, margin: [5, 8, 5, 8] },
      { text: 'แนวทางการพัฒนา/ปรับปรุง', fillColor: LF_PDF_PURPLE, color: '#fff', bold: true, fontSize: 9.5, margin: [5, 8, 5, 8] }
    ]
  ];
  body.push(lfPdfGroupBar('ตัวชี้วัดประสิทธิภาพ / ตัวชี้วัดนำ (Leading)', widths.length, LF_PDF_YELLOW));
  (data.leading || []).forEach(function (item) { body.push(lfPdfMetricRow(item, data)); });
  body.push(lfPdfGroupBar('ตัวชี้วัดประสิทธิผล / ตัวชี้วัดตาม (Lagging)', widths.length, LF_PDF_LAVENDER));
  (data.lagging || []).forEach(function (item) { body.push(lfPdfMetricRow(item, data)); });

  return [
    lfPdfHeaderBar('2. ผลการดำเนินงานตามตัวชี้วัดประสิทธิภาพ/ตัวชี้วัดนำ (Leading) และตัวชี้วัดประสิทธิผล/ตัวชี้วัดตาม (Lagging)\nย้อนหลัง 3 ปี และประเด็นพิจารณาสำหรับการประเมินและปรับปรุงกระบวนการ'),
    { table: { widths: widths, headerRows: 1, body: body, dontBreakRows: true }, layout: LF_PDF_TABLE_BORDER }
  ];
}

// ส่วนที่ 1 / ส่วนที่ 4 — แผนภาพกระบวนการ (ก่อน/หลังการปรับปรุง), shared layout
function lfPdfBuildDiagramSection(headerText, file) {
  var boxContent;
  if (file && file.base64) {
    boxContent = { image: file.base64, fit: [600, 280], alignment: 'center' };
  } else {
    boxContent = { text: 'ไม่ได้แนบแผนภาพ', alignment: 'center', color: '#888', italics: true, fontSize: 12 };
  }
  return [
    lfPdfHeaderBar(headerText),
    {
      table: {
        widths: ['*'],
        heights: [320],
        body: [[{ stack: [boxContent], alignment: 'center', margin: [0, 110, 0, 0] }]]
      },
      layout: LF_PDF_TABLE_BORDER
    }
  ];
}

// ส่วนที่ 3 — ประเด็นพิจารณาสำหรับการประเมินและปรับปรุงกระบวนการและจัดลำดับความสำคัญ
function lfPdfBuildIssuesSection(data) {
  var widths = [110, 186, 186, 140, 70];
  var body = [
    [
      { text: 'ประเด็นพิจารณา', fillColor: LF_PDF_PURPLE, color: '#fff', bold: true, fontSize: 10, margin: [5, 7, 5, 7] },
      { text: 'ผลการวิเคราะห์', fillColor: LF_PDF_PURPLE, color: '#fff', bold: true, fontSize: 10, margin: [5, 7, 5, 7] },
      { text: 'แนวทางการพัฒนา/ปรับปรุง', fillColor: LF_PDF_PURPLE, color: '#fff', bold: true, fontSize: 10, margin: [5, 7, 5, 7] },
      { text: 'ชื่อกระบวนการที่ปรับปรุง', fillColor: LF_PDF_PURPLE, color: '#fff', bold: true, fontSize: 10, margin: [5, 7, 5, 7] },
      { text: 'ปีที่ดำเนินการ', fillColor: LF_PDF_PURPLE, color: '#fff', bold: true, fontSize: 10, margin: [5, 7, 5, 7] }
    ]
  ];
  var baByKey = {};
  (data.baOptions || []).forEach(function (o) { baByKey[o.key] = o.label; });
  (data.issues || []).forEach(function (it) {
    var procKeys = it.improveProcesses || [];
    var procLabels = procKeys.map(function (k) { return k === 'other' ? (it.improveOther || 'อื่นๆ') : (baByKey[k] || k); });
    body.push([
      { text: it.title, fontSize: 9.5, margin: [5, 6, 5, 6] },
      { text: it.analysis || '-', fontSize: 9.5, margin: [5, 6, 5, 6] },
      { text: it.direction || '-', fontSize: 9.5, margin: [5, 6, 5, 6] },
      { text: procLabels.length ? procLabels.join('\n') : '-', fontSize: 9.5, margin: [5, 6, 5, 6] },
      { text: it.improveYear ? 'พ.ศ. ' + it.improveYear : '-', fontSize: 9.5, margin: [5, 6, 5, 6] }
    ]);
  });
  var out = [
    lfPdfHeaderBar('3. ประเด็นพิจารณาสำหรับการประเมินและปรับปรุงกระบวนการและจัดลำดับความสำคัญของแนวทางการพัฒนา/ปรับปรุง'),
    { table: { widths: widths, headerRows: 1, body: body, dontBreakRows: true }, layout: LF_PDF_TABLE_BORDER }
  ];

  // QIR — บันทึกกิจกรรมที่จะดำเนินการ (ไม่มีหน้าต้นแบบแนบมาให้ จึงออกแบบให้อยู่ในภาษาเดียวกับส่วนอื่น)
  (data.qirGroups || []).forEach(function (g) {
    var qirWidths = [40, 597, 55];
    var qirBody = [[
      { text: 'กิจกรรมที่จะดำเนินการ', fillColor: LF_PDF_PURPLE, color: '#fff', bold: true, fontSize: 9.5, margin: [5, 6, 5, 6], colSpan: 2 }, {},
      { text: 'น้ำหนัก', fillColor: LF_PDF_PURPLE, color: '#fff', bold: true, fontSize: 9.5, margin: [5, 6, 5, 6] }
    ]];
    (g.rows || []).forEach(function (r, i) {
      qirBody.push([
        { text: String(i + 1), fontSize: 9.5, margin: [5, 6, 5, 6] },
        { text: r.activity || '-', fontSize: 9.5, margin: [5, 6, 5, 6], colSpan: 1 },
        { text: String(r.weight != null ? r.weight : '-'), fontSize: 9.5, margin: [5, 6, 5, 6] }
      ]);
    });
    var procLabel = g.processKey === 'other' ? (g.processOther || 'อื่นๆ') : (baByKey[g.processKey] || g.processKey);
    out.push({ text: 'QIR — บันทึกกิจกรรมที่จะดำเนินการ', bold: true, fontSize: 11, margin: [0, 14, 0, 6] });
    out.push({
      table: {
        widths: [346, 346],
        body: [[
          { text: 'ข้อเสนอโอกาสในการปรับปรุงกระบวนการ (QIR):\n' + (g.issueText || '-'), fontSize: 9.5, margin: [6, 6, 6, 6] },
          { text: 'สอดคล้องกับกระบวนการ: ' + procLabel + '\n\nหลักเกณฑ์ (Criteria):\n' + lfPdfCheckLines(data.qirCriteriaOptions, g.criteria), fontSize: 9.5, margin: [6, 6, 6, 6] }
        ]]
      },
      layout: LF_PDF_TABLE_BORDER,
      margin: [0, 0, 0, 8]
    });
    out.push({ table: { widths: qirWidths, body: qirBody }, layout: LF_PDF_TABLE_BORDER });
  });
  return out;
}

// ส่วนที่ 5 — การกำหนดตัวชี้วัดและเป้าหมายของกระบวนการ ประจำปี (ปีปัจจุบัน / ปีถัดไป)
function lfPdfNextYearTable(leadingRows, laggingRows, targetLabel) {
  var widths = [150, 432, 110];
  var body = [[
    { text: 'ขั้นตอน', fillColor: LF_PDF_PURPLE, color: '#fff', bold: true, fontSize: 9.5, margin: [5, 6, 5, 6] },
    { text: 'ตัวชี้วัด', fillColor: LF_PDF_PURPLE, color: '#fff', bold: true, fontSize: 9.5, margin: [5, 6, 5, 6] },
    { text: targetLabel, fillColor: LF_PDF_PURPLE, color: '#fff', bold: true, fontSize: 9.5, margin: [5, 6, 5, 6] }
  ]];
  body.push(lfPdfGroupBar('ตัวชี้วัดประสิทธิภาพ/ตัวชี้วัดนำ (Leading)', widths.length, LF_PDF_LAVENDER));
  leadingRows.forEach(function (r) {
    body.push([{ text: r.subProcess || r.step || '-', fontSize: 9.5, margin: [5, 6, 5, 6] }, { text: r.metric || '-', fontSize: 9.5, margin: [5, 6, 5, 6] }, { text: r.target || '-', fontSize: 9.5, margin: [5, 6, 5, 6] }]);
  });
  body.push(lfPdfGroupBar('ตัวชี้วัดประสิทธิผล/ตัวชี้วัดตาม (Lagging)', widths.length, LF_PDF_LAVENDER));
  laggingRows.forEach(function (r) {
    body.push([{ text: r.subProcess || r.step || '-', fontSize: 9.5, margin: [5, 6, 5, 6] }, { text: r.metric || '-', fontSize: 9.5, margin: [5, 6, 5, 6] }, { text: r.target || '-', fontSize: 9.5, margin: [5, 6, 5, 6] }]);
  });
  return { table: { widths: widths, headerRows: 1, body: body, dontBreakRows: true }, layout: LF_PDF_TABLE_BORDER };
}
function lfPdfBuildNextYearSection(data) {
  return [
    lfPdfHeaderBar('5. การกำหนดตัวชี้วัดและเป้าหมายของกระบวนการ ประจำปี'),
    { text: 'ปีปัจจุบัน', bold: true, fontSize: 11, margin: [0, 6, 0, 6] },
    lfPdfNextYearTable(data.leadingCurrent, data.laggingCurrent, 'เป้าหมายปัจจุบัน'),
    { text: 'ปีถัดไป', bold: true, fontSize: 11, margin: [0, 14, 0, 6] },
    lfPdfNextYearTable(data.leadingNext, data.laggingNext, 'เป้าหมายปีถัดไป')
  ];
}

// ส่วนที่ 6 — องค์ความรู้ที่ใช้ / องค์ความรู้ใหม่ที่เกิดขึ้นจากการปรับปรุงกระบวนการ
function lfPdfBuildKnowledgeSection(data) {
  var widths = [173, 173, 173, 173];
  var body = [[
    { text: 'หัวข้อองค์ความรู้', fillColor: LF_PDF_PURPLE, color: '#fff', bold: true, fontSize: 10, margin: [5, 7, 5, 7] },
    { text: 'ที่อยู่ในการจัดเก็บ', fillColor: LF_PDF_PURPLE, color: '#fff', bold: true, fontSize: 10, margin: [5, 7, 5, 7] },
    { text: 'รูปแบบ/วิธีการในการแลกเปลี่ยนเรียนรู้', fillColor: LF_PDF_PURPLE, color: '#fff', bold: true, fontSize: 10, margin: [5, 7, 5, 7] },
    { text: 'ผลลัพธ์การแลกเปลี่ยนเรียนรู้', fillColor: LF_PDF_PURPLE, color: '#fff', bold: true, fontSize: 10, margin: [5, 7, 5, 7] }
  ]];
  (data.rows || []).forEach(function (r) {
    var topicLines = (r.entries || []).map(function (e) {
      return (e.knowType === 'new' ? 'องค์ความรู้ใหม่: ' : 'องค์ความรู้เดิม: ') + (e.name || '-');
    }).join('\n');
    var locLines = (r.entries || []).map(function (e) {
      return lfPdfCheckLines(data.locationOptions, e.location) + (e.location && e.location.indexOf('other') > -1 ? ' (' + (e.locationOther || '-') + ')' : '');
    }).join('\n\n');
    var outcomeExtra = '\n\n' + (data.outcomesOtherLabel && (r.outcomes || []).indexOf('other') > -1 ? '[x] อื่นๆ (' + (r.outcomesOther || '-') + ')\n' : '') +
      'ก่อนปรับปรุง: ' + (r.before || '-') + '\nหลังปรับปรุง: ' + (r.after || '-');
    body.push([
      { text: topicLines || '-', fontSize: 9.5, margin: [5, 6, 5, 6] },
      { text: locLines || '-', fontSize: 9.5, margin: [5, 6, 5, 6] },
      { text: lfPdfCheckLines(data.methodOptions, r.methods), fontSize: 9.5, margin: [5, 6, 5, 6] },
      { text: lfPdfCheckLines(data.outcomeOptions, r.outcomes) + outcomeExtra, fontSize: 9.5, margin: [5, 6, 5, 6] }
    ]);
  });
  return [
    lfPdfHeaderBar('6. องค์ความรู้ที่ใช้/องค์ความรู้ใหม่ที่เกิดขึ้นจากการปรับปรุงกระบวนการ'),
    { table: { widths: widths, headerRows: 1, body: body, dontBreakRows: true }, layout: LF_PDF_TABLE_BORDER }
  ];
}

// คำอธิบายแบบฟอร์ม — static glossary table (same copy as the on-screen FormGuideModal /
// window.LFO_FORM_GUIDE), prepended to every export per the reference Word template.
function lfPdfBuildGuideSection(formGuide) {
  var body = [
    [{ text: 'คำอธิบายแบบฟอร์ม', fillColor: LF_PDF_PURPLE, color: '#fff', bold: true, alignment: 'center', fontSize: 13, margin: [0, 4, 0, 4], colSpan: 2 }, {}]
  ];
  (formGuide || []).forEach(function (g) {
    body.push([
      { text: g.part, bold: true, fontSize: 10, margin: [6, 6, 6, 6] },
      { text: (g.title ? g.title + '\n' : '') + g.desc, fontSize: 10, margin: [6, 6, 6, 6] }
    ]);
  });
  return {
    table: { widths: [70, 622], headerRows: 1, body: body },
    layout: LF_PDF_TABLE_BORDER
  };
}

function lfBuildLearningFormPdfDocDefinition(opts) {
  var content = [];

  // ปก
  content.push({
    stack: [
      { text: '\n\n\n\n\n' },
      { text: 'แบบฟอร์มการประเมินและปรับปรุงกระบวนการของ กฟภ.', style: 'coverTitle', alignment: 'center' },
      { text: '(PEA Learning Form)', style: 'coverTitle', alignment: 'center', margin: [0, 6, 0, 0] }
    ],
    pageBreak: 'after'
  });

  content.push({ stack: [lfPdfBuildGuideSection(opts.formGuide)], pageBreak: 'after' });
  content.push({ stack: lfPdfBuildMetaSection(opts), pageBreak: 'after' });
  content.push({ stack: lfPdfBuildDiagramSection('1. แผนภาพกระบวนการก่อนการปรับปรุง ประจำปี', opts.diagramBefore), pageBreak: 'after' });
  content.push({ stack: lfPdfBuildMetricsSection(opts), pageBreak: 'after' });
  content.push({ stack: lfPdfBuildIssuesSection(opts), pageBreak: 'after' });
  content.push({ stack: lfPdfBuildDiagramSection('4. แผนภาพกระบวนการหลังการปรับปรุง ประจำปี', opts.diagramAfter), pageBreak: 'after' });
  content.push({ stack: lfPdfBuildNextYearSection(opts), pageBreak: 'after' });
  content.push({ stack: lfPdfBuildKnowledgeSection(opts) });

  return {
    pageSize: 'LETTER',
    pageOrientation: 'landscape',
    pageMargins: [40, 70, 40, 56],
    defaultStyle: { font: LF_PDF_FONT, fontSize: 11 },
    styles: {
      coverTitle: { fontSize: 20, bold: true, color: LF_PDF_PURPLE }
    },
    header: function (currentPage) {
      if (currentPage === 1) return { margin: [40, 28, 0, 0], image: opts.logoBase64, width: 160 };
      return {
        margin: [40, 24, 40, 0],
        columns: [
          { image: opts.logoBase64, width: 70 },
          { text: String(currentPage), alignment: 'right', fontSize: 10, color: '#888' }
        ]
      };
    },
    footer: function (currentPage) {
      if (currentPage === 1) return null;
      return {
        margin: [40, 0, 40, 20],
        columns: [
          { text: 'จัดทำโดย กองพัฒนาองค์กร ฝ่ายพัฒนาองค์กรและบริหารการเปลี่ยนแปลง', fontSize: 9, color: '#555' },
          { text: 'ประจำปี ' + opts.year, fontSize: 9, color: '#555', alignment: 'right' }
        ]
      };
    },
    content: content
  };
}

Object.assign(window, { lfBuildLearningFormPdfDocDefinition: lfBuildLearningFormPdfDocDefinition });
