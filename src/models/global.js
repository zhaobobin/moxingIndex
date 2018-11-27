import { routerRedux } from 'dva/router';
import { notification } from 'antd';
import request from '~/utils/request';
import {ENV, Storage} from '~/utils/utils';

export default {

  namespace: 'global',

  state: {

    loading: false,             //全局loading状态

    isAuth: null,               //是否已登录

    currentUser: {              //当前账户
      userInfo: {},             //用户信息
      assetInfo: {},            //资产信息
      bankInfo: {},             //银行信息
    },

    navData: [],                //导航菜单

    kaihuInfo: {                //开户专用
      userId: '',               //用户id
      cifName: '',              //姓名
      idNum: '',                //身份证号
      authAmt: '',              //授权金额（元）
      authDue: '',              //授权期限（月）
      equipmentType: 'pc'
    }

  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *register({ payload, callback }, { call, put }) {

      yield put({ type: 'changeLoading', payload: true });

      const res = yield call(
        (params) => {return request('/api/userRegister/pc/register', {method: 'POST', body: params})},
        payload
      );
      yield callback(res);
      if(res.code === 0){
        Storage.set(ENV.storageAccessToken, res.data.access_token);               //保存token
        Storage.set(ENV.storageRefreshToken, res.data.refresh_token);             //保存token
        Storage.set(ENV.storageUserId, res.data.userId);                          //保存userId
        yield put({
          type: 'changeLoginStatus',
          payload: {
            isAuth: true,
            userInfo: res.data,
          }
        });
      }

      yield put({ type: 'changeLoading', payload: false });
    },

    *login({ payload, callback }, { call, put }) {

      yield put({ type: 'changeLoading', payload: true });

      const res = yield call(
        (params) => {return request('/api/userAuth/login', {method: 'POST', body: params})},
        payload
      );
      yield callback(res);
      if(res.code === 0){
        Storage.set(ENV.storageAccessToken, res.data.access_token);               //保存token
        Storage.set(ENV.storageRefreshToken, res.data.refresh_token);             //保存token
        Storage.set(ENV.storageUserId, res.data.userId);                          //保存userId
        yield put({
          type: 'changeLoginStatus',
          payload: {
            isAuth: true,
            userInfo: res.data,
          }
        });
      }

      yield put({ type: 'changeLoading', payload: false });
    },

    *token({ payload, callback }, { call, put }) {

      yield put({ type: 'changeLoading', payload: true });

      const res = yield call(
        (params) => {return request('/api/token/refreshToken', {method: 'POST', body: params})},
        payload
      );
      yield callback(res);

      if(res.code === 0){
        Storage.set(ENV.storageAccessToken, res.data.access_token);               //保存token
        Storage.set(ENV.storageRefreshToken, res.data.refresh_token);             //保存token
        Storage.set(ENV.storageUserId, res.data.userId);                          //保存userId
        yield put({
          type: 'changeLoginStatus',
          payload: {
            isAuth: true,
            userInfo: res.data,
          }
        });
      }else{
        yield put({
          type: 'changeLoginStatus',
          payload: {
            isAuth: false,
            userInfo: '',
          }
        });
      }

      yield put({ type: 'changeLoading', payload: false });

    },

    *logout({ payload, callback }, { call, put }) {
      const res = yield call(
        (params) => {return request('/api/userAuth/logout', {method: 'POST', body: params})},
        payload
      );
      //yield callback(res);
      if(res.code === 0){
        Storage.remove(ENV.storageAccessToken);              //删除token
        Storage.remove(ENV.storageRefreshToken);              //删除token
        yield put({
          type: 'changeLoginStatus',
          payload: {
            isAuth: false,
            userInfo: '',
          }
        });
        yield put(routerRedux.push({ pathname: '/' }));
      }else{
        notification.error({
          message: '退出失败！',
          description: res.message,
        });
      }
    },

    //初始化账户 - 查询账户信息、资产信息
    *initAccount({ payload, callback }, { call, put }) {
      const res1 = yield call(
        (params) => {return request('/api/personalCenter/getPersonalCenter', {method: 'POST', body: params})},
        payload
      );
      const res2 = yield call(
        (params) => {return request('/api/personalCenterUser/getAssetDetails', {method: 'POST', body: params})},
        payload
      );
      yield callback(res2);
      if(res2.code === 0){
        yield put({
          type: 'changeAssetInfo',
          payload: {
            userInfo: res1.data,
            assetInfo: res2.data,
          }
        });
      }
    },

    //查询账户详情
    *userinfo({ payload, callback }, { call, put }) {
      const res = yield call(
        (params) => {return request('/api/personalCenter/getPersonalCenter', {method: 'POST', body: params})},
        payload
      );
      yield callback(res);
      if(res.code === 0){
        yield put({
          type: 'changeUserInfo',
          payload: res.data
        });
      }
    },

    //查询账户资产详情
    *assetinfo({ payload, callback }, { call, put }) {
      const res = yield call(
        (params) => {return request('/api/personalCenterUser/getAssetDetails', {method: 'POST', body: params})},
        payload
      );
      yield callback(res);
      if(res.code === 0){
        yield put({
          type: 'changeAssetInfo',
          payload: res.data
        });
      }
    },

    //查询账户银行卡详情
    *bankinfo({ payload, callback }, { call, put }) {
      const res = yield call(
        (params) => {return request('/api/userAccountInfo/getUserBankInfo', {method: 'POST', body: params})},
        payload
      );
      yield callback(res);
      if(res.code === 0){
        yield put({
          type: 'changeBankInfo',
          payload: res.data
        });
      }
    },

    //exp如果不为空：在查询时，先检查本地存储数据是否过期，再读取远程数据；并且在查询成功后，本地存储查询结果。
    *post({ url, payload, callback }, { call, put }) {

      //yield put({ type: 'changeLoading', payload: true });

      let res, exp = payload.exp, storage = Storage.get(url, exp);

      if(exp && storage){
        res = storage;
      }else{
        res = yield call(
          (params) => {return request(url, {method: 'POST', body: params})},
          payload
        );
        if(exp) Storage.set(url, res);
      }

      yield callback(res);

      //yield put({ type: 'changeLoading', payload: false });

      //系统异常提示
      // if(res.code === -1){
      //   notification.error({
      //     message: '失败',
      //     description: res.message
      //   })
      // }

    },

    *get({ url, payload, callback }, { call, put }) {

      //yield put({ type: 'changeLoading', payload: true });

      const res = yield call(
        (params) => {return request(url, {method: 'GET', body: params})},
        payload
      );

      yield callback(res);

      //yield put({ type: 'changeLoading', payload: false });

    },
  },

  reducers: {
    changeLoading(state, {payload}){
      return {
        ...state,
        loading: payload
      }
    },
    saveNavData(state, {payload}) {
      return {
        ...state,
        navData: payload
      };
    },
    changeLoginStatus(state, {payload}){
      return {
        ...state,
        isAuth: payload.isAuth,
        currentUser: {
          ...state.currentUser,
          userInfo: payload.userInfo
        },
      };
    },
    //开户信息
    changeKaihuInfo(state, {payload}){
      return {
        ...state,
        kaihuInfo: {
          ...state.kaihuInfo,
          ...payload
        },
      };
    },
    //修改账户信息
    changeAccountInfo(state, {payload}){
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          userInfo: Object.assign(state.currentUser.userInfo, payload.userInfo),
          assetInfo: payload.assetInfo
        },
      };
    },
    //修改用户信息
    changeUserInfo(state, {payload}){
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          userInfo: Object.assign(state.currentUser.userInfo, payload)
        },
      };
    },
    //修改资产信息
    changeAssetInfo(state, {payload}){
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          assetInfo: payload
        },
      };
    },
    //修改银行信息
    changeBankInfo(state, {payload}){
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          bankInfo: payload
        },
      };
    },
  },

};
