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
