import {Component, computed, inject, OnInit, Signal, signal, WritableSignal} from '@angular/core';
import {SwiperCategoryComponent} from '../swiper-category/swiper-category.component';
import {Movies} from '../../../movie-lists/models/movies';
import {MoviesListService} from '../../../movie-lists/services/movies-list.service';
import {Router} from '@angular/router';
import {SlickCarouselModule} from 'ngx-slick-carousel';
import {TimeWindowEnum} from '../../../enums/time-window.enum';
import {LocalStorageService} from '../../services/local-storage/local-storage.service';
import {SelectButton} from 'primeng/selectbutton';
import {FormControl, FormGroup, FormsModule} from '@angular/forms';
import {toSignal} from '@angular/core/rxjs-interop';
import { MovieCarouselComponent } from '../../../movie-lists/components/movie-carousel/movie-carousel.component';
import { LoggingInterceptor } from '../../interceptors/logging.interceptor';

@Component({
  selector: 'app-home',
  imports: [MovieCarouselComponent, SwiperCategoryComponent, SelectButton, FormsModule],
  templateUrl: './home.component.html',
  standalone: true,
  providers:[SlickCarouselModule,MoviesListService,LoggingInterceptor],
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  //inject services & routes
  private readonly moviesListService:MoviesListService= inject(MoviesListService);
  private  readonly localStorageService:LocalStorageService =  inject(LocalStorageService);
  public readonly router:Router = inject(Router) ;

  currentLanguage :WritableSignal<string>=signal<string> ('en-EN');
  // params page & language
  pageNumber :WritableSignal<number> = signal<number>(1);
  stateOptions =signal( [{ label: 'Day', value: TimeWindowEnum.DAY },{ label: 'Week', value: TimeWindowEnum.WEEK }]);
  formGroupSelect!: FormGroup;

  currentTimeWindow :WritableSignal<TimeWindowEnum>= signal(TimeWindowEnum.DAY);

  // get all informations on all incoming movies
  upcomingMovies:Signal<Movies| undefined > =  toSignal(this.moviesListService.getUpcommingMovies(this.currentLanguage(), this.pageNumber()));

  //get all information on trending
  trending:Signal<Movies | undefined>  = computed <Movies | undefined>(
    toSignal( this.moviesListService.getTrendingAll(this.currentTimeWindow(),this.currentLanguage()))
  );
  ngOnInit(): void {
    this.injectForm();
  }

   
  injectForm(){
    this.formGroupSelect = new FormGroup({
      timeWindow : new FormControl(TimeWindowEnum.DAY)
    });
  }

  //assign time window
  onUpdate():void{
    this.currentTimeWindow.set(this.formGroupSelect.controls['timeWindow'].value);
  };
}
