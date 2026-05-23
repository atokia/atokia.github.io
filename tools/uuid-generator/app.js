const countInput = document.getElementById('countInput');
const uppercaseInput = document.getElementById('uppercaseInput');
const noHyphenInput = document.getElementById('noHyphenInput');
const result = document.getElementById('result');
const message = document.getElementById('message');

function setMessage(text, isError = false) {
  message.textContent = text;
  message.className = `text-sm ${isError ? 'text-red-500' : 'text-gray-500'}`;
}

function generateUuidV4() {
  if (window.crypto && window.crypto.randomUUID) {
    return window.crypto.randomUUID();
  }

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.floor(Math.random() * 16);
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function formatUuid(uuid) {
  let output = uuid;
  if (noHyphenInput.checked) {
    output = output.replace(/-/g, '');
  }
  if (uppercaseInput.checked) {
    output = output.toUpperCase();
  }
  return output;
}

document.getElementById('generateBtn').addEventListener('click', () => {
  const count = Number(countInput.value);
  if (!Number.isInteger(count) || count < 1 || count > 500) {
    setMessage('请输入 1 到 500 之间的整数数量。', true);
    return;
  }

  const items = [];
  for (let i = 0; i < count; i += 1) {
    items.push(formatUuid(generateUuidV4()));
  }

  result.value = items.join('\n');
  setMessage(`已生成 ${count} 个 UUID。`);
});

document.getElementById('copyBtn').addEventListener('click', async () => {
  if (!result.value.trim()) {
    setMessage('请先生成 UUID 再复制。', true);
    return;
  }

  try {
    await navigator.clipboard.writeText(result.value);
    setMessage('复制成功。');
  } catch (_) {
    setMessage('复制失败，请手动复制。', true);
  }
});

document.getElementById('clearBtn').addEventListener('click', () => {
  result.value = '';
  setMessage('已清空。');
});
