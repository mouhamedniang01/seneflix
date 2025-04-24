import { Routes } from '@angular/router';
import {MovieDetailsComponent} from './movie/components/movie-details/movie-details.component';
import {HomeComponent} from './core/components/home/home.component';

export const routes: Routes = [
  {path: '', redirectTo:'home', pathMatch: 'full',},
  {
    path:'home', title:'home',
    loadComponent: () => import('./core/components/home/home.component')
      .then(m => m.HomeComponent),
  },
  {
    path:'movies',
    children:[
      {
        path:'details',
         loadChildren:
           ()=>import('./movie/movie.module').then(m=>m.MovieModule)

      }
    ]
  }
];
