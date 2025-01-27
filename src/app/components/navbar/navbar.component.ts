import {MenuItem} from 'primeng/api';
import {Component, input, InputSignal, OnInit} from '@angular/core';
import {Menubar} from 'primeng/menubar';
import {LanguageSelectorComponent} from '../language-selector/language-selector.component';
import {NgClass, NgIf} from '@angular/common';
import {Badge} from 'primeng/badge';
import {Ripple} from 'primeng/ripple';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [NgClass, NgIf, Badge, Ripple, RouterLink],
  standalone:true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  items: InputSignal<MenuItem[] | undefined> = input.required<MenuItem[] | undefined>();


}
