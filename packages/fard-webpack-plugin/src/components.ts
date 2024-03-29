// sort compnents to import `wx:elif` performance
const sortComponents = component => {
  // FIXME: list not finished
  const HIGHLIGHT_COMPONENTS = ['view', 'button', 'text'];
  const find = name => {
    const pos = HIGHLIGHT_COMPONENTS.indexOf(name);
    return pos === -1 ? Infinity : pos;
  };
  return component.sort((a, b) => {
    const aPos = find(a.name);
    const bPos = find(b.name);
    return aPos - bPos;
  });
};

const addCommonEvents = components => {
  for (const component of components) {
    component.events.push(
      'touchstart',
      'touchmove',
      'touchcancel',
      'touchend',
      'tap',
      'longpress',
      'longtap',
      'transitionend',
      'animationstart',
      'animationiteration',
      'animationend',
      'touchforcechange',
    );
  }
  return components;
};

// docs: https://developers.weixin.qq.com/miniprogram/en/dev/component/
export const BUILD_IN_COMPONENTS = sortComponents(
  addCommonEvents([
    // View Container
    {
      name: 'movable-view',
      props: [
        'direction',
        'inertia',
        'out-of-bounds',
        'x',
        'y',
        'damping',
        'friction',
        'disabled',
        'scale',
        'scale-min',
        'scale-max',
        'scale-value',
        'animation',
      ],
      events: [
        'bindchange',
        'bindscale',
        // FIXME: `htouchmove` and `vtouchmove` are not prefixed with bind
        'htouchmove',
        'vtouchmove',
      ],
    },
    {
      name: 'cover-image',
      props: ['src'],
      events: ['bindload', 'binderror'],
    },
    {
      name: 'cover-view',
      props: ['scroll-top'],
      events: [],
    },
    {
      name: 'movable-area',
      props: ['scale-area'],
      events: [],
    },
    {
      name: 'scroll-view',
      props: [
        'scroll-x',
        'scroll-y',
        'upper-threshold',
        'lower-threshold',
        'scroll-top',
        'scroll-left',
        'scroll-into-view',
        'scroll-with-animation',
        'enable-back-to-top',
        'enable-flex',
      ],
      events: ['bindscrolltoupper', 'bindscrolltolower', 'bindscroll'],
    },
    {
      name: 'swiper',
      props: [
        'indicator-dots',
        'indicator-color',
        'indicator-active-color',
        'autoplay',
        'current',
        'interval',
        'duration',
        'circular',
        'vertical',
        'previous-margin',
        'next-margin',
        'display-multiple-items',
        'skip-hidden-item-layout',
        'easing-function',
      ],
      events: ['bindchange', 'bindtransition', 'bindanimationfinish'],
    },
    {
      name: 'swiper-item',
      props: ['item-id'],
      events: [],
    },
    {
      name: 'view',
      props: ['selectable', 'space', 'decode', 'ensp', 'emsp', 'nbsp'],
      events: [],
    },
    // Basic Content
    {
      name: 'icon',
      props: ['type', 'size', 'color'],
      events: [],
    },
    {
      name: 'progress',
      props: [
        'percent',
        'show-info',
        'border-radius',
        'font-size',
        'stroke-width',
        'color',
        'activeColor',
        'backgroundColor',
        'active',
        'active-mode',
      ],
      events: ['bindactiveend'],
    },
    {
      name: 'rich-text',
      props: ['nodes', 'space'],
      events: [],
    },
    {
      name: 'text',
      props: ['hover-class', 'hover-stop-propagation', 'hover-start-time', 'hover-stay-time'],
      events: [],
    },
    // Form
    {
      name: 'button',
      props: [
        'size',
        'type',
        'plain',
        'disabled',
        'loading',
        'form-type',
        'open-type',
        'hover-class',
        'hover-stop-propagation',
        'hover-start-time',
        'hover-stay-time',
        'lang',
        'session-from',
        'send-message-title',
        'send-message-path',
        'send-message-img',
        'app-parameter',
        'show-message-card',
      ],
      events: ['getuserinfo', 'contact', 'getphonenumber', 'error', 'opensetting', 'launchapp'],
    },
    {
      name: 'checkbox',
      props: ['value', 'disabled', 'checked', 'color'],
      events: [],
    },
    {
      name: 'checkbox-group',
      props: [],
      events: ['change'],
    },
    {
      name: 'editor',
      props: ['read-only', 'placeholder', 'show-img-size', 'show-img-toolbar', 'show-img-resize'],
      events: ['ready', 'focus', 'blur', 'input', 'statuschange'],
    },
    {
      name: 'form',
      props: ['report-submit', 'report-submit-timeout'],
      events: ['submit', 'reset'],
    },
    {
      name: 'input',
      props: [
        'value',
        'type',
        'password',
        'placeholder',
        'placeholder-style',
        'placeholder-class',
        'disabled',
        'maxlength',
        'cursor-spacing',
        'auto-focus',
        'focus',
        'confirm-type',
        'confirm-hold',
        'cursor',
        'selection-start',
        'selection-end',
        'adjust-position',
      ],
      events: ['input', 'focus', 'blur', 'confirm', 'keyboardheightchange'],
    },
    {
      name: 'label',
      props: ['for'],
      events: [],
    },
    {
      name: 'picker',
      props: ['mode', 'disabled'],
      events: ['cancel'],
    },
    {
      name: 'picker-view',
      props: [
        'value',
        'indicator-style',
        'indicator-class',
        'mask-style',
        'mask-class',
        'change',
        'pickstart',
        'pickend',
      ],
      events: ['change', 'pickstart', 'pickend'],
    },
    {
      name: 'picker-view-column',
      props: [],
      events: [],
    },
    {
      name: 'radio',
      props: ['value', 'checked', 'disabled', 'color'],
      events: [],
    },
    {
      name: 'radio-group',
      props: [],
      events: ['change'],
    },
    {
      name: 'slider',
      props: [
        'min',
        'max',
        'step',
        'disabled',
        'value',
        'color',
        'selected-color',
        'activeColor',
        'backgroundColor',
        'block-size',
        'block-color',
        'show-value',
      ],
      events: ['change', 'changing'],
    },
    {
      name: 'switch',
      props: ['checked', 'disabled', 'type', 'color'],
      events: ['change'],
    },
    {
      name: 'textarea',
      props: [
        'value',
        'placeholder',
        'placeholder-style',
        'placeholder-class',
        'disabled',
        'maxlength',
        'auto-focus',
        'focus',
        'auto-height',
        'fixed',
        'cursor-spacing',
        'cursor',
        'show-confirm-bar',
        'selection-start',
        'selection-end',
        'adjust-position',
      ],
      events: ['focus', 'blur', 'linechange', 'input', 'confirm', 'keyboardheightchange'],
    },
    // Navigation
    {
      name: 'functional-page-navigator',
      props: ['version', 'name', 'args'],
      events: ['bindsuccess', 'bindfail'],
    },
    {
      name: 'navigator',
      props: [
        'target',
        'url',
        'open-type',
        'delta',
        'app-id',
        'path',
        'extra-data',
        'version',
        'hover-class',
        'hover-stop-propagation',
        'hover-start-time',
        'hover-stay-time',
      ],
      events: ['success', 'fail', 'complete'],
    },
    // Multimedia
    {
      name: 'audio',
      props: ['id', 'src', 'loop', 'controls', 'poster', 'name', 'author'],
      events: ['binderror', 'bindplay', 'bindpause', 'bindtimeupdate', 'bindended'],
    },
    {
      name: 'camera',
      props: ['mode', 'device-position', 'flash', 'frame-size'],
      events: ['bindstop', 'binderror', 'bindinitdone', 'bindscancode'],
    },
    {
      name: 'image',
      props: ['src', 'mode', 'lazy-load', 'show-menu-by-longpress'],
      events: ['binderror', 'bindload'],
    },
    {
      name: 'live-player',
      props: [
        'src',
        'mode',
        'autoplay',
        'muted',
        'orientation',
        'object-fit',
        'background-mute',
        'min-cache',
        'max-cache',
        'sound-mode',
        'auto-pause-if-navigate',
        'auto-pause-if-open-native',
      ],
      events: ['bindstatechange', 'bindfullscreenchange', 'bindnetstatus'],
    },
    {
      name: 'live-pusher',
      props: [
        'url',
        'mode',
        'autopush',
        'muted',
        'enable-camera',
        'auto-focus',
        'orientation',
        'beauty',
        'whiteness',
        'aspect',
        'min-bitrate',
        'max-bitrate',
        'waiting-image',
        'waiting-image-hash',
        'zoom',
        'device-position',
        'background-mute',
        'mirror',
      ],
      events: [
        'bindstatechange',
        'bindnetstatus',
        'binderror',
        'bindbgmstart',
        'bindbgmprogress',
        'bindbgmcomplete',
      ],
    },
    {
      name: 'video',
      props: [
        'src',
        'duration',
        'controls',
        'danmu-list',
        'danmu-btn',
        'enable-danmu',
        'autoplay',
        'loop',
        'muted',
        'initial-time',
        'page-gesture',
        'direction',
        'show-progress',
        'show-fullscreen-btn',
        'show-play-btn',
        'show-center-play-btn',
        'enable-progress-gesture',
        'object-fit',
        'poster',
        'show-mute-btn',
        'title',
        'play-btn-position',
        'enable-play-gesture',
        'auto-pause-if-navigate',
        'auto-pause-if-open-native',
        'vslide-gesture',
        'vslide-gesture-in-fullscreen',
      ],
      events: [
        'bindplay',
        'bindpause',
        'bindended',
        'bindtimeupdate',
        'bindfullscreenchange',
        'bindwaiting',
        'binderror',
        'bindprogress',
      ],
    },
    // Map
    {
      name: 'map',
      props: [
        'longitude',
        'latitude',
        'scale',
        'markers',
        'covers',
        'polyline',
        'circles',
        'controls',
        'include-points',
        'show-location',
        'polygons',
        'subkey',
        'layer-style',
        'rotate',
        'skew',
        'enable-3D',
        'show-compass',
        'enable-overlooking',
        'enable-zoom',
        'enable-scroll',
        'enable-rotate',
        'enable-satellite',
        'enable-traffic',
      ],
      events: [
        'bindtap',
        'bindmarkertap',
        'bindcontroltap',
        'bindcallouttap',
        'bindupdated',
        'bindregionchange',
        'bindpoitap',
      ],
    },
    // Canvas
    {
      name: 'canvas',
      props: ['type', 'canvas-id', 'disable-scroll'],
      events: [
        'bindtouchstart',
        'bindtouchmove',
        'bindtouchend',
        'bindtouchcancel',
        'bindlongtap',
        'binderror',
      ],
    },
    // Open Capabilities
    {
      name: 'ad',
      props: ['unit-id', 'ad-intervals'],
      events: ['bindload', 'binderror', 'bindclose'],
    },
    {
      name: 'official-account',
      props: [],
      events: ['bindload', 'binderror'],
    },
    {
      name: 'open-data',
      props: ['type', 'open-gid', 'lang'],
      events: [],
    },
    {
      name: 'web-view',
      props: ['src'],
      events: ['bindmessage', 'bindload', 'binderror'],
    },
    // Aria Component
    {
      name: 'aria-component',
      props: [
        'aria-hidden',
        'aria-describedby',
        'aria-orientation',
        'aria-multiselectable',
        'aia-multiselectable',
      ],
      events: [],
    },
  ]),
);
