import api from '../utils/api'

import {useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

import useFlashMessage from './useFlashMessage'

    const {setFlashMessage} = useFlashMessage()
    const [authenticated, setAuthenticated] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token){
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            setAuthenticated(true)
        } 
    }, [])
