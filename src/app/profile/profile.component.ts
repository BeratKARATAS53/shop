import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Profile, ShopService } from "../shop.service";

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	profile: Profile = {
		name: 'Berat KARATAŞ',
		phone: "0555 650 5863",
		address: {
			longAddress: 'Kırşehirliler Mah., 359. Sokak, Mucur Apt., No: 15/9',
			distinct: 'Mucur',
			city: 'Kırşehir'
		}
	};

	profileForm: Profile;

	isFormOpened = false;

	constructor(
		private shopService: ShopService,
		public router: Router
	) {
		this.profileForm = JSON.parse(JSON.stringify(this.profile));
	}

	ngOnInit(): void { }

	updateProfile() {
		this.shopService.updateProfile(this.profileForm).subscribe(profile => {
			this.profile = profile;
		})
	}
}
