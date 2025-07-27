import { getPokemonData } from '@/modules/API/pokemon/Utilitaries'
import { PokeAPI } from 'pokeapi-types'
import { Card } from '@/container/interface/Game'

async function getRandomPokemonCards(count: number, totalPokemon: number): Promise<Card[]> {
    const cards: Card[] = []
    const usedIds: Set<number> = new Set()

    while (cards.length < count) {
        const randomPokemonId: number = Math.floor(Math.random() * totalPokemon) + 1

        if (usedIds.has(randomPokemonId)) {
            continue
        }

        const pokemonData: PokeAPI.Pokemon | null = await getPokemonData(randomPokemonId)

        if (pokemonData) {
            const card: Card = {
                name: pokemonData.name,
                id: pokemonData.id,
                image: pokemonData.sprites.front_default || '/favicon.ico',
                flipped: false
            }
            cards.push(card)
            usedIds.add(randomPokemonId)
        }
    }

    return cards
}

export { getRandomPokemonCards }
