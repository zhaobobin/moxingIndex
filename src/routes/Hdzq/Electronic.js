//banner-安心签
import React from 'react';
import { connect } from 'dva';

//样式
import styles from './Electronic.less';

@connect(state => ({
  global: state.global,
}))
export default class Electronic extends React.Component {
  render(){  
    return(
      <div className={styles.container_2015+' '+ styles.signature}>
	
	<div className={styles.section+' '+ styles.section1} >
		<div className={styles.con}></div>
		<div className={styles.w}>
			<img src={require('../../assets/electronic/section1_bg.jpg')} />
		</div>
	</div>
	<div className={styles.section+' '+ styles.section2}>
		<div className={styles.w}>
			<div className={styles.title}>
				<h2>CFCA是什么？<i className={styles.l}></i><i className={styles.r}></i></h2>
			</div>
			<p>中国金融认证中心（CFCA）是经中国人民银行和国家信息安全管理机构批准成立的国家级权威安全认证机构，是国家重要金融信息安全的基础设施之一。目前，全国97%的银行均使用了CFCA提供的电子认证服务。</p>
			<div className={styles.img}>
				<img src={require('../../assets/electronic/section2_bg.jpg')} />
				<i></i>
			</div>
		</div>
	</div>
	<div className={styles.section +' '+ styles.section3}>
		<div className={styles.w}>
			<div className={styles.title}>
				<h2>权威机构主管<i className={styles.l}></i><i className={styles.r}></i></h2>
			</div>
			<div className={styles.img}>
				<img src={require('../../assets/electronic/section3_bg2.jpg')} />
			</div>
			<ul>
				<li className={styles.li1}><i></i><span>中国人民银行</span></li>
				<li className={styles.li2}><i></i><span>中华人民共和国工业和信息化部</span></li>
				<li className={styles.li3}><i></i><span>国家商用密码管理办公室</span></li>
				<li className={styles.li4}><i></i><span>中国银行业监督管理委员会</span></li>
				<li className={styles.li5}><i></i><span>中国信息安全测评中心</span></li>
			</ul>
		</div>
	</div>
	<div className={styles.section +' '+ styles.section4}>
		<div className={styles.w}>
			<div className={styles.title}>
				<h2>国家级安全锁<i className={styles.l}></i><i className={styles.r}></i></h2>
			</div>
			<div className={styles.img}>
				<img src={require('../../assets/electronic/section4_bg.jpg')} />
			</div>
			<ul>
				<li className={styles.li1}>
					<a>
						<i></i>
						<p>
							<strong>CFCA电子签章</strong>
							<span>CFCA电子签章是传统印章的印迹和数字证书相结合的产物。</span>
						</p>
					</a>
				</li>
				<li className={styles.li2}>
					<a>
						<i></i>
						<p>
							<strong>CFCA具有权威性</strong>
							<span>CFCA电子签章是包含用户身份、印章信息、公钥、有效期等许多相关信息的权威电子文件。</span>
						</p>
					</a>
				</li>
				<li className={styles.li3}>
					<a>
						<i></i>
						<p>
							<strong>保障出借人的权益</strong>
							<span>提供的签章服务具有可靠性、保密性、不可抵赖性、可防篡改、可校验的特征，可以更好地保障出借人的权益。</span>
						</p>
					</a>
				</li>
			</ul>
		</div>
	</div>
	<div className={styles.section+' '+ styles.section5}>
		<div className={styles.w}>
			<div className={styles.title}>
				<h2>去投网接入CFCA<i className={styles.l}></i><i className={styles.r}></i></h2>
			</div>
			<div className={styles.img}>
				<img src={require('../../assets/electronic/section5_bg.jpg')} alt="" />
			</div>
			<ul>
				<li className={styles.li1}>
					<a>
						<p className={styles.p1}>
							<i className={styles.i1}></i>
							<i className={styles.i2}></i>
						</p>
						<p className={styles.p2}>全面升级强化投资者安全保 护措施</p>
					</a>
				</li>
				<li className={styles.li2}>
					<a>
						<p className={styles.p1}>
							<i className={styles.i1}></i>
							<i className={styles.i2}></i>
						</p>
						<p className={styles.p2}>提供全方位立体化的IT信息安全措施保护</p>
					</a>
				</li>
				<li className={styles.li3}>
					<a>
						<p className={styles.p1}>
							<i className={styles.i1}></i>
							<i className={styles.i2}></i>
						</p>
						<p className={styles.p2}>国家权威机构的安全认证保护</p>
					</a>
				</li>
				<li className={styles.li4}>
					<a>
						<p className={styles.p1}>
							<i className={styles.i1}></i>
							<i className={styles.i2}></i>
						</p>
						<p className={styles.p2}>建立多维度的安全防护体系</p>
					</a>
				</li>
				<li className={styles.li5}>
					<a>
						<p className={styles.p1}>
							<i className={styles.i1}></i>
							<i className={styles.i2}></i>
						</p>
						<p className={styles.p2}>真正做到保障投资人的合法权益。</p>
					</a>
				</li>
			</ul>
		</div>
	</div>
	
</div>
    )
  }

}
