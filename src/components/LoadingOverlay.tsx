import React from 'react'

export default function LoadingOverlay({ text = 'Chargement du plateau...' }: { text?: string }) {
    return (
        <div className='fixed inset-0 z-[3000] bg-black/30 flex flex-col items-center justify-center'>
            <span
                className='inline-block w-14 h-14 border-4 border-[#b5abff] border-t-[#00d4ff]
            rounded-full animate-spin'
            />
            <div className='mt-6 text-white text-lg font-semibold drop-shadow'>{text}</div>
        </div>
    )
}
