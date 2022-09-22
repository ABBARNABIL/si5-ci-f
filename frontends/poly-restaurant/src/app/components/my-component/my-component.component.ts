import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/models/menuItem';
import { MenuService } from 'src/app/services/menu.service';
import { DiningService } from '../../services/dining.service';


@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.css']
})
export class MyComponentComponent implements OnInit {
  menu : Array<MenuItem> = [];
  constructor(
    private menuService: MenuService
  ) {}


  ngOnInit() {
    this.getTheFullMenu();
  }

  getTheFullMenu() {
    this.menuService.getTheFullMenu().subscribe(data => {
      this.menu = data;
      console.log(data);
    });
  }



}
