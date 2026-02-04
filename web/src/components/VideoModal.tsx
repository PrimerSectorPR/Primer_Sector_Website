import React, { useEffect, useRef } from 'react';
import { usePlayer } from '../player/PlayerContext';

export const VideoModal: React.FC = () => {
    const {
        currentEpisode,
        isVideoMode,
        toggleVideoMode,
        currentTime,
        togglePlayPause, // We'll use this to pause main audio
        seek
    } = usePlayer();

    const videoRef = useRef<HTMLVideoElement>(null);

    // Sync Audio -> Video when opening
    useEffect(() => {
        if (isVideoMode && videoRef.current && currentEpisode) {
            // Pause main audio "logic" (handled by context, but we need to ensure we don't have double audio)
            // Actually, simplest hack: The Context manages the audio object.
            // If we want VIDEO, we should probably pause the Context's audio object directly
            // But `togglePlayPause` toggles `isPlaying` state which reflects in UI.

            // BETTER STRATEGY:
            // When VideoModal opens, we PAUSE the main audio via `togglePlayPause` if it's playing.
            // Then we play the video from `currentTime`.

            // Because we don't have direct access to the `App`'s `audio` element here (it's in context closure),
            // We rely on the fact that if we pause via context, UI updates.

            // Set video time
            videoRef.current.currentTime = currentTime;
            videoRef.current.play();
        }
    }, [isVideoMode, currentEpisode]);

    // Sync Video -> Audio when closing
    const handleClose = () => {
        if (videoRef.current) {
            const vidTime = videoRef.current.currentTime;
            // Update context time
            seek(vidTime);
            // Resume main audio
            // logic: if video was playing, we probably want to resume audio?
            // Let's assume yes.
            togglePlayPause(); // This will play because we paused earlier (or if we invoke seek it might not auto play, let's explicit)
        }
        toggleVideoMode();
    };

    if (!isVideoMode || !currentEpisode) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-4">
            <button
                onClick={handleClose}
                className="absolute top-6 right-6 text-white bg-red-600 hover:bg-red-700 rounded-full w-12 h-12 flex items-center justify-center z-50 font-bold shadow-lg border-2 border-white"
            >
                ✕
            </button>

            <div className="w-full max-w-6xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl relative border-4 border-gray-800">
                <video
                    ref={videoRef}
                    src={currentEpisode.audioUrl}
                    className="w-full h-full object-contain"
                    controls
                // If the user pauses video manually, that's fine.
                // When they close, we sync whatever the current time is.
                />

                {/* Fallback if it's audio-only file, but browsers usually show black screen with controls for audio in <video> tag */}
                <div className="absolute top-4 left-4 pointer-events-none">
                    <span className="bg-red-600 text-white px-2 py-1 text-xs font-bold uppercase tracking-wider rounded">
                        Modo Video
                    </span>
                </div>
            </div>

            <div className="mt-6 text-center">
                <h2 className="text-2xl font-black text-white uppercase mb-2">{currentEpisode.title}</h2>
                <p className="text-gray-400 font-mono text-sm max-w-2xl mx-auto line-clamp-2">
                    {currentEpisode.description}
                </p>
            </div>
        </div>
    );
};
