import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StackRoutes from "@/routes/stack.routes";

const Stack = createNativeStackNavigator()

export default function Index() {
  return (
    <StackRoutes/>
  );
}
