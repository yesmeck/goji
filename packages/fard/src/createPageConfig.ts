import React from 'react';
import createPageWrapper from './createPageWrapper';
import { internalRender } from './render';
import { Container } from './container';
import { FiberRoot } from 'react-reconciler';

interface PageThisType {
  __container?: Container,
  wrapper: any
}

function getPublicRootInstance(container: FiberRoot) {
  var containerFiber = container.current;
  if (!containerFiber.child) {
    return null;
  }
  return containerFiber.child.stateNode;
}

export default function createPageConfig(Page: React.ComponentType<any>) {
  return {
    wrapper: null as any,

    onLoad(this: PageThisType, query: any) {
      const PageWrapper = createPageWrapper(Page, query);

      this.__container = new Container(this);

      internalRender(React.createElement(PageWrapper), this.__container);

      this.wrapper = getPublicRootInstance(this.__container._rootContainer!)
    },

    onUnload(this: PageThisType) {
      if (this.__container) {
        internalRender(null, this.__container);
      }
      this.wrapper = undefined;
    },

    onShow() {
      this.wrapper.onShow();
    },

    onHide() {
      this.wrapper.onHide();
    },

    onPullDownRefresh() {
      this.wrapper.onPullDownRefresh();
    },

    onReachBottom() {
      this.wrapper.onReachBottom();
    },

    onPageScroll() {
      this.wrapper.onPageScroll();
    },

    onShareAppMessage() {
      this.wrapper.onShareAppMessage();
    },

    onTitleClick() {
      this.wrapper.onTitleClick();
    },

    onOptionMenuClick() {
      this.wrapper.onOptionMenuClick();
    },

    onPopMenuClick() {
      this.wrapper.onPopMenuClick();
    },

    onPullIntercept() {
      this.wrapper.onPullIntercept();
    },
  };
}
