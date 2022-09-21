import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/models/menuItem';
import { MenuControllerService } from 'src/app/services/menuController.service';
import { SideBarItem } from '../side-bar/side-bar-item/side-bar-item.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnChanges {

  @Input()
  activeItem! : SideBarItem;

  menu : Array<MenuItem> = [];
  constructor(
    private menuControllerService: MenuControllerService
  ) {}


  ngOnInit(): void {
  }


  ngOnChanges() {
    this.menu = [];
    this.getTheFullMenu();
  }


  getTheFullMenu() {
    this.menuControllerService.getTheFullMenu().subscribe(data => {
      this.menu = data;
      this.menu = this.menu.filter(item => item.category === this.activeItem.category);
      console.log(this.menu);
    });
  }
}
