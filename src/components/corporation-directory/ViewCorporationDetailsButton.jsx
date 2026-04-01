import { IconButton } from '@mui/material';
import { Eye } from 'lucide-react';

export function ViewCorporationDetailsButton({ corporationId, corporationName, onClick }) {
  const handleClick = (e) => {
    e.stopPropagation();
    onClick?.(corporationId);
  };

  return (
    <IconButton
      size="small"
      onClick={handleClick}
      aria-label={`View details for ${corporationName ?? 'corporation'}`}
      sx={{ color: 'rgba(0, 0, 0, 1)' }}
    >
      <Eye size={18} aria-hidden />
    </IconButton>
  );
}
