import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";

import HeaderComponent from "../component/headerComponent";
import CardComponent from "../component/cardComponent";
import ProjectSelectInput from "../component/projectSelectInput";

import Icons from '@expo/vector-icons/Feather'

import Employee from "../class/Employee";
import ApiResult from "../interface/apiResult";

import UserFunction from "../function/user";

import AdminContext from "../context/adminContext";

import { useNavigation } from "expo-router";

export default function FrequencyManagement() {

    const adminContext = useContext(AdminContext)
    const { navigate, replace }: any = useNavigation();

    const isFocused = useIsFocused();

    const [selectEmployee, setSelectEmployee] = useState<Employee>()
    const [employees, setEmployees]           = useState<Array<Employee>>([])

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
        setSelectEmployee(undefined);
        employeesList()
    }, [isFocused])

    return(
        <SafeAreaView style={{position: 'relative', flex: 1, justifyContent: 'center', alignContent: 'center'}}>

            <View style={{height: 70, position: 'absolute', top: 0}}>
                <HeaderComponent/>
            </View>

            <Text style={{position: 'absolute', marginLeft: .1, alignSelf: 'center', top: 110,  color: '#535A63', fontWeight: 'bold', fontSize: 25}}>
                Gerenciamento de Ponto
            </Text>

            <ScrollView style={{marginTop: 200}}>

                <View>
                    <CardComponent>
                        <View style={{width: 300}}>
                            <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: '#535A63'}}>
                                Usuário
                            </Text>
                            <View style={{marginTop: 20}}>
                                <ProjectSelectInput selectedItem={selectEmployee} setSelectItem={setSelectEmployee} placeholder="Selecione um usuário" items={employees}/>
                            </View>
                        </View>
                    </CardComponent>
                </View>

                <Text style={[frequencyManagementStyle.selectUserText, selectEmployee !== undefined ? frequencyManagementStyle.notShow : null]}>Selecione um usuário para obter mais informações</Text>

                <View style={[frequencyManagementStyle.userRecords, selectEmployee == undefined ? frequencyManagementStyle.notShow : null]}>
                    <CardComponent>

                        <View style={{width: 300}}>
                            <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: '#535A63'}}>Registros de</Text>
                            <Text style={{textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: '#535A63', textDecorationLine: 'underline'}}>{selectEmployee?.name}</Text>
                        </View>

                        <View style={{marginTop: 20}}>
                            <View style={frequencyManagementStyle.borderedView}>
                                <Text style={frequencyManagementStyle.borderedText}>Banco de horas</Text>
                                <Text style={frequencyManagementStyle.borderedText}>+ 1:28</Text>
                            </View>

                            <View style={frequencyManagementStyle.borderedView}>
                                <Text style={frequencyManagementStyle.borderedText}>Faltas</Text>
                                <Text style={[frequencyManagementStyle.borderedText, {color: '#F6BB3A'}]}>07</Text>
                            </View>
                        </View>

                    </CardComponent>
                </View>

                <View style={[selectEmployee !== undefined ? null : frequencyManagementStyle.notShow, {width: '80%', marginInline: 'auto', marginTop: 70, paddingBottom: 70}]}>
                    <CardComponent>
                        <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                            <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: '#535A63'}}>Mais Detalhes do usuário</Text>
                            <Icons name='chevron-right' size={30} color={'#535A63'}/>
                        </TouchableOpacity>
                    </CardComponent>
                </View>

            </ScrollView>

        </SafeAreaView>
    )
}

const frequencyManagementStyle = StyleSheet.create({

    selectUserText: {
        color: '#D9D9D9', 
        fontWeight: "bold", 
        textAlign: "center", 
        fontSize: 25, 
        width: '85%', 
        marginInline: 'auto', 
        marginTop: 120
    },
    notShow: {
        display: 'none'
    },

    userRecords: {
        marginTop: 70
    },

    borderedView: {
        borderColor: '#D9D9D9',
        borderWidth: 2,
        height: 50,
        borderRadius: 10,
        marginVertical: 5,

        flexDirection: 'row',
        justifyContent: 'space-around',
        alignContent: 'center',
        alignItems: 'center'
    },
    borderedText: {
        fontWeight: 'bold',
        color: '#535A63',
        fontSize: 17
    }
})