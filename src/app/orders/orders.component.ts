import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ShopService, Order } from "../shop.service";

@Component({
	selector: 'app-orders',
	templateUrl: './orders.component.html',
	styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

	orders: Order[] = [];

	selectedOrder!: Order;
	existingSelectedOrder = false;

	constructor(
		private shopService: ShopService,
		public router: Router
	) { }

	ngOnInit(): void {
		this.orders = this.shopService.orders;

		this.shopService.getOrders().subscribe(orders => {
			this.orders = orders;
		});
	}

	selectOrder(index: number) {
		this.selectedOrder = this.orders[index];
		this.existingSelectedOrder = true;
	}

	deleteOrder(id: number | undefined, index: number, event: any) {
		event.stopPropagation();

		this.shopService.deleteOrder(id).subscribe(() => {
			this.orders.splice(index, 1);
		});
	}
}
