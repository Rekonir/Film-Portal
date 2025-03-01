import axios, { AxiosError } from "axios";
import { AppDispatch } from "../store";
import { userSlice } from "../reducers/userSlice";
import { IUser, UserResponse } from "../../types/types";


export const register = (login: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.post<UserResponse>('http://localhost:4998/auth/registration', {
            login,
            password
        })

        const user: IUser = {
            id: response.data.id,
            email: response.data.login,
            isAdmin: response.data.role === 'admin'
        }
        dispatch(userSlice.actions.setUser(
            user
        ))

        localStorage.setItem('token', response.data.token)

        console.log('reg', response)

    } catch (e) {
        if (axios.isAxiosError(e)) {
            dispatch(userSlice.actions.setError(e.response?.data.error))
        } else {
            dispatch(userSlice.actions.setError('Произошла ошибка'))
        }
    }
}

export const login = (login: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.post<UserResponse>('http://localhost:4998/auth/login', {
            login,
            password
        })

        const user: IUser = {
            id: response.data.id,
            email: response.data.login,
            isAdmin: response.data.role === 'admin'
        }
        dispatch(userSlice.actions.setUser(
            user
        ))

        localStorage.setItem('token', response.data.token)

        console.log(login, password)
        console.log(response.data)

    } catch (e) {
        if (axios.isAxiosError(e)) {
            dispatch(userSlice.actions.setError(e.response?.data.error))
        } else {
            dispatch(userSlice.actions.setError('Произошла ошибка'))
        }
    }
}

export const logout = () => async (dispatch: AppDispatch) => {
    
    dispatch(userSlice.actions.removeUser())
    localStorage.removeItem('token')
}

export const auth = () => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get<UserResponse>('http://localhost:4998/auth/auth', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })

        const user: IUser = {
            id: response.data.id,
            email: response.data.login,
            isAdmin: response.data.role === 'admin'
        }
        dispatch(userSlice.actions.setUser(
            user
        ))

        localStorage.setItem('token', response.data.token)

        console.log(response)

    } catch (e) {
        console.error
        localStorage.removeItem('token')
        if (axios.isAxiosError(e)) {
            dispatch(userSlice.actions.setError(e.response?.data.error))
        } else {
            dispatch(userSlice.actions.setError('Произошла ошибка'))
        }
    }
}