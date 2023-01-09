export class Review {
  UserId: number
  ProductId: number;
  Comment: string;
  Rating: number;

  constructor(userId: number, productId: number, comment: string, rating: number) {
    this.UserId = userId;
    this.ProductId = productId;
    this.Comment = comment;
    this.Rating = rating;
  }
}
