import { DeleteEntityEffects } from './store/entity/effects/delete-entity.effects';
import { CreateEntityEffects } from './store/entity/effects/create-entity.effects';
import { EntityEffects } from './store/entity/effects/enitiy.effects';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './modules/routing.module';
import { AppComponent } from './app.component';
import { reducers, metaReducers } from './store';
import { environment } from '../environments/environment';
import { CoreModule } from './core/core.module';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    CoreModule,
    BrowserAnimationsModule,
    EffectsModule.forRoot([
      EntityEffects,
      CreateEntityEffects,
      DeleteEntityEffects,
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
