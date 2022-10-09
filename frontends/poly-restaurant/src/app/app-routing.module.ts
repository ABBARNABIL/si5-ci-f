import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainScreenComponent } from './pages/main-screen/main-screen.component';
import { TrackingComponent } from './pages/tracking/tracking.component';

const routes: Routes = [
  { path: '', component: MainScreenComponent },
  {  path: 'trackorder', component: TrackingComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
