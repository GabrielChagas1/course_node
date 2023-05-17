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

    async function register(user) {

        let msgText = 'Cadastro realizado com sucesso!'
        let msgType = 'success'

        try {
            const data = await api.post('/users/register', user).then((response) => {
                return response.data
            })
           await authUser(data)
        } catch (err) {
            console.log(err)
            msgText = err.response.data.messagef
            msgType = 'error'
        }

        setFlashMessage(msgText, msgType)
    }
