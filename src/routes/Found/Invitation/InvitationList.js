import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import style from './InvitationList.less'
@connect(state => ({
  global: state.global,
}))
export default class InvitationList extends React.Component {
      constructor(props){
        super(props);
        this.ajaxFlag = true;
        this.state={
              arr:[
                { money:99.99,
                  name:'红包',
                  title:'单笔出借≥1000元可用',
                  title2:'有效期至2018-10-01',
                  title3:'单笔出借≥1000元可用',
                  title4:'智享服务，精选散标，最大长度来源于注册礼包'
                },
                { money:99.99,
                  name:'红包',
                  title:'单笔出借≥1000元可用',
                  title2:'有效期至2018-10-01',
                  title3:'单笔出借≥1000元可用',
                  title4:'智享服务，精选散标，最大长度来源于注册礼包'
                },
                { money:99.99,
                  name:'红包',
                  title:'单笔出借≥1000元可用',
                  title2:'有效期至2018-10-01',
                  title3:'单笔出借≥1000元可用',
                  title4:'智享服务，精选散标，最大长度来源于注册礼包'
                },
                { money:99.99,
                  name:'红包',
                  title:'单笔出借≥1000元可用',
                  title2:'有效期至2018-10-01',
                  title3:'单笔出借≥1000元可用',
                  title4:'智享服务，精选散标，最大长度来源于注册礼包'
                },
                { money:99.99,
                  name:'红包',
                  title:'单笔出借≥1000元可用',
                  title2:'有效期至2018-10-01',
                  title3:'单笔出借≥1000元可用',
                  title4:'智享服务，精选散标，最大长度来源于注册礼包'
                },
                { money:99.99,
                  name:'红包',
                  title:'单笔出借≥1000元可用',
                  title2:'有效期至2018-10-01',
                  title3:'单笔出借≥1000元可用',
                  title4:'智享服务，精选散标，最大长度来源于注册礼包'
                },
                { money:99.99,
                  name:'红包',
                  title:'单笔出借≥1000元可用',
                  title2:'有效期至2018-10-01',
                  title3:'单笔出借≥1000元可用',
                  title4:'智享服务，精选散标，最大长度来源于注册礼包'
                },
                { money:99.99,
                  name:'红包',
                  title:'单笔出借≥1000元可用',
                  title2:'有效期至2018-10-01',
                  title3:'单笔出借≥1000元可用',
                  title4:'智享服务，精选散标，最大长度来源于注册礼包'
                },
                { money:99.99,
                  name:'红包',
                  title:'单笔出借≥1000元可用',
                  title2:'有效期至2018-10-01',
                  title3:'单笔出借≥1000元可用',
                  title4:'智享服务，精选散标，最大长度来源于注册礼包'
                },
              ],
              type:'',
              total: null,
              list:'',
              pageNum: 1,
              pageSize: 4,
        }
      }
     /* componentDidMount(){
          if(!this.ajaxFlag) return;
          this.ajaxFlag = false;

          let {userId} = this.props.global.currentUser.userInfo;

          this.props.dispatch({
            type: 'global/post',
            url: '/api/userCoupon/h5/findUserMayUseCoupon',
            payload: {
              userId,                 //19010310321353
              pactissueNo:0,
              productType:1,
            },
            callback: (res) => {
              setTimeout(() => {this.ajaxFlag = true}, 500);
              window.scrollTo(0, 0);
              if(res.code === 0){
                this.setState({
                  loading: false,
                  total: res.data.count,
                  list: res.data.list,
                })
              }
            }
          });
        }*/


  IconClick(index,even){
        console.log(index);
        this.setState({
          type:index
        })
  }
  render(){
        const {arr,type,list}=this.state;

    return(
      <div className={style.InvitationListBox}>
        {
          arr.map((item,index)=>{
            return(
              <div className={style.ListBox} key={index} style={index===type?{height:'138px'}:{height:'115px'}}>
                  <div className={style.leftBox}>
                      <p className={style.LeftP1}>{item.money} <span>元</span></p>
                    <p className={style.LeftP2}>{item.name}</p>
                  </div>
                <div className={style.RightBox}>
                  <p className={style.RightP1}>{item.title}</p>
                  <p className={style.RightP2}>{item.title2}</p>
                  <p className={style.RightP2}>{item.title3}
                      <Icon
                        type={index===type?"up":"down"}
                        className={style.Icon}
                        onClick={this.IconClick.bind(this,index)}
                      />
                  </p>
                  <p className={style.RightP2}>{item.title4}</p>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }

}
