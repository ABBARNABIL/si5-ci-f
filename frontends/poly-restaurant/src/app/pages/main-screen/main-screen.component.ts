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
  activeItem!: SideBarItem;


  constructor(private menuService: MenuService) {}

  ngOnInit() {
  }

  updateMenu(item : SideBarItem){
    this.activeItem = item;
  }

}
