import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MemoPadService } from 'src/app/services/memo-pad.service';
import { Note } from 'src/app/interfaces/note';
@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.scss'],
})
export class UpdateNoteComponent implements OnInit {
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
  public updateForm: FormGroup;
  public note;
  public labels;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private memoPadService: MemoPadService
  ) {}

  ngOnInit(): void {
    this.viewNote();
    this.viewCategories();
  }

  viewNote() {
    this.note = this.memoPadService.getNoteByID(this.data.id);
    this.initForm();
  }

  viewCategories() {
    this.labels = this.memoPadService.getCategories();
  }

  initForm() {
    this.updateForm = new FormGroup({
      name: new FormControl(this.note.name, [Validators.required]),
      label: new FormControl(this.note.category),
      description: new FormControl(this.note.description),
    });
  }

  updateNote() {
    let json: Note = {
      name: this.updateForm.get('name').value,
      id: this.note.id,
      category: this.updateForm.get('label').value,
      description: this.updateForm.get('description').value,
      creation_date: this.note.creation_date,
    };
    this.memoPadService.updateNote(this.note.id, json);
  }
}
