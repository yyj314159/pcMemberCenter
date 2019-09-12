import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
let index = () => import("./components/index"); //会员基本信息
let identSubject = () => import("./components/member/identSubject"); //会员首页
let asOne = () => import("./components/member/addSubject/asOne"); //会员基本信息
let asTwo = () => import("./components/member/addSubject/asTwo"); //会员基本信息
let asThree = () => import("./components/member/addSubject/asThree"); //会员基本信息
let asFour = () => import("./components/member/addSubject/asFour"); //会员基本信息
export default new Router({
    mode: 'history',
    routes: [
        {
        path: '/pcMemberCenter',
        component:index,
        children: [
            // 会员主体认证
            {
                path: 'asOne',
                name: 'asOne',
                component: asOne
            },
            {
                path: 'asTwo',
                name: 'asTwo',
                component: asTwo
            },
            {
                path: 'asThree',
                name: 'asThree',
                component: asThree
            },
            {
                path: 'asFour',
                name: 'asFour',
                component: asFour
            },

            // 会员主体认证
            {
                path: 'identSubject',
                name: 'identSubject',
                component: identSubject
            },
            // 默认地址
            {
                path: 'identSubject',
                name: 'identSubject',
                component: identSubject
            },

        ]}
    ]
})