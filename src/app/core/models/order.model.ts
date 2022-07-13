import { PaymentIntent } from '@stripe/stripe-js';
import { Address } from './address.model';
import { Product } from './product.model';

export class Order {
  constructor(
    public _id: string,
    public user: string,
    public status: string,
    public totolPrice: number,
    public paymentMethod: string,
    public address: Address,
    public notes: string,
    public createdAt: Date,
    public updatedAt: Date,
    public __v: number,
    public paymentDetails: PM,
    public paymentId: string,
    public items?: Item[]
  ) {}
}
export interface Item {
  product: Product;
  quantity: number;
  discount: number;
  totalPrice: number;
  totalPriceWithDiscount: number;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}
interface PM {
  id: string;
  charges: {
    object: string;
    data: {
      payment_method: string;
      receipt_url: string;
    }[];
  };
  metadata: {
    orderId: string;
  };
}
