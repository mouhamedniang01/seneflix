import { Routes } from '@angular/router';
import {MovieDetailsComponent} from './movie/components/movie-details/movie-details.component';
import {HomeComponent} from './core/components/home/home.component';

export const routes: Routes = [
  {path: '', redirectTo:'home', pathMatch: 'full',},
  {
    path:'home', title:'home', component: HomeComponent
  },
  {
    path:'movies',
    children:[
      {
        path:'details',
        children:[
          {
            path:':id',
            component: MovieDetailsComponent,
            title:'details'
          }
        ]

      }
    ]
  }
];
