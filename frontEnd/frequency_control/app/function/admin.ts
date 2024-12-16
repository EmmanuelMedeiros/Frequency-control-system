import axios from 'axios'
import ApiResult from '../interface/apiResult';
import Admin from '../class/Admin';

const apiUrl = process.env.EXPO_PUBLIC_API_URL

const api = axios.create({
    baseURL: apiUrl
})

export default class AdminFunction {

    static async verifyJWT(jwtToken: string|undefined): Promise<ApiResult> {

        let apiResult: ApiResult

        const result: ApiResult = await axios.post(`${apiUrl}/user/admin/authenticate`, 
            {},
            {
                headers: {"Authorization": jwtToken}
            }
        )
        .then((res) => {
            apiResult = {message: {userJwt: res.data.data[0].jwt, user: res.data.data[1].user}, status: res.status}
            return apiResult
        })
        .catch((err) => {
            apiResult = {message: err.response.data.error, status: err.status}
            return apiResult
        })

        return result

    };
    
    static async HelloWorld(): Promise<ApiResult>{

        let apiResult: ApiResult 

        const result: ApiResult = await axios.get(`${apiUrl}/helloWorld`)
        .then((res: any) => {
            return apiResult =  {message: "Opa", status: 200}
        })
        .catch((err) => {
            return {message: "Deu errado", status: 400}
        })


        return result
    }

    static async adminLogin({email, password}: Admin): Promise<ApiResult> {

        let apiResult: ApiResult

        const result: ApiResult = await axios.post(`${apiUrl}/user/admin/authenticate`, {
            email,
            password
        })
        .then((res) => {
            apiResult = {message: {jwt: res.data.data[0].jwt, user: res.data.data[1].user}, status: res.status}
            return apiResult
        })
        .catch((err) => {
            console.log(err)
            apiResult = {message: err.response.data.error, status: err.status}
            return apiResult
        })

        return result

    }

    static async adminRegister({email, password, name}: Admin): Promise<ApiResult> {

        let apiResult: ApiResult

        const result: ApiResult = await axios.post(`${apiUrl}/user/admin/register`, {
            email,
            name,
            password
        })
        .then((res) => {
            apiResult = {message: res.data.data.uuid, status: res.status}
            return apiResult
        })
        .catch((err) => {
            apiResult = {message: err.response.data.error, status: err.status}
            return apiResult
        })

        return result

    }

}