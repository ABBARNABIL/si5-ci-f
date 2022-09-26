import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MenuItem } from '../models/menuItem';
import { StartOrderingDTO } from '../models/startOrderingDTO';
import { BillDialogueComponent } from '../pages/bill-dialogue/bill-dialogue.component';
import { TablesDialogueComponent } from '../pages/tables-dialogue/tables-dialogue.component';
import { DiningService } from './dining.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: any[] = [];
  startOrder! : StartOrderingDTO

  constructor(public dialog: MatDialog, private diningService : DiningService) { }

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
  }
}
