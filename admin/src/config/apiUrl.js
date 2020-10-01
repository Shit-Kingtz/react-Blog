let ipUrl = 'http://localhost:7001/admin/'
let servicePath = {
    checkLogin: ipUrl + 'checkLogin',           // 登录接口
    getTypeInfo: ipUrl + 'getTypeInfo',         // 获取文章类别信息接口
    addArticle: ipUrl + 'addArticle',           // 添加文章
    updateArticle: ipUrl + 'updateArticle',     // 更新文章
    getArticleList: ipUrl + 'getArticleList',   // 文章列表
    deleteArticle: ipUrl + 'deleteArticle/',    // 删除文章
    getArticleById: ipUrl + 'getArticleById/',  // 获取文章详情
}

export default servicePath