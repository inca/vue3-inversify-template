import EventEmitter from 'eventemitter3';
import { injectable } from 'inversify';

import { service } from '../service';

@injectable()
@service('events')
export class EventBus extends EventEmitter {

}
