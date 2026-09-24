import { useParams } from "react-router-dom"; 
import { useState, useEffect } from 'react';
import "./style.css";

function Pokemon() {
    const { name } = useParams();
    const [datapoke, setDatapoke] = useState(null); // Cambiado a null
    const [loading, setLoading] = useState(true);   // Control de carga

    useEffect(() => {
        setLoading(true);
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then(response => response.json())
            .then(responseData => {
                setDatapoke(responseData);
                setLoading(false); // Datos recibidos
            })
            .catch(error => {
                console.error("Error:", error);
                setLoading(false);
            });
    }, [name]); 

    // 1. Evita renderizar antes de que lleguen los datos de la API
    if (loading) {
        return <p>Cargando información del Pokémon...</p>;
    }

    // 2. Si no encontró ningún dato o hubo un error
    if (!datapoke) {
        return <p>No se encontró información para "{name}".</p>;
    }

    // 3. Renderiza de forma segura una vez cargados los datos
    return (
        <div>
            <p>#{datapoke.id}</p>
            <h1>{datapoke.name}</h1>
            <img 
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${datapoke.id}.png`} 
                alt={datapoke.name} 
                width="200"
            />

            <p>Altura: {datapoke.height / 10} m / Peso: {datapoke.weight / 10} kg</p>

            {datapoke.types && (
                <p>Tipo(s): {datapoke.types.map(t => t.type.name).join(', ')}</p>
            )}

            <p>hp: {datapoke.stats[0]?.base_stat}</p>
            <p>Velocidad: {datapoke.stats[5]?.base_stat}</p>
            <p>Ataque: {datapoke.stats[1]?.base_stat} | Defensa: {datapoke.stats[2]?.base_stat}</p>
            <p>Ataque Especial: {datapoke.stats[3]?.base_stat} | Defensa Especial: {datapoke.stats[4]?.base_stat}</p>
        </div>
    );
}

export default Pokemon;