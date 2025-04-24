import { Routes } from '@angular/router';
export const routes: Routes = [
  {path: '', redirectTo:'home', pathMatch: 'full',},
  {
    path:'home', title:'home',
    loadComponent:()=> import('./core/components/home/home.component')
    .then(m=>m.HomeComponent),
  },
  {
    path:'movies',
    loadChildren:()=>import('./movie/movie.routing.module').then(m=>m.MovieRoutingModule),
  }
];
