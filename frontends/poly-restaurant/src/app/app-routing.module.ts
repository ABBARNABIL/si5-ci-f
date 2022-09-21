import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MyComponentComponent } from './components/my-component/my-component.component';
import { MainScreenComponent } from './pages/main-screen/main-screen.component';

const routes: Routes = [
  {  path: 'my-component', component: MyComponentComponent, }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
