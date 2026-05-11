const inputJson = document.getElementById('inputJson');
const outputJson = document.getElementById('outputJson');
const inputSize = document.getElementById('inputSize');
const outputSize = document.getElementById('outputSize');
const formatStatus = document.getElementById('formatStatus');
const infoPanel = document.getElementById('infoPanel');
const infoContent = document.getElementById('infoContent');

const pasteBtn = document.getElementById('pasteBtn');
const copyBtn = document.getElementById('copyBtn');
const formatBtn = document.getElementById('formatBtn');
const minifyBtn = document.getElementById('minifyBtn');
const validateBtn = document.getElementById('validateBtn');
const clearBtn = document.getElementById('clearBtn');
const inputPanel = document.getElementById('inputPanel');
const outputPanel = document.getElementById('outputPanel');
const inputFullscreenBtn = document.getElementById('inputFullscreenBtn');
const outputFullscreenBtn = document.getElementById('outputFullscreenBtn');

function bytesLabel(str) {
  return `${new Blob([str]).size} 字节`;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function syntaxHighlight(jsonString) {
  const escaped = escapeHtml(jsonString);
  return escaped.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"\s*:?)|(\btrue\b|\bfalse\b)|(\bnull\b)|(-?\d+(?:\.\d+)?(?:[eE][+\-]?\d+)?)|([{}\[\],])/g,
    (match) => {
      if (/^".*":$/.test(match)) return `<span class="json-key">${match}</span>`;
      if (/^".*"$/.test(match)) return `<span class="json-string">${match}</span>`;
      if (/true|false/.test(match)) return `<span class="json-boolean">${match}</span>`;
      if (/null/.test(match)) return `<span class="json-null">${match}</span>`;
      if (/^-?\d/.test(match)) return `<span class="json-number">${match}</span>`;
      return `<span class="json-bracket">${match}</span>`;
    }
  );
}

function setInfo(type, message) {
  infoPanel.classList.remove('hidden');
  const color = type === 'error' ? 'text-red-600' : type === 'success' ? 'text-green-600' : 'text-blue-600';
  infoContent.innerHTML = `<p class="font-medium ${color}">${message}</p>`;
}

function renderOutput(text, ok = true) {
  outputJson.innerHTML = ok ? syntaxHighlight(text) : escapeHtml(text);
  outputSize.textContent = bytesLabel(text);
  copyBtn.disabled = !ok || !text;
}

function parseInput() {
  const raw = inputJson.value.trim();
  if (!raw) throw new Error('请输入 JSON 内容');
  return JSON.parse(raw);
}

function doFormat() {
  try {
    const data = parseInput();
    const formatted = JSON.stringify(data, null, 2);
    renderOutput(formatted, true);
    formatStatus.textContent = '格式化成功';
    setInfo('success', 'JSON 格式正确，已完成格式化。');
  } catch (err) {
    renderOutput(String(err.message || err), false);
    formatStatus.textContent = '格式化失败';
    setInfo('error', `JSON 无效：${err.message || err}`);
  }
}

function doMinify() {
  try {
    const data = parseInput();
    const minified = JSON.stringify(data);
    renderOutput(minified, true);
    formatStatus.textContent = '压缩成功';
    setInfo('success', 'JSON 格式正确，已压缩。');
  } catch (err) {
    renderOutput(String(err.message || err), false);
    formatStatus.textContent = '压缩失败';
    setInfo('error', `JSON 无效：${err.message || err}`);
  }
}



let currentFullscreenPanel = null;

function toggleFullscreen(panel, button) {
  const willEnter = currentFullscreenPanel !== panel;

  if (currentFullscreenPanel) {
    currentFullscreenPanel.classList.remove('fullscreen-panel');
  }

  inputFullscreenBtn.textContent = '全屏';
  outputFullscreenBtn.textContent = '全屏';

  if (willEnter) {
    panel.classList.add('fullscreen-panel');
    button.textContent = '退出全屏';
    currentFullscreenPanel = panel;
    document.body.classList.add('overflow-hidden');
  } else {
    currentFullscreenPanel = null;
    document.body.classList.remove('overflow-hidden');
  }

  if (!currentFullscreenPanel) {
    document.body.classList.remove('overflow-hidden');
  }
}

function doValidate() {
  try {
    parseInput();
    setInfo('success', '✅ JSON 校验通过');
    formatStatus.textContent = '校验通过';
  } catch (err) {
    setInfo('error', `❌ JSON 校验失败：${err.message || err}`);
    formatStatus.textContent = '校验失败';
  }
}

inputJson.addEventListener('input', () => {
  inputSize.textContent = bytesLabel(inputJson.value);
});

pasteBtn.addEventListener('click', async () => {
  try {
    const text = await navigator.clipboard.readText();
    inputJson.value = text;
    inputSize.textContent = bytesLabel(text);
    setInfo('success', '已从剪贴板粘贴内容。');
  } catch {
    setInfo('error', '无法访问剪贴板，请手动粘贴。');
  }
});

copyBtn.addEventListener('click', async () => {
  try {
    const text = outputJson.textContent || '';
    await navigator.clipboard.writeText(text);
    setInfo('success', '输出内容已复制到剪贴板。');
  } catch {
    setInfo('error', '复制失败，请手动复制。');
  }
});

formatBtn.addEventListener('click', doFormat);
minifyBtn.addEventListener('click', doMinify);
validateBtn.addEventListener('click', doValidate);

clearBtn.addEventListener('click', () => {
  inputJson.value = '';
  outputJson.textContent = '输出结果将显示在这里';
  inputSize.textContent = '0 字节';
  outputSize.textContent = '0 字节';
  formatStatus.textContent = '';
  copyBtn.disabled = true;
  infoPanel.classList.add('hidden');
});

inputSize.textContent = bytesLabel(inputJson.value);

inputFullscreenBtn.addEventListener('click', () => toggleFullscreen(inputPanel, inputFullscreenBtn));
outputFullscreenBtn.addEventListener('click', () => toggleFullscreen(outputPanel, outputFullscreenBtn));
