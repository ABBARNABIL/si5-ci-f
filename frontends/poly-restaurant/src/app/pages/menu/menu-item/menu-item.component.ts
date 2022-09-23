import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from 'src/app/models/menuItem';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {

  @Input()
  menuItem!: MenuItem;
  @Output() itemsAdded = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  addItemToCart(item: any){
    console.log("AMMMMMMMMMMMMMMMM");
    this.itemsAdded.emit(item);
    console.log(this.itemsAdded);
}

}
