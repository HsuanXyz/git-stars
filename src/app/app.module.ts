/**
 * ng module
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { DBModule } from '@ngrx/db';

import { GithubService } from './services/github/github.service';
import { BaseUrlInterceptor } from './interceptors/base-url.interceptor';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { BindUserDialogComponent } from './components/bind-user-dialog/bind-user-dialog.component';

import { githubStarsReducer } from './reducers/github-stars.reducer';
import { githubUserReducer } from './reducers/github-user.reducer';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponentsModule } from './components/app-components.module';
import { schema } from './db';
import { DBService } from './services/db.service';
import { RepoSearchPipe } from './pipes/repo-search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    RepoSearchPipe,
  ],
  entryComponents: [
    BindUserDialogComponent
  ],
  imports: [
    environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : [],
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    LazyLoadImageModule,
    AppRoutingModule,
    AppComponentsModule,
    StoreModule.forRoot({
      stars: githubStarsReducer,
      user: githubUserReducer
    }),
    StoreDevtoolsModule.instrument({ maxAge: 10 }),
    DBModule.provideDB(schema)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptor,
      multi: true,
    },
    GithubService,
    DBService,
    RepoSearchPipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
