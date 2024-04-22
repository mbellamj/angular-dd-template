import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appDropzone]',
  standalone: true,
})
export class DropzoneDirective {
  @Input() activeColor: string = '#999';
  @Input() inactiveColor: string = '#eee';
  @Input() activeOpacity: number = 0.8;

  @Output() dropSelection = new EventEmitter<boolean>();

  constructor(protected el: ElementRef<HTMLElement>) {
    this.el.nativeElement.style.transition = 'all .3s ease';
  }

  @HostListener('drag', ['$event'])
  @HostListener('dragenter', ['$event'])
  @HostListener('dragover', ['$event'])
  onStart(event: DragEvent) {
    this.preventPropagation(event);
    this.highlight(this.activeColor, this.activeOpacity);
  }

  @HostListener('dragend', ['$event'])
  @HostListener('dragleave', ['$event'])
  @HostListener('drop', ['$event'])
  onEnd(event: DragEvent) {
    this.preventPropagation(event);
    this.highlight(this.inactiveColor, 1);
    this.dropSelection.emit(true);
  }

  private highlight(color: string, opacity: number) {
    this.el.nativeElement.style.backgroundColor = color;
    this.el.nativeElement.style.opacity = `${opacity}`;
    this.el.nativeElement.style.border = `.3rem`;
  }

  protected preventPropagation(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }
}
