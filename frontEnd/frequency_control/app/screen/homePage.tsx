import { CameraView, CameraType, useCameraPermissions } from 'expo-camera'

import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, BackHandler, ScrollView, Button } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { useNavigation } from "expo-router";
import { useIsFocused } from "@react-navigation/native";

import CardComponent from "../component/cardComponent";
import ProjectSelectInput from "../component/projectSelectInput";

import Icons from '@expo/vector-icons/Feather';

import Moment from 'moment';
import monthName from "../function/monthName";
import UserFunction from "../function/user";

import Employee from "../class/Employee";
import ApiResult from "../interface/apiResult";

import AdminContext from "../context/adminContext";
import CameraComponent from '../component/cameraComponent';

interface CurrentDate {
    month: string,
    year: string
}

export default function HomePage() {

    const adminContext = useContext(AdminContext)
    const { navigate, replace }: any = useNavigation();

    const isFocused = useIsFocused();

    const [selectEmployee, setSelectEmployee] = useState<Employee>()
    const [employees, setEmployees]           = useState<Array<Employee>>([])
    const [currentTime, setCurrentTime]       = useState<string>(Moment().format('H:mm:ss'))
    const [currentDate, setCurrentDate]       = useState<CurrentDate>()

    const [openCamera, setOpenCamera]         = useState<boolean>(false)

    setInterval(() => {
        setCurrentTime(Moment().format('H:mm:ss'))
    }, 1000)

    async function employeesList() {

        const result: ApiResult = await UserFunction.getUsersList(adminContext.jwtToken);

        if(result.status == 200) {
            setEmployees(result.message)
        } else if(result.status == 403) {
            replace('login')
        } 
         else {
            console.log("Deu errado")
        }
        return

    }

    useEffect(() => {
        let currentMonth: string;
        const currentMonthNumber: string = Moment().format('MM');
        const currentYear: string = Moment().format('yyyy');

        currentMonth = monthName(currentMonthNumber);
        setSelectEmployee(undefined);
        employeesList();

        setCurrentDate({
            month: currentMonth,
            year: currentYear
        })
    }, [isFocused])

    /* 
        useFocusEffect(
            React.useCallback(() => {
                const pressBackButton = () => {
                    navigate('Home');
                    return true;
                }
                BackHandler.addEventListener('hardwareBackPress', pressBackButton)
            }, [])
        ) 
    */

    return(
        <SafeAreaView style={{position: 'relative', flex: 1, justifyContent: 'center', alignContent: 'center'}}>        

            <Text style={{position: 'absolute', marginLeft: .1, alignSelf: 'center', top: 110, color: '#535A63', fontWeight: 'bold', fontSize: 25}}>
                Bater Ponto
            </Text>

            <ScrollView style={{marginTop: 200}}>
                
                <View>
                    <CardComponent>
                        <View style={{width: 300}}>
                            <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>
                                Usuário
                            </Text>

                            <View style={{marginTop: 20}}>
                                <ProjectSelectInput 
                                    selectedItem={selectEmployee} 
                                    setSelectItem={setSelectEmployee} 
                                    placeholder="Quem é você?" 
                                    items={employees}
                                />
                            </View>
                        </View>
                    </CardComponent>
                </View>

                <View style={{marginTop: 80, paddingBottom: 30}}>
                    <CardComponent>
                        <View style={{ width: 300 }}>

                            <View style={{display: 'flex', flexDirection: 'row', gap: 14, justifyContent: 'center'}}>
                                <Icons name='clock' size={20} color={'#DE2121'}/>
                                <Text style={{textAlign: 'center', color: '#535A63', fontSize: 15}}>{currentTime} de {currentDate?.month} de {currentDate?.year}</Text>
                            </View>

                            <TouchableOpacity
                                onPress={() => setOpenCamera(true)}
                                style={ selectEmployee == undefined ? [homePageStyle.inactiveButton, homePageStyle.frequencyButton] : [homePageStyle.frequencyButton, homePageStyle.activeButton]}>
                                <Text style={ selectEmployee == undefined ? [homePageStyle.inactiveButtonText, homePageStyle.buttonText] : [homePageStyle.buttonText, homePageStyle.activeButtonText]}>Bater Ponto</Text>
                            </TouchableOpacity>

                        </View>
                    </CardComponent>
                </View>


                <View style={ openCamera ? {position:"absolute", height: '100%', width: '100%'} : {display: 'none'}}>
                    <CameraComponent
                        setOpenCamera={setOpenCamera}
                        employee={selectEmployee}
                    /> 
                </View>

            </ScrollView>

        </SafeAreaView>
    )
}

const homePageStyle = StyleSheet.create({
    frequencyButton: {
        margin: 'auto',
        marginTop: 20,
        borderRadius: 10,
        padding: 20
    },
    inactiveButton: {
        backgroundColor: '#D9D9D9',
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 30
    },
    inactiveButtonText: {
        color: '#181818',
        opacity: .4,
    },
    activeButtonText: {
        color: 'white'
    },
    activeButton: {
        backgroundColor: '#DE2121'
    }
})