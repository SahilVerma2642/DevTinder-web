import React, { useState, useRef, useEffect, useId } from 'react'
import type { UserData } from '../features/user/user.types'

interface UserCardProps {
    user: UserData;
    isTop: boolean;
    stackIndex: number;
    onSwipeLeft: () => void;
    onSwipeRight: () => void;
}

const SWIPE_THRESHOLD = 80;

const UserCard = ({ user, isTop, stackIndex, onSwipeLeft, onSwipeRight }: UserCardProps) => {
    const { firstName, lastName, age, gender, about } = user;

    // Only flyingOff needs React state — everything else is DOM-direct
    const [flyingOff, setFlyingOff] = useState<null | 'left' | 'right'>(null);

    const cardRef = useRef<HTMLDivElement>(null);
    const likeRef = useRef<HTMLDivElement>(null);
    const nopeRef = useRef<HTMLDivElement>(null);

    const id = useId();
    const isDragging = useRef(false);
    const dragX = useRef(0);
    const dragY = useRef(0);
    const startX = useRef(0);
    const startY = useRef(0);

    // Sync stack transform imperatively to avoid re-renders
    useEffect(() => {
        if (!cardRef.current) return;
        if (isTop) {
            cardRef.current.style.transform = '';
        } else {
            cardRef.current.style.transform = `scale(${1 - stackIndex * 0.05}) translateY(${stackIndex * 14}px)`;
        }
    }, [isTop, stackIndex]);

    const applyTransform = (x: number, y: number) => {
        if (!cardRef.current) return;
        const rotate = x * 0.08;
        cardRef.current.style.transform = `translate(${x}px, ${y}px) rotate(${rotate}deg)`;
        // Update overlays directly
        if (likeRef.current) likeRef.current.style.opacity = String(Math.min(x / SWIPE_THRESHOLD, 1));
        if (nopeRef.current) nopeRef.current.style.opacity = String(Math.min(-x / SWIPE_THRESHOLD, 1));
    };

    const handlePointerDown = (e: React.PointerEvent) => {
        if (!isTop || flyingOff) return;
        isDragging.current = true;
        startX.current = e.clientX - dragX.current;
        startY.current = e.clientY - dragY.current;
        cardRef.current?.setPointerCapture(e.pointerId);
        if (cardRef.current) cardRef.current.style.cursor = 'grabbing';
        if (cardRef.current) cardRef.current.style.transition = 'none';
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!isDragging.current || !isTop) return;
        dragX.current = e.clientX - startX.current;
        dragY.current = e.clientY - startY.current;
        applyTransform(dragX.current, dragY.current);
    };

    const handlePointerUp = () => {
        if (!isDragging.current) return;
        isDragging.current = false;
        if (cardRef.current) cardRef.current.style.cursor = 'grab';
        if (cardRef.current) cardRef.current.style.transition = 'transform 0.35s ease';

        if (dragX.current > SWIPE_THRESHOLD) {
            triggerSwipe('right');
        } else if (dragX.current < -SWIPE_THRESHOLD) {
            triggerSwipe('left');
        } else {
            // Bounce back
            dragX.current = 0;
            dragY.current = 0;
            applyTransform(0, 0);
            if (likeRef.current) likeRef.current.style.opacity = '0';
            if (nopeRef.current) nopeRef.current.style.opacity = '0';
        }
    };

    const triggerSwipe = (dir: 'left' | 'right') => {
        if (!cardRef.current) return;
        cardRef.current.style.transition = 'transform 0.35s ease';
        const flyX = dir === 'right' ? window.innerWidth * 1.5 : -window.innerWidth * 1.5;
        const rotate = dir === 'right' ? 30 : -30;
        cardRef.current.style.transform = `translate(${flyX}px, ${dragY.current}px) rotate(${rotate}deg)`;
        setFlyingOff(dir);
        setTimeout(() => (dir === 'right' ? onSwipeRight() : onSwipeLeft()), 350);
    };

    const baseStyle: React.CSSProperties = isTop
        ? { zIndex: 100, cursor: 'grab', touchAction: 'none', transition: 'transform 0.35s ease' }
        : { zIndex: 100 - stackIndex, transition: 'transform 0.3s ease' };

    return (
        <div
            ref={cardRef}
            className="card bg-base-100 w-80 md:w-96 shadow-xl select-none absolute"
            style={baseStyle}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
        >
            <figure className="relative overflow-hidden">
                <img src={`https://xsgames.co/randomusers/avatar.php?g=male&v=${encodeURIComponent(id)}`} alt="Profile" className="object-cover h-80 w-full" draggable={false} />
                {isTop && (
                    <>
                        <div
                            ref={likeRef}
                            className="absolute top-6 left-6 border-4 border-green-400 text-green-400 font-extrabold text-3xl px-3 py-1 rounded-lg -rotate-12"
                            style={{ opacity: 0 }}
                        >
                            Connect
                        </div>
                        <div
                            ref={nopeRef}
                            className="absolute top-6 right-6 border-4 border-red-400 text-red-400 font-extrabold text-3xl px-3 py-1 rounded-lg rotate-12"
                            style={{ opacity: 0 }}
                        >
                            Dismiss
                        </div>
                    </>
                )}
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {firstName + " " + lastName}
                    {(age || gender) && (
                        <div className="badge badge-secondary">
                            {(age ?? '') + (gender ? " " + gender : '')}
                        </div>
                    )}
                </h2>
                {about && <p className="text-sm">{about}</p>}
                <div className="card-actions justify-center gap-8 mt-2">
                    <button
                        className="btn btn-circle btn-outline btn-error btn-lg text-xl"
                        onClick={(e) => { e.stopPropagation(); triggerSwipe('left'); }}
                    >✕</button>
                    <button
                        className="btn btn-circle btn-outline btn-success btn-lg text-xl"
                        onClick={(e) => { e.stopPropagation(); triggerSwipe('right'); }}
                    >✓</button>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
