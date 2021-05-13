import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import * as moment from 'moment';
import { Note } from 'src/app/interfaces/note';
import { MemoPadService } from 'src/app/services/memo-pad.service';

@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.scss'],
})
export class NewNoteComponent implements OnInit {
  public editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    minHeight: '10rem',
    placeholder: 'Contenido de tu nota',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['undo', 'redo', 'strikeThrough', 'subscript', 'superscript', 'heading'],
      [
        'backgroundColor',
        'insertVideo',
        'toggleEditorMode',
        'insertImage',
        'link',
        'unlink',
        'removeFormat',
        'insertHorizontalRule',
        'fontName',
      ],
    ],
  };
  public noteForm: FormGroup;
  public status;
  public labels;

  constructor(private memoPadService: MemoPadService) {}

  ngOnInit(): void {
    this.initForm();
    this.viewCategories();
  }

  initForm() {
    this.noteForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      label: new FormControl(''),
      description: new FormControl('', [Validators.required]),
    });
  }

  viewCategories() {
    this.labels = this.memoPadService.getCategories();
  }

  saveNewNote() {
    let note: Note = {
      name: this.noteForm.get('name').value,
      id: this.memoPadService.generateNoteID(),
      category: this.noteForm.get('label').value,
      description: this.noteForm.get('description').value,
      creation_date: moment().format('YYYY-MM-DD'),
    };

    if (this.noteForm.valid) {
      console.log(note);
      this.memoPadService.saveNote(note);
    }
  }
}
