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
      //新手指引
      {
        name: '新手指引',
        key: 'guide',
        path: 'guide',
        isHide: true,
        // component: dynamicWrapper(app, [], () => import('../routes/Guide/GuideIndex')),
        children:[
          {
            name: '风险控制',
            key: 'risk',
            path: 'risk',
            component: dynamicWrapper(app, [], () => import('../routes/Guide/Risk')),
          },
        ]
      },
      //新闻资讯
      {
        name: '新闻资讯',
        key: 'news',
        path: 'news',
        isHide: true,
        //component: dynamicWrapper(app, [], () => import('../routes/News/NewsIndex')),
        children: [
          {
            name: '网站公告',
            key: 'notices-list',
            path: 'notices-list',
            exact: true,
            component: dynamicWrapper(app, [], () => import('../routes/News/NoticesList')),
          },
          {
            name: '网站公告详情',
            key: 'notices-detail',
            path: 'notices-list/detail/:id',
            exact: true,
            isHide: true,
            component: dynamicWrapper(app, [], () => import('../routes/News/NoticesDetail')),
          },

          {
            name: '公司新鲜事',
            key: 'news-list',
            path: 'news-list',
            exact: true,
            component: dynamicWrapper(app, [], () => import('../routes/News/NewsList')),
          },
          {
            name: '公司新鲜事详情',
            key: 'news-detail',
            path: 'news-list/detail/:id',
            exact: true,
            isHide: true,
            component: dynamicWrapper(app, [], () => import('../routes/News/NewsDetail')),
          },

          {
            name: '媒体报道',
            key: 'report-list',
            path: 'report-list',
            exact: true,
            component: dynamicWrapper(app, [], () => import('../routes/News/ReportList')),
          },
          {
            name: '媒体报道详情',
            key: 'report-detail',
            path: 'report-list/detail/:id',
            exact: true,
            isHide: true,
            component: dynamicWrapper(app, [], () => import('../routes/News/ReportDetail')),
          },
        ]
      },
      //新闻资讯 end
      {
        name: '我要出借',
        key: 'lend',
        path: 'lend',
        //component: dynamicWrapper(app, [], () => import('../routes/Lend/LendIndex')),
        children: [
          {
            name: '出借首页',
            key: 'lend-index',
            path: '',
            exact: true,
            component: dynamicWrapper(app, [], () => import('../routes/Lend/LendIndex')),
          },
          {
            name: '智享详情',
            key: 'zxfwxq',
            path: 'zxfwxq/:id',
            component: dynamicWrapper(app, [], () => import('../routes/Lend/ZxDetail')),
          },
          {
            name: '散标详情',
            key: 'sbxq',
            path: 'sbxq/:id',
            component: dynamicWrapper(app, [], () => import('../routes/Lend/SbDetail')),
          },
          {
            name: '债权详情',
            key: 'zqxq',
            path: 'zqxq/:id',
            component: dynamicWrapper(app, [], () => import('../routes/Lend/ZqDetail')),
          },
        ]
      },

      //发现
      {
        name: '发现',
        key: 'found',
        path: 'found',
        children: [
          {
            name: '发现',
            key: 'found-index',
            path: '',
            exact: true,
            component: dynamicWrapper(app, [], () => import('../routes/Found/FoundIndex')),
          },
          {
            name: '扫码下载',
            key: 'download',
            path: 'download',
            component: dynamicWrapper(app, [], () => import('../routes/Found/Download')),
          },
          {
            name: '帮助中心',
            key: 'help-list',
            path: 'help-list',
            component: dynamicWrapper(app, [], () => import('../routes/Found/Help/HelpList')),
          },
          {
            name: '帮助中心详情',
            key: 'help-detail',
            path: 'help-detail/:id',
            component: dynamicWrapper(app, [], () => import('../routes/Found/Help/HelpDetail')),
          },
          {
            name: '关于我们',
            key: 'aboutus',
            path: 'aboutus',
            component: dynamicWrapper(app, [], () => import('../routes/Found/About/AboutUs')),
          },

          {
            name: '信息披露',
            key: 'info',
            path: 'info',
            component: dynamicWrapper(app, [], () => import('../routes/Found/Info/InfoIndex')),
          },
          {
            name: '备案信息',
            key: 'beian',
            path: 'beian',
            component: dynamicWrapper(app, [], () => import('../routes/Found/Info/Beian')),
          },
          {
            name: '组织信息',
            key: 'organization',
            path: 'organization',
            component: dynamicWrapper(app, [], () => import('../routes/Found/Info/Organization')),
          },
          {
            name: '审核信息',
            key: 'examine',
            path: 'examine',
            component: dynamicWrapper(app, [], () => import('../routes/Found/Info/Examine')),
          },
          {
            name: '经营信息',
            key: 'disclosure',
            path: 'disclosure',
            component: dynamicWrapper(app, [], () => import('../routes/Found/Info/Disclosure')),
          },
          {
            name: '重大事项',
            key: 'event',
            path: 'event',
            component: dynamicWrapper(app, [], () => import('../routes/Found/Info/Event')),
          },
          {
            name: '其他信息',
            key: 'other',
            path: 'other',
            component: dynamicWrapper(app, [], () => import('../routes/Found/Info/Other')),
          },
          {
            name: '出借人教育',
            key: 'education',
            path: 'education',
            component: dynamicWrapper(app, [], () => import('../routes/Found/Info/Education')),
          },
          {
            name: '出借人教育-详情',
            key: 'education-detail',
            path: 'education-detail',
            component: dynamicWrapper(app, [], () => import('../routes/Found/Info/EducationDetail')),
          },

          {
            name: '平台报告',
            key: 'operate',
            path: 'operate',
            component: dynamicWrapper(app, [], () => import('../routes/Found/Operate/ReportList')),
          },
          {
            name: '平台报告详情',
            key: 'operate-detail',
            path: 'operate-detail/:id',
            component: dynamicWrapper(app, [], () => import('../routes/Found/Operate/ReportDetail')),
          },

          {
            name: '邀请好友',
            key: 'invitation',
            path: 'invitation',
            component: dynamicWrapper(app, [], () => import('../routes/Found/Invitation/InvitationIndex')),
          },
          {
            name: '邀请好友列表',
            key: 'invitation-list',
            path: 'invitation-list',
            component: dynamicWrapper(app, [], () => import('../routes/Found/Invitation/InvitationList')),
          },

          {
            name: '安全保障',
            key: 'platform',
            path: 'platform',
            component: dynamicWrapper(app, [], () => import('../routes/Found/Platform/PlatformIndex')),
          },
        ]
      },

      //我的账户
      {
        name: '我的账户',
        key: 'account',
        path: 'account',
        children: [
          {
            name: '账户总览',
            key: 'total',
            path: '',
            isHide: true,
            userType: 'all',
            component: dynamicWrapper(app, [], () => import('../routes/Account/AccountIndex')),
          },
          {
            name: '资产详情',
            key: 'asset',
            path: 'asset',
            isHide: true,
            userType: 'all',
            component: dynamicWrapper(app, [], () => import('../routes/Account/AssetManage/AccountAssets')),
          },
          {
            name: '邀请好友',
            key: 'invite',
            path: 'invite',
            isHide: true,
            userType: 'all',
            component: dynamicWrapper(app, [], () => import('../routes/Account/InviteManage/Record')),
          },
          {
            name: '我的优惠卷',
            key: 'coupons',
            path: 'coupons',
            isHide: true,
            userType: 'all',
            component: dynamicWrapper(app, [], () => import('../routes/Account/CouponsManage/CouponsList')),
          },
          {
            name: '优惠卷使用规则',
            key: 'coupons-desc',
            path: 'coupons-desc',
            isHide: true,
            userType: 'all',
            component: dynamicWrapper(app, [], () => import('../routes/Account/CouponsManage/CouponsDesc')),
          },
          {
            name: '交易记录',
            key: 'record',
            path: 'record',
            isHide: true,
            userType: 'all',
            component: dynamicWrapper(app, [], () => import('../routes/Account/AssetManage/Record')),
          },
          {
            name: '我的信息',
            key: 'info-manage',
            path: 'info-manage',
            isHide: true,
            userType: 'all',
            children: [
              {
                name: '个人信息',
                key: 'personal',
                path: 'personal',
                exact: true,
                userType: 'all',
                component: dynamicWrapper(app, [], () => import('../routes/Account/InfoManage/Personal')),
              },

              {
                name: '银行信息',
                key: 'bank-manage',
                path: 'bank-manage',
                userType: '1',
                component: dynamicWrapper(app, [], () => import('../routes/Account/InfoManage/BankManage')),
              },
              {
                name: '风险评估',
                key: 'risk-manage',
                path: 'risk-manage',
                userType: '1',
                component: dynamicWrapper(app, [], () => import('../routes/Account/InfoManage/RiskManage')),
              },
              {
                name: '风险评估结果',
                key: 'risk-result',
                path: 'risk-result',
                userType: '1',
                component: dynamicWrapper(app, [], () => import('../routes/Account/InfoManage/RiskResult')),
              },
              {
                name: '站内信息',
                key: 'message-manage',
                path: 'message-manage',
                userType: 'all',
                component: dynamicWrapper(app, [], () => import('../routes/Account/InfoManage/MessageManage')),
              },
            ]
          }
        ]
      },

      //结果页
      {
        name: '结果页',
        key: 'result',
        path: 'result',
        isHide: true,
        children: [
          {
            name: '开户成功',
            key: 'kaihu-result',
            path: 'kaihu-result',
            component: dynamicWrapper(app, [], () => import('../routes/Result/KaihuResult')),
          },
          {
            name: '激活成功',
            key: 'jihuo-result',
            path: 'jihuo-result',
            component: dynamicWrapper(app, [], () => import('../routes/Result/JihuoResult')),
          },
          {
            name: '充值成功',
            key: 'cz-result',
            path: 'cz-result',
            component: dynamicWrapper(app, [], () => import('../routes/Result/CzResult')),
          },
          {
            name: '提现成功',
            key: 'tx-result',
            path: 'tx-result',
            component: dynamicWrapper(app, [], () => import('../routes/Result/TxResult')),
          },
          {
            name: '银行卡绑卡成功',
            key: 'bank-add',
            path: 'bank-add',
            component: dynamicWrapper(app, [], () => import('../routes/Result/BankcardAdd')),
          },
          {
            name: '银行卡解绑成功',
            key: 'bank-remove',
            path: 'bank-remove',
            component: dynamicWrapper(app, [], () => import('../routes/Result/BankcardRemove')),
          },
          {
            name: '智享出借成功',
            key: 'zxfw-result',
            path: 'zxfw-result',
            component: dynamicWrapper(app, [], () => import('../routes/Result/ZxfwResult')),
          },
          {
            name: '出借成功',
            key: 'lend-result',
            path: 'lend-result',
            component: dynamicWrapper(app, [], () => import('../routes/Result/LendResult')),
          },
          {
            name: '债转成功',
            key: 'lend-result',
            path: 'zhaiquan-result',
            component: dynamicWrapper(app, [], () => import('../routes/Result/ZhaiquanResult')),
          },
        ]
      },
      //活动专区
      {
        name: '活动专区',
        key: 'hdzq',
        path: 'hdzq',
        isHide: true,
        exact: true,
        children: [
        /*  {
            name: '邀请有礼-荐者有份',
            key: 'yaoqing-201901',
            path: 'yaoqing-201901',
            exact: true,
            component: dynamicWrapper(app, [], () => import('../routes/Hdzq/Yaoqing/Yaoqing201901/Yaoqing201901')),
          },*/
          {
            name: '邀友送红包、iPhone Xs',
            key: 'yaoqing-201902',
            path: 'yaoqing-201902',
            exact: true,
            component: dynamicWrapper(app, [], () => import('../routes/Hdzq/Yaoqing/Yaoqing201902/Yaoqing201902')),
          },
          {
            name: 'banner-银行存管',
            key: 'bankdepositor',
            path: 'bankdepositor',
            exact: true,
            component: dynamicWrapper(app, [], () => import('../routes/Hdzq/Bankdepositor')),
          },
          {
            name: 'banner-安心签',
            key: 'electronic',
            path: 'electronic',
            exact: true,
            component: dynamicWrapper(app, [], () => import('../routes/Hdzq/Electronic')),
          },
          {
            name: 'banner-等级保护',
            key: 'safeguard',
            path: 'safeguard',
            exact: true,
            component: dynamicWrapper(app, [], () => import('../routes/Hdzq/Safeguard')),
          },
        ]
      },
      //其它
      {
        name: 'App下载',
        key: 'download',
        path: 'download',
        component: dynamicWrapper(app, [], () => import('../routes/Other/Download')),
      },
      {
        name: '晒回报',
        key: 'share-shouyi',
        path: 'share-shouyi',
        isHide: true,
        component: dynamicWrapper(app, [], () => import('../routes/Other/Share')),
      },
      {
        name: '常见问题',
        key: 'question',
        path: 'question',
        isHide: true,
        component: dynamicWrapper(app, [], () => import('../routes/Other/Question')),
      },
      {
        name: '协议',
        key: 'xieyi',
        path: 'xieyi/:oid',
        isHide: true,
        component: dynamicWrapper(app, [], () => import('../routes/Other/Xieyi')),
      },

      {
        name: '示例',
        key: 'demo',
        path: 'demo',
        isHide: true,
        component: dynamicWrapper(app, [], () => import('../routes/Other/Demo')),
      },
    ]
  },
];

export default BaseRoutes
