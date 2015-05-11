import {Component, View, bootstrap, For} from 'angular2/angular2';
import {bind} from 'angular2/di';
import {AngularFire, FirebaseArray} from 'firebase/angularfire';

@Component({
    selector: 'todo-app',
    injectables: [
        AngularFire,
        bind(Firebase).toValue(new Firebase('https://ng2test.firebaseio.com/'))
    ]
})
@View({
    templateUrl: 'todo.html',
    directives: [For]
})
class TodoApp {
    todoService:FirebaseArray;
    bulkCheckState: boolean;

    constructor(sync:AngularFire) {
        this.todoService = sync.asArray();
        this.bulkCheckState = false;

        // check if array is empty, if yes, then wait for it to load using timeout
        if (this.todoService.list.length < 1) {
            setTimeout(()=> {
            }, 1000); // without this timeout the view renders before data is fetch
        }
    }

    addTodo($event, newTodo){
        if($event.which === 13) {

            this.todoService.add({
                title: newTodo.value,
                completed: false
            });

            newTodo.value = '';

        }
    }

    toggleCheck(todo){
        todo.completed = !todo.completed;
        this.todoService.save(todo);
    }

    removeTodo(todo){
        this.todoService.remove(todo);
    }

    clearChecked(){
        var toClear = {};

        this.todoService.list.forEach(todo => {
            if(todo.completed) {
                toClear[todo._key] = null;
            }
        });

        this.todoService.bulkUpdate(toClear);

        this.bulkCheckState = false;
    }

    toggleBulkCheck(){
        this.bulkCheckState = !this.bulkCheckState;
    }

}
bootstrap(TodoApp);
