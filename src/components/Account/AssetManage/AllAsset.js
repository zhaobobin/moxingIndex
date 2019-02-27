/*出借数据*/
import React from 'react';
import styles from './Asset.less';


const AllAsset =({data})=> {

  return (
    <div className={styles.AssetBox}>
      {
        data.map((item,index)=>{
          return(
            <div key={index}>
              <p className={styles.TimeP}>{item.year}-{item.month}</p>
              <ul>
              {
                item.monthData.map((list,index)=>{
                  return(
                      <li key={index}>
                        <div className={styles.LeftBox}>
                          <p>{list.cashMode}</p>
                          <p>{list.flowTime}</p>
                        </div>
                        <div className={styles.RightBox}>
                          <p className={list.flowAmout>0?styles.color:styles.color2}>{list.flowAmout}</p>
                          <p>账户可用余额：{list.curFreeAmt}</p>
                        </div>
                      </li>
                  )
                })
              }
              </ul>
            </div>
          )
        })
      }
    </div>
  )
};
export default  AllAsset;
