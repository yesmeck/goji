import { REMAX_ROOT_VDOM } from './constants';
import pure from './utils/pure';
import { FiberRoot } from 'react-reconciler';
import { Instance, TextInstance } from './hostConfig';

export class Container {
  constructor(context) {
    this.__context = context;
  }

  public [REMAX_ROOT_VDOM]: Array<Instance | TextInstance> = [];

  private __context;

  public __rootContainer?: FiberRoot;

  private applyUpdate() {
    this.inQueue = false;
    const children = pure(this[REMAX_ROOT_VDOM]);

    const startTime = new Date().getTime();

    this.__context.setData(
      {
        children
      },
      () => {
        // @ts-ignore
        if (process.env.NODE_ENV !== 'production') {
          wx.showToast({
            title: `${new Date().getTime() - startTime}ms`
          })
          console.log(`setData => 回调时间：${new Date().getTime() - startTime}ms`);
        }
      },
    );
  }

  inQueue = false;

  requestUpdate() {
    if (this.inQueue) {
      return;
    }
    this.inQueue = true;
    Promise.resolve().then(() => this.applyUpdate());
  }

  registerEventHandler(handlerKey: string, handler: Function) {
    this.__context[handlerKey] = handler;
  }

  getPublicRootInstance() {
    const container = this.__rootContainer!;
    var containerFiber = container.current;
    if (!containerFiber.child) {
      return null;
    }
    return containerFiber.child.stateNode;
  }
}
