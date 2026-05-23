const colorInput = document.getElementById('colorInput');
const colorPicker = document.getElementById('colorPicker');
const convertBtn = document.getElementById('convertBtn');
const resetBtn = document.getElementById('resetBtn');

const preview = document.getElementById('preview');
const hexResult = document.getElementById('hexResult');
const rgbResult = document.getElementById('rgbResult');
const hslResult = document.getElementById('hslResult');
const errorText = document.getElementById('errorText');

function rgbToHsl(r, g, b) {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;

  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const d = max - min;
  let h = 0;
  const l = (max + min) / 2;
  let s = 0;

  if (d !== 0) {
    s = d / (1 - Math.abs(2 * l - 1));

    switch (max) {
      case rn:
        h = 60 * (((gn - bn) / d) % 6);
        break;
      case gn:
        h = 60 * ((bn - rn) / d + 2);
        break;
      default:
        h = 60 * ((rn - gn) / d + 4);
    }
  }

  if (h < 0) h += 360;

  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

function parseColor(input) {
  const probe = document.createElement('div');
  probe.style.color = '';
  probe.style.color = input;

  if (!probe.style.color) {
    return null;
  }

  document.body.appendChild(probe);
  const computed = getComputedStyle(probe).color;
  document.body.removeChild(probe);

  const match = computed.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  if (!match) return null;

  return {
    r: Number(match[1]),
    g: Number(match[2]),
    b: Number(match[3])
  };
}

function toHex(r, g, b) {
  const toPart = (n) => n.toString(16).padStart(2, '0');
  return `#${toPart(r)}${toPart(g)}${toPart(b)}`.toUpperCase();
}

function renderColor(r, g, b) {
  const hex = toHex(r, g, b);
  const hsl = rgbToHsl(r, g, b);

  preview.style.backgroundColor = hex;
  hexResult.textContent = hex;
  rgbResult.textContent = `rgb(${r}, ${g}, ${b})`;
  hslResult.textContent = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
  colorPicker.value = hex;
  colorInput.value = hex;
  errorText.textContent = '';
}

function convert() {
  const raw = colorInput.value.trim();
  if (!raw) {
    errorText.textContent = '请输入颜色值。';
    return;
  }

  const parsed = parseColor(raw);
  if (!parsed) {
    errorText.textContent = '无法识别该颜色，请使用 HEX / RGB / HSL。';
    return;
  }

  renderColor(parsed.r, parsed.g, parsed.b);
}

convertBtn.addEventListener('click', convert);
colorPicker.addEventListener('input', () => {
  colorInput.value = colorPicker.value;
  convert();
});

resetBtn.addEventListener('click', () => {
  colorInput.value = '#3b82f6';
  convert();
});

colorInput.value = '#3b82f6';
convert();
