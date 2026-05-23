const patternEl = document.getElementById('pattern');
const flagsEl = document.getElementById('flags');
const textEl = document.getElementById('testText');
const countEl = document.getElementById('count');
const matchedEl = document.getElementById('matched');
const resultEl = document.getElementById('result');
const messageEl = document.getElementById('message');

function run() {
  const pattern = patternEl.value;
  const flags = flagsEl.value;
  const text = textEl.value;

  if (!pattern) {
    messageEl.textContent = '请先输入正则表达式。';
    messageEl.className = 'text-sm text-red-500';
    return;
  }

  try {
    const testReg = new RegExp(pattern, flags);
    const globalFlags = flags.includes('g') ? flags : `${flags}g`;
    const collectReg = new RegExp(pattern, globalFlags);
    const matches = [...text.matchAll(collectReg)];
    countEl.textContent = String(matches.length);
    matchedEl.textContent = testReg.test(text) ? '是' : '否';
    resultEl.textContent = JSON.stringify(matches.map((m) => ({ match: m[0], index: m.index, groups: m.groups || null })), null, 2);
    messageEl.textContent = '匹配完成。';
    messageEl.className = 'text-sm text-gray-500';
  } catch (err) {
    messageEl.textContent = `正则错误: ${err.message}`;
    messageEl.className = 'text-sm text-red-500';
  }
}

document.getElementById('runBtn').addEventListener('click', run);
