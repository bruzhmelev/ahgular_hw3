import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';

import { HttpService } from './common/services/http.service';

//TODO
//Вынести сервис запроса к api reddit
//Вынести URL api и т.п. в конфиг файл
//? Вынести копмпоненту результат
//Переделать с @ViewChild - на метод-события с передачей в управляемую последовательность

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [
    HttpService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
