import React from 'react';

/**
 * Componente `DateFormatter`
 * Formatea una fecha para mostrarla de manera legible.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {string|number} props.date - Fecha a formatear.
 * @param {string} [props.format] - Formato opcional de la fecha.
 *
 * @returns {JSX.Element} La fecha formateada.
 */
function DateFormatter({ date, format = 'DD/MM/YYYY HH:mm' }) {
  const dateObj = new Date(date);
  
  // Usamos toLocaleDateString() para formatear la fecha
  const formattedDate = dateObj.toLocaleDateString();

  return <span>{formattedDate}</span>;
}

export default DateFormatter;
