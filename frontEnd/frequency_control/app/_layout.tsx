import { Stack } from "expo-router";
import AdminContext, { AdminContextProvider } from "./context/adminContext";
import { useEffect, useContext } from "react";
import ApiResult from "./interface/apiResult";
import AdminFunction from "./function/admin";

import { useNavigation } from "expo-router";

export default function RootLayout() {

  const { navigate }: any = useNavigation()
  const adminContext = useContext(AdminContext)

  return(
    <>
      <AdminContextProvider>
          <Stack>
            <Stack.Screen name="index" options={{headerShown: false}}/>
          </Stack>
        </AdminContextProvider>
    </>
  )
}
