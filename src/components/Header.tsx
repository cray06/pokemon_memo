'use client'
import React, { useState, useEffect, useRef, RefObject, FunctionComponent } from 'react'
import confetti from 'canvas-confetti'

interface HeaderProps {
    score: number
    bestScore: number
}
const Header: FunctionComponent<HeaderProps> = ({ score, bestScore }: HeaderProps) => {
    const [isHovered, setIsHovered] = useState(false)
    const prevBestScore: RefObject<number> = useRef<number>(bestScore)

    useEffect(() => {
        prevBestScore.current = bestScore
    }, [bestScore])

    useEffect(() => {
        if (score > prevBestScore.current) {
            confetti({
                particleCount: 120,
                spread: 90,
                origin: { y: 0.6 }
            })
            prevBestScore.current = score
        }
    }, [score])

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                width: '100%',
                minHeight: '40vh',
                paddingTop: '10vh'
            }}
        >
            <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                    background: '#fff',
                    boxShadow: isHovered
                        ? '0 8px 24px rgba(0,0,0,0.3), 0 0 12px #5c7cfa'
                        : '0 4px 16px rgba(0,0,0,0.15)',
                    borderRadius: '16px',
                    padding: '32px 48px',
                    minWidth: '320px',
                    textAlign: 'center',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                    cursor: 'pointer'
                }}
            >
                <h1 style={{ marginBottom: '16px' }}>Pokemon Memo Game</h1>
                <p style={{ margin: '8px 0', fontWeight: 'bold' }}>Score: {score}</p>
                <p style={{ margin: '8px 0', color: '#888' }}>Best Score: {bestScore}</p>
            </div>
        </div>
    )
}

export default Header
