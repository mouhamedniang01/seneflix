import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { CreditComponent } from './components/credit/credit.component';
export const routes: Routes = [
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
  ],
  exports:[RouterModule]
})
export class MovieRoutingModule { }
