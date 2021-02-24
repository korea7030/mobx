import { observable, reaction, action, computed, when } from "mobx";

let runningId = 0;

class Todo {
    id: number = runningId++;

    @observable
    name: string = '';

    @observable
    isCompleted: boolean = false;

    private disposer: () => void;
        
    constructor(name: string) {
        this.name = name;

        reaction(
            () => this.isCompleted,
            () => {
                console.log(`Todo ${this.name}`)
            }
        )
    }

    @action
    updateName(name: string) {
        this.name = name;
    }

    @action
    toggleTodo() {
        this.isCompleted = !this.isCompleted
    }

    dispose() {
        this.disposer()
    }
}

class TodoList {
    @observable
    list: Todo[] = [];

    constructor() {
        reaction(
            () => this.list.length,
            ()=> {
                console.log(
                    `Total: ${this.list.length }, Completed: ${this.completed.length}, Incomplete: ${this.inComplete.length}`
                )
            }
        )

        when (
            () => this.list.length > 0 && this.list.every(todo => todo.isCompleted === true),
            () => console.log('Amazing work!')
        )
    }

    @action
    addTodo(name: string) {
        this.list.push(new Todo(name));
    }

    @action
    removeTodo(name: string) {
        const todoToRemove = this.list.find(todo => todo.name === name);

        if (todoToRemove) {
            todoToRemove.dispose();
            const todoIndex = this.list.indexOf(todoToRemove);
            this.list.splice(todoIndex, 1);
        }
    }

    @computed
    get completed() {
        return this.list.filter(todo => todo.isCompleted === true);
    }

    @computed
    get inComplete() {
        return this.list.filter(todo => todo.isCompleted === false);
    }
}

const todoList = new TodoList();

todoList.addTodo('sdfsdfsdf');