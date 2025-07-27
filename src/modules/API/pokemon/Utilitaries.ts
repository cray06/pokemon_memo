import { PokeAPI } from 'pokeapi-types'

async function getPokemonCount(): Promise<number> {
    const res: Response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
    const data: PokeAPI.NamedAPIResourceList = await res.json()
    return data.count
}

async function getPokemonData(id: number): Promise<PokeAPI.Pokemon | null> {
    const res: Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    if (res.ok) {
        const data: PokeAPI.Pokemon = await res.json()
        return data
    }
    return null
}

export { getPokemonCount, getPokemonData }
