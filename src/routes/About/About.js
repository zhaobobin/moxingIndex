import React from 'react'
import { Row, Col } from 'antd'
import ArticleDetail from '~/components/Article/ArticleDetail'
import AboutHtml from './AboutHtml'

export default class Privacy extends React.Component{

  render(){

    const detail = {
      title: '关于我们',
      content: AboutHtml
    };

    return(
      <div>

        <Row>

          <Col xs={1} sm={2} md={4} lg={4}/>

          <Col xs={22} sm={20} md={16} lg={16}>

            <ArticleDetail hideHead={true} detail={detail}/>

          </Col>

          <Col xs={1} sm={2} md={4} lg={4}/>

        </Row>

      </div>
    )
  }

}
