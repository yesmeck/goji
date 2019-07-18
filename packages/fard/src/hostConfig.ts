import * as scheduler from 'scheduler';
import { REMAX_ROOT_VDOM, REMAX_METHOD, TYPE_TEXT } from './constants';
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

type Props = Object;

export type Instance = {
  type: string;
  props: Props;
  children: Array<Instance | TextInstance>;
  rootContext: Container;
  id: number;
};

export type TextInstance = {
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
  boolean,
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
    return {};
  },

  prepareUpdate() {
    // FIXME: should use this hook correctly
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

  insertInContainerBefore(container, child, beforeChild) {
    container[REMAX_ROOT_VDOM].splice(container[REMAX_ROOT_VDOM].indexOf(beforeChild), 0, child);
  },

  finalizeInitialChildren: () => {
    return false;
  },

  supportsMutation: true,

  appendChildToContainer(container, child) {
    container[REMAX_ROOT_VDOM].push(child);
    container.requestUpdate();
  },

  removeChild(parentInstance, child) {
    parentInstance.children.splice(parentInstance.children.indexOf(child), 1);
  },

  removeChildFromContainer(container, child) {
    container[REMAX_ROOT_VDOM].splice(container[REMAX_ROOT_VDOM].indexOf(child), 1);
  },

  // @ts-ignore
  schedulePassiveEffects: scheduleDeferredCallback,
  cancelPassiveEffects: cancelDeferredCallback,
  shouldYield,
  scheduleDeferredCallback,
  cancelDeferredCallback,
};
