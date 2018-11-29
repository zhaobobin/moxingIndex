const path = require('path');
import { ENV } from './src/utils/utils';

//qtw-mobile 测试、准生产，qtw-mobile-pro 生产环境
const distPath = process.env.X_ENV === 'pro' ? 'qtw-mobile-pro' : 'qtw-mobile';

export  default {
  "entry": "src/index.js",
  "outputPath": "./dist/" + distPath,
  "publicPath": "/" + distPath + "/",
  "hash": true,
  "ignoreMomentLocale": true,
  "theme": "./src/theme/theme.js",
  "extraBabelPlugins": [
    ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": true }],
  ],
  "alias": {
    "~": path.resolve(__dirname, "./src"),
    "~@": path.resolve(__dirname, "./src/theme"),
  },
  "env": {
    "development": {
      "extraBabelPlugins": ["dva-hmr"],
      "publicPath": "/"
    }
  },
  "html": {
    "template": "./src/index.ejs",
    "appname": ENV.appname,
    "title": ENV.hometitle,
    "keywords": ENV.keywords,
    "description": ENV.description,
    "author": ENV.author,
    "verification": ENV.verification,
  },
  "lessLoaderOptions": {
    "javascriptEnabled": true,
  },
  "browserslist": [
    "> 1%",
    "last 2 versions"
  ],
  "externals": {
    "BMap": "BMap",
    "BMapLib": "BMapLib",
    "g2": "G2",
    "g-cloud": "Cloud",
    "g2-plugin-slider": "G2.Plugin.slider",
  },
  "proxy": {
    "/api": {
      "target": ENV.api2,
      "changeOrigin": true,
      //"pathRewrite": { "^/api" : "" }
    }
  }
}
