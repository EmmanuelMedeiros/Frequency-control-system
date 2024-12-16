import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { useFonts } from "expo-font"

export default function SmallLogoComponent() {

    const [fontsLoaded] = useFonts({
        'MrsSheppards-Regular': require('../../assets/fonts/MrsSheppards-Regular.ttf')
    })

    return(
        <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>

        <TouchableOpacity style={{marginLeft: 40}}>
            <Text style={logoStyle.logo_text_a}>
                Bar do
            </Text>
            <Text style={logoStyle.logo_text_b}>
                PELADO
            </Text>
            <Text style={logoStyle.logo_text_c}>
                SISTEMA DE PONTO
            </Text>
        </TouchableOpacity>

    </SafeAreaView>
    )
}

const logoStyle = StyleSheet.create({

    logo_text_a: {
        fontFamily: "MrsSheppards-Regular",
        textAlign: "left",
        color: "white",
        fontSize: 16,
        marginBottom: 20
    },
    logo_text_b: {
        fontFamily: "SpaceMono-Regular",
        textAlign: "left",
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        marginTop: -30
    },
    logo_text_c: {
        fontFamily: "SpaceMono-Regular",
        textAlign: "left",
        color: "white",
        fontSize: 8,
        fontWeight: "bold",
        marginTop: -3
    }
})