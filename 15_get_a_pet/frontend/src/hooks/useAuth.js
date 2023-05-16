import api from '../utils/api'

import {useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

import useFlashMessage from './useFlashMessage'

    const {setFlashMessage} = useFlashMessage()
    const [authenticated, setAuthenticated] = useState(false)
    const navigate = useNavigate()
