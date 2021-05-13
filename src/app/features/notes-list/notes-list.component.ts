import { Component, Input, OnInit } from '@angular/core';
import { MemoPadService } from 'src/app/services/memo-pad.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
})
export class NotesListComponent implements OnInit {
  public userNotes;
  public descriptionNote;
  public labels;

  constructor(private memoPadService: MemoPadService) {}

  ngOnInit(): void {
    this.viewAllNotes();
    this.viewCategories();
    this.updateData();
  }

  viewAllNotes() {
    this.userNotes = this.memoPadService.getAllNotes();
  }

  viewCategories() {
    this.labels = this.memoPadService.getCategories();
  }

  getTextColor(labelName: string) {
    let label = this.labels.find((element) => element.name == labelName);
    return label.text_color;
  }

  getBgColor(labelName: string) {
    let label = this.labels.find((element) => element.name == labelName);
    return label.color;
  }

  viewDescription(note) {
    this.descriptionNote = note;
    this.memoPadService.showNoteDescription = true;
  }

  updateData() {
    this.memoPadService.subject.subscribe((refresh) => {
      this.viewAllNotes();
    });
  }
}
