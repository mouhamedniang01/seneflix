import {Component, OnInit, signal, WritableSignal,} from '@angular/core';
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
  lastTemplateUpdate: WritableSignal<string>   =signal('');
  footerVisible = signal(false);
  constructor(public localStorageService:LocalStorageService) {}

  showFooter(){
    this.footerVisible.set(!this.footerVisible())
  }

  ngOnInit(): void {
    this.setItems();
    setTimeout(()=>this.showFooter(),13000)
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
  handleLanguageUpdate(language: Langue):void {
    this.lastTemplateUpdate.set(language.content);
    console.log(language.content)
    this.localStorageService.setLanguage(language.content);
  //  window.location.reload(); //refresh page
  }

}
