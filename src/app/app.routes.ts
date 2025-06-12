import { Routes } from '@angular/router';
import { ViewAirFranceComponent } from './components/view-airfrance/view-airfrance.component';

export const routes: Routes = [
  // {
  //   path: 'decollages', component: ViewAirFranceComponent
  // },

  { path: ':type', component: ViewAirFranceComponent },
  {
    path: '**', redirectTo: 'decollages'
  },

  // {
  //   path: 'atterrissages', component: ViewAirFranceComponent
  // }

];
