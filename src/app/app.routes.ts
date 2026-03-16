import {PreloadingStrategy, RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
export const routes: Routes = [
  {path: '', redirectTo:'home', pathMatch: 'full',},
  {
    path:'home', title:'home',
    loadComponent:()=> import('./core/components/home/home.component')
    .then(m=>m.HomeComponent),
  },
  {
    path:'movies',
    loadChildren:()=>import('./movie/movie.module').then(m=>m.MovieModule),
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {
        preloadingStrategy:PreloadingStrategy,
        enableViewTransitions: true
      }
  )],
})
export class AppRoutingModule { }
