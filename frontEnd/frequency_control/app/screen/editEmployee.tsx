import { useContext } from "react";
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import UserManagementContext from "../context/userManagementContext";

import AdminContext from "../context/adminContext";

import CardComponent from "../component/cardComponent";

import Icons from "@expo/vector-icons/Feather";

import { useNavigation } from "expo-router";

import ApiResult from "../interface/apiResult";

import UserFunction from "../function/user";

export default function EditEmployee() {

    const {navigate, replace, goBack}: any  = useNavigation();
    const userManagementContext             = useContext(UserManagementContext)
    const adminContext                      = useContext(AdminContext)

    async function deleteEmployee() {

        if(!userManagementContext.employee?.uuid) {
            console.log("É necessário informar um UUID para deletar!");
            return;
        };

        const response: ApiResult = await UserFunction.deleteEmployee(adminContext.jwtToken, userManagementContext.employee?.uuid)

        if(response.status == 200) {
            console.log("Deu certo");
            goBack();
        } else {
            console.log("Deu errado!");
        }

        console.log(response.message);
        return

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

                <View style={{ width: '90%', marginInline: 'auto'}}>
                    <CardComponent>
                        <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: '#535A63'}}>{userManagementContext.employee?.name}</Text>
                    </CardComponent>
                </View>

                <View style={{marginTop: 50, width: '90%', marginInline: 'auto'}}>
                    <CardComponent>
                        <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: '#535A63'}}>
                            Carga Horária
                        </Text>

                        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 5, width: '70%', marginInline: 'auto'}}>
                            <Text style={{textAlign: 'center', marginTop: 20, fontSize: 16, color: '#535A63'}}>
                                {userManagementContext.employee?.weeklyWorkload} Horas Semanais
                            </Text>
                            
                            <TouchableOpacity>
                                <Icons
                                    name={"edit-2"}
                                    size={15}
                                    style={{marginTop: 19}}
                                />
                            </TouchableOpacity>

                        </View>
                    </CardComponent>
                </View>

                <View style={{width: '80%', marginHorizontal: 'auto', marginTop: 50}}>
                    <CardComponent>
                            <TouchableOpacity 
                                onPress={() => deleteEmployee()}
                                style={{backgroundColor: '#DE2121', marginInline: 'auto', width: '100%', paddingBlock: 15, borderRadius: 5}}
                            >
                                <Text style={{textAlign: 'center', color: 'white', fontSize: 20}}>Deletar Usuário</Text>
                            </TouchableOpacity>
                    </CardComponent>
                </View>

            </ScrollView>

        </SafeAreaView>
    )
}