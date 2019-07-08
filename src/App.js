//@ts-check

import React, { Component } from 'react';
// import {BackHandler} from 'react-native';
import { Provider } from 'react-redux';
import Router, {sceneReducer} from './Router2';
import { signInWithoutPasswordAction, configureStore } from 'core/lib';
import NavigationService from './NavigationService';
import codePush from 'react-native-code-push';

export const store = configureStore({routes: sceneReducer});
// store.dispatch(signInWithoutPasswordAction());

class App extends Component {
    codePushStatusDidChange(status) {
        switch(status) {
            case codePush.SyncStatus.CHECKING_FOR_UPDATE:
                console.log("Checking for updates.");
                break;
            case codePush.SyncStatus.DOWNLOADING_PACKAGE:
                console.log("Downloading package.");
                break;
            case codePush.SyncStatus.INSTALLING_UPDATE:
                console.log("Installing update.");
                break;
            case codePush.SyncStatus.UP_TO_DATE:
                console.log("Up-to-date.");
                break;
            case codePush.SyncStatus.UPDATE_INSTALLED:
                console.log("Update installed.");
                alert("Update installiert!!");
                break;
        }
    }
    codePushDownloadDidProgress(progress) {
        console.log(progress.receivedBytes + " of " + progress.totalBytes + " received.");
    }

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

    // componentWillMount() {
    //     BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    // }

    // handleBackPress = () => {
    //     alert("Backhandler pressed");
    //     NavigationService.goBack();
    //     return true;
    // }
}

export default codePush({ checkFrequency: codePush.CheckFrequency.ON_APP_RESUME, installMode: codePush.InstallMode.ON_NEXT_RESUME })(App);