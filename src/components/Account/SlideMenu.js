import React from 'react';
import { NavLink } from 'dva/router';
import styles from './SlideMenu.less';

const SlideMenu = ({ routes }) => {
  return(
    <div className={styles.menu}>
      <ul className={styles.menuOuter}>
        {
          routes.children.map(item => (
            item.isHide ?
              null
              :
              <li key={item.path} >
                <p>
                  <NavLink
                    activeClassName={styles.active}
                    to={`/${routes.path}/${item.path}`}
                  >
                    {item.name}
                  </NavLink>
                </p>
              </li>
          ))
        }
      </ul>
    </div>
  )
};

export default SlideMenu;
