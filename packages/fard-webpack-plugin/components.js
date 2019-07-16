
module.exports.BUILD_IN_COMPONENTS = [
  {
    name: 'view',
    props: ['selectable', 'space', 'decode', 'ensp', 'emsp', 'nbsp'],
    events: ['tap'],
  },
  {
    name: 'text',
    props: ['hover-class', 'hover-stop-propagation', 'hover-start-time', 'hover-stay-time'],
    events: ['tap'],
  },
  {
    name: 'image',
    props: ['src', 'mode', 'lazy-load', 'show-menu-by-longpress'],
    events: ['tap', 'error', 'load'],
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
    events: ['tap', 'success', 'fail', 'complete'],
  },
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
    events: [
      'tap',
      'getuserinfo',
      'contact',
      'getphonenumber',
      'error',
      'opensetting',
      'launchapp',
    ],
  },
];
