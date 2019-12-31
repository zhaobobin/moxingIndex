import React from 'react'
import GaodeMap from '~/components/Map/GaodeMap'

export default class ActivityMap extends React.Component{

  //地图回调
  mapCallback = value => {
    // this.setState({
    //   mapAddress: value.place || '',
    //   mapPosition: value.position || '',
    // })
  }

  render(){

    const mapAddress = this.props.match.params.place;

    return(
      <div id="app" style={{width: '100%', height: '100%', position: 'fixed', left: 0, top: 0}}>
        <GaodeMap defaultAddress={mapAddress} callback={this.mapCallback}/>
      </div>
    )
  }

}
