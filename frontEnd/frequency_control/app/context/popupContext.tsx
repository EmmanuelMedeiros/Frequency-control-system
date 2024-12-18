import { createContext, useState } from "react";
import AlertMessage from "../component/alertMessage";

import PopupType from "../enum/popupType";

let defaultMessage: string|undefined;
let setMessage: React.Dispatch<React.SetStateAction<string | undefined>> = () => {};
let defaultType: PopupType|undefined;
let setType: React.Dispatch<React.SetStateAction<PopupType | undefined>> = () => {};

const defaultPopupContext = {
    message: defaultMessage,
    setMessage,
    type: defaultType,
    setType
}

const PopupContext = createContext(defaultPopupContext);

export function PopupProvider(props: React.PropsWithChildren) {

    const [message, setMessage] = useState<string>();
    const [type, setType]       = useState<PopupType>();

    const context = {
        message,
        setMessage,
        type,
        setType
    }

    return(
        <PopupContext.Provider value={context}>
            {props.children}
        </PopupContext.Provider>
    )

}

export default PopupContext;