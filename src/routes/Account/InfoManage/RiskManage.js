import React from 'react';
import { connect } from 'dva';
import { Form, Radio,Button } from 'antd';
import styles from './RiskManage.less'
import { ENV, Storage } from '~/utils/utils';
import {  routerRedux } from 'dva/router';
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
@connect(state => ({
  global: state.global,
}))
@Form.create()
export default class RiskManage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      Appraisal:[
        {
          id:1,
          'title':'您的年龄:',
          'RadioGroup':[
            {'value':'1-1','content':'18-25周岁','score':1},
            {'value':'1-2','content':'26-35周岁','score':2},
            {'value':'1-3','content':'36-50周岁','score':3},
            {'value':'1-4','content':'66周岁以上','score':4}
          ]
        },
        {
          id:2,
          'title':'您的最高学历:',
          'RadioGroup':[
            {'value':'2-1','content':'硕士研究生及以上','score':1},
            {'value':'2-2','content':'大学本科/专科','score':2},
            {'value':'2-3','content':'高中/中专','score':3},
            {'value':'2-4','content':'初中及以下','score':4}
          ]
        },
        {
          id:3,
          'title':'您的职业/收入:',
          'RadioGroup':[
            {'value':'3-1','content':'固定职业，收入稳定，变化不大','score':1},
            {'value':'3-2','content':'固定职业，以佣金收入为主','score':2},
            {'value':'3-3','content':'自由职业','score':3},
            {'value':'3-4','content':'创业者或企业主','score':4}
          ]
        },
        {
          id:4,
          'title':'您期望的出借期限:',
          'RadioGroup':[
            {'value':'4-1','content':'2个月及以下','score':1},
            {'value':'4-2','content':'3-6个月','score':2},
            {'value':'4-3','content':'7-12个月','score':3},
            {'value':'4-4','content':'13个月及以上','score':4}
          ]
        },
        {
          id:5,
          'title':'您出借的目的是:',
          'RadioGroup':[
            {'value':'5-1','content':'出借保值，我不愿意承担任何出借风险','score':1},
            {'value':'5-2','content':'资产在保值的基础上，有小幅度增长，我可以承担较低的出借风险','score':2},
            {'value':'5-3','content':'资产稳健增长，我可以承担一定的出借风险','score':3},
            {'value':'5-4','content':'资产迅速增长，我愿意承担较大的出借风险','score':4}
          ]
        },
        {
          id:6,
          'title':'您的健康状况是:',
          'RadioGroup':[
            {'value':'6-1','content':'良好','score':1},
            {'value':'6-2','content':'一般','score':2},
            {'value':'6-3','content':'较差','score':3},
            {'value':'6-4','content':'差','score':4}
          ]
        },
        {
          id:7,
          'title':'您的出借经验年限是（包括但不限于基金、股票、银行产品、黄金、期货等）:',
          'RadioGroup':[
            {'value':'7-1','content':'无任何出借经验','score':1},
            {'value':'7-2','content':'1年（不含）以下','score':2},
            {'value':'7-3','content':'1年（含）-3年（不含）','score':3},
            {'value':'7-4','content':'3年（含）以上','score':4}
          ]
        },
        {
          id:8,
          'title':'您的风险承受能力符合以下哪种？',
          'RadioGroup':[
            {'value':'8-1','content':'厌恶风险，不愿意承受本金的损失','score':1},
            {'value':'8-2','content':'虽然厌恶风险但愿意承担一些风险，可以承受本金10%以内的损失','score':2},
            {'value':'8-3','content':'在深思熟虑后承担一定的风险，可以承受本金30%以内的损失','score':3},
            {'value':'8-4','content':'以充分知晓网贷风险，敢冒风险，可以承受本金损失超过30%','score':4}
          ]
        },
        {
          id:9,
          'title':'以下几种投资模式，您更偏好哪种模式:',
          'RadioGroup':[
            {'value':'9-1','content':'回报只有5%，但不亏损','score':1},
            {'value':'9-2','content':'回报在15%左右，但可能亏损5%','score':2},
            {'value':'9-3','content':'回报在30%左右，但可能亏损15%','score':3},
            {'value':'9-4','content':'回报在50%左右，但可能亏损30%','score':4}
          ]
        },
        {
          id:10,
          'title':'您的家庭年度收入为（以人民币计算）:',
          'RadioGroup':[
            {'value':'10-1','content':'10（不含）万元以下','score':1},
            {'value':'10-2','content':'10（含）-30（不含）万元','score':2},
            {'value':'10-3','content':'30（含）-50（不含）万元','score':3},
            {'value':'10-4','content':'50（含）-100（不含）万元','score':4},
            {'value':'10-5','content':'100（含）万元以上','score':5}

          ]
        },
        {
          id:11,
          'title':'在您每年的家庭收入中，可用于出借的比例为:',
          'RadioGroup':[
            {'value':'11-1','content':'小于10%（不含）','score':1},
            {'value':'11-2','content':'10%（含）至25%（不含）','score':2},
            {'value':'11-3','content':'25%（含）至50%（不含）','score':3},
            {'value':'11-4','content':'大于50%（含）','score':4}
          ]
        },
        {
          id:12,
          'title':'您的家庭可出借资产状态为（以人民币计算）:',
          'RadioGroup':[
            {'value':'12-1','content':'20（不含）万元以下','score':1},
            {'value':'12-2','content':'20（含）-50（不含）万元','score':2},
            {'value':'12-3','content':'50（含）-100（不含）万元','score':3},
            {'value':'12-4','content':'100（含）-600（不含）万元','score':4},
            {'value':'12-5','content':'600（含）万元以上','score':5}

          ]
        },
        {
          id:13,
          'title':'您目前使用过几家P2P平台进行出借？',
          'RadioGroup':[
            {'value':'13-1','content':'从未使用过','score':1},
            {'value':'13-2','content':'1家','score':2},
            {'value':'13-3','content':'2家','score':3},
            {'value':'13-4','content':'3家及以上','score':4}
          ]
        },
        {
          id:14,
          'title':'以下哪种资产状态符合您的实际情况？',
          'RadioGroup':[
            {'value':'14-1','content':'无自有住房和私家车','score':1},
            {'value':'14-2','content':'无自有住房，有私家车','score':2},
            {'value':'14-3','content':'有自有住房，无私家车','score':3},
            {'value':'14-4','content':'有自有住房和私家车','score':4}
          ]
        },
      ],
      value: 1,
      questions:[],
    }
  }

  /*单选按钮*/
  onChange = (e) => {
    let answer=e.target.value.split('-')
    let newArray=this.state.questions;
    let Appraisal=this.state.Appraisal
    let obj = {};
    for(let i in Appraisal ){
      if(parseInt(i)+1===parseInt(answer[0])){
        for(let j in Appraisal[i].RadioGroup){
          if(parseInt(j)+1===parseInt(answer[1])){
            obj={'question':{'value':Appraisal[parseInt(i)].RadioGroup[parseInt(j)].value,'score':Appraisal[parseInt(i)].RadioGroup[parseInt(j)].score}}
            newArray[parseInt(i)]=obj
          }
        }
      }
    }
    this.setState({
      questions:newArray
    })
  };

  /*提交*/
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        /*分数求和*/
        let { userInfo } = this.props.global.currentUser;
        this.jiekou(userInfo.userId);
      }
    });
  };
  /*接口*/
  jiekou(userId){
    let num=0;
    let questions=this.state.questions
    questions.forEach((val,key)=>{
      num += val.question.score;
    });
    this.props.dispatch({
      type: 'global/post',
      url:'/api/risk/saveRisk',
      payload:{
        userId,
        totalScore:num,
        questions: questions
      },
      callback:(res)=>{
        if(res.code === 0){
          //console.log(res)
          this.props.dispatch(routerRedux.push('/account/info-manage/risk-result'))
        } else{
        }
      }
    })
  }

  Back=(index)=>{
// console.log(index)
  }


  render(){
    const Appraisal=this.state.Appraisal

    return(

      <div className={styles.Box2}>
        <p className={styles.NavTitle}>尊敬的出借者:<br/>
          &nbsp; &nbsp; &nbsp; &nbsp;为了便于您了解自身的风险承受能力，
          选择合适的出借和服务，请您填写以下风险承受能力评估问卷，
          下列问题可协助评估您对出借和服务的风险承受能力，请您根据
          自身情况认真选择。评估结果仅供参考，不构成出借建议。为了及时了解您的风险承受能力，我们建议您
          持续做好动态评估。
        </p>
        <div className={styles.Answer}>
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              {
                Appraisal.map((item,index)=>{
                  return(
                    <div key={index} className={styles.TopicBox}>
                      <p className={styles.Topic}>
                        <span className={styles.Qid}>{item.id}</span>
                        <span className={styles.AllQid}>/14</span>
                      </p>
                      <p className={styles.Title}>{item.title}</p>
                      <RadioGroup onChange={this.onChange}>
                        {
                          item.RadioGroup.map((cont,number)=>{
                            return(
                              <div key={number} className={styles.RadioBox}>
                                <Radio className={styles.radioStyle} value={cont.value} key={number}>{cont.content}</Radio>
                              </div>
                            )
                          })
                        }
                      </RadioGroup>
                    </div>
                  )
                })
              }
            </FormItem>
              <Button type="primary" htmlType="submit"  className={styles.submit}>提交</Button>
          </Form>
        </div>

      </div>


    )
  }

}
