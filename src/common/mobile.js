import dynamic from 'dva/dynamic';

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => dynamic({
  app,
  models: () => models.map(m => import(`../models/${m}.js`)),
  component,
});

const BaseRoutes = app => [
  {
    component: dynamicWrapper(app, [], () => import('../layouts/MobileLayout')),
    layout: 'MobileLayout',
    key: 'MobileMenu',
    name: '移动端',
    path: 'm',
    children: [

      {
        name: '活动',
        key: 'activity',
        path: 'm/activity',
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
            name: '地址详情',
            key: 'address',
            path: 'address/:place',
            component: dynamicWrapper(app, [], () => import('../routes/Activity/ActivityMap')),
          },
          {
            name: '订单确认',
            key: 'order',
            path: 'order/:id/:type',
            component: dynamicWrapper(app, [], () => import('../routes/Activity/ActivityOrder')),
          },
          {
            name: '订单付款',
            key: 'pay',
            path: 'pay/:order_no',
            component: dynamicWrapper(app, [], () => import('../routes/Activity/ActivityPay')),
          },
          {
            name: '付款结果',
            key: 'ticket',
            path: 'ticket/:order_no',
            component: dynamicWrapper(app, [], () => import('../routes/Activity/ActivityTicket')),
          },
        ]
      },

      {
        name: '我的',
        key: 'my',
        path: 'm/my',
        isHide: true,
        children: [
          {
            name: '我的',
            key: 'index',
            path: 'index',
            component: dynamicWrapper(app, [], () => import('../routes/My/_layout')),
          },
          {
            name: '我的门票',
            key: 'ticket',
            path: 'ticket',
            component: dynamicWrapper(app, [], () => import('../routes/My/MyTicket')),
          },
          {
            name: '门票详情',
            key: 'ticket-detail',
            path: 'ticket-detail/:order_no',
            component: dynamicWrapper(app, [], () => import('../routes/My/MyTicketDetail')),
          },
          {
            name: '关于我们',
            key: 'about',
            path: 'about',
            component: dynamicWrapper(app, [], () => import('../routes/My/AboutUs')),
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
