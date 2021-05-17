import { inject, injectable } from 'inversify';
import { App } from 'vue';
import { createRouter, createWebHashHistory, Router } from 'vue-router';

import { service } from '../service';
import Home from '../views/Home.vue';

@injectable()
@service('router')
export class RouterService {

    router: Router;

    constructor(
        @inject('Vue')
        protected vue: App,
    ) {
        this.router = this.createRouter();
    }

    async init() {
        this.vue.use(this.router);
    }

    protected createRouter() {
        return createRouter({
            history: createWebHashHistory(),
            routes: [
                {
                    name: 'Home',
                    path: '/',
                    component: Home
                },
            ],
        });
    }

}
