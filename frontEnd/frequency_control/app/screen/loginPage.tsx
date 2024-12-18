import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useState, useContext } from 'react'

import { useFonts } from 'expo-font'

import LogoComponent from '../component/logoText'
import ProjectInput from '../component/projectInput'
import SubmitButton from '../component/submitButton'
import PopupInput from '../component/popupInput'

import ApiResult from '../interface/apiResult';
import Admin from '../class/Admin'
import PopupType from '../enum/popupType'

import AdminFunction from '../function/admin';

import AdminContext from '../context/adminContext'
import AlertMessage from '../component/alertMessage'
import PopupContext from '../context/popupContext'

export default function LoginPage() {

    const adminContext = useContext(AdminContext);
    const popupContext = useContext(PopupContext);

    const [forgotPassword, setForgotPassword] = useState(false);
    const [adminEmail, setAdminEmail] = useState<string>("");
    const [adminPassword, setAdminPassword] = useState<string>("");

    const { navigate }: any = useNavigation();

    async function adminLogin() {

        let apiMessage: ApiResult

        try {
            const adminToLogin: Admin = new Admin(adminEmail, adminPassword, "Admin")
            const result: ApiResult =  await AdminFunction.adminLogin(adminToLogin)

            if(result.status == 200) {  
                adminContext.setJwtToken(result.message.jwt)
                navigate("home");
            } else {
                popupContext.setMessage(result.message);
                popupContext.setType(PopupType.error);
                return;
            }
        }catch(err: any) {
            console.log(err.toString())
        }
    }

    return(
        <SafeAreaView style={ !forgotPassword ? {flex: 1, justifyContent: 'center', alignContent: 'center'} : {flex: 1, justifyContent: 'center', alignContent: 'center',  backgroundColor: '#A3A3A3'}}>
            
            <View style={{marginTop: -200, height: 200}}>
                <LogoComponent/>
            </View>

            <View style={{gap: 10, marginTop: 30, width: '90%', marginInline: 'auto'}}>
                <ProjectInput 
                    placeholderText='Insira seu emails' 
                    isPassword={false} 
                    setInputValue={setAdminEmail} 
                    isNumeric={false}
                />
                <ProjectInput 
                    placeholderText='Insira sua senha' 
                    isPassword={true} 
                    setInputValue={setAdminPassword} 
                    isNumeric={false}
                />
            </View>

            <TouchableOpacity onPress={() => setForgotPassword(true)}>
                <Text style={{textAlign: 'right', marginTop: 10, marginRight: 30, color: '#181818', opacity: 0.75, textDecorationLine: 'underline'}}>Esqueceu a senha?</Text>
            </TouchableOpacity>
            
            <View style={!forgotPassword ? {marginTop: 20, gap: 10, width: '80%', marginInline: 'auto'} : {marginTop: 20, opacity: 0}}>

                <SubmitButton
                    onPress={adminLogin} 
                    buttonText='Entrar'
                />
                <SubmitButton
                    onPress={() => navigate('register')} 
                    buttonText='Registrar'
                />

            </View>

            {forgotPassword
                ?   
                    <View style={{marginTop: -250, zIndex: 100}}>
                        <PopupInput setClosePopup={setForgotPassword}/>
                    </View>
                :
                    null
            }


        </SafeAreaView>
    )
}