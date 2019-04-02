/**
 * 主导航菜单
 */
import React from 'react';
import { NavLink } from 'dva/router';
import { Menu, Dropdown, Icon } from 'antd';
import styles from './GlobalHeaderMenuDrop.less';

function getMenuList(menusData){
  if (!menusData) return [];
  return menusData.map((item, index) => {
    if (!item.name || item.isHide) return null;
    return(
      <Menu.Item key={item.key}>
        <NavLink
          exact={item.exact}
          className={styles.link}
          activeClassName={styles.current}
          to={`/${item.path}`}
        >
          <span>
            {item.name}
          </span>
          <i className={styles.border}/>
        </NavLink>
      </Menu.Item>
    )
  })
}

export default function GlobalHeaderMenuDrop ({navData}) {

  const menu = (
    <Menu>
      {getMenuList(navData)}
    </Menu>
  );

  return(
    <div className={styles.menu}>
      <Dropdown overlay={menu} trigger={['click']}>
        <div className={styles.menuButton}/>
      </Dropdown>
    </div>
  )

};

