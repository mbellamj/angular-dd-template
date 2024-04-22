interface IStorageItem<T> {
  value: T;
  expiredAt: number;
}

interface IStorageApi {
  generateStorageKey(...params: string[]): string;
  clearStorage(): void;
  save<T extends object>(key: string, value: T, ttl?: number): void;
  read<T>(key: string): T | null;
  createStorageItem<T>(value: T, ttl: number): IStorageItem<T>;
  delete(key: string): void;
}

export class StorageApi implements IStorageApi {
  constructor(private storageApi: Storage) {}

  /**
   * @method generateStorageKey
   * @param params
   * @returns @type string
   */
  public generateStorageKey(...params: string[]) {
    return `@${params.join(':')}`;
  }

  /**
   * @method clearStorage
   * @returns @void
   */
  public clearStorage() {
    this.storageApi.clear();
  }

  /**
   * @method save
   * @param key
   * @param value
   * @param ttl
   */
  public save<T extends object>(key: string, value: T, ttl = 2 * 60 * 60 * 1000) {
    const item = this.createStorageItem(value, ttl);
    this.storageApi.setItem(key, JSON.stringify(item));
  }

  /**
   * @method read
   * @param key
   * @returns @type T | null
   * @returns @type void
   */
  public read<T>(key: string) {
    const itemStr = this.storageApi.getItem(key);

    if (!itemStr) return null;

    const item = JSON.parse(itemStr) as IStorageItem<T>;

    return this.isItemExpired(item) ? null : item.value;
  }

  /**
   * @method createStorageItem
   * @param value
   * @param ttl
   * @returns @type IStorageItem<T>
   */
  public createStorageItem<T>(value: T, ttl: number): IStorageItem<T> {
    const now = Date.now();

    return { value, expiredAt: now + ttl };
  }

  /**
   * @method delete
   * @param key
   * @returns @type void
   */
  public delete(key: string) {
    this.storageApi.removeItem(key);
  }

  /**
   *
   * @param item
   * @returns @type boolean
   */
  private isItemExpired<T>(item: IStorageItem<T>) {
    return new Date().getTime() > item.expiredAt;
  }
}
