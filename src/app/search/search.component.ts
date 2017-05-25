import { Component, Input, OnInit,  Output, ViewChild, ViewContainerRef } from '@angular/core';
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

  @Input()
  public searchResults: RedditSearchResItemData[];


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
    .switchMap((searchTerm: string) => {
      return Observable
        .fromPromise(fetch(`https://www.reddit.com/search.json?q=${searchTerm}&sort=new`)
        //.fromPromise(fetch(`https://www.reddit.com/r/gifs/search.json?q=${searchTerm}&sort=new`)
          .then((res: Response) => res.json()));
    })
    .map((res: any) => res.data ? res.data.children : [])
    .subscribe((items: RedditSearchResItem[]) => {
      console.dir(items);
      this.searchResults = items.map((item: RedditSearchResItem) => item.data);
    });
  }
}
