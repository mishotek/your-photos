export class Observable {
    constructor() {
        this._listeners = [];
    }

    subscribe(fn) {
        this._listeners.push(fn);
        return new Subscription(this, fn);
    }

    emit(val) {
        this._listeners.forEach((fn) => fn(val));
    }

    removeSubscription(fn) {
        const index = this._listeners.indexOf(fn);

        if (index === -1) {
            return console.warn('Trying to unsubscribe twice');
        }

        this._listeners.splice(index, 1);
    }
}

export class Subscription {
    constructor(observable, fn) {
        this._observable = observable;
        this._fn = fn;
    }

    unsubscribe() {
        this._observable.removeSubscription(this._fn);
    }
}
