export class reviewDTO {
  userFirstName: string
  userLastName: string;
  productId: number;
  comment: string;
  rating: number;

  constructor(firstName: string, lastName: string, productId: number, comment: string, rating: number) {
    this.userFirstName = firstName;
    this.userLastName = lastName;
    this.productId = productId;
    this.comment = comment;
    this.rating = rating;
  }
}
