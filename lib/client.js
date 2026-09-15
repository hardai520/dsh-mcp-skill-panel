window.__ModuleLoader__.load({
	id: "dsh-mcp-skill-panel",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		var __defProp = Object.defineProperty;
		var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
		var __getOwnPropNames = Object.getOwnPropertyNames;
		var __hasOwnProp = Object.prototype.hasOwnProperty;
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
		var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

		// dsh-mcp-skill-panel/src/client/index.tsx
		var index_exports = {};
		__export(index_exports, {
		  apply: () => apply,
		  inject: () => inject
		});
		module.exports = index_exports;

		// dsh-mcp-skill-panel/src/shared.ts
		var VERSION = "0.2.0";
		var REQUEST_PATH = "/api/mcp-skill-panel";
		var MCP_SECTION_ID = "mcp";
		var MCP_SECTION_ORDER = 16;
		var SKILLS_SECTION_ID = "skills";
		var SKILLS_SECTION_ORDER = 17;
		var LOCALE_NS = "settings.mcpSkillPanel";
		var MCP_ENTRY_ID_PATTERN = /^[A-Za-z0-9_-]{1,64}$/;
		var MCP_SERVER_NAME_PATTERN = /^[A-Za-z0-9_-]{1,32}$/;
		var SKILL_CONTENT_LIMIT = 4e4;

		// dsh-mcp-skill-panel/src/client/McpSection.tsx
		var import_react4 = require("react");

		// dsh-mcp-skill-panel/src/client/HostFactsCard.tsx
		var import_react = require("react");
		var import_jsx_runtime = require("react/jsx-runtime");
		function HostFactsCard({ call, t }) {
		  const [state, setState] = (0, import_react.useState)({ phase: "loading" });
		  const refresh = (0, import_react.useCallback)(() => {
		    setState({ phase: "loading" });
		    void call("ping").then(
		      (facts) => {
		        setState({ phase: "ready", facts });
		      },
		      (error) => {
		        const message = error instanceof Error ? error.message : String(error);
		        setState({ phase: "failed", message });
		      }
		    );
		  }, [call]);
		  (0, import_react.useEffect)(() => {
		    refresh();
		  }, [refresh]);
		  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: "msp-card", children: [
		    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "msp-card-head", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "msp-card-title", children: t("facts.title") }),
		      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "msp-spacer" }),
		      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "msp-btn msp-btn-sm", onClick: refresh, children: t("facts.refresh") })
		    ] }),
		    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "msp-hint", children: t("facts.hint") }),
		    state.phase === "ready" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VersionBanner, { facts: state.facts, t }) : null,
		    state.phase === "loading" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "msp-none", children: t("facts.loading") }),
		    state.phase === "failed" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { className: "msp-error", children: [
		      t("facts.failed"),
		      " \u2014 ",
		      state.message
		    ] }),
		    state.phase === "ready" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Facts, { facts: state.facts, t })
		  ] });
		}
		function versionWarning(facts, t) {
		  if (facts.version === VERSION) return void 0;
		  return t("facts.versionMismatch", { host: facts.version, client: VERSION });
		}
		function VersionBanner({ facts, t }) {
		  const warning = versionWarning(facts, t);
		  return warning === void 0 ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "msp-banner", children: warning });
		}
		function Facts({ facts, t }) {
		  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "msp-rows", children: [
		    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, { label: t("facts.plugin"), value: `${facts.plugin}@${facts.version}` }),
		    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, { label: t("facts.dshHome"), value: facts.dshHome }),
		    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, { label: t("facts.loaderEntries"), value: String(facts.loaderEntries) }),
		    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, { label: t("facts.mcpEntries"), value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StringList, { items: facts.mcpEntries, empty: t("facts.none") }) }),
		    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, { label: t("facts.patchFiles"), value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StringList, { items: facts.patchFiles, empty: t("facts.none") }) }),
		    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, { label: t("facts.patchFile"), value: facts.patchFile }),
		    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, { label: t("facts.patchReload"), value: facts.patchReload ?? t("facts.none") }),
		    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, { label: t("facts.skills"), value: skillsText(facts, t) })
		  ] });
		}
		function skillsText(facts, t) {
		  if (!facts.skills.available || facts.skills.count === null) return t("facts.skillsUnavailable");
		  return t("facts.skillsCount", { count: String(facts.skills.count), presets: String(facts.skills.presets) });
		}
		function Row({ label, value }) {
		  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "msp-row", children: [
		    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "msp-row-label", children: label }),
		    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "msp-row-value", children: value })
		  ] });
		}
		function StringList({ items, empty }) {
		  if (items.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "msp-none", children: empty });
		  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { className: "msp-list", children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { className: "msp-list-item", children: item }, item)) });
		}

		// dsh-mcp-skill-panel/src/client/McpJsonForm.tsx
		var import_react2 = require("react");

		// dsh-mcp-skill-panel/src/client/icons.tsx
		var import_jsx_runtime2 = require("react/jsx-runtime");
		function Svg({ size = 16, children }) {
		  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
		    "svg",
		    {
		      width: size,
		      height: size,
		      viewBox: "0 0 16 16",
		      fill: "none",
		      stroke: "currentColor",
		      strokeWidth: "1.4",
		      strokeLinecap: "round",
		      strokeLinejoin: "round",
		      "aria-hidden": "true",
		      focusable: "false",
		      children
		    }
		  );
		}
		function ServerIcon(props) {
		  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Svg, { ...props, children: [
		    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("rect", { x: "2", y: "2.5", width: "12", height: "4.6", rx: "1.2" }),
		    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("rect", { x: "2", y: "8.9", width: "12", height: "4.6", rx: "1.2" }),
		    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M4.6 4.8h.01M4.6 11.2h.01" })
		  ] });
		}
		function PlusIcon(props) {
		  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Svg, { ...props, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M8 3.4v9.2M3.4 8h9.2" }) });
		}
		function RefreshIcon(props) {
		  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Svg, { ...props, children: [
		    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M13.2 8a5.2 5.2 0 1 1-1.6-3.75" }),
		    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M13.4 2.6v3.2h-3.2" })
		  ] });
		}
		function PowerIcon(props) {
		  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Svg, { ...props, children: [
		    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M8 2.4v5.1" }),
		    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M11.6 4.3a4.8 4.8 0 1 1-7.2 0" })
		  ] });
		}
		function PlugIcon(props) {
		  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Svg, { ...props, children: [
		    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M5.6 2v3.4M10.4 2v3.4" }),
		    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M3.9 5.4h8.2v1.5a4.1 4.1 0 0 1-8.2 0z" }),
		    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M8 11v3" })
		  ] });
		}
		function EditIcon(props) {
		  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Svg, { ...props, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M11.1 2.6 13.4 4.9 5.9 12.4 3 13l.6-2.9z" }) });
		}
		function TrashIcon(props) {
		  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Svg, { ...props, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M3 4.4h10M6.4 4.4V3.1h3.2v1.3M4.2 4.4l.6 8.3h6.4l.6-8.3" }) });
		}
		function SwapIcon(props) {
		  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Svg, { ...props, children: [
		    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M3 5.6h8.4M9.4 3.2l2.4 2.4-2.4 2.4" }),
		    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M13 10.4H4.6M6.6 8l-2.4 2.4L6.6 12.8" })
		  ] });
		}
		function SearchIcon(props) {
		  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Svg, { ...props, children: [
		    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("circle", { cx: "7.2", cy: "7.2", r: "4.2" }),
		    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M10.4 10.4 13.6 13.6" })
		  ] });
		}
		function ChevronIcon(props) {
		  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Svg, { ...props, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M6 3.5 10.5 8 6 12.5" }) });
		}

		// dsh-mcp-skill-panel/src/client/McpJsonForm.tsx
		var import_jsx_runtime3 = require("react/jsx-runtime");
		var EXAMPLE = '{\n  "mcpServers": {\n    "github": {\n      "command": "npx",\n      "args": ["-y", "@modelcontextprotocol/server-github"]\n    }\n  }\n}';
		function McpJsonForm(props) {
		  const { call, t, busy, onClose, onImported } = props;
		  const [text, setText] = (0, import_react2.useState)("");
		  const [notice, setNotice] = (0, import_react2.useState)(null);
		  const [rejected, setRejected] = (0, import_react2.useState)(null);
		  const [working, setWorking] = (0, import_react2.useState)(false);
		  const submit = async () => {
		    setWorking(true);
		    setNotice(null);
		    setRejected(null);
		    try {
		      const response = await call("mcp.import", { text });
		      const { added, updated, errors } = response.imported;
		      setNotice(t("paste.imported", { added: String(added.length), updated: String(updated.length) }));
		      setRejected(errors.length === 0 ? null : t("paste.rejected", {
		        count: String(errors.length),
		        detail: errors.map((error) => `${error.id}: ${error.message}`).join("; ")
		      }));
		      onImported(response);
		    } catch (failure) {
		      setNotice(describe(failure));
		    } finally {
		      setWorking(false);
		    }
		  };
		  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "msp-form", children: [
		    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "msp-form-title", children: t("paste.title") }),
		    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "msp-hint", children: t("paste.hint") }),
		    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("pre", { className: "msp-pre", children: EXAMPLE }),
		    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("label", { className: "msp-field", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "msp-label", children: t("paste.label") }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
		        "textarea",
		        {
		          className: "msp-input msp-textarea",
		          rows: 8,
		          spellCheck: false,
		          placeholder: t("paste.placeholder"),
		          value: text,
		          onChange: (event) => setText(event.target.value)
		        }
		      )
		    ] }),
		    notice !== null ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "msp-hint", children: notice }) : null,
		    rejected !== null ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "msp-error", children: rejected }) : null,
		    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "msp-form-actions", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: "msp-btn msp-btn-sm", onClick: onClose, children: t("paste.close") }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
		        "button",
		        {
		          type: "button",
		          className: "msp-btn msp-btn-sm msp-btn-primary",
		          onClick: () => void submit(),
		          disabled: busy || working || text.trim() === "",
		          children: [
		            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(SwapIcon, { size: 12 }),
		            " ",
		            t("paste.button")
		          ]
		        }
		      )
		    ] })
		  ] });
		}
		function describe(error) {
		  const message = error instanceof Error ? error.message : String(error);
		  return message.replace(/^[a-z-]+: /, "");
		}

		// dsh-mcp-skill-panel/src/client/McpServerForm.tsx
		var import_react3 = require("react");
		var import_jsx_runtime4 = require("react/jsx-runtime");
		var EMPTY_FORM = {
		  id: "",
		  serverName: "",
		  transport: "streamable-http",
		  url: "",
		  command: "",
		  argsText: "",
		  envText: "",
		  cwd: "",
		  headersText: "",
		  timeoutText: "",
		  failOnStartupError: false
		};
		function McpServerForm(props) {
		  const { call, t, initial, takenIds, takenNames, busy, onClose, onSaved } = props;
		  const editing = initial !== void 0;
		  const [form, setForm] = (0, import_react3.useState)(() => toForm(initial));
		  const [fieldErrors, setFieldErrors] = (0, import_react3.useState)({});
		  const [submitError, setSubmitError] = (0, import_react3.useState)(null);
		  const [saving, setSaving] = (0, import_react3.useState)(false);
		  const set = (key, value) => {
		    setForm((previous) => ({ ...previous, [key]: value }));
		  };
		  const localErrors = () => {
		    const errors = {};
		    const id = form.id.trim();
		    if (id === "") errors.id = t("err.idRequired");
		    else if (!MCP_ENTRY_ID_PATTERN.test(id)) errors.id = t("err.idPattern");
		    else if (!editing && takenIds.includes(id)) errors.id = t("err.idTaken");
		    const name = form.serverName.trim();
		    if (name === "") errors.serverName = t("err.nameRequired");
		    else if (!MCP_SERVER_NAME_PATTERN.test(name)) errors.serverName = t("err.namePattern");
		    else if (!editing && takenNames.includes(name)) errors.serverName = t("err.nameTaken");
		    if (form.transport === "streamable-http" && form.url.trim() === "") errors.url = t("err.urlRequired");
		    if (form.transport === "stdio" && form.command.trim() === "") errors.command = t("err.commandRequired");
		    return errors;
		  };
		  const submit = async () => {
		    const errors = localErrors();
		    setFieldErrors(errors);
		    setSubmitError(null);
		    if (Object.keys(errors).length > 0) return;
		    setSaving(true);
		    try {
		      const config = toConfig(form);
		      const id = form.id.trim();
		      if (editing) await call("mcp.update", { id, config });
		      else await call("mcp.add", { id, config });
		      onSaved();
		    } catch (error) {
		      const rejection = asRejection(error);
		      setFieldErrors(rejection.fields);
		      setSubmitError(messageFor(rejection, t));
		    } finally {
		      setSaving(false);
		    }
		  };
		  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
		    "form",
		    {
		      className: "msp-form",
		      onSubmit: (event) => {
		        event.preventDefault();
		        void submit();
		      },
		      children: [
		        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "msp-form-title", children: editing ? t("form.editTitle", { name: initial.serverName }) : t("form.addTitle") }),
		        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Field, { label: t("form.entryId"), hint: t("form.entryIdHint", { entryId: `msp-${form.id.trim() || "\u2026"}` }), error: fieldErrors.id, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
		          "input",
		          {
		            className: inputClass(fieldErrors.id),
		            value: form.id,
		            disabled: editing,
		            onChange: (event) => set("id", event.target.value)
		          }
		        ) }),
		        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Field, { label: t("form.serverName"), hint: t("form.serverNameHint", { name: form.serverName.trim() || "\u2026" }), error: fieldErrors.serverName, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
		          "input",
		          {
		            className: inputClass(fieldErrors.serverName),
		            value: form.serverName,
		            onChange: (event) => set("serverName", event.target.value)
		          }
		        ) }),
		        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Field, { label: t("form.transport"), error: void 0, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
		          "select",
		          {
		            className: "msp-input",
		            value: form.transport,
		            onChange: (event) => set("transport", event.target.value === "stdio" ? "stdio" : "streamable-http"),
		            children: [
		              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("option", { value: "streamable-http", children: t("form.transportHttp") }),
		              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("option", { value: "stdio", children: t("form.transportStdio") })
		            ]
		          }
		        ) }),
		        form.transport === "streamable-http" ? /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
		          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Field, { label: t("form.url"), error: fieldErrors.url, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("input", { className: inputClass(fieldErrors.url), value: form.url, onChange: (event) => set("url", event.target.value) }) }),
		          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Field, { label: t("form.headers"), error: fieldErrors.headers, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
		            "textarea",
		            {
		              className: "msp-input msp-textarea",
		              value: form.headersText,
		              onChange: (event) => set("headersText", event.target.value)
		            }
		          ) })
		        ] }) : /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
		          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Field, { label: t("form.command"), error: fieldErrors.command, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("input", { className: inputClass(fieldErrors.command), value: form.command, onChange: (event) => set("command", event.target.value) }) }),
		          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Field, { label: t("form.args"), error: fieldErrors.args, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("textarea", { className: "msp-input msp-textarea", value: form.argsText, onChange: (event) => set("argsText", event.target.value) }) }),
		          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Field, { label: t("form.env"), error: fieldErrors.env, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("textarea", { className: "msp-input msp-textarea", value: form.envText, onChange: (event) => set("envText", event.target.value) }) }),
		          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Field, { label: t("form.cwd"), error: fieldErrors.cwd, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("input", { className: "msp-input", value: form.cwd, onChange: (event) => set("cwd", event.target.value) }) })
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "msp-field-row", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Field, { label: t("form.timeout"), error: fieldErrors.toolCallTimeoutMs, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
		            "input",
		            {
		              className: inputClass(fieldErrors.toolCallTimeoutMs),
		              value: form.timeoutText,
		              inputMode: "numeric",
		              onChange: (event) => set("timeoutText", event.target.value)
		            }
		          ) }),
		          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Field, { label: " ", error: void 0, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("label", { className: "msp-check", children: [
		            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
		              "input",
		              {
		                type: "checkbox",
		                checked: form.failOnStartupError,
		                onChange: (event) => set("failOnStartupError", event.target.checked)
		              }
		            ),
		            t("form.failOnStartup")
		          ] }) })
		        ] }),
		        submitError !== null ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "msp-error", children: submitError }) : null,
		        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "msp-form-actions", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { type: "button", className: "msp-btn msp-btn-sm", onClick: onClose, disabled: saving, children: t("form.cancel") }),
		          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { type: "submit", className: "msp-btn msp-btn-sm msp-btn-primary", disabled: saving || busy, children: saving ? t("form.saving") : t("form.save") })
		        ] })
		      ]
		    }
		  );
		}
		function Field(props) {
		  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "msp-field", children: [
		    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "msp-label", children: props.label }),
		    props.children,
		    props.hint !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "msp-hint", children: props.hint }) : null,
		    props.error !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "msp-error", children: props.error }) : null
		  ] });
		}
		function inputClass(error) {
		  return error === void 0 ? "msp-input" : "msp-input msp-input-invalid";
		}
		function toForm(server) {
		  if (server === void 0) return EMPTY_FORM;
		  return {
		    id: server.id,
		    serverName: server.serverName,
		    transport: server.transport,
		    url: server.url ?? "",
		    command: server.command ?? "",
		    argsText: (server.args ?? []).join("\n"),
		    envText: entriesText(server.env, "="),
		    cwd: server.cwd ?? "",
		    headersText: entriesText(server.headers, ": "),
		    timeoutText: server.toolCallTimeoutMs === void 0 ? "" : String(server.toolCallTimeoutMs),
		    failOnStartupError: server.failOnStartupError === true
		  };
		}
		function entriesText(map, separator) {
		  if (map === void 0) return "";
		  return Object.entries(map).map(([key, value]) => `${key}${separator}${value}`).join("\n");
		}
		function splitLines(text) {
		  return text.split(/\r?\n/).map((line) => line.trim()).filter((line) => line !== "");
		}
		function parsePairs(text) {
		  const lines = splitLines(text);
		  if (lines.length === 0) return void 0;
		  const out = {};
		  for (const line of lines) {
		    const equals = line.indexOf("=");
		    const colon = line.indexOf(":");
		    const separator = equals === -1 ? colon : colon === -1 ? equals : Math.min(equals, colon);
		    if (separator <= 0) continue;
		    out[unquote(line.slice(0, separator))] = unquote(line.slice(separator + 1));
		  }
		  return out;
		}
		function unquote(value) {
		  const trimmed = value.trim();
		  if (trimmed.length >= 2) {
		    const first = trimmed[0];
		    const last = trimmed[trimmed.length - 1];
		    if (first === '"' && last === '"' || first === "'" && last === "'") {
		      return trimmed.slice(1, -1).trim();
		    }
		  }
		  return trimmed;
		}
		function toConfig(form) {
		  const config = {
		    serverName: form.serverName.trim(),
		    transport: form.transport
		  };
		  if (form.transport === "streamable-http") {
		    const url = form.url.trim();
		    if (url !== "") config.url = url;
		    const headers = parsePairs(form.headersText);
		    if (headers !== void 0) config.headers = headers;
		  } else {
		    const command = form.command.trim();
		    if (command !== "") config.command = command;
		    const args = splitLines(form.argsText);
		    if (args.length > 0) config.args = args;
		    const env = parsePairs(form.envText);
		    if (env !== void 0) config.env = env;
		    const cwd = form.cwd.trim();
		    if (cwd !== "") config.cwd = cwd;
		  }
		  const timeout = Number(form.timeoutText.trim());
		  if (form.timeoutText.trim() !== "" && Number.isFinite(timeout) && timeout >= 1) {
		    config.toolCallTimeoutMs = Math.floor(timeout);
		  }
		  if (form.failOnStartupError) config.failOnStartupError = true;
		  return config;
		}
		function asRejection(error) {
		  const code = error.code;
		  const fields = error.fields;
		  const message = error instanceof Error ? error.message : String(error);
		  return { code, raw: message.replace(/^[a-z-]+: /, ""), fields: fields ?? {} };
		}
		function messageFor(rejection, t) {
		  switch (rejection.code) {
		    case "duplicate-id":
		      return t("err.duplicateId");
		    case "duplicate-server-name":
		      return t("err.duplicateName");
		    case "invalid-config":
		      return t("err.invalidConfig");
		    case "not-found":
		      return t("err.notFound");
		    default:
		      return rejection.raw;
		  }
		}

		// dsh-mcp-skill-panel/src/client/McpServerCard.tsx
		var import_jsx_runtime5 = require("react/jsx-runtime");
		function statusOf(server) {
		  if (!server.enabled) return { tone: "off", key: "status.disabled" };
		  switch (server.fiberPhase) {
		    case "active":
		      return server.toolCount > 0 ? { tone: "ok", key: "status.connected", count: String(server.toolCount) } : { tone: "warn", key: "status.noTools" };
		    case "failed":
		      return { tone: "bad", key: "status.failed" };
		    case "loading":
		      return { tone: "warn", key: "status.loading" };
		    case "pending":
		      return { tone: "warn", key: "status.pending" };
		    case "unloading":
		      return { tone: "warn", key: "status.unloading" };
		    default:
		      return { tone: "off", key: "status.notLoaded" };
		  }
		}
		function targetOf(server) {
		  if (server.transport === "stdio") {
		    return [server.command, ...server.args ?? []].filter((part) => part !== void 0).join(" ");
		  }
		  return server.url ?? "";
		}
		function McpServerCard(props) {
		  const { server, t, probe, busy, actionsDisabled } = props;
		  const status = statusOf(server);
		  const target = targetOf(server);
		  const removable = server.patchManaged;
		  const removableTitle = removable ? void 0 : t("err.notRemovable");
		  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "msp-card", children: [
		    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "msp-card-head", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: `msp-status msp-status-${status.tone}`, children: [
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "msp-status-dot" }),
		        t(status.key, status.count === void 0 ? void 0 : { count: status.count })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "msp-tag", title: removable ? void 0 : t("mcp.bundleHint"), children: server.patchManaged ? t("mcp.tagPatch") : t("mcp.tagBundle") }),
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "msp-spacer" }),
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "msp-id", title: server.entryId, children: server.entryId })
		    ] }),
		    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "msp-name", children: server.serverName }),
		    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "msp-target", title: target, children: target === "" ? server.transport : target }),
		    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "msp-meta", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { children: server.transport }),
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { children: t("status.tools", { count: String(server.toolCount) }) }),
		      server.failOnStartupError === true ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { children: t("status.failOnStartup") }) : null,
		      server.reconnect?.enabled === false ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { children: t("status.reconnectOff") }) : null,
		      server.toolCallTimeoutMs !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { children: [
		        server.toolCallTimeoutMs,
		        "ms"
		      ] }) : null
		    ] }),
		    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
		      "details",
		      {
		        className: "msp-tools",
		        onToggle: (event) => {
		          if (!event.currentTarget.open) return;
		          if (props.tools !== void 0 || props.toolsBusy) return;
		          props.onLoadTools(server);
		        },
		        children: [
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("summary", { children: t("tools.title", { count: String(server.toolCount) }) }),
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "msp-tools-body", children: [
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "msp-tools-head", children: [
		              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "msp-hint", children: t("tools.hint") }),
		              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "msp-spacer" }),
		              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
		                "button",
		                {
		                  type: "button",
		                  className: "msp-iconbtn",
		                  title: t("tools.reload"),
		                  "aria-label": t("tools.reload"),
		                  onClick: () => props.onLoadTools(server),
		                  disabled: props.toolsBusy,
		                  children: props.toolsBusy ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "msp-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(RefreshIcon, { size: 12 })
		                }
		              )
		            ] }),
		            props.toolsError !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "msp-banner", children: [
		              t("tools.failed"),
		              " \u2014 ",
		              props.toolsError
		            ] }) : props.tools === void 0 ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("p", { className: "msp-none", children: [
		              props.toolsBusy ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "msp-spin" }) : null,
		              props.toolsBusy ? ` ${t("tools.loading")}` : t("tools.idle")
		            ] }) : !props.tools.available ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "msp-none", children: t("tools.unavailable") }) : props.tools.tools.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "msp-none", children: t("tools.empty") }) : /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_jsx_runtime5.Fragment, { children: [
		              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("ul", { className: "msp-toollist", children: props.tools.tools.map((tool) => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("li", { className: "msp-tool", children: [
		                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("code", { className: "msp-tool-name", children: tool.name }),
		                tool.params.length === 0 ? null : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "msp-tool-params", children: tool.params.map((param) => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "msp-param", title: param.description ?? "", children: [
		                  param.name,
		                  param.required ? "" : "?",
		                  ": ",
		                  param.type
		                ] }, param.name)) }),
		                tool.description === void 0 ? null : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "msp-tool-desc", children: tool.description })
		              ] }, tool.name)) }),
		              props.tools.omitted > 0 ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "msp-hint", children: t("tools.omitted", { count: String(props.tools.omitted) }) }) : null
		            ] })
		          ] })
		        ]
		      }
		    ),
		    probe !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: `msp-probe ${probe.ok ? "msp-probe-ok" : "msp-probe-bad"}`, children: probe.ok ? t("probe.ok", {
		      ms: String(probe.latencyMs),
		      count: probe.toolCount === void 0 ? "?" : String(probe.toolCount)
		    }) : t("probe.fail", { error: probe.error ?? "failed", ms: String(probe.latencyMs) }) }) : null,
		    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "msp-actions", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
		        "button",
		        {
		          type: "button",
		          className: "msp-btn msp-btn-sm",
		          onClick: () => props.onToggle(server),
		          disabled: actionsDisabled,
		          children: [
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(PowerIcon, { size: 12 }),
		            " ",
		            server.enabled ? t("action.disable") : t("action.enable")
		          ]
		        }
		      ),
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
		        "button",
		        {
		          type: "button",
		          className: "msp-btn msp-btn-sm",
		          onClick: () => props.onTest(server),
		          disabled: busy !== null,
		          children: [
		            busy === `probe:${server.id}` ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "msp-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(PlugIcon, { size: 12 }),
		            " ",
		            t("action.test")
		          ]
		        }
		      ),
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "msp-spacer" }),
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
		        "button",
		        {
		          type: "button",
		          className: "msp-btn msp-btn-sm",
		          onClick: () => props.onEdit(server),
		          disabled: actionsDisabled,
		          children: [
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(EditIcon, { size: 12 }),
		            " ",
		            t("action.edit")
		          ]
		        }
		      ),
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
		        "button",
		        {
		          type: "button",
		          className: "msp-btn msp-btn-sm msp-btn-danger",
		          onClick: () => props.onRemove(server),
		          disabled: actionsDisabled || !removable,
		          title: removableTitle,
		          children: [
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(TrashIcon, { size: 12 }),
		            " ",
		            t("action.remove")
		          ]
		        }
		      )
		    ] })
		  ] });
		}

		// dsh-mcp-skill-panel/src/client/errors.ts
		function hostFailureHint(error, t) {
		  if (codeOf(error) !== "unknown-endpoint") return void 0;
		  return t("err.staleHost", { message: messageOf(error), version: VERSION });
		}
		function hostFailureLine(error, t) {
		  const endpoint = endpointOf(error);
		  if (endpoint === void 0) return messageOf(error);
		  return t("err.endpointFailed", { endpoint, message: messageOf(error) });
		}
		function endpointOf(error) {
		  const endpoint = error.endpoint;
		  return typeof endpoint === "string" ? endpoint : void 0;
		}
		function messageOf(error) {
		  const message = error instanceof Error ? error.message : String(error);
		  return message.replace(/^[a-z-]+: /, "");
		}
		function codeOf(error) {
		  return error.code;
		}

		// dsh-mcp-skill-panel/src/client/McpSection.tsx
		var import_jsx_runtime6 = require("react/jsx-runtime");
		function McpSection(props) {
		  const { call, t, onLocaleChange } = props;
		  const [, bump] = (0, import_react4.useReducer)((count) => count + 1, 0);
		  (0, import_react4.useEffect)(() => onLocaleChange(bump), [onLocaleChange]);
		  const [servers, setServers] = (0, import_react4.useState)([]);
		  const [patchFile, setPatchFile] = (0, import_react4.useState)("");
		  const [patchExists, setPatchExists] = (0, import_react4.useState)(true);
		  const [patchReload, setPatchReload] = (0, import_react4.useState)(null);
		  const [warnings, setWarnings] = (0, import_react4.useState)([]);
		  const [loading, setLoading] = (0, import_react4.useState)(true);
		  const [error, setError] = (0, import_react4.useState)(null);
		  const [adding, setAdding] = (0, import_react4.useState)(false);
		  const [editingId, setEditingId] = (0, import_react4.useState)(null);
		  const [jsonOpen, setJsonOpen] = (0, import_react4.useState)(false);
		  const [busy, setBusy] = (0, import_react4.useState)(null);
		  const [probes, setProbes] = (0, import_react4.useState)({});
		  const [tools, setTools] = (0, import_react4.useState)({});
		  const [toolsBusy, setToolsBusy] = (0, import_react4.useState)(null);
		  const [toolsErrors, setToolsErrors] = (0, import_react4.useState)({});
		  const formOpen = adding || editingId !== null || jsonOpen;
		  const actionsDisabled = busy !== null || formOpen;
		  const adopt = (0, import_react4.useCallback)((list) => {
		    setServers(list.servers);
		    setPatchFile(list.patchFile);
		    setPatchExists(list.patchExists);
		    setPatchReload(list.patchReload);
		    setWarnings(list.warnings);
		  }, []);
		  const refresh = (0, import_react4.useCallback)(async () => {
		    setLoading(true);
		    setError(null);
		    try {
		      adopt(await call("mcp.list"));
		    } catch (failure) {
		      setError(describe2(failure, t));
		    } finally {
		      setLoading(false);
		    }
		  }, [adopt, call, t]);
		  (0, import_react4.useEffect)(() => {
		    void refresh();
		  }, [refresh]);
		  const mutate = (0, import_react4.useCallback)(async (action, label) => {
		    setBusy(label);
		    setError(null);
		    try {
		      adopt(await action());
		      window.setTimeout(() => {
		        void refresh();
		      }, 900);
		    } catch (failure) {
		      setError(describe2(failure, t));
		    } finally {
		      setBusy(null);
		    }
		  }, [adopt, refresh, t]);
		  const toggleEnabled = (0, import_react4.useCallback)((server) => {
		    void mutate(
		      () => call("mcp.setEnabled", { id: server.id, enabled: !server.enabled }),
		      `toggle:${server.id}`
		    );
		  }, [call, mutate]);
		  const removeServer = (0, import_react4.useCallback)((server) => {
		    if (!window.confirm(t("mcp.removeConfirm", { name: server.serverName, id: server.id }))) return;
		    void mutate(() => call("mcp.remove", { id: server.id }), `remove:${server.id}`);
		  }, [call, mutate, t]);
		  const testConnection = (0, import_react4.useCallback)(async (server) => {
		    setBusy(`probe:${server.id}`);
		    setError(null);
		    try {
		      const result = await call("mcp.probe", { id: server.id });
		      setProbes((previous) => ({ ...previous, [server.id]: result }));
		    } catch (failure) {
		      setError(describe2(failure, t));
		    } finally {
		      setBusy(null);
		    }
		  }, [call, t]);
		  const loadTools = (0, import_react4.useCallback)((server) => {
		    setToolsBusy(server.id);
		    setToolsErrors((previous) => ({ ...previous, [server.id]: void 0 }));
		    void call("mcp.tools", { id: server.id }).then(
		      (result) => {
		        setTools((previous) => ({ ...previous, [server.id]: result }));
		      },
		      (failure) => {
		        setToolsErrors((previous) => ({ ...previous, [server.id]: describe2(failure, t) }));
		      }
		    ).finally(() => {
		      setToolsBusy((current) => current === server.id ? null : current);
		    });
		  }, [call, t]);
		  const summary = (0, import_react4.useMemo)(() => {
		    const enabled = servers.filter((server) => server.enabled).length;
		    const connected = servers.filter((server) => server.enabled && server.fiberPhase === "active" && server.toolCount > 0).length;
		    const failed = servers.filter((server) => server.enabled && server.fiberPhase === "failed").length;
		    return { total: servers.length, enabled, connected, failed };
		  }, [servers]);
		  const fromBundle = servers.filter((server) => !server.patchManaged);
		  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "msp-section", children: [
		    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { children: [
		      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "msp-head", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { className: "msp-head-title", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(ServerIcon, { size: 15 }),
		          t("mcp.title"),
		          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "msp-head-sub", children: t("mcp.total", { count: String(summary.total) }) }),
		          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { className: "msp-ver", title: t("panel.versionHint"), children: [
		            "v",
		            VERSION
		          ] })
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "msp-spacer" }),
		        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
		          "button",
		          {
		            type: "button",
		            className: "msp-iconbtn",
		            title: t("mcp.refresh"),
		            onClick: () => void refresh(),
		            disabled: actionsDisabled || loading,
		            children: loading ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "msp-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(RefreshIcon, { size: 14 })
		          }
		        )
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "msp-subtitle", children: t("mcp.subtitle") })
		    ] }),
		    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "msp-toolbar", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
		        "button",
		        {
		          type: "button",
		          className: "msp-btn msp-btn-sm msp-btn-primary",
		          onClick: () => {
		            setAdding(true);
		            setEditingId(null);
		            setJsonOpen(false);
		          },
		          disabled: actionsDisabled,
		          children: [
		            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(PlusIcon, { size: 12 }),
		            " ",
		            t("mcp.add")
		          ]
		        }
		      ),
		      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
		        "button",
		        {
		          type: "button",
		          className: "msp-btn msp-btn-sm",
		          onClick: () => {
		            setJsonOpen(true);
		            setAdding(false);
		            setEditingId(null);
		          },
		          disabled: actionsDisabled,
		          children: [
		            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(SwapIcon, { size: 12 }),
		            " ",
		            t("mcp.addJson")
		          ]
		        }
		      ),
		      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "msp-spacer" }),
		      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { className: "msp-meta", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: t("mcp.connected", { count: String(summary.connected) }) }),
		        summary.failed > 0 ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "msp-probe-bad", children: t("mcp.failed", { count: String(summary.failed) }) }) : null,
		        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: t("mcp.enabledOf", { count: String(summary.enabled), total: String(summary.total) }) })
		      ] })
		    ] }),
		    error !== null ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "msp-banner", children: error }) : null,
		    warnings.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("ul", { className: "msp-warnlist", children: warnings.map((warning) => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("li", { children: t(warning.note === "pending-reload" ? "mcp.notePendingReload" : "mcp.noteNeedsRestart", { id: warning.id }) }, warning.id)) }) : null,
		    adding ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
		      McpServerForm,
		      {
		        call,
		        t,
		        takenIds: servers.map((server) => server.id),
		        takenNames: servers.map((server) => server.serverName),
		        busy: busy !== null,
		        onClose: () => setAdding(false),
		        onSaved: () => {
		          setAdding(false);
		          void refresh();
		        }
		      }
		    ) : null,
		    jsonOpen ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
		      McpJsonForm,
		      {
		        call,
		        t,
		        busy: busy !== null,
		        onClose: () => setJsonOpen(false),
		        onImported: adopt
		      }
		    ) : null,
		    loading && servers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "msp-empty", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "msp-spin" }),
		      " ",
		      t("mcp.loading")
		    ] }) : null,
		    !loading && servers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "msp-empty", children: [
		      t("mcp.empty"),
		      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("br", {}),
		      t("mcp.emptyHint")
		    ] }) : null,
		    servers.map((server) => server.id === editingId ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
		      McpServerForm,
		      {
		        call,
		        t,
		        initial: server,
		        takenIds: servers.filter((other) => other.id !== server.id).map((other) => other.id),
		        takenNames: servers.filter((other) => other.id !== server.id).map((other) => other.serverName),
		        busy: busy !== null,
		        onClose: () => setEditingId(null),
		        onSaved: () => {
		          setEditingId(null);
		          void refresh();
		        }
		      },
		      server.id
		    ) : /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
		      McpServerCard,
		      {
		        server,
		        t,
		        probe: probes[server.id],
		        tools: tools[server.id],
		        toolsBusy: toolsBusy === server.id,
		        toolsError: toolsErrors[server.id],
		        onLoadTools: loadTools,
		        busy,
		        actionsDisabled,
		        onToggle: toggleEnabled,
		        onTest: (subject) => void testConnection(subject),
		        onEdit: (subject) => {
		          setAdding(false);
		          setJsonOpen(false);
		          setEditingId(subject.id);
		        },
		        onRemove: removeServer
		      },
		      server.id
		    )),
		    fromBundle.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "msp-hint", children: t("mcp.bundleHint") }) : null,
		    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "msp-footer", title: patchFile, children: [
		      patchExists ? t("mcp.patchFile", { path: patchFile }) : t("mcp.patchMissingFile", { path: patchFile }),
		      patchReload === null ? null : ` \xB7 ${patchReload === "live" ? t("mcp.reloadLive") : t("mcp.reloadOther", { mode: patchReload })}`
		    ] }),
		    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("details", { className: "msp-details", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("summary", { children: [
		        t("facts.title"),
		        " \u2014 ",
		        t("facts.summaryHint")
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "msp-hint", children: t("panel.halvesHint") }),
		      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(HostFactsCard, { ...props })
		    ] })
		  ] });
		}
		function describe2(error, t) {
		  const hint = hostFailureHint(error, t);
		  if (hint !== void 0) return hint;
		  const code = error.code;
		  switch (code) {
		    case "duplicate-id":
		      return t("err.duplicateId");
		    case "duplicate-server-name":
		      return t("err.duplicateName");
		    case "invalid-config":
		      return t("err.invalidConfig");
		    case "not-found":
		      return t("err.notFound");
		    case "not-removable":
		      return t("err.notRemovable");
		    // Every other code is the host's own sentence; naming the endpoint is what
		    // turns "internal error" into something worth reporting.
		    default:
		      return hostFailureLine(error, t);
		  }
		}

		// dsh-mcp-skill-panel/src/client/SkillsSection.tsx
		var import_react6 = require("react");

		// dsh-mcp-skill-panel/src/client/SkillCard.tsx
		var import_jsx_runtime7 = require("react/jsx-runtime");
		function SkillCard(props) {
		  const { skill, t, detail, detailBusy, expanded, detailError } = props;
		  const path = skill.path;
		  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: expanded ? "msp-skillrow msp-skillrow-open" : "msp-skillrow", children: [
		    /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
		      "button",
		      {
		        type: "button",
		        className: "msp-skillrow-head",
		        "aria-expanded": expanded,
		        title: expanded ? t("skills.hide") : t("skills.detail"),
		        disabled: detailBusy,
		        onClick: () => props.onToggleDetail(skill),
		        children: [
		          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "msp-skillrow-caret", children: detailBusy ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "msp-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(ChevronIcon, { size: 11 }) }),
		          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "msp-skillrow-name", children: skill.name }),
		          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "msp-tag", children: skill.source }),
		          skill.modelInvocable ? null : /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "msp-tag msp-tag-warn", children: t("skills.modelOff") }),
		          skill.userInvocable ? null : /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "msp-tag", children: t("skills.userOnly") }),
		          skill.presets.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "msp-tag", title: skill.presets.join(" \xB7 "), children: t("skills.shared", { presets: String(skill.presets.length) }) }) : null,
		          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "msp-skillrow-desc", children: skill.description })
		        ]
		      }
		    ),
		    expanded ? /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "msp-skillrow-body", children: [
		      skill.whenToUse === void 0 ? null : /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { className: "msp-desc msp-desc-dim", children: skill.whenToUse }),
		      /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "msp-meta", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("span", { children: [
		          t("skills.provider"),
		          ": ",
		          skill.provider
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { children: skill.modelInvocable ? t("skills.modelOn") : t("skills.modelOff") }),
		        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("span", { title: skill.presets.join(" \xB7 "), children: [
		          t("skills.readBy"),
		          ": ",
		          skill.presets.length === 0 ? t("skills.readByGlobal") : skill.presets.join(" \xB7 ")
		        ] })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "msp-target", title: path ?? "", children: path === void 0 ? t("skills.noPath") : path }),
		      detailError !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "msp-banner", children: [
		        t("skills.detailFailed"),
		        " \u2014 ",
		        detailError
		      ] }) : detail === void 0 ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { className: "msp-none", children: t("skills.detailLoading") }) : /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("details", { className: "msp-body", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("summary", { children: t("skills.body", { count: String(detail.content.length) }) }),
		        detail.truncated ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { className: "msp-hint", children: t("skills.truncated", { limit: String(SKILL_CONTENT_LIMIT) }) }) : null,
		        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("pre", { className: "msp-pre", children: detail.content })
		      ] })
		    ] }) : null
		  ] });
		}

		// dsh-mcp-skill-panel/src/client/SkillDirectoryPicker.tsx
		var import_react5 = require("react");
		var import_jsx_runtime8 = require("react/jsx-runtime");
		function SkillDirectoryPicker(props) {
		  const { t, value, workspaces, available, loaded, disabled, onChange } = props;
		  const [manual, setManual] = (0, import_react5.useState)(false);
		  const [draft, setDraft] = (0, import_react5.useState)("");
		  const pick = workspaces.length > 0 && !manual;
		  const apply2 = () => onChange(draft.trim());
		  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_jsx_runtime8.Fragment, { children: [
		    /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("span", { className: "msp-ctl-row", children: [
		      pick ? /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
		        "select",
		        {
		          className: "msp-input msp-select",
		          value,
		          "aria-label": t("skills.cwd"),
		          disabled,
		          onChange: (event) => onChange(event.target.value),
		          children: [
		            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("option", { value: "", children: t("skills.cwdNone") }),
		            workspaces.map((item) => /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("option", { value: item.path, children: [
		              item.title,
		              " \u2014 ",
		              item.path
		            ] }, item.path))
		          ]
		        }
		      ) : /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_jsx_runtime8.Fragment, { children: [
		        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
		          "input",
		          {
		            className: "msp-input msp-input-path",
		            value: draft,
		            placeholder: t("skills.cwdPlaceholder"),
		            "aria-label": t("skills.cwd"),
		            spellCheck: false,
		            onChange: (event) => setDraft(event.target.value),
		            onKeyDown: (event) => {
		              if (event.key !== "Enter") return;
		              event.preventDefault();
		              apply2();
		            }
		          }
		        ),
		        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
		          "button",
		          {
		            type: "button",
		            className: "msp-btn msp-btn-sm",
		            onClick: apply2,
		            disabled: disabled || draft.trim() === value,
		            children: t("skills.apply")
		          }
		        )
		      ] }),
		      workspaces.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
		        "button",
		        {
		          type: "button",
		          className: "msp-btn msp-btn-sm",
		          onClick: () => setManual((previous) => !previous),
		          children: manual ? t("skills.cwdPick") : t("skills.cwdManual")
		        }
		      ) : null
		    ] }),
		    loaded && !available ? /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "msp-hint", children: t("skills.cwdNoRegistry") }) : null,
		    loaded && available && workspaces.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "msp-hint", children: t("skills.cwdEmptyRegistry") }) : null
		  ] });
		}

		// dsh-mcp-skill-panel/src/client/SkillsSection.tsx
		var import_jsx_runtime9 = require("react/jsx-runtime");
		var NOTE_KEYS = {
		  "no-roster": "skills.noteNoRoster",
		  "no-presets": "skills.noteNoPresets",
		  "no-readable-preset": "skills.noteNoReadablePreset",
		  "registry-missing": "skills.noteRegistryMissing"
		};
		function SkillsSection(props) {
		  const { call, t, onLocaleChange } = props;
		  const [, bump] = (0, import_react6.useReducer)((count) => count + 1, 0);
		  const [catalog, setCatalog] = (0, import_react6.useState)(null);
		  const [loading, setLoading] = (0, import_react6.useState)(true);
		  const [error, setError] = (0, import_react6.useState)(null);
		  const [query, setQuery] = (0, import_react6.useState)("");
		  const [source, setSource] = (0, import_react6.useState)("");
		  const [cwd, setCwd] = (0, import_react6.useState)("");
		  const [expanded, setExpanded] = (0, import_react6.useState)([]);
		  const [details, setDetails] = (0, import_react6.useState)({});
		  const [detailBusy, setDetailBusy] = (0, import_react6.useState)(null);
		  const [detailErrors, setDetailErrors] = (0, import_react6.useState)({});
		  const refresh = (0, import_react6.useCallback)(async (directory) => {
		    setLoading(true);
		    setError(null);
		    try {
		      setCatalog(await call(
		        "skills.list",
		        directory === "" ? {} : { cwd: directory }
		      ));
		    } catch (failure) {
		      setError(describe3(failure, t));
		    } finally {
		      setLoading(false);
		    }
		  }, [call]);
		  (0, import_react6.useEffect)(() => {
		    setDetails({});
		    setDetailErrors({});
		    setExpanded([]);
		    void refresh(cwd);
		  }, [refresh, cwd]);
		  (0, import_react6.useEffect)(() => onLocaleChange(bump), [onLocaleChange, bump]);
		  const toggleDetail = (0, import_react6.useCallback)(async (skill) => {
		    const open = expanded.includes(skill.name);
		    setExpanded(open ? expanded.filter((name) => name !== skill.name) : [...expanded, skill.name]);
		    if (open || details[skill.name] !== void 0) return;
		    setDetailBusy(skill.name);
		    try {
		      const detail = await call(
		        "skills.detail",
		        cwd === "" ? { name: skill.name } : { name: skill.name, cwd }
		      );
		      setDetails((previous) => ({ ...previous, [detail.name]: detail }));
		      setDetailErrors((previous) => {
		        const { [skill.name]: _dropped, ...rest } = previous;
		        return rest;
		      });
		    } catch (failure) {
		      setDetailErrors((previous) => ({ ...previous, [skill.name]: describe3(failure, t) }));
		    } finally {
		      setDetailBusy(null);
		    }
		  }, [call, cwd, details, expanded]);
		  const skills = catalog?.skills ?? [];
		  const sources = (0, import_react6.useMemo)(
		    () => [...new Set(skills.map((skill) => skill.source))].sort((left, right) => left.localeCompare(right)),
		    [skills]
		  );
		  const shown = (0, import_react6.useMemo)(() => {
		    const needle = query.trim().toLowerCase();
		    return skills.filter((skill) => {
		      if (source !== "" && skill.source !== source) return false;
		      if (needle === "") return true;
		      return (skill.name + " " + skill.description + " " + (skill.whenToUse ?? "")).toLowerCase().includes(needle);
		    });
		  }, [skills, query, source]);
		  const presets = catalog?.presets ?? [];
		  const workspaces = catalog?.workspaces ?? [];
		  const presetsRead = catalog?.presetsRead ?? [];
		  const unread = presets.filter((preset) => !preset.read);
		  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "msp-section", children: [
		    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { children: [
		      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "msp-title", children: [
		        t("skills.title"),
		        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("span", { className: "msp-ver", title: t("panel.versionHint"), children: [
		          "v",
		          VERSION
		        ] })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { className: "msp-subtitle", children: t("skills.subtitle") })
		    ] }),
		    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("section", { className: "msp-filters", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "msp-filters-row", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "msp-field-inline msp-field-grow", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "msp-label", children: t("skills.cwd") }),
		          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
		            SkillDirectoryPicker,
		            {
		              t,
		              value: cwd,
		              workspaces,
		              available: catalog === null || catalog.workspacesAvailable,
		              loaded: catalog !== null,
		              disabled: loading,
		              onChange: setCwd
		            }
		          )
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "msp-spacer" }),
		        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("span", { className: "msp-meta", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("span", { children: [
		            t("skills.scope"),
		            ": ",
		            presetsRead.length === 0 ? t("skills.scopeGlobal") : t("skills.scopeMerged", { count: String(presetsRead.length), total: String(presets.length) })
		          ] }),
		          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { children: t("skills.count", { count: String(skills.length) }) }),
		          catalog !== null && !catalog.complete ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "msp-probe-bad", children: t("skills.incomplete") }) : null
		        ] })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "msp-filters-row", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("label", { className: "msp-searchbox", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(SearchIcon, { size: 12 }),
		          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
		            "input",
		            {
		              className: "msp-input msp-input-bare",
		              value: query,
		              placeholder: t("skills.searchPlaceholder"),
		              "aria-label": t("skills.search"),
		              onChange: (event) => setQuery(event.target.value)
		            }
		          )
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
		          "select",
		          {
		            className: "msp-input msp-select",
		            value: source,
		            "aria-label": t("skills.source"),
		            onChange: (event) => setSource(event.target.value),
		            children: [
		              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("option", { value: "", children: t("skills.allSources") }),
		              sources.map((name) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("option", { value: name, children: name }, name))
		            ]
		          }
		        ),
		        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "msp-spacer" }),
		        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "msp-meta", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { children: t("skills.shown", { shown: String(shown.length), total: String(skills.length) }) }) }),
		        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("button", { type: "button", className: "msp-btn msp-btn-sm", onClick: () => void refresh(cwd), disabled: loading, children: [
		          loading ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "msp-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(RefreshIcon, { size: 12 }),
		          " ",
		          t("skills.refresh")
		        ] })
		      ] }),
		      presets.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "msp-filters-row", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "msp-label", children: t("skills.presetsMerged") }),
		        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "msp-chips", children: presets.map((preset) => /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
		          "span",
		          {
		            className: preset.read ? "msp-chip" : "msp-chip msp-chip-off",
		            title: preset.description ?? preset.broken ?? preset.id,
		            children: [
		              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { children: preset.name ?? preset.id }),
		              preset.read ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "msp-chip-count", children: String(preset.count) }) : /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "msp-chip-skip", children: preset.reason === "preset-broken" ? t("skills.presetBroken") : t("skills.presetUnmounted") })
		            ]
		          },
		          preset.id
		        )) })
		      ] }) : null
		    ] }),
		    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("details", { className: "msp-details", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("summary", { children: t("skills.help") }),
		      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { className: "msp-hint", children: t("skills.presetHint") }),
		      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { className: "msp-hint", children: t("skills.cwdHint") })
		    ] }),
		    catalog?.presetNote !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "msp-banner msp-banner-soft", children: t(NOTE_KEYS[catalog.presetNote]) }) : null,
		    unread.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "msp-banner msp-banner-soft", children: t("skills.unread", {
		      count: String(unread.length),
		      presets: unread.map((preset) => preset.name ?? preset.id).join(" \xB7 ")
		    }) }) : null,
		    error !== null ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "msp-banner", children: error }) : null,
		    loading && catalog === null ? /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "msp-empty", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "msp-spin" }),
		      " ",
		      t("skills.loading")
		    ] }) : null,
		    catalog !== null && !catalog.available ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "msp-empty", children: t("skills.unavailable") }) : null,
		    catalog !== null && catalog.available && shown.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "msp-empty", children: t("skills.empty") }) : null,
		    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "msp-skilllist", children: shown.map((skill) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
		      SkillCard,
		      {
		        skill,
		        t,
		        detail: details[skill.name],
		        detailBusy: detailBusy === skill.name,
		        detailError: detailErrors[skill.name],
		        expanded: expanded.includes(skill.name),
		        onToggleDetail: (subject) => void toggleDetail(subject)
		      },
		      skill.name
		    )) }),
		    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { className: "msp-hint", children: t("skills.readonly") }),
		    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "msp-footer", children: catalog === null ? "" : (catalog.cwd ?? "\u2014") + " \xB7 " + t("skills.scannedAt", { time: shortTime(catalog.scannedAt) }) }),
		    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("details", { className: "msp-details", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("summary", { children: [
		        t("facts.title"),
		        " \u2014 ",
		        t("facts.summaryHint")
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { className: "msp-hint", children: t("panel.halvesHint") }),
		      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(HostFactsCard, { ...props })
		    ] })
		  ] });
		}
		function shortTime(iso) {
		  const date = new Date(iso);
		  return Number.isNaN(date.getTime()) ? iso : date.toLocaleTimeString();
		}
		function describe3(error, t) {
		  return hostFailureHint(error, t) ?? hostFailureLine(error, t);
		}

		// dsh-mcp-skill-panel/src/client/locales.ts
		var zh = {
		  "mcp.nav": "MCP \u7BA1\u7406",
		  "mcp.title": "MCP \u7BA1\u7406",
		  "mcp.subtitle": "\u7BA1\u7406\u672C\u673A\u63A5\u5165 DeepSeek Harness \u7684 MCP \u670D\u52A1\u5668\u3002\u5199\u5165\u7684\u662F\u5F53\u524D profile \u7684 cordis.patch.yml\uFF0C\u6539\u5B8C\u5373\u65F6\u751F\u6548\uFF0C\u65E0\u9700\u91CD\u542F\u3002",
		  "mcp.total": "\u5171 {count} \u4E2A",
		  "mcp.add": "\u6DFB\u52A0\u670D\u52A1\u5668",
		  "mcp.addJson": "\u7C98\u8D34 JSON \u6DFB\u52A0",
		  "mcp.refresh": "\u5237\u65B0",
		  "mcp.loading": "\u6B63\u5728\u8BFB\u53D6 MCP \u670D\u52A1\u5668\u2026",
		  "mcp.empty": "\u8FD8\u6CA1\u6709\u4EFB\u4F55 MCP \u670D\u52A1\u5668\u3002",
		  "mcp.emptyHint": "\u70B9\u201C\u6DFB\u52A0\u670D\u52A1\u5668\u201D\u586B\u8868\uFF0C\u6216\u70B9\u201C\u7C98\u8D34 JSON \u6DFB\u52A0\u201D\u76F4\u63A5\u8D34\u4E00\u4EFD\u914D\u7F6E\u3002",
		  "mcp.connected": "{count} \u4E2A\u5DF2\u8FDE\u63A5",
		  "mcp.failed": "{count} \u4E2A\u5931\u8D25",
		  "mcp.enabledOf": "{count}/{total} \u5DF2\u542F\u7528",
		  "mcp.patchFile": "\u8865\u4E01\u5C42\uFF1A{path}",
		  "mcp.patchMissingFile": "\u8865\u4E01\u5C42\u8FD8\u672A\u521B\u5EFA\uFF0C\u4FDD\u5B58\u65F6\u4F1A\u81EA\u52A8\u65B0\u5EFA\uFF1A{path}",
		  "mcp.reloadLive": "patchReload: live\uFF08\u6539\u52A8\u5373\u65F6\u751F\u6548\uFF09",
		  "mcp.reloadOther": "patchReload: {mode}\uFF08\u6539\u52A8\u8981\u91CD\u542F dsh web \u624D\u751F\u6548\uFF09",
		  "mcp.tagPatch": "\u8865\u4E01\u5C42",
		  "mcp.tagBundle": "bundle \u63D0\u4F9B",
		  "mcp.bundleHint": "\u201Cbundle \u63D0\u4F9B\u201D\u7684\u884C\u6765\u81EA\u67D0\u4E2A bundle \u5C42\uFF1A\u53EF\u4EE5\u7F16\u8F91\u3001\u53EF\u4EE5\u505C\u7528\uFF08\u9762\u677F\u4F1A\u5728\u8865\u4E01\u5C42\u8FFD\u52A0\u4E00\u6761\u8986\u76D6\u884C\uFF09\uFF0C\u4F46\u4E0D\u80FD\u5220\u9664\u2014\u2014\u5220\u6389\u8986\u76D6\u884C\u53EA\u4F1A\u8BA9 bundle \u81EA\u5DF1\u90A3\u4E00\u884C\u91CD\u65B0\u751F\u6548\u3002",
		  "mcp.removeConfirm": "\u5220\u9664 MCP \u670D\u52A1\u5668\u201C{name}\u201D\uFF08{id}\uFF09\uFF1F\n\u5B83\u7684\u5DE5\u5177\u4F1A\u7ACB\u523B\u65AD\u5F00\u3002",
		  "mcp.notePendingReload": "{id}\uFF1A\u8865\u4E01\u5C42\u91CC\u5DF2\u6709\u8FD9\u4E00\u884C\uFF0C\u7EC4\u5408\u6811\u8FD8\u6CA1\u8DDF\u4E0A\uFF1B\u5BBF\u4E3B\u6B63\u5728\u91CD\u8F7D\uFF0C\u7A0D\u540E\u5237\u65B0\u5373\u53EF\u3002",
		  "mcp.noteNeedsRestart": "{id}\uFF1A\u8865\u4E01\u5C42\u91CC\u5DF2\u6709\u8FD9\u4E00\u884C\uFF0C\u4F46\u8BE5 profile \u7684 patchReload \u4E0D\u662F live\uFF0C\u9700\u8981\u91CD\u542F dsh web\u3002",
		  "status.connected": "\u5DF2\u8FDE\u63A5 \xB7 {count} \u4E2A\u5DE5\u5177",
		  "status.noTools": "\u672A\u8FDE\u63A5 \xB7 \u65E0\u5DE5\u5177",
		  "status.failed": "\u542F\u52A8\u5931\u8D25",
		  "status.disabled": "\u5DF2\u505C\u7528",
		  "status.loading": "\u52A0\u8F7D\u4E2D",
		  "status.pending": "\u7B49\u5F85\u4E2D",
		  "status.unloading": "\u5378\u8F7D\u4E2D",
		  "status.notLoaded": "\u672A\u52A0\u8F7D",
		  "status.tools": "{count} \u4E2A\u5DE5\u5177",
		  "status.reconnectOff": "\u5DF2\u5173\u95ED\u91CD\u8FDE",
		  "status.failOnStartup": "\u542F\u52A8\u5931\u8D25\u5373\u62A5\u9519",
		  "action.test": "\u6D4B\u8BD5\u8FDE\u63A5",
		  "action.edit": "\u7F16\u8F91",
		  "action.remove": "\u5220\u9664",
		  "action.enable": "\u542F\u7528",
		  "action.disable": "\u505C\u7528",
		  "probe.ok": "\u2713 \u5DF2\u8FDE\u63A5\uFF0C\u8017\u65F6 {ms}ms \xB7 {count} \u4E2A\u5DE5\u5177",
		  "probe.fail": "\u2717 {error}\uFF08{ms}ms\uFF09",
		  "tools.title": "\u529F\u80FD\u5217\u8868\uFF08{count}\uFF09",
		  "tools.hint": "\u8FD9\u4E9B\u662F\u6CE8\u518C\u5230\u6A21\u578B\u7684\u529F\u80FD\uFF08`mcp__<serverName>__<tool>`\uFF09\uFF1B\u505C\u7528\u3001\u8FDE\u63A5\u4E2D\u6216\u63E1\u624B\u5931\u8D25\u65F6\u8FD9\u91CC\u4E3A\u7A7A\u3002",
		  "tools.loading": "\u6B63\u5728\u8BFB\u53D6\u529F\u80FD\u5217\u8868\u2026",
		  "tools.idle": "\u5C1A\u672A\u8BFB\u53D6\u3002",
		  "tools.reload": "\u91CD\u65B0\u8BFB\u53D6",
		  "tools.failed": "\u529F\u80FD\u5217\u8868\u8BFB\u53D6\u5931\u8D25",
		  "tools.unavailable": "\u8FD9\u4E2A profile \u6CA1\u6709\u6302\u8F7D\u5DE5\u5177\u6CE8\u518C\u8868\uFF0C\u8BFB\u4E0D\u5230\u529F\u80FD\u5217\u8868\u3002",
		  "tools.empty": "\u8FD9\u4E2A\u670D\u52A1\u5668\u5F53\u524D\u6CA1\u6709\u6CE8\u518C\u4EFB\u4F55\u529F\u80FD\uFF1A\u53EF\u80FD\u5DF2\u505C\u7528\u3001\u4ECD\u5728\u8FDE\u63A5\u3001\u6216\u63E1\u624B\u5931\u8D25\u3002\u7528\u300C\u6D4B\u8BD5\u8FDE\u63A5\u300D\u53EF\u4EE5\u76F4\u63A5\u95EE\u670D\u52A1\u5668\u672C\u8EAB\u3002",
		  "tools.omitted": "\u8FD8\u6709 {count} \u4E2A\u672A\u663E\u793A\u3002",
		  "paste.title": "\u7C98\u8D34 JSON / YAML \u6DFB\u52A0",
		  "paste.hint": "\u652F\u6301 Claude / VS Code \u98CE\u683C\u7684 mcpServers \u914D\u7F6E\u3001cordis.patch.yml \u7247\u6BB5\u3001\u5355\u6761\u670D\u52A1\u5668\u914D\u7F6E\uFF0C\u6216 name \u2192 config \u6620\u5C04\u3002\u591A\u6761\u4F1A\u4E00\u6B21\u6027\u5199\u5165\u8865\u4E01\u5C42\u3002\u793A\u4F8B\uFF1A",
		  "paste.label": "\u7C98\u8D34\u5185\u5BB9",
		  "paste.placeholder": "\u5728\u8FD9\u91CC\u7C98\u8D34\u914D\u7F6E\u2026",
		  "paste.button": "\u89E3\u6790\u5E76\u6DFB\u52A0",
		  "paste.close": "\u5173\u95ED",
		  "paste.imported": "\u5DF2\u65B0\u589E {added} \u4E2A\uFF0C\u8986\u76D6 {updated} \u4E2A\u3002",
		  "paste.rejected": "{count} \u884C\u88AB\u62D2\u7EDD\uFF1A{detail}",
		  "form.addTitle": "\u6DFB\u52A0 MCP \u670D\u52A1\u5668",
		  "form.editTitle": "\u7F16\u8F91 {name}",
		  "form.entryId": "\u6761\u76EE ID",
		  "form.entryIdHint": "\u88C5\u8F7D\u4E3A loader \u884C {entryId}\uFF0C\u9700\u5339\u914D [A-Za-z0-9_-]{1,64}",
		  "form.serverName": "serverName",
		  "form.serverNameHint": "\u5DE5\u5177\u540D\u524D\u7F00 mcp__{name}__*\uFF0C\u9700\u5339\u914D [A-Za-z0-9_-]{1,32}",
		  "form.transport": "\u4F20\u8F93\u65B9\u5F0F",
		  "form.transportStdio": "stdio\uFF08\u672C\u5730\u8FDB\u7A0B\uFF09",
		  "form.transportHttp": "streamable-http\uFF08\u8FDC\u7A0B URL\uFF09",
		  "form.url": "URL",
		  "form.command": "\u547D\u4EE4",
		  "form.args": "\u53C2\u6570\uFF08\u6BCF\u884C\u4E00\u4E2A\uFF09",
		  "form.env": "\u73AF\u5883\u53D8\u91CF\uFF08KEY=VALUE\uFF0C\u6BCF\u884C\u4E00\u4E2A\uFF09",
		  "form.cwd": "\u5DE5\u4F5C\u76EE\u5F55\uFF08\u53EF\u9009\uFF09",
		  "form.headers": "\u8BF7\u6C42\u5934\uFF08Key: Value\uFF0C\u6BCF\u884C\u4E00\u4E2A\uFF09",
		  "form.timeout": "\u5355\u6B21\u8C03\u7528\u8D85\u65F6\uFF08\u6BEB\u79D2\uFF0C\u53EF\u9009\uFF09",
		  "form.failOnStartup": "\u542F\u52A8\u5931\u8D25\u5373\u62A5\u9519\uFF08failOnStartupError\uFF09",
		  "form.cancel": "\u53D6\u6D88",
		  "form.save": "\u4FDD\u5B58",
		  "form.saving": "\u4FDD\u5B58\u4E2D\u2026",
		  "err.idRequired": "\u6761\u76EE ID \u5FC5\u586B",
		  "err.idPattern": "\u9700\u5339\u914D [A-Za-z0-9_-]{1,64}",
		  "err.idTaken": "\u6761\u76EE ID \u5DF2\u88AB\u5360\u7528",
		  "err.nameRequired": "serverName \u5FC5\u586B",
		  "err.namePattern": "\u9700\u5339\u914D [A-Za-z0-9_-]{1,32}",
		  "err.nameTaken": "serverName \u5DF2\u88AB\u5360\u7528",
		  "err.urlRequired": "streamable-http \u9700\u8981\u5408\u6CD5\u7684 http(s) \u5730\u5740",
		  "err.commandRequired": "stdio \u9700\u8981\u542F\u52A8\u547D\u4EE4",
		  "err.duplicateId": "\u6761\u76EE ID \u5DF2\u88AB\u4F7F\u7528",
		  "err.duplicateName": "serverName \u5DF2\u88AB\u5176\u4ED6\u670D\u52A1\u5668\u5360\u7528",
		  "err.invalidConfig": "MCP \u670D\u52A1\u5668\u914D\u7F6E\u65E0\u6548",
		  "err.notFound": "\u672A\u627E\u5230\u8BE5 MCP \u670D\u52A1\u5668",
		  "err.notRemovable": "\u8865\u4E01\u5C42\u91CC\u6CA1\u6709\u8FD9\u4E00\u884C\uFF0C\u65E0\u6CD5\u5220\u9664\uFF08\u5B83\u7531 bundle \u63D0\u4F9B\uFF09",
		  "err.staleHost": "\u5BBF\u4E3B\u534A\u8FB9\u4E0D\u8BA4\u8BC6\u8FD9\u4E2A\u63A5\u53E3\uFF08{message}\uFF09\uFF1A\u5BBF\u4E3B\u8FDB\u7A0B\u591A\u534A\u8FD8\u662F\u65E7\u7248\u672C\uFF0C\u6D4F\u89C8\u5668\u534A\u8FB9\u5DF2\u7ECF\u662F v{version}\u3002\u91CD\u542F dsh web \u540E\u5237\u65B0\u9875\u9762\u5373\u53EF\u3002",
		  "err.endpointFailed": "\u63A5\u53E3 {endpoint} \u8C03\u7528\u5931\u8D25\uFF1A{message}",
		  "skills.nav": "Skill \u7BA1\u7406",
		  "skills.title": "Skill \u7BA1\u7406",
		  "skills.subtitle": "\u6C47\u603B\u5168\u90E8 Agent \u9884\u8BBE\u7684\u6280\u80FD\u76EE\u5F55\uFF1A\u6280\u80FD\u63D0\u4F9B\u8005\u6302\u5728\u9884\u8BBE\u8FD9\u4E00\u5C42\uFF0C\u6240\u4EE5\u9762\u677F\u4F1A\u628A\u540D\u518C\u91CC\u6BCF\u4E2A\u9884\u8BBE\u90FD\u8BFB\u4E00\u904D\u518D\u53D6\u5E76\u96C6\u3002",
		  "skills.presetsMerged": "\u5DF2\u5408\u5E76\u9884\u8BBE",
		  "skills.presetBroken": "\u4E0D\u53EF\u7528",
		  "skills.presetUnmounted": "\u65E0\u6CD5\u6302\u8F7D",
		  "skills.scope": "\u8BFB\u53D6\u8303\u56F4",
		  "skills.scopeMerged": "{count}/{total} \u4E2A\u9884\u8BBE",
		  "skills.scopeGlobal": "\u5168\u5C40\u5C42",
		  "skills.noteNoRoster": "\u8FD9\u4E2A profile \u6CA1\u6709\u6302\u8F7D agent-presets\uFF08\u9884\u8BBE\u540D\u518C\uFF09\uFF0C\u53EA\u80FD\u8BFB\u5168\u5C40\u5C42\u2014\u2014\u5168\u5C40\u5C42\u901A\u5E38\u6CA1\u6709\u6280\u80FD\u63D0\u4F9B\u8005\u3002",
		  "skills.noteNoPresets": "\u9884\u8BBE\u540D\u518C\u91CC\u6CA1\u6709\u4EFB\u4F55\u9884\u8BBE\uFF0C\u53EA\u80FD\u8BFB\u5168\u5C40\u5C42\u3002",
		  "skills.noteNoReadablePreset": "\u540D\u518C\u91CC\u7684\u9884\u8BBE\u5168\u90FD\u65E0\u6CD5\u6302\u8F7D\uFF08composition \u7EC4\u5408\u5931\u8D25\uFF09\uFF0C\u5DF2\u9000\u56DE\u5168\u5C40\u5C42\u3002",
		  "skills.noteRegistryMissing": "\u8FD9\u4E2A profile \u6CA1\u6709\u6302\u8F7D skill \u6CE8\u518C\u8868\uFF0C\u672C\u9875\u53EA\u505A\u5C55\u793A\u3002",
		  "skills.unread": "{count} \u4E2A\u9884\u8BBE\u6CA1\u80FD\u8BFB\u53D6\uFF1A{presets}",
		  "skills.search": "\u641C\u7D22",
		  "skills.searchPlaceholder": "\u6309\u540D\u5B57\u6216\u63CF\u8FF0\u7B5B\u9009",
		  "skills.source": "\u6765\u6E90",
		  "skills.allSources": "\u5168\u90E8\u6765\u6E90",
		  "skills.cwd": "\u9879\u76EE\u76EE\u5F55",
		  "skills.cwdNone": "\u4E0D\u9650\u5B9A\uFF08\u53EA\u8BFB\u9884\u8BBE\u5C42\u4E0E\u5168\u5C40\u5C42\uFF09",
		  "skills.cwdEmptyRegistry": "\u672C\u673A\u8FD8\u6CA1\u6709\u767B\u8BB0\u8FC7\u9879\u76EE\u76EE\u5F55\uFF0C\u53EF\u624B\u52A8\u586B\u7EDD\u5BF9\u8DEF\u5F84\u3002",
		  "skills.cwdNoRegistry": "\u8FD9\u4E2A profile \u6CA1\u6709\u6302\u8F7D workspace \u6CE8\u518C\u8868\uFF0C\u53EA\u80FD\u624B\u52A8\u586B\u7EDD\u5BF9\u8DEF\u5F84\u3002",
		  "skills.cwdManual": "\u624B\u52A8\u8F93\u5165",
		  "skills.cwdPick": "\u4ECE\u5DF2\u767B\u8BB0\u76EE\u5F55\u91CC\u9009",
		  "skills.cwdPlaceholder": "\u7EDD\u5BF9\u8DEF\u5F84\uFF0C\u4F8B\u5982 D:/work/my-project",
		  "skills.cwdHint": "\u9879\u76EE\u76EE\u5F55\u7528\u6765\u8BFB\u8BE5\u9879\u76EE\u81EA\u5DF1\u7684\u6280\u80FD\uFF1A\u5BBF\u4E3B\u4ECE\u5B83\u5411\u4E0A\u627E\u5230\u6700\u8FD1\u7684 .git \u5F53\u4F5C\u9879\u76EE\u6839\uFF0C\u518D\u8BFB <\u6839>/.dsh/skills \u4E0E <\u6839>/.agents/skills\uFF0C\u540C\u540D\u7684\u9879\u76EE\u7EA7\u6280\u80FD\u4F1A\u76D6\u8FC7\u7528\u6237\u7EA7\u3002\u4E0D\u9650\u5B9A\u5219\u53EA\u8BFB\u9884\u8BBE\u5C42\u4E0E\u5168\u5C40\u5C42\uFF08\u672C\u673A .dsh / .agents \u7684\u6280\u80FD\u4ECD\u5728\uFF09\u3002",
		  "skills.apply": "\u5E94\u7528",
		  "skills.refresh": "\u5237\u65B0",
		  "skills.loading": "\u6B63\u5728\u8BFB\u53D6\u6280\u80FD\u76EE\u5F55\u2026",
		  "skills.empty": "\u8FD9\u4E9B\u9884\u8BBE\u91CC\u6CA1\u6709\u6280\u80FD\u3002",
		  "skills.unavailable": "\u5F53\u524D profile \u6CA1\u6709\u6302\u8F7D skill \u6CE8\u518C\u8868\uFF1B\u8FD9\u4E00\u680F\u53EA\u505A\u5C55\u793A\u3002",
		  "skills.count": "\u5171 {count} \u4E2A",
		  "skills.shown": "\u663E\u793A {shown}/{total}",
		  "skills.incomplete": "\u6709\u4E0D\u5B8C\u6574\u7684\u5730\u65B9\uFF0C\u76EE\u5F55\u53EF\u80FD\u7F3A\u9879",
		  "skills.scannedAt": "\u8BFB\u53D6\u4E8E {time}",
		  "skills.modelOn": "\u6A21\u578B\u53EF\u8C03\u7528",
		  "skills.modelOff": "\u6A21\u578B\u4E0D\u53EF\u8C03\u7528",
		  "skills.userOnly": "\u4EC5\u7528\u6237\u53EF\u8C03\u7528",
		  "skills.provider": "\u63D0\u4F9B\u8005",
		  "skills.shared": "\u5171\u4EAB\u4E8E {presets} \u4E2A\u9884\u8BBE",
		  "skills.readBy": "\u8BFB\u53D6\u81EA",
		  "skills.readByGlobal": "\u5168\u5C40\u5C42",
		  "skills.noPath": "\uFF08\u865A\u62DF\u6280\u80FD\uFF0C\u65E0\u6587\u4EF6\uFF09",
		  "skills.detail": "\u5C55\u5F00\u8BE6\u60C5",
		  "skills.hide": "\u6536\u8D77\u8BE6\u60C5",
		  "skills.body": "\u6B63\u6587\u9884\u89C8\uFF08{count} \u5B57\u7B26\uFF09",
		  "skills.detailLoading": "\u6B63\u5728\u8BFB\u53D6\u6B63\u6587\u2026",
		  "skills.truncated": "\u6B63\u6587\u8FC7\u957F\uFF0C\u4EC5\u663E\u793A\u524D {limit} \u5B57\u7B26",
		  "skills.detailFailed": "\u6B63\u6587\u8BFB\u53D6\u5931\u8D25",
		  "skills.help": "\u9884\u8BBE\u4E0E\u9879\u76EE\u76EE\u5F55\u7684\u4F5C\u7528",
		  "skills.presetHint": "\u6280\u80FD\u63D0\u4F9B\u8005\uFF08skill-filesystem / tool-skill\uFF09\u7531\u6BCF\u4E2A\u9884\u8BBE\u7684 composition \u6302\u8F7D\uFF0C\u6240\u4EE5\u4E0D\u540C\u9884\u8BBE\u4F1A\u770B\u5230\u4E0D\u540C\u7684\u76EE\u5F55\u3002\u9762\u677F\u4E0D\u518D\u8BA9\u4F60\u6311\u9884\u8BBE\uFF0C\u800C\u662F\u628A\u540D\u518C\u91CC\u6240\u6709\u9884\u8BBE\u90FD\u8BFB\u4E00\u904D\u518D\u53D6\u5E76\u96C6\uFF1B\u540C\u4E00\u4E2A\u6280\u80FD\u88AB\u591A\u4E2A\u9884\u8BBE\u63D0\u4F9B\u65F6\u4F1A\u6807\u51FA\u5171\u6709\u4E2A\u6570\uFF0C\u67D0\u4E2A\u9884\u8BBE\u6302\u8F7D\u5931\u8D25\u4E5F\u4F1A\u5355\u72EC\u6807\u51FA\u6765\u3002",
		  "skills.readonly": "\u8FD9\u4E00\u680F\u662F\u53EA\u8BFB\u89C6\u56FE\uFF1A\u6280\u80FD\u7684\u542F\u7528/\u505C\u7528\u7531\u63D0\u4F9B\u8005\uFF08\u4F8B\u5982 dsh-agent-skills\uFF09\u81EA\u5DF1\u7684\u7B56\u7565\u51B3\u5B9A\uFF0C\u4E0D\u5728\u8FD9\u91CC\u6539\u5199\u3002",
		  "facts.title": "\u8FDE\u63A5\u81EA\u68C0",
		  "facts.summaryHint": "\u9762\u677F\u901A\u9053\u4E0E\u5BBF\u4E3B\u73AF\u5883\uFF08\u8BCA\u65AD\u7528\uFF09",
		  "facts.hint": "\u8FD9\u7EC4\u6570\u636E\u7531\u5BBF\u4E3B\u534A\u8FB9\u5B9E\u65F6\u8BFB\u53D6\uFF1A\u80FD\u663E\u793A\u51FA\u6765\uFF0C\u5C31\u8BF4\u660E\u6D4F\u89C8\u5668 \u2192 /api/mcp-skill-panel \u2192 \u5BBF\u4E3B \u8FD9\u6761\u901A\u9053\u662F\u901A\u7684\u3002\u5B83\u53EA\u7528\u6765\u6392\u67E5\u95EE\u9898\uFF0C\u4E0D\u53C2\u4E0E MCP / Skill \u7BA1\u7406\u3002",
		  "facts.refresh": "\u91CD\u65B0\u68C0\u6D4B",
		  "facts.loading": "\u68C0\u6D4B\u4E2D\u2026",
		  "facts.failed": "\u68C0\u6D4B\u5931\u8D25",
		  "facts.plugin": "\u63D2\u4EF6",
		  "facts.dshHome": "DSH_HOME",
		  "facts.loaderEntries": "Loader \u884C\u6570",
		  "facts.mcpEntries": "MCP \u670D\u52A1\u5668",
		  "facts.patchFiles": "\u5DF2\u5B58\u5728\u7684\u8865\u4E01\u5C42",
		  "facts.patchFile": "\u9762\u677F\u5199\u5165\u7684\u8865\u4E01\u5C42",
		  "facts.patchReload": "patchReload",
		  "facts.skills": "Skills",
		  "facts.skillsUnavailable": "\u672A\u6302\u8F7D",
		  "facts.skillsCount": "{count} \u4E2A\uFF08\u5408\u5E76 {presets} \u4E2A\u9884\u8BBE\uFF09",
		  "facts.versionMismatch": "\u7248\u672C\u4E0D\u4E00\u81F4\uFF1A\u5BBF\u4E3B\u534A\u8FB9 v{host}\uFF0C\u6D4F\u89C8\u5668\u534A\u8FB9 v{client}\u3002\u5BBF\u4E3B\u8FDB\u7A0B\u8FD8\u8DD1\u7740\u65E7\u4EE3\u7801 \u2014\u2014 \u91CD\u542F dsh web \u540E\u518D\u786C\u5237\u65B0\u9875\u9762\u3002",
		  "facts.none": "\uFF08\u65E0\uFF09",
		  "panel.versionHint": "\u9762\u677F\u7248\u672C\uFF08\u5BBF\u4E3B\u534A\u8FB9\u4E0E\u6D4F\u89C8\u5668\u534A\u8FB9\u540C\u4E00\u6B21\u6784\u5EFA\u4EA7\u51FA\uFF09",
		  "panel.halvesHint": "\u9762\u677F\u5206\u4E24\u534A\uFF1A\u6D4F\u89C8\u5668\u534A\u8FB9\u6BCF\u6B21\u5237\u65B0\u90FD\u53D6\u6700\u65B0\uFF0C\u5BBF\u4E3B\u534A\u8FB9\u53EA\u5728 dsh web \u542F\u52A8\u65F6\u52A0\u8F7D\u3002\u6539\u5B8C\u63D2\u4EF6\u6216\u5347\u7EA7\u540E\u8BF7\u91CD\u542F dsh web\uFF0C\u5426\u5219\u65B0\u754C\u9762\u4F1A\u5BF9\u7740\u65E7\u5BBF\u4E3B\u8C03\u63A5\u53E3\uFF08\u8868\u73B0\u4E3A unknown endpoint \u6216\u300C\u529F\u80FD\u5217\u8868\u8BFB\u53D6\u5931\u8D25\u300D\uFF09\u3002"
		};
		var en = {
		  "mcp.nav": "MCP",
		  "mcp.title": "MCP servers",
		  "mcp.subtitle": "Manage the MCP servers connected to this DeepSeek Harness. Edits are written to the current profile\u2019s cordis.patch.yml and apply immediately.",
		  "mcp.total": "{count} total",
		  "mcp.add": "Add server",
		  "mcp.addJson": "Paste JSON",
		  "mcp.refresh": "Refresh",
		  "mcp.loading": "Reading MCP servers\u2026",
		  "mcp.empty": "No MCP server configured yet.",
		  "mcp.emptyHint": "Use \u201CAdd server\u201D to fill in the form, or \u201CPaste JSON\u201D to drop in a config.",
		  "mcp.connected": "{count} connected",
		  "mcp.failed": "{count} failed",
		  "mcp.enabledOf": "{count}/{total} enabled",
		  "mcp.patchFile": "Patch layer: {path}",
		  "mcp.patchMissingFile": "Patch layer does not exist yet; it is created on save: {path}",
		  "mcp.reloadLive": "patchReload: live (edits apply immediately)",
		  "mcp.reloadOther": "patchReload: {mode} (edits need a dsh web restart)",
		  "mcp.tagPatch": "patch layer",
		  "mcp.tagBundle": "from a bundle",
		  "mcp.bundleHint": "A row \u201Cfrom a bundle\u201D comes from a bundle layer: it can be edited and disabled (the panel appends an override row to the patch layer), but not deleted \u2014 removing the override would just let the bundle\u2019s own row take effect again.",
		  "mcp.removeConfirm": 'Remove MCP server "{name}" ({id})?\nIts tools disconnect immediately.',
		  "mcp.notePendingReload": "{id}: the patch layer defines this row but the composed tree has not caught up; the host is reloading, refresh in a moment.",
		  "mcp.noteNeedsRestart": "{id}: the patch layer defines this row, but this profile does not hot-reload patches, so it needs a dsh web restart.",
		  "status.connected": "Connected \xB7 {count} tools",
		  "status.noTools": "Not connected \xB7 no tools",
		  "status.failed": "Failed to start",
		  "status.disabled": "Disabled",
		  "status.loading": "Loading",
		  "status.pending": "Pending",
		  "status.unloading": "Unloading",
		  "status.notLoaded": "Not loaded",
		  "status.tools": "{count} tools",
		  "status.reconnectOff": "reconnect off",
		  "status.failOnStartup": "fail on startup error",
		  "action.test": "Test",
		  "action.edit": "Edit",
		  "action.remove": "Remove",
		  "action.enable": "Enable",
		  "action.disable": "Disable",
		  "probe.ok": "\u2713 Connected in {ms}ms \xB7 {count} tools",
		  "probe.fail": "\u2717 {error} ({ms}ms)",
		  "tools.title": "Functions ({count})",
		  "tools.hint": "These are the functions registered with the model (`mcp__<serverName>__<tool>`); the list is empty while the row is disabled, connecting, or failed its handshake.",
		  "tools.loading": "Reading the function list\u2026",
		  "tools.idle": "Not read yet.",
		  "tools.reload": "Read again",
		  "tools.failed": "Could not read the function list",
		  "tools.unavailable": "This profile mounts no tool registry, so the function list cannot be read.",
		  "tools.empty": "This server currently registers no functions: it may be disabled, still connecting, or its handshake failed. Use \u201CTest\u201D to ask the server itself.",
		  "tools.omitted": "{count} more not shown.",
		  "paste.title": "Add by pasting JSON / YAML",
		  "paste.hint": "Accepts a Claude / VS Code style mcpServers block, a cordis.patch.yml fragment, a single server config, or a name \u2192 config map. Several servers are written in one go. Example:",
		  "paste.label": "Paste here",
		  "paste.placeholder": "Paste a configuration\u2026",
		  "paste.button": "Parse and add",
		  "paste.close": "Close",
		  "paste.imported": "Added {added}, overwrote {updated}.",
		  "paste.rejected": "{count} row(s) rejected: {detail}",
		  "form.addTitle": "Add MCP server",
		  "form.editTitle": "Edit {name}",
		  "form.entryId": "Entry id",
		  "form.entryIdHint": "Mounts as loader row {entryId}; must match [A-Za-z0-9_-]{1,64}",
		  "form.serverName": "serverName",
		  "form.serverNameHint": "Tool prefix mcp__{name}__*; must match [A-Za-z0-9_-]{1,32}",
		  "form.transport": "Transport",
		  "form.transportStdio": "stdio (local process)",
		  "form.transportHttp": "streamable-http (remote URL)",
		  "form.url": "URL",
		  "form.command": "Command",
		  "form.args": "Args (one per line)",
		  "form.env": "Env (KEY=VALUE, one per line)",
		  "form.cwd": "Working directory (optional)",
		  "form.headers": "Headers (Key: Value, one per line)",
		  "form.timeout": "Per-call timeout (ms, optional)",
		  "form.failOnStartup": "Fail on startup error (failOnStartupError)",
		  "form.cancel": "Cancel",
		  "form.save": "Save",
		  "form.saving": "Saving\u2026",
		  "err.idRequired": "Entry id is required",
		  "err.idPattern": "Must match [A-Za-z0-9_-]{1,64}",
		  "err.idTaken": "Entry id already in use",
		  "err.nameRequired": "serverName is required",
		  "err.namePattern": "Must match [A-Za-z0-9_-]{1,32}",
		  "err.nameTaken": "serverName already in use",
		  "err.urlRequired": "streamable-http needs a valid http(s) URL",
		  "err.commandRequired": "stdio needs a command",
		  "err.duplicateId": "Entry id is already in use",
		  "err.duplicateName": "serverName is already used by another server",
		  "err.invalidConfig": "Invalid MCP server configuration",
		  "err.notFound": "No such MCP server",
		  "err.notRemovable": "The patch layer does not define this row, so it cannot be deleted (a bundle provides it)",
		  "err.staleHost": "The host half does not know this endpoint ({message}): it is most likely still running an older build while the browser half is already v{version}. Restart dsh web, then reload the page.",
		  "err.endpointFailed": "Endpoint {endpoint} failed: {message}",
		  "skills.nav": "Skills",
		  "skills.title": "Agent skills",
		  "skills.subtitle": "Merge the skill catalog of every agent preset: skill providers mount into a preset, so the panel reads each preset in the roster and takes the union.",
		  "skills.presetsMerged": "Merged presets",
		  "skills.presetBroken": "unusable",
		  "skills.presetUnmounted": "unmountable",
		  "skills.scope": "Scope",
		  "skills.scopeMerged": "{count}/{total} presets",
		  "skills.scopeGlobal": "global layer",
		  "skills.noteNoRoster": "This profile mounts no agent-presets roster, so only the global layer can be read \u2014 and that usually has no skill provider.",
		  "skills.noteNoPresets": "The preset roster offers no preset, so only the global layer can be read.",
		  "skills.noteNoReadablePreset": "None of the roster\u2019s presets could be mounted (their compositions failed to compose), so the global layer was read instead.",
		  "skills.noteRegistryMissing": "This profile mounts no skill registry; the section is display-only.",
		  "skills.unread": "{count} preset(s) could not be read: {presets}",
		  "skills.search": "Search",
		  "skills.searchPlaceholder": "Filter by name or description",
		  "skills.source": "Source",
		  "skills.allSources": "All sources",
		  "skills.cwd": "Project directory",
		  "skills.cwdNone": "unrestricted (preset and global layers only)",
		  "skills.cwdEmptyRegistry": "No project directory has been registered yet; type an absolute path instead.",
		  "skills.cwdNoRegistry": "This profile mounts no workspace registry, so an absolute path has to be typed by hand.",
		  "skills.cwdManual": "Type a path",
		  "skills.cwdPick": "Pick a registered directory",
		  "skills.cwdPlaceholder": "absolute path, e.g. D:/work/my-project",
		  "skills.cwdHint": "A project directory adds that project\u2019s own skills: the host walks up from it to the nearest .git as the project root, then reads <root>/.dsh/skills and <root>/.agents/skills, where a project-level skill overrides a same-named user-level one. Unrestricted reads the preset and global layers (the machine-level .dsh / .agents skills are still included).",
		  "skills.apply": "Apply",
		  "skills.refresh": "Refresh",
		  "skills.loading": "Reading the skill catalog\u2026",
		  "skills.empty": "No skill in these presets.",
		  "skills.unavailable": "This profile mounts no skill registry; the section is display-only.",
		  "skills.count": "{count} total",
		  "skills.shown": "{shown}/{total} shown",
		  "skills.incomplete": "something is incomplete, so the catalog may be missing entries",
		  "skills.scannedAt": "read at {time}",
		  "skills.modelOn": "model-invocable",
		  "skills.modelOff": "not model-invocable",
		  "skills.userOnly": "user-only",
		  "skills.provider": "Provider",
		  "skills.shared": "shared by {presets} presets",
		  "skills.readBy": "Read from",
		  "skills.readByGlobal": "global layer",
		  "skills.noPath": "(virtual skill, no file)",
		  "skills.detail": "Show details",
		  "skills.hide": "Hide details",
		  "skills.body": "Body preview ({count} characters)",
		  "skills.detailLoading": "Loading the body\u2026",
		  "skills.truncated": "Body is long; showing the first {limit} characters",
		  "skills.detailFailed": "Could not load the body",
		  "skills.help": "What the presets and project directory do",
		  "skills.presetHint": "Skill providers (skill-filesystem / tool-skill) are mounted by each preset\u2019s composition, so different presets see different catalogs. The panel no longer asks you to pick one: it reads every preset in the roster and takes the union, marks a skill several presets provide, and flags a preset that could not be mounted.",
		  "skills.readonly": "This section is a read-only view: enable/disable is the owning provider\u2019s policy (e.g. dsh-agent-skills), which the panel does not rewrite.",
		  "facts.title": "Connectivity check",
		  "facts.summaryHint": "panel channel and host environment (diagnostics)",
		  "facts.hint": "The host half answers these live: seeing them means the browser \u2192 /api/mcp-skill-panel \u2192 host channel works. It is for troubleshooting only and takes no part in MCP / skill management.",
		  "facts.refresh": "Check again",
		  "facts.loading": "Checking\u2026",
		  "facts.failed": "Check failed",
		  "facts.plugin": "Plugin",
		  "facts.dshHome": "DSH_HOME",
		  "facts.loaderEntries": "Loader entries",
		  "facts.mcpEntries": "MCP servers",
		  "facts.patchFiles": "Existing patch layers",
		  "facts.patchFile": "Patch layer the panel writes",
		  "facts.patchReload": "patchReload",
		  "facts.skills": "Skills",
		  "facts.skillsUnavailable": "not mounted",
		  "facts.skillsCount": "{count} ({presets} presets merged)",
		  "facts.versionMismatch": "Version mismatch: host half v{host}, browser half v{client}. The host process is still running the old code \u2014 restart dsh web, then hard-refresh the page.",
		  "facts.none": "(none)",
		  "panel.versionHint": "Panel version (both halves come from the same build)",
		  "panel.halvesHint": 'The panel is two halves: the browser half is fetched fresh on every reload, while the host half loads once when dsh web starts. After changing the plugin, restart dsh web \u2014 otherwise the new page calls endpoints the old host does not have (seen as "unknown endpoint" or a failed function list).'
		};

		// dsh-mcp-skill-panel/src/client/rpc.ts
		var PanelRpcError = class extends Error {
		  /** Endpoint this rejection answers. */
		  endpoint;
		  /** Machine-readable failure code from the host envelope. */
		  code;
		  /** Per-field validation messages, when the endpoint reported them. */
		  fields;
		  /**
		   * @param endpoint - the endpoint that refused the call.
		   * @param error - the host's failure envelope.
		   */
		  constructor(endpoint, error) {
		    super(`${error.code}: ${error.message}`);
		    this.name = "PanelRpcError";
		    this.endpoint = endpoint;
		    this.code = error.code;
		    const fields = error.details?.["fields"];
		    this.fields = fields === void 0 ? void 0 : fields;
		  }
		};
		function createPanelCaller() {
		  return {
		    async call(endpoint, payload) {
		      const response = await post(endpoint, payload ?? null);
		      if (!response.ok) {
		        throw new Error(`transport failure for ${endpoint}: HTTP ${String(response.status)}`);
		      }
		      const result = await readEnvelope(response, endpoint);
		      if (result.ok) return result.value;
		      throw new PanelRpcError(endpoint, result.error);
		    }
		  };
		}
		async function post(endpoint, payload) {
		  try {
		    return await globalThis.fetch(new URL(REQUEST_PATH, resolveBase()), {
		      method: "POST",
		      // The session cookie is the credential behind Connection's fence; the
		      // panel adds no header of its own.
		      credentials: "include",
		      headers: { "content-type": "application/json" },
		      body: JSON.stringify({ endpoint, payload })
		    });
		  } catch (error) {
		    const reason = error instanceof Error ? error.message : String(error);
		    throw new Error(`cannot reach the panel host route at ${REQUEST_PATH}: ${reason}`);
		  }
		}
		async function readEnvelope(response, endpoint) {
		  let body;
		  try {
		    body = await response.json();
		  } catch {
		    throw new Error(`panel host route answered ${endpoint} with a non-JSON body`);
		  }
		  if (!isRecord(body)) throw new Error(`panel host route answered ${endpoint} with a non-object body`);
		  if (body["ok"] === true) return { ok: true, value: body["value"] };
		  if (body["ok"] === false && isRecord(body["error"])) {
		    const error = body["error"];
		    return {
		      ok: false,
		      error: {
		        code: String(error["code"]),
		        message: String(error["message"]),
		        details: isRecord(error["details"]) ? error["details"] : {}
		      }
		    };
		  }
		  throw new Error(`panel host route answered ${endpoint} with an unrecognized envelope`);
		}
		function isRecord(value) {
		  return typeof value === "object" && value !== null && !Array.isArray(value);
		}
		function resolveBase() {
		  const location = globalThis.location;
		  return location?.origin !== void 0 && location.origin !== "null" ? location.origin : "http://dsh.internal";
		}

		// dsh-mcp-skill-panel/src/client/styles.ts
		var STYLE_MARKER = "data-plugin-css-mcp-skill-panel";
		var CSS = `
		.msp-section{
		  --msp-hairline:var(--dsw-alias-border-l4,var(--dsw-alias-border-l2,#2b2f38));
		  --msp-hairline-strong:var(--dsw-alias-border-l2,#2b2f38);
		  --msp-raise:var(--dsw-alias-bg-module-platform,#262b34);
		  --msp-hover:var(--dsw-alias-interactive-bg-hover,rgba(255,255,255,.05));
		  --msp-t1:var(--dsw-alias-label-primary,#e6e8eb);
		  --msp-t2:var(--dsw-alias-label-secondary,#a7adb8);
		  --msp-t3:var(--dsw-alias-label-tertiary,#8b919c);
		  --msp-brand:var(--dsw-alias-brand-primary,#4f8cff);
		  --msp-ok:var(--dsw-alias-state-success-primary,#3fb950);
		  --msp-warn:var(--dsw-alias-state-warn-primary,#d29922);
		  --msp-bad:var(--dsw-alias-state-error-primary,#f85149);
		  --msp-mono:ui-monospace,Consolas,'Cascadia Mono',monospace;
		  display:flex;flex-direction:column;gap:12px;padding:4px 2px 24px;max-width:760px;width:100%;box-sizing:border-box;color:var(--msp-t1)
		}
		.msp-spacer{flex:1}
		.msp-title{font-size:18px;font-weight:600;line-height:1.4;color:var(--msp-t1)}
		.msp-subtitle{font-size:13px;line-height:1.6;color:var(--msp-t3);margin:4px 0 0}
		.msp-ver{margin-left:7px;font-size:11px;font-weight:400;font-family:var(--msp-mono);color:var(--msp-t3);vertical-align:1px}
		.msp-head{display:flex;align-items:center;gap:10px}
		.msp-head-title{display:inline-flex;align-items:center;gap:8px;font-size:16px;font-weight:600;color:var(--msp-t1)}
		.msp-head-sub{font-size:12px;font-weight:400;color:var(--msp-t3)}
		.msp-card-title{font-size:14px;font-weight:600;color:var(--msp-t1)}
		.msp-name{font-size:15px;font-weight:600;line-height:1.4;color:var(--msp-t1)}
		.msp-name-sm{font-size:13.5px}
		.msp-label{font-size:12px;color:var(--msp-t2)}
		.msp-hint{color:var(--msp-t3);font-size:12px;line-height:1.6;margin:0}
		.msp-meta{display:flex;align-items:center;gap:14px;flex-wrap:wrap;color:var(--msp-t3);font-size:12px}
		.msp-toolbar{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
		.msp-section>.msp-toolbar{padding:12px 14px;border:.5px solid var(--msp-hairline);border-radius:16px;background:var(--msp-raise)}
		.msp-filters{display:flex;flex-direction:column;gap:10px;padding:12px 14px;border:.5px solid var(--msp-hairline);border-radius:16px;background:var(--msp-raise)}
		.msp-filters-row{display:flex;align-items:flex-end;gap:10px;flex-wrap:wrap}
		.msp-filters-row+.msp-filters-row{border-top:1px solid var(--msp-hairline);padding-top:10px}
		.msp-field-inline{display:flex;flex-direction:column;gap:4px;min-width:0}
		.msp-field-grow{flex:1 1 240px}
		.msp-ctl-row{display:flex;align-items:center;gap:6px;min-width:0}
		.msp-btn{display:inline-flex;align-items:center;gap:6px;border:1px solid var(--msp-hairline-strong);background:transparent;color:var(--msp-t1);border-radius:9px;padding:6px 11px;font:inherit;font-size:13px;cursor:pointer;transition:background .15s,border-color .15s,color .15s}
		.msp-btn:hover:not(:disabled){background:var(--msp-hover)}
		.msp-btn:disabled{opacity:.45;cursor:default}
		.msp-btn-sm{font-size:12px;padding:4px 9px}
		.msp-btn-primary{border-color:var(--msp-brand);background:color-mix(in srgb,var(--msp-brand) 20%,transparent);color:var(--msp-brand)}
		.msp-btn-primary:hover:not(:disabled){background:color-mix(in srgb,var(--msp-brand) 30%,transparent)}
		.msp-btn-danger{color:var(--msp-t2)}
		.msp-btn-danger:hover:not(:disabled){border-color:var(--msp-bad);background:color-mix(in srgb,var(--msp-bad) 12%,transparent);color:var(--msp-bad)}
		.msp-iconbtn{border:none;background:transparent;color:var(--msp-t2);cursor:pointer;padding:5px 7px;display:inline-flex;align-items:center;border-radius:8px;transition:background .15s,color .15s}
		.msp-iconbtn:hover:not(:disabled){background:var(--msp-hover);color:var(--msp-t1)}
		.msp-iconbtn:disabled{opacity:.4;cursor:default}
		.msp-card{border:.5px solid var(--msp-hairline);background:transparent;border-radius:18px;padding:14px 16px;display:flex;flex-direction:column;gap:9px;transition:border-color .16s}
		.msp-card:hover{border-color:var(--msp-hairline-strong)}
		.msp-card-head{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
		.msp-status{display:inline-flex;align-items:center;gap:6px;white-space:nowrap;border-radius:999px;padding:2px 10px;font-size:12px;font-weight:500;line-height:18px;background:color-mix(in srgb,currentColor 14%,transparent)}
		.msp-status-dot{width:7px;height:7px;border-radius:50%;background:currentColor;flex:none}
		.msp-status-ok{color:var(--msp-ok)}
		.msp-status-warn{color:var(--msp-warn)}
		.msp-status-bad{color:var(--msp-bad)}
		.msp-status-off{color:var(--msp-t2);background:var(--msp-hover)}
		.msp-tag{border:1px solid var(--msp-hairline);color:var(--msp-t3);border-radius:999px;padding:1px 8px;font-size:11px;white-space:nowrap}
		.msp-tag-warn{border-color:color-mix(in srgb,var(--msp-warn) 55%,transparent);color:var(--msp-warn)}
		.msp-id{color:var(--msp-t3);font-size:12px;font-family:var(--msp-mono);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
		.msp-target{color:var(--msp-t2);font-size:12.5px;font-family:var(--msp-mono);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
		.msp-desc{font-size:12.5px;line-height:1.6;color:var(--msp-t2);overflow-wrap:anywhere}
		.msp-desc-dim{font-size:12px;color:var(--msp-t3)}
		.msp-probe{font-size:12px;line-height:1.5;color:var(--msp-t3);overflow-wrap:anywhere}
		.msp-probe-ok{color:var(--msp-ok)}
		.msp-probe-bad{color:var(--msp-bad)}
		.msp-actions{display:flex;gap:8px;align-items:center;flex-wrap:wrap;border-top:1px solid var(--msp-hairline);padding-top:9px}
		.msp-form{display:flex;flex-direction:column;gap:10px;padding:16px;border:.5px solid var(--msp-hairline);border-radius:18px;background:var(--msp-raise)}
		.msp-form-title{font-size:14px;font-weight:600;color:var(--msp-t1)}
		.msp-field{display:flex;flex-direction:column;gap:5px}
		.msp-field-row{display:flex;gap:10px}
		.msp-field-row .msp-field{flex:1}
		.msp-input{border:1px solid var(--msp-hairline-strong);background:transparent;color:var(--msp-t1);border-radius:9px;padding:7px 11px;font:inherit;font-size:13px;width:100%;max-width:440px;box-sizing:border-box;transition:border-color .15s}
		.msp-input:hover:not(:disabled){border-color:var(--msp-t3)}
		.msp-input:focus-visible{border-color:var(--msp-brand);outline:none}
		.msp-input:disabled{opacity:.55}
		.msp-input-invalid{border-color:var(--msp-bad)}
		.msp-select{width:auto;max-width:200px}
		.msp-input-path{flex:1 1 220px;max-width:360px;font-family:var(--msp-mono);font-size:12.5px}
		.msp-textarea{font-family:var(--msp-mono);font-size:12px;min-height:72px;resize:vertical}
		.msp-searchbox{display:inline-flex;align-items:center;gap:6px;border:1px solid var(--msp-hairline-strong);background:transparent;border-radius:9px;padding:0 9px;color:var(--msp-t3);transition:border-color .15s}
		.msp-searchbox:focus-within{border-color:var(--msp-brand)}
		.msp-input-bare{border:none;background:transparent;padding:6px 0;color:var(--msp-t1);font:inherit;font-size:13px;width:190px;max-width:190px;box-sizing:border-box}
		.msp-input-bare:hover:not(:disabled),.msp-input-bare:focus-visible{border:none;outline:none}
		.msp-check{display:flex;align-items:center;gap:8px;font-size:13px;color:var(--msp-t2);cursor:pointer}
		.msp-form-actions{display:flex;gap:8px;justify-content:flex-end}
		.msp-error{color:var(--msp-bad);font-size:12px;margin:0}
		.msp-banner{color:var(--msp-bad);font-size:12px;line-height:1.6;padding:8px 12px;border:1px solid color-mix(in srgb,var(--msp-bad) 32%,transparent);border-radius:10px;background:color-mix(in srgb,var(--msp-bad) 9%,transparent)}
		.msp-banner-soft{color:var(--msp-t2);border-color:var(--msp-hairline);background:var(--msp-raise)}
		.msp-warnlist{margin:0;padding-left:18px;color:var(--msp-warn);font-size:12px;line-height:1.6}
		.msp-empty{color:var(--msp-t3);text-align:center;padding:32px 16px;font-size:13px;line-height:1.8}
		.msp-footer{color:var(--msp-t3);font-size:11.5px;font-family:var(--msp-mono);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
		.msp-spin{display:inline-block;width:12px;height:12px;border:2px solid var(--dsw-alias-label-dimmed,#4a505c);border-top-color:transparent;border-radius:50%;animation:msp-spin .8s linear infinite;vertical-align:-2px;flex:none}
		@keyframes msp-spin{to{transform:rotate(360deg)}}
		.msp-details{margin-top:2px}
		.msp-details>summary{cursor:pointer;font-size:12px;color:var(--msp-t2);transition:color .15s}
		.msp-details>summary:hover{color:var(--msp-t1)}
		.msp-details[open]>summary{color:var(--msp-t1)}
		.msp-details .msp-hint{margin-top:6px;max-width:640px}
		.msp-details .msp-card,.msp-details .msp-rows{margin-top:8px}
		.msp-rows{display:flex;flex-direction:column;gap:6px}
		.msp-row{display:flex;gap:12px;font-size:12px;align-items:baseline}
		.msp-row-label{min-width:96px;color:var(--msp-t3)}
		.msp-row-value{color:var(--msp-t2);font-family:var(--msp-mono);overflow-wrap:anywhere;min-width:0}
		.msp-list{margin:0;padding-left:16px}
		.msp-list-item{overflow-wrap:anywhere}
		.msp-none{color:var(--msp-t3)}
		.msp-tools{font-size:12px}
		.msp-tools>summary{cursor:pointer;font-size:12px;color:var(--msp-t2);transition:color .15s}
		.msp-tools>summary:hover,.msp-tools[open]>summary{color:var(--msp-t1)}
		.msp-tools-body{display:flex;flex-direction:column;gap:8px;margin-top:8px;padding:10px 12px;border:1px solid var(--msp-hairline);border-radius:12px;background:var(--msp-raise)}
		.msp-tools-head{display:flex;align-items:center;gap:8px;min-width:0}
		.msp-toollist{margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:9px;max-height:320px;overflow:auto}
		.msp-tool{display:flex;flex-direction:column;gap:3px}
		.msp-tool-name{font-family:var(--msp-mono);font-size:12px;color:var(--msp-t1);overflow-wrap:anywhere}
		.msp-tool-params{display:flex;flex-wrap:wrap;gap:5px}
		.msp-param{font-family:var(--msp-mono);font-size:11px;color:var(--msp-t3);border:1px solid var(--msp-hairline);border-radius:6px;padding:0 5px}
		.msp-tool-desc{font-size:12px;line-height:1.5;color:var(--msp-t2);overflow-wrap:anywhere}.msp-pre{margin:0;padding:12px 14px;border:1px solid var(--msp-hairline);border-radius:12px;background:var(--msp-raise);color:var(--msp-t2);font-family:var(--msp-mono);font-size:12px;line-height:1.55;white-space:pre-wrap;overflow-wrap:anywhere;max-height:420px;overflow:auto}
		.msp-skilllist{display:flex;flex-direction:column;border:.5px solid var(--msp-hairline);border-radius:16px;background:var(--msp-raise);overflow:hidden}
		.msp-skillrow{display:flex;flex-direction:column;border-top:1px solid var(--msp-hairline)}
		.msp-skilllist>.msp-skillrow:first-child{border-top:none}
		.msp-skillrow-head{display:flex;align-items:center;gap:10px;width:100%;box-sizing:border-box;border:none;background:transparent;color:var(--msp-t1);font:inherit;text-align:left;padding:11px 14px;cursor:pointer;transition:background .15s}
		.msp-skillrow-head:hover:not(:disabled){background:var(--msp-hover)}
		.msp-skillrow-head:disabled{cursor:default;opacity:.6}
		.msp-skillrow-caret{display:inline-flex;color:var(--msp-t3);flex:none;transition:transform .15s}
		.msp-skillrow-open .msp-skillrow-caret{transform:rotate(90deg)}
		.msp-skillrow-name{font-size:13.5px;line-height:1.45;font-weight:600;font-family:var(--msp-mono);color:var(--msp-t1);white-space:nowrap}
		.msp-skillrow-desc{flex:1;min-width:0;font-size:12.5px;line-height:1.5;color:var(--msp-t3);text-align:right;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
		.msp-skillrow-body{display:flex;flex-direction:column;gap:10px;padding:0 14px 14px 34px}
		.msp-body{margin-top:2px}
		.msp-body>summary{cursor:pointer;font-size:12px;color:var(--msp-t2);transition:color .15s}
		.msp-body>summary:hover{color:var(--msp-t1)}
		.msp-body[open]>summary{color:var(--msp-t1)}
		.msp-body .msp-pre{margin-top:8px}
		.msp-body .msp-hint{margin:6px 0 0}
		.msp-chips{display:flex;flex-wrap:wrap;gap:6px;min-width:0}
		.msp-chip{display:inline-flex;align-items:center;gap:6px;border:1px solid var(--msp-hairline);border-radius:999px;padding:1px 8px;font-size:11px;color:var(--msp-t2);white-space:nowrap}
		.msp-chip-count{color:var(--msp-t3);font-family:var(--msp-mono)}
		.msp-chip-off{border-style:dashed;color:var(--msp-t3)}
		.msp-chip-skip{color:var(--msp-warn)}
		`;
		function injectPanelStyles() {
		  if (document.querySelector(`style[${STYLE_MARKER}]`) !== null) return;
		  const style = document.createElement("style");
		  style.setAttribute(STYLE_MARKER, "");
		  style.textContent = CSS;
		  document.head.appendChild(style);
		}

		// dsh-mcp-skill-panel/src/client/index.tsx
		var inject = ["slots", "locale"];
		function apply(ctx) {
		  ctx.effect(() => {
		    injectPanelStyles();
		    return () => {
		    };
		  }, "mcp-skill-panel: styles");
		  ctx.effect(() => ctx.locale.register(LOCALE_NS, { zh, en }), "mcp-skill-panel: locale");
		  const app = createInjectedProps(ctx);
		  ctx.slots.inject("settings.section", () => ctx.slots.register({
		    name: "settings.section",
		    id: MCP_SECTION_ID,
		    order: MCP_SECTION_ORDER,
		    label: () => app.t("mcp.nav"),
		    locale: LOCALE_NS,
		    inject: () => app
		  }, McpSection));
		  ctx.slots.inject("settings.section", () => ctx.slots.register({
		    name: "settings.section",
		    id: SKILLS_SECTION_ID,
		    order: SKILLS_SECTION_ORDER,
		    label: () => app.t("skills.nav"),
		    locale: LOCALE_NS,
		    inject: () => app
		  }, SkillsSection));
		}
		function createInjectedProps(ctx) {
		  const call = createPanelCaller().call;
		  return {
		    call,
		    t: (key, params) => {
		      const translate = ctx.locale.bind(LOCALE_NS);
		      return translate(key, params);
		    },
		    onLocaleChange: (listener) => ctx.locale.subscribe(listener)
		  };
		}


		return module.exports;
	}
});
