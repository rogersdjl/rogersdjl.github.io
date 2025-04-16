# 如何创建GitHub Pages静态网站

GitHub Pages是一个免费的静态网站托管服务，非常适合托管个人博客、项目文档或简单的网站。本文将介绍如何使用GitHub Pages创建和部署一个静态网站。

## 什么是GitHub Pages？

GitHub Pages是GitHub提供的一项静态网站托管服务，可以直接从GitHub仓库中发布HTML、CSS和JavaScript文件。它完全免费，并且可以使用自定义域名。

主要特点：
- 免费托管
- 自动从GitHub仓库构建
- 支持自定义域名
- 支持HTTPS

## 创建步骤

### 1. 创建GitHub仓库

首先，创建一个新的GitHub仓库。仓库名称格式为`username.github.io`（其中username是你的GitHub用户名）。这将创建一个特殊的仓库，其内容将直接发布到`https://username.github.io`。

```bash
# 克隆仓库到本地
git clone https://github.com/username/username.github.io.git
cd username.github.io
```

### 2. 添加网站内容

然后，将你的HTML、CSS和JavaScript文件添加到仓库中。至少需要一个`index.html`文件作为网站的首页。

```html
<!DOCTYPE html>
<html>
<head>
    <title>我的GitHub Pages网站</title>
    <meta charset="UTF-8">
</head>
<body>
    <h1>Hello World!</h1>
    <p>这是我的GitHub Pages网站。</p>
</body>
</html>
```

### 3. 推送到GitHub

将你的内容推送到GitHub仓库：

```bash
git add .
git commit -m "初始网站内容"
git push -u origin main
```

### 4. 启用GitHub Pages

1. 在GitHub上打开你的仓库
2. 点击"Settings"（设置）
3. 滚动到"GitHub Pages"部分
4. 在"Source"（源）下拉菜单中，选择"main"分支
5. 点击"Save"（保存）

几分钟后，你的网站将在`https://username.github.io`上线。

## 使用自定义域名

如果你有自己的域名，可以将其用于GitHub Pages网站：

1. 在你的域名注册商处，添加以下DNS记录：
   - 一个A记录，指向185.199.108.153
   - 一个A记录，指向185.199.109.153
   - 一个A记录，指向185.199.110.153
   - 一个A记录，指向185.199.111.153

2. 在你的GitHub仓库中，创建一个名为`CNAME`的文件，其中只包含你的域名：
   ```
   example.com
   ```

3. 在GitHub仓库设置中的"GitHub Pages"部分，输入你的自定义域名并保存。

## 高级用法

除了简单的静态HTML网站，GitHub Pages还支持：

- **Jekyll** - 内置支持Jekyll静态网站生成器
- **前端框架** - 可以托管React、Vue等构建的单页应用
- **自动化构建** - 结合GitHub Actions实现自动构建和部署

## 结语

GitHub Pages是开始个人博客或项目文档的绝佳方式，无需服务器管理和额外费用。本文介绍的只是基础，GitHub Pages还有更多高级功能等待你探索。

希望这篇文章对你有所帮助！如有疑问，欢迎在评论区留言。 