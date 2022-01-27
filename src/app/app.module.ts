import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {EffectsModule} from '@ngrx/effects';
import {Effects} from 'src/store/effects';
import {StoreModule} from '@ngrx/store';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TodoListComponent } from './todo-list/todo-list.component';
import { todosReducer } from 'src/store/reducer';
import { environment } from 'src/environments/environment';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    DetailsComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    EffectsModule.forRoot([Effects]),
    StoreModule.forRoot({todosStore: todosReducer}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
