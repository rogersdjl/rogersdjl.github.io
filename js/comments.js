/**
 * 评论系统脚本
 */

// 初始化评论存储
if (!localStorage.getItem('blog_comments')) {
    localStorage.setItem('blog_comments', JSON.stringify({}));
}

/**
 * 加载文章评论
 * @param {string} postId - 文章ID
 */
function loadComments(postId) {
    const commentsContainer = document.getElementById('comments-container');
    if (!commentsContainer) return;
    
    // 获取所有评论
    const allComments = JSON.parse(localStorage.getItem('blog_comments')) || {};
    const postComments = allComments[postId] || [];
    
    // 清空容器
    commentsContainer.innerHTML = '';
    
    // 如果没有评论
    if (postComments.length === 0) {
        commentsContainer.innerHTML = '<p class="no-comments">暂无评论，来发表第一条评论吧！</p>';
        return;
    }
    
    // 创建评论列表
    const commentsList = document.createElement('div');
    commentsList.className = 'comments-list';
    
    // 添加每条评论
    postComments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.className = 'comment';
        
        commentElement.innerHTML = `
            <div class="comment-header">
                <span class="comment-author">${comment.name}</span>
                <span class="comment-date">${comment.date}</span>
            </div>
            <div class="comment-content">${comment.content}</div>
        `;
        
        commentsList.appendChild(commentElement);
    });
    
    commentsContainer.appendChild(commentsList);
    
    // 设置评论表单提交事件
    setupCommentForm(postId);
}

/**
 * 设置评论表单提交事件
 * @param {string} postId - 文章ID
 */
function setupCommentForm(postId) {
    const commentForm = document.getElementById('comment-form');
    if (!commentForm) return;
    
    commentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 获取表单数据
        const name = document.getElementById('comment-name').value;
        const email = document.getElementById('comment-email').value;
        const content = document.getElementById('comment-content').value;
        
        if (!name || !email || !content) {
            alert('请填写完整的评论信息');
            return;
        }
        
        // 创建新评论
        const newComment = {
            name: name,
            email: email, // 不会公开，仅用于标识用户
            content: content,
            date: new Date().toLocaleDateString()
        };
        
        // 获取所有评论
        const allComments = JSON.parse(localStorage.getItem('blog_comments')) || {};
        
        // 如果该文章没有评论，创建一个空数组
        if (!allComments[postId]) {
            allComments[postId] = [];
        }
        
        // 添加新评论
        allComments[postId].push(newComment);
        
        // 保存到localStorage
        localStorage.setItem('blog_comments', JSON.stringify(allComments));
        
        // 重新加载评论
        loadComments(postId);
        
        // 清空表单
        commentForm.reset();
    });
} 