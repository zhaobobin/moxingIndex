/**
 * 安全与隐私
 */
import React from 'react';
import { connect } from 'dva';
import { Collapse } from 'antd';
import styles from './HelpCenter.less';

@connect(state => ({
  global: state.global,
}))

class HelpSecurity extends React.Component {

  constructor(props) {
    super(props);
    this.ajaxFlag = true;
    this.loading = true;
    this.state = {
      list: []
    };
  }
  componentDidMount(){
    this.getHelpList();
  }

  getHelpList(){
    this.props.dispatch({
      type: 'global/post',
      url: '/api/home/pc/findHelpCenterList?helpType=0',
      payload:{},
      callback: (res) => {
        this.loading = false;
        if(res.code === 0){
          this.setState({list: res.data.list})
        }
      }
    })
  }

  render(){
const Panel = Collapse.Panel;
    const {list} = this.state;
    return(
      <div className={styles.helplogin}>
        {
          this.loading ?
            "暂无内容"
            :

            <Collapse bordered={false} defaultActiveKey={['0']} accordion>
              {
                list.map((data, index) => (
                  <Panel key={index} header={data.title}>
                    <div dangerouslySetInnerHTML={{ __html: data.content }} />
                  </Panel>
                ))
              }
            </Collapse>
        }
      </div>
    )
  }

}
export default HelpSecurity;
