import {MenuItem} from 'primeng/api';
import {ChangeDetectionStrategy, Component,  OnInit, signal, WritableSignal} from '@angular/core';

import {LanguageSelectorComponent, Langue} from '../../../share-ui/language-selector/language-selector.component';
import {MenubarModule} from 'primeng/menubar';
import {LocalStorageService} from '../../services/local-storage/local-storage.service';

@Component({
  selector: 'app-navbar',
  imports: [MenubarModule, LanguageSelectorComponent],
  standalone:true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit{
  items:MenuItem[] = [];
  //items: InputSignal<MenuItem[] | undefined> = input.required<MenuItem[] | undefined>();
  lastTemplateUpdate: WritableSignal<string>   =signal('');
  constructor(public localStorageService:LocalStorageService) {}



  ngOnInit(): void {
    this.setItems();
  }

  // Gestion via stockage local
  handleLanguageUpdate(language: Langue):void {
    this.lastTemplateUpdate.set(language.content);
    console.log(language.content)
    this.localStorageService.setLanguage(language.content);
    //  window.location.reload(); //refresh page
  }
  //set menu item
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
            label: 'Popular',
            icon: 'pi pi-angle-double-up',
            routerLink:'movies/popular'
          },
          {
            label: 'Trending',
            icon: 'pi pi-chart-line',
            routerLink:'movies/trending'
          },
          {
            label: 'Upcomming Movies',
            icon: 'pi pi-hourglass',
            shortcut: '⌘+B',
            routerLink:'/movies/upcoming'
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
