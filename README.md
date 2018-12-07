# 去投网-移动端 2.0

## 路由

#### 结果页

开户成功：/result/kaihu-result

充值成功：/result/cz-result

提现成功：/result/tx-result

绑定银行卡：/result/bank-add

解绑银行卡：/result/bank-remove

智享出借成功：/result/zxfw-result

出借成功：/result/lend-result

债转成功：/result/zhaiquan-result

#### 发现

发现首页： /found

下载页面： /found/download

活动列表： /found/activity-list

#### 风险测评

风险评测（答题）：/account/info-manage/risk-manage

风险评测（结果）：/account/info-manage/risk-result

#### 协议

注册协议： /user/register-xieyi


## 页面跳转动作 http://m.qutouwang.com/result/zxfw-result?action=qtw_lend

```
  export default {
    look: {
      name: '查看记录相关',
      action: 'qtw_look'
    },
    lend: {
      name: '立即出借/继续出借',
      action: 'qtw_lend'
    },
    open: {
      name: '开户',
      action: 'qtw_open'
    },
    addcard: {
      name: '绑卡',
      action: 'qtw_addcard'
    },
    removecard: {
      name: '解绑卡',
      action: 'qtw_removecard'
    },
    cz: {
      name: '充值',
      action: 'qtw_cz'
    },
    tx: {
      name: '提现',
      action: 'qtw_tx'
    }
  }
```
