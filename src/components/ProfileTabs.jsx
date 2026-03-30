import { Box, Tab, Tabs } from '@mui/material';

const tabStyles = {
  fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
  fontWeight: 600,
  fontSize: '14px',
  textTransform: 'none',
  minHeight: 48,
  '&.Mui-selected': {
    color: 'rgba(48, 95, 161, 1)',
  },
  '&:focus': {
    outline: 'none',
  },
  '&.Mui-focusVisible': {
    outline: 'none',
    boxShadow: 'none',
  },
};

export function ProfileTabs({ tabs, activeTab, onTabChange }) {
  return (
    <Box
      sx={{
        background: 'rgba(241, 240, 247, 1)',
        borderRadius: '8px 8px 0 0',
        borderBottom: '1px solid var(--color-grey-400)',
      }}
    >
      <Tabs
        value={activeTab}
        onChange={(_, v) => onTabChange(v)}
        variant="standard"
        sx={{
          minHeight: 48,
          '& .MuiTabs-indicator': { display: 'none' },
          '& .MuiTabs-flexContainer': { gap: 0 },
          '& .MuiTab-root': { ...tabStyles },
        }}
        role="tablist"
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.value}
            id={`${tab.value}-tab`}
            label={tab.label}
            value={tab.value}
            role="tab"
            aria-selected={activeTab === tab.value}
            aria-controls={`${tab.value}-tabpanel`}
            sx={{
              ...tabStyles,
              color: activeTab === tab.value ? 'rgba(48, 95, 161, 1)' : 'rgba(56, 89, 102, 1)',
              background: activeTab === tab.value ? 'rgba(255, 255, 255, 1)' : 'transparent',
              borderRadius: activeTab === tab.value ? '8px 8px 0 0' : 0,
              boxShadow: activeTab === tab.value ? '0px 4px 8px rgba(0,0,0,0.05)' : 'none',
              '&:hover': {
                color: activeTab === tab.value ? 'rgba(48, 95, 161, 1)' : 'rgba(48, 95, 161, 1)',
                background: activeTab === tab.value ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 0.04)',
              },
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
}
