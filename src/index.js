import { version } from '../package.json';

import * as components from './components/';

function install(Vue) {
  Object.keys(components).forEach((key) => {
    Vue.use(components[key]);
  });
}

/* istanbul ignore next */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export { version, install };
export * from './components';
export default { version, install };
