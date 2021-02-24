import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'mobx-react-lite/batchingForReactDom';
import {createStore} from "./stores/helpers/create-store";
import {StoreProvider} from "./stores/helpers/store-context";

const rootStore = createStore();

// create 4 users
rootStore.dataStore.usersStore.addUser('Georgy');
rootStore.dataStore.usersStore.addUser('Student 1');
rootStore.dataStore.usersStore.addUser('Student 2');
rootStore.dataStore.usersStore.addUser('Student 3');

ReactDOM.render(
    <StoreProvider value={rootStore}>
        <App/>
    </StoreProvider>, document.getElementById('root'));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
