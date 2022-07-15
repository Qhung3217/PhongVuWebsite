import { Component, OnInit } from '@angular/core';
import { Item, Order } from 'src/app/core/models/order.model';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-me-order',
  templateUrl: './me-order.component.html',
  styleUrls: ['./scss/me-order.component.scss'],
})
export class MeOrderComponent implements OnInit {
  orders: Order[];
  items: Item[];
  orderSelected: Order;
  currentPage = 1;
  pageSize = 10;
  totalRow;
  isLoadings = {
    orders: false,
    items: false,
  };
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrder();
  }
  loadOrder() {
    this.isLoadings.orders = true;
    this.orderService
      .getOrders(this.currentPage, this.pageSize)
      .subscribe((orderRes) => {
        this.currentPage = orderRes.page;

        this.totalRow = orderRes.totalRow;
        this.orders = orderRes.data;
        this.isLoadings.orders = false;
      });
  }
  onSelectOrder(index) {
    this.orderSelected = { ...this.orders[index] };
    console.log(this.orderSelected.paymentDetails?.charges.data[0].receipt_url);
    this.getOrderSelected();
  }
  getOrderSelected() {
    if (this.orderSelected._id) {
      this.isLoadings.items = true;
      this.orderService.getOrder(this.orderSelected._id).subscribe((order) => {
        this.items = order.items;
        this.isLoadings.items = false;
      });
    }
  }
  handlePageChange(page) {
    this.currentPage = page;
    this.loadOrder();
  }
}
