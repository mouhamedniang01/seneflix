import {MenuItem} from 'primeng/api';
import {Component, input, InputSignal, OnInit} from '@angular/core';
import {Menubar} from 'primeng/menubar';
import {LanguageSelectorComponent} from '../language-selector/language-selector.component';
import {NgClass, NgIf} from '@angular/common';
import {Badge} from 'primeng/badge';
import {Ripple} from 'primeng/ripple';

@Component({
  selector: 'app-navbar',
  imports: [ NgClass, NgIf, Badge, Ripple],
  standalone:true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  items: InputSignal<MenuItem[] | undefined> = input.required<MenuItem[] | undefined>();


}
