import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CommunityTreeComponent } from './community-tree/community-tree.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {FlexLayoutModule} from '@angular/flex-layout';
import { CommunityTreeNodeComponent } from './community-tree-node/community-tree-node.component';
import { MoveToDialogComponent } from './move-to-dialog/move-to-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    CommunityTreeComponent,
    CommunityTreeNodeComponent,
    MoveToDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
