import {Component, OnInit} from '@angular/core';
import {TodoService} from '../../providers/todo.service';
import {Todo} from '../../models/Todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos: Todo[];
  todo: Todo[];

  //***properties for modals***//
  opened: boolean = false;
  size: string;
  noHeader: boolean = false;
  noFooter: boolean = false;
  directional: boolean = true;

  constructor(public _todoService: TodoService) {


  }

  ngOnInit() {

    this.todos = [];
    this._todoService.getTodos()
      .subscribe(todos => {
        this.todos = todos;
      });


  }

  open(size?: string) {
    this.size = size;
    this.opened = !this.opened;
  }

  cancel() {
    this.opened = false;
  }

  addTodo(event, todoText) {

    let result;
    let newTodo = {
      todo: todoText.value,
      iscomplete: false
    };

    result = this._todoService.saveTodo(newTodo);
    result.subscribe(() => {
      this.todos = [];
      this._todoService.getTodos()
        .subscribe(todos => {
          this.todos = todos;
        });
      todoText.value = '';
      //close the modal!
      this.opened = false;
    });
  }

  setEditState(todo, state) {
    if (state) {
      todo.isEditMode = state;
    } else {
      delete todo.isEditMode;
    }
  }

  updateStatus(todo) {

    var _todo = {
      id: todo.id,
      todo: todo.todo,
      iscomplete: !todo.iscomplete
    };

    this._todoService.updateTodo(_todo)
      .subscribe(data => {
        todo.iscomplete = !todo.iscomplete;
      })
  }

  updateTodoText(event, todo) {

    if (event.which == 13) {

      todo.todo = event.target.value;

      var _todo = {
        id: todo.id,
        todo: todo.todo,
        iscomplete: todo.iscomplete
      };

      this._todoService.updateTodo(_todo)
        .subscribe(data => {
          this.setEditState(todo, false);
        });
    }
  }

  deleteTodo(todo) {

    var id = todo.id;

    this._todoService.deleteTodo(id)
      .subscribe(todos => {
        this.todos = todos;
      });
  }
}

