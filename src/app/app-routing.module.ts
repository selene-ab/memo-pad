import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './features/header/header.component';
import { NewNoteComponent } from './features/new-note/new-note.component';
import { SettingsComponent } from './features/settings/settings.component';

const routes: Routes = [
  { path: 'home', component: HeaderComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'new-note', component: NewNoteComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
