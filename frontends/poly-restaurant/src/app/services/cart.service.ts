import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MenuItem } from '../models/menuItem';
import { StartOrderingDTO } from '../models/startOrderingDTO';
import { BillDialogueComponent } from '../pages/bill-dialogue/bill-dialogue.component';
import { TablesDialogueComponent } from '../pages/tables-dialogue/tables-dialogue.component';
import { DiningService } from './dining.service';
import { TrackingService } from './tracking.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItems: any[] = [];
  startOrder! : StartOrderingDTO
  public totalPrice = 0;
  public tableOrder : any

  constructor(public dialog: MatDialog, private diningService : DiningService, private tracking : TrackingService) { }

  addItemToCart(item : any) {
    const itemExistInCart = this.cartItems.find(({fullName}) => fullName === item.fullName);
    if (!itemExistInCart) {
      this.cartItems.push({...item, num:1});
      return;
    }
    itemExistInCart.num += 1;
  }

  removeItem(item : MenuItem) {
    this.cartItems = this.cartItems.filter(({fullName}) => fullName !== item.fullName)
  }

  validate(){
    if(this.cartItems.length>0){
      const dialogRef = this.dialog.open(TablesDialogueComponent);
      dialogRef.componentInstance.onAdd.subscribe((data) => {
        console.log(data)
        this.startOrder = data;
        this.diningService.openTable(data).subscribe(
          result =>{
            this.cartItems.forEach(item => {
                this.tableOrder = this.diningService.addToTableOrder(item,""+result.id);
                this.tracking.all_orders.push(this.tableOrder)
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
  }


}
