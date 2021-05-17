import 'reflect-metadata';

import { Container, interfaces } from 'inversify';
import { createApp, reactive } from 'vue';

import { services } from './service';
import { EventBus } from './services/events';
import RootView from './views/Root.vue';

export class Application {
    container = new Container({
        skipBaseClassChecks: true,
    });
    vue = createApp(RootView);
    services: any = {};

    constructor() {
        this.container.bind('App').toConstantValue(this);
        this.container.bind('Vue').toConstantValue(this.vue);
        this.container.applyMiddleware(this.reactiveMiddleware);
        this.bindServices();
    }

    get events() {
        return this.container.get(EventBus);
    }

    protected reactiveMiddleware(resolve: interfaces.Next) {
        return (args: interfaces.NextArgs) => {
            const result = resolve(args);
            return reactive(result);
        };
    }

    async start() {
        this.createServiceInstances();
        this.provideServices();
        await this.initServices();
        this.events.emit('started');
    }

    protected createServiceInstances() {
        this.services = {};
        for (const svc of services) {
            const instance = this.container.get(svc.class);
            this.services[svc.alias] = instance;
        }
    }

    protected bindServices() {
        for (const svc of services) {
            this.container.bind(svc.class).toSelf().inSingletonScope();
        }
    }

    protected provideServices() {
        for (const [k, v] of Object.entries(this.services)) {
            this.vue.provide(k, v);
        }
    }

    protected async initServices() {
        const sorted = services.slice().sort((a, b) => a.initPriority > b.initPriority ? 1 : -1);
        for (const svc of sorted) {
            // TODO lookup by something more stable than alias
            const instance = this.services[svc.alias];
            if (typeof instance.init === 'function') {
                await instance.init();
            }
        }
    }

}
