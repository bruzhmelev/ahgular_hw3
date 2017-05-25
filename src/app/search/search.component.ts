import { Component, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/fromPromise';

@Component({
  selector: 'gs-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{

@ViewChild('sinput', { read: ViewContainerRef})
public sinput: ViewContainerRef;

private inputElem: HTMLInputElement;

@Output()
public search(value): void {
  console.dir('sinput: ' + this.inputElem.value);
}

public ngOnInit(): void {
  this.inputElem = this.sinput.element.nativeElement;

  this.subscribeOnInput();
}

private subscribeOnInput(): void {
  Observable.fromEvent(this.inputElem, 'input')
  .debounceTime(300)
  .map((event: KeyboardEvent) => (event.target as HTMLInputElement).value)
  // .do((searchTerm: string) => {
  //   console.log(searchTerm);
  // })
  .switchMap((searchTerm: string) => {
    return Observable
      //.fromPromise(fetch(`https://api.github.com/search/repositories?q=${searchTerm}`)
      .fromPromise(fetch(`https://www.reddit.com/r/gifs/search.json?q=${searchTerm}&sort=new`)
      //https://www.reddit.com/r/gifs/search.json?q=ferrari&sort=new
        .then((res: Response) => res.json()));
  })
  .map((res: any) => res.data.children)
  .subscribe((items//: RedditSearchResItem[]
  ) => console.dir(items));
}//ferrari

}
