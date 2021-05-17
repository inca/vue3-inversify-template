import 'reflect-metadata';
import './utils/resolve-services';
import '../stylesheets/index.css';

import { Application } from './application';
import { components } from './utils/resolve-components';

const app = new Application();
(window as any).app = app;
app.start();
app.vue.mount('#app');

for (const [k, v] of components) {
    app.vue.component(k, v);
}
