import { Directive, ElementRef, Renderer2, HostListener, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, first } from 'rxjs/operators';

@Directive({
  selector: '[appLoading]'
})
export class LoadingDirective {

  @Input('appLoading') loadingObservable?: Observable<any>;

  private originalContent!: HTMLElement;
  private spinner!: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('click')
  onClick() {
    if (this.loadingObservable) {
      this.startLoading();
      this.loadingObservable.pipe(
        first(),
        finalize(() => this.stopLoading())
      ).subscribe();
    }
  }

  private startLoading() {
    this.originalContent = this.el.nativeElement.cloneNode(true);
    this.spinner = this.renderer.createElement('mat-spinner');
    this.renderer.setAttribute(this.spinner, 'diameter', '20');
    this.renderer.setStyle(this.spinner, 'margin-left', '10px');
    this.renderer.setStyle(this.spinner, 'width', '20px');
    this.renderer.setStyle(this.spinner, 'height', this.el.nativeElement.clientHeight + 'px');
    this.renderer.setStyle(this.spinner, 'color', 'red');
    this.renderer.setStyle(this.spinner, 'value', 20);

    this.renderer.setProperty(this.el.nativeElement, 'disabled', 'true');
    this.renderer.appendChild(this.el.nativeElement, this.spinner);
  }

  private stopLoading() {
    this.renderer.removeChild(this.el.nativeElement, this.spinner);
    this.renderer.removeAttribute(this.el.nativeElement, 'disabled');
  }
}
