import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MemoPadService } from 'src/app/services/memo-pad.service';
import { DeleteComponent } from '../delete/delete.component';
import { UpdateNoteComponent } from '../update-note/update-note.component';

@Component({
  selector: 'app-note-description',
  templateUrl: './note-description.component.html',
  styleUrls: ['./note-description.component.scss'],
})
export class NoteDescriptionComponent implements OnInit {
  @Input() public note;

  constructor(
    public dialog: MatDialog,
    public memoPadService: MemoPadService
  ) {}

  ngOnInit(): void {
    this.updateData();
  }

  openEditorNote() {
    const dialogRef = this.dialog.open(UpdateNoteComponent, {
      data: {
        id: this.note.id,
      },
    });
  }

  openDeleteDialog() {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {
        message: '¿Seguro que quieres borrar esta nota?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deteleNote(this.note.id);
      }
    });
  }

  deteleNote(id: string) {
    this.memoPadService.deleteNote(id);
  }

  closeNote() {
    this.memoPadService.showNoteDescription = false;
  }

  updateData() {
    this.memoPadService.subject.subscribe((refresh) => {
      this.closeNote();
    });
  }
}
