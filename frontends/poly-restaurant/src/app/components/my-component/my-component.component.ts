import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/models/menuItem';
import { MenuService } from 'src/app/services/menu.service';
import { DiningControllerService } from '../../services/dining.service';


@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.css']
})
export class MyComponentComponent implements OnInit {
  menu : Array<MenuItem> = [];
  constructor(
    private menuService: MenuService, private diningService : DiningControllerService
  ) {}


  ngOnInit() {
    this.getTheFullMenu();
    this.getAllTables();
  }

  /***Juste test localhost:3001 */
  getAllTables(){
    this.diningService.listAllTables().subscribe(data =>{
      console.log(data);
    })
  }
  getTheFullMenu() {
    this.menuService.getTheFullMenu().subscribe(data => {
      this.menu = data;
      console.log(data);
    });
  }



}
