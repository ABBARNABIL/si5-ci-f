import { MenuItem } from "src/app/models/menuItem";

export interface SideBarItem {
  name: string;
  category: MenuItem.CategoryEnum;
  image: string;
}
