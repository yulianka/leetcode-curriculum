import "../Iterator.prototype.map";
import "../Object.prototype.keys";

declare global {
  interface Object {
    entries<T extends {}>(
      this: T,
    ): Generator<{ [K in keyof T]: [K, T[K]] }[keyof T], void, void>;
  }
}

Object.prototype.entries = function <T extends {}>(
  this: T,
): Generator<{ [K in keyof T]: [K, T[K]] }[keyof T], void, void> {
  return this.keys().map((k) => [k, this[k]]);
};
