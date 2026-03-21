import {NgModule} from '@angular/core';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { CardModule } from 'primeng/card';
import { GalleriaModule } from 'primeng/galleria';
import { TabsModule } from 'primeng/tabs';
import { ImageModule } from 'primeng/image';
import {Popover} from 'primeng/popover';
import { ButtonDirective} from 'primeng/button';
import {IconFieldModule} from 'primeng/iconfield';
import {InputGroup} from 'primeng/inputgroup';
import {InputText} from 'primeng/inputtext';
import {InputGroupAddon} from 'primeng/inputgroupaddon';
import {FormsModule} from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import {AutoCompleteModule} from 'primeng/autocomplete';

@NgModule({
  exports:[CardModule, CardModule, AnimateOnScrollModule,
    AvatarModule, ButtonModule, MenuModule, PanelModule,MenuModule,
    GalleriaModule, FormsModule, ImageModule, TabsModule,
    IconFieldModule, Popover, ButtonModule, InputGroup, InputText,
    ButtonDirective, InputGroupAddon,AutoCompleteModule],
  imports:[
    CardModule, CardModule, AnimateOnScrollModule,AutoCompleteModule,AvatarModule, ButtonModule, MenuModule, PanelModule,
    GalleriaModule, FormsModule, ImageModule, TabsModule, IconFieldModule, Popover, InputGroup, InputText, ButtonDirective, InputGroupAddon,],

})
export class ImportModule{}
