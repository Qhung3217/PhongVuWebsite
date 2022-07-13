import { Component, OnInit } from '@angular/core';
import { Item, Order } from 'src/app/core/models/order.model';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-me-order',
  templateUrl: './me-order.component.html',
  styleUrls: ['./me-order.component.scss'],
})
export class MeOrderComponent implements OnInit {
  orders: Order[];
  items: Item[];
  orderSelected: Order;
  currentPage = 1;
  pageSize = 20;
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getOrders().subscribe((orderRes) => {
      this.currentPage = orderRes.page;
      this.pageSize = orderRes.limit;
      this.orders = orderRes.data;
    });
  }
  onSelectOrder(index) {
    this.orderSelected = { ...this.orders[index] };
    console.log(this.orderSelected.paymentDetails?.charges.data[0].receipt_url);
    this.getOrderSelected();
  }
  getOrderSelected() {
    this.orderService
      .getOrder(this.orderSelected.paymentDetails.metadata.orderId)
      .subscribe((order) => (this.items = order.items));
  }
}
