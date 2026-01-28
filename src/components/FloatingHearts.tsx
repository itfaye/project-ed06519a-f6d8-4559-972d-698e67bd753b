import { useEffect, useState } from 'react';

interface Heart {
  id: number;
  left: string;
  animationDelay: string;
  size: string;
  opacity: number;
}

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const generatedHearts: Heart[] = [];
    for (let i = 0; i < 12; i++) {
      generatedHearts.push({
        id: i,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 6}s`,
        size: `${14 + Math.random() * 16}px`,
        opacity: 0.15 + Math.random() * 0.2,
      });
    }
    setHearts(generatedHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="absolute animate-float text-primary"
          style={{
            left: heart.left,
            top: `${20 + Math.random() * 60}%`,
            animationDelay: heart.animationDelay,
            fontSize: heart.size,
            opacity: heart.opacity,
          }}
        >
          💕
        </span>
      ))}
    </div>
  );
};

export default FloatingHearts;
