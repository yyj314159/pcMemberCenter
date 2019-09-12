export default{
    //会员中心 
        // 1. 选择主体类型
        selSubType:'/shop_web/createWeb/chooseSiteType',
        // 2. 选择主体
        selSub:'/shop_web/createWeb/toCreateWebPage',
        // 3. 创建主体
        creaSub:'/shop_web/createWeb/createEntrep',
        //  4. 创建网站 
        creWeb:'/shop_web/createWeb/createWebSite',
        //  5. 提交主体审核
        auditSub:'/shop_web/createWeb/auditEntrep',
        // 6. 查看主体认证信息
        viewSub:'/shop_web/createWeb/viewEntrepAudit',
        // 7.查看用户信息
        memInfo:'/user/basic',
        // 8.判断是否登录
        getLoginStatus:'/member_web/memberCenterIndex/getUserLoginStatus?_=' + new Date().getTime(),
        // 9.创建站点时申请加入
        applyJoin:'/shop_web/zmShopSendInvite/sendInviteWithOutCode',
    
}