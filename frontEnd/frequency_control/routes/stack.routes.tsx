import '../gesture-handler.native'

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginPage from "@/app/screen/loginPage";
import RegisterPage from "@/app/screen/registerPage";
import HomePage from '@/app/screen/homePage';
import BottomTabs from './bottomTabs';

const Stack = createNativeStackNavigator()

export default function StackRoutes() {
    return(
        <Stack.Navigator initialRouteName='login' screenOptions={{title: '', headerShown: false, animation: "slide_from_right"}}>
            <Stack.Screen name="login"      component={LoginPage}/>
            <Stack.Screen name="register"   component={RegisterPage}/>
            <Stack.Screen name="home"       component={BottomTabs}/>
        </Stack.Navigator>
    )
}