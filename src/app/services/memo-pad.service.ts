import { Injectable } from '@angular/core';
import { Label } from '../interfaces/label';
import { Note } from '../interfaces/note';
import { nanoid } from 'nanoid';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MemoPadService {
  constructor() {
    this.subject = new Subject<boolean>();
  }

  // Mostrar descripción de las notas

  public showNoteDescription: boolean = false;

  // Subject para que se actualicen los cambios en la página

  public subject: Subject<boolean>;

  // Generar un ID unico a cada nota

  generateNoteID() {
    return nanoid();
  }

  // Crear una nota y guardarla en el localStorage

  saveNote(note: Note) {
    // Creamos un array vacio para que sea un array desde la primera nota
    let notes = [];
    // Si no existen notas en el localStorage, metemos la nota en el array y lo guardamos
    if (localStorage.getItem('Notas') == null) {
      notes.push(note);
      localStorage.setItem('Notas', JSON.stringify(notes));
    } else {
      // si existe alguna nota, guardamos las existentes en nuestra variable, agragamos la nueva y lo guardamos en el storage
      notes = JSON.parse(localStorage.getItem('Notas'));
      notes.push(note);
      localStorage.setItem('Notas', JSON.stringify(notes));
    }
    this.subject.next(true);
  }

  // Recuperar las notas del localStorage

  getAllNotes() {
    return JSON.parse(localStorage.getItem('Notas'));
  }

  // Recuperar una nota por ID

  getNoteByID(id: string) {
    let notes = JSON.parse(localStorage.getItem('Notas'));
    return notes.find((element) => {
      return element.id == id;
    });
  }

  // Editar una nota

  updateNote(id: string, newNote: Note) {
    let notes = JSON.parse(localStorage.getItem('Notas'));
    let index = notes.findIndex((element) => {
      return element.id == id;
    });
    notes.splice(index, 1, newNote);
    localStorage.setItem('Notas', JSON.stringify(notes));
    this.subject.next(true);
  }

  // Borrar una nota

  deleteNote(id: string) {
    let notes = JSON.parse(localStorage.getItem('Notas'));
    if (notes.length > 1) {
      let index = notes.findIndex((element) => {
        return element.id == id;
      });
      notes.splice(index, 1);
      localStorage.setItem('Notas', JSON.stringify(notes));
    } else {
      localStorage.removeItem('Notas');
    }
    this.subject.next(true);
  }

  // Crear una categoria y guardarla en el localStorage.

  saveCategoryLabel(label: Label) {
    let labels = [];
    if (localStorage.getItem('Etiquetas') == null) {
      labels.push(label);
      localStorage.setItem('Etiquetas', JSON.stringify(labels));
    } else {
      labels = JSON.parse(localStorage.getItem('Etiquetas'));
      labels.push(label);
      localStorage.setItem('Etiquetas', JSON.stringify(labels));
    }
  }

  // Obtener las categorias creadas

  getCategories() {
    return JSON.parse(localStorage.getItem('Etiquetas'));
  }

  // Borrar todos los datos de la aplicacion

  deleteUserData() {
    localStorage.clear();
  }
}
