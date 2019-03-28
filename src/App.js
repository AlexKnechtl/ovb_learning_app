import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Router, {sceneReducer} from './Router';
import { signInWithoutPasswordAction, configureStore } from 'core/lib';

const store = configureStore({routes: sceneReducer});
// store.dispatch(signInWithoutPasswordAction());

export default class App extends Component {
    render() {
        store.dispatch(signInWithoutPasswordAction());
        return (
            <Provider store={store}>
                <Router/>
            </Provider>
        );
    }
}