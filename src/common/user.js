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
        icon: 'user',
        path: 'user/login',
        exact: true,
        component: dynamicWrapper(app, [], () => import('../routes/User/Login')),
      },
      {
        name: '用户注册',
        key: 'register',
        icon: 'user',
        path: 'user/register',
        exact: true,
        component: dynamicWrapper(app, [], () => import('../routes/User/Register')),
      },
      {
        name: '用户注册成功',
        key: 'register-success',
        icon: 'user',
        path: 'user/register/success',
        exact: true,
        component: dynamicWrapper(app, [], () => import('../routes/User/RegisterSuccess')),
      },
      // {
      //   name: '用户注册失败',
      //   key: 'register-fail',
      //   icon: 'user',
      //   path: 'user/register/fail/:message',
      //   exact: true,
      //   component: dynamicWrapper(app, [], () => import('../routes/User/RegisterFail')),
      // },
      {
        name: '用户开户成功',
        key: 'kaihu-success',
        icon: 'user',
        path: 'user/kaihu/success',
        exact: true,
        component: dynamicWrapper(app, [], () => import('../routes/User/KaihuSuccess')),
      },
      // {
      //   name: '用户开户失败',
      //   key: 'kaihu-fail',
      //   icon: 'user',
      //   path: 'user/kaihu/fail/:message',
      //   exact: true,
      //   component: dynamicWrapper(app, [], () => import('../routes/User/KaihuFail')),
      // },
      {
        name: '忘记密码',
        key: 'reset',
        icon: 'user',
        path: 'user/reset/:step',
        component: dynamicWrapper(app, [], () => import('../routes/User/Reset')),
      },
    ],
  },
];

export default UserRoutes
