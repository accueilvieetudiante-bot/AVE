import { useEffect, useRef, useState } from 'react';
import { Text, type TextStyle } from 'react-native';

function easeOutQuad(t: number) {
  return 1 - (1 - t) * (1 - t);
}

export function AnimatedCounter({
  value,
  suffix = '',
  duration = 1200,
  delay = 0,
  style,
}: {
  value: number;
  suffix?: string;
  duration?: number;
  delay?: number;
  style?: TextStyle;
}) {
  const [display, setDisplay] = useState(0);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    let start: number | null = null;
    let timeout: ReturnType<typeof setTimeout>;

    function step(timestamp: number) {
      if (start === null) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      setDisplay(Math.round(easeOutQuad(progress) * value));
      if (progress < 1) {
        frame.current = requestAnimationFrame(step);
      }
    }

    timeout = setTimeout(() => {
      frame.current = requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [value, duration, delay]);

  return (
    <Text style={style}>
      {display.toLocaleString('fr-FR')}
      {suffix}
    </Text>
  );
}
