import { View, Image, Text, StyleSheet } from "react-native";

import Icons from '@expo/vector-icons/Feather'

import HomePage from "@/app/screen/homePage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import SystemManagement from "@/app/screen/systemManagement";
import HeaderComponent from "@/app/component/headerComponent";
import FrequencyManagement from "@/app/screen/frequencyManagement";
import SystemManagementRoutes from "./systemManagementRoutes";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
    return(
        <Tab.Navigator initialRouteName="Home" screenLayout={UpperHeader} screenOptions={{headerShown: false, animation: "none", tabBarStyle: {height: 70, padding: 'auto'}, title: "", tabBarHideOnKeyboard: true}}>
            <Tab.Screen name="Home"      component={HomePage}                   options={{  tabBarIcon: ({focused}) => (HomePageIcon(focused))}} />
            <Tab.Screen name="System"    component={SystemManagementRoutes}     options={{ tabBarIcon: ({focused}) => (SystemManagementIcon(focused))}}/>
            <Tab.Screen name="Frequency" component={FrequencyManagement}        options={{  tabBarIcon: ({focused}) => (FrequencyDetailsIcon(focused))}} />
        </Tab.Navigator>
    )
};

const iconStyle = StyleSheet.create({
    iconText: {
        fontSize: 10,
        width: '100%',
        textAlign: 'center',
    }
})

function FrequencyDetailsIcon(isFocused: boolean) {
    return(
        <View style={{marginInline: 'auto', paddingTop: 10}}>
            <Icons
                name="calendar"
                size={33}
                color={isFocused ? '#DE2121' : "#181818"}
            />
            <Text style={[iconStyle.iconText, {marginLeft: -9}]}>Frequência</Text>
        </View>
    )
}

function HomePageIcon(isFocused: boolean) {
    return(
        <View style={{marginInline: 'auto', paddingTop: 10, width: '105%', marginLeft: 1}}>
            <Icons 
                name="clock" 
                size={33}
                color={isFocused ? '#DE2121' : "#181818"}
            />
            <Text style={iconStyle.iconText}>Home</Text>
        </View>
    )
}

function SystemManagementIcon(isFocused: boolean) {
    return(
        <View style={{marginInline: 'auto', paddingTop: 10}}>
            <Icons 
                name="tool" 
                size={33}
                color={isFocused ? '#DE2121' : "#181818"}
            />
            <Text style={iconStyle.iconText}>Sistema</Text>
        </View>
    )
}

function UpperHeader({children}: any) {
    return(
        <>
            <View style={{height: 70, position: 'absolute', top: 0}}>
                <HeaderComponent/>
            </View>
            
            {children}
        </>
    )
}