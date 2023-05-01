import api from '../../utils/api'

import {Link} from 'react-router-dom'

import styles from './Home.module.css'
import { useEffect, useState } from 'react'

function Home(){
    const [pets, setPets] = useState([])
    useEffect(() => {
        api.get('/pets').then((response) => {
            setPets(response.data.pets)
            console.log(pets)
        })
    }, [])

    return (
        <section>
            <div className={styles.pet_home_header}>
                <h1>Adote um pet</h1>
                <p>Vejos os detalhes de cada um e conheçã o tutor deles</p>
            </div>
            <div className={styles.pet_container}>
                {pets.length > 0 &&
                    pets.map((pet) => (
                        <div className={styles.pet_card}>
                            <div className={styles.pet_card_image} style={{backgroundImage: `url(${process.env.REACT_APP_API}images/pets/${pet.images[0]})`}}></div>
                            <h3>{pet.name}</h3>
                            <p>
                                <span className='bold'>Peso: </span> {pet.weight}kg
                            </p>
                            {pet.available ? <Link to={`pet/${pet._id}`}><a>Mais detalhes</a></Link> : <p>Adotado</p>
                            }
                        </div>
                    ))
                }
                {pets.length === 0 && (
                    <p>Não há pets cadastrados ou disponíveis para adoção no momento!</p>
                )}
            </div>
        </section>

    )
}

export default Home