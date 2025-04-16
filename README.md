# Blog of Rogers  - GitHub Pages静态博客

这是一个基于纯HTML、CSS和JavaScript构建的简约风格博客系统，专为GitHub Pages设计，无需服务器端语言和数据库支持。

## 特点

- 🌈 小清新风格设计
- 📝 支持Markdown文章
- 💻 代码高亮显示
- 📊 访问统计功能
- 💬 评论系统
- 📱 响应式设计
- 🧮 数学公式支持

## 目录结构

```
.
├── index.html        # 首页
├── blog.html         # 文章列表页
├── post.html         # 文章详情页
├── about.html        # 关于页面
├── css/              # 样式文件
│   ├── style.css     # 主样式
│   └── highlight.css # 代码高亮样式
├── js/               # JavaScript文件
│   ├── main.js       # 主脚本
│   ├── stats.js      # 访问统计
│   ├── comments.js   # 评论系统
│   └── *.min.js      # 第三方库文件
└── posts/            # Markdown格式的文章
    ├── post1.md
    ├── post2.md
    └── post3.md
```

## 如何使用

### 1. 克隆或下载此仓库

```bash
git clone https://github.com/yourusername/yourusername.github.io.git
cd yourusername.github.io
```

### 2. 添加新文章

1. 在`posts`目录中创建新的Markdown文件，例如`post4.md`

2. 在`js/main.js`文件中的`posts`数组中添加新文章的信息：

```javascript
const posts = [
    // ... 现有文章
    {
        id: '4',
        title: '新文章标题',
        date: '2024-05-15',
        excerpt: '这是新文章的摘要内容...',
        views: 0,
        file: 'posts/post4.md'
    }
];
```

### 3. 部署到GitHub Pages

```bash
git add .
git commit -m "添加新文章：文章标题"
git push
```

几分钟后，你的更改将在你的GitHub Pages网站上生效。

## 自定义

### 修改样式

编辑`css/style.css`文件来更改网站的颜色、字体和布局。

### 修改网站信息

编辑HTML文件中的标题、页脚等信息来自定义你的网站。

## 注意事项

- 由于使用的是纯前端实现，评论和访问统计数据存储在访问者的浏览器localStorage中，不会跨设备同步。
- 如需更强大的功能，可考虑集成第三方服务，如Disqus评论系统、Google Analytics等。

## 许可证

MIT 