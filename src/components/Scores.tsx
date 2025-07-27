import React, { FunctionComponent } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import { ScoreEntry } from '@/container/interface/Game'

interface ScoresProps {
    scores: ScoreEntry[]
    bestScore: number | null
}

const Scores: FunctionComponent<ScoresProps> = ({ scores, bestScore }) => {
    return (
        <Box>
            {bestScore !== null && (
                <Typography variant='subtitle1' sx={{ mb: 1 }}>
                    🏆 Meilleur score : <b>{bestScore}</b>
                </Typography>
            )}
            <TableContainer
                component={Paper}
                sx={{
                    maxHeight: { xs: 120, sm: 200 },
                    boxShadow: 'none',
                    width: '100%',
                    overflowX: 'auto',
                    overflowY: 'auto'
                }}
            >
                <Table size='small' stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontSize: { xs: '0.9em', sm: '1em' } }}>ID</TableCell>
                            <TableCell sx={{ fontSize: { xs: '0.9em', sm: '1em' } }}>Score</TableCell>
                            <TableCell sx={{ fontSize: { xs: '0.9em', sm: '1em' } }}>Paramètres</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {scores.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={3} align='center'>
                                    Aucun score enregistré.
                                </TableCell>
                            </TableRow>
                        )}
                        {scores.map((entry: ScoreEntry, idx: number) => (
                            <TableRow
                                key={idx}
                                selected={entry.score === bestScore}
                                sx={entry.score === bestScore ? { backgroundColor: '#ffe082' } : {}}
                            >
                                <TableCell>{idx + 1}</TableCell>
                                <TableCell>
                                    <b>{entry.score}</b>
                                    {entry.score === bestScore && <span style={{ marginLeft: 8 }}>⭐</span>}
                                </TableCell>
                                <TableCell>
                                    {entry.config.boardSize},{entry.config.pokemonCount},{entry.config.cardsToFlip}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Typography variant='caption' sx={{ display: 'block', mt: 2, color: '#666' }}>
                <b>Légende paramètres :</b> [Nombre de cartes, Nombre de pokémons différents, Nombre de cartes à
                retourner]
            </Typography>
        </Box>
    )
}

export default Scores
