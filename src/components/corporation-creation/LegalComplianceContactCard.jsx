import { Card, CardHeader, IconButton, Typography } from '@mui/material';
import { ChevronRight } from 'lucide-react';

export function LegalComplianceContactCard({
  title = 'Legal/ Compliance Contact',
  onClick,
  'aria-label': ariaLabel,
}) {
  return (
    <Card
      sx={{
        background: '#fff',
        borderRadius: 2,
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
        overflow: 'hidden',
      }}
    >
      <CardHeader
        component="div"
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
          }
        }}
        aria-label={ariaLabel ?? 'Manage Legal and Compliance Contact Details'}
        title={
          <Typography
            component="h3"
            sx={{
              fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
              fontSize: '16px',
              fontWeight: 500,
              color: 'rgba(56, 89, 102, 1)',
            }}
          >
            {title}
          </Typography>
        }
        sx={{
          px: 2,
          py: 1.5,
          borderBottom: '1px solid rgba(221, 217, 235, 1)',
          cursor: onClick ? 'pointer' : 'default',
          '&:hover': onClick ? { background: 'rgba(248, 247, 251, 0.5)' } : {},
        }}
        action={
          <IconButton
            component="span"
            sx={{
              color: 'rgba(73, 130, 145, 1)',
              p: 0.5,
              pointerEvents: 'none',
            }}
            aria-hidden
          >
            <ChevronRight size={20} />
          </IconButton>
        }
      />
    </Card>
  );
}
