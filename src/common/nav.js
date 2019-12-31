import BaseRoutes from './base'
import UserRoutes from './user'
import MobileRoutes from './mobile'

// nav data
export const getNavData = app => {
  let base = BaseRoutes(app),
    user = UserRoutes(app),
    mobile = MobileRoutes(app);
  return [
    ...base,
    ...user,
    ...mobile
  ]
};
