import { Box, Typography } from '@mui/material';
import { Check } from 'lucide-react';

const STEP_COLORS = {
  completed: { bg: 'rgba(58, 111, 216, 1)', text: '#fff', title: 'rgba(47, 65, 74, 1)' },
  active: { bg: 'rgba(26, 39, 46, 0.05)', text: 'rgba(58, 111, 216, 1)', title: 'rgba(58, 111, 216, 1)', border: 'rgba(26, 39, 46, 0.05)' },
  inactive: { bg: '#fff', text: 'rgba(73, 130, 145, 1)', title: 'rgba(47, 65, 74, 1)', border: 'rgba(26, 39, 46, 0.05)' },
};

export function StepperStep({ id, title, description, status, component = 'li' }) {
  const colors = STEP_COLORS[status] ?? STEP_COLORS.inactive;
  const isCompleted = status === 'completed';
  const isActive = status === 'active';

  return (
    <Box
      component={component}
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 1.5,
        listStyle: 'none',
      }}
      aria-current={isActive ? 'step' : undefined}
    >
      <Box
        sx={{
          width: 32,
          height: 32,
          borderRadius: 1,
          background: colors.bg,
          border: colors.border ? `1px solid ${colors.border}` : 'none',
          boxShadow: colors.border ? '0px 1px 2px rgba(26, 39, 46, 0.05)' : 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
        aria-hidden
      >
        {isCompleted ? (
          <Check size={18} color="#fff" strokeWidth={2.5} />
        ) : (
          <Typography
            component="span"
            sx={{
              fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
              fontSize: '14px',
              fontWeight: 600,
              color: colors.text,
            }}
          >
            {id}
          </Typography>
        )}
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography
          sx={{
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            fontSize: '16px',
            fontWeight: 600,
            color: isCompleted ? 'rgba(47, 65, 74, 1)' : isActive ? 'rgba(58, 111, 216, 1)' : 'rgba(73, 130, 145, 1)',
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            fontSize: '14px',
            fontWeight: 400,
            color: 'rgba(56, 89, 102, 1)',
            mt: 0.25,
          }}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  );
}
