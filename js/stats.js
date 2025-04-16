/**
 * 统计脚本 - 处理网站访问量统计
 */

// 从localStorage中获取网站总访问量
let totalVisits = localStorage.getItem('totalVisits') || 0;
totalVisits = parseInt(totalVisits) + 1;

// 更新localStorage
localStorage.setItem('totalVisits', totalVisits);

// 更新页面上的访问量计数器
document.addEventListener('DOMContentLoaded', () => {
    const visitCountElements = document.querySelectorAll('#visit-count');
    visitCountElements.forEach(element => {
        element.textContent = totalVisits;
    });
});

/**
 * 记录页面PV（Page View）
 */
function recordPageView() {
    const path = window.location.pathname;
    const pageKey = `pv_${path}`;
    
    // 获取当前页面的访问量
    let pageViews = localStorage.getItem(pageKey) || 0;
    pageViews = parseInt(pageViews) + 1;
    
    // 更新localStorage
    localStorage.setItem(pageKey, pageViews);
    
    return pageViews;
}

// 记录当前页面的PV
recordPageView(); 