import { Box, Typography } from '@mui/material';
import meetingTrackerLandingContent from '../assets/data/meetingTrackerLandingContent.json';
import meetingsTrackerMark from '../assets/images/meetings-tracker-mark.svg';

const primaryMain = '#2F414A';
const gradientStart = 'rgba(47, 65, 74, 0.05)';

export function MeetingTrackerLandingPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(to bottom right, ${gradientStart}, #ffffff 45%, #ffffff)`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        py: { xs: 4, md: 6 },
        px: 2,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 1152,
          display: 'grid',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Box
            sx={{
              textAlign: { xs: 'center', lg: 'left' },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1.5,
                flexWrap: 'wrap',
              }}
            >
              <Box
                component="img"
                src={meetingsTrackerMark}
                alt=""
                sx={{ width: 40, height: 40, flexShrink: 0, display: 'block' }}
                aria-hidden
              />
              <Typography
                component="h1"
                sx={{
                  fontSize: '2.25rem',
                  fontWeight: 700,
                  lineHeight: 1.1,
                  color: primaryMain,
                  margin: 0,
                }}
              >
                {meetingTrackerLandingContent.productName}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
