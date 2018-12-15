import React from 'react';
import { connect } from 'dva';
import { Form, Radio,Button } from 'antd';
import styles from './RiskManage.less'
import { ENV, Storage } from '~/utils/utils';
import { Redirect, routerRedux } from 'dva/router';
const RadioGroup = Radio.Group;
const FormItem = Form.Item;

@connect(state => ({
  global: state.global,
}))
@Form.create()
export default class RiskManage extends React.Component {
  constructor(props){
    super(props);
    this.ajaxFlag = true;
    this.state = {
      Appraisal:[
        {
          id:1,
          'title':'您的年龄:',
          'RadioGroup':[
            {'value':'1-1','content':'18-25周岁','score':1},
            {'value':'1-2','content':'26-35周岁','score':3},
            {'value':'1-3','content':'36-50周岁','score':5},
            {'value':'1-4','content':'51-65周岁','score':7},
            {'value':'1-5','content':'66周岁以上','score':0}
          ]
        },
        {
          id:2,
          'title':'您的最高学历:',
          'RadioGroup':[
            {'value':'2-1','content':'硕士研究生及同等学历以上','score':7},
            {'value':'2-2','content':'大学本科','score':5},
            {'value':'2-3','content':'大专','score':3},
            {'value':'2-4','content':'高中/中专','score':1}
          ]
        },
        {
          id:3,
          'title':'您的家庭可支配年收入是多少?',
          'RadioGroup':[
            {'value':'3-1','content':'10万元以下','score':1},
            {'value':'3-2','content':'10-30万元','score':3},
            {'value':'3-3','content':'30万-60万','score':5},
            {'value':'3-4','content':'60万-100万','score':7},
            {'value':'3-5','content':'100万以上','score':9}
          ]
        },
        {
          id:4,
          'title':'您愿意拿出多少比例的家庭存款进行投资:',
          'RadioGroup':[
            {'value':'4-1','content':'80-100%','score':2},
            {'value':'4-2','content':'50-80%','score':4},
            {'value':'4-3','content':'20-50%','score':6},
            {'value':'4-4','content':'10-20%','score':8},
            {'value':'4-5','content':'0-10%','score':10}

          ]
        },
        {
          id:5,
          'title':'您是否有投资经历，投资时间是多长:',
          'RadioGroup':[
            {'value':'5-1','content':'无任何出借经验','score':0},
            {'value':'5-2','content':'1年以下','score':1},
            {'value':'5-3','content':'1年-3年','score':3},
            {'value':'5-4','content':'3年-5年','score':5},
            {'value':'5-5','content':'5年以上','score':7}
          ]
        },
        {
          id:6,
          'title':'您的投资经营可描述为:',
          'RadioGroup':[
            {'value':'6-1','content':'除银行储蓄外，基本没有其他投资经验','score':1},
            {'value':'6-2','content':'购买过债券、保险等理财产品','score':3},
            {'value':'6-3','content':'参与过股票、基金等产品的交易','score':5},
            {'value':'6-4','content':'参与过权证、期货、期权等产品的交易','score':7}
          ]
        },
        {
          id:7,
          'title':'您期望的出借期限:',
          'RadioGroup':[
            {'value':'7-1','content':'3个月以下','score':1},
            {'value':'7-2','content':'3-6个月','score':3},
            {'value':'7-3','content':'7-12个月','score':5},
            {'value':'7-4','content':'12个月以上','score':7}
          ]
        },
        {
          id:8,
          'title':'您认为自己能承受的最大投资收益损失是多少:',
          'RadioGroup':[
            {'value':'8-1','content':'10%以内','score':0},
            {'value':'8-2','content':'10%-30%','score':2},
            {'value':'8-3','content':'30%-50%','score':4},
            {'value':'8-4','content':'超过50%','score':6}
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
    },()=>{
    })
  };

  /*提交*/
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        /*分数求和*/
        this.jiekou();
      }
    });
  };
  /*接口*/
  jiekou(){
    if(!this.ajaxFlag) return;
    this.ajaxFlag = false;

    let num=0;
    let questions=this.state.questions;
    questions.forEach((val,key)=>{
      num += val.question.score;
    });
    let { userId } = this.props.global.currentUser.userInfo;
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
          this.props.dispatch(routerRedux.push('/account/info-manage/risk-result'))
        } else{
         alert('错误')
        }
        this.ajaxFlag = true;
      }
    })
  }

  Back=(index)=>{
    // console.log(index)
  };

  render(){
    const { cusType }=this.props.global.currentUser.userInfo;
    const Appraisal=this.state.Appraisal;
      console.log(this.props.global)
    return(
    <div>

      <div className={styles.container}>

        <p className={styles.navTitle}>尊敬的出借者:<br/>
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
                    <div key={index} className={styles.topicBox}>

                      <p className={styles.number}>
                        <span className={styles.Qid}>{item.id}</span>
                        <span className={styles.AllQid}>/14</span>
                      </p>

                      <p className={styles.title}>{item.title}</p>

                      <RadioGroup onChange={this.onChange}>
                        {
                          item.RadioGroup.map((cont,number)=>{
                            return(
                              <div key={number} className={styles.RadioBox}>
                                <Radio className={styles.radioStyle} value={cont.value} key={number}>
                                  {cont.content}
                                </Radio>
                              </div>
                            )
                          })
                        }
                      </RadioGroup>

                      <p className={styles.flipOver} onClick={this.Back(index)} style={{'display':'none'}}>上一页</p>

                    </div>
                  )
                })
              }
            </FormItem>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.btn + " " + styles.submit}
              style={{borderRadius: 0}}
            >
              提交
            </Button>
          </Form>
        </div>

      </div>

    </div>



    )
  }

}
