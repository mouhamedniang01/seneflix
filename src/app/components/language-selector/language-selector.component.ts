import {Component, OnInit, output, OutputEmitterRef} from '@angular/core';
import {InputTextModule} from 'primeng/inputtext';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SelectModule} from 'primeng/select';
import {CommonModule} from '@angular/common';
import {LocalStorageService} from '../../services/local-storage/local-storage.service';
import {Language} from '../../enums/language.enum';

@Component({
  selector: 'app-language-selector',
  imports: [InputTextModule, FormsModule, SelectModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './language-selector.component.html',
  standalone: true,
  styleUrl: './language-selector.component.css'
})

export class LanguageSelectorComponent implements  OnInit{
  formGroup: FormGroup = new FormGroup({
    selectedLangue: new FormControl('')
  });
  languagies: Langue[] | undefined;

  selectedLanguage!: Langue;

   onLanguageUpdate:OutputEmitterRef<Langue | string> = output<Langue | string>();
  constructor(public localStorageService:LocalStorageService) {}


 public updateLanguage():void {
    // Émettre la nouvelle valeur
  this.selectedLanguage = this.formGroup.controls['selectedLangue'].value;
  const  emit = this.selectedLanguage.content ;
   this.onLanguageUpdate.emit(emit);

  }
  ngOnInit() {
    this.setLanguagies();
  }


  // assign language I18N
  public setLanguagies(){
    this.languagies = [
      { name: 'Français', code: 'FR',content: Language.FRECNH},
      { name: 'English', code: 'UK' ,content:  Language.ENGLISH},
    ];

  }
}
export  interface  Langue{
  name: string, code: string,content: Language
}
