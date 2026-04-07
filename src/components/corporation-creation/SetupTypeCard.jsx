import { Box, Card, Grid, Typography, Button } from '@mui/material';
import { Zap, SlidersVertical, Check } from 'lucide-react';
import { RecommendedTag } from './RecommendedTag';
import { SetupFeatureItem } from './SetupFeatureItem';

const quickIconBg = 'rgba(122, 169, 187, 1)';
const advanceIconBg = 'rgba(241, 240, 247, 1)';
const iconColor = 'rgba(255, 255, 255, 1)';
const advanceIconColorDark = 'rgba(125, 100, 157, 1)';

export function SetupTypeCard({
  type,
  title,
  description,
  etaText,
  features = [],
  onSelect,
  isRecommended = false,
}) {
  const isQuick = type === 'quick';
  const Icon = isQuick ? Zap : SlidersVertical;
  const iconBg = isQuick ? quickIconBg : advanceIconBg;
  const buttonLabel = isQuick ? 'Start Quick Setup' : 'Start Advanced Setup';
  const buttonVariant = isQuick ? 'contained' : 'outlined';

  return (
    <Card
      component="article"
      role="region"
      aria-labelledby={`setup-card-title-${type}`}
      sx={{
        background: 'rgba(255, 255, 255, 1)',
        borderRadius: '12px',
        p: 4,
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        gap: 2.5,
        border: isQuick ? '2px solid rgba(48, 95, 161, 1)' : '2px solid transparent',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: '8px',
            background: iconBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-hidden
        >
          <Icon size={24} strokeWidth={2} style={{ color: isQuick ? iconColor : advanceIconColorDark }} />
        </Box>
        {isRecommended && <RecommendedTag label="Recommended" />}
      </Box>
      <Typography
        id={`setup-card-title-${type}`}
        component="h2"
        sx={{
          fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
          fontWeight: 600,
          fontSize: '16px',
          color: 'rgba(47, 65, 74, 1)',
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
          fontWeight: 400,
          fontSize: '14px',
          color: 'rgba(56, 89, 102, 1)',
          lineHeight: 1.5,
        }}
      >
        {description}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Check size={16} strokeWidth={2} style={{ color: 'rgba(73, 130, 145, 1)' }} />
        <Typography
          sx={{
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            fontWeight: 400,
            fontSize: '14px',
            color: 'rgba(73, 130, 145, 1)',
          }}
        >
          {etaText}
        </Typography>
      </Box>
      <Grid container spacing={2} sx={{ flex: 1 }}>
        {features.map((f) => (
          <Grid item xs={6} key={f.stepNumber}>
            <SetupFeatureItem
              stepNumber={f.stepNumber}
              title={f.title}
              subtitle={f.subtitle}
            />
          </Grid>
        ))}
      </Grid>
      <Button
        variant={buttonVariant}
        onClick={() => onSelect(type)}
        aria-label={
          isQuick
            ? 'Start Quick Setup for new corporation onboarding'
            : 'Start Advanced Setup for new corporation onboarding'
        }
        sx={
          isQuick
            ? {
                background: 'rgba(48, 95, 161, 1)',
                color: 'rgba(255, 255, 255, 1)',
                fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
                fontWeight: 600,
                fontSize: '14px',
                textTransform: 'none',
                '&:hover': { background: 'rgba(40, 80, 140, 1)' },
              }
            : {
                background: 'rgba(255, 255, 255, 1)',
                color: 'rgba(47, 65, 74, 1)',
                border: '1px solid rgba(221, 217, 235, 1)',
                fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
                fontWeight: 600,
                fontSize: '14px',
                textTransform: 'none',
                '&:hover': {
                  background: 'rgba(248, 247, 251, 1)',
                  borderColor: 'rgba(221, 217, 235, 1)',
                },
              }
        }
      >
        {buttonLabel}
      </Button>
    </Card>
  );
}
