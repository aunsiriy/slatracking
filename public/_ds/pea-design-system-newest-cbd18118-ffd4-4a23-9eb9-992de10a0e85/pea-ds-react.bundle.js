/* @ds-bundle: {"namespace":"PeaDsReact","components":[{"name":"Avatar","sourcePath":"components/components/Avatar/Avatar.jsx"},{"name":"Badge","sourcePath":"components/components/Badge/Badge.jsx"},{"name":"Button","sourcePath":"components/components/Button/Button.jsx"},{"name":"ButtonGroup","sourcePath":"components/components/ButtonGroup/ButtonGroup.jsx"},{"name":"Checkbox","sourcePath":"components/components/Checkbox/Checkbox.jsx"},{"name":"Dot","sourcePath":"components/components/Dot/Dot.jsx"},{"name":"EmptyState","sourcePath":"components/components/EmptyState/EmptyState.jsx"},{"name":"FeaturedIcon","sourcePath":"components/components/FeaturedIcon/FeaturedIcon.jsx"},{"name":"FeaturedIconOutline","sourcePath":"components/components/FeaturedIconOutline/FeaturedIconOutline.jsx"},{"name":"InputField","sourcePath":"components/components/InputField/InputField.jsx"},{"name":"LoadingIcon","sourcePath":"components/components/LoadingIcon/LoadingIcon.jsx"},{"name":"Pagination","sourcePath":"components/components/Pagination/Pagination.jsx"},{"name":"PaymentMethodIcon","sourcePath":"components/components/PaymentMethodIcon/PaymentMethodIcon.jsx"},{"name":"Radio","sourcePath":"components/components/Radio/Radio.jsx"},{"name":"Tag","sourcePath":"components/components/Tag/Tag.jsx"},{"name":"Textarea","sourcePath":"components/components/Textarea/Textarea.jsx"},{"name":"Toggle","sourcePath":"components/components/Toggle/Toggle.jsx"},{"name":"Tooltip","sourcePath":"components/components/Tooltip/Tooltip.jsx"}],"sourceHashes":{"components/components/Avatar/Avatar.jsx":"50d8ad745767","components/components/Avatar/Avatar.d.ts":"60959ecb57e8","components/components/Avatar/Avatar.prompt.md":"9a4659ee72a0","components/components/Badge/Badge.jsx":"7c6eeecb2c6b","components/components/Badge/Badge.d.ts":"16c1d5eeacde","components/components/Badge/Badge.prompt.md":"d8725cf38da2","components/components/Button/Button.jsx":"84c1234e15f2","components/components/Button/Button.d.ts":"765599f4d628","components/components/Button/Button.prompt.md":"dd90c0ad53f5","components/components/ButtonGroup/ButtonGroup.jsx":"750d7d8d0c62","components/components/ButtonGroup/ButtonGroup.d.ts":"017a21d8bdd9","components/components/ButtonGroup/ButtonGroup.prompt.md":"1fe7deb9231c","components/components/Checkbox/Checkbox.jsx":"d5ca87d26576","components/components/Checkbox/Checkbox.d.ts":"c052a3d225a4","components/components/Checkbox/Checkbox.prompt.md":"01e5b4e93857","components/components/Dot/Dot.jsx":"db4933191ad0","components/components/Dot/Dot.d.ts":"0cd0ac56d79e","components/components/Dot/Dot.prompt.md":"393b88f1629a","components/components/EmptyState/EmptyState.jsx":"4c0dd663576e","components/components/EmptyState/EmptyState.d.ts":"b28922ec581a","components/components/EmptyState/EmptyState.prompt.md":"679ec1b9f70a","components/components/FeaturedIcon/FeaturedIcon.jsx":"526f8f9ec928","components/components/FeaturedIcon/FeaturedIcon.d.ts":"0775de180ce0","components/components/FeaturedIcon/FeaturedIcon.prompt.md":"2e6e91a2dbf8","components/components/FeaturedIconOutline/FeaturedIconOutline.jsx":"c260efcf1143","components/components/FeaturedIconOutline/FeaturedIconOutline.d.ts":"0b3a94ecffb6","components/components/FeaturedIconOutline/FeaturedIconOutline.prompt.md":"41c5e809c13c","components/components/InputField/InputField.jsx":"887f5d45a01a","components/components/InputField/InputField.d.ts":"6b0de43cbcab","components/components/InputField/InputField.prompt.md":"1652b1e481a0","components/components/LoadingIcon/LoadingIcon.jsx":"be30e49bf2c9","components/components/LoadingIcon/LoadingIcon.d.ts":"9695d7d18a07","components/components/LoadingIcon/LoadingIcon.prompt.md":"af90219aa56a","components/components/Pagination/Pagination.jsx":"abd013880b76","components/components/Pagination/Pagination.d.ts":"db28884f760a","components/components/Pagination/Pagination.prompt.md":"c51b63ec9746","components/components/PaymentMethodIcon/PaymentMethodIcon.jsx":"b1cef329b0ce","components/components/PaymentMethodIcon/PaymentMethodIcon.d.ts":"6e374b915748","components/components/PaymentMethodIcon/PaymentMethodIcon.prompt.md":"0b2864678a16","components/components/Radio/Radio.jsx":"dedae1993434","components/components/Radio/Radio.d.ts":"dd47e7a5cde2","components/components/Radio/Radio.prompt.md":"f62fba04c252","components/components/Tag/Tag.jsx":"c35dbf09a82b","components/components/Tag/Tag.d.ts":"614d45dfff8e","components/components/Tag/Tag.prompt.md":"093347f2d3c2","components/components/Textarea/Textarea.jsx":"8ddb87036995","components/components/Textarea/Textarea.d.ts":"dbc7251f4769","components/components/Textarea/Textarea.prompt.md":"598e68732416","components/components/Toggle/Toggle.jsx":"99dae27a5988","components/components/Toggle/Toggle.d.ts":"b8a450575900","components/components/Toggle/Toggle.prompt.md":"569376cbdcc2","components/components/Tooltip/Tooltip.jsx":"e4a225340782","components/components/Tooltip/Tooltip.d.ts":"0c685bfcddcb","components/components/Tooltip/Tooltip.prompt.md":"e1633ba9d492"},"inlinedExternals":[],"builtBy":"cc-design-sync"} */
"use strict";
var PeaDsReact = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res, err) => function __init() {
    if (err) throw err[0];
    try {
      return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
    } catch (e) {
      throw err = [e], e;
    }
  };
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // <define:import.meta.env>
  var init_define_import_meta_env = __esm({
    "<define:import.meta.env>"() {
    }
  });

  // shim:react-shim
  var require_react_shim = __commonJS({
    "shim:react-shim"(exports, module) {
      init_define_import_meta_env();
      var R = window.React;
      function np(p, k) {
        var o = {};
        for (var x in p) if (x !== "children") o[x] = p[x];
        if (k !== void 0) o.key = k;
        return o;
      }
      function jsx(t, p, k) {
        var c = p && p.children;
        return c === void 0 ? R.createElement(t, np(p, k)) : R.createElement(t, np(p, k), c);
      }
      function jsxs(t, p, k) {
        return R.createElement.apply(R, [t, np(p, k)].concat(p.children));
      }
      module.exports = R;
      module.exports.jsx = jsx;
      module.exports.jsxs = jsxs;
      module.exports.jsxDEV = function(t, p, k, s) {
        return (s ? jsxs : jsx)(t, p, k);
      };
      module.exports.Fragment = R.Fragment;
    }
  });

  // projects/react/dist/index.js
  var index_exports = {};
  __export(index_exports, {
    Avatar: () => Avatar,
    AvatarLabelGroup: () => AvatarLabelGroup,
    Badge: () => Badge,
    BadgeGroup: () => BadgeGroup,
    Button: () => Button,
    ButtonGroup: () => ButtonGroup,
    Checkbox: () => Checkbox,
    Dot: () => Dot,
    EmptyState: () => EmptyState,
    FeaturedIcon: () => FeaturedIcon,
    FeaturedIconOutline: () => FeaturedIconOutline,
    Input: () => InputField,
    InputField: () => InputField,
    LoadingIcon: () => LoadingIcon,
    Pagination: () => Pagination,
    PaymentMethodIcon: () => PaymentMethodIcon,
    Radio: () => Radio,
    RadioGroup: () => RadioGroup,
    Tag: () => Tag,
    Textarea: () => Textarea,
    Toggle: () => Toggle,
    Tooltip: () => Tooltip
  });
  init_define_import_meta_env();

  // projects/react/dist/input/index.js
  init_define_import_meta_env();

  // projects/react/dist/input/InputField.js
  init_define_import_meta_env();
  var import_jsx_runtime = __toESM(require_react_shim(), 1);
  var React = __toESM(require_react_shim(), 1);

  // projects/react/dist/input/configs.js
  init_define_import_meta_env();
  var INPUT_PAD = {
    sm: "px-[var(--pea-space-3)] py-[var(--pea-space-2)]",
    md: "px-[var(--pea-space-3_5)] py-[var(--pea-space-2_5)]"
  };
  var INPUT_COMPOUND_INPUT_PAD = {
    sm: "px-[var(--pea-space-3)] py-[var(--pea-space-2)]",
    md: "px-[var(--pea-space-3_5)] py-[var(--pea-space-2_5)]"
  };
  var INPUT_COMPOUND_ADDON_PAD = {
    sm: "pl-[var(--pea-space-3)] pr-[var(--pea-space-2)] py-[var(--pea-space-2)]",
    md: "pl-[14px] pr-[var(--pea-space-3)] py-[10px]"
  };
  var INPUT_COMPOUND_DROPDOWN_PAD = {
    sm: "px-[var(--pea-space-3)] py-[var(--pea-space-2)]",
    md: "px-[14px] py-[10px]"
  };
  var INPUT_SIZE = {
    sm: {
      iconSize: "w-[20px] h-[20px]",
      labelClass: "pea-typescale-text-sm pea-font-medium",
      hintClass: "pea-typescale-text-sm pea-font-normal",
      inputClass: "pea-typescale-text-md pea-font-normal"
    },
    md: {
      iconSize: "w-[20px] h-[20px]",
      labelClass: "pea-typescale-text-sm pea-font-medium",
      hintClass: "pea-typescale-text-sm pea-font-normal",
      inputClass: "pea-typescale-text-md pea-font-normal"
    }
  };
  var INPUT_CONTAINER = "flex flex-col gap-[var(--pea-space-1_5)] w-full";
  var INPUT_WRAPPER_BASE = "flex items-center gap-[var(--pea-space-2)] rounded-[var(--pea-rounded-md)] shadow-[0px_1px_1px_0px_var(--pea-effect-shadow-xs)]";
  var INPUT_WRAPPER_BORDER = {
    default: "border [border-color:var(--pea-border-primary)]",
    focused: "border [border-color:var(--pea-border-brand)] [box-shadow:0_0_0_1px_var(--pea-border-brand)]",
    error: "border [border-color:var(--pea-border-error-subtle)]",
    errorFocused: "border [border-color:var(--pea-border-error)] [box-shadow:0_0_0_1px_var(--pea-border-error)]",
    disabled: "border [border-color:var(--pea-border-disabled)]"
  };
  var INPUT_WRAPPER_BG = {
    default: "bg-[var(--pea-bg-primary)]",
    disabled: "bg-[var(--pea-bg-disabled-subtle)]"
  };
  var INPUT_NATIVE_BASE = "flex-1 min-w-0 border-none outline-none bg-transparent p-0 [color:var(--pea-text-primary)] placeholder:[color:var(--pea-text-placeholder)]";
  var INPUT_NATIVE_DISABLED = "[color:var(--pea-text-disabled)] placeholder:[color:var(--pea-text-disabled)] cursor-not-allowed";
  var INPUT_ICON_COLOR = {
    default: "text-[var(--pea-fg-quaternary)]",
    error: "text-[var(--pea-fg-error-secondary)]",
    disabled: "text-[var(--pea-fg-disabled)]"
  };
  var INPUT_LABEL_COLOR = "[color:var(--pea-text-secondary)]";
  var INPUT_LABEL_DISABLED = "cursor-not-allowed";
  var INPUT_REQUIRED_STAR = "[color:var(--pea-text-brand-tertiary)]";
  var INPUT_HINT_COLOR = "[color:var(--pea-text-tertiary)]";
  var INPUT_ERROR_COLOR = "[color:var(--pea-text-error-primary)]";
  var EMAIL_REGEX = /^(?!.*\.\.)(?!.*\.$)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/;
  var EMAIL_ERROR_MSG = "Please enter a valid email address";

  // projects/react/dist/input/InputField.js
  var ChevronDownIcon = () => (0, import_jsx_runtime.jsx)("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", children: (0, import_jsx_runtime.jsx)("path", { d: "M4 6l4 4 4-4", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) });
  var CopyIcon = () => (0, import_jsx_runtime.jsx)("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", "aria-hidden": "true", children: (0, import_jsx_runtime.jsx)("path", { d: "M6.5 6.5V4.5C6.5 3.39543 7.39543 2.5 8.5 2.5H15.5C16.6046 2.5 17.5 3.39543 17.5 4.5V11.5C17.5 12.6046 16.6046 13.5 15.5 13.5H13.5M4.5 6.5H11.5C12.6046 6.5 13.5 7.39543 13.5 8.5V15.5C13.5 16.6046 12.6046 17.5 11.5 17.5H4.5C3.39543 17.5 2.5 16.6046 2.5 15.5V8.5C2.5 7.39543 3.39543 6.5 4.5 6.5Z", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) });
  var CreditCardIcon = () => (0, import_jsx_runtime.jsxs)("svg", { width: "24", height: "18", viewBox: "0 0 24 18", fill: "none", "aria-hidden": "true", children: [(0, import_jsx_runtime.jsx)("rect", { x: "0.5", y: "0.5", width: "23", height: "17", rx: "3", stroke: "currentColor", strokeWidth: "1" }), (0, import_jsx_runtime.jsx)("rect", { x: "0", y: "4", width: "24", height: "3", fill: "currentColor", opacity: "0.2" }), (0, import_jsx_runtime.jsx)("rect", { x: "3", y: "11", width: "6", height: "2", rx: "1", fill: "currentColor", opacity: "0.3" })] });
  function InlineDropdown({ value, options, onChange, disabled, align = "left", className }) {
    const [open, setOpen] = React.useState(false);
    const ref = React.useRef(null);
    React.useEffect(() => {
      if (!open)
        return;
      const handler = (e) => {
        if (ref.current && !ref.current.contains(e.target))
          setOpen(false);
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, [open]);
    return (0, import_jsx_runtime.jsxs)("div", { className: "relative shrink-0", ref, children: [(0, import_jsx_runtime.jsxs)("button", { type: "button", disabled, onClick: () => setOpen((v) => !v), className: [
      "flex items-center gap-[var(--pea-space-0_5)] outline-none",
      disabled ? "cursor-not-allowed" : "cursor-pointer",
      className ?? ""
    ].join(" "), children: [(0, import_jsx_runtime.jsx)("span", { className: "pea-typescale-text-md pea-font-normal [color:var(--pea-text-tertiary)]", children: value }), (0, import_jsx_runtime.jsx)(ChevronDownIcon, {})] }), open && (0, import_jsx_runtime.jsx)("div", { className: [
      "absolute top-full z-10 mt-[var(--pea-space-1)] min-w-[88px] rounded-[var(--pea-rounded-md)] border [border-color:var(--pea-border-primary)] bg-[var(--pea-bg-primary)] py-[var(--pea-space-1)] shadow-[0px_4px_6px_-2px_var(--pea-effect-shadow-xs)]",
      align === "right" ? "right-0" : "left-0"
    ].join(" "), children: options.map((opt) => (0, import_jsx_runtime.jsx)("div", { className: "px-[var(--pea-space-1_5)] py-[1px]", children: (0, import_jsx_runtime.jsx)("button", { type: "button", onMouseDown: (e) => e.preventDefault(), onClick: () => {
      onChange(opt);
      setOpen(false);
    }, className: [
      "block w-full rounded-[var(--pea-rounded-sm)] px-[var(--pea-space-2_5)] py-[var(--pea-space-2)] text-left pea-typescale-text-md pea-font-normal outline-none hover:bg-[var(--pea-bg-primary-hover)]",
      opt === value ? "pea-font-medium [color:var(--pea-text-primary)]" : "[color:var(--pea-text-secondary)]"
    ].join(" "), children: opt }) }, opt)) })] });
  }
  function TagChip({ label, onRemove, disabled }) {
    return (0, import_jsx_runtime.jsxs)("span", { className: "inline-flex items-center gap-[var(--pea-space-1)] rounded-[var(--pea-rounded-sm)] border [border-color:var(--pea-border-primary)] bg-[var(--pea-bg-primary)] px-[var(--pea-space-2)] py-[var(--pea-space-0_5)] pea-typescale-text-sm pea-font-medium [color:var(--pea-text-secondary)]", children: [label, onRemove && !disabled && (0, import_jsx_runtime.jsx)("button", { type: "button", onClick: onRemove, className: "inline-flex items-center justify-center shrink-0 cursor-pointer outline-none [color:var(--pea-fg-quaternary)] hover:[color:var(--pea-fg-quaternary-hover)]", "aria-label": `Remove ${label}`, children: (0, import_jsx_runtime.jsx)("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", "aria-hidden": "true", children: (0, import_jsx_runtime.jsx)("path", { d: "M9 3L3 9M3 3l6 6", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }) })] });
  }
  var InputField = ({
    fieldType = "default",
    value: controlledValue,
    defaultValue = "",
    placeholder,
    label,
    hint,
    error,
    isDisabled = false,
    isRequired = false,
    size = "sm",
    leadingIcon,
    trailingIcon,
    type = "text",
    validate = false,
    customValidation,
    onChange,
    onBlur,
    onFocus,
    onValidate,
    className,
    // InputField-specific props
    leadingText,
    trailingButtonLabel = "Copy",
    dropdownOptions = [],
    dropdownValue,
    onDropdownChange,
    tags: controlledTags,
    onTagsChange,
    onTrailingButtonClick
  }) => {
    const id = React.useId();
    const isControlled = controlledValue !== void 0;
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const [focused, setFocused] = React.useState(false);
    const [validationError, setValidationError] = React.useState(null);
    const value = isControlled ? controlledValue : internalValue;
    const shouldValidate = validate || type === "email";
    const displayError = error || shouldValidate && validationError;
    const hasError = !!displayError;
    const t = INPUT_SIZE[size];
    const isTagsControlled = controlledTags !== void 0;
    const [internalTags, setInternalTags] = React.useState([]);
    const [tagInput, setTagInput] = React.useState("");
    const tags = isTagsControlled ? controlledTags : internalTags;
    const [internalDropdownValue, setInternalDropdownValue] = React.useState(dropdownValue ?? (dropdownOptions.length > 0 ? dropdownOptions[0] : ""));
    const currentDropdownValue = dropdownValue ?? internalDropdownValue;
    const runValidation = (val) => {
      if (!shouldValidate) {
        setValidationError(null);
        onValidate?.(true);
        return;
      }
      if (!val) {
        setValidationError(null);
        onValidate?.(true);
        return;
      }
      let errorMsg = null;
      if (customValidation) {
        errorMsg = customValidation(val);
      } else if (type === "email") {
        errorMsg = EMAIL_REGEX.test(val) ? null : EMAIL_ERROR_MSG;
      }
      setValidationError(errorMsg);
      onValidate?.(!errorMsg, errorMsg || void 0);
    };
    const handleChange = (e) => {
      if (isDisabled)
        return;
      const newValue = e.target.value;
      if (!isControlled)
        setInternalValue(newValue);
      onChange?.(newValue);
      if (validationError)
        setValidationError(null);
    };
    const handleFocus = () => {
      setFocused(true);
      onFocus?.();
    };
    const handleBlur = () => {
      setFocused(false);
      onBlur?.();
      if (shouldValidate)
        runValidation(value);
    };
    const handleDropdownChange = (v) => {
      setInternalDropdownValue(v);
      onDropdownChange?.(v);
    };
    const addTag = () => {
      const t2 = tagInput.trim();
      if (t2 && !tags.includes(t2)) {
        const newTags = [...tags, t2];
        if (!isTagsControlled)
          setInternalTags(newTags);
        onTagsChange?.(newTags);
      }
      setTagInput("");
    };
    const removeTag = (index) => {
      const newTags = tags.filter((_, i) => i !== index);
      if (!isTagsControlled)
        setInternalTags(newTags);
      onTagsChange?.(newTags);
    };
    const borderCl = isDisabled ? INPUT_WRAPPER_BORDER.disabled : hasError && focused ? INPUT_WRAPPER_BORDER.errorFocused : hasError ? INPUT_WRAPPER_BORDER.error : focused ? INPUT_WRAPPER_BORDER.focused : INPUT_WRAPPER_BORDER.default;
    const bgCl = isDisabled ? INPUT_WRAPPER_BG.disabled : INPUT_WRAPPER_BG.default;
    const textCl = isDisabled ? "[color:var(--pea-text-disabled)] placeholder:[color:var(--pea-text-disabled)]" : "[color:var(--pea-text-primary)] placeholder:[color:var(--pea-text-placeholder)]";
    const inputBaseCl = [
      "bg-transparent outline-none pea-typescale-text-md pea-font-normal",
      isDisabled ? "cursor-not-allowed" : "",
      textCl
    ].join(" ");
    const boxShellCl = [
      "rounded-[var(--pea-rounded-md)] shadow-[0px_1px_1px_0px_var(--pea-effect-shadow-xs)]",
      borderCl,
      bgCl
    ].join(" ");
    const renderLabel = () => {
      if (!label)
        return null;
      return (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-[var(--pea-space-0_5)]", children: [(0, import_jsx_runtime.jsx)("label", { htmlFor: id, className: `${t.labelClass} ${INPUT_LABEL_COLOR} ${isDisabled ? INPUT_LABEL_DISABLED : ""}`, children: label }), isRequired && (0, import_jsx_runtime.jsx)("span", { className: `${t.labelClass} ${INPUT_REQUIRED_STAR}`, "aria-hidden": "true", children: "*" })] });
    };
    const renderHint = () => {
      if (!hint && !displayError)
        return null;
      return (0, import_jsx_runtime.jsx)("span", { id: `${id}-hint`, className: `${t.hintClass} ${hasError ? INPUT_ERROR_COLOR : INPUT_HINT_COLOR}`, children: displayError || hint });
    };
    if (fieldType === "default") {
      const leadingIconColor = isDisabled ? INPUT_ICON_COLOR.disabled : INPUT_ICON_COLOR.default;
      const trailingIconColor = hasError ? INPUT_ICON_COLOR.error : isDisabled ? INPUT_ICON_COLOR.disabled : INPUT_ICON_COLOR.default;
      return (0, import_jsx_runtime.jsxs)("div", { className: `${INPUT_CONTAINER} ${className || ""}`, children: [renderLabel(), (0, import_jsx_runtime.jsxs)("div", { className: `${INPUT_WRAPPER_BASE} ${INPUT_PAD[size]} ${borderCl} ${bgCl} ${isDisabled ? "cursor-not-allowed" : "cursor-text"}`, children: [leadingIcon && (typeof leadingIcon === "string" ? (0, import_jsx_runtime.jsx)("span", { className: `icon ${leadingIcon} flex items-center justify-center shrink-0 ${t.iconSize} ${leadingIconColor}` }) : (0, import_jsx_runtime.jsx)("span", { className: `flex items-center justify-center shrink-0 ${t.iconSize} ${leadingIconColor}`, children: leadingIcon })), (0, import_jsx_runtime.jsx)("input", { id, type, value, placeholder, disabled: isDisabled, required: isRequired, onChange: handleChange, onFocus: handleFocus, onBlur: handleBlur, className: `${t.inputClass} ${INPUT_NATIVE_BASE} ${isDisabled ? INPUT_NATIVE_DISABLED : ""}`, "aria-invalid": hasError, "aria-required": isRequired, "aria-describedby": hint || displayError ? `${id}-hint` : void 0 }), trailingIcon && (typeof trailingIcon === "string" ? (0, import_jsx_runtime.jsx)("span", { className: `icon ${trailingIcon} flex items-center justify-center shrink-0 ${t.iconSize} ${trailingIconColor}` }) : (0, import_jsx_runtime.jsx)("span", { className: `flex items-center justify-center shrink-0 ${t.iconSize} ${trailingIconColor}`, children: trailingIcon }))] }), renderHint()] });
    }
    if (fieldType === "payment-input") {
      const paymentPad = {
        sm: "pl-[var(--pea-space-2)] pr-[var(--pea-space-3)] py-[var(--pea-space-2)]",
        md: "pl-[var(--pea-space-2_5)] pr-[var(--pea-space-3_5)] py-[var(--pea-space-2_5)]"
      };
      return (0, import_jsx_runtime.jsxs)("div", { className: `${INPUT_CONTAINER} ${className || ""}`, children: [renderLabel(), (0, import_jsx_runtime.jsxs)("div", { className: `flex items-center gap-[var(--pea-space-2)] ${boxShellCl} ${paymentPad[size]}`, children: [(0, import_jsx_runtime.jsx)("span", { className: "shrink-0 flex items-center text-[var(--pea-fg-quaternary)]", children: (0, import_jsx_runtime.jsx)(CreditCardIcon, {}) }), (0, import_jsx_runtime.jsx)("input", { id, type, value, placeholder, disabled: isDisabled, onChange: handleChange, onFocus: handleFocus, onBlur: handleBlur, className: `flex-1 min-w-0 ${inputBaseCl}`, "aria-invalid": hasError, "aria-describedby": hint || displayError ? `${id}-hint` : void 0 })] }), renderHint()] });
    }
    if (fieldType === "tags") {
      return (0, import_jsx_runtime.jsxs)("div", { className: `${INPUT_CONTAINER} ${className || ""}`, children: [renderLabel(), (0, import_jsx_runtime.jsx)("div", { className: `flex items-center gap-[var(--pea-space-2)] ${boxShellCl} ${INPUT_PAD[size]}`, children: (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-1 flex-wrap items-center gap-[var(--pea-space-2)] min-w-0", children: [(0, import_jsx_runtime.jsx)("div", { className: "flex flex-wrap items-center gap-[var(--pea-space-1_5)]", children: tags.map((tag, i) => (0, import_jsx_runtime.jsx)(TagChip, { label: tag, onRemove: () => removeTag(i), disabled: isDisabled }, `${tag}-${i}`)) }), (0, import_jsx_runtime.jsx)("input", { id, value: tagInput, onChange: (e) => setTagInput(e.target.value), onKeyDown: (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          addTag();
        } else if (e.key === "Backspace" && tagInput === "" && tags.length)
          removeTag(tags.length - 1);
      }, onFocus: handleFocus, onBlur: handleBlur, disabled: isDisabled, placeholder: tags.length ? "" : placeholder, className: `flex-1 min-w-[60px] ${inputBaseCl}`, "aria-describedby": hint || displayError ? `${id}-hint` : void 0 })] }) }), renderHint()] });
    }
    if (fieldType === "leading-dropdown") {
      return (0, import_jsx_runtime.jsxs)("div", { className: `${INPUT_CONTAINER} ${className || ""}`, children: [renderLabel(), (0, import_jsx_runtime.jsxs)("div", { className: `flex items-stretch ${boxShellCl}`, children: [(0, import_jsx_runtime.jsx)(InlineDropdown, { value: currentDropdownValue, options: dropdownOptions, onChange: handleDropdownChange, disabled: isDisabled, className: `rounded-l-[var(--pea-rounded-md)] ${INPUT_COMPOUND_DROPDOWN_PAD[size]}` }), (0, import_jsx_runtime.jsx)("div", { className: `flex flex-1 items-center gap-[var(--pea-space-2)] min-w-0 rounded-r-[var(--pea-rounded-md)] [border-color:var(--pea-border-primary)] border-l ${INPUT_COMPOUND_INPUT_PAD[size]}`, children: (0, import_jsx_runtime.jsx)("input", { id, type, value, placeholder, disabled: isDisabled, onChange: handleChange, onFocus: handleFocus, onBlur: handleBlur, className: `flex-1 min-w-0 ${inputBaseCl}`, "aria-invalid": hasError, "aria-describedby": hint || displayError ? `${id}-hint` : void 0 }) })] }), renderHint()] });
    }
    if (fieldType === "leading-text") {
      return (0, import_jsx_runtime.jsxs)("div", { className: `${INPUT_CONTAINER} ${className || ""}`, children: [renderLabel(), (0, import_jsx_runtime.jsxs)("div", { className: `flex items-stretch ${boxShellCl}`, children: [(0, import_jsx_runtime.jsx)("div", { className: `flex items-center shrink-0 rounded-l-[var(--pea-rounded-md)] ${INPUT_COMPOUND_ADDON_PAD[size]}`, children: (0, import_jsx_runtime.jsx)("span", { className: "pea-typescale-text-md pea-font-normal [color:var(--pea-text-tertiary)]", children: leadingText || "http://" }) }), (0, import_jsx_runtime.jsx)("div", { className: `flex flex-1 items-center gap-[var(--pea-space-2)] min-w-0 rounded-r-[var(--pea-rounded-md)] [border-color:var(--pea-border-primary)] border-l ${INPUT_COMPOUND_INPUT_PAD[size]}`, children: (0, import_jsx_runtime.jsx)("input", { id, type, value, placeholder, disabled: isDisabled, onChange: handleChange, onFocus: handleFocus, onBlur: handleBlur, className: `flex-1 min-w-0 ${inputBaseCl}`, "aria-invalid": hasError, "aria-describedby": hint || displayError ? `${id}-hint` : void 0 }) })] }), renderHint()] });
    }
    if (fieldType === "trailing-button") {
      return (0, import_jsx_runtime.jsxs)("div", { className: `${INPUT_CONTAINER} ${className || ""}`, children: [renderLabel(), (0, import_jsx_runtime.jsxs)("div", { className: `flex items-stretch ${boxShellCl}`, children: [(0, import_jsx_runtime.jsx)("div", { className: `flex flex-1 items-center gap-[var(--pea-space-2)] min-w-0 rounded-l-[var(--pea-rounded-md)] ${INPUT_COMPOUND_INPUT_PAD[size]}`, children: (0, import_jsx_runtime.jsx)("input", { id, type, value, placeholder, disabled: isDisabled, onChange: handleChange, onFocus: handleFocus, onBlur: handleBlur, className: `flex-1 min-w-0 ${inputBaseCl}`, "aria-invalid": hasError, "aria-describedby": hint || displayError ? `${id}-hint` : void 0 }) }), (0, import_jsx_runtime.jsxs)("button", { type: "button", onClick: onTrailingButtonClick, disabled: isDisabled, className: [
        "flex items-center gap-[var(--pea-space-1_5)] shrink-0 rounded-r-[var(--pea-rounded-md)] border-l bg-[var(--pea-bg-primary)] [border-color:var(--pea-border-primary)]",
        isDisabled ? "cursor-not-allowed" : "cursor-pointer hover:bg-[var(--pea-bg-primary-hover)]",
        INPUT_COMPOUND_ADDON_PAD[size]
      ].join(" "), children: [(0, import_jsx_runtime.jsx)("span", { className: "text-[var(--pea-text-secondary)]", children: (0, import_jsx_runtime.jsx)(CopyIcon, {}) }), (0, import_jsx_runtime.jsx)("span", { className: "pea-typescale-text-md pea-font-semibold [color:var(--pea-text-secondary)] px-[var(--pea-space-0_5)]", children: trailingButtonLabel })] })] }), renderHint()] });
    }
    if (fieldType === "trailing-dropdown") {
      return (0, import_jsx_runtime.jsxs)("div", { className: `${INPUT_CONTAINER} ${className || ""}`, children: [renderLabel(), (0, import_jsx_runtime.jsxs)("div", { className: `flex items-stretch ${boxShellCl}`, children: [(0, import_jsx_runtime.jsx)("div", { className: `flex flex-1 items-center gap-[var(--pea-space-2)] min-w-0 rounded-l-[var(--pea-rounded-md)] ${INPUT_COMPOUND_INPUT_PAD[size]}`, children: (0, import_jsx_runtime.jsx)("input", { id, type, value, placeholder, disabled: isDisabled, onChange: handleChange, onFocus: handleFocus, onBlur: handleBlur, className: `flex-1 min-w-0 ${inputBaseCl}`, "aria-invalid": hasError, "aria-describedby": hint || displayError ? `${id}-hint` : void 0 }) }), (0, import_jsx_runtime.jsx)(InlineDropdown, { value: currentDropdownValue, options: dropdownOptions, onChange: handleDropdownChange, disabled: isDisabled, align: "right", className: `rounded-r-[var(--pea-rounded-md)] border-l [border-color:var(--pea-border-primary)] ${INPUT_COMPOUND_DROPDOWN_PAD[size]}` })] }), renderHint()] });
    }
    return null;
  };
  InputField.displayName = "InputField";

  // projects/react/dist/button/index.js
  init_define_import_meta_env();

  // projects/react/dist/button/Button.js
  init_define_import_meta_env();
  var import_jsx_runtime2 = __toESM(require_react_shim(), 1);
  var React2 = __toESM(require_react_shim(), 1);

  // projects/react/dist/button/configs.js
  init_define_import_meta_env();
  var BUTTON_SIZE = {
    sm: {
      height: "h-[36px]",
      padding: "px-[12px] py-[8px]",
      iconOnlyPadding: "p-[8px]",
      gap: "gap-[var(--pea-space-1)]",
      typographyClass: "pea-typescale-text-sm pea-font-semibold",
      iconSize: 20
    },
    md: {
      height: "h-[40px]",
      padding: "px-[14px] py-[10px]",
      iconOnlyPadding: "p-[10px]",
      gap: "gap-[var(--pea-space-1)]",
      typographyClass: "pea-typescale-text-sm pea-font-semibold",
      iconSize: 20
    },
    lg: {
      height: "h-[44px]",
      padding: "px-[16px] py-[10px]",
      iconOnlyPadding: "p-[12px]",
      gap: "gap-[var(--pea-space-1_5)]",
      typographyClass: "pea-typescale-text-md pea-font-semibold",
      iconSize: 20
    },
    xl: {
      height: "h-[48px]",
      padding: "px-[18px] py-[12px]",
      iconOnlyPadding: "p-[14px]",
      gap: "gap-[var(--pea-space-1_5)]",
      typographyClass: "pea-typescale-text-md pea-font-semibold",
      iconSize: 20
    }
  };
  var BUTTON_BASE = [
    "inline-flex items-center justify-center",
    "border border-solid",
    "outline-none select-none whitespace-nowrap",
    "transition-[background-color,border-color,color,text-decoration] duration-200"
  ].join(" ");
  var BUTTON_VARIANT = {
    primary: {
      base: "bg-[var(--pea-component-button-primary-bg)] text-[var(--pea-component-button-primary-text)] border-[var(--pea-component-button-primary-border)]",
      hover: "bg-[var(--pea-component-button-primary-bg-hover)] border-[var(--pea-component-button-primary-border-hover)]",
      disabled: "bg-[var(--pea-bg-disabled)] text-[var(--pea-fg-disabled)] border-[var(--pea-border-disabled-subtle)]",
      focusRing: "[box-shadow:0_0_0_2px_var(--pea-bg-primary),0_0_0_4px_var(--pea-effect-focus-ring-brand)]",
      iconColor: "text-[var(--pea-component-button-primary-text)]",
      hoverIconColor: "text-[var(--pea-component-button-primary-text)]",
      disabledIconColor: "text-[var(--pea-fg-disabled-subtle)]",
      isLink: false
    },
    secondary: {
      base: "bg-[var(--pea-bg-primary)] text-[var(--pea-text-secondary)] border-[var(--pea-border-primary)]",
      hover: "bg-[var(--pea-bg-primary-hover)] text-[var(--pea-text-secondary-hover)]",
      disabled: "bg-[var(--pea-bg-primary)] text-[var(--pea-fg-disabled)] border-[var(--pea-border-disabled-subtle)]",
      focusRing: "[box-shadow:0_0_0_2px_var(--pea-bg-primary),0_0_0_4px_var(--pea-effect-focus-ring-brand)]",
      iconColor: "text-[var(--pea-fg-quaternary)]",
      hoverIconColor: "text-[var(--pea-fg-quaternary-hover)]",
      disabledIconColor: "text-[var(--pea-fg-disabled-subtle)]",
      isLink: false
    },
    tertiary: {
      base: "bg-transparent text-[var(--pea-text-tertiary)] border-transparent",
      hover: "bg-[var(--pea-bg-primary-hover)] text-[var(--pea-text-tertiary-hover)]",
      disabled: "bg-transparent text-[var(--pea-fg-disabled)] border-none",
      focusRing: "[box-shadow:0_0_0_2px_var(--pea-bg-primary),0_0_0_4px_var(--pea-effect-focus-ring-brand)]",
      iconColor: "text-[var(--pea-fg-quaternary)]",
      hoverIconColor: "text-[var(--pea-fg-quaternary-hover)]",
      disabledIconColor: "text-[var(--pea-fg-disabled-subtle)]",
      isLink: false
    },
    "primary-destructive": {
      base: "bg-[var(--pea-component-button-destructive-primary-bg)] text-[var(--pea-component-button-primary-text)] border-[var(--pea-component-button-destructive-primary-border)]",
      hover: "bg-[var(--pea-component-button-destructive-primary-bg-hover)] border-[var(--pea-component-button-destructive-primary-border-hover)]",
      disabled: "bg-[var(--pea-bg-disabled)] text-[var(--pea-fg-disabled)] border-[var(--pea-border-disabled-subtle)]",
      focusRing: "[box-shadow:0_0_0_2px_var(--pea-bg-primary),0_0_0_4px_var(--pea-effect-focus-ring-error)]",
      iconColor: "text-[var(--pea-component-button-primary-text)]",
      hoverIconColor: "text-[var(--pea-component-button-primary-text)]",
      disabledIconColor: "text-[var(--pea-fg-disabled-subtle)]",
      isLink: false
    },
    "secondary-destructive": {
      base: "bg-[var(--pea-bg-primary)] text-[var(--pea-text-error-primary)] border-[var(--pea-border-error-subtle)]",
      hover: "bg-[var(--pea-bg-error-primary)] text-[var(--pea-text-error-primary-hover)]",
      disabled: "bg-[var(--pea-bg-primary)] text-[var(--pea-fg-disabled)] border-[var(--pea-border-disabled-subtle)]",
      focusRing: "[box-shadow:0_0_0_2px_var(--pea-bg-primary),0_0_0_4px_var(--pea-effect-focus-ring-error)]",
      iconColor: "text-[var(--pea-text-error-primary)]",
      hoverIconColor: "text-[var(--pea-text-error-primary)]",
      disabledIconColor: "text-[var(--pea-fg-disabled-subtle)]",
      isLink: false
    },
    "tertiary-destructive": {
      base: "bg-transparent text-[var(--pea-text-error-primary)] border-transparent",
      hover: "bg-[var(--pea-bg-error-primary)] text-[var(--pea-text-error-primary-hover)]",
      disabled: "bg-transparent text-[var(--pea-fg-disabled)] border-none",
      focusRing: "[box-shadow:0_0_0_2px_var(--pea-bg-primary),0_0_0_4px_var(--pea-effect-focus-ring-error)]",
      iconColor: "text-[var(--pea-text-error-primary)]",
      hoverIconColor: "text-[var(--pea-text-error-primary)]",
      disabledIconColor: "text-[var(--pea-fg-disabled-subtle)]",
      isLink: false
    },
    "link-color": {
      base: "bg-transparent text-[var(--pea-text-brand-secondary)] border-transparent",
      hover: "text-[var(--pea-text-brand-secondary-hover)] underline underline-offset-2",
      disabled: "bg-transparent text-[var(--pea-fg-disabled)] border-none",
      focusRing: "[box-shadow:0_0_0_2px_var(--pea-bg-primary),0_0_0_4px_var(--pea-effect-focus-ring-brand)]",
      iconColor: "text-[var(--pea-text-brand-secondary)]",
      hoverIconColor: "text-[var(--pea-text-brand-secondary-hover)]",
      disabledIconColor: "text-[var(--pea-fg-disabled-subtle)]",
      isLink: true
    },
    "link-gray": {
      base: "bg-transparent text-[var(--pea-text-tertiary)] border-transparent",
      hover: "text-[var(--pea-text-tertiary-hover)] underline underline-offset-2",
      disabled: "bg-transparent text-[var(--pea-fg-disabled)] border-none",
      focusRing: "[box-shadow:0_0_0_2px_var(--pea-bg-primary),0_0_0_4px_var(--pea-effect-focus-ring-brand)]",
      iconColor: "text-[var(--pea-fg-quaternary)]",
      hoverIconColor: "text-[var(--pea-fg-quaternary-hover)]",
      disabledIconColor: "text-[var(--pea-fg-disabled-subtle)]",
      isLink: true
    },
    "link-destructive": {
      base: "bg-transparent text-[var(--pea-text-error-primary)] border-transparent",
      hover: "text-[var(--pea-text-error-primary-hover)] underline underline-offset-2",
      disabled: "bg-transparent text-[var(--pea-fg-disabled)] border-none",
      focusRing: "[box-shadow:0_0_0_2px_var(--pea-bg-primary),0_0_0_4px_var(--pea-effect-focus-ring-error)]",
      iconColor: "text-[var(--pea-text-error-primary)]",
      hoverIconColor: "text-[var(--pea-text-error-primary-hover)]",
      disabledIconColor: "text-[var(--pea-fg-disabled-subtle)]",
      isLink: true
    }
  };

  // projects/react/dist/button/Button.js
  var Spinner = ({ size }) => (0, import_jsx_runtime2.jsxs)("svg", { width: size, height: size, viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", className: "shrink-0", style: { animation: "pea-spin 0.75s linear infinite" }, children: [(0, import_jsx_runtime2.jsx)("circle", { cx: "8", cy: "8", r: "6", stroke: "currentColor", strokeOpacity: "0.25", strokeWidth: "2" }), (0, import_jsx_runtime2.jsx)("path", { d: "M14 8a6 6 0 0 0-6-6", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" })] });
  var renderIcon = (icon, iconSize) => {
    if (typeof icon === "string") {
      return (0, import_jsx_runtime2.jsx)("span", { className: `icon ${icon}`, style: { fontSize: iconSize } });
    }
    return icon;
  };
  var Button = ({ variant = "primary", size = "md", shape = "square", isDisabled = false, isLoading = false, iconOnly = false, leadingIcon, trailingIcon, children, onClick, type = "button", className }) => {
    const [hovered, setHovered] = React2.useState(false);
    const [focused, setFocused] = React2.useState(false);
    const t = BUTTON_SIZE[size];
    const v = BUTTON_VARIANT[variant];
    const inactive = isDisabled || isLoading;
    const radiusClass = v.isLink ? "rounded-[var(--pea-rounded-xs)]" : shape === "round" ? "rounded-[var(--pea-rounded-full)]" : "rounded-[var(--pea-rounded-md)]";
    const sizeClass = v.isLink ? "" : iconOnly ? `${t.iconOnlyPadding}` : `${t.height} ${t.padding}`;
    const stateClass = inactive ? v.disabled : hovered || isLoading ? `${v.base} ${v.hover}` : v.base;
    const focusClass = focused && !inactive ? v.focusRing : "";
    const cursorClass = inactive ? "cursor-not-allowed" : "cursor-pointer";
    const buttonClass = [
      BUTTON_BASE,
      t.gap,
      t.typographyClass,
      radiusClass,
      sizeClass,
      stateClass,
      focusClass,
      cursorClass,
      className || ""
    ].filter(Boolean).join(" ");
    const iconColorClass = inactive ? v.disabledIconColor : hovered || isLoading ? v.hoverIconColor : v.iconColor;
    return (0, import_jsx_runtime2.jsx)("button", { type, disabled: inactive, tabIndex: inactive ? -1 : void 0, className: buttonClass, onClick, onMouseEnter: () => setHovered(true), onMouseLeave: () => setHovered(false), onFocus: () => setFocused(true), onBlur: () => setFocused(false), "aria-busy": isLoading, "aria-disabled": isDisabled, children: isLoading ? (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [(0, import_jsx_runtime2.jsx)(Spinner, { size: t.iconSize }), !iconOnly && (0, import_jsx_runtime2.jsx)("span", { children: "Submitting..." })] }) : (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [leadingIcon && (0, import_jsx_runtime2.jsx)("span", { "aria-hidden": "true", className: `inline-flex shrink-0 ${iconColorClass}`, children: renderIcon(leadingIcon, t.iconSize) }), !iconOnly && children, trailingIcon && (0, import_jsx_runtime2.jsx)("span", { "aria-hidden": "true", className: `inline-flex shrink-0 ${iconColorClass}`, children: renderIcon(trailingIcon, t.iconSize) })] }) });
  };
  Button.displayName = "Button";

  // projects/react/dist/button-group/index.js
  init_define_import_meta_env();

  // projects/react/dist/button-group/ButtonGroup.js
  init_define_import_meta_env();
  var import_jsx_runtime3 = __toESM(require_react_shim(), 1);
  var React3 = __toESM(require_react_shim(), 1);

  // projects/react/dist/button-group/configs.js
  init_define_import_meta_env();
  var BUTTON_GROUP_BASE = "inline-flex rounded-[var(--pea-rounded-md)] border border-[var(--pea-border-primary)] [filter:drop-shadow(0px_1px_2px_var(--pea-effect-shadow-xs))]";
  var SEGMENT_BASE = [
    "relative inline-flex items-center justify-center",
    "min-h-[var(--pea-space-10)] py-[var(--pea-space-2)]",
    "pea-typescale-text-sm pea-font-semibold",
    "outline-none transition-colors"
  ].join(" ");
  var SEGMENT_INNER_SHADOW = "[box-shadow:inset_0px_-2px_0px_0px_var(--pea-effect-shadow-skeumorphic-inner)]";
  var SEGMENT_FOCUS_RING = "[box-shadow:0_0_0_2px_var(--pea-bg-primary),_0_0_0_4px_var(--pea-effect-focus-ring-brand)]";
  var SEGMENT_PADDING = {
    "text-only": "px-[var(--pea-space-4)]",
    "leading-icon": "pl-[var(--pea-space-3_5)] pr-[var(--pea-space-4)]",
    "icon-only": "px-[var(--pea-space-3)]",
    "dot": "px-[var(--pea-space-4)]"
  };
  var SEGMENT_GAP = {
    "text-only": "",
    "leading-icon": "gap-[var(--pea-space-1_5)]",
    "icon-only": "",
    "dot": "gap-[var(--pea-space-2)]"
  };
  var SEGMENT_STATE = {
    default: {
      bg: "bg-[var(--pea-bg-primary)]",
      text: "text-[var(--pea-text-secondary)]"
    },
    hover: {
      bg: "bg-[var(--pea-bg-primary-hover)]",
      text: "text-[var(--pea-text-secondary-hover)]"
    },
    current: {
      bg: "bg-[var(--pea-bg-active)]",
      text: "text-[var(--pea-text-secondary-hover)]"
    },
    disabled: {
      bg: "bg-[var(--pea-bg-disabled-subtle)]",
      text: "text-[var(--pea-text-disabled)]"
    }
  };

  // projects/react/dist/button-group/ButtonGroup.js
  function ButtonGroupSegment({ label, iconType = "text-only", icon, dotColor = "var(--pea-utility-success-500)", current = false, disabled = false, isFirst, isLast, ariaLabel, onClick }) {
    const [hovered, setHovered] = React3.useState(false);
    const [focused, setFocused] = React3.useState(false);
    const state = disabled ? SEGMENT_STATE.disabled : hovered ? SEGMENT_STATE.hover : current ? SEGMENT_STATE.current : SEGMENT_STATE.default;
    const shadowCl = focused && !disabled ? SEGMENT_FOCUS_RING : disabled ? "" : SEGMENT_INNER_SHADOW;
    const segmentClass = [
      SEGMENT_BASE,
      SEGMENT_PADDING[iconType],
      SEGMENT_GAP[iconType],
      isFirst && "rounded-l-[var(--pea-rounded-md)]",
      isLast && "rounded-r-[var(--pea-rounded-md)]",
      !isLast && "border-r border-r-[var(--pea-border-primary)]",
      focused && !disabled && "z-[1]",
      disabled ? "cursor-not-allowed" : "cursor-pointer",
      state.bg,
      state.text,
      shadowCl
    ].filter(Boolean).join(" ");
    return (0, import_jsx_runtime3.jsxs)("button", { type: "button", disabled, "aria-pressed": current, "aria-label": iconType === "icon-only" ? ariaLabel || label : void 0, onClick, onMouseEnter: () => setHovered(true), onMouseLeave: () => setHovered(false), onFocus: () => setFocused(true), onBlur: () => setFocused(false), className: segmentClass, children: [iconType === "leading-icon" && icon && (0, import_jsx_runtime3.jsx)("span", { className: "inline-flex shrink-0", "aria-hidden": "true", children: icon }), iconType === "dot" && (0, import_jsx_runtime3.jsx)("span", { className: "inline-block w-[var(--pea-space-2_5)] h-[var(--pea-space-2_5)] rounded-full shrink-0", style: { backgroundColor: dotColor }, "aria-hidden": "true" }), iconType !== "icon-only" && label && (0, import_jsx_runtime3.jsx)("span", { children: label }), iconType === "icon-only" && icon && (0, import_jsx_runtime3.jsx)("span", { className: "inline-flex shrink-0", "aria-hidden": "true", children: icon })] });
  }
  var ButtonGroup = ({ segments, className }) => {
    return (0, import_jsx_runtime3.jsx)("div", { role: "group", className: [BUTTON_GROUP_BASE, className || ""].filter(Boolean).join(" "), children: segments.map((seg, i) => (0, import_jsx_runtime3.jsx)(ButtonGroupSegment, { ...seg, isFirst: i === 0, isLast: i === segments.length - 1 }, i)) });
  };
  ButtonGroup.displayName = "ButtonGroup";

  // projects/react/dist/checkbox/index.js
  init_define_import_meta_env();

  // projects/react/dist/checkbox/Checkbox.js
  init_define_import_meta_env();
  var import_jsx_runtime4 = __toESM(require_react_shim(), 1);
  var React4 = __toESM(require_react_shim(), 1);

  // projects/react/dist/checkbox/configs.js
  init_define_import_meta_env();
  var CHECKBOX_SIZE = {
    sm: {
      boxSize: "w-[16px] h-[16px]",
      borderRadius: "rounded-[var(--pea-rounded-xs)]",
      iconSize: 12,
      gap: "gap-[var(--pea-space-2)]",
      labelHintGap: "gap-0",
      labelClass: "pea-typescale-text-sm pea-font-medium",
      hintClass: "pea-typescale-text-sm pea-font-normal"
    },
    md: {
      boxSize: "w-[20px] h-[20px]",
      borderRadius: "rounded-[var(--pea-rounded-sm)]",
      iconSize: 14,
      gap: "gap-[var(--pea-space-3)]",
      labelHintGap: "gap-[var(--pea-space-0_5)]",
      labelClass: "pea-typescale-text-md pea-font-medium",
      hintClass: "pea-typescale-text-md pea-font-normal"
    }
  };
  var CHECKBOX_BOX_BASE = [
    "relative inline-flex items-center justify-center",
    "shrink-0 box-border",
    "border border-solid",
    "transition-[border-color,background-color,box-shadow] duration-150"
  ].join(" ");
  var CHECKBOX_BOX_STATE = {
    unchecked: "bg-transparent border-[var(--pea-border-primary)] cursor-pointer",
    checked: "bg-[var(--pea-bg-brand-solid)] border-transparent text-[var(--pea-fg-white)] cursor-pointer",
    disabledUnchecked: "bg-[var(--pea-bg-disabled-subtle)] border-[var(--pea-border-disabled)] cursor-not-allowed",
    disabledChecked: "bg-[var(--pea-bg-disabled-subtle)] border-[var(--pea-border-disabled)] text-[var(--pea-fg-disabled-subtle)] cursor-not-allowed"
  };
  var CHECKBOX_FOCUS_RING = "[box-shadow:0_0_0_2px_var(--pea-bg-primary),0_0_0_4px_var(--pea-effect-focus-ring-brand)]";
  var CHECKBOX_HIDDEN_INPUT = "absolute opacity-0 w-full h-full m-0 cursor-[inherit] z-[1] appearance-none";
  var CHECKBOX_LABEL_WRAPPER = "inline-flex items-start";
  var CHECKBOX_TEXT_WRAPPER = "flex flex-col";
  var CHECKBOX_LABEL_COLOR = "text-[var(--pea-text-secondary)] select-none";
  var CHECKBOX_HINT_COLOR = "text-[var(--pea-text-tertiary)]";
  var CHECKBOX_BOX_MARGIN_WITH_LABEL = "mt-[var(--pea-space-0_5)]";

  // projects/react/dist/checkbox/Checkbox.js
  var CheckIcon = ({ size, className = "" }) => (0, import_jsx_runtime4.jsx)("svg", { width: size, height: size * 0.75, viewBox: "0 0 10 8", fill: "none", "aria-hidden": "true", className, children: (0, import_jsx_runtime4.jsx)("path", { d: "M1 4L3.5 6.5L9 1", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) });
  var IndeterminateIcon = ({ size }) => (0, import_jsx_runtime4.jsx)("svg", { width: size, height: 2, viewBox: "0 0 10 2", fill: "none", "aria-hidden": "true", children: (0, import_jsx_runtime4.jsx)("path", { d: "M1 1H9", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }) });
  var Checkbox = ({ isChecked: controlledChecked, defaultChecked = false, isIndeterminate = false, isDisabled = false, size = "sm", label, hint, onChange, className }) => {
    const id = React4.useId();
    const isControlled = controlledChecked !== void 0;
    const [internalChecked, setInternalChecked] = React4.useState(defaultChecked);
    const [focused, setFocused] = React4.useState(false);
    const checked = isControlled ? controlledChecked : internalChecked;
    const isActive = checked || isIndeterminate;
    const t = CHECKBOX_SIZE[size];
    const handleChange = (e) => {
      if (isDisabled)
        return;
      if (!isControlled)
        setInternalChecked(e.target.checked);
      onChange?.(e.target.checked);
    };
    const boxStateClass = isDisabled ? isActive ? CHECKBOX_BOX_STATE.disabledChecked : CHECKBOX_BOX_STATE.disabledUnchecked : isActive ? CHECKBOX_BOX_STATE.checked : CHECKBOX_BOX_STATE.unchecked;
    const focusClass = focused && !isDisabled ? CHECKBOX_FOCUS_RING : "";
    const marginClass = label || hint ? CHECKBOX_BOX_MARGIN_WITH_LABEL : "";
    const boxClass = [
      CHECKBOX_BOX_BASE,
      t.boxSize,
      t.borderRadius,
      boxStateClass,
      focusClass,
      marginClass
    ].filter(Boolean).join(" ");
    const box = (0, import_jsx_runtime4.jsxs)("span", { className: boxClass, children: [(0, import_jsx_runtime4.jsx)("input", { id: label || hint ? id : void 0, type: "checkbox", checked, disabled: isDisabled, onChange: handleChange, onFocus: () => setFocused(true), onBlur: () => setFocused(false), className: CHECKBOX_HIDDEN_INPUT, "aria-checked": isIndeterminate ? "mixed" : checked, ref: (el) => {
      if (el)
        el.indeterminate = isIndeterminate;
    } }), isIndeterminate ? (0, import_jsx_runtime4.jsx)(IndeterminateIcon, { size: t.iconSize }) : (0, import_jsx_runtime4.jsx)(CheckIcon, { size: t.iconSize, className: checked ? "" : "opacity-0" })] });
    if (!label && !hint)
      return box;
    return (0, import_jsx_runtime4.jsxs)("label", { htmlFor: id, className: `${CHECKBOX_LABEL_WRAPPER} ${t.gap} ${isDisabled ? "cursor-not-allowed" : "cursor-pointer"} ${className || ""}`, children: [box, (0, import_jsx_runtime4.jsxs)("span", { className: `${CHECKBOX_TEXT_WRAPPER} ${t.labelHintGap}`, children: [label && (0, import_jsx_runtime4.jsx)("span", { className: `${t.labelClass} ${CHECKBOX_LABEL_COLOR}`, "data-pea": "label", children: label }), hint && (0, import_jsx_runtime4.jsx)("span", { className: `${t.hintClass} ${CHECKBOX_HINT_COLOR}`, "data-pea": "hint", onClick: (e) => e.stopPropagation(), children: hint })] })] });
  };
  Checkbox.displayName = "Checkbox";

  // projects/react/dist/toggle/index.js
  init_define_import_meta_env();

  // projects/react/dist/toggle/Toggle.js
  init_define_import_meta_env();
  var import_jsx_runtime5 = __toESM(require_react_shim(), 1);
  var React5 = __toESM(require_react_shim(), 1);

  // projects/react/dist/toggle/configs.js
  init_define_import_meta_env();
  var TOGGLE_SIZE = {
    sm: {
      trackWidth: "w-[36px]",
      trackHeight: "h-[20px]",
      thumbSize: 16,
      thumbOffsetLeft: 2,
      thumbOffsetRight: 2,
      gap: "gap-[var(--pea-space-2)]",
      labelHintGap: "gap-0",
      labelClass: "pea-typescale-text-sm pea-font-medium",
      hintClass: "pea-typescale-text-sm pea-font-normal"
    },
    md: {
      trackWidth: "w-[44px]",
      trackHeight: "h-[24px]",
      thumbSize: 20,
      thumbOffsetLeft: 2,
      thumbOffsetRight: 2,
      gap: "gap-[var(--pea-space-3)]",
      labelHintGap: "gap-[var(--pea-space-0_5)]",
      labelClass: "pea-typescale-text-md pea-font-medium",
      hintClass: "pea-typescale-text-md pea-font-normal"
    }
  };
  var TOGGLE_TRACK_BASE = [
    "relative inline-flex items-center",
    "shrink-0",
    "p-[var(--pea-space-0_5)]",
    "rounded-[var(--pea-rounded-full)]",
    "box-border",
    "transition-[border-color,background-color] duration-200"
  ].join(" ");
  var TOGGLE_TRACK_STATE = {
    off: "bg-[var(--pea-bg-tertiary)] cursor-pointer",
    offHover: "bg-[var(--pea-bg-tertiary)] cursor-pointer",
    on: "bg-[var(--pea-bg-brand-solid)] cursor-pointer",
    onHover: "bg-[var(--pea-bg-brand-solid-hover)] cursor-pointer",
    disabled: "bg-[var(--pea-bg-disabled)] cursor-not-allowed"
  };
  var TOGGLE_FOCUS_RING = "[box-shadow:0_0_0_2px_var(--pea-bg-primary),0_0_0_4px_var(--pea-effect-focus-ring-brand)]";
  var TOGGLE_THUMB_BASE = [
    "absolute top-1/2",
    "rounded-[var(--pea-rounded-full)]",
    "pointer-events-none",
    "transition-[transform,background-color] duration-200",
    "[box-shadow:0_1px_3px_0_var(--pea-effect-shadow-sm-01,rgba(10,13,18,0.10)),0_1px_2px_-1px_var(--pea-effect-shadow-sm-02,rgba(10,13,18,0.10))]"
  ].join(" ");
  var TOGGLE_THUMB_COLOR = "bg-[var(--pea-fg-white)]";
  var TOGGLE_THUMB_DISABLED = "bg-[var(--pea-component-toggle-button-fg-disabled)]";
  var TOGGLE_HIDDEN_INPUT = "absolute opacity-0 w-full h-full m-0 cursor-[inherit] z-[1] appearance-none";
  var TOGGLE_LABEL_WRAPPER = "inline-flex items-start";
  var TOGGLE_TEXT_WRAPPER = "flex flex-col";
  var TOGGLE_LABEL_COLOR = "text-[var(--pea-text-secondary)] select-none";
  var TOGGLE_HINT_COLOR = "text-[var(--pea-text-tertiary)]";
  var TOGGLE_TRACK_MARGIN_WITH_LABEL = "mt-[var(--pea-space-0_5)]";

  // projects/react/dist/toggle/Toggle.js
  var Toggle = ({ isChecked: controlledChecked, defaultChecked = false, isDisabled = false, size = "sm", label, hint, onChange, className }) => {
    const id = React5.useId();
    const isControlled = controlledChecked !== void 0;
    const [internalChecked, setInternalChecked] = React5.useState(defaultChecked);
    const [focused, setFocused] = React5.useState(false);
    const [hovered, setHovered] = React5.useState(false);
    const checked = isControlled ? controlledChecked : internalChecked;
    const t = TOGGLE_SIZE[size];
    const handleChange = (e) => {
      if (isDisabled)
        return;
      if (!isControlled)
        setInternalChecked(e.target.checked);
      onChange?.(e.target.checked);
    };
    const trackStateClass = isDisabled ? TOGGLE_TRACK_STATE.disabled : checked ? hovered ? TOGGLE_TRACK_STATE.onHover : TOGGLE_TRACK_STATE.on : hovered ? TOGGLE_TRACK_STATE.offHover : TOGGLE_TRACK_STATE.off;
    const focusClass = focused && !isDisabled ? TOGGLE_FOCUS_RING : "";
    const marginClass = label || hint ? TOGGLE_TRACK_MARGIN_WITH_LABEL : "";
    const trackClass = [
      TOGGLE_TRACK_BASE,
      t.trackWidth,
      t.trackHeight,
      trackStateClass,
      focusClass,
      marginClass
    ].filter(Boolean).join(" ");
    const thumbTranslate = checked ? t.thumbSize + t.thumbOffsetRight - t.thumbOffsetLeft : t.thumbOffsetLeft;
    const thumbClass = [
      TOGGLE_THUMB_BASE,
      isDisabled ? TOGGLE_THUMB_DISABLED : TOGGLE_THUMB_COLOR
    ].join(" ");
    const thumbStyle = {
      width: t.thumbSize,
      height: t.thumbSize,
      transform: `translateX(${thumbTranslate}px) translateY(-50%)`
    };
    const track = (0, import_jsx_runtime5.jsxs)("span", { className: trackClass, onMouseEnter: () => !isDisabled && setHovered(true), onMouseLeave: () => setHovered(false), children: [(0, import_jsx_runtime5.jsx)("input", { id: label || hint ? id : void 0, type: "checkbox", role: "switch", checked, disabled: isDisabled, onChange: handleChange, onFocus: () => setFocused(true), onBlur: () => setFocused(false), className: TOGGLE_HIDDEN_INPUT, "aria-checked": checked }), (0, import_jsx_runtime5.jsx)("span", { className: thumbClass, style: thumbStyle, "aria-hidden": "true" })] });
    if (!label && !hint)
      return track;
    return (0, import_jsx_runtime5.jsxs)("label", { htmlFor: id, className: `${TOGGLE_LABEL_WRAPPER} ${t.gap} ${isDisabled ? "cursor-not-allowed" : "cursor-pointer"} ${className || ""}`, children: [track, (0, import_jsx_runtime5.jsxs)("span", { className: `${TOGGLE_TEXT_WRAPPER} ${t.labelHintGap}`, children: [label && (0, import_jsx_runtime5.jsx)("span", { className: `${t.labelClass} ${TOGGLE_LABEL_COLOR}`, children: label }), hint && (0, import_jsx_runtime5.jsx)("span", { className: `${t.hintClass} ${TOGGLE_HINT_COLOR}`, onClick: (e) => e.stopPropagation(), children: hint })] })] });
  };
  Toggle.displayName = "Toggle";

  // projects/react/dist/radio/index.js
  init_define_import_meta_env();

  // projects/react/dist/radio/Radio.js
  init_define_import_meta_env();
  var import_jsx_runtime6 = __toESM(require_react_shim(), 1);
  var React6 = __toESM(require_react_shim(), 1);

  // projects/react/dist/radio/configs.js
  init_define_import_meta_env();
  var RADIO_SIZE = {
    sm: {
      boxSize: "w-[16px] h-[16px]",
      dotSize: "w-[6px] h-[6px]",
      gap: "gap-[var(--pea-space-2)]",
      labelHintGap: "gap-0",
      labelClass: "pea-typescale-text-sm pea-font-medium",
      hintClass: "pea-typescale-text-sm pea-font-normal"
    },
    md: {
      boxSize: "w-[20px] h-[20px]",
      dotSize: "w-[8px] h-[8px]",
      gap: "gap-[var(--pea-space-3)]",
      labelHintGap: "gap-[var(--pea-space-0_5)]",
      labelClass: "pea-typescale-text-md pea-font-medium",
      hintClass: "pea-typescale-text-md pea-font-normal"
    }
  };
  var RADIO_CIRCLE_BASE = [
    "relative inline-flex items-center justify-center",
    "shrink-0 box-border",
    "border border-solid",
    "rounded-[var(--pea-rounded-full)]",
    "transition-[border-color,box-shadow] duration-150"
  ].join(" ");
  var RADIO_CIRCLE_STATE = {
    unchecked: "bg-transparent border-[var(--pea-border-primary)] cursor-pointer",
    checked: "bg-[var(--pea-bg-brand-solid)] border-transparent cursor-pointer",
    disabledUnchecked: "bg-[var(--pea-bg-disabled-subtle)] border-[var(--pea-border-disabled)] cursor-not-allowed",
    disabledChecked: "bg-[var(--pea-bg-disabled-subtle)] border-[var(--pea-border-disabled)] cursor-not-allowed"
  };
  var RADIO_DOT_BASE = "rounded-[var(--pea-rounded-full)] shrink-0";
  var RADIO_DOT_COLOR = "bg-[var(--pea-fg-white)]";
  var RADIO_DOT_DISABLED = "bg-[var(--pea-fg-disabled-subtle)]";
  var RADIO_FOCUS_RING = "[box-shadow:0_0_0_2px_var(--pea-bg-primary),0_0_0_4px_var(--pea-effect-focus-ring-brand)]";
  var RADIO_HIDDEN_INPUT = "absolute opacity-0 w-full h-full m-0 cursor-[inherit] z-[1] appearance-none";
  var RADIO_LABEL_WRAPPER = "inline-flex items-start";
  var RADIO_TEXT_WRAPPER = "flex flex-col";
  var RADIO_LABEL_COLOR = "text-[var(--pea-text-secondary)] select-none";
  var RADIO_HINT_COLOR = "text-[var(--pea-text-tertiary)]";
  var RADIO_CIRCLE_MARGIN_WITH_LABEL = "mt-[var(--pea-space-0_5)]";
  var RADIO_GROUP_VERTICAL = "flex flex-col gap-[var(--pea-space-3)]";
  var RADIO_GROUP_HORIZONTAL = "flex flex-row gap-[var(--pea-space-4)]";

  // projects/react/dist/radio/Radio.js
  var Radio = ({ isChecked: controlledChecked, defaultChecked = false, isDisabled = false, size = "sm", label, hint, value = "", name, onChange, className }) => {
    const id = React6.useId();
    const isControlled = controlledChecked !== void 0;
    const [internalChecked, setInternalChecked] = React6.useState(defaultChecked);
    const [focused, setFocused] = React6.useState(false);
    const checked = isControlled ? controlledChecked : internalChecked;
    const t = RADIO_SIZE[size];
    const handleChange = (e) => {
      if (isDisabled)
        return;
      if (!isControlled)
        setInternalChecked(e.target.checked);
      onChange?.(value);
    };
    const circleStateClass = isDisabled ? checked ? RADIO_CIRCLE_STATE.disabledChecked : RADIO_CIRCLE_STATE.disabledUnchecked : checked ? RADIO_CIRCLE_STATE.checked : RADIO_CIRCLE_STATE.unchecked;
    const focusClass = focused && !isDisabled ? RADIO_FOCUS_RING : "";
    const marginClass = label || hint ? RADIO_CIRCLE_MARGIN_WITH_LABEL : "";
    const circleClass = [
      RADIO_CIRCLE_BASE,
      t.boxSize,
      circleStateClass,
      focusClass,
      marginClass
    ].filter(Boolean).join(" ");
    const dotClass = [
      RADIO_DOT_BASE,
      t.dotSize,
      isDisabled ? RADIO_DOT_DISABLED : RADIO_DOT_COLOR
    ].join(" ");
    const circle = (0, import_jsx_runtime6.jsxs)("span", { className: circleClass, children: [(0, import_jsx_runtime6.jsx)("input", { id: label || hint ? id : void 0, type: "radio", checked, disabled: isDisabled, value, name, onChange: handleChange, onFocus: () => setFocused(true), onBlur: () => setFocused(false), className: RADIO_HIDDEN_INPUT, "aria-checked": checked }), (0, import_jsx_runtime6.jsx)("span", { className: `${dotClass} ${checked ? "" : "opacity-0"}`, "aria-hidden": "true" })] });
    if (!label && !hint)
      return circle;
    return (0, import_jsx_runtime6.jsxs)("label", { htmlFor: id, className: `${RADIO_LABEL_WRAPPER} ${t.gap} ${isDisabled ? "cursor-not-allowed" : "cursor-pointer"} ${className || ""}`, children: [circle, (0, import_jsx_runtime6.jsxs)("span", { className: `${RADIO_TEXT_WRAPPER} ${t.labelHintGap}`, children: [label && (0, import_jsx_runtime6.jsx)("span", { className: `${t.labelClass} ${RADIO_LABEL_COLOR}`, children: label }), hint && (0, import_jsx_runtime6.jsx)("span", { className: `${t.hintClass} ${RADIO_HINT_COLOR}`, onClick: (e) => e.stopPropagation(), children: hint })] })] });
  };
  Radio.displayName = "Radio";

  // projects/react/dist/radio/RadioGroup.js
  init_define_import_meta_env();
  var import_jsx_runtime7 = __toESM(require_react_shim(), 1);
  var React7 = __toESM(require_react_shim(), 1);
  var RadioGroup = ({ value: controlledValue, defaultValue = "", options, name, size = "sm", isDisabled = false, direction = "vertical", onChange, className }) => {
    const isControlled = controlledValue !== void 0;
    const [internalValue, setInternalValue] = React7.useState(defaultValue);
    const groupName = React7.useId();
    const selected = isControlled ? controlledValue : internalValue;
    const handleChange = (val) => {
      if (!isControlled)
        setInternalValue(val);
      onChange?.(val);
    };
    const directionClass = direction === "horizontal" ? RADIO_GROUP_HORIZONTAL : RADIO_GROUP_VERTICAL;
    return (0, import_jsx_runtime7.jsx)("div", { role: "radiogroup", className: `${directionClass} ${className || ""}`, children: options.map((opt) => (0, import_jsx_runtime7.jsx)(Radio, { value: opt.value, name: name ?? groupName, isChecked: selected === opt.value, isDisabled: isDisabled || opt.isDisabled, size, label: opt.label, hint: opt.hint, onChange: handleChange }, opt.value)) });
  };
  RadioGroup.displayName = "RadioGroup";

  // projects/react/dist/tooltip/index.js
  init_define_import_meta_env();

  // projects/react/dist/tooltip/Tooltip.js
  init_define_import_meta_env();
  var import_jsx_runtime8 = __toESM(require_react_shim(), 1);
  var React8 = __toESM(require_react_shim(), 1);

  // projects/react/dist/tooltip/configs.js
  init_define_import_meta_env();
  var TOOLTIP_TRIGGER = "relative inline-flex items-center cursor-default";
  var TOOLTIP_BOX_BASE = [
    "absolute z-[9999] pointer-events-none",
    "bg-[var(--pea-component-tooltip-bg)]",
    "text-[var(--pea-component-tooltip-text)]",
    "rounded-[var(--pea-rounded-md)]",
    "w-max",
    "[filter:drop-shadow(0px_12px_8px_var(--pea-effect-shadow-lg-01))_drop-shadow(0px_4px_3px_var(--pea-effect-shadow-lg-02))_drop-shadow(0px_2px_1px_var(--pea-effect-shadow-lg-03))]",
    "transition-opacity duration-150",
    "break-words"
  ].join(" ");
  var TOOLTIP_BOX_PADDING_DEFAULT = "px-[var(--pea-space-3)] py-[var(--pea-space-2)]";
  var TOOLTIP_BOX_PADDING_WITH_SUPPORTING = "p-[var(--pea-space-3)] gap-[var(--pea-space-0_5)] flex flex-col items-start";
  var TOOLTIP_VISIBLE = "opacity-100";
  var TOOLTIP_HIDDEN = "opacity-0";
  var TOOLTIP_TITLE_CLASS = "pea-typescale-text-xs pea-font-semibold";
  var TOOLTIP_SUPPORTING_CLASS = "pea-typescale-text-xs pea-font-medium";
  var TOOLTIP_SUPPORTING_COLOR = "text-[var(--pea-component-tooltip-supporting-text)] max-w-[296px]";
  var ARROW_HEIGHT = 6;
  var ARROW_BASE = 8;
  var TOOLTIP_PLACEMENT = {
    top: {
      start: "bottom-[calc(100%+12px)] left-0",
      center: "bottom-[calc(100%+12px)] left-1/2 -translate-x-1/2",
      end: "bottom-[calc(100%+12px)] right-0"
    },
    bottom: {
      start: "top-[calc(100%+12px)] left-0",
      center: "top-[calc(100%+12px)] left-1/2 -translate-x-1/2",
      end: "top-[calc(100%+12px)] right-0"
    },
    left: {
      start: "right-[calc(100%+12px)] top-0",
      center: "right-[calc(100%+12px)] top-1/2 -translate-y-1/2",
      end: "right-[calc(100%+12px)] bottom-0"
    },
    right: {
      start: "left-[calc(100%+12px)] top-0",
      center: "left-[calc(100%+12px)] top-1/2 -translate-y-1/2",
      end: "left-[calc(100%+12px)] bottom-0"
    }
  };

  // projects/react/dist/tooltip/Tooltip.js
  function ArrowEl({ placement, offset }) {
    const base = { position: "absolute", width: 0, height: 0 };
    const hVal = offset !== null ? `${offset}px` : "50%";
    const vVal = offset !== null ? `${offset}px` : "50%";
    const arrowStyle = () => {
      switch (placement) {
        case "top":
          return { ...base, top: "100%", left: hVal, transform: "translateX(-50%)", borderLeft: `${ARROW_BASE}px solid transparent`, borderRight: `${ARROW_BASE}px solid transparent`, borderTop: `${ARROW_HEIGHT}px solid var(--pea-component-tooltip-bg)` };
        case "bottom":
          return { ...base, bottom: "100%", left: hVal, transform: "translateX(-50%)", borderLeft: `${ARROW_BASE}px solid transparent`, borderRight: `${ARROW_BASE}px solid transparent`, borderBottom: `${ARROW_HEIGHT}px solid var(--pea-component-tooltip-bg)` };
        case "left":
          return { ...base, left: "100%", top: vVal, transform: "translateY(-50%)", borderTop: `${ARROW_BASE}px solid transparent`, borderBottom: `${ARROW_BASE}px solid transparent`, borderLeft: `${ARROW_HEIGHT}px solid var(--pea-component-tooltip-bg)` };
        case "right":
          return { ...base, right: "100%", top: vVal, transform: "translateY(-50%)", borderTop: `${ARROW_BASE}px solid transparent`, borderBottom: `${ARROW_BASE}px solid transparent`, borderRight: `${ARROW_HEIGHT}px solid var(--pea-component-tooltip-bg)` };
      }
    };
    return (0, import_jsx_runtime8.jsx)("span", { style: arrowStyle() });
  }
  var Tooltip = ({ content, placement = "top", supportingText, align = "center", showArrow = true, forceVisible = false, children, className }) => {
    const [visible, setVisible] = React8.useState(forceVisible);
    React8.useEffect(() => {
      setVisible(forceVisible);
    }, [forceVisible]);
    const triggerRef = React8.useRef(null);
    const tooltipRef = React8.useRef(null);
    const [arrowOffset, setArrowOffset] = React8.useState(null);
    React8.useLayoutEffect(() => {
      if (!triggerRef.current || !tooltipRef.current)
        return;
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      if (placement === "top" || placement === "bottom") {
        setArrowOffset(triggerRect.left + triggerRect.width / 2 - tooltipRect.left);
      } else {
        setArrowOffset(triggerRect.top + triggerRect.height / 2 - tooltipRect.top);
      }
    }, [visible, align, placement]);
    const placementClass = TOOLTIP_PLACEMENT[placement][align];
    const visibilityClass = visible ? TOOLTIP_VISIBLE : TOOLTIP_HIDDEN;
    const tooltipClass = [
      TOOLTIP_BOX_BASE,
      supportingText ? TOOLTIP_BOX_PADDING_WITH_SUPPORTING : TOOLTIP_BOX_PADDING_DEFAULT,
      placementClass,
      visibilityClass
    ].join(" ");
    return (0, import_jsx_runtime8.jsxs)("span", { ref: triggerRef, className: `${TOOLTIP_TRIGGER} ${className || ""}`, onMouseEnter: () => setVisible(true), onMouseLeave: () => {
      if (!forceVisible)
        setVisible(false);
    }, onFocus: () => setVisible(true), onBlur: () => {
      if (!forceVisible)
        setVisible(false);
    }, tabIndex: 0, "aria-describedby": visible ? "tooltip" : void 0, children: [children, (0, import_jsx_runtime8.jsxs)("span", { ref: tooltipRef, role: "tooltip", id: "tooltip", className: tooltipClass, children: [showArrow && (0, import_jsx_runtime8.jsx)(ArrowEl, { placement, offset: arrowOffset }), (0, import_jsx_runtime8.jsx)("span", { className: `${TOOLTIP_TITLE_CLASS} ${supportingText ? "w-full" : "text-center whitespace-nowrap"}`, children: content }), supportingText && (0, import_jsx_runtime8.jsx)("span", { className: `${TOOLTIP_SUPPORTING_CLASS} ${TOOLTIP_SUPPORTING_COLOR}`, children: supportingText })] })] });
  };
  Tooltip.displayName = "Tooltip";

  // projects/react/dist/avatar/index.js
  init_define_import_meta_env();

  // projects/react/dist/avatar/Avatar.js
  init_define_import_meta_env();
  var import_jsx_runtime9 = __toESM(require_react_shim(), 1);

  // projects/react/dist/avatar/configs.js
  init_define_import_meta_env();
  var AVATAR_FALLBACK_SRC = "https://www.figma.com/api/mcp/asset/091d3567-b9fd-4e8f-be1f-50413d37138e";
  var AVATAR_BASE = [
    "relative inline-flex items-center justify-center",
    "rounded-[var(--pea-rounded-full)]",
    "overflow-hidden shrink-0 box-border"
  ].join(" ");
  var AVATAR_SIZE = {
    xs: {
      diameter: "w-[24px] h-[24px]",
      border: "border-[0.5px]",
      fontSize: "pea-typescale-text-xs pea-font-semibold",
      iconPx: 16
    },
    sm: {
      diameter: "w-[32px] h-[32px]",
      border: "border-[0.75px]",
      fontSize: "pea-typescale-text-sm pea-font-semibold",
      iconPx: 20
    },
    md: {
      diameter: "w-[40px] h-[40px]",
      border: "border-[1px]",
      fontSize: "pea-typescale-text-md pea-font-semibold",
      iconPx: 24
    },
    lg: {
      diameter: "w-[48px] h-[48px]",
      border: "border-[1px]",
      fontSize: "pea-typescale-text-lg pea-font-semibold",
      iconPx: 28
    },
    xl: {
      diameter: "w-[56px] h-[56px]",
      border: "border-[1px]",
      fontSize: "pea-typescale-text-xl pea-font-semibold",
      iconPx: 32
    },
    "2xl": {
      diameter: "w-[64px] h-[64px]",
      border: "border-[1px]",
      fontSize: "pea-typescale-display-xs pea-font-semibold",
      iconPx: 32
    }
  };
  var AVATAR_VARIANT = {
    image: {
      bg: "bg-[var(--pea-utility-brand-100)]",
      color: "text-transparent",
      borderColor: "border-[rgba(0,0,0,0.08)]"
    },
    placeholder: {
      bg: "bg-[var(--pea-bg-tertiary)]",
      color: "text-[var(--pea-fg-quaternary)]",
      borderColor: "[border-color:var(--pea-border-secondary)]"
    },
    text: {
      bg: "bg-[var(--pea-bg-tertiary)]",
      color: "text-[var(--pea-text-quaternary)]",
      borderColor: "[border-color:var(--pea-border-secondary)]"
    }
  };
  var AVATAR_BORDER_COLOR = "border-[rgba(0,0,0,0.08)]";
  var AVATAR_LABEL_GROUP_BASE = "inline-flex items-center";
  var AVATAR_LABEL_TEXT_WRAPPER = "flex flex-col";
  var AVATAR_LABEL_NAME_COLOR = "text-[var(--pea-text-primary)]";
  var AVATAR_LABEL_SUBTITLE_COLOR = "text-[var(--pea-text-tertiary)]";
  var AVATAR_LABEL_SIZE = {
    sm: {
      avatarSize: "sm",
      nameClass: "pea-typescale-text-sm pea-font-semibold",
      subtitleClass: "pea-typescale-text-xs",
      gap: "gap-[var(--pea-space-2)]"
    },
    md: {
      avatarSize: "md",
      nameClass: "pea-typescale-text-sm pea-font-semibold",
      subtitleClass: "pea-typescale-text-sm",
      gap: "gap-[var(--pea-space-2)]"
    },
    lg: {
      avatarSize: "lg",
      nameClass: "pea-typescale-text-md pea-font-semibold",
      subtitleClass: "pea-typescale-text-md",
      gap: "gap-[var(--pea-space-3)]"
    },
    xl: {
      avatarSize: "xl",
      nameClass: "pea-typescale-text-lg pea-font-semibold",
      subtitleClass: "pea-typescale-text-md",
      gap: "gap-[var(--pea-space-4)]"
    }
  };

  // projects/react/dist/avatar/Avatar.js
  function UserIcon({ px }) {
    return (0, import_jsx_runtime9.jsx)("svg", { width: px, height: px, viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", className: "shrink-0", children: (0, import_jsx_runtime9.jsx)("path", { fillRule: "evenodd", d: "M10 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-7 9a7 7 0 1 1 14 0H3Z", clipRule: "evenodd" }) });
  }
  var Avatar = ({ variant = "text", size = "md", src, alt = "", text = "WD", className }) => {
    const s = AVATAR_SIZE[size];
    const v = AVATAR_VARIANT[variant];
    const containerClass = [
      AVATAR_BASE,
      s.diameter,
      s.border,
      AVATAR_BORDER_COLOR,
      v.bg,
      v.color,
      s.fontSize,
      "font-[var(--pea-font-weight-semibold)] leading-none",
      className || ""
    ].filter(Boolean).join(" ");
    return (0, import_jsx_runtime9.jsxs)("div", { className: containerClass, role: "img", "aria-label": variant === "image" ? alt : variant === "text" ? text : "user avatar", children: [variant === "image" && (0, import_jsx_runtime9.jsxs)("div", { className: "absolute inset-0 pointer-events-none rounded-[var(--pea-rounded-full)]", children: [(0, import_jsx_runtime9.jsx)("div", { className: "absolute inset-0 bg-[var(--pea-utility-brand-100)] rounded-[var(--pea-rounded-full)]" }), (0, import_jsx_runtime9.jsx)("div", { className: "absolute inset-0 overflow-hidden rounded-[var(--pea-rounded-full)]", children: (0, import_jsx_runtime9.jsx)("img", { src: src || AVATAR_FALLBACK_SRC, alt, className: "absolute top-0 max-w-none", style: { left: "-26.72%", width: "154.93%", height: "154.93%" } }) })] }), variant === "placeholder" && (0, import_jsx_runtime9.jsx)(UserIcon, { px: s.iconPx }), variant === "text" && (0, import_jsx_runtime9.jsx)("span", { children: text.charAt(0).toUpperCase() })] });
  };
  Avatar.displayName = "Avatar";

  // projects/react/dist/avatar/AvatarLabelGroup.js
  init_define_import_meta_env();
  var import_jsx_runtime10 = __toESM(require_react_shim(), 1);
  var AvatarLabelGroup = ({ src, name, subtitle, size = "md", statusIcon = false, className }) => {
    const config = AVATAR_LABEL_SIZE[size];
    return (0, import_jsx_runtime10.jsxs)("div", { className: `${AVATAR_LABEL_GROUP_BASE} ${config.gap} ${className || ""}`, children: [(0, import_jsx_runtime10.jsx)(Avatar, { variant: src ? "image" : "text", src, text: name, size: config.avatarSize }), (0, import_jsx_runtime10.jsxs)("div", { className: AVATAR_LABEL_TEXT_WRAPPER, children: [(0, import_jsx_runtime10.jsx)("span", { className: `${config.nameClass} ${AVATAR_LABEL_NAME_COLOR}`, children: name }), subtitle && (0, import_jsx_runtime10.jsx)("span", { className: `${config.subtitleClass} ${AVATAR_LABEL_SUBTITLE_COLOR}`, children: subtitle })] })] });
  };
  AvatarLabelGroup.displayName = "AvatarLabelGroup";

  // projects/react/dist/badge/index.js
  init_define_import_meta_env();

  // projects/react/dist/badge/Badge.js
  init_define_import_meta_env();
  var import_jsx_runtime11 = __toESM(require_react_shim(), 1);
  var React9 = __toESM(require_react_shim(), 1);

  // projects/react/dist/badge/configs.js
  init_define_import_meta_env();
  var BADGE_BASE = "inline-flex items-center box-border shrink-0 [font-family:var(--pea-font-family-body)]";
  var BADGE_TYPE_CONFIG = {
    "pill-color": { modern: false },
    "badge-color": { modern: false },
    "badge-modern": { modern: true }
  };
  var BADGE_RADIUS = {
    sm: { "pill-color": "rounded-[var(--pea-rounded-full)]", "badge-color": "rounded-[var(--pea-rounded-sm)]", "badge-modern": "rounded-[var(--pea-rounded-sm)]" },
    md: { "pill-color": "rounded-[var(--pea-rounded-full)]", "badge-color": "rounded-[var(--pea-rounded-sm)]", "badge-modern": "rounded-[var(--pea-rounded-sm)]" },
    lg: { "pill-color": "rounded-[var(--pea-rounded-full)]", "badge-color": "rounded-[var(--pea-rounded-md)]", "badge-modern": "rounded-[var(--pea-rounded-md)]" }
  };
  var BADGE_CLOSE_RADIUS = {
    "pill-color": "rounded-[var(--pea-rounded-full)]",
    "badge-color": "rounded-[3px]",
    "badge-modern": "rounded-[3px]"
  };
  var BADGE_COLOR_CONFIG = {
    gray: { bg: "bg-[var(--pea-utility-gray-50)]", border: "[border-color:var(--pea-utility-gray-200)]", text: "[color:var(--pea-utility-gray-700)]", dot: "var(--pea-utility-gray-500)", ring: "var(--pea-utility-gray-100)", hoverBg: "bg-[var(--pea-utility-gray-100)]" },
    brand: { bg: "bg-[var(--pea-utility-brand-50)]", border: "[border-color:var(--pea-utility-brand-200)]", text: "[color:var(--pea-utility-brand-700)]", dot: "var(--pea-utility-brand-500)", ring: "var(--pea-utility-brand-100)", hoverBg: "bg-[var(--pea-utility-brand-100)]" },
    error: { bg: "bg-[var(--pea-utility-error-50)]", border: "[border-color:var(--pea-utility-error-200)]", text: "[color:var(--pea-utility-error-700)]", dot: "var(--pea-utility-error-500)", ring: "var(--pea-utility-error-100)", hoverBg: "bg-[var(--pea-utility-error-100)]" },
    warning: { bg: "bg-[var(--pea-utility-warning-50)]", border: "[border-color:var(--pea-utility-warning-200)]", text: "[color:var(--pea-utility-warning-700)]", dot: "var(--pea-utility-warning-500)", ring: "var(--pea-utility-warning-100)", hoverBg: "bg-[var(--pea-utility-warning-100)]" },
    success: { bg: "bg-[var(--pea-utility-success-50)]", border: "[border-color:var(--pea-utility-success-200)]", text: "[color:var(--pea-utility-success-700)]", dot: "var(--pea-utility-success-500)", ring: "var(--pea-utility-success-100)", hoverBg: "bg-[var(--pea-utility-success-100)]" },
    "gray-blue": { bg: "bg-[var(--pea-utility-gray-blue-50)]", border: "[border-color:var(--pea-utility-gray-blue-200)]", text: "[color:var(--pea-utility-gray-blue-700)]", dot: "var(--pea-utility-gray-blue-500)", ring: "var(--pea-utility-gray-blue-100)", hoverBg: "bg-[var(--pea-utility-gray-blue-100)]" },
    "blue-light": { bg: "bg-[var(--pea-utility-blue-light-50)]", border: "[border-color:var(--pea-utility-blue-light-200)]", text: "[color:var(--pea-utility-blue-light-700)]", dot: "var(--pea-utility-blue-light-500)", ring: "var(--pea-utility-blue-light-100)", hoverBg: "bg-[var(--pea-utility-blue-light-100)]" },
    blue: { bg: "bg-[var(--pea-utility-blue-50)]", border: "[border-color:var(--pea-utility-blue-200)]", text: "[color:var(--pea-utility-blue-700)]", dot: "var(--pea-utility-blue-500)", ring: "var(--pea-utility-blue-100)", hoverBg: "bg-[var(--pea-utility-blue-100)]" },
    indigo: { bg: "bg-[var(--pea-utility-indigo-50)]", border: "[border-color:var(--pea-utility-indigo-200)]", text: "[color:var(--pea-utility-indigo-700)]", dot: "var(--pea-utility-indigo-500)", ring: "var(--pea-utility-indigo-100)", hoverBg: "bg-[var(--pea-utility-indigo-100)]" },
    purple: { bg: "bg-[var(--pea-utility-purple-50)]", border: "[border-color:var(--pea-utility-purple-200)]", text: "[color:var(--pea-utility-purple-700)]", dot: "var(--pea-utility-purple-500)", ring: "var(--pea-utility-purple-100)", hoverBg: "bg-[var(--pea-utility-purple-100)]" },
    pink: { bg: "bg-[var(--pea-utility-pink-50)]", border: "[border-color:var(--pea-utility-pink-200)]", text: "[color:var(--pea-utility-pink-700)]", dot: "var(--pea-utility-pink-500)", ring: "var(--pea-utility-pink-100)", hoverBg: "bg-[var(--pea-utility-pink-100)]" },
    orange: { bg: "bg-[var(--pea-utility-orange-50)]", border: "[border-color:var(--pea-utility-orange-200)]", text: "[color:var(--pea-utility-orange-700)]", dot: "var(--pea-utility-orange-500)", ring: "var(--pea-utility-orange-100)", hoverBg: "bg-[var(--pea-utility-orange-100)]" }
  };
  var BADGE_MODERN = {
    bg: "bg-[var(--pea-bg-primary)]",
    border: "[border-color:var(--pea-border-primary)]",
    text: "[color:var(--pea-text-secondary)]",
    shadow: "drop-shadow-[0px_1px_1px_var(--pea-effect-shadow-xs)]"
  };
  var BADGE_SIZE_CONFIG = {
    sm: {
      fontCl: "pea-typescale-text-xs pea-font-medium",
      padYCl: "py-[var(--pea-space-0_5)]",
      padXSymCl: { "pill-color": "px-[var(--pea-space-2)]", "badge-color": "px-[var(--pea-space-1_5)]", "badge-modern": "px-[var(--pea-space-1_5)]" },
      padXPrCl: { "pill-color": "pr-[var(--pea-space-2)]", "badge-color": "pr-[var(--pea-space-1_5)]", "badge-modern": "pr-[var(--pea-space-1_5)]" },
      padXPlCl: { "pill-color": "pl-[var(--pea-space-2)]", "badge-color": "pl-[var(--pea-space-1_5)]", "badge-modern": "pl-[var(--pea-space-1_5)]" },
      leadingPlCl: { "pill-color": "pl-[var(--pea-space-1_5)]", "badge-color": "pl-[var(--pea-space-1_5)]", "badge-modern": "pl-[var(--pea-space-1_5)]" },
      xClosePrCl: { "pill-color": "pr-[var(--pea-space-1)]", "badge-color": "pr-[var(--pea-space-1)]", "badge-modern": "pr-[var(--pea-space-1)]" },
      trailingPrCl: { "pill-color": "pr-[var(--pea-space-1_5)]", "badge-color": "pr-[var(--pea-space-1_5)]", "badge-modern": "pr-[var(--pea-space-1_5)]" },
      trailingPlCl: { "pill-color": "pl-[var(--pea-space-2)]", "badge-color": "pl-[var(--pea-space-2)]", "badge-modern": "pl-[var(--pea-space-2)]" },
      avatarPlCl: { "pill-color": "pl-[var(--pea-space-1)]", "badge-color": "pl-[var(--pea-space-1)]", "badge-modern": "pl-[var(--pea-space-1)]" },
      gapCl: "gap-[var(--pea-space-1)]",
      gapSmallCl: "gap-[var(--pea-space-0_5)]",
      gapCloseCl: "gap-[var(--pea-space-0_5)]",
      avatarGapCl: "gap-[var(--pea-space-1)]",
      iconOnly: { box: "calc(var(--pea-space-0_5) * 2 + var(--pea-line-height-text-xs))", iconSize: 12 }
    },
    md: {
      fontCl: "pea-typescale-text-sm pea-font-medium",
      padYCl: "py-[var(--pea-space-0_5)]",
      padXSymCl: { "pill-color": "px-[var(--pea-space-2_5)]", "badge-color": "px-[var(--pea-space-2)]", "badge-modern": "px-[var(--pea-space-2)]" },
      padXPrCl: { "pill-color": "pr-[var(--pea-space-2_5)]", "badge-color": "pr-[var(--pea-space-2)]", "badge-modern": "pr-[var(--pea-space-2)]" },
      padXPlCl: { "pill-color": "pl-[var(--pea-space-2_5)]", "badge-color": "pl-[var(--pea-space-2)]", "badge-modern": "pl-[var(--pea-space-2)]" },
      leadingPlCl: { "pill-color": "pl-[var(--pea-space-2)]", "badge-color": "pl-[var(--pea-space-1_5)]", "badge-modern": "pl-[var(--pea-space-1_5)]" },
      xClosePrCl: { "pill-color": "pr-[var(--pea-space-1)]", "badge-color": "pr-[var(--pea-space-1)]", "badge-modern": "pr-[var(--pea-space-1)]" },
      trailingPrCl: { "pill-color": "pr-[var(--pea-space-2)]", "badge-color": "pr-[var(--pea-space-1_5)]", "badge-modern": "pr-[var(--pea-space-1_5)]" },
      trailingPlCl: { "pill-color": "pl-[var(--pea-space-2_5)]", "badge-color": "pl-[var(--pea-space-2)]", "badge-modern": "pl-[var(--pea-space-2)]" },
      avatarPlCl: { "pill-color": "pl-[var(--pea-space-1)]", "badge-color": "pl-[var(--pea-space-1_5)]", "badge-modern": "pl-[var(--pea-space-1_5)]" },
      gapCl: "gap-[var(--pea-space-1_5)]",
      gapSmallCl: "gap-[var(--pea-space-0_5)]",
      gapCloseCl: "gap-[var(--pea-space-0_5)]",
      avatarGapCl: "gap-[var(--pea-space-1_5)]",
      iconOnly: { box: "var(--pea-space-6)", iconSize: 12 }
    },
    lg: {
      fontCl: "pea-typescale-text-sm pea-font-medium",
      padYCl: "py-[var(--pea-space-1)]",
      padXSymCl: { "pill-color": "px-[var(--pea-space-3)]", "badge-color": "px-[var(--pea-space-2_5)]", "badge-modern": "px-[var(--pea-space-2_5)]" },
      padXPrCl: { "pill-color": "pr-[var(--pea-space-3)]", "badge-color": "pr-[var(--pea-space-2_5)]", "badge-modern": "pr-[var(--pea-space-2_5)]" },
      padXPlCl: { "pill-color": "pl-[var(--pea-space-3)]", "badge-color": "pl-[var(--pea-space-2_5)]", "badge-modern": "pl-[var(--pea-space-2_5)]" },
      leadingPlCl: { "pill-color": "pl-[var(--pea-space-2_5)]", "badge-color": "pl-[var(--pea-space-2)]", "badge-modern": "pl-[var(--pea-space-2)]" },
      xClosePrCl: { "pill-color": "pr-[var(--pea-space-1_5)]", "badge-color": "pr-[var(--pea-space-1_5)]", "badge-modern": "pr-[var(--pea-space-1_5)]" },
      trailingPrCl: { "pill-color": "pr-[var(--pea-space-2_5)]", "badge-color": "pr-[var(--pea-space-2)]", "badge-modern": "pr-[var(--pea-space-2)]" },
      trailingPlCl: { "pill-color": "pl-[var(--pea-space-3)]", "badge-color": "pl-[var(--pea-space-2_5)]", "badge-modern": "pl-[var(--pea-space-2_5)]" },
      avatarPlCl: { "pill-color": "pl-[var(--pea-space-1_5)]", "badge-color": "pl-[var(--pea-space-2)]", "badge-modern": "pl-[var(--pea-space-2)]" },
      gapCl: "gap-[var(--pea-space-1_5)]",
      gapSmallCl: "gap-[var(--pea-space-1)]",
      gapCloseCl: "gap-[var(--pea-space-0_5)]",
      avatarGapCl: "gap-[var(--pea-space-1_5)]",
      iconOnly: { box: "calc(var(--pea-space-1) * 2 + var(--pea-line-height-text-sm))", iconSize: 12 }
    }
  };
  var BADGE_GROUP_BASE = "inline-flex items-center box-border transition-[background] duration-150 cursor-default";
  var BADGE_GROUP_PILL_COLOR = {
    gray: { bg: "bg-[var(--pea-utility-gray-50)]", bgHover: "bg-[var(--pea-utility-gray-100)]", border: "border-[var(--pea-utility-gray-200)]", text: "text-[var(--pea-utility-gray-700)]", dot: "bg-[var(--pea-utility-gray-500)]" },
    brand: { bg: "bg-[var(--pea-utility-brand-50)]", bgHover: "bg-[var(--pea-utility-brand-100)]", border: "border-[var(--pea-utility-brand-200)]", text: "text-[var(--pea-utility-brand-700)]", dot: "bg-[var(--pea-utility-brand-500)]" },
    error: { bg: "bg-[var(--pea-utility-error-50)]", bgHover: "bg-[var(--pea-utility-error-100)]", border: "border-[var(--pea-utility-error-200)]", text: "text-[var(--pea-utility-error-700)]", dot: "bg-[var(--pea-utility-error-500)]" },
    warning: { bg: "bg-[var(--pea-utility-warning-50)]", bgHover: "bg-[var(--pea-utility-warning-100)]", border: "border-[var(--pea-utility-warning-200)]", text: "text-[var(--pea-utility-warning-700)]", dot: "bg-[var(--pea-utility-warning-500)]" },
    success: { bg: "bg-[var(--pea-utility-success-50)]", bgHover: "bg-[var(--pea-utility-success-100)]", border: "border-[var(--pea-utility-success-200)]", text: "text-[var(--pea-utility-success-700)]", dot: "bg-[var(--pea-utility-success-500)]" }
  };
  var BADGE_GROUP_MODERN = {
    bg: "bg-[var(--pea-bg-primary)]",
    bgHover: "bg-[var(--pea-bg-secondary)]",
    border: "border-[var(--pea-border-primary)]",
    text: "text-[var(--pea-text-secondary)]",
    shadow: "[filter:drop-shadow(0px_1px_1px_var(--pea-effect-shadow-xs))]",
    radius: "rounded-[var(--pea-rounded-lg)]"
  };
  var BADGE_GROUP_SIZE_CONFIG = {
    md: {
      typographyClass: "pea-typescale-text-xs pea-font-medium",
      chipPadXLead: "px-[var(--pea-space-2)]",
      chipPadXTrail: "px-[var(--pea-space-2)]",
      chipPadXModern: "px-[var(--pea-space-1_5)]",
      chipPadY: "py-[var(--pea-space-0_5)]"
    },
    lg: {
      typographyClass: "pea-typescale-text-sm pea-font-medium",
      chipPadXLead: "px-[var(--pea-space-2_5)]",
      chipPadXTrail: "px-[var(--pea-space-2)]",
      chipPadXModern: "px-[var(--pea-space-1_5)]",
      chipPadY: "py-[var(--pea-space-0_5)]"
    }
  };

  // projects/react/dist/badge/Badge.js
  function DotIcon({ color, outline, outlineColor }) {
    if (outline && outlineColor) {
      return (0, import_jsx_runtime11.jsx)("span", { className: "inline-flex items-center justify-center shrink-0 rounded-[var(--pea-rounded-full)]", style: { width: 8, height: 8, backgroundColor: outlineColor }, children: (0, import_jsx_runtime11.jsx)("span", { className: "block rounded-[var(--pea-rounded-full)]", style: { width: 6, height: 6, backgroundColor: color } }) });
    }
    return (0, import_jsx_runtime11.jsx)("span", { className: "block shrink-0 rounded-[var(--pea-rounded-full)]", style: { width: 6, height: 6, backgroundColor: color } });
  }
  function XIcon() {
    return (0, import_jsx_runtime11.jsx)("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", "aria-hidden": "true", className: "block shrink-0", children: (0, import_jsx_runtime11.jsx)("path", { d: "M9 3L3 9M3 3L9 9", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) });
  }
  function GenericIcon() {
    return (0, import_jsx_runtime11.jsxs)("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", "aria-hidden": "true", className: "block shrink-0", children: [(0, import_jsx_runtime11.jsx)("circle", { cx: "6", cy: "6", r: "4.5", stroke: "currentColor", strokeWidth: "1.2" }), (0, import_jsx_runtime11.jsx)("path", { d: "M6 4v2.5l1.5 1", stroke: "currentColor", strokeWidth: "1.2", strokeLinecap: "round", strokeLinejoin: "round" })] });
  }
  function BadgeCloseX({ color, type, onDismiss }) {
    const [hovered, setHovered] = React9.useState(false);
    return (0, import_jsx_runtime11.jsx)("button", { type: "button", onClick: onDismiss, "aria-label": "Dismiss", className: [
      "inline-flex items-center justify-center p-[var(--pea-space-0_5)] outline-none border-none cursor-pointer transition-colors shrink-0",
      BADGE_CLOSE_RADIUS[type],
      hovered ? BADGE_COLOR_CONFIG[color].hoverBg : "bg-transparent"
    ].join(" "), onMouseEnter: () => setHovered(true), onMouseLeave: () => setHovered(false), children: (0, import_jsx_runtime11.jsx)(XIcon, {}) });
  }
  var Badge = ({ size = "sm", type = "badge-color", color = "gray", icon = "false", label = "Label", className, onDismiss }) => {
    const sz = BADGE_SIZE_CONFIG[size];
    const tp = BADGE_TYPE_CONFIG[type];
    const isOnly = icon === "only";
    const isAvatar = icon === "avatar";
    const isXClose = icon === "x-close";
    const clr = tp.modern ? BADGE_MODERN : BADGE_COLOR_CONFIG[color];
    const bgClass = clr.bg;
    const borderClass = clr.border;
    const textClass = clr.text;
    const shadowClass = tp.modern ? BADGE_MODERN.shadow : "";
    const gapCl = (() => {
      if (isOnly)
        return "";
      if (isAvatar)
        return sz.avatarGapCl;
      if (icon === "dot")
        return sz.gapCl;
      if (isXClose)
        return sz.gapCloseCl;
      if (icon !== "false")
        return sz.gapSmallCl;
      return "";
    })();
    const padCl = (() => {
      if (isOnly)
        return "";
      const { padYCl: py, padXSymCl, padXPrCl, padXPlCl, leadingPlCl, xClosePrCl, trailingPrCl, trailingPlCl, avatarPlCl } = sz;
      if (icon === "false")
        return `${py} ${padXSymCl[type]}`;
      if (icon === "dot" || icon === "icon-leading")
        return `${py} ${padXPrCl[type]} ${leadingPlCl[type]}`;
      if (isAvatar)
        return `${py} ${padXPrCl[type]} ${avatarPlCl[type]}`;
      if (isXClose)
        return `${py} ${xClosePrCl[type]} ${padXPlCl[type]}`;
      if (icon === "icon-trailing")
        return `${py} ${trailingPrCl[type]} ${trailingPlCl[type]}`;
      return `${py} ${padXSymCl[type]}`;
    })();
    const containerClass = [
      BADGE_BASE,
      bgClass,
      "border",
      borderClass,
      BADGE_RADIUS[size][type],
      textClass,
      shadowClass,
      gapCl,
      padCl,
      className || ""
    ].filter(Boolean).join(" ");
    if (isOnly) {
      return (0, import_jsx_runtime11.jsx)("span", { className: [BADGE_BASE, "justify-center", bgClass, "border", borderClass, BADGE_RADIUS[size][type], textClass, shadowClass, className || ""].filter(Boolean).join(" "), role: "status", style: { width: sz.iconOnly.box, height: sz.iconOnly.box }, children: (0, import_jsx_runtime11.jsx)(GenericIcon, {}) });
    }
    return (0, import_jsx_runtime11.jsxs)("span", { className: containerClass, role: "status", children: [icon === "dot" && (0, import_jsx_runtime11.jsx)(DotIcon, { color: BADGE_COLOR_CONFIG[color].dot, outlineColor: BADGE_COLOR_CONFIG[color].ring }), isAvatar && (0, import_jsx_runtime11.jsx)("span", { className: "inline-flex shrink-0 w-[var(--pea-space-4)] h-[var(--pea-space-4)] rounded-[var(--pea-rounded-full)] overflow-hidden bg-[var(--pea-utility-gray-100)]" }), icon === "icon-leading" && (0, import_jsx_runtime11.jsx)(GenericIcon, {}), (0, import_jsx_runtime11.jsx)("span", { className: `whitespace-nowrap not-italic [font-weight:var(--pea-font-weight-medium)] [letter-spacing:var(--pea-letter-spacing-normal)] ${sz.fontCl}`, children: label }), icon === "icon-trailing" && (0, import_jsx_runtime11.jsx)(GenericIcon, {}), isXClose && (0, import_jsx_runtime11.jsx)(BadgeCloseX, { color, type, onDismiss })] });
  };
  Badge.displayName = "Badge";

  // projects/react/dist/badge/BadgeGroup.js
  init_define_import_meta_env();
  var import_jsx_runtime12 = __toESM(require_react_shim(), 1);
  var React10 = __toESM(require_react_shim(), 1);
  function ArrowRight({ size }) {
    return (0, import_jsx_runtime12.jsx)("svg", { width: size, height: size, viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", className: "shrink-0", children: (0, import_jsx_runtime12.jsx)("path", { d: "M3 8h10M9 4l4 4-4 4", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) });
  }
  function DotIcon2({ colorClass }) {
    return (0, import_jsx_runtime12.jsx)("span", { className: `inline-flex w-[6px] h-[6px] rounded-[var(--pea-rounded-full)] shrink-0 ${colorClass}` });
  }
  var BadgeGroup = ({ badge = "leading", type = "pill-color", color = "brand", size = "md", icon = true, badgeLabel = "New feature", bodyText = "We've just released a new feature", className }) => {
    const [hovered, setHovered] = React10.useState(false);
    const isModern = type === "badge-modern";
    const sz = BADGE_GROUP_SIZE_CONFIG[size];
    const clr = BADGE_GROUP_PILL_COLOR[color];
    const outerBg = isModern ? hovered ? BADGE_GROUP_MODERN.bgHover : BADGE_GROUP_MODERN.bg : hovered ? clr.bgHover : clr.bg;
    const outerBorder = isModern ? BADGE_GROUP_MODERN.border : clr.border;
    const outerRadius = isModern ? BADGE_GROUP_MODERN.radius : "rounded-[var(--pea-rounded-full)]";
    const outerShadow = isModern ? BADGE_GROUP_MODERN.shadow : "";
    const textColor = isModern ? BADGE_GROUP_MODERN.text : clr.text;
    const outerPadding = badge === "leading" ? "pt-[var(--pea-space-1)] pb-[var(--pea-space-1)] pl-[var(--pea-space-1)] pr-[var(--pea-space-2)]" : "pt-[var(--pea-space-1)] pb-[var(--pea-space-1)] pl-[var(--pea-space-3)] pr-[var(--pea-space-1)]";
    const outerClass = [
      BADGE_GROUP_BASE,
      outerBg,
      `border border-solid ${outerBorder}`,
      textColor,
      outerRadius,
      outerPadding,
      outerShadow,
      "gap-[var(--pea-space-2)]",
      "w-fit",
      className || ""
    ].filter(Boolean).join(" ");
    const chipPadX = isModern ? sz.chipPadXModern : badge === "leading" ? sz.chipPadXLead : sz.chipPadXTrail;
    const chipBorder = isModern ? BADGE_GROUP_MODERN.border : clr.border;
    const chipRadius = isModern ? "rounded-[var(--pea-rounded-sm)]" : "rounded-[var(--pea-rounded-full)]";
    const chipShadow = isModern ? BADGE_GROUP_MODERN.shadow : "";
    const chipClass = [
      "inline-flex items-center gap-[var(--pea-space-1)]",
      "bg-[var(--pea-bg-primary)]",
      `border border-solid ${chipBorder}`,
      chipRadius,
      chipPadX,
      sz.chipPadY,
      chipShadow,
      "shrink-0"
    ].filter(Boolean).join(" ");
    const badgeChip = (0, import_jsx_runtime12.jsxs)("span", { className: chipClass, children: [isModern && (0, import_jsx_runtime12.jsx)(DotIcon2, { colorClass: clr.dot }), (0, import_jsx_runtime12.jsx)("span", { className: sz.typographyClass, children: badgeLabel }), badge === "trailing" && (0, import_jsx_runtime12.jsx)(ArrowRight, { size: 12 })] });
    const content = (0, import_jsx_runtime12.jsx)("span", { className: "inline-flex items-center gap-[var(--pea-space-1)] shrink-0", children: (0, import_jsx_runtime12.jsx)("span", { className: sz.typographyClass, children: bodyText }) });
    const arrow = badge === "leading" && icon ? (0, import_jsx_runtime12.jsx)(ArrowRight, { size: 16 }) : null;
    return (0, import_jsx_runtime12.jsx)("div", { className: outerClass, onMouseEnter: () => setHovered(true), onMouseLeave: () => setHovered(false), children: badge === "leading" ? (0, import_jsx_runtime12.jsxs)(import_jsx_runtime12.Fragment, { children: [badgeChip, content, arrow] }) : (0, import_jsx_runtime12.jsxs)(import_jsx_runtime12.Fragment, { children: [content, badgeChip] }) });
  };
  BadgeGroup.displayName = "BadgeGroup";

  // projects/react/dist/tag/index.js
  init_define_import_meta_env();

  // projects/react/dist/tag/Tag.js
  init_define_import_meta_env();
  var import_jsx_runtime13 = __toESM(require_react_shim(), 1);

  // projects/react/dist/tag/configs.js
  init_define_import_meta_env();
  var TAG_BASE = [
    "inline-flex items-center",
    "rounded-[var(--pea-rounded-sm)]",
    "border border-solid border-[var(--pea-border-primary)]",
    "bg-[var(--pea-bg-primary)]",
    "box-border whitespace-nowrap"
  ].join(" ");
  var TAG_SIZE = {
    sm: {
      typographyClass: "pea-typescale-text-xs pea-font-medium",
      padY: "py-[3px]",
      padXDefault: "px-[var(--pea-space-2)]",
      padXWithIcon: "pl-[5px]",
      padXWithAction: "pr-[5px]",
      gap: "gap-[var(--pea-space-1)]",
      checkboxSize: "w-[14px] h-[14px]",
      closeIconSize: 10,
      countPadX: "px-[var(--pea-space-1)]",
      countTypography: "pea-typescale-text-xs pea-font-medium"
    },
    md: {
      typographyClass: "pea-typescale-text-sm pea-font-medium",
      padY: "py-[var(--pea-space-0_5)]",
      padXDefault: "px-[9px]",
      padXWithIcon: "pl-[7px]",
      padXWithAction: "pr-[7px]",
      gap: "gap-[5px]",
      checkboxSize: "w-[16px] h-[16px]",
      closeIconSize: 12,
      countPadX: "px-[5px]",
      countTypography: "pea-typescale-text-xs pea-font-medium"
    },
    lg: {
      typographyClass: "pea-typescale-text-sm pea-font-medium",
      padY: "py-[var(--pea-space-1)]",
      padXDefault: "px-[10px]",
      padXWithIcon: "pl-[9px]",
      padXWithAction: "pr-[9px]",
      gap: "gap-[var(--pea-space-1_5)]",
      checkboxSize: "w-[18px] h-[18px]",
      closeIconSize: 14,
      countPadX: "px-[var(--pea-space-1_5)]",
      countTypography: "pea-typescale-text-sm pea-font-medium"
    }
  };
  var TAG_LABEL_COLOR = "text-[var(--pea-text-secondary)]";
  var TAG_COUNT_BASE = [
    "inline-flex items-center justify-center",
    "rounded-[3px]",
    "bg-[var(--pea-bg-tertiary)]",
    "text-[var(--pea-text-secondary)]"
  ].join(" ");
  var TAG_CHECKBOX_BASE = [
    "relative inline-flex items-center justify-center",
    "rounded-[var(--pea-rounded-xs)]",
    "border border-solid",
    "cursor-pointer shrink-0"
  ].join(" ");
  var TAG_CHECKBOX_UNCHECKED = "border-[var(--pea-border-primary)] bg-[var(--pea-bg-primary)]";
  var TAG_CHECKBOX_CHECKED = "border-[var(--pea-bg-brand-solid)] bg-[var(--pea-bg-brand-solid)]";
  var TAG_DOT_CLASS = "inline-flex w-[8px] h-[8px] rounded-[var(--pea-rounded-full)] bg-[var(--pea-bg-brand-solid)] shrink-0";
  var TAG_AVATAR_CLASS = "inline-flex w-[16px] h-[16px] rounded-[var(--pea-rounded-full)] bg-[var(--pea-bg-tertiary)] shrink-0 overflow-hidden bg-cover bg-center";
  var TAG_CLOSE_WRAPPER = "inline-flex items-center justify-center p-[var(--pea-space-0_5)] shrink-0";
  var TAG_CLOSE_COLOR = "text-[var(--pea-fg-quaternary)]";

  // projects/react/dist/tag/Tag.js
  function CloseIcon({ size }) {
    return (0, import_jsx_runtime13.jsx)("svg", { width: size, height: size, viewBox: "0 0 14 14", fill: "none", "aria-hidden": "true", className: "block shrink-0", children: (0, import_jsx_runtime13.jsx)("path", { d: "M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) });
  }
  function CheckIcon2() {
    return (0, import_jsx_runtime13.jsx)("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "none", "aria-hidden": "true", className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2", children: (0, import_jsx_runtime13.jsx)("path", { d: "M2 5.5L4 7.5L8 3", stroke: "var(--pea-fg-white)", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) });
  }
  var Tag = ({ size = "sm", action = "Text only", icon = "False", checkbox = false, checked = false, onToggle, label = "Label", count = 5, avatarSrc, className }) => {
    const t = TAG_SIZE[size];
    const hasLeadIcon = icon !== "False" || checkbox;
    const hasAction = action !== "Text only";
    const paddingClass = [
      t.padY,
      hasLeadIcon ? t.padXWithIcon : t.padXDefault.split(" ")[0],
      hasAction ? t.padXWithAction : t.padXDefault.split(" ")[0]
    ].join(" ");
    const containerClass = [
      TAG_BASE,
      t.gap,
      paddingClass,
      className || ""
    ].filter(Boolean).join(" ");
    const checkboxClass = [
      TAG_CHECKBOX_BASE,
      t.checkboxSize,
      checked ? TAG_CHECKBOX_CHECKED : TAG_CHECKBOX_UNCHECKED
    ].join(" ");
    return (0, import_jsx_runtime13.jsxs)("div", { className: containerClass, role: "group", children: [checkbox && (0, import_jsx_runtime13.jsx)("span", { role: "checkbox", "aria-checked": checked, tabIndex: 0, onClick: onToggle, onKeyDown: (e) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        onToggle?.();
      }
    }, className: checkboxClass, children: checked && (0, import_jsx_runtime13.jsx)(CheckIcon2, {}) }), icon === "Dot" && (0, import_jsx_runtime13.jsx)("span", { className: TAG_DOT_CLASS, "aria-hidden": "true" }), icon === "Avatar" && (0, import_jsx_runtime13.jsx)("span", { className: TAG_AVATAR_CLASS, "aria-hidden": "true", style: avatarSrc ? { backgroundImage: `url(${avatarSrc})` } : void 0 }), (0, import_jsx_runtime13.jsx)("span", { className: `${t.typographyClass} ${TAG_LABEL_COLOR}`, children: label }), action === "X close" && (0, import_jsx_runtime13.jsx)("span", { className: `${TAG_CLOSE_WRAPPER} ${TAG_CLOSE_COLOR}`, children: (0, import_jsx_runtime13.jsx)(CloseIcon, { size: t.closeIconSize }) }), action === "Count" && (0, import_jsx_runtime13.jsx)("span", { className: `${TAG_COUNT_BASE} ${t.countPadX} ${t.countTypography}`, children: count })] });
  };
  Tag.displayName = "Tag";

  // projects/react/dist/dot/index.js
  init_define_import_meta_env();

  // projects/react/dist/dot/Dot.js
  init_define_import_meta_env();
  var import_jsx_runtime14 = __toESM(require_react_shim(), 1);

  // projects/react/dist/dot/configs.js
  init_define_import_meta_env();
  var DOT_OUTER = {
    sm: "w-[var(--pea-space-2)] h-[var(--pea-space-2)]",
    md: "w-[var(--pea-space-2_5)] h-[var(--pea-space-2_5)]",
    lg: "w-[var(--pea-space-3)] h-[var(--pea-space-3)]"
  };
  var DOT_INNER = {
    sm: "w-[var(--pea-space-1_5)] h-[var(--pea-space-1_5)]",
    md: "w-[var(--pea-space-2)] h-[var(--pea-space-2)]",
    lg: "w-[var(--pea-space-2_5)] h-[var(--pea-space-2_5)]"
  };
  var DOT_DEFAULT_COLOR = "var(--pea-utility-success-500)";
  var DOT_DEFAULT_OUTLINE_COLOR = "var(--pea-utility-success-100)";

  // projects/react/dist/dot/Dot.js
  var Dot = ({ size = "sm", outline = false, animated = false, outlineColor = DOT_DEFAULT_OUTLINE_COLOR, color = DOT_DEFAULT_COLOR, className }) => {
    return (0, import_jsx_runtime14.jsxs)("div", { className: `relative shrink-0 ${DOT_OUTER[size]} ${className || ""}`, children: [animated && (0, import_jsx_runtime14.jsx)("div", { className: `animate-ping absolute left-[1px] top-[1px] rounded-[var(--pea-rounded-full)] ${DOT_INNER[size]}`, style: { backgroundColor: color } }), (0, import_jsx_runtime14.jsx)("div", { className: `absolute left-[1px] top-[1px] rounded-[var(--pea-rounded-full)] ${DOT_INNER[size]}`, style: {
      backgroundColor: color,
      boxShadow: outline && !animated ? `0 0 0 var(--pea-space-1) ${outlineColor}` : void 0
    } })] });
  };
  Dot.displayName = "Dot";

  // projects/react/dist/loading-icon/index.js
  init_define_import_meta_env();

  // projects/react/dist/loading-icon/LoadingIcon.js
  init_define_import_meta_env();
  var import_jsx_runtime15 = __toESM(require_react_shim(), 1);

  // projects/react/dist/loading-icon/configs.js
  init_define_import_meta_env();
  var LOADING_ICON_CONFIG = {
    sm: { px: 20, cx: 10, cy: 10, r: 8, strokeWidth: 2, arcPath: "M10 2A8 8 0 0 1 18 10" },
    md: { px: 24, cx: 12, cy: 12, r: 10, strokeWidth: 2, arcPath: "M12 2A10 10 0 0 1 22 12" }
  };
  var LOADING_ICON_DEFAULT_COLOR = "var(--pea-fg-quaternary)";

  // projects/react/dist/loading-icon/LoadingIcon.js
  var LoadingIcon = ({ size = "sm", color = LOADING_ICON_DEFAULT_COLOR, className }) => {
    const c = LOADING_ICON_CONFIG[size];
    return (0, import_jsx_runtime15.jsxs)("svg", { width: c.px, height: c.px, viewBox: `0 0 ${c.px} ${c.px}`, fill: "none", "aria-hidden": "true", focusable: "false", className: `shrink-0 ${className || ""}`, style: { animation: "pea-spin 0.75s linear infinite" }, children: [(0, import_jsx_runtime15.jsx)("circle", { cx: c.cx, cy: c.cy, r: c.r, stroke: color, strokeOpacity: "0.3", strokeWidth: c.strokeWidth }), (0, import_jsx_runtime15.jsx)("path", { d: c.arcPath, stroke: color, strokeWidth: c.strokeWidth, strokeLinecap: "round" })] });
  };
  LoadingIcon.displayName = "LoadingIcon";

  // projects/react/dist/featured-icon/index.js
  init_define_import_meta_env();

  // projects/react/dist/featured-icon/FeaturedIcon.js
  init_define_import_meta_env();
  var import_jsx_runtime16 = __toESM(require_react_shim(), 1);

  // projects/react/dist/featured-icon/configs.js
  init_define_import_meta_env();
  var FEATURED_ICON_SIZE = {
    sm: { containerCl: "w-[32px] h-[32px]", iconPx: 16, iconStroke: 2, radiusModernCl: "rounded-[var(--pea-rounded-sm)]" },
    md: { containerCl: "w-[40px] h-[40px]", iconPx: 20, iconStroke: 2, radiusModernCl: "rounded-[var(--pea-rounded-md)]" },
    lg: { containerCl: "w-[48px] h-[48px]", iconPx: 24, iconStroke: 2, radiusModernCl: "rounded-[var(--pea-rounded-lg)]" },
    xl: { containerCl: "w-[56px] h-[56px]", iconPx: 28, iconStroke: 12 / 7, radiusModernCl: "rounded-[var(--pea-rounded-xl)]" }
  };
  var FEATURED_ICON_COLOR = {
    brand: { bgCl: "bg-[var(--pea-component-featured-icon-bg-brand)]", borderCl: "[border-color:var(--pea-component-featured-icon-border-brand)]", iconCl: "[color:var(--pea-component-featured-icon-fg-brand)]" },
    gray: { bgCl: "bg-[var(--pea-component-featured-icon-bg-gray)]", borderCl: "[border-color:var(--pea-component-featured-icon-border-gray)]", iconCl: "[color:var(--pea-component-featured-icon-fg-gray)]" },
    error: { bgCl: "bg-[var(--pea-component-featured-icon-bg-error)]", borderCl: "[border-color:var(--pea-component-featured-icon-border-error)]", iconCl: "[color:var(--pea-component-featured-icon-fg-error)]" },
    warning: { bgCl: "bg-[var(--pea-component-featured-icon-bg-warning)]", borderCl: "[border-color:var(--pea-component-featured-icon-border-warning)]", iconCl: "[color:var(--pea-component-featured-icon-fg-warning)]" },
    success: { bgCl: "bg-[var(--pea-component-featured-icon-bg-success)]", borderCl: "[border-color:var(--pea-component-featured-icon-border-success)]", iconCl: "[color:var(--pea-component-featured-icon-fg-success)]" }
  };
  var FEATURED_ICON_MODERN = {
    bgCl: "bg-[var(--pea-bg-primary)]",
    borderCl: "[border-color:var(--pea-border-primary)]",
    iconCl: "[color:var(--pea-fg-secondary)]",
    shadowCl: "shadow-[0px_1px_2px_0px_var(--pea-effect-shadow-xs),inset_0px_-2px_0px_0px_var(--pea-effect-shadow-skeumorphic-inner)]"
  };
  var FEATURED_ICON_OUTLINE_SIZE = {
    sm: { containerCl: "w-[16px] h-[16px]", iconPx: 16, iconStroke: 2 },
    md: { containerCl: "w-[20px] h-[20px]", iconPx: 20, iconStroke: 2 },
    lg: { containerCl: "w-[24px] h-[24px]", iconPx: 24, iconStroke: 2 },
    xl: { containerCl: "w-[28px] h-[28px]", iconPx: 28, iconStroke: 12 / 7 }
  };
  var FEATURED_ICON_OUTLINE_COLOR = {
    brand: "[color:var(--pea-fg-brand-primary)]",
    gray: "[color:var(--pea-fg-tertiary)]",
    error: "[color:var(--pea-fg-error-primary)]",
    warning: "[color:var(--pea-fg-warning-primary)]",
    success: "[color:var(--pea-fg-success-primary)]"
  };

  // projects/react/dist/featured-icon/FeaturedIcon.js
  var FeaturedIcon = ({ size = "md", variant = "default", color = "brand", icon, className }) => {
    const s = FEATURED_ICON_SIZE[size];
    const c = FEATURED_ICON_COLOR[color];
    const isModern = variant === "modern";
    const containerCl = isModern ? [
      "relative inline-flex items-center justify-center border box-border",
      s.containerCl,
      s.radiusModernCl,
      FEATURED_ICON_MODERN.bgCl,
      FEATURED_ICON_MODERN.borderCl,
      FEATURED_ICON_MODERN.iconCl,
      FEATURED_ICON_MODERN.shadowCl
    ].join(" ") : [
      "relative inline-flex items-center justify-center border-[1.5px] box-border rounded-[var(--pea-rounded-full)]",
      s.containerCl,
      c.bgCl,
      c.borderCl,
      c.iconCl
    ].join(" ");
    const renderedIcon = typeof icon === "string" ? (0, import_jsx_runtime16.jsx)("span", { className: `icon ${icon}`, style: { fontSize: s.iconPx } }) : icon;
    return (0, import_jsx_runtime16.jsx)("div", { className: [containerCl, className].filter(Boolean).join(" "), children: renderedIcon });
  };
  FeaturedIcon.displayName = "FeaturedIcon";

  // projects/react/dist/featured-icon/FeaturedIconOutline.js
  init_define_import_meta_env();
  var import_jsx_runtime17 = __toESM(require_react_shim(), 1);
  var FeaturedIconOutline = ({ size = "md", color = "brand", icon, className }) => {
    const s = FEATURED_ICON_OUTLINE_SIZE[size];
    const renderedIcon = typeof icon === "string" ? (0, import_jsx_runtime17.jsx)("span", { className: `icon ${icon}`, style: { fontSize: s.iconPx } }) : icon;
    return (0, import_jsx_runtime17.jsxs)("div", { className: [
      "relative inline-flex items-center justify-center rounded-[var(--pea-rounded-full)]",
      s.containerCl,
      FEATURED_ICON_OUTLINE_COLOR[color],
      className
    ].filter(Boolean).join(" "), children: [(0, import_jsx_runtime17.jsx)("span", { "aria-hidden": "true", className: "absolute inset-[-4px] rounded-full border-2 border-current opacity-30 pointer-events-none" }), (0, import_jsx_runtime17.jsx)("span", { "aria-hidden": "true", className: "absolute inset-[-9px] rounded-full border-2 border-current opacity-10 pointer-events-none" }), renderedIcon] });
  };
  FeaturedIconOutline.displayName = "FeaturedIconOutline";

  // projects/react/dist/payment-method-icon/index.js
  init_define_import_meta_env();

  // projects/react/dist/payment-method-icon/PaymentMethodIcon.js
  init_define_import_meta_env();
  var import_jsx_runtime18 = __toESM(require_react_shim(), 1);

  // projects/react/dist/payment-method-icon/configs.js
  init_define_import_meta_env();
  var CONTAINER_SIZE = {
    sm: { widthCl: "w-[34px]", heightCl: "h-[24px]" },
    md: { widthCl: "w-[46px]", heightCl: "h-[32px]" },
    lg: { widthCl: "w-[58px]", heightCl: "h-[40px]" }
  };
  var CONTAINER_RADIUS = {
    sm: "rounded-[var(--pea-rounded-xs)]",
    md: "rounded-[var(--pea-rounded-xs)]",
    lg: "rounded-[var(--pea-rounded-sm)]"
  };
  var LOGO_SIZE = {
    visa: { sm: "w-[24px] h-[8px]", md: "w-[32px] h-[10px]", lg: "w-[40px] h-[13px]" },
    mastercard: { sm: "w-[22px] h-[13px]", md: "w-[30px] h-[18px]", lg: "w-[37px] h-[22px]" },
    paypal: { sm: "w-[11px] h-[13px]", md: "w-[14px] h-[18px]", lg: "w-[18px] h-[22px]" },
    jcb: { sm: "w-[20px] h-[15px]", md: "w-[26px] h-[20px]", lg: "w-[33px] h-[24px]" }
  };
  var CONTAINER_BASE = "relative inline-flex items-center justify-center shrink-0 box-border border [border-color:var(--pea-border-secondary)] bg-[var(--pea-base-white)]";

  // projects/react/dist/payment-method-icon/PaymentMethodIcon.js
  var VISA_LOGO = (0, import_jsx_runtime18.jsx)("svg", { viewBox: "0 0 40 14", fill: "none", xmlns: "http://www.w3.org/2000/svg", className: "w-full h-full", children: (0, import_jsx_runtime18.jsx)("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M9.91708 12.9304H6.48418L3.90993 2.82063C3.78774 2.35558 3.52831 1.94444 3.14669 1.75067C2.19431 1.26372 1.14486 0.876177 0 0.680721V0.291494H5.53013C6.29337 0.291494 6.8658 0.876177 6.96121 1.55522L8.29688 8.84775L11.7281 0.291494H15.0656L9.91708 12.9304ZM16.9737 12.9304H13.7316L16.4013 0.291494H19.6434L16.9737 12.9304ZM23.8378 3.79286C23.9332 3.11213 24.5057 2.7229 25.1735 2.7229C26.223 2.62518 27.3661 2.82063 28.3202 3.3059L28.8926 0.584683C27.9386 0.195456 26.8891 0 25.9367 0C22.7901 0 20.5003 1.75068 20.5003 4.1804C20.5003 6.02881 22.1222 6.99934 23.2671 7.58403C24.5057 8.16703 24.9827 8.55625 24.8873 9.13925C24.8873 10.0137 23.9332 10.403 22.9809 10.403C21.836 10.403 20.6911 10.1115 19.6434 9.62452L19.0709 12.3474C20.2158 12.8327 21.4544 13.0281 22.5992 13.0281C26.1276 13.1242 28.3202 11.3752 28.3202 8.75002C28.3202 5.44412 23.8378 5.25035 23.8378 3.79286ZM39.6667 12.9304L37.0924 0.291494H34.3273C33.7549 0.291494 33.1825 0.680721 32.9917 1.26372L28.2248 12.9304H31.5623L32.2284 11.0837H36.3292L36.7108 12.9304H39.6667ZM34.8044 3.69514L35.7567 8.45854H33.0871L34.8044 3.69514Z", fill: "#172B85" }) });
  var MASTERCARD_LOGO = (0, import_jsx_runtime18.jsxs)("svg", { viewBox: "0 0 38 23", fill: "none", xmlns: "http://www.w3.org/2000/svg", className: "w-full h-full", children: [(0, import_jsx_runtime18.jsx)("path", { d: "M25.9619 0C32.2034 0 37.2637 4.99981 37.2637 11.167C37.2635 17.334 32.2033 22.333 25.9619 22.333C23.1635 22.333 20.6046 21.3259 18.6309 19.6611C16.6572 21.3255 14.0989 22.333 11.3008 22.333C5.05961 22.3328 0.00017891 17.3339 0 11.167C0 4.99993 5.0595 0.00019556 11.3008 0C14.0986 0 16.6573 1.00689 18.6309 2.6709C20.6045 1.00648 23.1638 4.4979e-05 25.9619 0Z", fill: "#ED0006" }), (0, import_jsx_runtime18.jsx)("path", { d: "M25.9619 0C32.2034 0 37.2637 4.99981 37.2637 11.167C37.2635 17.334 32.2033 22.333 25.9619 22.333C23.164 22.3329 20.6054 21.3263 18.6318 19.6621C21.0606 17.614 22.6024 14.5693 22.6025 11.167C22.6025 7.7645 21.0608 4.71906 18.6318 2.6709C20.6054 1.00675 23.1641 9.56555e-05 25.9619 0Z", fill: "#F9A000" }), (0, import_jsx_runtime18.jsx)("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M18.6309 2.67053C21.0602 4.7187 22.6025 7.76383 22.6025 11.1666C22.6025 14.5692 21.0599 17.6136 18.6309 19.6617C16.2024 17.6136 14.6611 14.5687 14.6611 11.1666C14.6611 7.76432 16.2021 4.71869 18.6309 2.67053Z", fill: "#FF5E00" })] });
  var PAYPAL_LOGO = (0, import_jsx_runtime18.jsxs)("svg", { viewBox: "0 0 18 22", fill: "none", xmlns: "http://www.w3.org/2000/svg", className: "w-full h-full", children: [(0, import_jsx_runtime18.jsx)("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M5.11094 21.1971L5.47881 18.7819L4.65932 18.7622H0.746094L3.46565 0.939468C3.47412 0.885499 3.50151 0.835399 3.54151 0.799759C3.5817 0.764119 3.63294 0.744568 3.68653 0.744568H10.2848C12.4755 0.744568 13.9872 1.21563 14.7764 2.14553C15.1464 2.58177 15.3821 3.03776 15.4962 3.53936C15.6158 4.06582 15.6177 4.69472 15.5011 5.46189L15.4926 5.5177V6.00933L15.8627 6.22602C16.1742 6.39689 16.4219 6.5924 16.6118 6.81622C16.9282 7.18932 17.133 7.66343 17.2195 8.22533C17.3089 8.80331 17.2794 9.49126 17.133 10.2701C16.9641 11.1657 16.6912 11.946 16.3225 12.5842C15.9836 13.1724 15.5517 13.6603 15.0388 14.0383C14.5492 14.3976 13.9675 14.6703 13.3098 14.8448C12.6724 15.0163 11.9457 15.1029 11.1487 15.1029H10.6352C10.2681 15.1029 9.91144 15.2395 9.63144 15.4845C9.35066 15.7346 9.16505 16.0763 9.1081 16.45L9.06928 16.6676L8.41925 20.9246L8.38989 21.0808C8.38201 21.1303 8.36861 21.155 8.3489 21.1716C8.33137 21.1869 8.30615 21.1971 8.28152 21.1971H5.11094Z", fill: "#28356A" }), (0, import_jsx_runtime18.jsx)("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M16.2134 5.57446C16.1939 5.7046 16.1712 5.83759 16.146 5.97424C15.2759 10.592 12.2988 12.1872 8.49667 12.1872H6.56075C6.09573 12.1872 5.70382 12.5361 5.6315 13.0102L4.3596 21.349C4.31251 21.6604 4.54462 21.9408 4.84846 21.9408H8.28209C8.68859 21.9408 9.034 21.6355 9.09804 21.2211L9.13173 21.0408L9.77822 16.8005L9.8198 16.5679C9.88305 16.152 10.2292 15.8466 10.6357 15.8466H11.1492C14.4759 15.8466 17.0802 14.4507 17.8413 10.4109C18.1592 8.72342 17.9946 7.31431 17.1533 6.32331C16.8987 6.02455 16.5828 5.77649 16.2134 5.57446Z", fill: "#298FC2" }), (0, import_jsx_runtime18.jsx)("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M15.3026 5.19938C15.1696 5.15926 15.0325 5.12301 14.8918 5.09022C14.7503 5.05825 14.6055 5.02994 14.4563 5.00509C13.9343 4.91793 13.3623 4.87659 12.7497 4.87659H7.57801C7.45053 4.87659 7.32955 4.90632 7.22137 4.96009C6.98275 5.07862 6.80562 5.31201 6.76266 5.59774L5.66239 12.8003L5.63086 13.0103C5.70317 12.5362 6.09509 12.1873 6.5601 12.1873H8.49603C12.2981 12.1873 15.2752 10.5912 16.1453 5.9743C16.1713 5.83765 16.1932 5.70466 16.2127 5.57452C15.9926 5.45375 15.7542 5.3505 15.4975 5.26252C15.434 5.24073 15.3686 5.21975 15.3026 5.19938Z", fill: "#22284F" }), (0, import_jsx_runtime18.jsx)("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M6.76296 5.59774C6.80592 5.31201 6.98306 5.07861 7.22167 4.9609C7.33064 4.90693 7.45083 4.8772 7.57832 4.8772H12.75C13.3626 4.8772 13.9346 4.91874 14.4566 5.00591C14.6058 5.03055 14.7506 5.05906 14.8921 5.09104C15.0328 5.12362 15.1699 5.16008 15.3029 5.19999C15.3689 5.22036 15.4343 5.24154 15.4984 5.26252C15.7551 5.3505 15.9937 5.45457 16.2138 5.57452C16.4727 3.86807 16.2116 2.7062 15.3191 1.65411C14.3348 0.495703 12.5587 0 10.2859 0H3.68736C3.22313 0 2.82708 0.348866 2.75536 0.823796L0.0070336 18.8298C-0.0471526 19.186 0.218655 19.5074 0.566235 19.5074H4.63985L6.76296 5.59774Z", fill: "#28356A" })] });
  var JCB_LOGO = (0, import_jsx_runtime18.jsxs)("svg", { viewBox: "0 0 33 25", fill: "none", xmlns: "http://www.w3.org/2000/svg", className: "w-full h-full", children: [(0, import_jsx_runtime18.jsx)("path", { d: "M24.6119 12.7337C25.4974 12.7529 26.3878 12.6946 27.2697 12.764C28.1628 12.9306 28.3781 14.2827 27.5846 14.7255C27.0432 15.0172 26.4001 14.8341 25.8132 14.8856H24.6119V12.7337ZM27.7817 10.298C27.9784 10.9924 27.309 11.6159 26.6403 11.5202H24.6119C24.6261 10.8654 24.5841 10.1547 24.6325 9.53435C25.4451 9.55723 26.2651 9.48768 27.073 9.57072C27.4201 9.65793 27.7106 9.94329 27.7817 10.298ZM32.6632 0.000780769C32.7009 1.32685 32.6687 2.723 32.6795 4.07597C32.677 9.57663 32.6848 15.0771 32.6752 20.5781C32.6396 22.6396 30.8126 24.4309 28.7653 24.4721C26.7161 24.4804 24.6666 24.4733 22.6171 24.4756V16.1598C24.8501 16.1482 27.0843 16.1832 29.3164 16.1423C30.3519 16.0773 31.4861 15.3941 31.5343 14.2546C31.6562 13.1101 30.5772 12.3186 29.5528 12.1935C29.159 12.1833 29.1706 12.0787 29.5528 12.0331C30.5299 11.8219 31.2971 10.8107 31.0097 9.79796C30.7647 8.73277 29.5874 8.3205 28.6081 8.32255C26.6114 8.30898 24.6143 8.32065 22.6175 8.31671C22.6304 6.76424 22.5906 5.21011 22.639 3.65877C22.7972 1.63448 24.6702 -0.0349076 26.6886 0.00131087C28.6804 0.00100779 30.6719 0.001008 32.6632 0.000932227V0.000780769Z", fill: "url(#jcb_g1)" }), (0, import_jsx_runtime18.jsx)("path", { d: "M0.053111 3.86826C0.104105 1.81002 1.9389 0.0334174 3.9835 0.0033364C6.02515 -0.00295258 8.06709 0.00242749 10.1087 0.000608993C10.1031 6.88705 10.1198 13.7742 10.1003 20.6603C10.0217 22.6935 8.20689 24.4363 6.18457 24.4723C4.13906 24.4797 2.09332 24.4733 0.0477314 24.4754V15.8792C2.03467 16.3486 4.1183 16.5484 6.14532 16.237C7.35697 16.0421 8.68266 15.447 9.09288 14.19C9.39475 13.1147 9.2248 11.9831 9.26973 10.8795V8.31654H5.76177C5.746 10.0116 5.79404 11.7096 5.73638 13.4027C5.64182 14.4433 4.61126 15.1045 3.6298 15.0692C2.41262 15.082 0.000601162 14.187 0.000601162 14.187C-0.00546051 11.0112 0.035911 7.03389 0.053111 3.86856V3.86826Z", fill: "url(#jcb_g2)" }), (0, import_jsx_runtime18.jsx)("path", { d: "M11.4167 9.35051C11.2321 9.38969 11.3796 8.72154 11.3324 8.46808C11.345 6.86553 11.3061 5.26123 11.3538 3.65981C11.5116 1.62696 13.399 -0.0465938 15.4256 0.000990294H21.3939C21.3883 6.88743 21.4049 13.7746 21.3855 20.6607C21.3067 22.6939 19.4918 24.4366 17.4694 24.4726C15.4238 24.4804 13.378 24.4739 11.3323 24.4758V15.0575C12.7294 16.2038 14.6283 16.3823 16.3689 16.3854C17.6811 16.3849 18.9857 16.1826 20.26 15.88V14.1545C18.8239 14.8703 17.1357 15.3249 15.5438 14.9137C14.4333 14.6373 13.6272 13.5641 13.6451 12.418C13.5165 11.2262 14.2151 9.96797 15.3863 9.61366C16.8404 9.15843 18.4252 9.5066 19.7882 10.0984C20.0802 10.2514 20.3766 10.441 20.2599 9.95289V8.59667C17.9803 8.0543 15.5542 7.85472 13.264 8.44475C12.6011 8.63175 11.9552 8.91536 11.4167 9.35066V9.35051Z", fill: "url(#jcb_g3)" }), (0, import_jsx_runtime18.jsxs)("defs", { children: [(0, import_jsx_runtime18.jsxs)("linearGradient", { id: "jcb_g1", x1: "22.5484", y1: "11.7149", x2: "32.616", y2: "11.7149", gradientUnits: "userSpaceOnUse", children: [(0, import_jsx_runtime18.jsx)("stop", { stopColor: "#58B03A" }), (0, import_jsx_runtime18.jsx)("stop", { offset: "1", stopColor: "#55B330" })] }), (0, import_jsx_runtime18.jsxs)("linearGradient", { id: "jcb_g2", x1: "-0.16633", y1: "12.4724", x2: "9.94378", y2: "12.4724", gradientUnits: "userSpaceOnUse", children: [(0, import_jsx_runtime18.jsx)("stop", { stopColor: "#0F6EB6" }), (0, import_jsx_runtime18.jsx)("stop", { offset: "1", stopColor: "#006DBA" })] }), (0, import_jsx_runtime18.jsxs)("linearGradient", { id: "jcb_g3", x1: "11.3176", y1: "11.9522", x2: "21.392", y2: "11.9522", gradientUnits: "userSpaceOnUse", children: [(0, import_jsx_runtime18.jsx)("stop", { stopColor: "#DE0D3D" }), (0, import_jsx_runtime18.jsx)("stop", { offset: "1", stopColor: "#E30138" })] })] })] });
  var LOGOS = {
    visa: VISA_LOGO,
    mastercard: MASTERCARD_LOGO,
    paypal: PAYPAL_LOGO,
    jcb: JCB_LOGO
  };
  var PaymentMethodIcon = ({ paymentMethod = "visa", size = "sm", className }) => {
    const s = CONTAINER_SIZE[size];
    return (0, import_jsx_runtime18.jsx)("div", { className: [
      CONTAINER_BASE,
      s.widthCl,
      s.heightCl,
      CONTAINER_RADIUS[size],
      className
    ].filter(Boolean).join(" "), role: "img", "aria-label": paymentMethod, children: (0, import_jsx_runtime18.jsx)("span", { className: `inline-flex object-contain ${LOGO_SIZE[paymentMethod][size]}`, children: LOGOS[paymentMethod] }) });
  };
  PaymentMethodIcon.displayName = "PaymentMethodIcon";

  // projects/react/dist/pagination/index.js
  init_define_import_meta_env();

  // projects/react/dist/pagination/Pagination.js
  init_define_import_meta_env();
  var import_jsx_runtime19 = __toESM(require_react_shim(), 1);
  var React11 = __toESM(require_react_shim(), 1);

  // projects/react/dist/pagination/configs.js
  init_define_import_meta_env();
  function pageItems(current, total) {
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    const items = [];
    items.push(1);
    if (current <= 3) {
      items.push(2, 3, 4, 5);
      items.push("ellipsis");
      items.push(total);
    } else if (current >= total - 2) {
      items.push("ellipsis");
      items.push(total - 4, total - 3, total - 2, total - 1, total);
    } else {
      items.push("ellipsis");
      items.push(current - 1, current, current + 1);
      items.push("ellipsis");
      items.push(total);
    }
    return items;
  }
  function mobilePageItems(current, total) {
    if (total <= 5)
      return Array.from({ length: total }, (_, i) => i + 1);
    if (current <= 2 || current >= total - 1) {
      return [1, 2, "ellipsis", total - 1, total];
    }
    return [1, "ellipsis", current, "ellipsis", total];
  }
  var CIRCLE_TYPES = ["page", "card"];
  var CONTAINER_BORDER = "border-t [border-color:var(--pea-border-secondary)]";
  var NUMBER_PILL_BASE = [
    "flex items-center justify-center size-[40px] p-[var(--pea-space-2)]",
    "rounded-[var(--pea-rounded-full)] outline-none cursor-pointer",
    "pea-typescale-text-sm pea-font-medium",
    "focus-visible:relative focus-visible:z-10",
    "focus-visible:[box-shadow:0_0_0_2px_var(--pea-bg-primary),_0_0_0_4px_var(--pea-effect-focus-ring-brand)]"
  ].join(" ");
  var NUMBER_PILL_ACTIVE = "bg-[var(--pea-bg-primary-hover)] [color:var(--pea-text-secondary)]";
  var NUMBER_PILL_INACTIVE = "bg-transparent [color:var(--pea-text-quaternary)] hover:bg-[var(--pea-bg-primary-hover)]";
  var ELLIPSIS_PILL = "flex items-center justify-center size-[40px] p-[var(--pea-space-2)] pea-typescale-text-sm pea-font-medium [color:var(--pea-text-quaternary)]";
  var GROUP_CELL_BASE = "flex items-center justify-center min-h-[40px] min-w-[40px] p-[var(--pea-space-2)] outline-none pea-typescale-text-sm pea-font-semibold";
  var GROUP_CELL_FOCUS = "focus-visible:[box-shadow:0_0_0_2px_var(--pea-bg-primary),_0_0_0_4px_var(--pea-effect-focus-ring-brand)] focus-visible:relative focus-visible:z-10";
  var GROUP_CELL_NUMBER_ACTIVE = "bg-[var(--pea-bg-primary-hover)] [color:var(--pea-text-secondary-hover)]";
  var GROUP_CELL_NUMBER_INACTIVE = "bg-[var(--pea-bg-primary)] [color:var(--pea-text-quaternary)] hover:bg-[var(--pea-bg-primary-hover)]";
  var GROUP_CONTAINER = "flex items-stretch rounded-[var(--pea-rounded-md)] border [border-color:var(--pea-border-primary)] [box-shadow:0px_1px_2px_0px_var(--pea-effect-shadow-xs)]";
  var POSITION_LABEL = "pea-typescale-text-sm pea-font-medium [color:var(--pea-text-secondary)]";

  // projects/react/dist/pagination/Pagination.js
  var ArrowLeftIcon = ({ className }) => (0, import_jsx_runtime19.jsx)("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", "aria-hidden": "true", className, children: (0, import_jsx_runtime19.jsx)("path", { d: "M15.833 10H4.167M4.167 10l5 5M4.167 10l5-5", stroke: "currentColor", strokeWidth: "1.67", strokeLinecap: "round", strokeLinejoin: "round" }) });
  var ArrowRightIcon = ({ className }) => (0, import_jsx_runtime19.jsx)("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", "aria-hidden": "true", className, children: (0, import_jsx_runtime19.jsx)("path", { d: "M4.167 10h11.666M15.833 10l-5 5M15.833 10l-5-5", stroke: "currentColor", strokeWidth: "1.67", strokeLinecap: "round", strokeLinejoin: "round" }) });
  function PaginationNumberBase({ page, active, onSelect }) {
    if (page === "ellipsis") {
      return (0, import_jsx_runtime19.jsx)("span", { className: ELLIPSIS_PILL, children: "..." });
    }
    return (0, import_jsx_runtime19.jsx)("button", { type: "button", onClick: () => onSelect?.(page), "aria-current": active ? "page" : void 0, className: [NUMBER_PILL_BASE, active ? NUMBER_PILL_ACTIVE : NUMBER_PILL_INACTIVE].join(" "), children: page });
  }
  function PaginationGroupCell({ variant, page, active, label, disabled, edge, onSelect }) {
    const dividerCl = edge === "last" ? "" : "border-r [border-color:var(--pea-border-primary)]";
    const roundCl = edge === "first" ? "rounded-l-[var(--pea-rounded-md)]" : edge === "last" ? "rounded-r-[var(--pea-rounded-md)]" : "";
    const iconCl = disabled ? "text-[var(--pea-fg-disabled-subtle)]" : "text-[var(--pea-fg-quaternary)]";
    if (variant === "ellipsis") {
      return (0, import_jsx_runtime19.jsx)("span", { className: [
        "flex items-center justify-center min-h-[40px] min-w-[40px] p-[var(--pea-space-2)] pea-typescale-text-sm pea-font-semibold [color:var(--pea-text-quaternary)] bg-[var(--pea-bg-primary)]",
        dividerCl
      ].join(" "), children: "..." });
    }
    if (variant === "number") {
      return (0, import_jsx_runtime19.jsx)("button", { type: "button", onClick: onSelect, "aria-current": active ? "page" : void 0, className: [
        GROUP_CELL_BASE,
        "cursor-pointer",
        dividerCl,
        GROUP_CELL_FOCUS,
        active ? GROUP_CELL_NUMBER_ACTIVE : GROUP_CELL_NUMBER_INACTIVE
      ].join(" "), children: page });
    }
    if (variant === "prev-icon" || variant === "next-icon") {
      return (0, import_jsx_runtime19.jsx)("button", { type: "button", onClick: onSelect, disabled, "aria-label": variant === "prev-icon" ? "Previous" : "Next", className: [
        "flex items-center justify-center min-h-[40px] w-[40px] px-[10px] py-[var(--pea-space-2)] outline-none bg-[var(--pea-bg-primary)]",
        disabled ? "cursor-not-allowed" : "cursor-pointer hover:bg-[var(--pea-bg-primary-hover)]",
        dividerCl,
        roundCl,
        GROUP_CELL_FOCUS
      ].join(" "), children: variant === "prev-icon" ? (0, import_jsx_runtime19.jsx)(ArrowLeftIcon, { className: iconCl }) : (0, import_jsx_runtime19.jsx)(ArrowRightIcon, { className: iconCl }) });
    }
    const isPrev = variant === "prev";
    return (0, import_jsx_runtime19.jsxs)("button", { type: "button", onClick: onSelect, disabled, className: [
      "flex items-center justify-center min-h-[40px] gap-[var(--pea-space-1_5)] py-[var(--pea-space-2)] outline-none bg-[var(--pea-bg-primary)] pea-typescale-text-sm pea-font-semibold",
      disabled ? "cursor-not-allowed [color:var(--pea-fg-disabled-subtle)]" : "cursor-pointer hover:bg-[var(--pea-bg-primary-hover)] [color:var(--pea-text-secondary)]",
      isPrev ? "pl-[14px] pr-[var(--pea-space-4)]" : "pl-[var(--pea-space-4)] pr-[14px]",
      dividerCl,
      roundCl,
      GROUP_CELL_FOCUS
    ].join(" "), children: [isPrev && (0, import_jsx_runtime19.jsx)(ArrowLeftIcon, { className: iconCl }), label, !isPrev && (0, import_jsx_runtime19.jsx)(ArrowRightIcon, { className: iconCl })] });
  }
  var Pagination = ({ totalPages = 10, currentPage, defaultPage = 1, onPageChange, type = "page", className }) => {
    const isControlled = currentPage !== void 0;
    const [internalPage, setInternalPage] = React11.useState(defaultPage);
    const current = isControlled ? currentPage : internalPage;
    const go = (p) => {
      const clamped = Math.min(Math.max(p, 1), totalPages);
      if (!isControlled)
        setInternalPage(clamped);
      onPageChange?.(clamped);
    };
    const items = pageItems(current, totalPages);
    const isCircle = CIRCLE_TYPES.includes(type);
    const positionLabel = `Page ${current} of ${totalPages}`;
    const numbersRow = (0, import_jsx_runtime19.jsx)("div", { className: "flex items-start gap-[var(--pea-space-0_5)]", children: items.map((p, i) => (0, import_jsx_runtime19.jsx)(PaginationNumberBase, { page: p, active: p === current, onSelect: go }, p === "ellipsis" ? `e${i}` : p)) });
    const buttonGroup = (mobile) => {
      const groupItems = mobile ? mobilePageItems(current, totalPages) : items;
      return (0, import_jsx_runtime19.jsxs)("div", { className: GROUP_CONTAINER, children: [mobile ? (0, import_jsx_runtime19.jsx)(PaginationGroupCell, { variant: "prev-icon", edge: "first", disabled: current === 1, onSelect: () => go(current - 1) }) : (0, import_jsx_runtime19.jsx)(PaginationGroupCell, { variant: "prev", edge: "first", label: "Previous", disabled: current === 1, onSelect: () => go(current - 1) }), groupItems.map((p, i) => p === "ellipsis" ? (0, import_jsx_runtime19.jsx)(PaginationGroupCell, { variant: "ellipsis" }, `e${i}`) : (0, import_jsx_runtime19.jsx)(PaginationGroupCell, { variant: "number", page: p, active: p === current, onSelect: () => go(p) }, p)), mobile ? (0, import_jsx_runtime19.jsx)(PaginationGroupCell, { variant: "next-icon", edge: "last", disabled: current === totalPages, onSelect: () => go(current + 1) }) : (0, import_jsx_runtime19.jsx)(PaginationGroupCell, { variant: "next", edge: "last", label: "Next", disabled: current === totalPages, onSelect: () => go(current + 1) })] });
    };
    if (isCircle) {
      const isCard = type === "card";
      return (0, import_jsx_runtime19.jsxs)("nav", { "aria-label": "Pagination", className: [CONTAINER_BORDER, className || ""].filter(Boolean).join(" "), children: [(0, import_jsx_runtime19.jsxs)("div", { className: [
        "hidden sm:flex items-center justify-center gap-[var(--pea-space-3)] min-w-full w-max max-w-[1216px]",
        isCard ? "pt-[var(--pea-space-3)] pb-[var(--pea-space-4)] px-[var(--pea-space-6)]" : "pt-[var(--pea-space-5)]"
      ].join(" "), children: [(0, import_jsx_runtime19.jsx)("div", { className: "flex flex-1 items-center min-w-0", children: (0, import_jsx_runtime19.jsx)(Button, { variant: "secondary", size: "sm", isDisabled: current === 1, onClick: () => go(current - 1), leadingIcon: (0, import_jsx_runtime19.jsx)(ArrowLeftIcon, {}), children: "Previous" }) }), numbersRow, (0, import_jsx_runtime19.jsx)("div", { className: "flex flex-1 items-center justify-end min-w-0", children: (0, import_jsx_runtime19.jsx)(Button, { variant: "secondary", size: "sm", isDisabled: current === totalPages, onClick: () => go(current + 1), trailingIcon: (0, import_jsx_runtime19.jsx)(ArrowRightIcon, {}), children: "Next" }) })] }), (0, import_jsx_runtime19.jsxs)("div", { className: [
        "flex sm:hidden items-center justify-between",
        isCard ? "pt-[var(--pea-space-3)] pb-[var(--pea-space-4)] px-[var(--pea-space-4)]" : "pt-[var(--pea-space-4)]"
      ].join(" "), children: [(0, import_jsx_runtime19.jsx)(Button, { variant: "secondary", size: "sm", iconOnly: true, isDisabled: current === 1, onClick: () => go(current - 1), leadingIcon: (0, import_jsx_runtime19.jsx)(ArrowLeftIcon, {}) }), (0, import_jsx_runtime19.jsx)("span", { className: POSITION_LABEL, children: positionLabel }), (0, import_jsx_runtime19.jsx)(Button, { variant: "secondary", size: "sm", iconOnly: true, isDisabled: current === totalPages, onClick: () => go(current + 1), leadingIcon: (0, import_jsx_runtime19.jsx)(ArrowRightIcon, {}) })] })] });
    }
    const rightAligned = type === "card-right-align";
    const centerAligned = type === "card-center-align";
    if (rightAligned) {
      return (0, import_jsx_runtime19.jsxs)("nav", { "aria-label": "Pagination", className: [CONTAINER_BORDER, className || ""].filter(Boolean).join(" "), children: [(0, import_jsx_runtime19.jsxs)("div", { className: "hidden sm:flex items-center gap-[var(--pea-space-3)] min-w-full w-max max-w-[1216px] pt-[var(--pea-space-3)] pb-[var(--pea-space-4)] px-[var(--pea-space-6)]", children: [(0, import_jsx_runtime19.jsx)("div", { className: "flex flex-[1_0_0] items-center h-[40px]", children: (0, import_jsx_runtime19.jsx)("span", { className: POSITION_LABEL, children: positionLabel }) }), buttonGroup(false)] }), (0, import_jsx_runtime19.jsxs)("div", { className: "flex sm:hidden flex-col items-center gap-[var(--pea-space-2)] px-[var(--pea-space-4)] py-[var(--pea-space-3)]", children: [buttonGroup(true), (0, import_jsx_runtime19.jsx)("span", { className: POSITION_LABEL, children: positionLabel })] })] });
    }
    if (centerAligned) {
      return (0, import_jsx_runtime19.jsxs)("nav", { "aria-label": "Pagination", className: [CONTAINER_BORDER, className || ""].filter(Boolean).join(" "), children: [(0, import_jsx_runtime19.jsx)("div", { className: "hidden sm:flex flex-col items-center justify-center gap-[var(--pea-space-2)] min-w-full w-max max-w-[1216px] pt-[var(--pea-space-3)] pb-[var(--pea-space-4)] px-[var(--pea-space-6)]", children: buttonGroup(false) }), (0, import_jsx_runtime19.jsxs)("div", { className: "flex sm:hidden flex-col items-center gap-[var(--pea-space-2)] px-[var(--pea-space-4)] py-[var(--pea-space-3)]", children: [buttonGroup(true), (0, import_jsx_runtime19.jsx)("span", { className: POSITION_LABEL, children: positionLabel })] })] });
    }
    return null;
  };
  Pagination.displayName = "Pagination";

  // projects/react/dist/empty-state/index.js
  init_define_import_meta_env();

  // projects/react/dist/empty-state/EmptyState.js
  init_define_import_meta_env();
  var import_jsx_runtime20 = __toESM(require_react_shim(), 1);

  // projects/react/dist/empty-state/configs.js
  init_define_import_meta_env();
  var CONTENT_PRESETS = {
    "search-not-found": {
      title: "No results found",
      supportingText: "Your search did not match any results. Please try again.",
      icon: "search-lg",
      illustrationSrc: "https://design.pea.co.th/illustrations/search-not-found.svg"
    },
    "empty": {
      title: "No data yet",
      supportingText: "Get started by creating your first item.",
      icon: "folder",
      illustrationSrc: "https://design.pea.co.th/illustrations/empty-folder.svg"
    }
  };
  var ILLUSTRATION_SIZE = {
    "search-not-found": { sm: "w-[152px] h-[97px]", md: "w-[172px] h-[108px]", lg: "w-[220px] h-[140px]" },
    "empty": { sm: "w-[152px] h-[147px]", md: "w-[172px] h-[166px]", lg: "w-[220px] h-[212px]" }
  };
  var CONTENT_ACTIONS_GAP = {
    sm: "gap-[var(--pea-space-6)]",
    md: "gap-[var(--pea-space-8)]",
    lg: "gap-[var(--pea-space-8)]"
  };
  var ICON_TO_TEXT_GAP = {
    "featured-icon": { sm: "gap-[var(--pea-space-4)]", md: "gap-[var(--pea-space-5)]", lg: "gap-[var(--pea-space-5)]" },
    "illustration": { sm: "gap-[var(--pea-space-4)]", md: "gap-[var(--pea-space-5)]", lg: "gap-[var(--pea-space-6)]" }
  };
  var TITLE_GAP = {
    sm: "gap-[var(--pea-space-1)]",
    md: "gap-[var(--pea-space-2)]",
    lg: "gap-[var(--pea-space-2)]"
  };
  var TITLE_TYPE = {
    sm: "pea-typescale-text-md",
    md: "pea-typescale-text-lg",
    lg: "pea-typescale-text-xl"
  };
  var SUPPORTING_TYPE = {
    sm: "pea-typescale-text-sm",
    md: "pea-typescale-text-sm",
    lg: "pea-typescale-text-md"
  };
  var FEATURED_ICON_SIZE_MAP = {
    sm: "lg",
    md: "lg",
    lg: "xl"
  };
  var BUTTON_SIZE_MAP = {
    sm: "md",
    md: "md",
    lg: "lg"
  };

  // projects/react/dist/empty-state/EmptyState.js
  var EmptyState = ({ size = "sm", variant = "featured-icon", content = "search-not-found", title: titleProp, supportingText: supportingTextProp, icon: iconProp, illustration: illustrationProp, primaryButtonLabel: primaryLabelProp, secondaryButtonLabel: secondaryLabelProp, primaryButtonIcon: primaryIconProp, onPrimaryClick, onSecondaryClick, showIcon = true, children, className }) => {
    const preset = CONTENT_PRESETS[content];
    const title = titleProp ?? preset.title;
    const supportingText = supportingTextProp ?? preset.supportingText;
    const icon = iconProp ?? preset.icon;
    const primaryButtonLabel = primaryLabelProp;
    const secondaryButtonLabel = secondaryLabelProp;
    const primaryButtonIcon = primaryIconProp;
    const fiSize = FEATURED_ICON_SIZE_MAP[size];
    const btnSize = BUTTON_SIZE_MAP[size];
    const renderedIcon = typeof icon === "string" ? (0, import_jsx_runtime20.jsx)("span", { className: `icon ${icon}` }) : icon;
    if (children) {
      return (0, import_jsx_runtime20.jsx)("div", { className: ["flex flex-col items-center w-[512px] text-center", CONTENT_ACTIONS_GAP[size], className].filter(Boolean).join(" "), children });
    }
    const illustrationEl = illustrationProp || (0, import_jsx_runtime20.jsx)("img", { src: preset.illustrationSrc, alt: "", className: `object-contain ${ILLUSTRATION_SIZE[content][size]}` });
    return (0, import_jsx_runtime20.jsxs)("div", { className: ["flex flex-col items-center w-[512px]", CONTENT_ACTIONS_GAP[size], className].filter(Boolean).join(" "), children: [(0, import_jsx_runtime20.jsxs)("div", { className: ["flex flex-col items-center w-full", ICON_TO_TEXT_GAP[variant][size]].join(" "), children: [variant === "featured-icon" && showIcon && (0, import_jsx_runtime20.jsx)(FeaturedIcon, { size: fiSize, variant: "modern", color: "gray", icon: renderedIcon }), variant === "illustration" && illustrationEl, (0, import_jsx_runtime20.jsxs)("div", { className: ["flex flex-col items-center text-center w-full max-w-[352px]", TITLE_GAP[size]].join(" "), children: [(0, import_jsx_runtime20.jsx)("p", { className: `w-full pea-font-semibold [color:var(--pea-text-primary)] ${TITLE_TYPE[size]}`, children: title }), supportingText && (0, import_jsx_runtime20.jsx)("p", { className: `w-full pea-font-normal [color:var(--pea-text-tertiary)] ${SUPPORTING_TYPE[size]}`, children: supportingText })] })] }), (0, import_jsx_runtime20.jsxs)("div", { className: "flex items-start gap-[var(--pea-space-3)]", children: [secondaryButtonLabel && (0, import_jsx_runtime20.jsx)(Button, { variant: "secondary", size: btnSize, onClick: onSecondaryClick, children: secondaryButtonLabel }), primaryButtonLabel && (0, import_jsx_runtime20.jsx)(Button, { variant: "primary", size: btnSize, onClick: onPrimaryClick, leadingIcon: primaryButtonIcon, children: primaryButtonLabel })] })] });
  };
  EmptyState.displayName = "EmptyState";

  // projects/react/dist/textarea/index.js
  init_define_import_meta_env();

  // projects/react/dist/textarea/Textarea.js
  init_define_import_meta_env();
  var import_jsx_runtime21 = __toESM(require_react_shim(), 1);
  var React12 = __toESM(require_react_shim(), 1);

  // projects/react/dist/textarea/configs.js
  init_define_import_meta_env();
  var TEXTAREA_CONTAINER = "flex flex-col gap-[var(--pea-space-1_5)] w-full";
  var TEXTAREA_LABEL_CLASS = "pea-typescale-text-sm pea-font-medium";
  var TEXTAREA_LABEL_COLOR = "[color:var(--pea-text-secondary)]";
  var TEXTAREA_LABEL_DISABLED = "cursor-not-allowed";
  var TEXTAREA_REQUIRED_STAR = "[color:var(--pea-text-brand-tertiary)]";
  var TEXTAREA_HELP_ICON_SIZE = 16;
  var TEXTAREA_HELP_ICON_COLOR = "text-[var(--pea-fg-quaternary)]";
  var TEXTAREA_HELP_ICON_HOVER_COLOR = "text-[var(--pea-fg-quaternary-hover)]";
  var TEXTAREA_WRAPPER_BASE = "box-border flex rounded-[var(--pea-rounded-md)] shadow-[0px_1px_2px_0px_var(--pea-effect-shadow-xs)]";
  var TEXTAREA_WRAPPER_BORDER = {
    default: "border [border-color:var(--pea-border-primary)]",
    focused: "border [border-color:var(--pea-border-brand)] [box-shadow:0_0_0_1px_var(--pea-border-brand)]",
    error: "border [border-color:var(--pea-border-error-subtle)]",
    errorFocused: "border [border-color:var(--pea-border-error)] [box-shadow:0_0_0_1px_var(--pea-border-error)]",
    disabled: "border [border-color:var(--pea-border-disabled)]"
  };
  var TEXTAREA_WRAPPER_BG = {
    default: "bg-[var(--pea-bg-primary)]",
    disabled: "bg-[var(--pea-bg-disabled-subtle)]"
  };
  var TEXTAREA_DEFAULT_PAD = "px-[14px] py-[var(--pea-space-3)]";
  var TEXTAREA_TAGS_PAD = "p-[var(--pea-space-3)]";
  var TEXTAREA_TAGS_WRAP_GAP = "gap-[var(--pea-space-2)]";
  var TEXTAREA_TAGS_ROW_GAP = "gap-[var(--pea-space-1_5)]";
  var TEXTAREA_NATIVE_BASE = "flex-1 min-h-[104px] bg-transparent outline-none pea-typescale-text-md pea-font-normal";
  var TEXTAREA_NATIVE_TEXT = "[color:var(--pea-text-primary)] placeholder:[color:var(--pea-text-placeholder)]";
  var TEXTAREA_NATIVE_DISABLED = "[color:var(--pea-text-disabled)] placeholder:[color:var(--pea-text-disabled)] cursor-not-allowed";
  var TEXTAREA_HINT_CLASS = "pea-typescale-text-sm pea-font-normal";
  var TEXTAREA_HINT_COLOR = "[color:var(--pea-text-tertiary)]";
  var TEXTAREA_ERROR_COLOR = "[color:var(--pea-text-error-primary)]";

  // projects/react/dist/textarea/Textarea.js
  var HelpCircleIcon = ({ size = 16, className }) => (0, import_jsx_runtime21.jsx)("svg", { width: size, height: size, viewBox: "0 0 16 16", fill: "none", className, "aria-hidden": "true", children: (0, import_jsx_runtime21.jsx)("path", { d: "M6.06 6a2 2 0 0 1 3.887.667c0 1.333-2 2-2 2M8 11.333h.007M14.667 8A6.667 6.667 0 1 1 1.333 8a6.667 6.667 0 0 1 13.334 0Z", stroke: "currentColor", strokeWidth: "1.33", strokeLinecap: "round", strokeLinejoin: "round" }) });
  var XCloseIcon = ({ size = 12 }) => (0, import_jsx_runtime21.jsx)("svg", { width: size, height: size, viewBox: "0 0 12 12", fill: "none", "aria-hidden": "true", children: (0, import_jsx_runtime21.jsx)("path", { d: "M9 3L3 9M3 3l6 6", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) });
  function HelpIconWithTooltip({ content, disabled }) {
    const [hovered, setHovered] = React12.useState(false);
    const tooltipText = content || "Tooltip content";
    if (disabled) {
      return (0, import_jsx_runtime21.jsx)("span", { className: "inline-flex shrink-0", children: (0, import_jsx_runtime21.jsx)(HelpCircleIcon, { size: TEXTAREA_HELP_ICON_SIZE, className: TEXTAREA_HELP_ICON_COLOR }) });
    }
    return (0, import_jsx_runtime21.jsxs)("span", { className: "relative inline-flex shrink-0 cursor-help", onMouseEnter: () => setHovered(true), onMouseLeave: () => setHovered(false), children: [(0, import_jsx_runtime21.jsx)(HelpCircleIcon, { size: TEXTAREA_HELP_ICON_SIZE, className: hovered ? TEXTAREA_HELP_ICON_HOVER_COLOR : TEXTAREA_HELP_ICON_COLOR }), hovered && (0, import_jsx_runtime21.jsx)("div", { role: "tooltip", className: "absolute bottom-full left-1/2 -translate-x-1/2 mb-[var(--pea-space-2)] z-10 px-[var(--pea-space-3)] py-[var(--pea-space-2)] rounded-[var(--pea-rounded-md)] bg-[var(--pea-component-tooltip-bg)] [color:var(--pea-component-tooltip-text)] pea-typescale-text-xs pea-font-medium whitespace-nowrap shadow-[0_12px_16px_-4px_var(--pea-effect-shadow-lg-01),0_4px_6px_-2px_var(--pea-effect-shadow-lg-02)]", children: tooltipText })] });
  }
  function TagChip2({ label, onRemove, disabled }) {
    return (0, import_jsx_runtime21.jsxs)("span", { className: "inline-flex items-center gap-[var(--pea-space-1)] rounded-[var(--pea-rounded-sm)] border border-solid border-[var(--pea-border-primary)] bg-[var(--pea-bg-primary)] px-[var(--pea-space-2)] py-[var(--pea-space-0_5)] pea-typescale-text-sm pea-font-medium [color:var(--pea-text-secondary)]", children: [label, onRemove && !disabled && (0, import_jsx_runtime21.jsx)("button", { type: "button", onClick: onRemove, className: "inline-flex items-center justify-center shrink-0 cursor-pointer outline-none [color:var(--pea-fg-quaternary)] hover:[color:var(--pea-fg-quaternary-hover)]", "aria-label": `Remove ${label}`, children: (0, import_jsx_runtime21.jsx)(XCloseIcon, { size: 12 }) })] });
  }
  var Textarea = ({ type = "default", value: controlledValue, defaultValue = "", placeholder, label, hint, error, isDisabled = false, isRequired = false, helpIcon = false, helpTooltipContent, resizable = true, tags: controlledTags, defaultTags, onChange, onTagsChange, onBlur, onFocus, className }) => {
    const id = React12.useId();
    const isControlled = controlledValue !== void 0;
    const [internalValue, setInternalValue] = React12.useState(defaultValue);
    const value = isControlled ? controlledValue : internalValue;
    const isTagsControlled = controlledTags !== void 0;
    const [internalTags, setInternalTags] = React12.useState(defaultTags ?? []);
    const [tagInput, setTagInput] = React12.useState("");
    const tags = isTagsControlled ? controlledTags : internalTags;
    const [focused, setFocused] = React12.useState(false);
    const hasError = !!error;
    const borderCl = isDisabled ? TEXTAREA_WRAPPER_BORDER.disabled : hasError && focused ? TEXTAREA_WRAPPER_BORDER.errorFocused : hasError ? TEXTAREA_WRAPPER_BORDER.error : focused ? TEXTAREA_WRAPPER_BORDER.focused : TEXTAREA_WRAPPER_BORDER.default;
    const bgCl = isDisabled ? TEXTAREA_WRAPPER_BG.disabled : TEXTAREA_WRAPPER_BG.default;
    const textCl = isDisabled ? TEXTAREA_NATIVE_DISABLED : TEXTAREA_NATIVE_TEXT;
    const handleChange = (e) => {
      if (isDisabled)
        return;
      const newValue = e.target.value;
      if (!isControlled)
        setInternalValue(newValue);
      onChange?.(newValue);
    };
    const handleFocus = () => {
      setFocused(true);
      onFocus?.();
    };
    const handleBlur = () => {
      setFocused(false);
      onBlur?.();
    };
    const addTag = () => {
      const t = tagInput.trim();
      if (t && !tags.includes(t)) {
        const newTags = [...tags, t];
        if (!isTagsControlled)
          setInternalTags(newTags);
        onTagsChange?.(newTags);
      }
      setTagInput("");
    };
    const removeTag = (index) => {
      const newTags = tags.filter((_, i) => i !== index);
      if (!isTagsControlled)
        setInternalTags(newTags);
      onTagsChange?.(newTags);
    };
    const renderLabel = () => {
      if (!label)
        return null;
      return (0, import_jsx_runtime21.jsxs)("div", { className: "flex items-center gap-[var(--pea-space-0_5)]", children: [(0, import_jsx_runtime21.jsx)("label", { htmlFor: id, className: `${TEXTAREA_LABEL_CLASS} ${TEXTAREA_LABEL_COLOR} ${isDisabled ? TEXTAREA_LABEL_DISABLED : ""}`, children: label }), isRequired && (0, import_jsx_runtime21.jsx)("span", { className: `${TEXTAREA_LABEL_CLASS} ${TEXTAREA_REQUIRED_STAR}`, "aria-hidden": "true", children: "*" }), helpIcon && (0, import_jsx_runtime21.jsx)(HelpIconWithTooltip, { content: helpTooltipContent, disabled: isDisabled })] });
    };
    const renderHint = () => {
      if (!hint && !error)
        return null;
      return (0, import_jsx_runtime21.jsx)("span", { id: `${id}-hint`, className: `${TEXTAREA_HINT_CLASS} ${hasError ? TEXTAREA_ERROR_COLOR : TEXTAREA_HINT_COLOR}`, children: error || hint });
    };
    if (type === "default") {
      return (0, import_jsx_runtime21.jsxs)("div", { className: `${TEXTAREA_CONTAINER} ${className || ""}`, children: [renderLabel(), (0, import_jsx_runtime21.jsx)("div", { className: `${TEXTAREA_WRAPPER_BASE} ${borderCl} ${bgCl}`, children: (0, import_jsx_runtime21.jsx)("textarea", { id, value, onChange: handleChange, onFocus: handleFocus, onBlur: handleBlur, disabled: isDisabled, placeholder: placeholder ?? "Enter a description...", className: [
        TEXTAREA_NATIVE_BASE,
        TEXTAREA_DEFAULT_PAD,
        resizable ? "resize-y" : "resize-none",
        isDisabled ? "cursor-not-allowed" : "",
        textCl
      ].join(" "), "aria-invalid": hasError, "aria-required": isRequired, "aria-describedby": hint || error ? `${id}-hint` : void 0 }) }), renderHint()] });
    }
    return (0, import_jsx_runtime21.jsxs)("div", { className: `${TEXTAREA_CONTAINER} ${className || ""}`, children: [renderLabel(), (0, import_jsx_runtime21.jsx)("div", { className: [
      TEXTAREA_WRAPPER_BASE,
      "flex-col min-h-[104px] overflow-auto",
      TEXTAREA_TAGS_PAD,
      TEXTAREA_TAGS_WRAP_GAP,
      resizable ? "resize-y" : "resize-none",
      borderCl,
      bgCl,
      isDisabled ? "cursor-not-allowed" : ""
    ].join(" "), onFocus: () => !isDisabled && setFocused(true), onBlur: () => setFocused(false), children: (0, import_jsx_runtime21.jsxs)("div", { className: `flex flex-wrap items-center ${TEXTAREA_TAGS_WRAP_GAP} w-full`, children: [(0, import_jsx_runtime21.jsx)("div", { className: `flex flex-wrap items-center ${TEXTAREA_TAGS_ROW_GAP}`, children: tags.map((t, i) => (0, import_jsx_runtime21.jsx)(TagChip2, { label: t, onRemove: isDisabled ? void 0 : () => removeTag(i), disabled: isDisabled }, `${t}-${i}`)) }), (0, import_jsx_runtime21.jsx)("input", { id, value: tagInput, onChange: (e) => setTagInput(e.target.value), onKeyDown: (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        addTag();
      } else if (e.key === "Backspace" && tagInput === "" && tags.length)
        removeTag(tags.length - 1);
    }, onFocus: handleFocus, onBlur: handleBlur, disabled: isDisabled, placeholder: tags.length ? "" : placeholder ?? "Add tags...", className: [
      "flex-1 min-w-[80px] bg-transparent outline-none pea-typescale-text-md pea-font-normal",
      isDisabled ? "cursor-not-allowed" : "",
      textCl
    ].join(" "), "aria-describedby": hint || error ? `${id}-hint` : void 0 })] }) }), renderHint()] });
  };
  Textarea.displayName = "Textarea";
  return __toCommonJS(index_exports);
})();
window.PeaDsReact=PeaDsReact.__dsMainNs?Object.assign({},PeaDsReact,PeaDsReact.__dsMainNs,{__dsMainNs:undefined}):PeaDsReact;
