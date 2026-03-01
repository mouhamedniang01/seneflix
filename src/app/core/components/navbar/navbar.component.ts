import {MenuItem} from 'primeng/api';
import {ChangeDetectionStrategy, Component, input, InputSignal} from '@angular/core';
import {NgClass} from '@angular/common';
import {Badge} from 'primeng/badge';
import {Ripple} from 'primeng/ripple';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [NgClass, Badge, Ripple, RouterLink],
  standalone:true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  items: InputSignal<MenuItem[] | undefined> = input.required<MenuItem[] | undefined>();

}
