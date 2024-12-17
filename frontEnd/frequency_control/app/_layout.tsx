import { Stack } from "expo-router";
import AdminContext, { AdminContextProvider } from "./context/adminContext";
import { useEffect, useContext } from "react";

import { useNavigation } from "expo-router";
import AlertMessage from "./component/alertMessage";

export default function RootLayout() {

  const { navigate }: any = useNavigation()
  const adminContext = useContext(AdminContext)

  return(
      <AdminContextProvider>
          <Stack>
            <Stack.Screen name="index" options={{headerShown: false}}/>
          </Stack>
        </AdminContextProvider>
  )
}
