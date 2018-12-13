/**
 * 出借与借款
 */
import React from 'react';
import { connect } from 'dva';
import { Collapse } from 'antd';
import styles from './HelpCenter.less';

@connect(state => ({
  global: state.global,
}))

class HelpLending extends React.Component {

 constructor(props) {
    super(props);
    this.ajaxFlag = true;
    this.state = {
      LendApi: '/api/home/pc/findHelpCenterList?helpType=1',
      LendList:[]
    };
  }
  componentDidMount(){
    this.getSafeData();
  }
  getSafeData=()=>{
    let {LendApi,LendList} = this.state;
    if(!this.ajaxFlag) return;
    this.ajaxFlag = false;
    this.props.dispatch({
      type: 'global/post',
      url: LendApi,
      payload:{

      },
      callback: (res) => {
        this.ajaxFlag = true;
        if(res.code === 0){
          this.setState({LendList:res.data.list})
          console.log(res.data.list)
        }
      }
    })
  }
  render(){
  	const Panel = Collapse.Panel;
    const {LendList} = this.state;
    return(
      <div className={styles.helplogin}>
        {
          LendList.length > 0 ?
            <Collapse bordered={false} defaultActiveKey={['0']} accordion>
             
              {
                LendList.map((data, index) => {
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
export default HelpLending;
