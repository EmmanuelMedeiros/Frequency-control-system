import { createContext, useState } from "react";
import Employee from "../class/Employee";
import ApiResult from "../interface/apiResult";
import AdminFunction from "../function/admin";

let defaultJWT: string|undefined;
let setJwtToken: React.Dispatch<React.SetStateAction<string | undefined>> = () => {};
let chosenEmployee: Employee|undefined; 
let setChosenEmployee: React.Dispatch<React.SetStateAction<Employee | undefined>> = () => {};

const defaultUser = {
    jwtToken: defaultJWT,
    setJwtToken: setJwtToken,
    chosenEmployee: chosenEmployee,
    setChosenEmployee: setChosenEmployee,
}

const AdminContext = createContext(defaultUser)

export function AdminContextProvider(props: React.PropsWithChildren) {

    const [jwtToken, setJwtToken] = useState<string>();
    const [chosenEmployee, setChosenEmployee] = useState<Employee>();

    const context = {
        jwtToken,
        setJwtToken,
        chosenEmployee,
        setChosenEmployee
    };

    return(
        <AdminContext.Provider value={context}>{props.children}</AdminContext.Provider>
    )

}


export default AdminContext