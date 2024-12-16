import { SafeAreaView, Text, View, TextInput, StyleSheet, TouchableOpacity, ScrollView } from "react-native"
import ProjectInput from "./projectInput"

import Icons from '@expo/vector-icons/Feather'
import { useState } from "react"

interface PopupInputProps {
    setClosePopup: React.Dispatch<React.SetStateAction<boolean>> //opened = true; closed = false
}

export default function PopupInput({setClosePopup}: PopupInputProps) {

    const [email, setEmail] = useState("")

    const onHandleClosePopUp = () => {
        setClosePopup(false)
    }
    
    return(
        <SafeAreaView>

            <View style={popupInputStyle.component}>

                <TouchableOpacity style={popupInputStyle.closeIcon} onPress={onHandleClosePopUp}>
                    <Icons name="x" size={30} />
                </TouchableOpacity>

                <Text style={popupInputStyle.textPopup}>Insira seu email para enviarmos uma nova senha para você</Text>

                <View style={{width: '100%', margin: 'auto'}}>
                <ProjectInput 
                    placeholderText="Insira seu email" 
                    isPassword={false} 
                    setInputValue={setEmail} 
                    isNumeric={false}
                />
                </View>
            </View>
            
            <TouchableOpacity style={popupInputStyle.popupButton}>
                    <Text style={popupInputStyle.popupButtonText}>Enviar</Text>
                </TouchableOpacity>

        </SafeAreaView>
    )
}

const popupInputStyle = StyleSheet.create({

    component: {
        backgroundColor: "white",
        width: "90%",
        marginInline: "auto",
        borderRadius: 10,

        paddingBlock: 50,
        paddingInline: 20,
        paddingBottom: 60,
        
        position: 'relative',

        elevation: 5,
        shadowColor: "#181818"

    },
    closeIcon: {
        position: "absolute",
        right: 10,
        marginTop: 6

    },
    textPopup: {
        fontSize: 18,
        textAlign: 'center',
        color: "#535A63",
        fontWeight: 'bold',
        marginBottom: 25
    },
    popupButton: {
        backgroundColor: '#DE2121',
        width: '60%',
        margin: 'auto',
        marginTop: -25,
        padding: 15,
        borderRadius: 10
    },
    popupButtonText: {
        color: 'white',
        textAlign: 'center'
    }

})