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
          {
            name: '活动报名',
            key: 'activity-sign',
            path: 'activity-sign',
            component: dynamicWrapper(app, [], () => import('../routes/Hdzq/ActivitySign')),
          },
          {
            name: '填写报名信息',
            key: 'activity-sign-form',
            path: 'activity-sign-form',
            component: dynamicWrapper(app, [], () => import('../routes/Hdzq/ActivitySignForm')),
          },
          {
            name: '活动详情',
            key: 'activity-detail',
            path: 'activity-detail/:id',
            component: dynamicWrapper(app, [], () => import('../routes/Hdzq/ActivityDetail')),
          },
          {
            name: '展会详情',
            key: 'exhibition-detail',
            path: 'exhibition-detail/:id',
            component: dynamicWrapper(app, [], () => import('../routes/Hdzq/ExhibitionDetail')),
          },
          {
            name: '抽奖详情',
            key: 'prize-detail',
            path: 'prize-detail/:id',
            component: dynamicWrapper(app, [], () => import('../routes/Hdzq/PrizeDetail')),
          },
        ]
      },

      {
        name: '活动',
        key: 'activity',
        path: 'activity',
        isHide: true,
        children: [
          {
            name: '活动列表',
            key: 'list',
            path: 'list',
            component: dynamicWrapper(app, [], () => import('../routes/Activity/ActivityList')),
          },
          {
            name: '活动详情',
            key: 'detail',
            path: 'detail/:id',
            component: dynamicWrapper(app, [], () => import('../routes/Activity/ActivityDetail')),
          },
          {
            name: '订单确认',
            key: 'order',
            path: 'order/:id',
            component: dynamicWrapper(app, [], () => import('../routes/Activity/ActivityOrder')),
          },
          {
            name: '购票成功',
            key: 'pay',
            path: 'pay',
            component: dynamicWrapper(app, [], () => import('../routes/Activity/ActivityPay')),
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
            name: '编辑文章',
            key: 'article-edit',
            path: 'article-edit/:id',
            isHide: true,
            component: dynamicWrapper(app, [], () => import('../routes/Account/Publish/ArticleEdit')),
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
