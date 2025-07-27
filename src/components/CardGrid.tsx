'use client'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { useState, useEffect } from 'react'
import { Card, GameConfig, ScoreEntry } from '@/container/interface/Game'
import CardItem from './CardItem'

interface CardGridProps {
    initialCards: Card[]
    setScore: (score: number) => void
    score: number
    config: GameConfig
}

function flippedCardIdMatches(cards: Card[]): boolean {
    return cards.every((card) => card.id === cards[0].id)
}

export default function CardGrid({ initialCards, setScore, score, config }: CardGridProps) {
    const [cards, setCards] = useState<Card[]>([])
    const [matchedCards, setMatchedCards] = useState<number[]>([])
    const [incorrectCards, setIncorrectCards] = useState<number[]>([])
    const [isProcessing, setIsProcessing] = useState<boolean>(false)

    useEffect(() => {
        const pairs: Card[] = []
        initialCards.forEach((card: Card) => {
            pairs.push({ ...card })
        })

        setCards(
            Array.from({ length: config.cardsToFlip })
                .flatMap(() => pairs.map((card) => ({ ...card, flipped: false })))
                .sort(() => Math.random() - 0.5)
                .slice(0, config.boardSize)
        )
        setMatchedCards([])
        setIncorrectCards([])
    }, [initialCards, config])

    const handleCardClick: (index: number) => void = (index: number): void => {
        if (isProcessing || cards[index].flipped || matchedCards.includes(index)) {
            return
        }
        const newCards: Card[] = cards.map((card: Card, i: number) => (i === index ? { ...card, flipped: true } : card))
        setCards(newCards)
        type CardWithIndex = { card: Card; index: number }
        const flippedCardsWithIndex: CardWithIndex[] = newCards
            .map((card: Card, idx: number) => ({ card, index: idx }))
            .filter(({ card, index }) => card.flipped && !matchedCards.includes(index))

        if (flippedCardsWithIndex.length === config.cardsToFlip) {
            const flippedIndices: number[] = flippedCardsWithIndex.map(
                (flippedCard: CardWithIndex) => flippedCard.index
            )
            const flippedCards: Card[] = flippedCardsWithIndex.map((flippedCard: CardWithIndex) => flippedCard.card)

            if (flippedCardIdMatches(flippedCards)) {
                setMatchedCards((prev) => [...prev, ...flippedIndices])
                setScore(score + 10)
            } else {
                setIsProcessing(true)
                setIncorrectCards(flippedIndices)
                if (score >= 2) setScore(score - 2)
                setTimeout(() => {
                    setCards((prev) =>
                        prev.map((card, i) => (flippedIndices.includes(i) ? { ...card, flipped: false } : card))
                    )
                    setIncorrectCards([])
                    setIsProcessing(false)
                }, 1000)
            }
        }
    }

    useEffect(() => {
        if (cards.length > 0 && matchedCards.length === cards.length) {
            const scores: ScoreEntry[] = JSON.parse(localStorage.getItem('scores') || '[]')
            scores.push({ score, config })
            localStorage.setItem('scores', JSON.stringify(scores))
        }
    }, [cards.length, matchedCards.length, score, config])

    return (
        <Box
            sx={{
                width: '100vw',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                py: { xs: 2, sm: 2, md: 2 },
                px: { xs: 1, sm: 2, md: 3 }
            }}
        >
            <Grid
                container
                spacing={{ xs: 1, sm: 2, md: 3 }}
                justifyContent='center'
                alignItems='center'
                sx={{
                    maxWidth: { xs: 200, sm: 300, md: 400, lg: 500 },
                    width: '100%'
                }}
            >
                {cards.map((item: Card, index: number) => (
                    <CardItem
                        key={index}
                        item={item}
                        index={index}
                        isFlipped={item.flipped || matchedCards.includes(index)}
                        isMatched={matchedCards.includes(index)}
                        isIncorrect={incorrectCards.includes(index)}
                        onClick={handleCardClick}
                    />
                ))}
            </Grid>
        </Box>
    )
}
