import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { MenuItem } from '../models/menuItem';
import { StartOrderingDTO } from '../models/startOrderingDTO';
import { BillDialogueComponent } from '../pages/bill-dialogue/bill-dialogue.component';
import { TablesDialogueComponent } from '../pages/tables-dialogue/tables-dialogue.component';
import { DiningService } from './dining.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItems: Map<MenuItem, number> = new Map<MenuItem, number>();
  startOrder! : StartOrderingDTO
  public totalPrice: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public itemCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(public dialog: MatDialog, private diningService : DiningService) { }

  addItemToCart(item : MenuItem) {
    let itemSet = this.findItemByFullName(item.fullName);
    if(itemSet){
      this.cartItems.set(itemSet, this.cartItems.get(itemSet)! + 1);
    } else {
      this.cartItems.set(item, 1);
    }
    this.calculateTotalPrice();
    this.calculateTotalItems();
  }

  addItemsToCart(item: MenuItem, quantity: number) {
    let itemSet = this.findItemByFullName(item.fullName);
    if(itemSet){
      this.cartItems.set(itemSet, this.cartItems.get(itemSet)! + quantity);
    } else {
      this.cartItems.set(item, quantity);
    }
    this.calculateTotalPrice();
    this.calculateTotalItems();
  }

  removeItem(item : MenuItem) {
    let itemSet = this.findItemByFullName(item.fullName);
    if(itemSet){
      this.cartItems.get(itemSet)! > 1 ? this.cartItems.set(itemSet, this.cartItems.get(itemSet)! - 1) : this.cartItems.delete(itemSet);
    }
    this.calculateTotalPrice();
    this.calculateTotalItems();
  }

  removeAllItems(item : MenuItem) {
    let itemSet = this.findItemByFullName(item.fullName);
    if(itemSet){
      this.cartItems.delete(itemSet);
    }
    this.calculateTotalPrice();
    this.calculateTotalItems();
  }

  /*validate(){
    if(this.cartItems.length>0){
      const dialogRef = this.dialog.open(TablesDialogueComponent);
      dialogRef.componentInstance.onAdd.subscribe((data) => {
        console.log(data)
        this.startOrder = data;
        this.diningService.openTable(data).subscribe(
          result =>{
            this.cartItems.forEach(item => {
              this.diningService.addToTableOrder(item,""+result.id);
            })
        });
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          const dialogBill = this.dialog.open(BillDialogueComponent);
        }
      });
    } else{
      alert("Your card is empty");
    }
  }*/

  calculateTotalPrice() {
    let sum = 0;
    this.cartItems.forEach((value, key) => {
      sum += value * key.price!;
    });
    this.totalPrice.next(sum);
  }

  calculateTotalItems() {
    let count = 0;
    this.cartItems.forEach((value, key) => {
      count += value;
    });
    this.itemCount.next(count);
  }

  calculatePrice(item : MenuItem) {
    if(this.cartItems.has(item)){
      return this.cartItems.get(item)! * item.price!;
    } else {
      return 0;
    }
  }

  findItemByFullName(fullName : string) : MenuItem | undefined {
    let item : MenuItem | undefined;
    this.cartItems.forEach((value, key) => {
      if(key.fullName == fullName){
        item = key;
      }
    });
    return item;
  }

}
