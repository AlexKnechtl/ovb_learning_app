import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Router, {sceneReducer} from './Router2';
import { signInWithoutPasswordAction, configureStore } from 'core/lib';
import NavigationService from './NavigationService';

const store = configureStore({routes: sceneReducer});
// store.dispatch(signInWithoutPasswordAction());

export default class App extends Component {
    componentDidMount(){
        store.dispatch(signInWithoutPasswordAction());
    }
    render() {
        return (
            <Provider store={store}>
                <Router ref={navRef => {NavigationService.setTopLevelNavigator(navRef);}}/>
            </Provider>
        );
    }
}