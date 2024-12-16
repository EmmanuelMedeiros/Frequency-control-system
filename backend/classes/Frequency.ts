import crypto from 'crypto'

export default class Frequency {

    date: string;
    time: string;
    private _uuid: string;

    constructor(date: string, time: string, uuid?: string) {
        this.date = date;
        this.time = time;
        this._uuid = uuid || crypto.randomUUID(); 
    }

    set uuid(uuid: string) {
        this._uuid = uuid;
        return
    }

    get uuid() {
        return this._uuid
    }
}