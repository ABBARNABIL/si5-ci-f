import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from 'src/app/models/menuItem';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {

  @Input()
  menuItem!: MenuItem;
  constructor(private cartService : CartService) { }

  ngOnInit() {
  }

  addToCart(){
    this.cartService.addItemToCart(this.menuItem);
  }

}
