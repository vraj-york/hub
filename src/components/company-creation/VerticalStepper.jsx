import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { STEPS_CONFIG, selectAllStepStatuses } from '../../store/slices/companyCreationSlice';
import { StepperStep } from './StepperStep';

export function VerticalStepper({ onStepClick, stepsConfig, stepStatuses, ariaLabel = 'Add New Company steps' }) {
  const steps = stepsConfig ?? STEPS_CONFIG;
  const statusesFromStore = useSelector(selectAllStepStatuses);
  const statuses = stepStatuses ?? statusesFromStore;

  return (
    <Box
      component="nav"
      aria-label={ariaLabel}
      sx={{
        background: '#fff',
        borderRadius: 2,
        p: 2,
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
        minWidth: 260,
      }}
    >
      <Box
        component="ul"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          m: 0,
          p: 0,
          listStyle: 'none',
        }}
        role="list"
      >
        {steps.map((step, index) => {
          const status = statuses[index] ?? 'inactive';
          const isClickable = status === 'completed' || status === 'active';
          return (
            <Box key={step.id} component="li" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Box
                component="button"
                type="button"
                onClick={() => isClickable && onStepClick?.(step.id)}
                aria-label={`Step ${step.id}: ${step.title}, ${status === 'completed' ? 'Completed' : status === 'active' ? 'Current step' : 'Upcoming'}`}
                aria-current={status === 'active' ? 'step' : undefined}
                sx={{
                  border: 'none',
                  background: 'transparent',
                  padding: 0,
                  cursor: isClickable ? 'pointer' : 'default',
                  textAlign: 'left',
                }}
              >
                <StepperStep
                  id={step.id}
                  title={step.title}
                  description={step.subtitle ?? step.description}
                  status={status}
                  component="div"
                />
              </Box>
              {index < steps.length - 1 && (
                <Box
                  sx={{
                    width: 2,
                    minHeight: 24,
                    background: 'rgba(221, 217, 235, 1)',
                    ml: 1.5,
                    mt: 0.5,
                    mb: 0.5,
                  }}
                  aria-hidden
                />
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
