import Vue from 'vue';
import Router from 'vue-router';
import NotFound from '@/components/404';
Vue.use(Router);

const PC = () => import('@/views/PC/pc');
import pcRouter from './pc/index';

const routes = [
  {
    path: '/',
    component: PC,
    children: pcRouter,
  },
  {
    path: '/PC',
    component: PC,
    children: pcRouter,
  },
  {
    path: '/404',
    component: NotFound,
  },
  {
    path: '*',
    redirect: '/404',
  },
];

// 消除跳转同一个页面报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const router = new Router({
  routes,
});

//路由跳转后，页面回到顶部
router.afterEach(() => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

export default router;
