import { reviewDTO } from './reviewDTO';

describe('reviewDTO', () => {
  it('should create an instance', () => {
    expect(new reviewDTO('firstName','lastName',1,'comment',4)).toBeTruthy();
  });
});
