import vue from 'vue'
import Vuex from 'vuex'
import router, { resetRouter } from "../router";

vue.use(Vuex)
function addNewRoute(menuList) {
    console.log('动态添加路由:', menuList);

    // 创建新的路由配置（不再修改原始配置）
    const newRoutes = menuList.map(menu => ({
        path: '/' + menu.menuclick,
        name: menu.menuname,
        meta: { title: menu.menuname },
        component: () => import('../components/' + menu.menucomponent)
    }));

    // 找到Index路由并添加子路由
    const indexRoute = router.options.routes.find(r => r.path === '/Index');
    if (indexRoute) {
        resetRouter(); // 重置路由

        // 重新添加所有路由（包括静态和动态）
        const baseRoutes = [...router.options.routes];
        indexRoute.children = [
            ...indexRoute.children, // 保留原有的Home路由
            ...newRoutes           // 添加动态路由
        ];

        router.addRoutes(baseRoutes);
    }
}
export default new Vuex.Store({
    state: {
        menu: []
    },
    mutations: {
        setMenu(state, menuList) {
            state.menu = menuList
            addNewRoute(menuList)
        }
    },
    getters: {
        getMenu(state) {
            return state.menu
        }
    },
    actions: {
        initMenu({ commit }) {
            const menuData = JSON.parse(sessionStorage.getItem('MenuData'))
            if (menuData) {
                console.log('从 sessionStorage 恢复菜单:', menuData)
                commit('setMenu', menuData)
            }
        }
    }
})