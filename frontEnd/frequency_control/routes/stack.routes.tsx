import '../gesture-handler.native'

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginPage from "@/app/screen/loginPage";
import RegisterPage from "@/app/screen/registerPage";
import HomePage from '@/app/screen/homePage';
import BottomTabs from './bottomTabs';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import AlertMessage from '@/app/component/alertMessage';
import { PopupProvider } from '@/app/context/popupContext';

const Stack = createNativeStackNavigator()

export default function StackRoutes() {
    return(
        <Stack.Navigator initialRouteName='login' screenLayout={providers} screenOptions={{title: '', headerShown: false, animation: "slide_from_right"}}>
            <Stack.Screen name="login"      component={LoginPage}/>
            <Stack.Screen name="register"   component={RegisterPage}/>
            <Stack.Screen name="home"       component={BottomTabs}/>
        </Stack.Navigator>
    )
}

function providers(props: React.PropsWithChildren) {
     return(
           <SafeAreaView style={{height: '100%', width: '100%'}}>
            <PopupProvider>
                <AlertMessage/>
               {props.children}
            </PopupProvider>
           </SafeAreaView>
       )
}

const alertMessageStyle = StyleSheet.create({

    container: {
        position: 'absolute',

        left: '50%',
        transform: [{translateX: '-50%'}],
        
        zIndex: 99
    }
})