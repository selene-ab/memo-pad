import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './features/header/header.component';
import { NotesListComponent } from './features/notes-list/notes-list.component';
import { NoteDescriptionComponent } from './features/note-description/note-description.component';
import { NewNoteComponent } from './features/new-note/new-note.component';
import { UpdateNoteComponent } from './features/update-note/update-note.component';
import { SettingsComponent } from './features/settings/settings.component';
import { DeleteComponent } from './features/delete/delete.component';
import { MaterialModule } from './material.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NotesListComponent,
    NoteDescriptionComponent,
    NewNoteComponent,
    UpdateNoteComponent,
    SettingsComponent,
    DeleteComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularEditorModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
