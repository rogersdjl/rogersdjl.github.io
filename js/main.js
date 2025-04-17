/**
 * 清新博客主脚本
 */

// 博客文章数据 - 将被动态加载的内容替换
let posts = [];

/**
 * 扫描posts目录下的所有Markdown文件
 */
async function scanMarkdownFiles() {
    try {
        // 从posts.json获取文章列表，而不是尝试扫描目录
        const response = await fetch('posts.json');
        if (!response.ok) {
            throw new Error('无法获取文章列表');
        }
        
        const mdFiles = await response.json();
        
        if (mdFiles.length > 0) {
            // 重新加载所有文章信息
            await loadPostsMetadata(mdFiles);
        }
    } catch (error) {
        console.error('扫描Markdown文件失败:', error);
        // 如果扫描失败，使用默认文章数据
        loadDefaultPosts();
    }
}

/**
 * 从Markdown文件加载文章元数据
 */
async function loadPostsMetadata(files) {
    const newPosts = [];
    
    // 获取文件的最后修改时间
    const fileStats = await Promise.all(
        files.map(async (file) => {
            try {
                const response = await fetch(file, { method: 'HEAD' });
                const lastModified = response.headers.get('Last-Modified');
                return { 
                    file, 
                    lastModified: lastModified ? new Date(lastModified) : new Date() 
                };
            } catch (error) {
                console.error(`无法获取文件 ${file} 的修改时间:`, error);
                return { file, lastModified: new Date() };
            }
        })
    );
    
    // 按最后修改时间排序文件
    fileStats.sort((a, b) => b.lastModified - a.lastModified);
    
    // 按排序后的顺序加载文件内容
    for (let i = 0; i < fileStats.length; i++) {
        const { file, lastModified } = fileStats[i];
        try {
            const response = await fetch(file);
            if (!response.ok) continue;
            
            const markdown = await response.text();
            
            // 解析文章元数据
            const title = markdown.match(/# (.+)/)?.[1] || 
                          file.split('/').pop().replace('.md', '');
            
            // 使用文件的最后修改时间作为日期，包含时分秒
            const dateObj = lastModified;
            const dateStr = dateObj.toISOString().split('T')[0];
            const timeStr = dateObj.toTimeString().split(' ')[0];
            const fullDateStr = `${dateStr} ${timeStr}`;
            
            // 获取摘要 (第一段内容)
            let excerpt = '';
            const paragraphs = markdown.split(/\n\s*\n/);
            for (let p of paragraphs) {
                // 跳过标题和元数据行
                if (!p.startsWith('#') && p.trim()) {
                    // 移除Markdown标记
                    excerpt = p.replace(/[#*`_\[\]()]/g, '').trim();
                    if (excerpt.length > 150) {
                        excerpt = excerpt.substring(0, 147) + '...';
                    }
                    break;
                }
            }
            
            // 生成随机浏览量
            const views = Math.floor(Math.random() * 200) + 50;
            
            newPosts.push({
                id: String(i + 1),
                title,
                date: fullDateStr,  // 使用完整日期时间
                dateObj,           // 保存日期对象用于排序
                excerpt: excerpt || '这篇文章没有摘要信息。',
                views,
                file,
                lastModified
            });
        } catch (error) {
            console.error(`解析文件 ${file} 失败:`, error);
        }
    }
    
    if (newPosts.length > 0) {
        posts = newPosts;
    } else {
        // 如果没有找到任何文章，使用默认数据
        loadDefaultPosts();
    }
}

/**
 * 加载默认文章数据
 */
function loadDefaultPosts() {
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const twoDaysAgo = new Date(now);
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    
    posts = [
        {
            id: '1',
            title: '第一篇博客文章',
            date: `${now.toISOString().split('T')[0]} ${now.toTimeString().split(' ')[0]}`,
            dateObj: now,
            excerpt: '这是第一篇博客文章的摘要内容，内容简短精炼，吸引读者点击阅读全文。',
            views: 128,
            file: 'posts/post1.md'
        },
        {
            id: '2',
            title: '如何创建GitHub Pages静态网站',
            date: `${yesterday.toISOString().split('T')[0]} ${yesterday.toTimeString().split(' ')[0]}`,
            dateObj: yesterday,
            excerpt: '本文将介绍如何使用GitHub Pages创建一个简单的静态网站，不需要复杂的构建工具和框架。',
            views: 86,
            file: 'posts/post2.md'
        },
        {
            id: '3',
            title: 'Markdown语法基础教程',
            date: `${twoDaysAgo.toISOString().split('T')[0]} ${twoDaysAgo.toTimeString().split(' ')[0]}`,
            dateObj: twoDaysAgo,
            excerpt: '学习Markdown的基本语法，掌握如何编写格式丰富的文档，包括标题、列表、链接、图片和代码块等。',
            views: 215,
            file: 'posts/post3.md'
        }
    ];
}

/**
 * 加载首页的最新文章
 */
async function loadRecentPosts() {
    const recentPostsContainer = document.getElementById('recent-posts');
    if (!recentPostsContainer) return;

    // 先清空容器
    recentPostsContainer.innerHTML = '<p>加载中...</p>';
    
    // 扫描Markdown文件
    await scanMarkdownFiles();
    
    // 清空加载提示
    recentPostsContainer.innerHTML = '';
    
    // 获取最新的文章
    const recentPosts = posts.slice(0, 5);
    
    if (recentPosts.length === 0) {
        recentPostsContainer.innerHTML = '<p>没有找到文章。</p>';
        return;
    }
    
    recentPosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post-card';
        
        postElement.innerHTML = `
            <div class="post-card-content">
                <h4><a href="post.html?id=${post.id}">${post.title}</a></h4>
                <div class="post-meta">${post.date} | 阅读量: ${post.views}</div>
                <p>${post.excerpt}</p>
                <a href="post.html?id=${post.id}" class="read-more">阅读全文</a>
            </div>
        `;
        
        recentPostsContainer.appendChild(postElement);
    });
}

/**
 * 加载所有文章列表
 */
async function loadAllPosts() {
    const allPostsContainer = document.getElementById('all-posts');
    if (!allPostsContainer) return;
    
    // 先清空容器
    allPostsContainer.innerHTML = '<p>加载中...</p>';
    
    // 扫描Markdown文件
    await scanMarkdownFiles();
    
    // 清空加载提示
    allPostsContainer.innerHTML = '';
    
    if (posts.length === 0) {
        allPostsContainer.innerHTML = '<p>没有找到文章。</p>';
        return;
    }
    
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post-item';
        
        postElement.innerHTML = `
            <div class="post-item-content">
                <h3><a href="post.html?id=${post.id}">${post.title}</a></h3>
                <div class="post-meta">
                    <span>${post.date}</span>
                    <span>阅读量: ${post.views}</span>
                </div>
                <p>${post.excerpt}</p>
                <a href="post.html?id=${post.id}" class="read-more">阅读全文</a>
            </div>
        `;
        
        allPostsContainer.appendChild(postElement);
    });
}

