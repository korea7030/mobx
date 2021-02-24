import {computed, observable} from "mobx";
import RootStore from "../../root-store";
import {getRoot} from "mobx-easy";

let runningId = 0;

export default class User {
    id: number;

    @observable
    name: string;

    constructor(name: string) {
        this.id = runningId++;
        this.name = name;

        const rootStore = getRoot<RootStore>();
        rootStore.dataStore.todoStore.addTodo('Finish The Course!', this.id);
    }

    @computed
    get todos() {
        const rootStore = getRoot<RootStore>();

        return rootStore.dataStore.todoStore.getUserTodos(this.id);
    }

    @computed
    get completedTodos() {
        return this.todos.filter(todo => todo.isCompleted);
    }

    @computed
    get incompletedTodos() {
        return this.todos.filter(todo => !todo.isCompleted);
    }
}