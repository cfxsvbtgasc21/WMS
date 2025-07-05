import VueRouter from 'vue-router';
import store from '../store';

const routes = [
    {
        path: '/',
        name: 'login',
        component: () => import('../components/Login')
    },
    {
        path: '/Index',
        name: 'index',
        component: () => import('../components/Index'),
        redirect: '/Home', // 添加重定向到首页
        children: [
            {
                path: '/Home',
                name: 'home',
                meta: { title: '首页' },
                component: () => import('../components/Home')
            }
            // 动态路由将在这里添加
        ]
    }
];

const router = new VueRouter({
    mode: 'history',
    routes
});

// 添加 resetRouter 函数（之前缺失）
export function resetRouter() {
    const newRouter = new VueRouter({
        mode: 'history',
        routes: []
    });
    router.matcher = newRouter.matcher;
}

// 修正导航守卫
router.beforeEach(async (to, from, next) => {
    if (to.name === 'login') {
        next();
        return;
    }

    // 确保菜单已加载
    if (store.state.menu.length === 0) {
        try {
            await store.dispatch('initMenu');
            next(to.path); // 重新导航到目标页面
        } catch (error) {
            next('/'); // 出错时跳回登录页
        }
    } else {
        next();
    }
});

export default router;