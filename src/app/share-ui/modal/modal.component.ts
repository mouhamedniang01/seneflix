import {Component, inject, input, InputSignal, output, OutputEmitterRef} from '@angular/core';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {Image} from 'primeng/image';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-modal',
  imports: [DialogModule, ButtonModule, Image, DatePipe],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  router :Router = inject(Router);

  //modal parameters
  onChangeVisibility :OutputEmitterRef<boolean> = output<boolean>();
  isModalVisible: InputSignal<boolean> = input<boolean>(false);
  maximizable: InputSignal<boolean> = input<boolean>(true);
  width: InputSignal<string> = input<string>('50rem');
  content:InputSignal<string | undefined> = input<string | undefined>();
  header:InputSignal<string> = input<string>('Header');
  avatar:InputSignal<string | undefined> = input<string | undefined>();
  readonly headerSubtitle : InputSignal<string | undefined> = input<string | undefined>()
  readonly birthday :InputSignal<string | undefined> = input<string | undefined>()

  textButton  :InputSignal<string | undefined>= input();
  routerLink: InputSignal<string | undefined> = input();

  //show modal by emitting an output signal
  showDialog():void {
    this.onChangeVisibility.emit(true);
  }

  //close modal
  onHideModal() {
    this.onChangeVisibility.emit(false);
  }

  nagivateToPage() {
    this.router.navigateByUrl(`/${this.routerLink()}`).then();
  }
}
