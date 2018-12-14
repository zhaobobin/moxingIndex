/**
 * 充值与提现
 */
import React from 'react';
import { connect } from 'dva';
import { Collapse } from 'antd';
import styles from './HelpCenter.less';

@connect(state => ({
  global: state.global,
}))

class HelpCash extends React.Component {
constructor(props) {
    super(props);
    this.ajaxFlag = true;
    this.state = {
      CzApi: '/api/home/pc/findHelpCenterList?helpType=2',
      CzList:[]
    };
  }
  componentDidMount(){
    this.getSafeData();
  }
  getSafeData=()=>{
    let {CzApi,CzList} = this.state;
    if(!this.ajaxFlag) return;
    this.ajaxFlag = false;
    this.props.dispatch({
      type: 'global/post',
      url: CzApi,
      payload:{

      },
      callback: (res) => {
        this.ajaxFlag = true;
        if(res.code === 0){
          this.setState({CzList:res.data.list})
          console.log(res.data.list)
        }
      }
    })
  }
  render(){
  	const Panel = Collapse.Panel;
    const {CzList} = this.state;
    return(
      <div className={styles.helplogin}>
        {
          CzList.length > 0 ?
            <Collapse bordered={false} defaultActiveKey={['0']} accordion>              
              {
                CzList.map((data, index) => {
                  return (<Panel key={index} header={data.title}><div dangerouslySetInnerHTML={{ __html: data.content }} /></Panel>)
                })
              }

            </Collapse>
            :
            "暂无内容"
        }
      </div>
    )
  }

}
export default HelpCash;
