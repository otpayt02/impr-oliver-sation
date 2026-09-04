import { useEffect, useMemo, useRef } from 'react';
import { createEntities, getEntityState } from './signal-model.js';

export function SignalField({ progress, animate, reactive }) {
  const canvasRef = useRef(null);
  const pointer = useRef({ x: -1, y: -1 });
  const entities = useMemo(() => createEntities(), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const context = canvas.getContext('2d');
    let frame = 0;

    const draw = (time = 0) => {
      const rect = canvas.getBoundingClientRect();
      const density = Math.min(2, window.devicePixelRatio || 1);
      const width = Math.max(1, Math.round(rect.width * density));
      const height = Math.max(1, Math.round(rect.height * density));
      if (canvas.width !== width || canvas.height !== height) { canvas.width = width; canvas.height = height; }
      context.setTransform(density, 0, 0, density, 0, 0);
      context.clearRect(0, 0, rect.width, rect.height);

      context.strokeStyle = 'rgba(224, 218, 205, 0.045)';
      context.lineWidth = 1;
      const grid = 34;
      for (let x = 0; x < rect.width; x += grid) {
        const bend = reactive && pointer.current.x >= 0 ? Math.max(0, 1 - Math.abs(x - pointer.current.x) / 180) * 6 : 0;
        context.beginPath(); context.moveTo(x, 0); context.lineTo(x + bend, rect.height); context.stroke();
      }
      for (let y = 0; y < rect.height; y += grid) { context.beginPath(); context.moveTo(0, y); context.lineTo(rect.width, y); context.stroke(); }

      const staffOpacity = Math.sin(Math.PI * Math.min(1, Math.max(0, (progress - 0.18) / 0.72)));
      context.strokeStyle = `rgba(207, 198, 178, ${0.22 * staffOpacity})`;
      for (let line = 0; line < 5; line += 1) {
        const y = rect.height * (0.425 + line * 0.044);
        context.beginPath(); context.moveTo(rect.width * 0.28, y); context.lineTo(rect.width * 0.72, y); context.stroke();
      }

      entities.forEach((entity) => {
        const state = getEntityState(entity, progress, animate ? time : 0);
        let x = state.x * rect.width;
        let y = state.y * rect.height;
        if (reactive && pointer.current.x >= 0) {
          const dx = x - pointer.current.x;
          const dy = y - pointer.current.y;
          const distance = Math.hypot(dx, dy) || 1;
          const force = Math.max(0, 1 - distance / 90) * 12;
          x += (dx / distance) * force;
          y += (dy / distance) * force;
        }
        if (state.binary > 0.02) {
          context.globalAlpha = 0.18 + state.binary * 0.45;
          context.fillStyle = '#84977d';
          context.font = `${8 + entity.size * 3}px ui-monospace, monospace`;
          context.fillText(entity.bit, x, y);
        }
        if (state.notation > 0.02) {
          context.globalAlpha = 0.15 + state.notation * 0.7;
          context.fillStyle = '#c4bba9';
          context.font = `${11 + entity.size * 8}px Georgia, serif`;
          context.fillText(entity.note, x, y);
        }
        if (state.particle > 0.02) {
          context.globalAlpha = 0.1 + state.particle * 0.75;
          context.fillStyle = entity.color;
          context.beginPath(); context.arc(x, y, 0.7 + entity.size * 1.5, 0, Math.PI * 2); context.fill();
        }
      });
      context.globalAlpha = 1;
      if (animate) frame = window.requestAnimationFrame(draw);
    };

    const move = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointer.current = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      if (!animate) draw(0);
    };
    const leave = () => { pointer.current = { x: -1, y: -1 }; };
    canvas.addEventListener('pointermove', move);
    canvas.addEventListener('pointerleave', leave);
    draw(0);
    return () => {
      window.cancelAnimationFrame(frame);
      canvas.removeEventListener('pointermove', move);
      canvas.removeEventListener('pointerleave', leave);
    };
  }, [animate, entities, progress, reactive]);

  return <canvas className="signal-field" ref={canvasRef} aria-label="Scroll-linked binary transforming into musical notation and particles" role="img" />;
}
