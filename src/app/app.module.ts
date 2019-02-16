import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrmsystemModule } from './crmsystem/crmsystem.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, CrmsystemModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
