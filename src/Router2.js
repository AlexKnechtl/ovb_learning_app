import { createStackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";
import HomeScene from "./components/HomeScene";
import LoginScene from "./components/LoginScene";
import LoadingScene from "./components/LoadingScene";
import CategoryScene from "./components/CategoryScene";
import CategoryInfoScene from "./components/CategoryInfoScene";
import QuestionScene from "./components/QuestionScene";
import NavigationService from './NavigationService';
import TestScene from './components/TestScene';
import QuestionViewScene from './components/QuestionViewScene';
import PdfScene from './components/PdfScene';
import Impressum from './components/Impressum';
import TestStatistics from './components/StatisticsScene';
import TestResultScene from './components/TestResultScene';

import { LOGIN_SUCCESS, LOGIN_FAILED, SIGNED_OUT, START_SIGN_IN, START_SIGN_IN_WITHOUT_CREDENTIAL, SET_CURRENT_MODULE, SELECT_CURRENT_SUBMODULE, CONTINUE_MODULE_LEARNING, CONTINUE_SECTION_LEARNING, LEARN_FALSE_QUESTIONS_FROM_MODULE, GET_NEXT_QUESTION, INIT_EXAM, FINISH_EXAM, GET_RESULT_STATS_FOR_MODULE } from "core";



const questionTestNavigator = createSwitchNavigator({
    testScene: {
        screen: TestScene
    },
    testResultScene: createStackNavigator({
        testStatistics: {
            screen: TestStatistics
        },
        testResult: {
            screen: TestResultScene
        },
        pdfScene: {
            screen: PdfScene
        },
    }, { headerMode: 'none' })
},
{
    backBehavior: "none"
}
);

const AppStack = createStackNavigator({
    main: {
        screen: HomeScene
    },
    category: {
        screen: CategoryScene
    },
    info: {
        screen: CategoryInfoScene
    },
    question: {
        screen: QuestionScene
    },
    questionView: {
        screen: QuestionViewScene
    },
    pdfScene: {
        screen: PdfScene
    },
    impressum: {
        screen: Impressum
    },
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
    AuthLoading: LoadingScene,
    test: questionTestNavigator
}, 
{
        initialRouteName: 'AuthLoading'
    });

export default createAppContainer(rootNavigator);

export const sceneReducer = (state = {}, { type }) => {
    console.log(`SceneReducer" ${type}`);
    // if(!Actions.main) return state;
    switch (type) {
        case LOGIN_SUCCESS: NavigationService.navigate('Home');
            return state;
        case LOGIN_FAILED: NavigationService.navigate('Login');
            return state;
        case SIGNED_OUT: NavigationService.navigate('Login');
            return state;
        case START_SIGN_IN: NavigationService.navigate('AuthLoading');
            return state;
        case START_SIGN_IN_WITHOUT_CREDENTIAL: NavigationService.navigate('AuthLoading');
            return state;
        case SET_CURRENT_MODULE: NavigationService.navigate('category');
            return state;
        case SELECT_CURRENT_SUBMODULE: NavigationService.navigate('info');
            return state;
        case CONTINUE_MODULE_LEARNING: NavigationService.navigate('question');
        case LEARN_FALSE_QUESTIONS_FROM_MODULE: NavigationService.navigate('question');
        case CONTINUE_SECTION_LEARNING: NavigationService.navigate('question');
            return state;
        case INIT_EXAM: NavigationService.navigate('test');
            return state;
        case FINISH_EXAM: NavigationService.navigate('testStatistics');
            return state;
        case GET_RESULT_STATS_FOR_MODULE:
                NavigationService.navigate('testResult');
            return state;
        default:
            return state;
    }
}
