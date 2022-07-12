import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Address } from 'src/app/core/models/address.model';
import { AddressService } from 'src/app/core/services/address.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit {
  @Input() address: Address;
  @Input() isSelected = false;
  @Output() selected = new EventEmitter();
  isOpenEdit = false;
  isLoading = false;
  constructor(private addressService: AddressService) {}
  onClick() {
    this.selected.emit(true);
  }
  ngOnInit(): void {}
  onEdit() {
    this.isOpenEdit = true;
  }

  onRemove(id) {
    this.isLoading = true;
    this.addressService
      .removeAddress(id)
      .subscribe(() => (this.isLoading = false));
  }
}
