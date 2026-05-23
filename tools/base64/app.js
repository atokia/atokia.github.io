const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const message = document.getElementById('message');

const encodeBtn = document.getElementById('encodeBtn');
const decodeBtn = document.getElementById('decodeBtn');
const swapBtn = document.getElementById('swapBtn');
const clearBtn = document.getElementById('clearBtn');

function utf8ToBase64(text) {
  const bytes = new TextEncoder().encode(text);
  let binary = '';
  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  return btoa(binary);
}

function base64ToUtf8(base64) {
  const binary = atob(base64);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function setMessage(text, isError = false) {
  message.textContent = text;
  message.className = `text-sm ${isError ? 'text-red-500' : 'text-gray-500'}`;
}

encodeBtn.addEventListener('click', () => {
  const raw = inputText.value;
  outputText.value = utf8ToBase64(raw);
  setMessage('编码完成。');
});

decodeBtn.addEventListener('click', () => {
  const raw = inputText.value.trim();
  if (!raw) {
    setMessage('请输入 Base64 内容后再解码。', true);
    return;
  }

  try {
    outputText.value = base64ToUtf8(raw);
    setMessage('解码完成。');
  } catch (_) {
    setMessage('Base64 内容无效，无法解码。', true);
  }
});

swapBtn.addEventListener('click', () => {
  inputText.value = outputText.value;
  setMessage('已将结果回填到输入框。');
});

clearBtn.addEventListener('click', () => {
  inputText.value = '';
  outputText.value = '';
  setMessage('已清空。');
});
