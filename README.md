# Atokia Toolbox 🛠️

> 免费、快速、隐私友好的在线开发者工具集合

## 🌟 特性

- **隐私优先**: 所有数据处理均在本地完成，不会上传任何信息到服务器
- **快速响应**: 无需网络请求，工具在浏览器本地即时运行
- **永久免费**: 开源项目，完全免费使用，无广告、无限制
- **响应式设计**: 在桌面、平板和手机上都能完美运行

## 🔧 工具状态

### 已实现

- **[JSON 格式化](tools/json-formatter/)** - 格式化、压缩、验证和美化 JSON 数据
- **[时间戳转换](tools/timestamp-converter/)** - Unix 时间戳与日期时间双向转换（秒/毫秒）
- **[颜色转换](tools/color-converter/)** - HEX、RGB、HSL 颜色格式互转与预览
- **[Base64 编解码](tools/base64/)** - 文本与 Base64 双向转换（UTF-8）

### 规划中

- URL 编解码
- 正则表达式测试

## 🚀 快速开始

### 本地开发

```bash
# 克隆仓库
git clone https://github.com/atokia/atokia.github.io.git
cd atokia.github.io

# 使用任何 HTTP 服务器打开 index.html
# 例如，使用 Python 3：
python -m http.server 8000

# 然后访问 http://localhost:8000
```

### GitHub Pages

项目已配置为 GitHub Pages，访问 [atokia.github.io](https://atokia.github.io) 即可在线使用。

## 📁 项目结构

```
atokia.github.io/
├── index.html                   # 主页（工具导航）
├── README.md                    # 项目说明文档
└── tools/
    └── json-formatter/          # JSON 格式化工具
        ├── index.html
        └── app.js
```

## 🛠️ 技术栈

- **HTML 5** - 页面结构
- **Tailwind CSS** - 样式框架（CDN）
- **Vanilla JavaScript** - 交互逻辑（无依赖）
- **GitHub Pages** - 部署平台

## 📦 如何添加新工具

1. 在 `tools/` 目录下创建新文件夹，例如 `tools/new-tool/`
2. 创建 `index.html` 和 `app.js`
3. 在主页 `index.html` 中添加工具卡片链接
4. 推送到 GitHub，GitHub Pages 会自动部署

## 📄 许可证

本项目采用 [MIT License](LICENSE) 开源许可证。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

**Made with ❤️ by [Atokia](https://github.com/atokia)**
