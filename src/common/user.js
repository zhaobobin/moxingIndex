import dynamic from 'dva/dynamic';

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => dynamic({
  app,
  models: () => models.map(m => import(`../models/${m}.js`)),
  component,
});

const UserRoutes = app => [
  {
    component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
    layout: 'UserLayout',
    key: 'UserMenu',
    name: '用户',
    path: 'user',
    children: [
      {
        name: '用户登录',
        key: 'login',
        path: 'user/login',
        component: dynamicWrapper(app, [], () => import('../routes/User/Login')),
      },
      {
        name: '用户注册',
        key: 'register',
        path: 'user/register',
        component: dynamicWrapper(app, [], () => import('../routes/User/Register')),
      },
      {
        name: '用户注册-成功',
        key: 'register-result',
        path: 'user/register-result',
        component: dynamicWrapper(app, [], () => import('../routes/User/RegisterResult')),
      },
      {
        name: '用户注册协议',
        key: 'register-xieyi',
        path: 'user/register-xieyi',
        component: dynamicWrapper(app, [], () => import('../routes/Other/Xieyi')),
      },
      {
        name: '忘记密码',
        key: 'reset',
        path: 'user/reset/:step',
        component: dynamicWrapper(app, [], () => import('../routes/User/Reset')),
      },

    ],
  },
];

export default UserRoutes
