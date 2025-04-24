import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path:'movies',
    children:[
      {
        path:'details',
        children:[
          {
            path:':id',
            loadComponent: ()=> import('./components/movie-details/movie-details.component')
              .then(m=>m.MovieDetailsComponent),
            title:'details'
          }
        ]

      }
    ]
  }
];
