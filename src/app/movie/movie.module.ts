import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {MovieDetailsComponent} from './components/movie-details/movie-details.component';
import {CreditComponent} from './components/credit/credit.component';
import {TrendingMoviesComponent} from './components/trending-movies/trending-movies.component';


export const routes: Routes = [
  {path:'trending', component:TrendingMoviesComponent,title:'trending movies'},
  //placer tous les routes au dessus
  {
    path:':id',
    children:[
      {path:'details', component: MovieDetailsComponent,title:'details'},
      {path:'credits',component:CreditComponent,title:'credits'},
    ]
  }

];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forChild(routes)
  ]
})
export class MovieModule { }
