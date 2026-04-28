/**
 * @last modification : 18-04-2026
 * 
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { TendancesDirective } from './tendances.directive';
import { Component, DebugElement, Injector } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import testProviders from '../../../test-providers';
import { By } from '@angular/platform-browser';

@Component({
  imports: [TendancesDirective],
  standalone:true,
  template: `
    <h2>About</h2>
    <h3 appTendances>Quote of the day:</h3>
  `,
})
export class About {}
describe('TendancesDirective', () => {
  let fixture: ComponentFixture<About>;
  let component: ComponentFixture<About>; //AboutComponent

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [About],
      providers: [testProviders],
    });
    fixture = TestBed.createComponent(About);

    await fixture.whenStable();
    /**
     * fixture.detectChanges() est utilisé pour déclencher la détection des changements dans le composant,
     * ce qui permet de mettre à jour les propriétés et les vues associées au composant.
     * Cela est appelé avant chaque test pour garantir que le composant soit en état cohérent pour le test.
     */
    await fixture.detectChanges();
    /**
     * Si fixture.detectChanges() n'est pas appelé, 
     * les propriétés et les vues associées au composant ne seront pas mises à jour,
     *  ce qui peut entraîner des résultats incorrects pour les tests.
     *  Les tests peuvent échouer ou donner des résultats inattendus en raison de la non-mise à jour du composant.
     */
  });

 
  
  it('should create an instance', () => {       
    const debugEl =   fixture.debugElement.query(By.directive(TendancesDirective));
    const directive = debugEl.injector.get(TendancesDirective);

    expect(directive).toBeTruthy(); 
  });

   it('should have the correct title', () => {
     const titleElement = fixture.nativeElement.querySelector('h2');
     expect(titleElement.textContent).toBe('About');
   });
  
  
  it('should apply default boxShadow', () => {
    const debugEl = fixture.debugElement.query(
      By.directive(TendancesDirective)
    );
    const el: HTMLElement = debugEl.nativeElement;
    expect(el.style.boxShadow).toBe('0 20px 30px rgb(0 0 0 / 0.9)');
  });

 
  it('should apply default overflow which is set to hidden', () => {
    
    const debugEl = fixture.debugElement.query(
      By.directive(TendancesDirective)
    );

    const el : HTMLElement = debugEl.nativeElement;
    expect(el.style.overflow).toBe('hidden');
  });

  it('should apply default border radius ', () => {
    const debugEl = fixture.debugElement.query(
      By.directive(TendancesDirective)
    );

    const el: HTMLElement = debugEl.nativeElement;
     
    expect(el.style.borderRadius).toBe('12px');
  });

  it('should apply default max height', () => {
    const debugEl = fixture.debugElement.query(
      By.directive(TendancesDirective)
    );

    const el: HTMLElement = debugEl.nativeElement;
    expect(el.style.maxHeight).toBe('80%');
  })
});
 