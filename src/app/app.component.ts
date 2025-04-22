import {Component, OnInit, signal,} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {LanguageSelectorComponent, Langue} from './share-ui/language-selector/language-selector.component';
import {Menubar} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';
import {LocalStorageService} from './core/services/local-storage/local-storage.service';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { LoggingInterceptor } from './core/interceptors/logging.interceptor';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent,  LanguageSelectorComponent, Menubar],
  templateUrl: './app.component.html',
  providers:[LoggingInterceptor,LocalStorageService],
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent implements  OnInit{
  title:string = 'prime wideo';
  items: MenuItem[] | undefined;
  lastTemplateUpdate: string  | Langue ='';
  footerVisible = signal(false);
  constructor(public localStorageService:LocalStorageService) {}

  showFooter(){
    this.footerVisible.set(!this.footerVisible())
  }

  ngOnInit(): void {
    this.setItems();
    setTimeout(()=>this.showFooter(),3000)
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
        label: 'Reels',
        icon: 'pi pi-search',
        badge: '3',
        items: [
          {
            label: 'Core',
            icon: 'pi pi-bolt',
            shortcut: '⌘+S',
          },
          {
            label: 'Blocks',
            icon: 'pi pi-server',
            shortcut: '⌘+B',
          },
          {
            separator: true,
          },
          {
            label: 'UI Kit',
            icon: 'pi pi-pencil',
            shortcut: '⌘+U',
          },
        ],
      },
    ];
  }


  // Gestion via stockage local
  handleLanguageUpdate(language: any):void {
    this.lastTemplateUpdate = language;
     this.localStorageService.setLanguage('language', language);

  }

}
