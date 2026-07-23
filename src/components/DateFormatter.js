// src/components/DateFormatter.js
import React from 'react';

const formatter = new Intl.DateTimeFormat('es-ES', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

/**
 * Muestra la fecha de creación de una tarea con formato "dd mmm yyyy, HH:mm".
 *
 * @param {Object} props
 * @param {string|number} props.date - Fecha ISO o timestamp a formatear.
 */
function DateFormatter({ date }) {
  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return null;

  return (
    <time className="entry__timestamp" dateTime={parsed.toISOString()}>
      {formatter.format(parsed)}
    </time>
  );
}

export default DateFormatter;
