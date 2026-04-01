import { Box, Typography } from '@mui/material';
import { Badge } from '../Badge';

export function TableCell({ content, secondaryContent, badgeProps, colSpan }) {
  const primaryContent =
    badgeProps != null ? (
      <Badge
        label={badgeProps.label ?? content}
        backgroundColor={badgeProps.backgroundColor}
        textColor={badgeProps.textColor}
        role="status"
        ariaLabel={badgeProps.ariaLabel ?? (typeof content === 'string' ? `Status: ${content}` : undefined)}
      />
    ) : (
      typeof content === 'string' ? (
        <Typography
          component="span"
          sx={{
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            fontWeight: 400,
            fontSize: 14,
            color: 'rgba(47, 65, 74, 1)',
          }}
        >
          {content}
        </Typography>
      ) : (
        content
      )
    );

  return (
    <Box
      component="td"
      role="cell"
      colSpan={colSpan}
      sx={{
        padding: '12px 16px',
        borderBottom: '1px solid rgba(221, 217, 235, 1)',
        verticalAlign: 'middle',
      }}
    >
      <Box>
        {primaryContent}
        {secondaryContent != null && (
          <Typography
            component="span"
            display="block"
            sx={{
              fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
              fontWeight: 400,
              fontSize: 12,
              color: 'rgba(73, 130, 145, 1)',
              mt: 0.25,
            }}
          >
            {secondaryContent}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
