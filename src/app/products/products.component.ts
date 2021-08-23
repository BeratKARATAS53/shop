import { Component } from '@angular/core';
import { ShopService, Order, Product } from "../shop.service";

@Component({
	selector: 'app-products',
	templateUrl: './products.component.html',
	styleUrls: ['./products.component.css']
})
export class ProductsComponent {

	products: Product[] = [];
	basket!: Product[];

	orderCreated = false;

	constructor(private shopService: ShopService) { }

	ngOnInit(): void {
		this.basket = this.shopService.basket;

		this.shopService.getProducts().subscribe(products => {
			this.products = products;
		});
	}

	getTotal(): number {
		let total = 0;

		for (let item of this.basket) {
			total += item.price * item.quantity;
		}

		return total;
	}

	createOrder(): void {
		let order: Order = {
			basket: JSON.parse(JSON.stringify(this.basket)),
			count: this.basket.length,
			cost: this.getTotal()
		};

		this.shopService.createOrder(order).subscribe(order => {
			this.orderCreated = true;
			setTimeout(() => this.orderCreated = false, 2000);

			for (let item of this.basket) {
				item.quantity = 0;
			}

			this.basket.length = 0;
		})
	}

}
