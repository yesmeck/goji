import { REMAX_ROOT_BACKUP } from './constants';
import pure from './utils/pure';
import { FiberRoot } from 'react-reconciler';
import { Instance } from './hostConfig';

export class Container {
  constructor(context) {
    this.__context = context;
  }

  public [REMAX_ROOT_BACKUP]: Array<Instance> = [];

  private __context;

  public __rootContainer?: FiberRoot;

  private applyUpdate() {
    this.inQueue = false;
    const data = pure(this[REMAX_ROOT_BACKUP]);

    const startTime = new Date().getTime();

    this.__context.setData(
      {
        // FIXME:
        vdom: data[0].children[0],
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
