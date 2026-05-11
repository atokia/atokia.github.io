const nowSeconds = document.getElementById('nowSeconds');
const nowMillis = document.getElementById('nowMillis');
const nowLocal = document.getElementById('nowLocal');

const timestampInput = document.getElementById('timestampInput');
const convertTsBtn = document.getElementById('convertTsBtn');
const useNowBtn = document.getElementById('useNowBtn');
const tsResult = document.getElementById('tsResult');

const datetimeInput = document.getElementById('datetimeInput');
const convertDateBtn = document.getElementById('convertDateBtn');
const fillNowBtn = document.getElementById('fillNowBtn');
const dateResult = document.getElementById('dateResult');

function formatDate(date) {
  return {
    local: date.toLocaleString('zh-CN', { hour12: false }),
    utc: date.toISOString().replace('T', ' ').replace('Z', ' UTC')
  };
}

function refreshNow() {
  const now = new Date();
  const ms = now.getTime();
  const sec = Math.floor(ms / 1000);
  nowSeconds.textContent = String(sec);
  nowMillis.textContent = String(ms);
  nowLocal.textContent = formatDate(now).local;
}

function convertTimestamp() {
  const raw = timestampInput.value.trim();
  if (!/^\d+$/.test(raw)) {
    tsResult.textContent = '请输入纯数字时间戳。';
    return;
  }

  let ms;
  if (raw.length === 10) {
    ms = Number(raw) * 1000;
  } else if (raw.length === 13) {
    ms = Number(raw);
  } else {
    tsResult.textContent = '仅支持 10 位（秒）或 13 位（毫秒）时间戳。';
    return;
  }

  const date = new Date(ms);
  if (Number.isNaN(date.getTime())) {
    tsResult.textContent = '时间戳无效。';
    return;
  }

  const { local, utc } = formatDate(date);
  tsResult.textContent = `本地时间: ${local}\nUTC 时间: ${utc}\nISO 8601: ${date.toISOString()}`;
}

function toDatetimeLocalValue(date) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function convertDatetime() {
  const raw = datetimeInput.value;
  if (!raw) {
    dateResult.textContent = '请先选择日期时间。';
    return;
  }

  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) {
    dateResult.textContent = '日期时间无效。';
    return;
  }

  const ms = date.getTime();
  const sec = Math.floor(ms / 1000);
  dateResult.textContent = `秒级时间戳: ${sec}\n毫秒级时间戳: ${ms}\nISO 8601: ${date.toISOString()}`;
}

convertTsBtn.addEventListener('click', convertTimestamp);
convertDateBtn.addEventListener('click', convertDatetime);

useNowBtn.addEventListener('click', () => {
  timestampInput.value = String(Math.floor(Date.now() / 1000));
  convertTimestamp();
});

fillNowBtn.addEventListener('click', () => {
  const now = new Date();
  datetimeInput.value = toDatetimeLocalValue(now);
  convertDatetime();
});

refreshNow();
setInterval(refreshNow, 1000);
