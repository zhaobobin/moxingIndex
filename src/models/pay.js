import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';
import { post, get } from '~/utils/request';
import {ENV, Storage, getUrlParams} from '~/utils/utils';
import qs from 'qs'

export default {

  namespace: 'pay',

  state: {

    orderInfo: {                //订单
      order_no: '',
      order_amount: '',
    },

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
    //修改订单信息
    changeOrderInfo(state, {payload}){
      return {
        ...state,
        orderInfo: payload,
      };
    },
  },

};
