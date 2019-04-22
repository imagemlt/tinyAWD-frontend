import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import teams from './views/nav1/Teams.vue'
import Config from './views/nav2/Config.vue'
import chals from './views/nav1/Chals.vue'
import Admins from './views/nav2/Admins.vue'
import instances from './views/nav1/Instances.vue'

import echarts from './views/charts/echarts.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '实例管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/instances', component: instances, name: '实例管理',iconCls:'el-icon-message' },

            /*//{ path: '/form', component: Form, name: '添加chal' },
            { path: '/chals', component: chals, name: 'chal列表' },
            { path: '/instances', component: instances, name: '运行实例' }*/
        ]
    },
    {
        path: '/',
        component: Home,
        name: '系统设置',
        iconCls: 'fa fa-id-card-o',
        children: [
            /*{ path: '/administrators', component: Admins, name: '管理员' }*/
            { path: '/config', component: Config, name: '用户设置' },
            //{ path: '/page5', component: Page5, name: '页面5' }
        ]
    },
   /* {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/page6', component: Page6, name: '导航三' }
        ]
    },*/
    {
        path: '/',
        component: Home,
        name: 'Charts',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/echarts', component: echarts, name: '排行榜' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;