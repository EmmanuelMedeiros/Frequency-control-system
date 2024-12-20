import HeaderComponent from "@/app/component/headerComponent";
import { UserManagementProvider } from "@/app/context/userManagementContext";
import CreateNewEmployee from "@/app/screen/createNewEmployee";
import EditEmployee from "@/app/screen/editEmployee";
import SystemManagement from "@/app/screen/systemManagement";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator();

export default function SystemManagementRoutes() {
    return(

        <UserManagementProvider>
            <Stack.Navigator initialRouteName="systemManagement" screenLayout={UpperHeader}  screenOptions={{title: '', headerShown: false, animation: "slide_from_right"}}>
                <Stack.Screen name="systemManagement" component={SystemManagement}/>
                <Stack.Screen name="editUser" component={EditEmployee}/>
                <Stack.Screen name="createUser" component={CreateNewEmployee}/>
            </Stack.Navigator>
        </UserManagementProvider>
    )
}

function UpperHeader({children}: any) {
    return(
        <SafeAreaView style={{height: '100%', width: '100%'}}>
            <View style={{height: 70, position: 'absolute', top: 0}}>
                <HeaderComponent/>
            </View>
            
            {children}
        </SafeAreaView>
    )
}