import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';
import { post, get } from '~/utils/request';
import {ENV, Storage, getUrlParams} from '~/utils/utils';
import qs from 'qs'

export default {

  namespace: 'pay',

  state: {

    client_ip: ''

  },

  subscriptions: {

  },

  effects: {

    *wechat({ payload, callback }, { call, put }) {

      // const res = yield call(
      //   (params) => {return post('https://api.mch.weixin.qq.com/pay/unifiedorder', {body: params})},
      //   payload
      // );
      const options = {
        method: 'POST',
        header: {
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
        }
      }
      const res = yield fetch('https://api.mch.weixin.qq.com/pay/unifiedorder', options)
        .then()
      yield callback(res);

    },

    *ali({ payload, callback }, { call, put }) {

      const res = yield call(
        (params) => {return post('', {body: params})},
        payload
      );
      yield callback(res);

    },

  },

  reducers: {
    changeLoading(state, {payload}){
      return {
        ...state,
        loading: payload
      }
    },
    saveClientIp(state, {payload}){
      const client_ip = qs.parse(payload.split(' = ')[1])
      console.log(client_ip)
      return {
        ...state,
        client_ip
      }
    }
  },

};
