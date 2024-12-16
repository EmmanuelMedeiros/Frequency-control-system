import axios from 'axios'
import ApiResult from '../interface/apiResult';
import Employee from '../class/Employee';

const apiUrl = process.env.EXPO_PUBLIC_API_URL

export default class UserFunction {
    
    static async deleteEmployee(jwtToken: string|undefined, employeeUUID: string): Promise<ApiResult> {

        let apiResponse: ApiResult

        const response = await axios.put(`${apiUrl}/user/delete/${employeeUUID}`, 
            {},
            {headers: {
                Authorization: jwtToken
            }}
        )
        .then((res) => {
            apiResponse = {message: res.data.data, status: res.status};
            return apiResponse
        })
        .catch((err) => {
            apiResponse = {message: err.response.data.error, status: err.status}
            return apiResponse
        });

        return response

    }
    
    static async registerNewUser(jwtToken: string|undefined, employee: Employee): Promise<ApiResult> {

        let apiResponse: ApiResult

        const response = await axios.post(`${apiUrl}/user/register`, 
            {
                name: employee.name,
                weeklyWorkload: employee.weeklyWorkload
            },
            {headers: {
                Authorization: jwtToken
            }}
        )
        .then((res) => {
            apiResponse = {message: res.data.data, status: res.status};
            return apiResponse
        })
        .catch((err) => {
            apiResponse = {message: err.response.data.error, status: err.status}
            return apiResponse
        });

        return response

    }
    
    static async getUsersList(jwtToken: string|undefined): Promise<ApiResult> {

        let apiResponse: ApiResult

        const response = await axios.get(`${apiUrl}/user/list`, 
            {headers: {
                "Authorization": jwtToken
            }}
        )
        .then((res) => {
            apiResponse = {message: res.data.data, status: res.status};
            return apiResponse
        })
        .catch((err) => {
            apiResponse = {message: err.response.data.error, status: err.status}
            return apiResponse
        });

        return response

    }
    
    static async hitFrequency(userUUID: string, jwtToken: string|undefined, base64Picture: string|undefined): Promise<ApiResult> {

        let apiResponse: ApiResult

        const response = await axios.post(`${apiUrl}/frequency/set/${userUUID}`, 
            {
                base64: base64Picture
            },
            {
                headers: {
                    Authorization: jwtToken
                }
            }
        )
        .then((res) => {
            apiResponse = {message: res.data.data, status: res.status};
            return apiResponse
        })
        .catch((err) => {
            apiResponse = {message: err.response.data.error, status: err.status}
            return apiResponse
        });

        return response

    }

}