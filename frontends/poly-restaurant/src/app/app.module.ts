import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TopBarComponent } from './pages/top-bar/top-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideBarComponent } from './pages/side-bar/side-bar.component';
import { MainScreenComponent } from './pages/main-screen/main-screen.component';
import { MenuComponent } from './pages/menu/menu.component';


import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { SideBarItemComponent } from './pages/side-bar/side-bar-item/side-bar-item.component';

import { FlexLayoutModule } from "@angular/flex-layout";
import { MenuItemComponent } from './pages/menu/menu-item/menu-item.component';
import { TablesDialogueComponent } from './pages/tables-dialogue/tables-dialogue.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import { ShowTableComponent } from './pages/tables-dialogue/show-table/show-table.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { BillDialogueComponent } from './pages/bill-dialogue/bill-dialogue.component';

@NgModule({
  declarations: [
    AppComponent,
    MainScreenComponent,
    TopBarComponent,
    SideBarComponent,
    MenuComponent,
    MenuItemComponent,
    SideBarItemComponent,
    TablesDialogueComponent,
    ShowTableComponent,
    ShoppingCartComponent,
    BillDialogueComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatCardModule,
    FlexLayoutModule,
    MatDialogModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
