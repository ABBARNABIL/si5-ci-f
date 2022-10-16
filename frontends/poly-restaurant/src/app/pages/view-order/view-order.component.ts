import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { StatusService } from 'src/app/services/status.service';

export interface OrderElement {
  fullName: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
}



@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit {
  displayedColumns: string[] = ['fullName', 'unitPrice', 'quantity', 'totalPrice', 'actions'];
  dataSource: OrderElement[] = [];
  constructor(private cartService:CartService,
    private router: Router, private statusService: StatusService) { }

  ngOnInit() {
    this.updateDataSource();
  }

  getCorrespondingItem(element: OrderElement){
    for(let item of this.cartService.cartItems.keys()){
      if(item.fullName == element.fullName){
        return item;
      }
    }
    return null;
  }

  addItem(element: OrderElement) {
    this.cartService.addItemToCart(this.getCorrespondingItem(element)!);
    this.updateDataSource();
  }
  removeOneItem(element: OrderElement) {
    if(element.quantity > 1){
      this.cartService.removeItem(this.getCorrespondingItem(element)!);
      this.updateDataSource();
    }
  }

  removeAllItems(element: OrderElement) {
    this.cartService.removeAllItems(this.getCorrespondingItem(element)!);
    this.updateDataSource();
  }

  updateDataSource(){
    this.dataSource = [];
    for(let item of this.cartService.cartItems.keys()){
      this.dataSource.push({
        fullName: item.fullName,
        unitPrice: item.price!,
        quantity: this.cartService.cartItems.get(item)!,
        totalPrice: this.cartService.calculatePrice(item)
      });
    }
  }

  cancel() {
    this.cartService.cancel();
    this.router.navigate(["/"]);
  }

  confirm() {
    this.router.navigate(["/"]);
    this.cartService.validate();
    this.statusService.openDialog();
  }
}
