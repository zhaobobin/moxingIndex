import React from 'react';
import { Icon } from 'antd';
import Pdf from 'react-pdf-js';
import { getUrlParams } from '~/utils/utils';
import styles from './RenderPdf.less'

import LoadingBg from '~/components/Common/LoadingBg'

export default class RenderPdf extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      loading: true,
      page: 1,
      pages: 1,
    };
  }

  onDocumentComplete = (pages) => {
    this.setState({ loading: false, page: 1, pages });
  };

  handlePrevious = () => {
    let page = this.state.page - 1;
    if(page < 1) page = 1;
    this.setState({ page });
  };

  handleNext = () => {
    let page = this.state.page + 1;
    if(page > this.state.pages) page = this.state.pages;
    this.setState({ page });
  };

  renderPagination = (page, pages) => {

    return (
      <ul className={styles.pagination}>

        <li
          className={styles.prev}
          onClick={this.handlePrevious}
        >
          <a className={page === 1 ? styles.disabled : null}>
            <Icon type="left" />
            <span>上一页</span>
          </a>
        </li>

        <li
          className={styles.next}
          onClick={this.handleNext}
        >
          <a className={page === pages ? styles.disabled : null}>
            <span>下一页</span>
            <Icon type="right" />
          </a>
        </li>

      </ul>
    );
  };

  render(){

    const { loading, page, pages } = this.state;
    const url = getUrlParams().url;

    return(
      <div className={styles.pdf}>
        {
          loading ?
            <LoadingBg style={{height: 'auto', position: 'fixed', left: 0, top: 0, right: 0, bottom: 0, zIndex: 99}}/>
            :
            null
        }
        <Pdf
          file={'https://metuwang.oss-cn-qingdao.aliyuncs.com/20190319014528015-yvafx5jezzzd.pdf'}
          onDocumentComplete={this.onDocumentComplete}
          page={page}
        />
        {pages ? this.renderPagination(page, pages) : null}
      </div>
    )

  }

}
