import { View, Text, StyleSheet } from "react-native"

export default function CardComponent({children}: any) {
    return(
        <View style={card.card}>
            {children}
        </View>
    )
}

const card = StyleSheet.create({
    card: {
        position: 'relative',
        backgroundColor: 'white',
        padding: 20,
        marginInline: 'auto',
        elevation: 10,
        borderRadius: 10
    }
})