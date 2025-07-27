import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export default function Rules() {
    return (
        <Box>
            <Typography variant='h6' gutterBottom fontSize={{ xs: '1rem', sm: '1.25rem' }}>
                Règles du jeu
            </Typography>
            <ul style={{ paddingLeft: 18, fontSize: '0.95em' }}>
                <li>Retournez deux cartes à la fois pour trouver les paires identiques.</li>
                <li>Chaque paire trouvée augmente votre score de 10 points.</li>
                <li>Une mauvaise paire vous fait perdre 2 points.</li>
                <li>Le jeu se termine quand toutes les paires sont trouvées.</li>
            </ul>
        </Box>
    )
}
