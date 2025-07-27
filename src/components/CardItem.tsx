import Grid from '@mui/material/Grid'
import Image from 'next/image'
import { Card } from '@/container/interface/Game'

interface CardItemProps {
    item: Card
    index: number
    isFlipped: boolean
    isMatched: boolean
    isIncorrect: boolean
    onClick: (index: number) => void
}

export default function CardItem({ item, index, isFlipped, isMatched, isIncorrect, onClick }: CardItemProps) {
    return (
        <Grid size={{ xs: 6, sm: 4, md: 3 }} key={index}>
            <div className='group [perspective:1000px] w-full aspect-[3/4] relative' onClick={() => onClick(index)}>
                <div
                    className={`relative w-full h-full transition-transform duration-500
                    [transform-style:preserve-3d] cursor-pointer
                    ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
                >
                    {/* Front face */}
                    <div
                        className='absolute inset-0 h-full w-full rounded-lg sm:rounded-xl bg-white flex
                        flex-col items-center justify-center shadow-md hover:shadow-lg 
                        [backface-visibility:hidden] transition-shadow border-4'
                    >
                        <Image
                            src='/favicon.png'
                            alt='Card back'
                            width={32}
                            height={32}
                            className='w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14'
                        />
                    </div>
                    {/* Back face */}
                    <div
                        className={`absolute inset-0 h-full w-full rounded-lg sm:rounded-xl flex
                        flex-col items-center justify-between bg-white shadow-md 
                        [transform:rotateY(180deg)] [backface-visibility:hidden] 
                        border-2 sm:border-4 transition-all p-2 sm:p-3 ${
                            isMatched
                                ? 'border-green-500 bg-green-50'
                                : isIncorrect
                                  ? 'border-red-500 bg-red-50'
                                  : 'border-gray-400 bg-gray-50'
                        }`}
                    >
                        <div></div>
                        <Image
                            src={item.image}
                            alt={item.name}
                            width={100}
                            height={100}
                            className='w-16 h-16 sm:w-16 sm:h-16 md:w-18 md:h-18 max-w-[100px] max-h-[100px]'
                        />
                        <p className='text-xs sm:text-sm font-semibold text-center px-1 capitalize'>{item.name}</p>
                    </div>
                </div>
            </div>
        </Grid>
    )
}
