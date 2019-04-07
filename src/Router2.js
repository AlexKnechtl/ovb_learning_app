//@ts-check

import { createStackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";
import HomeScene from "./components/HomeScene";
import LoginScene from "./components/LoginScene";
import LoadingScene from "./components/LoadingScene";
import CategoryScene from "./components/CategoryScene";
import CategoryInfoScene from "./components/CategoryInfoScene";
import QuestionScene from "./components/QuestionScene";
import NavigationService from './NavigationService';
import { LOGIN_SUCCESS, LOGIN_FAILED, SIGNED_OUT, START_SIGN_IN, START_SIGN_IN_WITHOUT_CREDENTIAL, SET_CURRENT_MODULE, SELECT_CURRENT_SUBMODULE } from "core";


const AppStack = createStackNavigator({
  main: {
    screen: HomeScene
  },
  category:{
      screen: CategoryScene
  },
  info:{
      screen: CategoryInfoScene
  },
  question: {
      screen: QuestionScene
  }
},
{
    headerMode: 'none'
});

const AuthStack = createStackNavigator({
    SignIn: LoginScene
},
{
    headerMode: 'none'
});

const rootNavigator = createSwitchNavigator({
    Login: AuthStack,
    Home: AppStack,
    AuthLoading: LoadingScene
},{
    initialRouteName: 'AuthLoading',
});

export default createAppContainer(rootNavigator);

export const sceneReducer = (state = {}, {type}) => {
    console.log(`SceneReducer" ${type}`);
    // if(!Actions.main) return state;
    switch(type){
        case LOGIN_SUCCESS: NavigationService.navigate('Home');
            return state;
        case LOGIN_FAILED: NavigationService.navigate('Login');
            return state;
        case SIGNED_OUT: NavigationService.navigate('Login');
            return state;
        case START_SIGN_IN : NavigationService.navigate('AuthLoading');
            return state;
        case START_SIGN_IN_WITHOUT_CREDENTIAL : NavigationService.navigate('AuthLoading');
            return state;
        case SET_CURRENT_MODULE: NavigationService.navigate('category');
            return state;
        case SELECT_CURRENT_SUBMODULE: NavigationService.navigate('info');
            return state;
        default:
            return state;
    }    
}