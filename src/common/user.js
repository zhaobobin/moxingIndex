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
        name: '用户注册成功',
        key: 'register-success',
        path: 'user/register/success',
        component: dynamicWrapper(app, [], () => import('../routes/User/RegisterSuccess')),
      },
      {
        name: '忘记密码',
        key: 'reset',
        path: 'user/reset/:step',
        component: dynamicWrapper(app, [], () => import('../routes/User/Reset')),
      },

      {
        name: '用户开户成功',
        key: 'kaihu-success',
        path: 'user/kaihu/success',
        component: dynamicWrapper(app, [], () => import('../routes/User/KaihuSuccess')),
      },
      {
        name: '充值成功',
        key: 'cz-result',
        path: 'user/cz-result',
        component: dynamicWrapper(app, [], () => import('../routes/User/CzResult')),
      },
      {
        name: '提现成功',
        key: 'tx-result',
        path: 'user/tx-result',
        component: dynamicWrapper(app, [], () => import('../routes/User/TxResult')),
      },
      {
        name: '银行卡绑卡成功',
        key: 'bank-add',
        path: 'user/bank-add',
        component: dynamicWrapper(app, [], () => import('../routes/User/BankcardAdd')),
      },
      {
        name: '银行卡解绑成功',
        key: 'bank-remove',
        path: 'user/bank-remove',
        component: dynamicWrapper(app, [], () => import('../routes/User/BankcardRemove')),
      },
      {
        name: '出借成功',
        key: 'lend-result',
        path: 'user/lend-result',
        component: dynamicWrapper(app, [], () => import('../routes/User/LendResult')),
      },
    ],
  },
];

export default UserRoutes
