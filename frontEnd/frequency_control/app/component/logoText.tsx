import { SafeAreaView, View, Text, StyleSheet } from "react-native"
import { useFonts } from "expo-font"

export default function LogoComponent() {

    const [fontsLoaded] = useFonts({
        'MrsSheppards-Regular': require('../../assets/fonts/MrsSheppards-Regular.ttf')
    })

    return(
        <SafeAreaView style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>

        <View style={{height: 'auto'}}>
            <Text style={logoStyle.logo_text_a}>
                Bar do
            </Text>
            <Text style={logoStyle.logo_text_b}>
                PELADO
            </Text>
            <Text style={logoStyle.logo_text_c}>
                SISTEMA DE PONTO
            </Text>
        </View>

    </SafeAreaView>
    )
}

const logoStyle = StyleSheet.create({

    logo_text_a: {
        fontFamily: "MrsSheppards-Regular",
        textAlign: "center",
        color: "#DE2121",
        fontSize: 50,
        fontWeight: "normal"
    },
    logo_text_b: {
        fontFamily: "SpaceMono-Regular",
        textAlign: "center",
        color: "#DE2121",
        fontSize: 50,
        fontWeight: "bold",
        marginTop: -30
    },
    logo_text_c: {
        fontFamily: "SpaceMono-Regular",
        textAlign: "center",
        color: "#DE2121",
        fontSize: 20,
        fontWeight: "bold",
        marginTop: -10
    }
})