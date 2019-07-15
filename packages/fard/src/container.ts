import { REMAX_ROOT_BACKUP } from './constants';
import pure from './utils/pure';
import { FiberRoot } from 'react-reconciler';

export class Container {
  constructor(context) {
    this.context = context;
  }

  public [REMAX_ROOT_BACKUP]: null;

  private context;

  public _rootContainer?: FiberRoot;

  requestUpdate() {
    const data = pure(this[REMAX_ROOT_BACKUP]);

    const startTime = new Date().getTime();

    this.context.setData(
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

  registerEventHandler(handlerKey: string, handler: Function) {
    this.context[handlerKey] = handler;
  }

  getPublicRootInstance() {
    const container = this._rootContainer!;
    var containerFiber = container.current;
    if (!containerFiber.child) {
      return null;
    }
    return containerFiber.child.stateNode;
  }
}
