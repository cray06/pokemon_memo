import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import CloseIcon from '@mui/icons-material/Close'
import Rules from './Rules'
import Scores from './Scores'
import { defaultGameConfig, GameConfig, ScoreEntry } from '@/container/interface/Game'

export default function HelpButton() {
    const [open, setOpen] = useState(false)
    const [tab, setTab] = useState(0)
    const [scores, setScores] = useState<ScoreEntry[]>([])
    const [bestScore, setBestScore] = useState<number | null>(null)
    const [config, setConfig] = useState<GameConfig>(defaultGameConfig)

    useEffect(() => {
        if (open) {
            const stored: ScoreEntry[] = JSON.parse(localStorage.getItem('scores') || '[]')
            setScores(stored)
            setBestScore(stored.length > 0 ? Math.max(...stored.map((s) => s.score)) : null)
            const storedConfig: GameConfig | null = JSON.parse(localStorage.getItem('gameConfig') || 'null')
            setConfig(storedConfig || defaultGameConfig)
        }
    }, [open])

    return (
        <>
            <Button
                variant='contained'
                color='inherit'
                onClick={() => setOpen(true)}
                sx={{
                    position: 'fixed',
                    top: { xs: 8, sm: 24 },
                    left: { xs: 8, sm: 24 },
                    minWidth: { xs: 32, sm: 64 },
                    minHeight: { xs: 32, sm: 40 },
                    fontSize: { xs: '0.8rem', sm: '1rem' },
                    zIndex: 2000,
                    borderRadius: 8,
                    boxShadow: 2,
                    padding: { xs: '4px 8px', sm: '8px 16px' },
                    backgroundColor: '#000',
                    color: '#fff',
                    '&:hover': {
                        backgroundColor: '#222'
                    }
                }}
            >
                Aide
            </Button>
            {open && (
                <Paper
                    elevation={8}
                    sx={{
                        position: 'fixed',
                        top: { xs: 52, sm: 80 },
                        left: { xs: 8, sm: 24 },
                        width: { xs: '95vw', sm: 400 },
                        maxWidth: '98vw',
                        maxHeight: { xs: '70vh', sm: 400 },
                        zIndex: 2100,
                        borderRadius: 3,
                        p: { xs: 1, sm: 2 },
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        boxSizing: 'border-box',
                        overflow: 'hidden'
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Tabs
                            value={tab}
                            onChange={(_event, value: number) => setTab(value)}
                            textColor='primary'
                            indicatorColor='primary'
                            variant='fullWidth'
                            sx={{
                                minHeight: { xs: 32, sm: 48 },
                                '& .MuiTab-root': {
                                    fontSize: { xs: '0.85rem', sm: '1rem' },
                                    minHeight: { xs: 32, sm: 48 }
                                }
                            }}
                        >
                            <Tab label='Informations' />
                            <Tab label='Score' />
                        </Tabs>
                        <Button
                            onClick={() => setOpen(false)}
                            sx={{
                                minWidth: 0,
                                p: { xs: 0.5, sm: 1 },
                                ml: 2,
                                color: '#000'
                            }}
                        >
                            <CloseIcon fontSize='small' />
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            px: { xs: 0, sm: 1 },
                            py: 1,
                            flex: 1,
                            minHeight: 0,
                            overflowY: 'auto'
                        }}
                    >
                        {tab === 0 && <Rules />}
                        {tab === 1 && <Scores scores={scores} bestScore={bestScore} />}
                    </Box>
                </Paper>
            )}
        </>
    )
}
