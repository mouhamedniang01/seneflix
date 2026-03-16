import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {MovieDetailsComponent} from './components/movie-details/movie-details.component';
import {CreditComponent} from './components/credit/credit.component';
import {TrendingMoviesComponent} from './components/trending-movies/trending-movies.component';
import {PopularMovieComponent} from './components/popular-movie/popular-movie.component';
import {UpcomingMoviesComponent} from './components/upcoming-movies/upcoming-movies.component';
import {MovieByCastingComponent} from './components/movie-by-casting/movie.by.casting.component';


export const routes: Routes = [
  {path:'trending', component:TrendingMoviesComponent,title:'trending movies'},
  {path:'popular',component:PopularMovieComponent, title:'Popular movies'},
  {path:'upcoming',component:UpcomingMoviesComponent,title:'Upcoming movies'},
  //placer tous les routes ajoutées au dessus
  {
    path:':id',
    children:[
      {path:'details', component: MovieDetailsComponent,title:'details'},
      {path:'credits',component:CreditComponent,title:'credits'},
      {path:'cast',component:MovieByCastingComponent,title:'casting'}
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
