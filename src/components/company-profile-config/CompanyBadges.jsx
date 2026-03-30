import { Box } from '@mui/material';
import { Badge } from '../common/Badge';

/**
 * Displays status badges for a company (e.g. "Assigned", "Enterprise").
 * @param {Array<{ label: string, color: string }>} badges
 */
export function CompanyBadges({ badges = [] }) {
  if (!badges.length) return null;
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
      {badges.map((b) => (
        <Badge
          key={b.label}
          label={b.label}
          backgroundColor={b.color}
          textColor="rgba(255, 255, 255, 1)"
        />
      ))}
    </Box>
  );
}
