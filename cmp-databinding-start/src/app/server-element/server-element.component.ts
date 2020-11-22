import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ContentChild,
  DoCheck,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.Emulated // its global now
})
export class ServerElementComponent implements 
  OnInit,
  OnChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked, 
  AfterViewInit,
  AfterViewChecked,
  OnDestroy {
  @Input('srvElement') element: { type: string; name: string; content: string; };
  @Input() name: string;
  @ViewChild('heading', { static: true }) header: ElementRef;
  @ContentChild('contentParagraph', { static: true }) paragraph: ElementRef;

  constructor() { // 1
    console.log('constructor called!');
  }

  ngOnChanges(changes: SimpleChanges) { // 2
    console.log('ngOnChanges called!', changes);
  }

  ngOnInit(): void { // 3
    console.log('ngOnInit called!');
    console.log('Text content ', this.header.nativeElement.textContent);
    console.log('Text content of paragraph: ' + this.paragraph.nativeElement.textContent);
  }

  ngDoCheck(): void { // every change, some click or promise returned an values
    console.log('ngDoCheck called!');
  }

  ngAfterContentInit(): void {
    console.log('ngAfterContentInit called!');
    console.log('Text content of paragraph: ' + this.paragraph.nativeElement.textContent);
  }

  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked called!');
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit called!');
    console.log('Text content ', this.header.nativeElement.textContent);
  }

  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked called!');
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy called!');
  }

}
