import { Player, PlayerRef } from '@remotion/player'
import { useRef, useCallback } from 'react'
import { X } from 'lucide-react'
import { WelcomeComposition, WELCOME_DURATION } from './WelcomeComposition'

interface WelcomeVideoModalProps {
    onClose: () => void
    onStartTour: () => void
}

export const WelcomeVideoModal: React.FC<WelcomeVideoModalProps> = ({ onClose, onStartTour }) => {
    const playerRef = useRef<PlayerRef>(null)

    const handleStartTour = useCallback(() => {
        onStartTour()
    }, [onStartTour])

    const handleEnded = useCallback(() => {
        // 動画終了後、少し余韻を持たせてからツアーへ
        setTimeout(handleStartTour, 500)
    }, [handleStartTour])

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0,0,0,0.7)',
                backdropFilter: 'blur(8px)',
            }}
        >
            <div
                style={{
                    background: '#0f172a',
                    borderRadius: 16,
                    overflow: 'hidden',
                    maxWidth: 860,
                    width: '92vw',
                    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    position: 'relative',
                }}
            >
                {/* 動画プレイヤー */}
                <Player
                    ref={playerRef}
                    component={WelcomeComposition}
                    durationInFrames={WELCOME_DURATION}
                    compositionWidth={860}
                    compositionHeight={484}
                    fps={30}
                    autoPlay
                    style={{ width: '100%', aspectRatio: '860/484' }}
                    controls={false}
                    onEnded={handleEnded}
                />

                {/* スキップボタン（動画上に浮かせる） */}
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        background: 'rgba(255,255,255,0.1)',
                        border: 'none',
                        color: 'rgba(255,255,255,0.5)',
                        padding: '6px 14px',
                        borderRadius: 8,
                        cursor: 'pointer',
                        fontSize: 12,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 5,
                        backdropFilter: 'blur(4px)',
                        transition: 'color 0.2s, background 0.2s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.2)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
                >
                    <X size={13} />
                    スキップ
                </button>

                {/* ツアー開始ボタン（下部） */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    padding: '12px 20px',
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                }}>
                    <button
                        onClick={handleStartTour}
                        style={{
                            background: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
                            border: 'none',
                            color: '#fff',
                            padding: '8px 20px',
                            borderRadius: 8,
                            cursor: 'pointer',
                            fontSize: 13,
                            fontWeight: 600,
                        }}
                    >
                        ガイドツアーを開始
                    </button>
                </div>
            </div>
        </div>
    )
}
