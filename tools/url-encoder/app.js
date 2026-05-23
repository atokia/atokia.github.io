const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const message = document.getElementById('message');

function setMessage(text, isError = false) {
  message.textContent = text;
  message.className = `text-sm ${isError ? 'text-red-500' : 'text-gray-500'}`;
}

document.getElementById('encodeBtn').addEventListener('click', () => {
  outputText.value = encodeURI(inputText.value);
  setMessage('URL 编码完成。');
});

document.getElementById('decodeBtn').addEventListener('click', () => {
  try {
    outputText.value = decodeURI(inputText.value);
    setMessage('URL 解码完成。');
  } catch (_) {
    setMessage('输入不是有效的 URL 编码字符串。', true);
  }
});

document.getElementById('componentEncodeBtn').addEventListener('click', () => {
  outputText.value = encodeURIComponent(inputText.value);
  setMessage('URL 组件编码完成。');
});

document.getElementById('componentDecodeBtn').addEventListener('click', () => {
  try {
    outputText.value = decodeURIComponent(inputText.value);
    setMessage('URL 组件解码完成。');
  } catch (_) {
    setMessage('输入不是有效的 URL 组件编码字符串。', true);
  }
});

document.getElementById('clearBtn').addEventListener('click', () => {
  inputText.value = '';
  outputText.value = '';
  setMessage('已清空。');
});
