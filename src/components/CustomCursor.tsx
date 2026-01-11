import { useEffect, useState, useRef } from 'react';

function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [smoothPosition, setSmoothPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const rafRef = useRef<number>();

  useEffect(() => {
    const checkTouchDevice = () => {
      return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches
      );
    };

    setIsTouchDevice(checkTouchDevice());

    if (checkTouchDevice()) {
      return;
    }
    let targetX = -100;
    let targetY = -100;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setPosition({ x: targetX, y: targetY });

      const target = e.target as HTMLElement;
      const clickable = target.closest('a, button, input, textarea, select, [role="button"]');
      setIsPointer(!!clickable);
    };

    const handleMouseEnter = () => setIsHidden(false);
    const handleMouseLeave = () => setIsHidden(true);

    const smoothFollow = () => {
      setSmoothPosition((prev) => {
        const dx = targetX - prev.x;
        const dy = targetY - prev.y;

        return {
          x: prev.x + dx * 0.6,
          y: prev.y + dy * 0.6,
        };
      });

      rafRef.current = requestAnimationFrame(smoothFollow);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    rafRef.current = requestAnimationFrame(smoothFollow);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  if (isHidden || isTouchDevice) return null;

  return (
    <div
      className="fixed pointer-events-none z-[9999]"
      style={{
        left: `${smoothPosition.x}px`,
        top: `${smoothPosition.y}px`,
        transform: 'translate(-4px, -4px)',
      }}
    >
      <svg
        width={isPointer ? '32' : '24'}
        height={isPointer ? '32' : '24'}
        viewBox="0 0 24 24"
        fill="none"
        className="transition-all duration-300 ease-out"
        style={{
          filter: 'drop-shadow(0 2px 8px rgba(218, 165, 32, 0.6))',
        }}
      >
        <path
          d="M5 3L19 12L12 13L9 20L5 3Z"
          fill={isPointer ? '#DAA520' : '#FFFFFF'}
          stroke={isPointer ? '#FFD700' : '#DAA520'}
          strokeWidth="1.5"
          strokeLinejoin="round"
          className="transition-all duration-300 ease-out"
        />
        <path
          d="M12 13L19 12"
          stroke={isPointer ? '#FFD700' : '#DAA520'}
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.6"
        />
      </svg>
    </div>
  );
}

export default CustomCursor;
