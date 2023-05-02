import api from '../../../utils/api'

import styles from './AddPet.module.css'

import PetForm from '../../form/PetForm'

// hooks
import useFlashMessage from '../../../hooks/useFlashMessage'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function EditPet(){

    const [pet, setPet] = useState({})
    const [token] = useState(localStorage.getItem('token') || '')
    const {id} = useParams()
    const {setFlashMessage} = useFlashMessage()
    const navigate = useNavigate()

    useEffect(() => {
        api.get(`/pets/${id}`, {
            Authorization: `Bearer ${JSON.parse(token)}`
        }).then((response) => {
            setPet(response.data.pet)
        })
    }, [token, id])

    async function updatePet(pet){
        let msgType = 'success'

        const formData = new FormData()

        await Object.keys(pet).forEach((key) => {
            if(key === 'images'){
                for(let i = 0; i < pet[key][0].length; i++){
                    formData.append('images', pet[key][0][i])
                }
            }else{
                formData.append(key, pet[key])
            }
        })

        const data = await api.patch(`pets/${pet._id}`, formData, {
            headers: {
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


    return (
        <section>
           <div className={styles.addpet_header}>
             <h1>Editando o Pet: {pet.name}</h1>
             <p>Depois da edição os dados serão atualizados</p>
           </div>
           {pet.name && (
            <PetForm handleSumit={updatePet} btnText='Atualizar' petData={pet} />
           )}
        </section>

    )
}

export default EditPet