import qs from 'qs'
import wechat from '~/config/wechat'
import { sort_ASCII } from '~/utils/utils'
const CryptoJS = require('crypto-js');

// 生成签名
export function getSign (data) {

  data.appid = wechat.appid;
  data.mch_id = wechat.mch_id;
  data = sort_ASCII(data);

  const SignTemp = qs.stringify(data) + wechat.key;
  data.sign = CryptoJS.MD5(SignTemp).toString();

  return data;

}