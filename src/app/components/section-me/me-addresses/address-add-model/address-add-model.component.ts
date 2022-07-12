import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Address } from 'src/app/core/models/address.model';
import { AddressService } from 'src/app/core/services/address.service';

@Component({
  selector: 'app-address-add-model',
  templateUrl: './address-add-model.component.html',
  styleUrls: ['./address-add-model.component.scss'],
})
export class AddressAddModelComponent implements OnInit {
  // @Output('complete') formComplete = new EventEmitter<boolean>();
  @Output() close = new EventEmitter<boolean>();
  @Input() address: Address;
  isLoading = false;
  payload: {
    id?: string;
    fullName?: string;
    phone?: string;
    address?: string;
    ward?: string;
    district?: string;
    city?: string;
    country?: string;
    isDefault: boolean;
  } = { isDefault: false };

  constructor(private addressService: AddressService) {}

  ngOnInit(): void {
    this.initForm();
    // this.formComplete.emit(false);
  }
  closeForm() {
    this.close.emit(true);
  }
  initForm() {
    if (this.address) {
      this.payload = {
        id: this.address.id,
        fullName: this.address?.fullName,
        phone: this.address?.phone,
        address: this.address?.address,
        ward: this.address?.ward,
        district: this.address?.district,
        city: this.address?.city,
        country: this.address?.country,
        isDefault: this.address?.isDefault,
      };
    }
  }
  onSubmit(addressForm: NgForm) {
    console.log(this.payload);

    this.isLoading = true;
    this.callAction();
  }
  private callAction() {
    if (this.address) {
      this.addressService
        .updateAddress(this.payload, this.payload.id)
        .subscribe(() => {
          this.completeSection();
        });
    } else
      this.addressService.createAddress(this.payload).subscribe(() => {
        this.completeSection();
      });
  }

  completeSection() {
    this.isLoading = false;
    // this.formComplete.emit(false);
    this.closeForm();
    console.log('complete');
  }
}
