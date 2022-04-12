import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
        path: '/login',
        component: () =>
            import ('@/views/login/index'),
        // component: () => import('@/views/index/index'),
        // redirect: '/',
        hidden: true
    },

    {
        path: '/404',
        component: () =>
            import ('@/views/404'),
        hidden: true
    },
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/main',
        component: Layout,
        redirect: '/main/index',
        children: [{
            path: 'index',
            name: 'main',
            component: () =>
                import ('@/views/main/index'),
            meta: { title: '主页', icon: 'dashboard' }
        }]
    },
    {
        path: '/resource',
        component: Layout,
        redirect: '/resource/index/',
        children: [{
            path: 'index',
            name: 'resource',
            component: () =>
                import ('@/views/resource/index'),
            meta: { title: '资源库', icon: 'nested' }
        }, ]
    },
    {
        path: '/aboutus',
        component: Layout,
        redirect: '/aboutus/index/',
        children: [{
            path: 'index',
            name: 'aboutus',
            component: () =>
                import ('@/views/aboutus/index'),
            meta: { title: '关于我们', icon: 'nested' }
        }, ]
    },
    {
        path: '/feedback',
        component: Layout,
        redirect: '/feedback/index/',
        children: [{
            path: 'index',
            name: 'feedback',
            component: () =>
                import ('@/views/feedback/index'),
            meta: { title: '问题反馈', icon: 'nested' }
        }, ]
    },
    {
        path: '/user',
        component: Layout,
        redirect: '/user/index/',
        children: [{
            path: 'index',
            name: 'user',
            component: () =>
                import ('@/views/user/index'),
            meta: { title: '个人中心', icon: 'nested' }
        }, ]
    },
    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
    mode: 'hash', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router