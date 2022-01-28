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

  titleControl: FormControl;

  descriptionControl: FormControl;

  todoForm: FormGroup;

  constructor(formBuilder: FormBuilder, private store:Store, private router:Router) {
    this.titleControl = formBuilder.control('', [Validators.required]);
    this.descriptionControl = formBuilder.control(''); 
    this.todoForm = formBuilder.group({
      title: this.titleControl,
      description: this.descriptionControl,
    });
  }

  createTodo() {
    console.log(this.todoForm.value);
    this.store.dispatch(createTodo({ todoBase: this.todoForm.value }));
    this.router.navigate(['/'])
  }


}
