import { transform } from "@babel/core"
import { SafeAreaView, View, Text, StyleSheet } from "react-native"

import Icons from '@expo/vector-icons/Feather'

export default function AlertMessage() {

    return(
        <View style={alertMessageStyle.container}>
            <Text style={alertMessageStyle.alertTitle}>ERRO!</Text>

            <Text style={alertMessageStyle.alertMessage}>Texto relacionado ao erro que deu, mas eu nem queria</Text>
        </View>
    )
}


const alertMessageStyle = StyleSheet.create({

    container: {
        width: '70%',

        justifyContent: 'center',
        alignItems: 'center',

        position: 'relative',
        left: '50%',
        top: 100,

        transform: [{translateX: '-50%'}],
        zIndex: 9999,

        backgroundColor: '#DE2121',

        borderRadius: 10,

        paddingBlock: 20
    },

    alertTitle: {
        color: 'white',
        position: 'absolute',

        left: '50%',
        transform: [{translateX: '-50%'}],
        
        fontSize: 20,
        fontWeight: 'bold',

        top: 13
    },

    alertMessage: {
        marginTop: 24,

        textAlign: 'center',
        color: 'white',
        
        width: '90%'
    }

})