import React from 'react';
import { StyleSheet } from 'react-native';
import { Scene, Router, Stack, ActionConst, Actions } from 'react-native-router-flux';
import LoginScene from './components/LoginScene';
import HomeScene from './components/HomeScene';
import LoadingScene from './components/LoadingScene';
import QuestionScene from './components/QuestionScene';
import CategoryScene from './components/CategoryScene';
import CategoryInfoScene from './components/CategoryInfoScene';
import { LOGIN_SUCCESS, SIGNED_OUT, START_SIGN_IN, START_SIGN_IN_WITHOUT_CREDENTIAL, LOGIN_FAILED, SET_CURRENT_MODULE, SELECT_CURRENT_SUBMODULE } from '../core/lib/adapters/redux/actions/types';

export default RouterComponent = () => {
    return (
        <Router navigationBarStyle={{ backgroundColor: '#304C59' }} titleStyle={styles.navTitle} >
            <Scene key="root" statusBarStyle="light-content" hideNavBar >
                <Scene key="auth" navigationBarStyle={{ backgroundColor: '#304C59' }} hideNavBar type={ActionConst.REPLACE}>
                    <Scene key='loading' component={LoadingScene} />   
                    <Scene key="login" component={LoginScene} />
                </Scene>
                <Scene key="home" component={HomeScene} gesturesEnabled={false} renderBackButton={false} type={ActionConst.RESET} />
                <Stack key="main" hideNavBar cardStyle={{backgroundColor: '#FFF'}}>
                    <Scene key="category" component={CategoryScene} />
                    <Scene key="info" component={CategoryInfoScene} />
                    <Scene key="question" component={QuestionScene} />
                </Stack>
            </Scene>
        </Router>
    );
};

const styles = StyleSheet.create({
    navBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red', // changing navbar color
    },
    navTitle: {
        color: 'white', // changing navbar title color
        flex: 1,
        textAlign: 'center',
        fontSize: 20
    }
});


export const sceneReducer = (state = {}, {type}) => {
    console.log(`SceneReducer" ${type}`);
    if(!Actions.main) return state;
    switch(type){
        case LOGIN_SUCCESS: Actions.home();
            return state;
        case LOGIN_FAILED: Actions.auth(); Actions.login();
            return state;
        case SIGNED_OUT: Actions.auth(); Actions.login();
            return state;
        case START_SIGN_IN : Actions.auth();
            return state;
        case START_SIGN_IN_WITHOUT_CREDENTIAL : Actions.auth();
            return state;
        case SET_CURRENT_MODULE: Actions.main();
            return state;
        case SELECT_CURRENT_SUBMODULE: Actions.info();
            return state;
        default:
            return state;
    }    
}