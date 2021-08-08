import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ShopService, Order } from "../shop.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

	orders : Order[] = [];

	selectedOrder!: Order;

	constructor(private shopService : ShopService, public router: Router) {}

	ngOnInit(): void {
		this.orders = this.shopService.orders;
	}

	selectOrder(index: number) {
		this.selectedOrder = this.orders[index];
	}
}
