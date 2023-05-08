import api from '../../../utils/api'
import formStyles from '../../form/Form.module.css'
import styles from './Profile.module.css'

import Input from '../../form/Input'
import { useEffect, useState } from 'react'
import useFlashMessage from '../../../hooks/useFlashMessage'
import RoundedImage from '../../layout/RoundedImage'

    const [user, setUser] = useState({})
    const [preview, setPreview] = useState()
    const [token] = useState(localStorage.getItem('token') || '')
    const {setFlashMessage} = useFlashMessage()

    useEffect(() => {
        api.get('/users/checkuser', {
            headers:{
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) =>{
            setUser(response.data)
        })
    }, [token])

    function onFileChange(e){
        setPreview(e.target.files[0])
        setUser({...user, [e.target.name]: e.target.files[0]})
    }
    function handleChange(e){
        setUser({...user, [e.target.name]: e.target.value})
    }

    async function handleSubmit(e){
        e.preventDefault()
        let msgType = 'success'

        const formData = new FormData()

        await Object.keys(user).forEach((key) => formData.append(key, user[key]))

        const data = await api.patch(`/users/edit/${user._id}`, formData, {
            headers:{
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            return response.data
        }).catch((err) => {
            msgType = 'error'
            return err.response.data  
        })
        setFlashMessage(data.message, msgType)
    }