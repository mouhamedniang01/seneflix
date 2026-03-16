import {
  Component,
  computed, effect,
  inject,
  input,
  InputSignal,
  ResourceRef,
  Signal,
  signal,
  WritableSignal
} from '@angular/core';
import {DatePipe, DecimalPipe} from '@angular/common';
import {Image} from 'primeng/image';
import {Tag} from 'primeng/tag';
import {Button} from 'primeng/button';
import {Result} from '../../movie/models/movies';
import {Router, UrlTree} from '@angular/router';
import {VideoDialogComponent} from '../../core/components/video-dialog/video.dialog.component';
import {Video} from '../../movie/models/video';
import {ModalComponent} from '../modal/modal.component';
import {LocalStorageService} from '../../core/services/local-storage/local-storage.service';
import {PeopleService} from '../../people/service/people.service';
import {HttpResourceRef} from '@angular/common/http';
import {Person} from '../../people/models/person';
import { MessageService } from 'primeng/api';
import {LoadingSpinnerComponent} from '../loading-spinner/loading-spinner.component';
import {Cast} from '../../people/models/cast';
@Component({
  selector: 'app-details-page',
  imports: [
    DatePipe,
    Image,
    Tag,
    DecimalPipe,
    Button,
    VideoDialogComponent,
    ModalComponent,
    LoadingSpinnerComponent,
  ],
  providers:[MessageService],
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.css',
})
export class DetailsPageComponent {
  title:InputSignal<string |undefined> =input<string>();
  synopsys:InputSignal<string |undefined> =input<string>();
  ratings:InputSignal<number |undefined> =input<number>();
  release_date:InputSignal<string |undefined> =input<string>();
  poster_path:InputSignal<string |undefined> =input<string|undefined>();
  genres:InputSignal<string[] |undefined> =input<string[]|undefined>();
  countries: InputSignal<string[] |undefined> =input<string[]|undefined>();
  production_compagnies: InputSignal<string[] |undefined> =input<string[]|undefined>();
  cast_rounded_images :  InputSignal<Cast[] |undefined> =input<Cast[] |undefined>();
  similars:  InputSignal<Result[] |undefined> =input<Result[] |undefined>();
  endpoint:InputSignal<string |undefined> =input<string>();
  id:InputSignal<number |undefined> =input<number>();
  router : Router = inject(Router);
  messageService:MessageService = inject(MessageService);

  visible:WritableSignal <boolean> = signal(false); // show video modal
  isPersonModalVisible :WritableSignal <boolean> = signal(false); //show person details modal
  localService: LocalStorageService= inject(LocalStorageService);
  langueSignal:Signal<string> = this.localService.getLanguage();
  append_response :WritableSignal<string> = signal('images');

 private readonly peopleService:PeopleService = inject(PeopleService);
  defaultPlaceholder: string = 'https://placehold.co/700x700';
  displayTitle: Signal<string> = computed(():string=> this.similars()!.length > 0 ? 'flex':'none');

  personId : WritableSignal<number | null > = signal(null)  ;
  langue:WritableSignal<string |undefined> = signal(  this.langueSignal());

  personResource :ResourceRef<Person | undefined> = this.peopleService.loadPersonResources(
    this.personId,this.langue,this.append_response
  );

  constructor() {
    effect(() => {
      // Se déclenche automatiquement dès que la valeur est chargée
      const  person:Person | undefined = this.personResource.value();
      if (person) {
        console.log('Personne chargée :', person);
        this.isPersonModalVisible.set(true); //  Ouvre le modal seulement quand les données sont prêtes
      }

      //Ne se déclenche plus au démarrage car EMPTY ne produit pas d'erreur
      const message:string | undefined = (this.personResource.error()as Error)?.message;
      if (message) this.showToastMessage('error',message,'error');
    });
  }

  //naviger vers la page film | série détaillée avec rafraichissement
  goToDetailsView(id:number) {
    this.router.navigateByUrl(
    `${this.endpoint()}/${id}/details`).then(
      ()=> {window.location.reload();}
      );
  }


  //show trailer video modal on youtube
  video : InputSignal<Video|undefined> = input<Video |undefined>();
  showYoutubeVideoModal() {
    this.visible.set(true);
  }

 //on close video modal
  protected closeVideoModal($event: boolean):void {
    this.visible.set($event);
  }


  //show actor details on modal
  showPeopleDetailModal(person_id: number): void {
    //  Déclenche le chargement — effect() gère le reste
    this.personId.set(person_id);
  }

  //show toast alert message
  showToastMessage(title:string,message:string ,severity:string) {
    this.messageService.add({ severity: severity, summary:title, detail:message });
  }

  //close actor modal
  closePersonDetail($event:boolean):void{
    this.isPersonModalVisible.set($event)
  }


  getRandomInt(max:number) {
    return Math.floor(Math.random() * max);
  }
  peopleImageId:WritableSignal<number> = signal(this.getRandomInt(5));

  posterPathStyle(){
    return ".poster-path {\n" +
      "  max-width: 350px;\n" +
      "  width: 100%;\n" +
      "  cursor: pointer;\n" +
      "}\n" +
      ".poster-path:hover{\n" +
      "  opacity: 0.8;\n" +
      "  transition: 20s opacity;\n" +
      "}";
  }

  //show person informations on madal
  protected maximizablePeopleModale: boolean = true;
  routerLink:Signal<string>=computed(()=>  'movies/'+this.personResource.value()?.id+'/cast');
  protected onPersonModalVisibleChange($event: boolean) {
    this.isPersonModalVisible.set($event);
  }
}
