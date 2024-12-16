import { Button, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Camera, CameraView, CameraViewProps, useCameraPermissions, CameraPictureOptions} from "expo-camera"

import { useState, useContext, Dispatch, SetStateAction } from "react"

import AdminContext from "../context/adminContext";

import UserFunction from "../function/user";

import Employee from "../class/Employee";
import ApiResult from "../interface/apiResult";

import Icons from '@expo/vector-icons/Feather'

interface CameraProps {
  employee: Employee|undefined;
  setOpenCamera: Dispatch<SetStateAction<boolean>>
}

export default function CameraComponent({employee, setOpenCamera}: CameraProps) {

  let camera: CameraView|null
  const adminContext = useContext(AdminContext)

  const [permission, requestPermission] = useCameraPermissions();

  if(!permission) {
    return <View/>
  }

  if(!permission.granted) {
    return(
      <View>
        <Text>Precisamos de sua permissão para acessar a camera</Text>
        <Button onPress={requestPermission} title="Permissão"/>
      </View>
    )
  }

  const takePictureOnHandle = async () => {
    const pictureOptions: CameraPictureOptions = {base64: true, quality: .5, shutterSound: true};
    const photo = await camera?.takePictureAsync(pictureOptions);

    let apiResponse: ApiResult;

    if(employee && employee.uuid) {
      const result = await UserFunction.hitFrequency(employee.uuid, adminContext.jwtToken, photo?.base64);

      if(result.status == 200) {
        setOpenCamera(false);
        return result
      }
      return result;
      
    } else {
      apiResponse = {message: "É necessário tirar uma foto para bater o ponto", status: 400};
      return apiResponse;
    }
  }

  return(
    <View style={cameraStyle.container}>
      <CameraView style={cameraStyle.camera} facing={'front'} ref={(r) => {camera = r}}>

        <View style={{left: '35%', position: 'absolute', bottom: 0, flexDirection: 'row-reverse', justifyContent: 'center', gap: 20}}>

          <TouchableOpacity 
            style={{marginTop: 5}}
            onPress={() => setOpenCamera(false)}
          >
            <Icons
              name="x"
              size={38}
              color={'white'}
              style={cameraStyle.closeIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity 
            style={cameraStyle.pictureView} 
            onPress={takePictureOnHandle}>
          </TouchableOpacity>

        </View>

      </CameraView>
    </View>
  )
}

const cameraStyle = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',

    position: 'relative'
  },

  camera: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center'
  },

  pictureView: {

    width: 50,
    height: 50,
    
    borderWidth: 5,

    borderColor: '#DE2121',

    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    
    marginBottom: 20,
  },

  pictureText: {
    textAlign: 'center',
    color: 'white'
  },


  closeIcon: {
    borderColor: '#DE2121',
    borderWidth: 2,

    borderRadius: 10
  }
})