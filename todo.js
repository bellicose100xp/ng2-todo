if (typeof __decorate !== "function") __decorate = function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
if (typeof __metadata !== "function") __metadata = function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var di_1 = require('angular2/di');
var angularfire_1 = require('firebase/angularfire');
var TodoApp = (function () {
    function TodoApp(sync) {
        this.todoService = sync.asArray();
        this.bulkCheckState = false;
        // check if array is empty, if yes, then wait for it to load using timeout
        if (this.todoService.list.length < 1) {
            setTimeout(function () {
            }, 1000); // without this timeout the view renders before data is fetch
        }
    }
    TodoApp.prototype.addTodo = function ($event, newTodo) {
        if ($event.which === 13) {
            this.todoService.add({
                title: newTodo.value,
                completed: false
            });
            newTodo.value = '';
        }
    };
    TodoApp.prototype.toggleCheck = function (todo) {
        todo.completed = !todo.completed;
        this.todoService.save(todo);
    };
    TodoApp.prototype.removeTodo = function (todo) {
        this.todoService.remove(todo);
    };
    TodoApp.prototype.clearChecked = function () {
        var toClear = {};
        this.todoService.list.forEach(function (todo) {
            if (todo.completed) {
                toClear[todo._key] = null;
            }
        });
        this.todoService.bulkUpdate(toClear);
        this.bulkCheckState = false;
    };
    TodoApp.prototype.toggleBulkCheck = function () {
        this.bulkCheckState = !this.bulkCheckState;
    };
    TodoApp = __decorate([
        angular2_1.Component({
            selector: 'todo-app',
            injectables: [
                angularfire_1.AngularFire,
                di_1.bind(Firebase).toValue(new Firebase('https://ng2test.firebaseio.com/'))
            ]
        }),
        angular2_1.View({
            templateUrl: 'todo.html',
            directives: [angular2_1.For]
        }), 
        __metadata('design:paramtypes', [angularfire_1.AngularFire])
    ], TodoApp);
    return TodoApp;
})();
angular2_1.bootstrap(TodoApp);
