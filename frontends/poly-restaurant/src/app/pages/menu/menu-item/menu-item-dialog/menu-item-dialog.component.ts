import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MenuItem } from 'src/app/models/menuItem';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-menu-item-dialog',
  templateUrl: './menu-item-dialog.component.html',
  styleUrls: ['./menu-item-dialog.component.css']
})
export class MenuItemDialogComponent implements OnInit {

  item: MenuItem;
  quantity: number = 1;

  constructor(
    private dialogRef: MatDialogRef<MenuItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data : any,
    private cartService : CartService
  ) {
    this.item = data.menuItem;
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  add() {
    this.quantity++;
  }

  subtract() {
    if(this.quantity > 1)
      this.quantity--;
  }

  addToCart(){
    this.dialogRef.close();
    this.cartService.addItemsToCart(this.item, this.quantity);
  }

}
