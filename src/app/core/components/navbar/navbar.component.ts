import {MenuItem, MessageService} from 'primeng/api';
import {
  ChangeDetectionStrategy,
  Component,
  computed, DestroyRef,
  inject,
  OnInit, Signal,
  signal,
  WritableSignal
} from '@angular/core';

import {LanguageSelectorComponent, Langue} from '../../../share-ui/language-selector/language-selector.component';
import {MenubarModule} from 'primeng/menubar';
import {LocalStorageService} from '../../services/local-storage/local-storage.service';
import {AutocompleteComponent} from '../../../share-ui/autocomplete/autocomplete.component';
import {Movies, Result} from '../../../movie/models/movies';
import {MoviesListService} from '../../../movie/services/movie-list/movies-list.service';
import {isStringEmpty, TOAST_SEVERITY_ERROR} from '../../utils';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [MenubarModule, LanguageSelectorComponent, AutocompleteComponent, RouterLink,],
  standalone:true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush,
  providers: [MessageService]
})
export class NavbarComponent implements OnInit{
  items:MenuItem[] = [];

  lastTemplateUpdate: WritableSignal<string>   =signal('');
  movieService:MoviesListService  = inject(MoviesListService);
  private messageService:MessageService = inject(MessageService);
  private  localStorageService:LocalStorageService =inject(LocalStorageService);


  keyword:WritableSignal<string | undefined> = signal('');
  message :WritableSignal<string | undefined> = signal('');
  destroy:DestroyRef = inject(DestroyRef);

  protected searchResult: WritableSignal<Movies| null>= signal(null);

  ngOnInit(): void {
    this.setItems();
  }

  resultSearchMovies :Signal<string[] | undefined> = computed(
    ():string[]| undefined => this.searchResult()?.results
      .map(value => value.title)
      .slice(0,10)
  );




  // Gestion via stockage local
  handleLanguageUpdate(language: Langue):void {
    this.lastTemplateUpdate.set(language.content);
    console.log(language.content)
    this.localStorageService.setLanguage(language.content);
    //  window.location.reload(); //refresh page
  }


  //search
  protected handleSearch($event: string):void {
    try {
      console.log('search start');
      console.log($event);
      this.keyword.set($event);
      if (!isStringEmpty($event) && $event!== undefined) {
        //try {
        this.movieService.searchMovieByKeyword(this.keyword())
         .pipe(takeUntilDestroyed(this.destroy))
          .subscribe({
            next: (value:Movies):void => {
              this.searchResult.set(value);
            },
            error:(err:Error)=> {
              const errorMessage:string = err.message
              console.log(errorMessage)
              this.message.set(errorMessage + '\ncause:\t'+err.cause);
              this.messageService.add({
                severity:TOAST_SEVERITY_ERROR,
                summary: err.name ?? 'Error Message',
                detail: this.message(),
                key: 'bl',
                life: 3000
              });
            },
          });
      }
    }catch (error) {
      const e:Error= (error as Error)
      this.message.set(e.message +'\nCause:\t' + e.cause );
      this.messageService.add({
        severity:TOAST_SEVERITY_ERROR,
        summary: 'Error Message',
        detail: this.message(),
        key: 'bl',
        life: 3000,
        icon:'pi pi-warning',

      });}

  }

  router = inject(Router);
  protected onSelectMovie(information: any) {
    console.log(information.value);
    const title:string = information.value;
    const movie:Result | undefined = this.searchResult()?.results
      .find((value:Result):boolean=> value.title === title );

    const movieId:number | undefined =movie?.id;

    if (movieId !== undefined) {
      this.router.navigateByUrl('/',{skipLocationChange:true}).then(()=> {
        this.router.navigate(
          [`movies/${movieId}/details`],
        ).then(() => {
          console.log(`After navigation I am on:${this.router.url}`)
        });
      });
    }
  }

  protected clearSearchInput():void {
    this.keyword.set(undefined);
    this.searchResult.set(null);
  }

  protected readonly TOAST_SEVERITY_ERROR:string = TOAST_SEVERITY_ERROR;
  //set menu item
  protected readonly keywordForSearching :WritableSignal<string>= signal<string>('');
  setItems(){
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink:'/home',
      },
      {
        label: 'Movies',
        icon: 'pi pi-video',
        items: [
          {
            label: 'Top movies',
            icon: 'pi pi-angle-double-up',
            routerLink:'movies/top-movies'
          },
          {
            label: 'Trending',
            icon: 'pi pi-chart-line',
            routerLink:'movies/trending'
          },
          {
            separator: true,
          },

        ],
      },
      {
        label: 'TV Series',
        icon: 'pi pi-image',
        routerLink:'/series'
      },
      {
        label:'Shows',
        icon:'pi pi-megaphone',
        routerLink:'/shows'
      }
    ];
  }


}
