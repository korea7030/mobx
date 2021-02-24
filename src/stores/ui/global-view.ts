import {autorun, observable} from "mobx";
import RootStore from '../root-store';

export default class GlovalView {
    @observable
    themeColor: string = 'blue';

    constructor(rootStore: RootStore) {
        autorun(() => {
            console.log(rootStore.dataStore.todoStore.list.length);
        })
    }
}

