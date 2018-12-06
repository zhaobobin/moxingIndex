/**
 * 名词解释
 */
import React from 'react';
import { connect } from 'dva';
import { Collapse } from 'antd';
import styles from './HelpCenter.less';

@connect(state => ({
  global: state.global,
}))

class HelpNoun extends React.Component {

  constructor(props) {
    super(props);
    this.ajaxFlag = true;
    this.state = {
      NounApi: '/api/home/pc/findHelpCenterList?helpType=3',
      NounList:[]
    };
  }
  componentDidMount(){
    this.getSafeData();
  }
  getSafeData=()=>{
    let {NounApi,NounList} = this.state;
    if(!this.ajaxFlag) return;
    this.ajaxFlag = false;
    this.props.dispatch({
      type: 'global/post',
      url: NounApi,
      payload:{

      },
      callback: (res) => {
        this.ajaxFlag = true;
        if(res.code === 0){
          this.setState({NounList:res.data.list})
          console.log(res.data.list)
        }
      }
    })
  }
  render(){
    const {NounList} = this.state;
const Panel = Collapse.Panel;
    return(
      <div className={styles.helplogin}>
        {
          NounList.length > 0 ?
            <Collapse bordered={false} defaultActiveKey={['0']} accordion>
              {/*  <Panel header="01 我是否可以出借？" key="1">
            {text}
          </Panel>*/}
              {
                NounList.map((data, index) => {
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
export default HelpNoun;
