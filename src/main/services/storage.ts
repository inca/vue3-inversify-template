import { injectable } from 'inversify';

import { service } from '../service';

@injectable()
@service('storage')
export class StorageService {

    async load(key: string, defaultValue: any = {}): Promise<any> {
        try {
            const v = localStorage.getItem(key);
            return JSON.parse(v ?? '') ?? defaultValue;
        } catch (err) {
            return defaultValue;
        }
    }

    async save(key: string, value: any): Promise<void> {
        localStorage.setItem(key, JSON.stringify(value));
    }

}
