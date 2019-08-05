import { ReactElement } from 'react';
import ReactReconciler from 'react-reconciler';
import { hostConfig } from './hostConfig';
import { Container } from './container';

const ReactReconcilerInst = ReactReconciler(hostConfig);

export function internalRender(rootElement: ReactElement | null, container: Container) {
  // Create a root Container if it doesn't exist
  if (!container.__rootContainer) {
    container.__rootContainer = ReactReconcilerInst.createContainer(container, false, false);
  }

  ReactReconcilerInst.updateContainer(rootElement, container.__rootContainer, null, () => {});
}
