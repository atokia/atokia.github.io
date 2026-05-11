document.addEventListener('DOMContentLoaded', function() {
    const inputJson = document.getElementById('inputJson');
    const outputJson = document.getElementById('outputJson');
    const copyBtn = document.getElementById('copyBtn');
    const pasteBtn = document.getElementById('pasteBtn');
    const formatBtn = document.getElementById('formatBtn');
    const minifyBtn = document.getElementById('minifyBtn');
    const validateBtn = document.getElementById('validateBtn');
    const clearBtn = document.getElementById('clearBtn');
    const inputSize = document.getElementById('inputSize');
    const outputSize = document.getElementById('outputSize');
    const formatStatus = document.getElementById('formatStatus');
    const infoPanel = document.getElementById('infoPanel');
    const infoContent = document.getElementById('infoContent');

    // 更新输入大小显示
    inputJson.addEventListener('input', function() {
        const bytes = new TextEncoder().encode(this.value).length;
        inputSize.textContent = formatBytes(bytes);
        if (this.value.trim()) {
            copyBtn.disabled = false;
        }
    });

    // 粘贴功能
    pasteBtn.addEventListener('click', async function() {
        try {
            const text = await navigator.clipboard.readText();
            inputJson.value = text;
            inputJson.dispatchEvent(new Event('input'));
            showInfo('✓ 已粘贴内容', 'success');
        } catch (err) {
            showInfo('✗ 无法访问剪贴板，请手动粘贴', 'error');
        }
    });

    // 格式化功能
    formatBtn.addEventListener('click', function() {
        try {
            const json = JSON.parse(inputJson.value);
            const formatted = JSON.stringify(json, null, 2);
            outputJson.textContent = formatted;
            const bytes = new TextEncoder().encode(formatted).length;
            outputSize.textContent = formatBytes(bytes);
            formatStatus.textContent = '✓ 格式化成功';
            formatStatus.className = 'text-sm font-semibold text-green-600';
            copyBtn.disabled = false;
            showInfo('✓ JSON 格式化成功！压缩率: ' + calculateCompression(inputJson.value, formatted), 'success');
        } catch (err) {
            showError('格式化失败', err.message);
        }
    });

    // 压缩功能
    minifyBtn.addEventListener('click', function() {
        try {
            const json = JSON.parse(inputJson.value);
            const minified = JSON.stringify(json);
            outputJson.textContent = minified;
            const bytes = new TextEncoder().encode(minified).length;
            outputSize.textContent = formatBytes(bytes);
            formatStatus.textContent = '✓ 压缩成功';
            formatStatus.className = 'text-sm font-semibold text-green-600';
            copyBtn.disabled = false;
            const inputBytes = new TextEncoder().encode(inputJson.value).length;
            const minBytes = new TextEncoder().encode(minified).length;
            const ratio = (((inputBytes - minBytes) / inputBytes) * 100).toFixed(2);
            showInfo(`✓ JSON 压缩成功！减少大小: ${ratio}% (${inputBytes} → ${minBytes} 字节)`, 'success');
        } catch (err) {
            showError('压缩失败', err.message);
        }
    });

    // 验证功能
    validateBtn.addEventListener('click', function() {
        try {
            JSON.parse(inputJson.value);
            formatStatus.textContent = '✓ JSON 有效';
            formatStatus.className = 'text-sm font-semibold text-green-600';
            showInfo('✓ JSON 格式完全有效！', 'success');
        } catch (err) {
            showError('JSON 验证失败', err.message);
        }
    });

    // 清空功能
    clearBtn.addEventListener('click', function() {
        inputJson.value = '';
        outputJson.textContent = '输出结果将显示在这里';
        inputSize.textContent = '0 字节';
        outputSize.textContent = '0 字节';
        formatStatus.textContent = '';
        copyBtn.disabled = true;
        infoPanel.classList.add('hidden');
    });

    // 复制功能
    copyBtn.addEventListener('click', function() {
        const text = outputJson.textContent;
        if (text === '输出结果将显示在这里') {
            showInfo('✗ 没有内容可复制', 'error');
            return;
        }
        navigator.clipboard.writeText(text).then(() => {
            showInfo('✓ 已复制到剪贴板！', 'success');
        }).catch(err => {
            showInfo('✗ 复制失败', 'error');
        });
    });

    // 工具函数
    function formatBytes(bytes) {
        if (bytes === 0) return '0 字节';
        const k = 1024;
        const sizes = ['字节', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    }

    function calculateCompression(original, formatted) {
        const originalBytes = new TextEncoder().encode(original).length;
        const formattedBytes = new TextEncoder().encode(formatted).length;
        const ratio = ((formattedBytes / originalBytes) * 100).toFixed(2);
        return ratio + '% (增加了 ' + (formattedBytes - originalBytes) + ' 字节)';
    }

    function showInfo(message, type) {
        infoPanel.classList.remove('hidden');
        const bgColor = type === 'success' ? 'bg-green-50 border-l-4 border-green-500' : 'bg-red-50 border-l-4 border-red-500';
        const textColor = type === 'success' ? 'text-green-800' : 'text-red-800';
        infoContent.innerHTML = `<p class="${bgColor} ${textColor} p-4 rounded">${message}</p>`;
    }

    function showError(title, message) {
        formatStatus.textContent = '✗ ' + title;
        formatStatus.className = 'text-sm font-semibold text-red-600';
        const errorMsg = message.replace(/^Unexpected token.*position (\d+)/, '位置 $1 出现语法错误').replace(/^JSON.parse/, '');
        showInfo(`✗ ${title}: ${errorMsg}`, 'error');
    }
});
