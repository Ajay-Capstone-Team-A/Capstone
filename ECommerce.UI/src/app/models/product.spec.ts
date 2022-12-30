import { Product } from './product';

describe('Product', () => {
  it('should create an instance', () => {
    expect(new Product(0,"",0,"",0,"")).toBeTruthy();
  });
});
