export interface CustomElasticSearchServiceUseCase {
  exist();
  create();
  bulk();
  index();
  search();
  update();
  delete();
}

export class CustomElasticSearchService implements CustomElasticSearchServiceUseCase {
  exist() {
    throw new Error('Method not implemented.');
  }
  create() {
    throw new Error('Method not implemented.');
  }
  bulk() {
    throw new Error('Method not implemented.');
  }
  index() {
    throw new Error('Method not implemented.');
  }
  search() {
    throw new Error('Method not implemented.');
  }
  update() {
    throw new Error('Method not implemented.');
  }
  delete() {
    throw new Error('Method not implemented.');
  }
}
