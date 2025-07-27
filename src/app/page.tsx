'use client'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { getPokemonCount } from '@/modules/API/pokemon/Utilitaries'
import { getRandomPokemonCards } from '@/modules/API/pokemon/Storage'
import Header from '@/components/Header'
import CardGrid from '@/components/CardGrid'
import HelpButton from '@/components/HelpButton'
import { defaultGameConfig, GameConfig, Card } from '@/container/interface/Game'
import GameConfigDialog from '@/components/GameConfigDialog'
import LoadingOverlay from '@/components/LoadingOverlay'

const Home: FunctionComponent = () => {
    const [pokemonCards, setPokemonCards] = useState<Card[]>([])
    const [score, setScore] = useState<number>(0)
    const [bestScore, setBestScore] = useState<number>(0)
    const [gameConfig, setGameConfig] = useState<GameConfig>(defaultGameConfig)
    const [showConfig, setShowConfig] = useState<boolean>(true)
    const [totalPokemons, setTotalPokemons] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect((): void => {
        async function init(): Promise<void> {
            const count: number = await getPokemonCount()
            setTotalPokemons(count)
        }
        init()
    }, [])

    async function startGame(config: GameConfig): Promise<void> {
        setGameConfig(config)
        setLoading(true)
        const cards: Card[] = await getRandomPokemonCards(config.pokemonCount, totalPokemons)
        setPokemonCards(cards)
        setScore(0)
        setShowConfig(false)
        setLoading(false)
        localStorage.setItem('gameConfig', JSON.stringify(config))
    }

    function handleDefault(): void {
        startGame(defaultGameConfig)
    }

    useEffect((): void => {
        const scores: { score: number; config: GameConfig }[] = JSON.parse(localStorage.getItem('scores') || '[]')
        if (scores.length > 0) {
            setBestScore(Math.max(...scores.map((s) => s.score)))
        }
    }, [])

    useEffect((): void => {
        if (score > bestScore) setBestScore(score)
    }, [score, bestScore])

    return (
        <>
            <GameConfigDialog
                open={showConfig}
                totalPokemons={totalPokemons}
                onStart={startGame}
                onDefault={handleDefault}
                loading={loading}
            />
            <HelpButton />
            <Header score={score} bestScore={bestScore} />
            <CardGrid initialCards={pokemonCards} setScore={setScore} score={score} config={gameConfig} />
            {loading && <LoadingOverlay />}
        </>
    )
}

export default Home
