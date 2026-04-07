import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { STEPS_CONFIG, selectAllStepStatuses } from '../../store/slices/companyCreationSlice';
import { StepperStep } from './StepperStep';

export function ProgressStepper() {
  const steps = STEPS_CONFIG;
  const statuses = useSelector(selectAllStepStatuses);

  return (
    <Box
      component="nav"
      aria-label="Add New Company Progress"
      sx={{
        background: '#fff',
        borderRadius: 2,
        p: 2,
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
      }}
    >
      <Box
        component="ul"
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          m: 0,
          p: 0,
        }}
        role="list"
      >
        {steps.map((step, index) => (
          <Box
            key={step.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              flex: index < steps.length - 1 ? '0 0 auto' : '1 1 auto',
            }}
          >
            <StepperStep
              id={step.id}
              title={step.title}
              description={step.description}
              status={statuses[index] ?? 'inactive'}
            />
            {index < steps.length - 1 && (
              <Box
                sx={{
                  width: 24,
                  height: 2,
                  background: 'rgba(221, 217, 235, 1)',
                  mx: 0.5,
                  alignSelf: 'center',
                }}
                aria-hidden
              />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
