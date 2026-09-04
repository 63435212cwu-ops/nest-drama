/* NEST-DRAMA 界面进化层 · Copyright (C) 2026 63435212cwu-ops · AGPL-3.0-only
 *
 * 这一层不改业务数据，只做四件事：
 *   1. 日/夜双主题（跟随系统或手动），全站 CSS 变量驱动；
 *   2. 星丛 3D 的电影级后期：影调（ACES/AgX/Neutral）、曝光、辉光、颗粒、暗角、色差、色调风格、
 *      宽银幕影院模式、字幕条、PNG 截图、离屏暂停渲染、实时 FPS；
 *   3. 人性化：全局快捷键、卡司即时检索、回到顶部、页签标题随剧情更新、成稿提醒；
 *   4. 一切偏好写入 localStorage，刷新不丢。
 *
 * 与构建产物的唯一接口：Graph3D 组件 mounted 时把实例挂到 window.__ND3D 并派发 nd:3d-ready。
 */
(function () {
  "use strict";

  var LS = {
    get: function (k, d) { try { var v = localStorage.getItem("nd." + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem("nd." + k, JSON.stringify(v)); } catch (e) { /* 隐私模式下静默 */ } }
  };
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function txt(n) { return (n && n.textContent || "").trim(); }
  function isTyping() {
    var a = document.activeElement; if (!a) return false;
    return /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName) || a.isContentEditable;
  }

  /* ---------------- 轻提示 ---------------- */
  var toastTimer = null;
  function toast(msg, ms) {
    var old = document.querySelector(".nd-toast"); if (old) old.remove();
    var t = el("div", "nd-toast", "<i></i><span></span>");
    t.lastChild.textContent = msg;
    document.body.appendChild(t);
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.add("out"); setTimeout(function () { t.remove(); }, 320); }, ms || 2600);
  }

  /* ---------------- 主题 ---------------- */
  var THEMES = ["auto", "light", "dark"];
  var THEME_ICON = { auto: "◐", light: "☀", dark: "☾" };
  var THEME_NAME = { auto: "跟随系统", light: "纸面（日间）", dark: "影院（夜间）" };
  var mq = window.matchMedia("(prefers-color-scheme: dark)");
  function applyTheme(mode) {
    var dark = mode === "dark" || (mode === "auto" && mq.matches);
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    document.documentElement.setAttribute("data-theme-mode", mode);
    var b = document.querySelector(".nd-theme");
    if (b) { b.textContent = THEME_ICON[mode]; b.title = "主题：" + THEME_NAME[mode] + "（T 切换）"; }
  }
  function cycleTheme() {
    var cur = LS.get("theme", "auto"), next = THEMES[(THEMES.indexOf(cur) + 1) % THEMES.length];
    LS.set("theme", next); applyTheme(next); toast("主题 · " + THEME_NAME[next]);
  }
  applyTheme(LS.get("theme", "auto"));
  mq.addEventListener && mq.addEventListener("change", function () { applyTheme(LS.get("theme", "auto")); });

  /* ---------------- 顶栏按钮注入 ---------------- */
  function decorateHeader() {
    var right = document.querySelector("header .top-right, header [class*=top-right]");
    if (!right || right.querySelector(".nd-theme")) return;
    var kbd = el("button", "nd-kbd", "?"); kbd.type = "button"; kbd.title = "快捷键一览（?）";
    kbd.addEventListener("click", toggleHelp);
    var th = el("button", "nd-theme"); th.type = "button";
    th.addEventListener("click", cycleTheme);
    right.insertBefore(kbd, right.firstChild);
    right.insertBefore(th, right.firstChild);
    applyTheme(LS.get("theme", "auto"));
  }

  /* ---------------- 快捷键帮助 ---------------- */
  var HELP = [
    ["1 – 4", "切换 世界 / 配置 / 推演 / 报告"],
    ["F", "星丛全屏 / 退出"],
    ["C", "影院模式（宽银幕、隐去 HUD）"],
    ["Space", "星丛公转 暂停 / 继续"],
    ["R", "星丛镜头复位"],
    ["Enter / ⌫", "进入所选角色星系 / 返回星丛"],
    ["U", "切换单元星系"],
    ["G", "画质面板 开 / 关"],
    ["S", "导出星丛 PNG 截图"],
    ["V", "录制 30 秒演示片（WebM）"],
    ["/", "聚焦卡司检索"],
    ["T", "日 / 夜 / 跟随系统 主题"],
    ["H", "历史局"],
    ["Esc", "逐层退出：卡片 → 选中 → 星系 → 全屏"]
  ];
  function toggleHelp() {
    var m = document.querySelector(".nd-help-mask");
    if (m) { m.remove(); return; }
    m = el("div", "nd-help-mask");
    var card = el("div", "card nd-help");
    card.innerHTML = '<div class="kicker">Keyboard</div><h3>快捷键</h3><div class="sub">在任何非输入状态下直接按键即可。</div><div class="grid"></div><div class="mut">按 <b>?</b> 或 <b>Esc</b> 关闭 · 偏好自动保存于本机浏览器</div>';
    var grid = card.querySelector(".grid");
    HELP.forEach(function (h) { var d = el("div"); d.innerHTML = "<span></span><kbd></kbd>"; d.firstChild.textContent = h[1]; d.lastChild.textContent = h[0]; grid.appendChild(d); });
    m.appendChild(card);
    m.addEventListener("click", function (e) { if (e.target === m) m.remove(); });
    document.body.appendChild(m);
  }

  /* ---------------- 卡司检索 ---------------- */
  function decorateCast() {
    var heads = document.querySelectorAll(".kicker, .label, .mut, b, div, span");
    for (var i = 0; i < heads.length; i++) {
      var h = heads[i];
      if (h.children.length > 1 || !/^卡司\s*[·・]\s*\d+\s*人$/.test(txt(h))) continue;
      if (h.dataset.ndCast) return;
      var list = h.nextElementSibling;
      if (!list || list.children.length < 4) return;
      h.dataset.ndCast = "1";
      var wrap = el("div", "nd-search");
      wrap.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><input class="field nd-cast-input" type="search" placeholder="检索角色 · 姓名或性格关键词（/）" autocomplete="off"><span class="cnt"></span>';
      var input = wrap.querySelector("input"), cnt = wrap.querySelector(".cnt");
      var total = list.children.length;
      function run() {
        var q = input.value.trim().toLowerCase(), n = 0;
        Array.prototype.forEach.call(list.children, function (c) {
          var hit = !q || txt(c).toLowerCase().indexOf(q) >= 0;
          c.classList.toggle("nd-hide", !hit);
          if (hit && q) { c.classList.remove("nd-hit"); void c.offsetWidth; c.classList.add("nd-hit"); }
          if (hit) n++;
        });
        cnt.textContent = q ? n + "/" + total : total + " 人";
      }
      input.addEventListener("input", run);
      input.addEventListener("keydown", function (e) { if (e.key === "Escape") { input.value = ""; run(); input.blur(); } });
      h.parentNode.insertBefore(wrap, list);
      run();
      return;
    }
  }

  /* ---------------- 回到顶部 ---------------- */
  var totop = el("button", "nd-totop", "↑"); totop.type = "button"; totop.title = "回到顶部";
  totop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
  document.addEventListener("DOMContentLoaded", function () { document.body.appendChild(totop); });
  window.addEventListener("scroll", function () { totop.classList.toggle("show", window.scrollY > 480); }, { passive: true });

  /* ---------------- 星丛 3D 电影级后期 ---------------- */
  var FX_DEFAULT = { tone: 4, exposure: 1.06, bloom: 0.24, bloomRadius: 0.36, grain: 0.013, vig: 1, ab: 0.007, sat: 1, con: 1, grade: 0, speed: 0.32, ana: 0.35, nebula: 0.7, dust: true, warp: true, labels: true, links: true, trails: true, trailLen: 0.2, linkAmt: 0.6, quiet: true, breathe: true, cinema: false, panel: false };
  var TONES = [[4, "ACES"], [6, "AgX"], [7, "Neutral"]];
  var GRADES = [[0, "原生"], [1, "胶片暖"], [2, "冷峻"], [4, "鎏金"], [3, "黑白"]];
  var FRAG = [
    "uniform sampler2D tDiffuse; uniform float uT, uGrain, uVig, uAb, uBar, uSat, uCon, uGrade, uWarp, uFlash, uAna;",
    "varying vec2 vUv;",
    "vec3 grade(vec3 c){",
    "  if (uGrade < 0.5) return c;",
    "  if (uGrade < 1.5) return c * vec3(1.05, 1.0, 0.93) + vec3(0.015, 0.025, 0.05) * (1.0 - c);",
    "  if (uGrade < 2.5) return c * vec3(0.93, 0.99, 1.09) + vec3(0.0, 0.01, 0.03) * (1.0 - c);",
    "  if (uGrade < 3.5) { float l = dot(c, vec3(.299, .587, .114)); return vec3(l) * vec3(1.0, 0.98, 0.94); }",
    "  /* 鎏金：高光偏金、阴影沉入深蓝，中间调略去饱和——克制的奢华 */",
    "  float lg = dot(c, vec3(.299, .587, .114));",
    "  vec3 g = c * vec3(1.07, 0.99, 0.84) + vec3(0.004, 0.010, 0.032) * (1.0 - c);",
    "  g = mix(vec3(lg), g, 0.86);",
    "  return g + vec3(0.06, 0.04, 0.0) * smoothstep(0.55, 1.0, lg);",
    "}",
    "vec3 tap(vec2 uv){ return texture2D(tDiffuse, uv).rgb; }",
    "void main(){",
    "  vec2 d = vUv - 0.5; float r2 = dot(d, d);",
    "  vec3 c;",
    "  float ab = uAb + uWarp * 0.05;",
    "  if (uWarp > 0.002) {",
    "    /* 跃迁：径向拖影，越靠边拉得越长 */",
    "    vec3 acc = vec3(0.0); float w = 0.0;",
    "    for (int i = 0; i < 12; i++) {",
    "      float f = float(i) / 12.0; float sc = 1.0 - uWarp * f * 0.42 * (0.35 + r2 * 2.6);",
    "      float k = 1.0 - f * 0.6; acc += tap(0.5 + d * sc) * k; w += k;",
    "    }",
    "    c = acc / w;",
    "    c.r = mix(c.r, tap(vUv + d * r2 * ab).r, 0.5); c.b = mix(c.b, tap(vUv - d * r2 * ab).b, 0.5);",
    "  } else {",
    "    c.r = tap(vUv + d * r2 * ab).r; c.g = tap(vUv).g; c.b = tap(vUv - d * r2 * ab).b;",
    "  }",
    "  /* 变形镜头光斑：高亮像素横向拉丝，偏蓝 */",
    "  if (uAna > 0.001) {",
    "    vec3 ana = vec3(0.0);",
    "    for (int i = 1; i <= 6; i++) {",
    "      float o = float(i) * 0.014;",
    "      vec3 a = tap(vUv + vec2(o, 0.0)) + tap(vUv - vec2(o, 0.0));",
    "      ana += max(a - 1.35, 0.0) * (1.0 - float(i) / 7.0);",
    "    }",
    "    c += ana * uAna * 0.5 * vec3(0.5, 0.68, 1.0);",
    "  }",
    "  float vig = smoothstep(0.78, 0.28, length(d));",
    "  c *= mix(1.0, 0.55 + 0.45 * vig, uVig);",
    "  float l = dot(c, vec3(.299, .587, .114));",
    "  c = mix(vec3(l), c, uSat);",
    "  c = (c - 0.5) * uCon + 0.5;",
    "  c = grade(c);",
    "  c += uFlash * vec3(1.0, 0.94, 0.82) * (0.55 + 0.45 * vig);",
    "  float g = fract(sin(dot(vUv + fract(uT * 0.37), vec2(12.9898, 78.233))) * 43758.5453);",
    "  c += (g - 0.5) * (uGrain + uWarp * 0.03);",
    "  float bar = step(uBar, vUv.y) * step(vUv.y, 1.0 - uBar);",
    "  gl_FragColor = vec4(c * bar, 1.0);",
    "}"
  ].join("\n");

  /* 程序化星云（BackSide 大球，fbm 三维噪声，随时间极慢漂移） */
  var NEB_VERT = "varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }";
  var NEB_FRAG = [
    "uniform float uT, uAmt; varying vec3 vDir;",
    "float hash(vec3 p){ p = fract(p * 0.3183099 + vec3(.1, .2, .3)); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }",
    "float noise(vec3 x){ vec3 i = floor(x); vec3 f = fract(x); f = f * f * (3.0 - 2.0 * f);",
    "  return mix(mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x), mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),",
    "             mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x), mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z); }",
    "float fbm(vec3 p){ float a = 0.5, s = 0.0; for (int i = 0; i < 5; i++) { s += a * noise(p); p = p * 2.03 + vec3(1.7, 9.2, 3.1); a *= 0.5; } return s; }",
    "void main(){",
    "  vec3 p = vDir * 2.6 + vec3(uT * 0.006, 0.0, -uT * 0.004);",
    "  float n1 = fbm(p);",
    "  float n2 = fbm(p * 2.1 + vec3(4.0, 1.0, 7.0) + n1 * 0.8);",
    "  /* 银河带：沿一条倾斜大圆浓，远离则稀 */",
    "  vec3 axis = normalize(vec3(0.35, 1.0, 0.2));",
    "  float band = 1.0 - smoothstep(0.0, 0.55, abs(dot(vDir, axis)));",
    "  float dens = smoothstep(0.42, 0.78, n1) * (0.35 + 0.65 * band);",
    "  float fil = smoothstep(0.55, 0.9, n2) * band;",
    "  vec3 indigo = vec3(0.10, 0.14, 0.36), violet = vec3(0.34, 0.12, 0.42), amber = vec3(0.85, 0.52, 0.24), teal = vec3(0.12, 0.34, 0.40);",
    "  vec3 col = mix(indigo, violet, smoothstep(0.3, 0.8, n2)) * dens;",
    "  col += teal * fil * 0.5;",
    "  col += amber * pow(fil, 2.2) * 0.9;",
    "  /* 暗尘带：吞掉一部分银河 */",
    "  float dust = smoothstep(0.62, 0.86, fbm(p * 3.3 + vec3(11.0, 5.0, 2.0)));",
    "  col *= 1.0 - dust * band * 0.75;",
    "  gl_FragColor = vec4(col * uAmt * 1.8, 1.0);",
    "}"
  ].join("\n");
  /* 近景星尘：漂在镜头周围，慢速呼吸 */
  var DUST_VERT = [
    "attribute float aSeed; uniform float uT; varying float vA;",
    "void main(){",
    "  vec3 p = position;",
    "  p.x += sin(uT * 0.11 + aSeed * 6.28) * 18.0; p.y += cos(uT * 0.09 + aSeed * 3.1) * 14.0; p.z += sin(uT * 0.07 + aSeed * 9.4) * 18.0;",
    "  vec4 mv = modelViewMatrix * vec4(p, 1.0);",
    "  float dist = -mv.z;",
    "  vA = (0.35 + 0.65 * (0.5 + 0.5 * sin(uT * 0.8 + aSeed * 12.0))) * smoothstep(60.0, 260.0, dist) * (1.0 - smoothstep(900.0, 1500.0, dist));",
    "  gl_PointSize = (1.6 + aSeed * 2.6) * (700.0 / dist);",
    "  gl_Position = projectionMatrix * mv;",
    "}"
  ].join("\n");
  var DUST_FRAG = "varying float vA; void main(){ float d = length(gl_PointCoord - 0.5) * 2.0; float a = smoothstep(1.0, 0.1, d) * vA; gl_FragColor = vec4(0.78, 0.86, 1.0, a * 0.55); }";

  var fx = Object.assign({}, FX_DEFAULT, LS.get("fx", {}));
  var g3 = null;          // 当前 Graph3D 实例
  var fps = 0, frames = 0, fpsT = performance.now(), visible = true;

  function saveFx() { LS.set("fx", fx); }
  // 组件根是 Teleport，$el 只是占位注释节点；真正的 .g3 容器取画布 holder 的父级
  function rootOf(inst) { var h = inst && inst.$refs && inst.$refs.holder; return h ? h.parentElement : null; }

  function upgradePost(inst) {
    var fp = inst.filmPass; if (!fp || fp.__nd) return;
    fp.__nd = true;
    var u = fp.uniforms;
    var init = { uGrain: fx.grain, uVig: fx.vig, uAb: fx.ab, uBar: 0, uSat: fx.sat, uCon: fx.con, uGrade: fx.grade, uWarp: 0, uFlash: 0, uAna: fx.ana };
    Object.keys(init).forEach(function (k) { u[k] = { value: init[k] }; });
    fp.material.fragmentShader = FRAG;
    fp.material.needsUpdate = true;
  }

  function applyFx() {
    var inst = g3; if (!inst || !inst.renderer) return;
    inst.renderer.toneMapping = fx.tone;
    inst.renderer.toneMappingExposure = fx.exposure;
    var bloom = inst.composer && inst.composer.passes[1];
    if (bloom && "strength" in bloom) { bloom.strength = fx.bloom; bloom.radius = fx.bloomRadius; }
    var u = inst.filmPass && inst.filmPass.uniforms;
    if (u && u.uGrain) {
      u.uGrain.value = fx.grain; u.uVig.value = fx.vig; u.uAb.value = fx.ab; u.uSat.value = fx.sat; u.uCon.value = fx.con; u.uGrade.value = fx.grade;
      u.uBar.value = fx.cinema ? 0.075 : 0;
      u.uAna.value = fx.ana;
    }
    try { window.__ndTrail = fx.trailLen; } catch (e) { /* 旧构建无此钩子 */ }
    (inst.links || []).forEach(function (l) {
      var m = l.line.material; if (m.__ndBase == null) m.__ndBase = m.opacity;
      m.opacity = m.__ndBase * fx.linkAmt;
      (l.pulses || []).forEach(function (pu) { pu.sp.visible = pu.sp.visible && fx.linkAmt > 0.05; });
    });
    if (inst.__ndNebula) { inst.__ndNebula.visible = fx.nebula > 0.01; inst.__ndNebula.material.uniforms.uAmt.value = fx.nebula; }
    if (inst.__ndDust) inst.__ndDust.visible = !!fx.dust;
    if (inst.controls) inst.controls.autoRotateSpeed = fx.cinema ? Math.min(fx.speed, 0.14) : fx.speed;
    (inst.planets || []).forEach(function (p) {
      if (p.name) p.name.visible = fx.labels;
      if (p.trail) p.trail.visible = fx.trails;
    });
    (inst.links || []).forEach(function (l) { l.line.visible = fx.links && (l.line.__ndVis !== false); });
    var root = rootOf(inst); if (root && root.classList) root.classList.toggle("nd-cinema", !!fx.cinema);
    var panel = document.querySelector(".nd-fx"); if (panel) panel.hidden = !fx.panel;
    syncPanel();
  }

  function shot() {
    var inst = g3; if (!inst) return;
    inst.composer.render();
    var name = "NEST-DRAMA · " + ((inst.meta && inst.meta.unitName) || (inst.dive && inst.dive.name) || "星丛") + " · R" + ((inst.lastFeed && inst.lastFeed.round) || "-") + ".png";
    inst.renderer.domElement.toBlob(function (b) {
      if (!b) { toast("截图失败：画布不可读"); return; }
      var a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = name; a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000);
      toast("已导出 · " + name);
    }, "image/png");
  }

  function range(label, key, min, max, step, fmt) {
    var row = el("div", "row");
    row.innerHTML = "<label></label><input type=range><output></output>";
    row.firstChild.textContent = label;
    var r = row.children[1], o = row.children[2];
    r.min = min; r.max = max; r.step = step; r.value = fx[key];
    o.textContent = fmt ? fmt(fx[key]) : fx[key];
    r.addEventListener("input", function () { fx[key] = +r.value; o.textContent = fmt ? fmt(fx[key]) : fx[key]; applyFx(); saveFx(); });
    row.dataset.key = key;
    return row;
  }
  function segs(key, opts) {
    var s = el("div", "segs"); s.dataset.key = key; s.style.gridTemplateColumns = "repeat(" + opts.length + ", 1fr)";
    opts.forEach(function (op) {
      var b = el("button", null); b.type = "button"; b.textContent = op[1]; b.dataset.v = op[0];
      b.addEventListener("click", function () { fx[key] = op[0]; applyFx(); saveFx(); });
      s.appendChild(b);
    });
    return s;
  }
  function check(label, key) {
    var l = el("label"); l.innerHTML = "<input type=checkbox><span></span>"; l.lastChild.textContent = label;
    var c = l.firstChild; c.checked = !!fx[key]; c.dataset.key = key;
    c.addEventListener("change", function () { fx[key] = c.checked; applyFx(); saveFx(); if (key === "cinema") toast(c.checked ? "影院模式 · 移动鼠标显示按钮，C 退出" : "已退出影院模式"); });
    return l;
  }
  function syncPanel() {
    var p = document.querySelector(".nd-fx"); if (!p) return;
    p.querySelectorAll(".segs").forEach(function (s) {
      Array.prototype.forEach.call(s.children, function (b) { b.classList.toggle("on", +b.dataset.v === fx[s.dataset.key]); });
    });
    p.querySelectorAll("input[type=checkbox]").forEach(function (c) { c.checked = !!fx[c.dataset.key]; });
    p.querySelectorAll(".row").forEach(function (r) { var i = r.children[1]; if (+i.value !== fx[r.dataset.key]) { i.value = fx[r.dataset.key]; r.children[2].textContent = fx[r.dataset.key]; } });
  }

  var PRESET_NATIVE = {};
  var PRESET_FILM = { tone: 4, exposure: 1.1, bloom: 0.3, bloomRadius: 0.42, grain: 0.018, vig: 1, ab: 0.009, sat: 1.05, con: 1.04, grade: 1, ana: 0.5, nebula: 0.85, trailLen: 0.22, linkAmt: 0.7, quiet: false };
  var PRESET_LUXE = { tone: 6, exposure: 1.0, bloom: 0.2, bloomRadius: 0.55, grain: 0.008, vig: 1, ab: 0.004, sat: 0.92, con: 1.05, grade: 4, ana: 0.28, nebula: 0.42, trailLen: 0.14, linkAmt: 0.32, quiet: true, breathe: true, speed: 0.22 };
  function buildPanel(inst) {
    var root = rootOf(inst); if (!root || root.querySelector(".nd-fx")) return;
    var tg = el("button", "nd-fx-toggle", "◈ 画质 <span class='nd-fps'></span>"); tg.type = "button"; tg.title = "电影级画质与影院模式（G）";
    tg.addEventListener("click", function () { fx.panel = !fx.panel; applyFx(); saveFx(); });
    var p = el("div", "nd-fx"); p.hidden = !fx.panel;
    p.appendChild(el("h4", null, "Cinematic <small>three.js · 后期</small>"));
    var pre = el("div", "segs presets"); pre.style.gridTemplateColumns = "repeat(3, 1fr)";
    [["原生", PRESET_NATIVE], ["电影", PRESET_FILM], ["极简奢华", PRESET_LUXE]].forEach(function (pp) {
      var b = el("button", null, pp[0]); b.type = "button";
      b.addEventListener("click", function () { var keep = fx.panel; fx = Object.assign({}, FX_DEFAULT, pp[1], { panel: keep }); applyFx(); saveFx(); toast("预设 · " + pp[0]); });
      pre.appendChild(b);
    });
    p.appendChild(pre);
    var lab0 = el("div", null, "影调"); lab0.style.cssText = "color:rgba(255,255,255,.5);font-size:10px"; p.appendChild(lab0);
    p.appendChild(segs("tone", TONES));
    p.appendChild(range("曝光", "exposure", 0.5, 2.0, 0.01, function (v) { return v.toFixed(2); }));
    p.appendChild(range("辉光", "bloom", 0, 1.2, 0.01, function (v) { return v.toFixed(2); }));
    p.appendChild(range("光晕", "bloomRadius", 0, 1, 0.01, function (v) { return v.toFixed(2); }));
    p.appendChild(el("hr"));
    var lab = el("div", null, "色调风格"); lab.style.cssText = "color:rgba(255,255,255,.5);font-size:10px"; p.appendChild(lab);
    p.appendChild(segs("grade", GRADES));
    p.appendChild(range("饱和", "sat", 0, 1.6, 0.01, function (v) { return v.toFixed(2); }));
    p.appendChild(range("对比", "con", 0.7, 1.4, 0.01, function (v) { return v.toFixed(2); }));
    p.appendChild(range("颗粒", "grain", 0, 0.08, 0.001, function (v) { return v.toFixed(3); }));
    p.appendChild(range("暗角", "vig", 0, 1, 0.01, function (v) { return v.toFixed(2); }));
    p.appendChild(range("色差", "ab", 0, 0.03, 0.0005, function (v) { return v.toFixed(4); }));
    p.appendChild(range("光斑", "ana", 0, 1, 0.01, function (v) { return v.toFixed(2); }));
    p.appendChild(el("hr"));
    var lab2 = el("div", null, "深空"); lab2.style.cssText = "color:rgba(255,255,255,.5);font-size:10px"; p.appendChild(lab2);
    p.appendChild(range("星云", "nebula", 0, 1.2, 0.01, function (v) { return v.toFixed(2); }));
    p.appendChild(range("公转", "speed", 0, 1.5, 0.01, function (v) { return v.toFixed(2); }));
    p.appendChild(range("彗尾", "trailLen", 0.03, 0.5, 0.01, function (v) { return Math.round(v * 360) + "°"; }));
    p.appendChild(range("连线", "linkAmt", 0, 1, 0.01, function (v) { return v.toFixed(2); }));
    var tgs = el("div", "toggles");
    tgs.appendChild(check("角色名牌", "labels")); tgs.appendChild(check("关系连线", "links"));
    tgs.appendChild(check("彗尾轨迹", "trails")); tgs.appendChild(check("近景星尘", "dust"));
    tgs.appendChild(check("跃迁动画", "warp")); tgs.appendChild(check("静默名牌", "quiet"));
    tgs.appendChild(check("呼吸镜头", "breathe")); tgs.appendChild(check("影院模式", "cinema"));
    p.appendChild(tgs);
    var acts = el("div", "acts");
    var b1 = el("button", null, "📷 导出 PNG"); b1.type = "button"; b1.addEventListener("click", shot);
    var b3 = el("button", "wide", "🎬 录制 30 秒演示片（WebM）"); b3.type = "button"; b3.addEventListener("click", startDemo);
    var b2 = el("button", null, "↺ 恢复默认"); b2.type = "button"; b2.addEventListener("click", function () { var keep = fx.panel; fx = Object.assign({}, FX_DEFAULT, { panel: keep }); applyFx(); saveFx(); toast("画质已恢复默认"); });
    acts.appendChild(b1); acts.appendChild(b2); acts.appendChild(b3);
    p.appendChild(acts);
    p.appendChild(el("div", "foot", "离屏与后台自动暂停渲染 · 帧率不足时自动降采样"));
    var cap = el("div", "nd-caption", "<small></small><span></span>");
    var jump = el("div", "nd-jump", "<small></small><b></b>");
    root.appendChild(tg); root.appendChild(p); root.appendChild(cap); root.appendChild(jump);
    p.addEventListener("pointerdown", function (e) { e.stopPropagation(); });
    p.addEventListener("wheel", function (e) { e.stopPropagation(); });
  }

  function updateCaption() {
    var inst = g3; if (!inst) return;
    var root = rootOf(inst), cap = root && root.querySelector(".nd-caption"); if (!cap) return;
    var small = cap.firstChild, span = cap.lastChild, f = inst.lastFeed || {}, m = inst.meta || {};
    if (inst.dive) { small.textContent = "Character Galaxy"; span.textContent = inst.dive.name + " 的星系"; }
    else if (f.round) { small.textContent = (m.unitName || "") + " · 第 " + f.round + " 轮"; span.textContent = (f.place || "") + (f.driver ? " ｜ " + f.driver + " → " + (f.target || "—") : ""); }
    else { small.textContent = "NEST-DRAMA"; span.textContent = m.unitName || ""; }
    var fpsEl = root.querySelector(".nd-fps");
    if (fpsEl) fpsEl.textContent = (fps ? fps + " fps · " + Math.round((inst.renderDpr || 1) * 100) / 100 + "x" : "") + (fx.quiet && inst.__ndLabelStat ? " · 名牌 " + inst.__ndLabelStat : "");
  }

  /* ---- 深空：从现有场景对象借构造器，无需 import three ---- */
  function ctors(inst) {
    var mesh = null, pts = null;
    inst.scene.traverse(function (o) { if (!mesh && o.isMesh && o.geometry && o.geometry.type === "SphereGeometry") mesh = o; if (!pts && o.isPoints) pts = o; });
    if (!mesh || !pts) return null;
    return {
      Mesh: mesh.constructor, Sphere: mesh.geometry.constructor, Shader: inst.sunMat.constructor,
      Points: pts.constructor, Geo: pts.geometry.constructor, Attr: pts.geometry.attributes.position.constructor
    };
  }
  function buildDeepSpace(inst) {
    if (inst.__ndNebula) return;
    var C = ctors(inst); if (!C) return;
    var neb = new C.Mesh(new C.Sphere(6400, 48, 32), new C.Shader({
      uniforms: { uT: { value: 0 }, uAmt: { value: fx.nebula } }, vertexShader: NEB_VERT, fragmentShader: NEB_FRAG,
      side: 1, depthWrite: false, depthTest: false, fog: false
    }));
    neb.renderOrder = -10; neb.frustumCulled = false;
    inst.scene.add(neb); inst.__ndNebula = neb;
    var N = 1600, pos = new Float32Array(N * 3), seed = new Float32Array(N), r = 20260903;
    var rnd = function () { r = (r * 1103515245 + 12345) & 2147483647; return r / 2147483647; };
    for (var i = 0; i < N; i++) {
      var R = 120 + Math.pow(rnd(), 0.7) * 1100, th = rnd() * Math.PI * 2, ph = Math.acos(2 * rnd() - 1);
      pos[i * 3] = R * Math.sin(ph) * Math.cos(th); pos[i * 3 + 1] = R * Math.cos(ph) * 0.55; pos[i * 3 + 2] = R * Math.sin(ph) * Math.sin(th);
      seed[i] = rnd();
    }
    var g = new C.Geo(); g.setAttribute("position", new C.Attr(pos, 3)); g.setAttribute("aSeed", new C.Attr(seed, 1));
    var dust = new C.Points(g, new C.Shader({ uniforms: { uT: { value: 0 } }, vertexShader: DUST_VERT, fragmentShader: DUST_FRAG, transparent: true, depthWrite: false, blending: 2 }));
    dust.frustumCulled = false; dust.renderOrder = 5;
    inst.scene.add(dust); inst.__ndDust = dust;
  }

  /* ---- 跃迁：径向拖影 + 曝光闪 + FOV 推拉 + 标题卡 ---- */
  var warpT = -1, warpAmt = 1, baseFov = 48;
  var warpDur = +(new URLSearchParams(location.search).get("ndwarp")) || 1.15;   // ?ndwarp=秒 仅供调试目测
  function warp(label, sub, amt) {
    var inst = g3; if (!inst || !fx.warp) return;
    warpT = 0; warpAmt = amt == null ? 1 : amt; baseFov = inst.camera.fov;
    var root = rootOf(inst), j = root && root.querySelector(".nd-jump");
    if (j && label) {
      j.firstChild.textContent = sub || ""; j.lastChild.textContent = label;
      j.classList.remove("show"); void j.offsetWidth; j.classList.add("show");
      j.style.animationDuration = j.firstChild.style.animationDuration = j.lastChild.style.animationDuration = Math.max(1.9, warpDur * 1.6) + "s";
      clearTimeout(j.__t); j.__t = setTimeout(function () { j.classList.remove("show"); }, Math.max(1900, warpDur * 1600));
    }
  }
  function tickFx(dt) {
    var inst = g3; if (!inst) return;
    var t = inst.clock ? inst.clock.elapsedTime : performance.now() / 1000;
    if (inst.__ndNebula) inst.__ndNebula.material.uniforms.uT.value = t;
    if (inst.__ndDust) inst.__ndDust.material.uniforms.uT.value = t;
    /* 悬停缩放平滑 + 静默名牌：无戏份角色的名牌只在悬停/选中时浮现 */
    var k = 1 - Math.pow(0.001, dt), shown = 0, total = 0;
    (inst.planets || []).forEach(function (p) {
      var tgt = (inst._hoverInst === p) ? 1.28 : (inst._selInst === p ? 1.12 : 1);
      var cur = p.mesh.scale.x; p.mesh.scale.setScalar(cur + (tgt - cur) * k);
      if (p.name) {
        var show = fx.labels && (!fx.quiet || !p.c || p.c.present > 0 || p.kind === "round" || inst._hoverInst === p || inst._selInst === p || p.baton);
        p.name.visible = !!show; total++; if (show) shown++;
      }
    });
    inst.__ndLabelStat = shown + "/" + total;
    /* 呼吸镜头：无交互时 FOV 极慢起伏，让画面"活着"而不抢戏 */
    if (fx.breathe && warpT < 0 && !inst.camGoal && inst.controls && inst.controls.autoRotate) {
      inst.camera.fov = 48 + Math.sin(t * 0.45) * 1.1; inst.camera.updateProjectionMatrix();
    } else if (fx.breathe && warpT < 0 && Math.abs(inst.camera.fov - 48) > 0.01 && !inst.camGoal) {
      inst.camera.fov += (48 - inst.camera.fov) * k; inst.camera.updateProjectionMatrix();
    }
    var u = inst.filmPass && inst.filmPass.uniforms; if (!u || !u.uWarp) return;
    if (warpT >= 0) {
      warpT += dt;
      var x = Math.min(1, warpT / warpDur);
      var env = Math.pow(Math.sin(x * Math.PI), 1.4) * warpAmt;          // 起落
      u.uWarp.value = env * 0.9;
      u.uFlash.value = Math.max(0, 1 - Math.abs(x - 0.42) / 0.16) * 0.55 * warpAmt;
      inst.camera.fov = baseFov + env * 16; inst.camera.updateProjectionMatrix();
      if (x >= 1) { warpT = -1; u.uWarp.value = 0; u.uFlash.value = 0; inst.camera.fov = baseFov; inst.camera.updateProjectionMatrix(); }
    }
  }
  function hookJumps(inst) {
    if (inst.__ndJumps) return; inst.__ndJumps = true;
    var ed = inst.enterDive, xd = inst.exitDive, su = inst.switchUnit, rs = inst.reset, se = inst.select;
    inst.enterDive = function (n) { warp(n + " 的星系", "Character Galaxy · 跃迁"); return ed.apply(inst, arguments); };
    inst.exitDive = function () { warp("返回星丛", "Star Cluster"); return xd.apply(inst, arguments); };
    inst.switchUnit = function () {
      var r = su.apply(inst, arguments);
      var sys = inst.systems && inst.systems[inst._activeSystemIndex || 0];
      warp(sys && sys.name ? sys.name : "切换单元", "Unit · 跃迁", 0.8); return r;
    };
    inst.reset = function () { warp(null, null, 0.45); return rs.apply(inst, arguments); };
    inst.select = function (n) { warp(null, null, 0.22); return se.apply(inst, arguments); };
  }


  /* ---------------- 演示录制：30 秒宣传片（?nddemo=1 自动开跑，或面板按钮） ----------------
   * 把 WebGL 画面逐帧合成到 1920×1080 的 2D 画布上（宽银幕黑边、字幕、标题卡、片尾），
   * 用 MediaRecorder 录成 WebM 下载。镜头编排：星丛全景 → 推近 → 选中角色 → 跃迁进角色星系 → 返回 → 片尾。 */
  var DEMO = { W: 1920, H: 1080, dur: 30, bar: 0.075 };
  var DEMO_SCENES = [
    { t: 0,   title: ["NEST-DRAMA", "让角色自己演戏 · 本地运行 · 零依赖"] },
    { t: 4,   cap: ["01 · 投入材料，建一个世界", "世界观 · 人物 · 大纲，纯文本即可"] },
    { t: 9,   cap: ["02 · 每个角色都是独立模拟体", "只知道他该知道的，怕他该怕的，说他自己的话"] },
    { t: 14,  cap: ["03 · 跃迁，进入角色的星系", "每一颗星，是他亲自走过的一轮"] },
    { t: 20,  cap: ["04 · 一轮成稿", "零 token 机检 + 监修官，把 AI 腔挡在门外"] },
    { t: 26,  end: ["github.com/63435212cwu-ops/nest-drama", "AGPL-3.0 · Python 3.9+ · 一条命令运行"] }
  ];
  var demo = null;   // {t0, cv, ctx, rec, chunks, done:[], saved fx}
  function demoText(ctx, txt, x, y, size, weight, color, spacing, align) {
    ctx.save(); ctx.font = weight + " " + size + "px " + getComputedStyle(document.body).fontFamily;
    ctx.fillStyle = color; ctx.textAlign = align || "center"; ctx.textBaseline = "middle";
    if (spacing && "letterSpacing" in ctx) ctx.letterSpacing = spacing + "px";
    ctx.shadowColor = "rgba(0,0,0,.85)"; ctx.shadowBlur = 18; ctx.fillText(txt, x, y); ctx.restore();
  }
  function demoFrame(inst) {
    var d = demo; if (!d) return;
    var t = (performance.now() - d.t0) / 1000, ctx = d.ctx, W = DEMO.W, H = DEMO.H, src = inst.renderer.domElement;
    // 底：WebGL 画面 cover 填满
    var sw = src.width, sh = src.height, s = Math.max(W / sw, H / sh), dw = sw * s, dh = sh * s;
    ctx.fillStyle = "#000"; ctx.fillRect(0, 0, W, H);
    ctx.drawImage(src, (W - dw) / 2, (H - dh) / 2, dw, dh);
    // 宽银幕黑边 + 金色发丝
    var bar = H * DEMO.bar; ctx.fillStyle = "#000"; ctx.fillRect(0, 0, W, bar); ctx.fillRect(0, H - bar, W, bar);
    var g = ctx.createLinearGradient(0, 0, W, 0); g.addColorStop(0, "rgba(255,217,160,0)"); g.addColorStop(.5, "rgba(255,217,160,.55)"); g.addColorStop(1, "rgba(255,217,160,0)");
    ctx.fillStyle = g; ctx.fillRect(0, bar, W, 1); ctx.fillRect(0, H - bar - 1, W, 1);
    // 进度发丝
    ctx.fillStyle = "rgba(255,217,160,.8)"; ctx.fillRect(0, H - bar - 3, W * Math.min(1, t / DEMO.dur), 2);
    // 当前场景
    var sc = null; for (var i = 0; i < DEMO_SCENES.length; i++) if (t >= DEMO_SCENES[i].t) sc = DEMO_SCENES[i];
    if (!sc) return;
    var next = DEMO_SCENES[DEMO_SCENES.indexOf(sc) + 1], tEnd = next ? next.t : DEMO.dur, lt = t - sc.t, span = tEnd - sc.t;
    var a = Math.min(1, lt / .8) * Math.min(1, Math.max(0, (tEnd - t) / .6));       // 入 0.8s / 出 0.6s
    if (sc.title) {
      ctx.fillStyle = "rgba(0,0,0," + (0.35 * a) + ")"; ctx.fillRect(0, 0, W, H);
      ctx.globalAlpha = a;
      demoText(ctx, sc.title[0], W / 2, H / 2 - 30, 96, "850", "#fff", 22);
      demoText(ctx, sc.title[1], W / 2, H / 2 + 60, 24, "600", "#ffd9a0", 8);
      var lw = 520 * Math.min(1, lt / 1.2); ctx.fillStyle = "rgba(255,217,160,.8)"; ctx.fillRect(W / 2 - lw / 2, H / 2 + 105, lw, 1);
      ctx.globalAlpha = 1;
    } else if (sc.cap) {
      ctx.globalAlpha = a;
      var y0 = H - bar - 96, rise = (1 - Math.min(1, lt / .8)) * 14;
      ctx.fillStyle = "rgba(255,217,160,.9)"; ctx.fillRect(96, y0 - 22 + rise, 3, 68);
      demoText(ctx, sc.cap[0], 118, y0 + rise, 40, "800", "#fff", 2, "left");
      demoText(ctx, sc.cap[1], 118, y0 + 44 + rise, 20, "500", "rgba(255,255,255,.78)", 1, "left");
      ctx.globalAlpha = 1;
    } else if (sc.end) {
      ctx.fillStyle = "rgba(0,0,0," + (0.55 * Math.min(1, lt / 1.2)) + ")"; ctx.fillRect(0, 0, W, H);
      ctx.globalAlpha = Math.min(1, lt / 1.0);
      demoText(ctx, "NEST-DRAMA", W / 2, H / 2 - 70, 64, "850", "#fff", 18);
      demoText(ctx, sc.end[0], W / 2, H / 2 + 10, 30, "700", "#ffd9a0", 3);
      demoText(ctx, sc.end[1], W / 2, H / 2 + 58, 20, "500", "rgba(255,255,255,.72)", 4);
      ctx.globalAlpha = 1;
    }
    // 编排动作（一次性）
    DEMO_ACTIONS.forEach(function (ac, i) { if (!d.done[i] && t >= ac.t) { d.done[i] = true; try { ac.run(inst); } catch (e) { console.warn("demo action", e); } } });
    if (t >= DEMO.dur + 0.4) stopDemo();
  }
  var DEMO_ACTIONS = [
    { t: 0.2, run: function (inst) { inst.drift = true; inst.reset(); } },
    { t: 4.0, run: function (inst) { var V = inst.camera.position.constructor; inst.flyTo(new V(60, 70, 250), new V(0, 0, 0)); } },
    { t: 9.0, run: function (inst) { var p = demoStar(inst); if (p) inst.select(p); } },
    { t: 14.0, run: function (inst) { var p = demoStar(inst); if (p) inst.enterDive(p.id); } },
    { t: 17.5, run: function (inst) { var V = inst.camera.position.constructor; inst.flyTo(new V(-40, 90, 240), new V(0, 0, 0)); } },
    { t: 25.4, run: function (inst) { inst.exitDive(); } }
  ];
  function demoStar(inst) {
    var cs = (inst.planets || []).filter(function (p) { return p.kind !== "round" && !p.ghost && p.c; });
    cs.sort(function (a, b) { return (b.c.present || 0) + (b.c.drives || 0) * 2 - (a.c.present || 0) - (a.c.drives || 0) * 2; });
    return cs[0] || null;
  }
  function startDemo() {
    var inst = g3; if (!inst || demo) return;
    if (!window.MediaRecorder || !HTMLCanvasElement.prototype.captureStream) { toast("此浏览器不支持录制（需要 Chrome / Edge）"); return; }
    var saved = Object.assign({}, fx);
    fx = Object.assign({}, FX_DEFAULT, PRESET_LUXE, { panel: false, cinema: false, warp: true, speed: 0.26 }); applyFx();
    if (!inst.full) inst.toggleFull();
    var cv = document.createElement("canvas"); cv.width = DEMO.W; cv.height = DEMO.H;
    var ctx = cv.getContext("2d"), stream = cv.captureStream(30);
    var mime = ["video/webm;codecs=vp9", "video/webm;codecs=vp8", "video/webm"].filter(function (m) { return MediaRecorder.isTypeSupported(m); })[0];
    var rec = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: 9000000 }), chunks = [];
    rec.ondataavailable = function (e) { if (e.data && e.data.size) chunks.push(e.data); };
    rec.onstop = function () {
      var b = new Blob(chunks, { type: "video/webm" }), a = document.createElement("a");
      a.href = URL.createObjectURL(b); a.download = "nest-drama-demo-30s.webm"; a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 5000);
      // 同时回传本地服务：自动化浏览器常拦下载，落盘到 ui/exports/ 才拿得到文件
      fetch("/api/demo-save", { method: "POST", headers: { "Content-Type": "application/octet-stream", "X-Demo-Name": "nest-drama-demo-30s.webm" }, body: b })
        .then(function (r) { return r.json(); })
        .then(function (j) { toast("演示已导出 · " + Math.round(b.size / 1048576) + " MB → ui/exports/", 5000); })
        .catch(function () { toast("演示已导出（浏览器下载）· " + Math.round(b.size / 1048576) + " MB", 5000); });
      fx = saved; applyFx();
    };
    demo = { t0: performance.now(), cv: cv, ctx: ctx, rec: rec, chunks: chunks, done: [] };
    rec.start(500);
    toast("开始录制 30 秒演示…请勿操作", 3000);
  }
  function stopDemo() { var d = demo; if (!d) return; demo = null; try { d.rec.stop(); } catch (e) { /* 已停 */ } }

  function hookRender(inst) {
    var comp = inst.composer; if (!comp || comp.__nd) return;
    comp.__nd = true;
    var orig = comp.render.bind(comp);
    var lastT = performance.now();
    comp.render = function (dt) {
      var now0 = performance.now(), step = Math.min(0.05, (now0 - lastT) / 1000); lastT = now0;
      tickFx(step);
      if (!visible && !inst.full) return;         // 离屏：只推进物理，不出图
      orig(dt);
      if (demo) demoFrame(inst);
      frames++;
      var now = performance.now();
      if (now - fpsT >= 1000) { fps = Math.round(frames * 1000 / (now - fpsT)); frames = 0; fpsT = now; }
    };
    var io = new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }, { threshold: 0.02 });
    io.observe(inst.$refs.holder);
    inst.__ndIO = io;
    // applyDim 会重置连线可见性，随后再套用用户开关
    var dim = inst.applyDim;
    inst.applyDim = function () { dim.apply(inst, arguments); if (!fx.links) (inst.links || []).forEach(function (l) { l.line.visible = false; }); };
  }

  var lastRound = null;
  function watchStory() {
    var inst = g3; if (!inst) return;
    var f = inst.lastFeed || {}, m = inst.meta || {};
    if (f.round && lastRound != null && f.round > lastRound) toast("第 " + f.round + " 轮成稿 · " + (f.driver || "") + " → " + (f.target || "—"));
    if (f.round) lastRound = f.round;
    var title = (m.unitName ? "R" + (f.round || "-") + " · " + m.unitName + " — " : "") + "NEST-DRAMA";
    if (document.title !== title) document.title = title;
    updateCaption();
  }

  function attach3D() {
    var inst = window.__ND3D; if (!inst || inst.__ndAttached) return;
    inst.__ndAttached = true; g3 = inst;
    upgradePost(inst); hookRender(inst); buildPanel(inst); buildDeepSpace(inst); hookJumps(inst); applyFx();
    if (/[?&]nddemo=1/.test(location.search) && !inst.__ndDemoAuto) { inst.__ndDemoAuto = true; setTimeout(startDemo, 2500); }
    // 星系重建（切单元/进出角色星系）后重新套用名牌、轨迹、连线开关
    var build = inst.buildSystem;
    inst.buildSystem = function () {
      var r = build.apply(inst, arguments); setTimeout(applyFx, 0);
      if (!inst.__ndOpened && (inst.planets || []).length && inst.meta && inst.meta.unitName) {
        inst.__ndOpened = true; setTimeout(function () { warp(inst.meta.unitName, "Star Cluster · 开场", 0.6); }, 400);
      }
      return r;
    };
    watchStory();
  }
  window.addEventListener("nd:3d-ready", attach3D);
  window.addEventListener("nd:3d-gone", function () { if (g3 && g3.__ndIO) g3.__ndIO.disconnect(); g3 = null; });
  setInterval(function () { if (!g3 && window.__ND3D) attach3D(); watchStory(); }, 2500);

  /* ---------------- 快捷键 ---------------- */
  function clickStep(n) { var b = document.querySelectorAll("header nav .step, header nav button")[n - 1]; if (b) b.click(); }
  function clickText(sel, re) { var bs = document.querySelectorAll(sel); for (var i = 0; i < bs.length; i++) if (re.test(txt(bs[i]))) { bs[i].click(); return true; } return false; }
  document.addEventListener("keydown", function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === "Escape") { var m = document.querySelector(".nd-help-mask"); if (m) { m.remove(); e.stopPropagation(); } return; }
    if (isTyping()) return;
    var k = e.key;
    if (k === "?" ) { toggleHelp(); return; }
    if (k >= "1" && k <= "4") { clickStep(+k); return; }
    if (k === "/") { e.preventDefault(); var i = document.querySelector(".nd-cast-input"); if (i) { i.focus(); i.select(); } else toast("当前页没有卡司列表"); return; }
    if (k === "t" || k === "T") { cycleTheme(); return; }
    if (k === "h" || k === "H") { clickText("header button", /^历史局$/); return; }
    var inst = g3;
    if (k === "f" || k === "F") { if (inst) inst.toggleFull(); return; }
    if (!inst) return;
    if (k === " ") { e.preventDefault(); inst.drift = !inst.drift; toast(inst.drift ? "公转 · 继续" : "公转 · 暂停"); return; }
    if (k === "r" || k === "R") { inst.reset(); return; }
    if (k === "Enter") { if (inst.sel && !inst.dive) inst.enterDive(inst.sel.id); else if (!inst.sel && !inst.dive) toast("先点选一颗星球，再按 Enter 进入其星系"); return; }
    if (k === "Backspace") { if (inst.dive) { e.preventDefault(); inst.exitDive(); } return; }
    if (k === "u" || k === "U") { inst.switchUnit && inst.switchUnit(); return; }
    if (k === "g" || k === "G") { fx.panel = !fx.panel; applyFx(); saveFx(); return; }
    if (k === "s" || k === "S") { shot(); return; }
    if (k === "v" || k === "V") { startDemo(); return; }
    if (k === "c" || k === "C") { fx.cinema = !fx.cinema; applyFx(); saveFx(); toast(fx.cinema ? "影院模式 · 移动鼠标显示按钮，C 退出" : "已退出影院模式"); return; }
  }, true);

  /* ---------------- DOM 注入调度 ---------------- */
  var raf = 0;
  function decorate() { raf = 0; decorateHeader(); decorateCast(); }
  new MutationObserver(function () { if (!raf) raf = requestAnimationFrame(decorate); }).observe(document.documentElement, { childList: true, subtree: true });
  document.addEventListener("DOMContentLoaded", decorate);

  if (!LS.get("hint", false)) {
    setTimeout(function () { toast("提示：按 ? 查看快捷键，C 进入星丛影院模式", 5000); LS.set("hint", true); }, 2200);
  }
})();
