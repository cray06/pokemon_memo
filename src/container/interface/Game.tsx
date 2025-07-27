export interface Card {
    name: string
    id: number
    image: string
    flipped: boolean
}

export interface GameConfig {
    boardSize: number
    pokemonCount: number
    cardsToFlip: number
}

export interface ScoreEntry {
    score: number
    config: GameConfig
}

export const defaultGameConfig: GameConfig = {
    boardSize: 12,
    pokemonCount: 6,
    cardsToFlip: 2
}
