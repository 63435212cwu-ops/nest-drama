/* NEST-DRAMA 通用界面补丁
 * 历史区只负责删除记录；项目文件和 API 配置的生命周期彼此独立。
 * 这个文件故意只处理展示与用户动作，数据仍由 serve.py 的接口负责。
 */
(function () {
  "use strict";

  var nativeFetch = window.fetch.bind(window);

  // API 用量是按模型累计的全局数据。旧版前端要求“最后一次用量的项目名”
  // 必须等于当前项目名，导致新建世界后显示 0，但模型实际仍可调用。
  // 给前端返回当前项目作为展示归属，不改变服务器上的累计账本。
  window.fetch = function (input, init) {
    return nativeFetch(input, init).then(function (response) {
      var url = typeof input === "string" ? input : (input && input.url) || "";
      var path = url.split("?")[0];
      if (path !== "/api/usage" && path !== "/api/llm-config") return response;
      return response.clone().json().then(function (payload) {
        if (path === "/api/usage") {
          var usage = payload.usage || {};
          Object.keys(usage).forEach(function (key) {
            if (usage[key] && usage[key].calls) usage[key].project = payload.project;
          });
        } else if (path === "/api/llm-config" && payload.active &&
                   (!payload.profiles || !payload.profiles.length) && payload.env) {
          // 电脑环境变量也是全局接入，只是没有可编辑的本地档案。
          payload.profiles = [{
            id: "__computer_global__",
            name: "电脑全局 API",
            model: "环境变量模型",
            api_key_masked: "已配置"
          }];
          payload.current = "__computer_global__";
        }
        return new Response(JSON.stringify(payload), {
          status: response.status,
          statusText: response.statusText,
          headers: { "Content-Type": "application/json; charset=utf-8" }
        });
      }).catch(function () { return response; });
    });
  };

  function textOf(node) { return (node && node.textContent || "").trim(); }
  function closest(node, selector) {
    while (node && node !== document) {
      if (node.matches && node.matches(selector)) return node;
      node = node.parentNode;
    }
    return null;
  }

  function postDeleteRecord(title) {
    return nativeFetch("/api/archives", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title })
    }).then(function (r) { return r.json(); });
  }

  function deleteCurrentProject(card) {
    var titleNode = card.querySelector(".grow");
    var title = textOf(titleNode) || "当前项目";
    if (!window.confirm("确定删除当前项目“" + title + "”？\n项目将从当前工作区消失。")) return;
    var button = card.querySelector("[data-delete-current]");
    if (button) { button.disabled = true; button.textContent = "删除中…"; }
    nativeFetch("/api/simulation", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: "{}"
    }).then(function (r) { return r.json(); }).then(function (payload) {
      var data = payload && payload.data || payload;
      if (!payload || payload.success === false || data.deleted === false) {
        throw new Error(payload.error || data.detail || "删除失败");
      }
      window.location.reload();
    }).catch(function (err) {
      window.alert(err.message || "删除当前项目失败");
      if (button) { button.disabled = false; button.textContent = "删除本局项目"; }
    });
  }

  function deleteHistoryRecord(card, button) {
    var title = textOf(card.querySelector(".ellip")) || "这条历史记录";
    if (!window.confirm("确定删除历史记录“" + title + "”？")) return;
    button.disabled = true;
    button.textContent = "删除中…";
    postDeleteRecord(title).then(function (payload) {
      var data = payload && payload.data || payload;
      if (!payload || payload.success === false || !data.deleted) {
        throw new Error(payload.error || data.error || "删除失败");
      }
      // 让 Vue 重新从局史接口读取列表，避免只删 DOM 后下一次响应式刷新又把记录画回来。
      window.location.reload();
    }).catch(function (err) {
      window.alert(err.message || "删除历史记录失败");
      button.disabled = false;
      button.textContent = "删除";
    });
  }

  function decorate() {
    document.querySelectorAll(".drawer").forEach(function (drawer) {
      var isHistory = drawer.querySelector(".arc, .cur");
      if (!isHistory) return;

      // 归档路径、磁盘状态、打开只读页、恢复/清理入口都不属于历史记录功能。
      drawer.querySelectorAll(".enter, .gone, .arc > .mut.ellip, .drawer-head button").forEach(function (el) {
        if (el.classList.contains("x")) return;
        if (el.matches(".drawer-head button") && !/清理失效|恢复已删记录/.test(textOf(el))) return;
        el.style.display = "none";
      });
      drawer.querySelectorAll(".confirm .btn-seal, .confirm > .mut").forEach(function (el) {
        el.style.display = "none";
      });
      drawer.querySelectorAll(".arc").forEach(function (card) {
        if (card.dataset.historyAdjusted) return;
        card.dataset.historyAdjusted = "1";
        card.addEventListener("click", function (event) {
          // 历史区不再打开归档页；删除按钮自身继续工作。
          if (!closest(event.target, ".del")) event.stopPropagation();
        }, true);
        var del = card.querySelector(".del");
        if (del) {
          del.title = "删除历史记录";
          del.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            deleteHistoryRecord(card, del);
          }, true);
        }
      });
      drawer.querySelectorAll(".cur").forEach(function (card) {
        if (card.querySelector("[data-delete-current]")) return;
        var row = card.querySelector(".row");
        if (!row) return;
        var button = document.createElement("button");
        button.className = "btn btn-paper btn-sm current-delete-adjusted";
        button.type = "button";
        button.textContent = "删除本局项目";
        button.dataset.deleteCurrent = "1";
        button.addEventListener("click", function () { deleteCurrentProject(card); });
        row.appendChild(button);
      });
      drawer.querySelectorAll(".drawer-head span").forEach(function (el) {
        if (/一个项目一条/.test(textOf(el))) el.textContent = "历史记录 · 仅可删除";
      });
      drawer.querySelectorAll("[class*=empty]").forEach(function (el) {
        if (/暂无归档/.test(textOf(el))) el.textContent = "暂无历史记录";
      });
    });
  }

  var observer = new MutationObserver(decorate);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  decorate();
})();
