import { SafeAreaView, View, Text } from "react-native";
import LogoComponent from "./logoText";
import SmallLogoComponent from "./smallLogoText";

export default function HeaderComponent() {
    return(
        <SafeAreaView style={{flex: 1, justifyContent: 'center', alignContent: 'center', backgroundColor: '#DE2121', position: 'relative'}}>  

            <View style={{height: '100%', width: 450}}>
                <SmallLogoComponent/>
            </View>

        </SafeAreaView>
    )
}