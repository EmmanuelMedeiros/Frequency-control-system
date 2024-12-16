import { createContext, useState } from "react";
import Employee from "../class/Employee";

let employee: Employee|undefined;
let setEmployee: React.Dispatch<React.SetStateAction<Employee | undefined>> = () => {};


const UserManagementContext = createContext({
    employee,
    setEmployee
});

export function UserManagementProvider(props: React.PropsWithChildren) {

    const [employee, setEmployee] = useState<Employee>();

    const context = {
        employee,
        setEmployee
    }

    return(
        <UserManagementContext.Provider value={context}>{props.children}</UserManagementContext.Provider>
    )

};

export default UserManagementContext