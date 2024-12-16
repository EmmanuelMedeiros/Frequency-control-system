import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useContext, useState } from "react";

import CardComponent from "../component/cardComponent";
import ProjectInput from "../component/projectInput";
import SubmitButton from "../component/submitButton";

import { useNavigation } from "expo-router";

import UserFunction from "../function/user";

import Icons from '@expo/vector-icons/Feather'

import ApiResult from "../interface/apiResult";
import Employee from "../class/Employee";



import AdminContext from "../context/adminContext";

export default function CreateNewEmployee() {

    const adminContext = useContext(AdminContext)

    const [employeeName, setEmployeeName]           = useState<string>();
    const [employeeWorkload, setEmployeeWorkload]   = useState<number>();

    const {replace, navigate, goBack}: any = useNavigation();

    async function registerNewEmployee() {

        let apiMessage: ApiResult = {message: "Não rodou", status: 0};

        try {
            if(employeeName && employeeWorkload) {
                const newEmployee: Employee = new Employee(employeeWorkload, employeeName)
                apiMessage = await UserFunction.registerNewUser(adminContext.jwtToken, newEmployee);

                if(apiMessage.status == 201) {
                    console.log("Deu certo!");
                    goBack();
                    return
                } else {
                    console.log("Deu errado");
                    return
                }
            }
        }catch(err) {
            console.log(err);
        } finally {
            console.log(apiMessage)
        }
    }

    return(
        <SafeAreaView style={{position: 'relative', flex: 1, justifyContent: 'center', alignContent: 'center'}}>

            <TouchableOpacity 
                style={{position: 'absolute', top: 24}}
                onPress={() => replace('systemManagement')}    
            >
                <Icons 
                    name="chevron-left"
                    size={35}
                    style={{color: 'white'}}
                />
            </TouchableOpacity>

            <Text style={{position: 'absolute', marginLeft: .1, alignSelf: 'center', top: 110 ,color: '#535A63', fontWeight: 'bold', fontSize: 25}}>
                Gerenciamento do Sistema
            </Text>

            <ScrollView style={{marginTop: 200}}>

                <View style={{width: '90%', marginInline: 'auto'}}>
                    <CardComponent>
                        <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: '#535A63'}}>
                            Criar novo usuário
                        </Text>

                        <View style={{ width: 280, gap: 20, marginInline: 'auto', marginTop: 20}}>
                            <ProjectInput 
                                placeholderText="Nome"
                                isPassword={false}
                                setInputValue={setEmployeeName}
                                isNumeric={false}
                            />
                            <ProjectInput 
                                placeholderText="Carga horária semanal"
                                isPassword={false}
                                setInputValue={setEmployeeWorkload}
                                isNumeric={true}
                            />

                            <SubmitButton 
                                buttonText="Cadastrar" 
                                onPress={() => registerNewEmployee()}
                            />
                        </View>
                    </CardComponent>
                </View>

            </ScrollView>

        </SafeAreaView>
    )
}