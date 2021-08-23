import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";

@Injectable({
	providedIn: 'root'
})
export class ShopService {

	orders: Order[] = [];
	basket: Product[] = [];

	constructor(private http: HttpClient) { }

	getProducts(): Observable<Product[]> {
		return this.http.get<Product[]>('/api/products');
	}

	getProduct(id: string): Observable<Product> {
		return this.http.get<Product>('/api/products/' + id);
	}

	getOrders(): Observable<Order[]> {
		return this.http.get<Order[]>('/api/orders');
	}

	getOrder(id: string): Observable<Order> {
		return this.http.get<Order>('/api/order/' + id);
	}

	createOrder(order: Order): Observable<Order> {
		return this.http.post<Order>('/api/orders', order).pipe(
			tap(order => this.orders.push(order))
		);
	}

	deleteOrder(orderId: number | undefined): Observable<any> {
		return this.http.delete<any>('/api/orders/' + orderId);
	}
}

export type Order = {
	id?: number,
	basket: Product[],
	count: number,
	cost: number
}

export type Product = {
	id: number,
	name: string,
	photoPath: string,
	price: number,
	unit: string,
	quantity: number,
	info: string,
	related: number[]
}