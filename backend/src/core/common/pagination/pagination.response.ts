import { Exclude, Expose } from 'class-transformer';

export class PaginationResponse<T> {
  @Exclude() private _pageSize: number;
  @Exclude() private _totalCount: number;
  @Exclude() private _totalPage: number;
  @Exclude() private _items: Partial<T[]>;

  constructor(payload: { totalCount: number; pageSize: number; items: Partial<T[]> }) {
    this._pageSize = payload.pageSize;
    this._totalCount = payload.totalCount;
    this._totalPage = Math.ceil(payload.totalCount / payload.pageSize);
    this._items = payload.items;
  }

  @Expose()
  get meta(): { totalPage: number; pageSize: number; totalCount: number } {
    return {
      totalPage: this._totalPage,
      pageSize: this._pageSize,
      totalCount: this._totalCount,
    };
  }

  @Expose()
  get items(): Partial<T[]> {
    return this._items;
  }
}
