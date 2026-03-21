import {
  Component, forwardRef,
  input,
  InputSignal,
  model,
  ModelSignal,
  output,
  OutputEmitterRef, signal, WritableSignal,
} from '@angular/core';
import {AutoCompleteCompleteEvent, AutoCompleteSelectEvent} from 'primeng/autocomplete';
import {ImportModule} from '../import';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
@Component({
  selector: 'app-autocomplete',
  imports: [
    ImportModule
  ],
  /**
   * Pour qu'Angular reconnaisse ton composant comme un champ de formulaire,
   * tu dois l'enregistrer dans le
   * système d'injection de dépendances via NG_VALUE_ACCESSOR :
   */
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(()=>AutocompleteComponent),
      // forwardRef() car la classe n'est pas encore définie au moment
      // où le provider est évalué

      multi: true // plusieurs composants peuvent implémenter CVA
    }
  ],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.css',
})
export class AutocompleteComponent <T> implements ControlValueAccessor{

  //INPUTS
  suggestions: InputSignal<T[]> = input<T[]>([]); // données filtrées du parent
  name: InputSignal<string>  = input<string>('Label'); // propriété à afficher (ex: 'name')
  placeholder:  InputSignal<string>  = input<string>('Search ....'); // texte placeholder
  multiple: InputSignal<boolean> = input<boolean>(false); // mode multi-sélection
  dropdown: InputSignal<boolean> = input<boolean>(false);  // affiche le bouton dropdown
  delay:  InputSignal<number>  = input.required<number>();// délai debounce en ms
  readonly isTranslate: InputSignal<boolean> = input<boolean>(false);
  readonly isFluid: InputSignal<boolean> = input<boolean>(false);
  inputStyleClass:InputSignal<string>  = input<string>('w-80') ;


 // items: InputSignal<any[]> = input<any[]>([]);
 // result: OutputEmitterRef<any> = output<any>();
 // notFoundMessage: InputSignal<string> = input<string>('No item were found');

  //Output
   search:OutputEmitterRef<string> = output<string>();
   selected:OutputEmitterRef<T> = output<T>();
   cleared:OutputEmitterRef<void> = output<void>();

  //  État interne
  //value: T | T[] | null = null;
  value: ModelSignal<T | T[] | undefined> = model<T | T[] | undefined>();
  disabled:WritableSignal<boolean | string> = signal(false);

  // Callbacks enregistrés par Angular
  private onChange: (val: any) => void = ():void => {};
  private onTouched: () => void = ():void => {};

  /**
   * Pousse une valeur depuis le FormControl vers ton composant
   * Angular pousse une valeur (setValue/patchValue/reset)
   * (ex:setValue, patchValue)
   * @param val
   */
  writeValue(val: T | T[] | undefined): void {
    this.value.set( val ?? undefined);
  }

  /**
   * Angular enregistre son callback de changement
   * change (notifie Angular)
   * @param fn
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * Donne à ton composant un callback pour signaler qu'il a été 'touché'
   * (blur, click)
   * @param fn
   */
  registerOnTouched(fn: any): void {
    throw new Error("Method not implemented.");
  }

  /**
   *  Angular active/désactive le composant
   * Active ou désactive ton composant en fonction du state du FormControl (optionnel)
   * @param isDisabled
   */
  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }


  //  Event handlers
// Quand l'utilisateur tape dans l'input
  onSearch(event: AutoCompleteCompleteEvent): void {
    this.search.emit(event.query);
  }
// Quand l'utilisateur sélectionne un item
  onSelect(item: AutoCompleteSelectEvent): void {
    this.onChange(item); // notifie Angular
    this.onTouched(); // marque comme touched
    const  selected = item as T;
    this.selected.emit(selected);
  }
// Quand l'utilisateur efface la sélection
  onClear(): void {
    this.value.set(undefined);
    this.onChange(null);
    this.cleared.emit();
  }




}
