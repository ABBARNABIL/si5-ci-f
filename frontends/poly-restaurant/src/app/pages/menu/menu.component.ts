import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MenuItem } from 'src/app/models/menuItem';
import { MenuService } from 'src/app/services/menu.service';
import { SideBarItem } from '../side-bar/side-bar-item/side-bar-item.model';
import { TablesDialogueComponent } from '../tables-dialogue/tables-dialogue.component';
import { Item } from '../../models/item';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnChanges {

  @Input()
  activeItem! : SideBarItem;
  @Output() itemsAdded = new EventEmitter();
  menu : Array<MenuItem> = [];
  total = 0;
  constructor(
    private menuService: MenuService,public dialog: MatDialog
  ) {}


  ngOnInit(): void {
  }

  addProductToCart(item : MenuItem) {
    const productExistInCart = this.menu.find(({fullName}) => fullName === item.fullName); // find product by name
    if (!productExistInCart) {
      this.menu.push({...item, fullName:"rrrt"}); // enhance "porduct" opject with "num" property
      return;
    }
    productExistInCart.fullName = "";
    if(item.price)
      this.total += item.price
  }
  removeProduct(item : MenuItem) {
    this.menu = this.menu.filter(({fullName}) => fullName !== item.fullName)
  }

  ngOnChanges() {
    this.menu = [];
    this.getTheFullMenu();
  }

  addItemToCart(item: any){
      this.itemsAdded.emit(item);
  }

  getTheFullMenu() {
    this.menuService.getTheFullMenu().subscribe(data => {
      this.menu = data;
      this.menu = this.menu.filter(item => item.category === this.activeItem.category);
      console.log(this.menu);
    });
  }

 
}
