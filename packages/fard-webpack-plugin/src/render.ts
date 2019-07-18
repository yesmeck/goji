import ejs from 'ejs';
import fs from 'fs';
import path from 'path';
import wx2swanView from 'wx2swan/dist/src/view';
import wx2swanApi from 'wx2swan/dist/src/api';
import wx2swanConfigApi from 'wx2swan/dist/config/wxmp2swan/api';
import { Options } from './index';

export const renderTemplate = async (target: Options['target'], pathname: string, data: any = {}) => {
  const content = fs.readFileSync(path.resolve(__dirname, pathname)).toString();
  const result = ejs.render(content, data);
  const type = path.extname(path.basename(pathname, path.extname(pathname))).replace(/^\./, '');
  switch (target) {
    case 'wechat':
      return result;
    case 'baidu':{
      switch (type) {
        case 'wxml':
          const { contents } = await wx2swanView.transformViewContent(pathname, result, {
            type: 'wxmp2swan',
            src: '',
            dist: '',
            log: '',
            logs: [],
            data: { swanToRenamedComponents: {} },
          });
          return contents;
        case 'js':
          return wx2swanApi.transformApiContent(
            result,
            wx2swanConfigApi,
            'wx',
            {
              wx: 'swan',
            },
            pathname,
          );
        default:
          return result;
      }
    }
    case 'alipay':
      switch (type) {
        case 'wxml':
          return result.replace(/wx:/g, 'a:').replace(/\.wxml/g, '.axml');
        case 'js':
          return result;
        default:
          break;
      }
    default:
      return result;
  }
}
