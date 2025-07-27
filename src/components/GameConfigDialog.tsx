import React, { useState, useEffect, ChangeEvent } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Alert from '@mui/material/Alert'
import { defaultGameConfig, GameConfig } from '@/container/interface/Game'

interface GameConfigDialogProps {
    open: boolean
    totalPokemons: number
    onStart: (config: GameConfig) => void
    onDefault: () => void
    loading: boolean
}

export default function GameConfigDialog({ open, totalPokemons, onStart, onDefault, loading }: GameConfigDialogProps) {
    const [boardSize, setBoardSize] = useState<number>(defaultGameConfig.boardSize)
    const [cardsToFlip, setCardsToFlip] = useState<number>(defaultGameConfig.cardsToFlip)
    const [pokemonCount, setPokemonCount] = useState<number>(defaultGameConfig.pokemonCount)
    const [error, setError] = useState<string>('')

    useEffect(() => {
        setError('')
        setPokemonCount(boardSize % cardsToFlip === 0 ? boardSize / cardsToFlip : 0)
    }, [boardSize, cardsToFlip])

    const getValidationError: () => string | null = () => {
        if (boardSize % 2 !== 0) {
            return 'Le nombre de cartes doit être pair.'
        }
        if (boardSize % cardsToFlip !== 0) {
            return 'Le nombre de cartes doit être un multiple du nombre à deviner.'
        }
        if (pokemonCount !== boardSize / cardsToFlip) {
            return 'Le nombre de pokémons différents doit être le nombre de cartes divisé par le nombre à deviner.'
        }
        if (pokemonCount > totalPokemons) {
            return 'Nombre de pokémons trop élevé.'
        }
        if (boardSize < 2 || cardsToFlip < 2 || pokemonCount < 1) {
            return 'Valeurs non valides.'
        }
        return null
    }

    const handleStart: () => void = () => {
        const errorMsg: string | null = getValidationError()
        if (!errorMsg) {
            setError('')
            onStart({ boardSize, cardsToFlip, pokemonCount })
        } else {
            setError(errorMsg)
        }
    }

    const handleBoardSizeChange: (event: ChangeEvent<HTMLInputElement>) => void = (
        event: ChangeEvent<HTMLInputElement>
    ): void => {
        setBoardSize(Number(event.target.value))
    }

    const handleCardsToFlipChange: (event: ChangeEvent<HTMLInputElement>) => void = (
        event: ChangeEvent<HTMLInputElement>
    ): void => {
        setCardsToFlip(Number(event.target.value))
    }

    return (
        <Dialog open={open}>
            <DialogTitle>Paramètres du jeu</DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 300, pt: 2 }}>
                <TextField
                    label='Nombre de cartes'
                    type='number'
                    value={boardSize}
                    onChange={handleBoardSizeChange}
                    fullWidth
                    sx={{ mt: 1 }}
                />
                <TextField
                    label='Nombre de cartes à deviner'
                    type='number'
                    value={cardsToFlip}
                    onChange={handleCardsToFlipChange}
                    fullWidth
                />
                <TextField
                    label='Nombre de pokémons différents'
                    type='number'
                    value={pokemonCount}
                    disabled
                    fullWidth
                    helperText='Toujours égal à (nombre de cartes) ÷ (nombre à deviner)'
                />
                {error && <Alert severity='error'>{error}</Alert>}
            </DialogContent>
            <DialogActions>
                <Button onClick={onDefault} disabled={loading}>
                    Par défaut
                </Button>
                <Button onClick={handleStart} variant='contained' disabled={loading || !!getValidationError()}>
                    Lancer la partie
                </Button>
            </DialogActions>
        </Dialog>
    )
}