/**
 * 安全地转义HTML
 */
function escapeHtml(text) {
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

/**
 * 根据ID加载特定文章
 */
async function loadPost(postId) {
    const postTitle = document.getElementById('post-title');
    const postContent = document.getElementById('post-content');
    const postDate = document.getElementById('post-date');
    const postViewCount = document.getElementById('post-view-count');
    
    if (!postTitle || !postContent) return;
    
    // 显示加载提示
    postContent.innerHTML = '<p>加载中...</p>';
    
    // 扫描Markdown文件
    await scanMarkdownFiles();
    
    const post = posts.find(p => p.id === postId);
    
    if (!post) {
        postTitle.textContent = '文章不存在';
        postContent.textContent = '无法找到请求的文章';
        return;
    }
    
    // 设置文章标题和日期
    postTitle.textContent = post.title;
    if (postDate) postDate.textContent = post.date;
    if (postViewCount) postViewCount.textContent = post.views;
    
    // 加载文章内容
    try {
        const response = await fetch(post.file);
        if (!response.ok) {
            throw new Error('文章加载失败');
        }
        const markdown = await response.text();
        
        // 使用marked.js转换Markdown为HTML
        marked.setOptions({
            breaks: true,
            gfm: true
        });
        
        // 先转换Markdown为HTML
        const content = marked.parse(markdown);
        postContent.innerHTML = content;
        
        // 然后高亮代码块
        document.querySelectorAll('pre code').forEach(block => {
            if (block && typeof hljs !== 'undefined') {
                try {
                    hljs.highlightElement(block);
                } catch (e) {
                    console.error('代码高亮错误:', e);
                }
            }
        });
        
        // 最后处理数学公式
        renderMathInDocument();
        
        // 增加文章浏览量
        post.views++;
        if (postViewCount) postViewCount.textContent = post.views;
        
    } catch (error) {
        console.error('文章加载失败:', error);
        postContent.textContent = '文章加载失败，请稍后再试';
    }
}

/**
 * 使用KaTeX渲染页面中的数学公式
 */
function renderMathInDocument() {
    // 查找页面中所有可能包含数学公式的元素
    const content = document.getElementById('post-content');
    if (!content) return;
    
    if (typeof renderMathInElement === 'function') {
        try {
            renderMathInElement(content, {
                delimiters: [
                    {left: '$$', right: '$$', display: true},
                    {left: '$', right: '$', display: false}
                ],
                throwOnError: false
            });
        } catch (error) {
            console.error('数学公式渲染错误:', error);
        }
    } else {
        // 如果没有可用的KaTeX渲染库，手动处理数学公式
        try {
            // 查找所有包含$...$的内容
            const paragraphs = content.querySelectorAll('p');
            paragraphs.forEach(p => {
                const html = p.innerHTML;
                // 简单替换行内公式为<span class="math-inline">...</span>
                if (html.includes('$') && !html.includes('$$')) {
                    const newHtml = html.replace(/\$([^\$]+)\$/g, '<span class="math-inline">$1</span>');
                    if (newHtml !== html) {
                        p.innerHTML = newHtml;
                    }
                }
            });
            
            // 查找可能是行间公式的段落
            const possibleBlockMath = content.querySelectorAll('p');
            possibleBlockMath.forEach(p => {
                const text = p.textContent.trim();
                if (text.startsWith('$$') && text.endsWith('$$')) {
                    const formula = text.substring(2, text.length-2);
                    p.innerHTML = `<div class="math-block">${formula}</div>`;
                    p.className = 'math-paragraph';
                }
            });
        } catch (error) {
            console.error('手动数学公式处理错误:', error);
        }
    }
}

// 页面加载完成后自动执行
document.addEventListener('DOMContentLoaded', () => {
    // 加载首页最新文章
    if (document.getElementById('recent-posts')) {
        loadRecentPosts();
    }
    
    // 加载博客页面所有文章
    if (document.getElementById('all-posts')) {
        loadAllPosts();
    }
    
    // 加载单篇文章
    if (document.getElementById('post-content')) {
        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get('id');
        if (postId) {
            loadPost(postId);
        }
    }
}); 