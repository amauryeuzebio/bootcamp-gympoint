export const { format: formatCurrencyBR } = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export function formatDuration(duration) {
  const durationFormatted =
    duration > 1 ? `${duration} meses` : `${duration} mês`;

  return durationFormatted;
}
