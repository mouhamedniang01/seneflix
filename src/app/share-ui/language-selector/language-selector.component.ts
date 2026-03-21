import {
  Component,
  output,
  OutputEmitterRef,
  signal,
  WritableSignal
} from '@angular/core';
import {InputTextModule} from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SelectModule} from 'primeng/select';

import {Language} from '../../core/enums/language.enum';
import {FieldTree, form} from '@angular/forms/signals';

@Component({
  selector: 'app-language-selector',
  imports: [InputTextModule, FormsModule, SelectModule, FormsModule, ReactiveFormsModule],
  templateUrl: './language-selector.component.html',
  standalone: true,
  styleUrl: './language-selector.component.css'
})

export class LanguageSelectorComponent {

  onLanguageUpdate: OutputEmitterRef<Langue> = output<Langue>();



  languagies:WritableSignal<Langue[]> = signal<Langue[]>([
    { name: 'Français', code: 'fr-FR', content: Language.FRENCH },
    { name: 'English', code: 'en-UK', content: Language.ENGLISH },
  ]);

  languageModel = signal<Langue>({
    name: 'Français',
    code: 'fr-FR',
    content: Language.FRENCH
  });

  languageForm:FieldTree<Langue| string> = form(this.languageModel);

  updateLanguage(langue: Langue) {
    this.languageForm().value.set(langue);
    this.onLanguageUpdate.emit(langue);
  }
}

export  interface  Langue{
  name: string, code: string,content: Language
}



