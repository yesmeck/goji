import { ReactElement } from 'react';
import ReactReconciler from 'react-reconciler';
import hostConfig from './hostConfig';
import { Container } from './container';

const ReactReconcilerInst = ReactReconciler(hostConfig as any);

export function internalRender(rootElement: ReactElement | null, container: Container) {
  // Create a root Container if it doesnt exist
  if (!container._rootContainer) {
    container._rootContainer = ReactReconcilerInst.createContainer(container, false, false);
  }

  ReactReconcilerInst.updateContainer(rootElement, container._rootContainer, null, () => {});
}
