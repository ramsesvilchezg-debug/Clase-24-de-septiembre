import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react'
import './style.css'

function Pokemon() {
    const { name } = useParams()
    const [datapoke, setDatapoke] = useState(null)
    const [error, setError] = useState(false)
    const [favoritos, setFavoritos] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('favoritos') || '[]')
        } catch {
            return []
        }
    })
    const esFavorito = favoritos.some(p => p.id === datapoke?.id)

    useEffect(() => {
        let cancelado = false
        setDatapoke(null)
        setError(false)

        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then(response => {
                if (!response.ok) throw new Error(`Estado ${response.status}`)
                return response.json()
            })
            .then(responseData => {
                if (!cancelado) setDatapoke(responseData)
            })
            .catch(err => {
                console.error("Error:", err)
                if (!cancelado) setError(true)
            })

        return () => { cancelado = true }
    }, [name])

    const toggleFavorito = () => {
        if (!datapoke) return
        let nuevosFavoritos
        if (esFavorito) {
            nuevosFavoritos = favoritos.filter(p => p.id !== datapoke.id)
        } else {
            nuevosFavoritos = [...favoritos, { id: datapoke.id, nombre: datapoke.name }]
        }
        setFavoritos(nuevosFavoritos)
        localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos))
    }

    if (error) return <p>No se pudo cargar este Pokémon.</p>
    if (!datapoke) return <p>Cargando...</p>

    return (
        <div>
            <h1>{datapoke.name}</h1>
            <p>Endpoint: https://pokeapi.co/api/v2/pokemon/{datapoke.id}</p>
            <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${datapoke.id}.png`}
                alt={datapoke.name}
                width="200"
            />

            <p>{datapoke.id}</p>
            <p>Altura: {datapoke.height / 10} m / Peso: {datapoke.weight / 10} kg</p>

            <p>hp: {datapoke.stats[0].base_stat}</p>
            <p>Velocidad: {datapoke.stats[5].base_stat}</p>
            <p>Ataque: {datapoke.stats[1].base_stat} Defensa: {datapoke.stats[2].base_stat}</p>
            <p>Ataque Especial: {datapoke.stats[3].base_stat} Defensa Especial: {datapoke.stats[4].base_stat}</p>

            <button onClick={toggleFavorito}>
                {esFavorito ? '❤️' : '🤍'}
            </button>
        </div>
    )
}

export default Pokemon