/* =========================================================================
   Senior Angular Interview Prep — app.js
   All interactive behaviour. Vanilla JS, no dependencies (except highlight.js
   loaded separately for code coloring). Works by opening files directly.
   ========================================================================= */

/* -------------------------------------------------------------------------
   1. Toggle Q&A answer visibility
   ------------------------------------------------------------------------- */
function toggleAnswer(btn) {
  var answer = btn.nextElementSibling;
  if (!answer) return;
  var open = answer.classList.toggle('open');
  btn.textContent = open ? 'Скрыть ответ' : 'Показать ответ';
}

/* -------------------------------------------------------------------------
   2. Quiz answer check with feedback
   el          — the clicked .quiz-option button
   isCorrect   — boolean
   explanation — optional string shown after answering
   ------------------------------------------------------------------------- */
function checkAnswer(el, isCorrect, explanation) {
  var quiz = el.closest('.quiz');
  if (!quiz || quiz.dataset.answered === 'true') return;
  quiz.dataset.answered = 'true';

  var options = quiz.querySelectorAll('.quiz-option');
  options.forEach(function (opt) {
    opt.disabled = true;
    if (opt.dataset.correct === 'true') opt.classList.add('correct');
  });

  if (!isCorrect) el.classList.add('wrong');

  var explainBox = quiz.querySelector('.quiz-explain');
  if (explainBox) {
    if (explanation) explainBox.textContent = explanation;
    explainBox.classList.add('show');
  }
}

/* -------------------------------------------------------------------------
   3. Copy code block to clipboard
   ------------------------------------------------------------------------- */
function copyCode(btn) {
  var block = btn.closest('.code-block');
  if (!block) return;
  var codeEl = block.querySelector('code');
  if (!codeEl) return;
  var text = codeEl.innerText;

  var done = function () {
    var original = btn.textContent;
    btn.textContent = '✓ Скопировано!';
    btn.classList.add('copied');
    setTimeout(function () {
      btn.textContent = original;
      btn.classList.remove('copied');
    }, 1500);
  };

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(done).catch(function () { fallbackCopy(text, done); });
  } else {
    fallbackCopy(text, done);
  }
}

function fallbackCopy(text, done) {
  var ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand('copy'); done(); } catch (e) { /* noop */ }
  document.body.removeChild(ta);
}

/* -------------------------------------------------------------------------
   4. Code-block language labels (site is dark-only — no theme toggle)
   Adds a small uppercase language label to the top-left of each code block.
   ------------------------------------------------------------------------- */
var LANG_LABELS = {
  typescript: 'TypeScript', javascript: 'JavaScript', ts: 'TypeScript',
  js: 'JavaScript', html: 'HTML', json: 'JSON', css: 'CSS',
  bash: 'Bash', shell: 'Shell', text: 'TEXT'
};

function decorateCodeBlocks() {
  var blocks = document.querySelectorAll('.code-block');
  blocks.forEach(function (block) {
    if (block.querySelector('.code-lang')) return;
    var code = block.querySelector('code');
    if (!code) return;
    var m = (code.className || '').match(/language-([\w-]+)/);
    var lang = m ? m[1] : '';
    if (!lang) return;
    var span = document.createElement('span');
    span.className = 'code-lang';
    span.textContent = LANG_LABELS[lang] || lang.toUpperCase();
    block.appendChild(span);
  });
}

/* -------------------------------------------------------------------------
   5. Mark page as done (persist in localStorage key "done_[pageId]")
   ------------------------------------------------------------------------- */
function markDone(pageId) {
  var key = 'done_' + pageId;
  var isDone = false;
  try { isDone = localStorage.getItem(key) === 'true'; } catch (e) { /* noop */ }
  var next = !isDone;
  try {
    if (next) localStorage.setItem(key, 'true');
    else localStorage.removeItem(key);
  } catch (e) { /* noop */ }
  reflectDoneButton(pageId, next);
  updateSidebarProgress();
}

function reflectDoneButton(pageId, isDone) {
  var btn = document.querySelector('.btn-done[data-page="' + pageId + '"]') ||
            document.querySelector('.btn-done');
  if (!btn) return;
  btn.classList.toggle('done', isDone);
  btn.textContent = isDone ? '✓ Пройдено — нажмите, чтобы отменить' : '✓ Отметить как пройдено';
}

/* All page ids, in sidebar order — single source of truth for progress. */
var ALL_PAGES = [
  'js-core', 'typescript', 'angular-core', 'signals', 'di', 'forms', 'routing',
  'rxjs', 'ngrx', 'websocket', 'canvas', 'workers', 'http',
  'architecture', 'solid-dry', 'live-coding', 'communication', 'cheatsheet'
];

function countDone() {
  var n = 0;
  ALL_PAGES.forEach(function (id) {
    try { if (localStorage.getItem('done_' + id) === 'true') n++; } catch (e) { /* noop */ }
  });
  return n;
}

function updateSidebarProgress() {
  var el = document.getElementById('progress-count');
  if (el) el.textContent = String(countDone());
}

/* -------------------------------------------------------------------------
   6. Keyboard shortcut Ctrl+K / Cmd+K → focus search input
   ------------------------------------------------------------------------- */
document.addEventListener('keydown', function (e) {
  if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
    var input = document.getElementById('search');
    if (input) { e.preventDefault(); input.focus(); input.select(); }
  }
});

/* -------------------------------------------------------------------------
   7. Filter page content by search keyword (highlight matching text)
      Hides top-level content sections that contain no match; highlights hits.
   ------------------------------------------------------------------------- */
var _searchTimer = null;
function filterContent(query) {
  if (_searchTimer) clearTimeout(_searchTimer);
  _searchTimer = setTimeout(function () { runFilter(query); }, 150);
}

