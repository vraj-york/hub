import { useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FormCard } from '../company-creation/FormCard';
import { TextInput } from '../company-creation/TextInput';

export function ExecutiveSponsorCard({ formData, onFieldChange, errors = {}, collapsible = false }) {
  const [expanded, setExpanded] = useState(true);

  const content = (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <TextInput
              label="Name"
              placeholder="e.g., Mike Davis"
              value={formData.executiveSponsorName ?? ''}
              onChange={(e) => onFieldChange('executiveSponsorName', e.target.value)}
              isRequired
              errorMessage={errors.executiveSponsorName}
              id="executive-sponsor-name"
              aria-label="Executive sponsor name"
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <TextInput
              label="Role"
              placeholder="e.g., CEO, Corporate Admin"
              value={formData.executiveSponsorRole ?? ''}
              onChange={(e) => onFieldChange('executiveSponsorRole', e.target.value)}
              isRequired
              errorMessage={errors.executiveSponsorRole}
              id="executive-sponsor-role"
              aria-label="Executive sponsor role"
            />
          </Box>
        </Box>
        <TextInput
          label="Email"
          placeholder="e.g., mike_davis@email.com"
          value={formData.executiveSponsorEmail ?? ''}
          onChange={(e) => onFieldChange('executiveSponsorEmail', e.target.value)}
          isRequired
          inputMode="email"
          errorMessage={errors.executiveSponsorEmail}
          id="executive-sponsor-email"
          aria-label="Executive sponsor email"
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <TextInput
              label="Work Phone No."
              placeholder="e.g., +1 555 123 4567"
              value={formData.executiveSponsorWorkPhoneNo ?? ''}
              onChange={(e) => onFieldChange('executiveSponsorWorkPhoneNo', e.target.value)}
              isRequired
              inputMode="numeric"
              errorMessage={errors.executiveSponsorWorkPhoneNo}
              id="executive-sponsor-work-phone"
              aria-label="Executive sponsor work phone"
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <TextInput
              label="Cell Phone No."
              placeholder="e.g., +1 555 123 4567"
              value={formData.executiveSponsorCellPhoneNo ?? ''}
              onChange={(e) => onFieldChange('executiveSponsorCellPhoneNo', e.target.value)}
              inputMode="numeric"
              id="executive-sponsor-cell-phone"
              aria-label="Executive sponsor cell phone"
            />
          </Box>
        </Box>
      </Box>
  );

  if (collapsible) {
    return (
      <Box
        sx={{
          background: '#fff',
          borderRadius: 2,
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
          overflow: 'hidden',
        }}
        role="region"
        aria-labelledby="executive-sponsor-card-title"
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2,
            py: 1.5,
            borderBottom: '1px solid rgba(221, 217, 235, 1)',
          }}
        >
          <Typography
            component="h3"
            id="executive-sponsor-card-title"
            sx={{
              fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
              fontSize: '16px',
              fontWeight: 500,
              color: 'rgba(56, 89, 102, 1)',
            }}
          >
            Executive Sponsor
          </Typography>
          <IconButton
            size="small"
            onClick={() => setExpanded((e) => !e)}
            aria-label={expanded ? 'Collapse Executive Sponsor' : 'Expand Executive Sponsor'}
            aria-expanded={expanded}
            sx={{ color: 'rgba(73, 130, 145, 1)' }}
          >
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </IconButton>
        </Box>
        {expanded && <Box sx={{ p: 2 }}>{content}</Box>}
      </Box>
    );
  }

  return (
    <FormCard title="Executive Sponsor">
      {content}
    </FormCard>
  );
}
