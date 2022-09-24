import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MenuItem } from 'src/app/models/menuItem';
import { MenuService } from 'src/app/services/menu.service';
import { SideBarItem } from '../side-bar/side-bar-item/side-bar-item.model';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit {
  cartItems: any[] = [];
  activeItem!: SideBarItem;
  menu : Array<MenuItem> = [];

  constructor(private menuService: MenuService,public dialog: MatDialog) {}

  ngOnInit() {
  }

  updateMenu(item : SideBarItem){
    this.activeItem = item;
  }

  addItemToCart(item : any) {
    const itemExistInCart = this.cartItems.find(({fullName}) => fullName === item.fullName); // find product by name
    if (!itemExistInCart) {
      this.cartItems.push({...item, num:1}); // enhance "porduct" opject with "num" property
      return;
    }
    itemExistInCart.num += 1;
  }
  removeItem(item : MenuItem) {
    this.cartItems = this.cartItems.filter(({fullName}) => fullName !== item.fullName)
  }

  ngOnChanges() {
    console.log(this.menu)
    this.menu = [];
    this.getTheFullMenu();
  }

  getTheFullMenu() {
    this.menuService.getTheFullMenu().subscribe(data => {
      this.menu = data;
      this.menu = this.menu.filter(item => item.category === this.activeItem.category);
      console.log(data);
    });
  }


}
