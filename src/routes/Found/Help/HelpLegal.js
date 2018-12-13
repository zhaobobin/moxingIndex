/**
 * 法律声明
 */
import React from 'react';
import { connect } from 'dva';
import { Collapse } from 'antd';
import styles from './HelpCenter.less';

@connect(state => ({
  global: state.global,
}))

class HelpLegal extends React.Component {
 constructor(props) {
    super(props);
    this.ajaxFlag = true;
    this.state = {
      LawApi: '/api/home/pc/findHelpCenterList?helpType=4',
      LawList:[]
    };
  }
  componentDidMount(){
    this.getSafeData();
  }
  getSafeData=()=>{
    let {LawApi,LawList} = this.state;
    if(!this.ajaxFlag) return;
    this.ajaxFlag = false;
    this.props.dispatch({
      type: 'global/post',
      url: LawApi,
      payload:{

      },
      callback: (res) => {
        this.ajaxFlag = true;
        if(res.code === 0){
          this.setState({LawList:res.data.list})
          console.log(res.data.list)
        }
      }
    })
  }
  render(){
  	const Panel = Collapse.Panel;
    const {LawList} = this.state;
    return(
      <div className={styles.helplogin}>
        {
          LawList.length > 0 ?
            <Collapse bordered={false} defaultActiveKey={['0']} accordion>             
              {
                LawList.map((data, index) => {
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
export default HelpLegal;
