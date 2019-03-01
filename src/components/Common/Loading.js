/**
 * loading
 */
import React from 'react';
import { Spin } from 'antd';

const Loading = () => {
  return(
    <div style={{padding: '50px', textAlign: 'center'}}>
      <Spin size="large" delay={200}/>
    </div>
  )
};

export default Loading;
