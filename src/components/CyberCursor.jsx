import React, { useEffect, useState } from 'react';

export default function CyberCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show on desktop devices with fine pointer
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const checkHover = (e) => {
      const target = e.target;
      const isInteractive = target.closest('a, button, input, textarea, select, [role="button"], .interactive');
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousemove', checkHover);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Smooth trailing ring loop
    let animationFrameId;
    const animateTrailing = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.22,
        y: prev.y + (pos.y - prev.y) * 0.22,
      }));
      animationFrameId = requestAnimationFrame(animateTrailing);
    };
    animationFrameId = requestAnimationFrame(animateTrailing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', checkHover);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [pos.x, pos.y]);

  if (!isVisible) return null;

  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Central precise crosshair dot */}
      <div
        className="fixed w-2 h-2 -ml-1 -mt-1 rounded-full bg-brand-primary pointer-events-none transition-transform duration-75 ease-out shadow-[0_0_8px_#ff2d55]"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: isClicking ? 'scale(1.8)' : isHovering ? 'scale(1.4)' : 'scale(1)',
        }}
      />

      {/* Trailing tactical reticle */}
      <div
        className="fixed -ml-4 -mt-4 pointer-events-none rounded-full border border-brand-primary/60 transition-all duration-100 ease-out"
        style={{
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`,
          width: isHovering ? '44px' : '32px',
          height: isHovering ? '44px' : '32px',
          marginLeft: isHovering ? '-22px' : '-16px',
          marginTop: isHovering ? '-22px' : '-16px',
          borderColor: isHovering ? '#00f0ff' : 'rgba(255, 45, 85, 0.7)',
          boxShadow: isHovering ? '0 0 14px rgba(0, 240, 255, 0.4)' : '0 0 10px rgba(255, 45, 85, 0.3)',
          transform: isClicking ? 'scale(0.85)' : 'scale(1)',
        }}
      >
        {/* Subtle crosshair notches */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-1.5 bg-brand-primary/80" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-1.5 bg-brand-primary/80" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[1px] w-1.5 bg-brand-primary/80" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[1px] w-1.5 bg-brand-primary/80" />
      </div>
    </div>
  );
}
