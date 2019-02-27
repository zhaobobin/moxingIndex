import React from 'react';

export default function LoadingBg (props) {

  const style = {
    margin: 'auto',
    width: '500px',
    height: '180px',
    background: `url(${require('~/assets/com/loading_bg.jpg')}) no-repeat center center #f8f9fb`,
    ...props.style,
  };

  return(
    <div className={props.className} style={style}/>
  )
}
