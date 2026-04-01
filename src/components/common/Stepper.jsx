import { Box } from '@mui/material';
import { Step } from './Step';

export function Stepper({ steps, currentStepId, onStepClick }) {
  return (
    <Box
      component="nav"
      aria-label="Form steps"
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 1,
        mb: 3,
      }}
    >
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = step.id === currentStepId;
        const ariaLabel = `Step ${stepNumber}: ${step.label}, ${step.subLabel}${isActive ? ', current step' : ''}`;
        return (
          <Box key={step.id} sx={{ display: 'flex', alignItems: 'center' }}>
            {index > 0 && (
              <Box
                component="span"
                sx={{
                  width: 1,
                  height: 24,
                  mx: 0.5,
                  background: 'rgba(221, 217, 235, 1)',
                  flexShrink: 0,
                }}
                aria-hidden
              />
            )}
            <Step
              id={step.id}
              label={step.label}
              subLabel={step.subLabel}
              isActive={isActive}
              stepNumber={stepNumber}
              onClick={onStepClick ? () => onStepClick(step.id) : undefined}
              ariaLabel={ariaLabel}
            />
          </Box>
        );
      })}
    </Box>
  );
}
