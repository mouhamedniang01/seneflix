import {Component, OnInit, output, OutputEmitterRef} from '@angular/core';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';
import {SelectModule} from 'primeng/select';
import {CommonModule} from '@angular/common';
import {LocalStorageService} from '../../services/local-storage/local-storage.service';

@Component({
  selector: 'app-language-selector',
  imports: [InputTextModule,FormsModule, SelectModule,CommonModule, FormsModule],
  templateUrl: './language-selector.component.html',
  standalone: true,
  styleUrl: './language-selector.component.css'
})
export class LanguageSelectorComponent implements  OnInit{

  languagies: any[] | undefined;

  selectedLanguage:  string = '';

  onLanguageUpdate :OutputEmitterRef<string> = output<string>();
  constructor(public localStorageService:LocalStorageService) {}
  currentLanguage: string ='en-EN';

  updateLanguage():void {
    // Émettre la nouvelle valeur
   this.onLanguageUpdate.emit(this.currentLanguage);

  }
  ngOnInit() {
    this.setLanguagies();
    this.currentLanguage =  this.localStorageService.getLanguage('language')!;
  }


  // assign language I18N
  setLanguagies(){
    this.languagies = [
      { name: 'Français', code: 'FR',value: 'fr-FR'},
      { name: 'English', code: 'UK' ,value:  'en-EN'},
    ];
  }
}
