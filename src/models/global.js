import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';
import request from '~/utils/request';
import {ENV, Storage, getUrlParams} from '~/utils/utils';

export default {

  namespace: 'global',

  state: {

    loading: true,             //全局loading状态

    isAuth: false,               //是否已登录

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
            loading: false,
            isAuth: true,
            userInfo: res.data,
          }
        });
      }

    },

    *login({ payload, callback }, { call, put }) {

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
            loading: false,
            isAuth: true,
            userInfo: res.data,
          }
        });
      }

    },

    *token({ payload, callback }, { call, put }) {

      if(payload.refreshToken){
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
              loading: false,
              isAuth: true,
              userInfo: res.data,
            }
          });
        }else{
          yield put({
            type: 'changeLoginStatus',
            payload: {
              loading: false,
              isAuth: false,
              userInfo: '',
            }
          });
        }
      }else{
        yield put({ type: 'changeLoading', payload: false });
      }

    },

    *logout({ payload, callback }, { call, put }) {
      Storage.remove(ENV.storageAccessToken);              //删除token
      Storage.remove(ENV.storageRefreshToken);              //删除token
      yield put({
        type: 'changeLoginStatus',
        payload: {
          isAuth: false,
          userInfo: '',
        }
      });
      yield callback();
      yield put(routerRedux.push({ pathname: '/' }));
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

      //登录过期等
      if(res.code > 1001000){

        const paramsObj = getUrlParams() || '';

        Storage.remove(ENV.storageAccessToken);               //删除token
        Storage.remove(ENV.storageRefreshToken);              //删除token
        Toast.info(res.message, 2);
        yield put({
          type: 'changeLoginStatus',
          payload: {
            isAuth: false,
            userInfo: '',
          }
        });
        //app平台套用，不跳转登录
        if(paramsObj.platform !== 'app') {
          yield put(routerRedux.push({ pathname: '/user/login' }));
        }

      }else{
        yield callback(res);
        if(res.code === -1){
          Toast.info(res.message, 2);
          //yield put(routerRedux.push({ pathname: '/page500' }));
        }
      }

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
        loading: payload.loading,
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
        loading: false,
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
