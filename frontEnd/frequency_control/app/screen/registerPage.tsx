import { SafeAreaView, TouchableOpacity, View } from "react-native"
import { useNavigation } from '@react-navigation/native'
import { useState } from "react"

import LogoComponent from "../component/logoText"
import ProjectInput from "../component/projectInput"
import SubmitButton from "../component/submitButton"

import Icon from '@expo/vector-icons/AntDesign'

import ApiResult from "../interface/apiResult"
import Admin from "../class/Admin"

import AdminFunction from "../function/admin"

export default function RegisterPage() {

    const [name, setName]                               = useState<string>("")
    const [email, setEmail]                             = useState<string>("")
    const [password, setPassword]                       = useState<string>("")
    const [passwordConf, setPasswordConf]               = useState<string>("")

    const navigation = useNavigation()

    async function registerAdminHandler() {

        let apiMessage: ApiResult

        if(passwordConf !== password) {
            apiMessage = {message: "As senhas não batem", status: 400}
            console.log(apiMessage)
            return
        }

        if(!name.trim() || name.trim().length < 2) {
            apiMessage = {message: "O nome precisa ter mais de 2 caracteres", status: 400}
            console.log(apiMessage)
            return
        }

        try {
            const adminToLogin: Admin = new Admin(email, password, name)
            const result: ApiResult =  await AdminFunction.adminRegister(adminToLogin)

            console.log(result)
        }catch(err: any) {
            console.log(err.toString())
        }

    }

    return(
        <SafeAreaView style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>

            <TouchableOpacity onPress={() => navigation.goBack()} style={{position: 'absolute', top: 40, marginLeft: 20}}>
                <Icon name="left" size={33} style={{color: '#777777'}}/>
            </TouchableOpacity>

            <View style={{marginTop: -140, height: 200}}>
                <LogoComponent/>
            </View>

            <View style={{gap: 10, marginTop: 30, width: '90%', marginInline: 'auto'}}>
                <ProjectInput 
                    isPassword={false} 
                    placeholderText="Insira seu nome" 
                    setInputValue={setName} 
                    isNumeric={false}
                />
                <ProjectInput 
                    isPassword={false} 
                    placeholderText="Insira seu email" 
                    setInputValue={setEmail} 
                    isNumeric={false}
                />
                <ProjectInput 
                    isPassword={true} 
                    placeholderText="Insira sua senha" 
                    setInputValue={setPassword} 
                    isNumeric={false}
                />
                <ProjectInput 
                    isPassword={true} 
                    placeholderText="Insira sua senha novamente" 
                    setInputValue={setPasswordConf} 
                    isNumeric={false}
                />
            </View>

            <View style={{marginTop: 20, width: '80%', marginInline: 'auto'}}>
                <SubmitButton 
                    buttonText="Registrar"
                    onPress={registerAdminHandler}
                    />
            </View>

        </SafeAreaView>
    )
}