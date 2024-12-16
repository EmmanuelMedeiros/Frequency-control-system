import { BackHandler, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";

import CardComponent from "../component/cardComponent";
import ProjectSelectInput from "../component/projectSelectInput";

import UserFunction from "../function/user";

import Employee from "../class/Employee";
import ApiResult from "../interface/apiResult";

import { useNavigation} from "expo-router";

import AdminContext from "../context/adminContext";
import UserManagementContext from "../context/userManagementContext";

export default function SystemManagement({navigation}: any) {

    const adminContext = useContext(AdminContext)
    const userManagementContext = useContext(UserManagementContext)

    const isFocused = useIsFocused();

    const { navigate, replace }: any = useNavigation();

    const [selectEmployee, setSelectEmployee] = useState<Employee>()
    const [employees, setEmployees]           = useState<Array<Employee>>([])
    const [newUserName, setNewUserName]       = useState<string>()

    const [listClick, setListClick]           = useState<boolean>(false);


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

    async function addNewUser() {
        navigate('createUser')
    }
    
    useEffect(() => {
        setSelectEmployee(undefined);
        employeesList();
    }, [isFocused])

    const onHandleGoToUserEdition = () => {
        if(selectEmployee) {
            const userToManage: Employee = new Employee(selectEmployee.weeklyWorkload, selectEmployee.name, selectEmployee.uuid)
            userManagementContext.setEmployee(userToManage);
            navigate('editUser')
        };
    };

    useEffect(() => {

        if(!selectEmployee) {
            return
        } else {
            onHandleGoToUserEdition()
        };

    }, [listClick])

    return(
        <SafeAreaView style={{position: 'relative', flex: 1, justifyContent: 'center', alignContent: 'center'}}>
            
            <Text style={{position: 'absolute', marginLeft: .1, alignSelf: 'center', top: 110 ,color: '#535A63', fontWeight: 'bold', fontSize: 25}}>
                Gerenciamento do Sistema
            </Text>

            <ScrollView style={{marginTop: 200}}>

                <View>
                    <CardComponent>
                        <View style={{width: 300}}>
                            <Text onPress={() => navigate('home')} style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: '#535A63'}}>
                                Usuário
                            </Text>

                            <View style={{marginTop: 20}}>
                                <ProjectSelectInput 
                                    selectedItem={selectEmployee} 
                                    setSelectItem={setSelectEmployee} 
                                    placeholder="Selecione um usuário" 
                                    items={employees}
                                    setListClick={setListClick}
                                />
                            </View>

                        </View>
                    </CardComponent>
                </View>

                <View style={{marginTop: 60, paddingBottom: 30}}>
                    <CardComponent>
                        <View style={{width: 300, height: 80}}>
                            <View style={{width: '80%', marginInline: 'auto',}}>
                                <TouchableOpacity
                                    onPress={() => addNewUser()} 
                                    style={systemManagementStyle.addUserButton}>
                                    <Text style={systemManagementStyle.addUserButtonText}>Novo Usuário</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </CardComponent>
                </View>

            </ScrollView>

        </SafeAreaView>
    )
}

const systemManagementStyle = StyleSheet.create({
    addUserButton: {
        margin: 'auto',
        marginTop: 10,
        borderRadius: 10,
        padding: 10,
        paddingInline: 40,
        height: 60,
        backgroundColor: '#0B9836'
    },
    addUserButtonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 25
    }
})