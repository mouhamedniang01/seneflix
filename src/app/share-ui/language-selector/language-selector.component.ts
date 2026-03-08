import {
  Component,
  inject,
  output,
  OutputEmitterRef,
  signal,
  WritableSignal
} from '@angular/core';
import {InputTextModule} from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SelectModule} from 'primeng/select';

import {LocalStorageService} from '../../core/services/local-storage/local-storage.service';
import {Language} from '../../core/enums/language.enum';
import {form} from '@angular/forms/signals';

@Component({
  selector: 'app-language-selector',
  imports: [InputTextModule, FormsModule, SelectModule, FormsModule, ReactiveFormsModule],
  templateUrl: './language-selector.component.html',
  standalone: true,
  styleUrl: './language-selector.component.css'
})

export class LanguageSelectorComponent {



  localStorageService: LocalStorageService = inject(LocalStorageService);
  selectedLanguage!: WritableSignal<Langue>;


  onLanguageUpdate: OutputEmitterRef<Langue> = output<Langue>();



  languagies = signal<Langue[]>([
    { name: 'Français', code: 'fr-FR', content: Language.FRENCH },
    { name: 'English', code: 'en-UK', content: Language.ENGLISH },
  ]);

  languageModel = signal<Langue>({
    name: 'Français',
    code: 'fr-FR',
    content: Language.FRENCH
  });

  languageForm = form(this.languageModel);

  updateLanguage(langue: Langue) {
    this.languageForm().value.set(langue);
    this.onLanguageUpdate.emit(langue);
  }
}

export  interface  Langue{
  name: string, code: string,content: Language
}



