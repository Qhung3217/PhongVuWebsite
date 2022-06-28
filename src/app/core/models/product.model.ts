import { Category } from 'src/app/core/models/category.model';
export class Product {
  constructor(
    public _id: string,
    public name: string,
    public description: string,
    public sku: string,
    public price: number,
    public quantity: number,
    public image: string,
    public category: Category,
    public createdAt: Date,
    public updatedAt: Date,
    public slug: string,
    public __v: number,
    public warranty: { months: number; description: string }
  ) {}
}
