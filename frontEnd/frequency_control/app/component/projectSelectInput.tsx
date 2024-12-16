import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, SafeAreaView } from 'react-native'

import Icons from '@expo/vector-icons/Ionicons'
import { useState } from 'react'

interface SelectProps {
    placeholder: string,
    items: Array<any>,
    setSelectItem: any, //setState do item
    selectedItem: any, //estado do item (useState)
    setListClick?: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ProjectSelectInput({placeholder, items, setSelectItem, selectedItem, setListClick}: SelectProps) {

    const [showContent, setShowContent] = useState<boolean>(false)

    return(
        <SafeAreaView style={{zIndex: 999}}>

            <TouchableOpacity 
                style={selectInput.input}
                onPressOut={() => setShowContent((prev: boolean) => (!prev))}
                >
                <Text style={selectInput.inputText}>{selectedItem == undefined ? placeholder : selectedItem.name}</Text>

                <View 
                    style={selectInput.inputArrow}
                    >
                    <Icons
                        name={!showContent ? 'chevron-down' : 'chevron-up'}
                        size={25}
                    />
                </View>

            </TouchableOpacity>

        
            <FlatList
                showsVerticalScrollIndicator={false}
                style={showContent ? selectInput.openTab : selectInput.closedTab}
                data={items} 
                alwaysBounceVertical={true}
                scrollEnabled={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}: any) => {
                    
                    const listLength: number = items.length
                    let separatorLine: boolean = false 

                    index + 1 == listLength ? separatorLine = true : false

                    return(
                        <View style={selectInput.itemContainer}>
                        <TouchableOpacity onPress={() => {setSelectItem(item), setShowContent(false), setListClick ? setListClick((prev: boolean) => (!prev)) : null}}>
                            <Text numberOfLines={0}> 
                                {item.name}
                            </Text>
                        </TouchableOpacity>

                        <View style={ separatorLine ? {display: 'none'} : {borderBottomWidth: 1, borderBottomColor: '#181818', opacity: .2, marginTop: 15}}/>

                        </View>
                        
                    )
                }}
            />

        </SafeAreaView>
    )
}


const selectInput = StyleSheet.create({
    input: {
        backgroundColor: '#D9D9D9',
        paddingVertical: 10,
        paddingInline: 9,
        borderRadius: 10,
        position: 'relative',
    },
    inputText: {
        color: 'black',
        opacity: .5
    },
    inputArrow: {
        position: 'absolute',
        right: 10,
        top: 7
    },
    openTab: {
        width: '100%',
        display: 'flex',
        height: 'auto',

        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        
        backgroundColor: 'white',
        borderColor: '#ABA8A8',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
    },
    closedTab: {
        opacity: 0,
        display: 'none'
    },
    itemContainer: {
        paddingVertical: 15,
        paddingHorizontal: 15,
    }
})