function runFilter(query) {
  var main = document.querySelector('.main-content');
  if (!main) return;
  var sections = main.querySelectorAll('[data-searchable]');
  var q = (query || '').trim().toLowerCase();

  // Remove previous highlights
  clearHighlights(main);

  if (!q) {
    sections.forEach(function (s) { s.style.display = ''; });
    return;
  }

  sections.forEach(function (section) {
    var text = section.textContent.toLowerCase();
    if (text.indexOf(q) !== -1) {
      section.style.display = '';
      highlightInNode(section, q);
    } else {
      section.style.display = 'none';
    }
  });
}

function highlightInNode(root, query) {
  var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: function (node) {
      if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      var p = node.parentNode;
      if (p && (p.tagName === 'SCRIPT' || p.tagName === 'STYLE' || p.classList.contains('copy-btn')))
        return NodeFilter.FILTER_REJECT;
      return node.nodeValue.toLowerCase().indexOf(query) !== -1
        ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
  });
  var nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  nodes.forEach(function (node) {
    var value = node.nodeValue;
    var lower = value.toLowerCase();
    var frag = document.createDocumentFragment();
    var idx = 0, found;
    while ((found = lower.indexOf(query, idx)) !== -1) {
      if (found > idx) frag.appendChild(document.createTextNode(value.slice(idx, found)));
      var mark = document.createElement('mark');
      mark.className = 'search-hit';
      mark.textContent = value.slice(found, found + query.length);
      frag.appendChild(mark);
      idx = found + query.length;
    }
    if (idx < value.length) frag.appendChild(document.createTextNode(value.slice(idx)));
    node.parentNode.replaceChild(frag, node);
  });
}

function clearHighlights(root) {
  var marks = root.querySelectorAll('mark.search-hit');
  marks.forEach(function (m) {
    var parent = m.parentNode;
    parent.replaceChild(document.createTextNode(m.textContent), m);
    parent.normalize();
  });
}

/* -------------------------------------------------------------------------
   8. Smooth scroll to anchor (in-page links)
   ------------------------------------------------------------------------- */
document.addEventListener('click', function (e) {
  var a = e.target.closest && e.target.closest('a[href^="#"]');
  if (!a) return;
  var id = a.getAttribute('href').slice(1);
  if (!id) return;
  var target = document.getElementById(id);
  if (target) {
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

/* -------------------------------------------------------------------------
   9. Highlight active sidebar link based on current URL
   ------------------------------------------------------------------------- */
function highlightActiveLink() {
  var path = window.location.pathname.split('/').pop() || 'index.html';
  var links = document.querySelectorAll('.sidebar nav a');
  links.forEach(function (a) {
    var href = (a.getAttribute('href') || '').split('/').pop();
    if (href === path) a.classList.add('active');
  });
}

/* -------------------------------------------------------------------------
   10. Collapsible hint sections (live-coding page)
   ------------------------------------------------------------------------- */
function toggleHint(btn) {
  var body = btn.nextElementSibling;
  if (!body) return;
  var open = body.classList.toggle('open');
  btn.textContent = (open ? '▼ ' : '▶ ') + (btn.dataset.label || 'Подсказка');
}

/* -------------------------------------------------------------------------
   11. Update progress counter on index page from localStorage
   ------------------------------------------------------------------------- */
function updateDashboardProgress() {
  var done = countDone();
  var total = ALL_PAGES.length;

  var countEl = document.getElementById('dash-done');
  if (countEl) countEl.textContent = String(done);
  var totalEl = document.getElementById('dash-total');
  if (totalEl) totalEl.textContent = String(total);

  var fill = document.getElementById('progress-fill');
  if (fill) fill.style.width = (total ? Math.round((done / total) * 100) : 0) + '%';

  var pctEl = document.getElementById('dash-pct');
  if (pctEl) pctEl.textContent = (total ? Math.round((done / total) * 100) : 0) + '%';

  // Mark individual topic cards as done
  ALL_PAGES.forEach(function (id) {
    var card = document.querySelector('.topic-card[data-page="' + id + '"]');
    if (!card) return;
    var isDone = false;
    try { isDone = localStorage.getItem('done_' + id) === 'true'; } catch (e) { /* noop */ }
    card.classList.toggle('is-done', isDone);
  });
}

/* -------------------------------------------------------------------------
   Mobile sidebar toggle + back-to-top visibility
   ------------------------------------------------------------------------- */
function toggleSidebar() {
  var sidebar = document.getElementById('sidebar');
  if (!sidebar) return;
  var open = sidebar.classList.toggle('open');
  var overlay = document.getElementById('sidebar-overlay');
  if (overlay) overlay.classList.toggle('show', open);
}

function closeSidebar() {
  var sidebar = document.getElementById('sidebar');
  if (sidebar) sidebar.classList.remove('open');
  var overlay = document.getElementById('sidebar-overlay');
  if (overlay) overlay.classList.remove('show');
}

window.addEventListener('scroll', function () {
  var btn = document.querySelector('.back-to-top');
  if (btn) btn.classList.toggle('show', window.scrollY > 400);
});

/* -------------------------------------------------------------------------
   Init on load
   ------------------------------------------------------------------------- */
(function init() {
  document.addEventListener('DOMContentLoaded', function () {
    highlightActiveLink();
    updateSidebarProgress();
    updateDashboardProgress();
    decorateCodeBlocks();

    // Reflect done state of the current page button
    var btn = document.querySelector('.btn-done[data-page]');
    if (btn) {
      var pageId = btn.dataset.page;
      var isDone = false;
      try { isDone = localStorage.getItem('done_' + pageId) === 'true'; } catch (e) { /* noop */ }
      reflectDoneButton(pageId, isDone);
    }
  });
})();
