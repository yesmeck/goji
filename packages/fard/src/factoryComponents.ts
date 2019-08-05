import { Props, createElement, CSSProperties } from 'react';

export type HostComponent =
  | 'view'
  | 'scroll-view'
  | 'swiper'
  | 'swiper-item'
  | 'movable-view'
  | 'movable-area'
  | 'cover-view'
  | 'cover-image'
  | 'icon'
  | 'text'
  | 'rich-text'
  | 'progress'
  | 'button'
  | 'checkbox-group'
  | 'checkbox'
  | 'form'
  | 'input'
  | 'label'
  | 'picker'
  | 'picker-view'
  | 'radio-group'
  | 'radio'
  | 'slider'
  | 'switch'
  | 'textarea'
  | 'navigator'
  | 'image'
  | 'video'
  | 'camera'
  | 'live-player'
  | 'live-pusher'
  | 'map'
  | 'canvas'
  | 'open-data'
  | 'official-account';

const factoryComponent = <P extends {}>(component: HostComponent) => {
  return <T>(props: Props<T> & P) => {
    return createElement(component, props);
  };
};

interface BaseProps {
  className?: string;
  style?: CSSProperties;
  onTap?: (e: any) => void;
}

interface ViewProps extends BaseProps {}

interface ButtonProps extends BaseProps {
  disabled: boolean;
  onInput?: (e: any) => void;
  onLaunchapp?: (e: any) => void;
  onError?: (e: any) => void;
  onGetuserinfo?: (e: any) => void;
  onGetphonenumber?: (e: any) => void;
}

interface RadioGroupProps extends BaseProps {
  onChange?: (e: any) => void;
}

interface RadioProps extends BaseProps {
  value?: string;
  checked?: boolean;
  disabled?: boolean;
  color?: string;
}

interface LabelProps extends BaseProps {
  for?: string;
}

export const View = factoryComponent<ViewProps>('view');
export const Button = factoryComponent<ButtonProps>('button');
export const Radio = factoryComponent<RadioProps>('radio');
export const RadioGroup = factoryComponent<RadioGroupProps>('radio-group');
export const Label = factoryComponent<LabelProps>('label');
