import dynamic from 'dva/dynamic';

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => dynamic({
  app,
  models: () => models.map(m => import(`../models/${m}.js`)),
  component,
});

const BaseRoutes = app => [
  {
    component: dynamicWrapper(app, [], () => import('../layouts/BaseLayout')),
    layout: 'BaseLayout',
    key: 'MainMenu',
    name: '前台',
    path: '/',
    children: [
      {
        name: '首页',
        key: 'home',
        path: '',
        exact: true,
        component: dynamicWrapper(app, [], () => import('../routes/Home/Home')),
      },
      {
        name: '隐私协议',
        key: 'privacy',
        path: 'privacy',
        component: dynamicWrapper(app, [], () => import('../routes/Privacy/Privacy')),
      },
      {
        name: '用户说明',
        key: 'guide',
        path: 'guide',
        component: dynamicWrapper(app, [], () => import('../routes/Guide/Guide')),
      },
      {
        name: '关于我们',
        key: 'about',
        path: 'about',
        component: dynamicWrapper(app, [], () => import('../routes/About/About')),
      },
      {
        name: 'App下载',
        key: 'download',
        path: 'download',
        isHide: true,
        component: dynamicWrapper(app, [], () => import('../routes/Other/Download')),
      },

      {
        name: '活动专区',
        key: 'hdzq',
        path: 'hdzq',
        isHide: true,
        children: [
          {
            name: '幸运抽奖',
            key: 'lucky',
            path: 'lucky',
            component: dynamicWrapper(app, [], () => import('../routes/Hdzq/Lucky')),
          },
        ]
      },

      {
        name: '我的账户',
        key: 'account',
        path: 'account',
        component: dynamicWrapper(app, [], () => import('../routes/Account/AccountIndex')),
        children: [
          {
            name: '账户总览',
            key: 'total',
            path: 'total',
            component: dynamicWrapper(app, [], () => import('../routes/Account/Total/AccountTotal')),
          },
          {
            name: '发布文章',
            key: 'publish',
            path: 'publish',
            component: dynamicWrapper(app, [], () => import('../routes/Account/Publish/ArticleAdd')),
          },
          {
            name: '内容管理',
            key: 'content',
            path: 'content',
            component: dynamicWrapper(app, [], () => import('../routes/Account/Content/ContentManage')),
          },
          {
            name: '评论管理',
            key: 'comment',
            path: 'comment',
            component: dynamicWrapper(app, [], () => import('../routes/Account/Comment/CommentManage')),
          },
        ]
      },

      {
        name: '网络错误',
        title: '网络错误',
        key: 'page500',
        path: 'page500',
        isHide: true,
        component: dynamicWrapper(app, [], () => import('../routes/Other/page500')),
      },

    ]
  },
];

export default BaseRoutes
