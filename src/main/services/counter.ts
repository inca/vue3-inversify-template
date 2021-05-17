import { inject, injectable } from 'inversify';

import { service } from '../service';
import { StorageService } from './storage';

@injectable()
@service('counter')
export class CounterService {
    value: number = 0;

    constructor(
        @inject(StorageService)
        protected storage: StorageService,
    ) {}

    async init() {
        const {
            counter = 0,
        } = await this.storage.load('counter');
        this.value = counter;
    }

    protected save() {
        this.storage.save('counter', {
            counter: this.value,
        });
    }

    increment() {
        this.value += 1;
        this.save();
    }

    reset() {
        this.value = 0;
        this.save();
    }

}
