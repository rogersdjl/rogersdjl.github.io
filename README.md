# Rogers的个人博客

这是一个基于Hexo框架的个人博客项目，使用Next主题，并通过GitHub Actions自动部署在GitHub Pages上。

## 项目特点

- 基于Hexo静态博客框架
- 使用Next主题，美观简洁
- 支持Markdown格式编写文章
- 通过GitHub Actions自动部署
- 支持分类、标签、搜索等功能

## 部署方式

本项目使用GitHub Actions自动部署：

1. 源代码存储在`main`分支
2. 当推送到`main`分支时，GitHub Actions会自动运行
3. GitHub Actions会构建Hexo并将生成的静态文件部署到`gh-pages`分支
4. GitHub Pages从`gh-pages`分支提供服务

## 快速开始

### 环境准备

请确保您的电脑已安装以下软件：

- Node.js (推荐v14.0.0以上)
- Git

### 本地运行

1. 克隆仓库到本地

```bash
git clone git@github.com:rogersdjl/rogersdjl.github.io.git
cd rogersdjl.github.io
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

### 发布方式

只需将更改推送到GitHub仓库的`main`分支：

```bash
git add .
git commit -m "添加新文章：文章标题"
git push origin main
```

GitHub Actions会自动构建并部署您的博客。

## 自定义配置

### 博客配置

编辑 `_config.yml` 文件修改博客的基本配置，如博客名称、描述、URL等。

### 主题配置

编辑 `_config.next.yml` 文件修改Next主题的配置，如布局、颜色方案、菜单等。

## GitHub Actions

本项目使用GitHub Actions自动化部署流程。工作流配置文件位于`.github/workflows/pages.yml`。

每当您向`main`分支推送更改时，GitHub Actions将：
1. 安装依赖
2. 生成静态文件
3. 将生成的文件部署到`gh-pages`分支

## 许可证

MIT
