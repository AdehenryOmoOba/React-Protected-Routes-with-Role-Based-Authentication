import axios from 'axios'
import { useAuthContext } from '../Authorization/AuthProvider'

export const axiosBase = axios.create({
    baseURL: 'http://localhost:5000/api',
    withCredentials: true,
})