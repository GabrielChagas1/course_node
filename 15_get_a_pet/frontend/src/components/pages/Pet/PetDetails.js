import styles from './PetDetails.module.css'

import api from '../../../utils/api'

import {useState, useEffect} from 'react'

import {useParams, Link} from 'react-router-dom'

// hooks
import useFlashMessage from '../../../hooks/useFlashMessage'

    const [pet, setPet] = useState({})
    const {id} = useParams()
    const {setFlashMessage} = useFlashMessage()
    const [token] = useState(localStorage.getItem('token') || '')

    useEffect(() => {
        api.get(`/pets/${id}`).then((response) => {
            setPet(response.data.pet)
        }, [id])
    })       
    async function schedule() {
        let msgType = 'success'
    
        const data = await api
          .patch(`pets/schedule/${pet._id}`, {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          })
          .then((response) => {
            console.log(response.data)
            return response.data
          })
          .catch((err) => {
            console.log(err)
            msgType = 'error'
            return err.response.data
          })
    
        setFlashMessage(data.message, msgType)
    }
