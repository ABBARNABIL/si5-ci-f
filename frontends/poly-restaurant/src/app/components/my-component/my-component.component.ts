import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/models/menuItem';
import { MenuControllerService } from 'src/app/services/menuController.service';


@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.css']
})
export class MyComponentComponent implements OnInit {
  menu : Array<MenuItem> = [];
  constructor(
    private menuControllerService: MenuControllerService
  ) {}


  ngOnInit() {
    this.getTheFullMenu();
  }


  getTheFullMenu() {
    this.menuControllerService.getTheFullMenu().subscribe(data => {
      this.menu = data;
      console.log(this.menu);
    });
  }

}
