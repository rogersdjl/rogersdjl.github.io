# Rogers的个人博客

这是一个基于Hexo框架的个人博客项目，使用Next主题，并部署在GitHub Pages上。

## 项目特点

- 基于Hexo静态博客框架
- 使用Next主题，美观简洁
- 支持Markdown格式编写文章
- 自动部署到GitHub Pages
- 支持分类、标签、搜索等功能

## 快速开始

### 环境准备

请确保您的电脑已安装以下软件：

- Node.js (推荐v14.0.0以上)
- Git

### 本地运行

1. 克隆仓库到本地

```bash
git clone git@github.com:rogersdjl/rogersdjl.github.io.git
cd blog
```

2. 安装依赖

```bash
npm install
```

3. 本地预览

```bash
npm start
```

访问 `http://localhost:4000` 查看效果。

## 写作博客

### 创建新文章

```bash
npx hexo new post "文章标题"
```

这将在 `source/_posts` 目录下创建一个新的Markdown文件。

### 文章格式

文章开头需要包含Front-matter（YAML格式的元数据）：

```markdown
---
title: 文章标题
categories:
  - 分类名称
tags:
  - 标签1
  - 标签2
date: 2025-04-20 22:41:39
---

这里开始写正文内容...
```

### Markdown语法

Hexo使用Markdown语法，您可以使用以下常用功能：

- 标题：`# 一级标题`, `## 二级标题`等
- 强调：`**粗体**`, `*斜体*`
- 链接：`[链接文本](链接URL)`
- 图片：`![alt文本](图片URL)`
- 代码块：
  ````markdown
  ```javascript
  function hello() {
    console.log("Hello World");
  }
  ```
  ````

## 部署到GitHub Pages

### 自动部署

执行以下命令自动构建并部署到GitHub Pages：

```bash
bash deploy.sh
```

几分钟后，您可以访问 https://rogersdjl.github.io/ 查看您的博客。

### 手动部署步骤

1. 生成静态文件

```bash
npx hexo clean
npx hexo generate
```

2. 进入生成的文件夹并初始化Git

```bash
cd .temp
git init
```

3. 添加文件并提交

```bash
git add -A
git commit -m "更新博客"
git branch -M main
```

4. 推送到GitHub仓库

```bash
git push -f git@github.com:rogersdjl/rogersdjl.github.io.git main:main
```

## 自定义配置

### 博客配置

编辑 `_config.yml` 文件修改博客的基本配置，如博客名称、描述、URL等。

### 主题配置

编辑 `_config.next.yml` 文件修改Next主题的配置，如布局、颜色方案、菜单等。

## 常见问题

- 如果部署失败，请检查SSH密钥是否正确设置
- 如果本地预览出现问题，可尝试 `npx hexo clean` 清除缓存

## 许可证

MIT
