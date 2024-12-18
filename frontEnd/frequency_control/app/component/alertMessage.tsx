import { transform } from "@babel/core"
import { SafeAreaView, View, Text, StyleSheet } from "react-native"

import { useContext, useEffect, useState } from "react"

import Icons from '@expo/vector-icons/Feather'
import PopupContext from "../context/popupContext"

export default function AlertMessage() {

    const popupContext = useContext(PopupContext);

    const [showPopup, setShowPopup] = useState<boolean>(false);

    useEffect(() => {

        if(popupContext.message != undefined && popupContext.type != undefined) {
            setShowPopup(true);
        };

        const resetPopup: NodeJS.Timeout = setTimeout(() => {
            popupContext.setMessage(undefined);
            popupContext.setType(undefined);
            setShowPopup(false)
        }, 3000)

        return () => clearTimeout(resetPopup)

    }, [popupContext.message, popupContext.type])

    return(
        <View style={showPopup ? alertMessageStyle.container: alertMessageStyle.notShow}>
            <Text style={alertMessageStyle.alertTitle}>ERRO</Text>

            <Text style={alertMessageStyle.alertMessage}>{popupContext.message}</Text>
        </View>
    )
}


const alertMessageStyle = StyleSheet.create({

    container: {
        width: '70%',

        justifyContent: 'center',
        alignItems: 'center',

        position: 'absolute',
        left: '50%',
        top: 100,

        transform: [{translateX: '-50%'}],
        zIndex: 9999,

        backgroundColor: '#DE2121',

        borderRadius: 10,

        paddingBlock: 20,
    },

    notShow: {
        display: 'none'
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