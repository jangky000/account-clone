export default class Observable {
  constructor() {
    this._observers = new Set();
  }

  subscribe(observer) {
    this._observers.add(observer);
  }

  unsubscribe(observer) {
    this._observers = [...this._observers].filter(
      (subscriber) => subscriber !== observer
    );
  }

  // view정보 update
  notify(data) {
    this._observers.forEach((observer) => observer.update(data));
  }
}
