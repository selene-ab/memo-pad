import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Label } from 'src/app/interfaces/label';
import { MemoPadService } from 'src/app/services/memo-pad.service';
import { DeleteComponent } from '../delete/delete.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  public labelForm: FormGroup;
  public labels;

  constructor(
    public dialog: MatDialog,
    private memoPadService: MemoPadService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.viewCategories();
  }

  viewCategories() {
    this.labels = this.memoPadService.getCategories();
    console.log(this.labels);
  }

  initForm() {
    this.labelForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      text: new FormControl('', [Validators.required]),
      background: new FormControl('', [Validators.required]),
    });
  }

  createLabel() {
    let label: Label = {
      name: this.labelForm.get('name').value,
      text_color: this.labelForm.get('text').value,
      color: this.labelForm.get('background').value,
    };
    this.memoPadService.saveCategoryLabel(label);
    this.labelForm.reset();
    this.viewCategories();
  }

  openDeleteDialog() {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {
        message: '¿Seguro que quieres borrar TODO?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteAllData();
      }
    });
  }

  deleteAllData() {
    this.memoPadService.deleteUserData();
    this.router.navigate(['/home']);
  }
}
