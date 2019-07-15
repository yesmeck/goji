import React from 'react';
import createPageWrapper from './createPageWrapper';
import { internalRender } from './render';
import { Container } from './container';

interface PageThisType {
  __container?: Container,
  wrapper: any
}

export default function createPageConfig(Page: React.ComponentType<any>) {
  return {
    onLoad(this: PageThisType, query: any) {
      const PageWrapper = createPageWrapper(Page, query);

      this.__container = new Container(this);

      internalRender(React.createElement(PageWrapper), this.__container);
    },

    onUnload(this: PageThisType) {
      if (this.__container) {
        internalRender(null, this.__container);
      }
      this.__container = undefined;
    },

    onShow(this: PageThisType) {
      this.__container!.getPublicRootInstance().onShow();
    },

    onHide(this: PageThisType) {
      this.__container!.getPublicRootInstance().onHide();
    },

    onPullDownRefresh(this: PageThisType) {
      this.__container!.getPublicRootInstance().onPullDownRefresh();
    },

    onReachBottom(this: PageThisType) {
      this.__container!.getPublicRootInstance().onReachBottom();
    },

    onPageScroll(this: PageThisType) {
      this.__container!.getPublicRootInstance().onPageScroll();
    },

    onShareAppMessage(this: PageThisType) {
      this.__container!.getPublicRootInstance().onShareAppMessage();
    },

    onTitleClick(this: PageThisType) {
      this.__container!.getPublicRootInstance().onTitleClick();
    },

    onOptionMenuClick(this: PageThisType) {
      this.__container!.getPublicRootInstance().onOptionMenuClick();
    },

    onPopMenuClick(this: PageThisType) {
      this.__container!.getPublicRootInstance().onPopMenuClick();
    },

    onPullIntercept(this: PageThisType) {
      this.__container!.getPublicRootInstance().onPullIntercept();
    },
  };
}
