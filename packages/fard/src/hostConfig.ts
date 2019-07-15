import * as scheduler from 'scheduler';
import { REMAX_ROOT_BACKUP, REMAX_METHOD, TYPE_TEXT } from './constants';
import { Container } from './container';
import { HostConfig } from 'react-reconciler';

const {
  unstable_scheduleCallback: scheduleDeferredCallback,
  unstable_cancelCallback: cancelDeferredCallback,
  unstable_shouldYield: shouldYield,
  unstable_now: now,
} = scheduler;

let instanceCount = 0;

function processProps(newProps: any, rootContext: Container, id: number) {
  const props: any = {};
  for (const propKey of Object.keys(newProps)) {
    if (typeof newProps[propKey] === 'function') {
      const handlerKey = `${REMAX_METHOD}_${id}_${propKey}`;
      // FIXME: memory leak here
      rootContext.registerEventHandler(handlerKey, newProps[propKey]);
      props[propKey] = handlerKey;
    } else if (propKey === 'children') {
      // pass
    } else {
      props[propKey] = newProps[propKey];
    }
  }
  return props;
}

const childHostContext = {};

type Props = Object;
export type Instance = {
  type: string;
  props: Props;
  children: Array<Instance | TextInstance>;
  rootContext: Container;
  id: number;
};
type TextInstance = {
  type: string,
  text: string,
  rootContext: Container,
};

export const hostConfig: HostConfig<
  string,
  Props,
  Container,
  Instance,
  TextInstance,
  unknown,
  Instance | TextInstance,
  {},
  unknown,
  unknown,
  unknown,
  unknown
> = {
  now,

  getRootHostContext: () => {
    return {};
  },

  shouldSetTextContent(type, props) {
    return false;
  },

  prepareForCommit: () => {},

  resetAfterCommit: () => {},

  getChildHostContext: () => {
    return childHostContext;
  },

  prepareUpdate() {
    return true;
  },

  commitTextUpdate(textInstance, oldText, newText) {
    textInstance.text = newText;
    textInstance.rootContext.requestUpdate();
  },

  createInstance(type, newProps, rootContainerInstance) {
    const rootContext = rootContainerInstance;
    const id = instanceCount;
    instanceCount += 1;

    const props = processProps(newProps, rootContext, id);

    const ins = {
      type,
      props,
      children: [],
      rootContext,
      id,
    };

    return ins;
  },

  createTextInstance(text, rootContainerInstance) {
    return {
      type: TYPE_TEXT,
      text,
      rootContext: rootContainerInstance
    };
  },

  commitUpdate(targetIns, updatePayload, type, oldProps, newProps) {
    const props = processProps(newProps, targetIns.rootContext, targetIns.id);
    targetIns.props = props;
    targetIns.rootContext.requestUpdate();
  },

  appendInitialChild: (parent, child) => {
    parent.children.push(child);
  },

  appendChild(parent, child) {
    parent.children.push(child);
  },

  insertBefore(parent, child, beforeChild) {
    parent.children.splice(parent.children.indexOf(beforeChild), 0, child);
  },

  finalizeInitialChildren: () => {
    return false;
  },

  supportsMutation: true,

  appendChildToContainer: (_parent, child) => {
    let parent: any = null;
    // FIXME: what about else ?
    if (_parent.__rootContainer) {
      // append to root
      parent = {
        type: 'root',
        children: [],
        rootContext: _parent,
      };
    }

    parent.children.push(child);

    child.rootContext[REMAX_ROOT_BACKUP].push(parent);
    child.rootContext.requestUpdate();
  },

  removeChild(parentInstance, child) {
    parentInstance.children.splice(parentInstance.children.indexOf(child), 1);
  },

  removeChildFromContainer() {},

  // @ts-ignore
  schedulePassiveEffects: scheduleDeferredCallback,
  cancelPassiveEffects: cancelDeferredCallback,
  shouldYield,
  scheduleDeferredCallback,
  cancelDeferredCallback,
};
