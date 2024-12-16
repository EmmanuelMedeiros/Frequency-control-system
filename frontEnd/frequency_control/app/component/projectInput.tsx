import { Keyboard, KeyboardAvoidingView, SafeAreaView, StyleSheet, TextInput } from "react-native";

import { useEffect, useState } from "react";

import Icons from '@expo/vector-icons/Feather'

interface InputElement {
    placeholderText: string,
    isPassword: boolean,
    isNumeric: boolean,
    setInputValue: React.Dispatch<React.SetStateAction<any>>
}

export default function ProjectInput({placeholderText, isPassword, setInputValue, isNumeric}: InputElement) {

    const [seePassword, setSeePassword] = useState(isPassword)

    return(
        <SafeAreaView >

            <TextInput 
                keyboardType={isNumeric ? 'numeric' : 'default'}
                pointerEvents="box-none"
                style={inputStyle.input}
                placeholder={placeholderText}
                secureTextEntry={seePassword}
                autoCapitalize="none"
                onChangeText={(ev) => setInputValue(ev.valueOf())}
            />
                {isPassword && seePassword
                    ?
                        <Icons
                            style={{position: 'absolute', right: 0, marginRight: 20, marginTop: 2, padding: 10, zIndex: 100, }} 
                            name="eye" 
                            size={25}
                            onPress={() => setSeePassword((prev) => {
                                return !prev
                            })} 
                        />
                    :
                    isPassword && !seePassword 
                        ?
                            <Icons
                                style={{position: 'absolute', right: 0, marginRight: 20, marginTop: 2, padding: 10, zIndex: 100}} 
                                name="eye-off" 
                                size={25}
                                onPress={() => setSeePassword((prev) => {
                                    return !prev
                                })} 
                            />
                        :
                            null
                }
        </SafeAreaView>
    )
}

const inputStyle= StyleSheet.create({
    input: {
        backgroundColor: "#D9D9D9",
        alignSelf: 'center',
        width: '100%',
        height: 50,
        borderRadius: 10,
        padding: 15,
    }
})