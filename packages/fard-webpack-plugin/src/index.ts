import camelCase from 'lodash/camelCase';
import webpack from 'webpack';
import { BUILD_IN_COMPONENTS } from './components';
import { renderTemplate } from './render';

const buildComponentsData = (target: Options['target']) => {
  const components = BUILD_IN_COMPONENTS.map(component => ({
    ...component,
    props: undefined,
    events: undefined,
    attributes: [
      ...component.props.map(propsName => ({
        name: propsName,
        value: camelCase(propsName),
      })),
      ...component.events.map(eventName => ({
        name: target === 'alipay' ? camelCase(`on-${eventName}`) : `bind${eventName}`,
        value: camelCase(`on-${eventName}`),
      }))
    ]
  }))
  return components;
}

export interface Options {
  bridgeType: 'template' | 'component',
  maxDepth: number,
  target: 'wechat' | 'baidu' | 'alipay' | 'toutiao',
}

const DEFAULT_OPTIONS: Options = {
  bridgeType: 'template',
  maxDepth: 10,
  target: 'wechat',
}

class FardWebpackPlugin implements webpack.Plugin {

  options: Options;

  constructor (options: Partial<Options> = {}) {
    this.options = {
      ...DEFAULT_OPTIONS,
      ...options,
    };
  }

  renderTemplate(pathname: string, data?: any) {
    return renderTemplate(this.options.target, pathname, data);
  }

  buildComponentsData() {
    return buildComponentsData(this.options.target);
  }

  transformExt(ext: string) {
    switch (this.options.target) {
      case 'wechat':
        return ext;
      case 'baidu':
        switch (ext) {
          case 'wxml':
            return 'swan';
          case 'wxss':
            return 'css';
          default:
            return ext;
        }
      case 'alipay':
        switch (ext) {
          case 'wxml':
            return 'axml';
          case 'wxss':
            return 'acss';
          default:
            return ext;
        }
      case 'toutiao':
        switch (ext) {
          case 'wxml':
            return 'ttml';
          case 'wxss':
            return 'ttss';
          default:
            return ext;
        }
      default:
        return ext;
    }
  }

  apply (compiler: webpack.Compiler) {
    const bridgeType = this.options.bridgeType;
    switch (bridgeType) {
      case 'component':{
        compiler.hooks.emit.tapAsync('FardWebpackPlugin', async (compilation, cb) => {
          const bridgeJson = await this.renderTemplate('../templates/component/block.json.ejs');
          const bridgeJs = await this.renderTemplate('../templates/component/block.js.ejs');
          const bridgeWxml = await this.renderTemplate('../templates/component/block.wxml.ejs');

          const wxml = await this.renderTemplate('../templates/component/item.wxml.ejs');
          const json = await this.renderTemplate('../templates/component/item.json.ejs');

          compilation.assets[`block/block.${this.transformExt('wxml')}`] = {
            source: () => bridgeWxml,
            size: () => bridgeWxml.length
          }
          compilation.assets[`block/block.${this.transformExt('json')}`] = {
            source: () => bridgeJson,
            size: () => bridgeJson.length
          }

          compilation.assets[`block/block.${this.transformExt('js')}`] = {
            source: () => bridgeJs,
            size: () => bridgeJs.length
          }
          //批量生成 wxml和 json
          compilation.chunks.forEach((item) => {
            compilation.assets[`${item.name}.${this.transformExt('wxml')}`] = {
              source: () => wxml,
              size: () => wxml.length,
            }
            compilation.assets[`${item.name}.${this.transformExt('json')}`] = {
              source: () => json,
              size: () => json.length,
            }
          })
          cb()
        })
        break;
      }
      case 'template': {
        compiler.hooks.emit.tapAsync('FardWebpackPlugin', async (compilation, cb) => {
          const maxDepth = this.options.maxDepth;
          if (this.options.target === 'wechat') {
            for (let depth = 0; depth < maxDepth; depth++) {
              const bridgeWxml = await this.renderTemplate('../templates/template/children.wxml.ejs', {
                depth,
                componentsDepth: depth + 1,
              });
              const componentsWxml = await this.renderTemplate('../templates/template/components.wxml.ejs', {
                depth,
                componentsDepth: depth + 1,
                components: this.buildComponentsData(),
                inlineChildrenRender: false,
              });
              // 生成 bridge.wxml
              compilation.assets[`bridge/children${depth}.${this.transformExt('wxml')}`] = {
                source: () => bridgeWxml,
                size: () => bridgeWxml.length,
              }
              // 生成 components.wxml
              compilation.assets[`bridge/components${depth}.${this.transformExt('wxml')}`] = {
                source: () => componentsWxml,
                size: () => componentsWxml.length,
              }
            }
          } else if (this.options.target === 'baidu' || this.options.target === 'alipay' || this.options.target === 'toutiao') {
            const bridgeWxml = await this.renderTemplate('../templates/template/children.wxml.ejs', {
              depth: 0,
              componentsDepth: 0,
              components: this.buildComponentsData(),
            });
            const componentsWxml = await this.renderTemplate('../templates/template/components.wxml.ejs', {
              depth: 0,
              componentsDepth: 0,
              components: this.buildComponentsData(),
              inlineChildrenRender: this.options.target === 'alipay',
            });
            // 生成 bridge.wxml
            compilation.assets[`bridge/children0.${this.transformExt('wxml')}`] = {
              source: () => bridgeWxml,
              size: () => bridgeWxml.length,
            }
            // 生成 components.wxml
            compilation.assets[`bridge/components0.${this.transformExt('wxml')}`] = {
              source: () => componentsWxml,
              size: () => componentsWxml.length,
            }
          }
          const itemWxml = await this.renderTemplate('../templates/template/item.wxml.ejs');
          //生成普通的 wxml
          compilation.chunks.forEach((item) => {
            compilation.assets[`${item.name}.${this.transformExt('wxml')}`] = {
              source: () => itemWxml,
              size: () => itemWxml.length,
            };
          });
          cb()
        })
        break;
      }
      default:
        throw new Error('invalid bridgeType found');
    }
  }
}

module.exports = FardWebpackPlugin
