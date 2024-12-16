import { SafeAreaView, TouchableOpacity, Text, StyleSheet, Button } from "react-native"

interface ButtonElements {
    buttonText: string,
    onPress: () => any,
    buttonColor?: string
}

let colorToChange: string = "#DE2121"

export default function SubmitButton({buttonText, onPress, buttonColor}: ButtonElements) {

    buttonColor ? colorToChange = buttonColor : null

    return(
        <SafeAreaView>

            <TouchableOpacity onPress={onPress} style={submitButtonStyle.button}>
                <Text style={submitButtonStyle.text_button}>
                    {buttonText}
                </Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}

const submitButtonStyle = StyleSheet.create({
    button: {
        backgroundColor: colorToChange,
        margin: 'auto',
        padding: 10,
        borderRadius: 10
    },
    text_button: {
        color: 'white',
        textAlign: 'center',
        fontSize: 15
    }
})