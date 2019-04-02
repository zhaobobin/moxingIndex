import React from 'react'
import { Row, Col } from 'antd'
import ArtivleDetail from '~/components/Article/ArticleDetail'
import GuideHtml from './GuideHtml'

export default class Guide extends React.Component{

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

            <ArtivleDetail hideHead={true} detail={detail}/>

          </Col>

          <Col xs={1} sm={2} md={4} lg={4}/>

        </Row>

      </div>
    )
  }

}
