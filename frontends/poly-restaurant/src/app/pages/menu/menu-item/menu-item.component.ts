import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/models/menuItem';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {

  @Input()
  menuItem!: MenuItem;

  constructor() { }

  ngOnInit() {
  }

}
