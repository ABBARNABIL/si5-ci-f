import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuItem } from 'src/app/models/menuItem';
import { SideBarItem } from './side-bar-item/side-bar-item.model';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {


  @Output()
  newItemEvent = new EventEmitter<SideBarItem>();

  sideBarItems : SideBarItem[] = [
    {
      name: "Entrée",
      category: MenuItem.CategoryEnum.STARTER,
      image: "https://cdn-elle.ladmedia.fr/var/plain_site/storage/images/elle-a-table/menus-de-chefs/entrees-de-chefs/788699-4-fre-FR/Entrees-de-chefs.jpg"
    },
    {
      name: "Principal",
      category: MenuItem.CategoryEnum.MAIN,
      image: "https://assets.bonappetit.com/photos/5b919cb83d923e31d08fed17/1:1/w_2560%2Cc_limit/basically-burger-1.jpg"
    },
    {
      name: "Boissons",
      category: MenuItem.CategoryEnum.BEVERAGE,
      image: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cosmopolitan-1592951320.jpg?crop=1xw:1xh;center,top&resize=480:*"
    },
    {
      name: "Dessert",
      category: MenuItem.CategoryEnum.DESSERT,
      image: "https://www.finedininglovers.fr/sites/g/files/xknfdk1291/files/styles/recipes_1200_1200_fallback/public/2020-05/ricette_dessert_0.jpg?itok=BcsQRdmo"
    }
  ];

  activeItem: SideBarItem = this.sideBarItems[0];


  constructor() { }

  ngOnInit() {
    this.updateMenu(this.activeItem);
  }

  updateMenu(activeItem: SideBarItem) {
    this.activeItem = activeItem;
    this.newItemEvent.emit(this.activeItem);
  }

}
