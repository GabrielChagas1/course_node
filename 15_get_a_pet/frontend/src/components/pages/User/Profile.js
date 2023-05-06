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
