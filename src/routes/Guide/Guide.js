import React from 'react'
import { Row, Col } from 'antd'
import ArtivleDetail from '~/components/Article/ArticleDetail'
import GuideHtml from './GuideHtml'

export default class Guide extends React.Component{

  goBack = () => {
    this.props.history.goBack();
  };

  render(){

    const detail = {
      title: '用户说明',
      content: GuideHtml
    };

    return(
      <div>

        <Row>

          <Col xs={1} sm={2} md={4} lg={4}/>

          <Col xs={22} sm={20} md={16} lg={16}>

            <div style={{marginTop: '15px', padding: '0 15px'}}>
              <a onClick={this.goBack}>返回</a>
            </div>

            <ArtivleDetail hideHead={true} detail={detail}/>

          </Col>

          <Col xs={1} sm={2} md={4} lg={4}/>

        </Row>

      </div>
    )
  }

}
