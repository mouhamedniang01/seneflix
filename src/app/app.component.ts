import {Component, OnInit, signal } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {LocalStorageService} from './core/services/local-storage/local-storage.service';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { LoggingInterceptor } from './core/interceptors/logging.interceptor';
import {FooterComponent} from './core/components/footer/footer.component';
import {LoadingSpinnerComponent} from './share-ui/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, LoadingSpinnerComponent],
  templateUrl: './app.component.html',
  providers:[LoggingInterceptor,LocalStorageService],
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent implements  OnInit{
  title:string = 'prime wideo';
  footerVisible = signal(false);

  showFooter(){
    this.footerVisible.set(!this.footerVisible())
  }

  ngOnInit(): void {
    setTimeout(()=>this.showFooter(),13000)
  }








}
