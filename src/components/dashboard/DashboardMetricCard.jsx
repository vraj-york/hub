import { Card, Box, Typography } from '@mui/material';
import { Badge } from '../common/Badge';

const BADGE_STYLES = {
  positive: {
    backgroundColor: 'rgba(239, 250, 245, 1)',
    textColor: 'rgba(47, 143, 107, 1)',
  },
  negative: {
    backgroundColor: 'rgba(253, 243, 243, 1)',
    textColor: 'rgba(196, 71, 85, 1)',
  },
  neutral: {
    backgroundColor: 'rgba(239, 250, 245, 1)',
    textColor: 'rgba(47, 143, 107, 1)',
  },
};

export function DashboardMetricCard({
  title,
  value,
  description,
  badgeLabel,
  badgeType = 'neutral',
  titleId,
}) {
  const badgeStyle = BADGE_STYLES[badgeType] ?? BADGE_STYLES.neutral;
  const ariaLabel = badgeLabel
    ? `Change: ${badgeLabel.replace(/\+/g, 'plus ').replace(/-/g, 'minus ').replace(/%/g, ' percent')}`
    : undefined;

  return (
    <Card
      component="section"
      role="region"
      aria-labelledby={titleId}
      sx={{
        background: 'rgba(255, 255, 255, 1)',
        borderRadius: '8px',
        p: 2,
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.06)',
      }}
    >
      <Typography
        id={titleId}
        component="h3"
        sx={{
          fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
          fontWeight: 500,
          fontSize: '16px',
          color: 'rgba(73, 130, 145, 1)',
          mb: 1,
        }}
      >
        {title}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 1, flexWrap: 'wrap' }}>
        <Typography
          component="span"
          sx={{
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            fontWeight: 600,
            fontSize: '20px',
            color: 'rgba(48, 95, 161, 1)',
          }}
        >
          {value}
        </Typography>
        {badgeLabel && (
          <Badge
            label={badgeLabel}
            backgroundColor={badgeStyle.backgroundColor}
            textColor={badgeStyle.textColor}
            role="status"
            ariaLabel={ariaLabel}
          />
        )}
      </Box>
      <Typography
        sx={{
          fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
          fontWeight: 400,
          fontSize: '14px',
          color: 'rgba(56, 89, 102, 1)',
          mt: 0.5,
        }}
      >
        {description}
      </Typography>
    </Card>
  );
}
