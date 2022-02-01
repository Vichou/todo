import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { createTodo } from 'src/app/store/actions';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {

  todoForm: FormGroup;

  constructor(formBuilder: FormBuilder, private store:Store, private router:Router) {
    this.todoForm = formBuilder.group({
      title: formBuilder.control('', [Validators.required]),
      description: formBuilder.control(''),
    });
  }

  createTodo() {
    this.store.dispatch(createTodo({ todoBase: this.todoForm.value }));
    this.router.navigate(['/']);
  }
}
