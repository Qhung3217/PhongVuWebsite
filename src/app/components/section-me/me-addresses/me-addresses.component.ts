import { Component, OnInit } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { Address } from 'src/app/core/models/address.model';
import { AddressService } from 'src/app/core/services/address.service';

@Component({
  selector: 'app-me-addresses',
  templateUrl: './me-addresses.component.html',
  styleUrls: ['./me-addresses.component.scss'],
})
export class MeAddressesComponent implements OnInit {
  addresses: Address[];
  isLoading = false;
  isOpenCreateForm = false;
  addressSub: Subscription;
  constructor(private addressService: AddressService) {}

  ngOnInit(): void {
    this.initAddress();
  }
  initAddress() {
    this.isLoading = true;
    this.addressService.fetchData().subscribe((addresses) => {
      this.isLoading = false;
      this.addresses = [...addresses];
    });
    this.addressSub = this.addressService.addressChanged.subscribe(
      (addresses) => {
        this.addresses = [...addresses.address];
        this.isLoading = false;
      }
    );
  }
  openCreateForm() {
    this.isOpenCreateForm = true;
  }
  onCreateAddressSuccess(event) {
    console.log('crea', event);
    this.initAddress();
  }
}
