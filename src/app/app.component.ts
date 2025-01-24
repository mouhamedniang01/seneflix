import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LoggingInterceptor} from './interceptors/logging.interceptor';
import { NavbarComponent } from "./components/navbar/navbar.component";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  providers:[LoggingInterceptor],
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'seneflix';
}
