import { useState } from 'react';
import { Box, Card, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import { ChevronDown } from 'lucide-react';
import { TextInput } from '../company-creation/TextInput';

const CARD_CONTENT_ID = 'primary-corporate-admin-card-content';

export function PrimaryCorporateAdminCard({ initialData = {}, onChange, validationErrors = {} }) {
  const [isExpanded, setIsExpanded] = useState(true);

  const data = {
    name: initialData.primaryCorporateAdminName ?? '',
    role: initialData.primaryCorporateAdminRole ?? '',
    email: initialData.primaryCorporateAdminEmail ?? '',
    workPhone: initialData.primaryCorporateAdminWorkPhone ?? '',
    cellPhone: initialData.primaryCorporateAdminCellPhone ?? '',
  };

  const handleToggle = () => setIsExpanded((prev) => !prev);

  return (
    <Card
      sx={{
        background: '#fff',
        borderRadius: 2,
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
        overflow: 'hidden',
      }}
    >
      <CardHeader
        component="div"
        sx={{
          px: 2,
          py: 1.5,
          borderBottom: '1px solid rgba(221, 217, 235, 1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        title={
          <Typography
            component="h3"
            sx={{
              fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
              fontSize: '16px',
              fontWeight: 500,
              color: 'rgba(56, 89, 102, 1)',
            }}
          >
            Primary Corporate Admin
          </Typography>
        }
        action={
          <IconButton
            onClick={handleToggle}
            aria-expanded={isExpanded}
            aria-controls={CARD_CONTENT_ID}
            aria-label="Toggle Primary Corporate Admin details"
            role="button"
            sx={{
              background: 'rgba(248, 247, 251, 1)',
              borderRadius: 2,
              color: 'rgba(73, 130, 145, 1)',
              transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)',
              transition: 'transform 0.2s ease',
              '&:hover': { background: 'rgba(241, 240, 247, 1)' },
            }}
          >
            <ChevronDown size={20} aria-hidden />
          </IconButton>
        }
      />
      <CardContent
        id={CARD_CONTENT_ID}
        sx={{ display: isExpanded ? 'block' : 'none', p: 2 }}
        aria-hidden={!isExpanded}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextInput
            label="Name"
            placeholder="e.g., Mike Davis"
            value={data.name}
            onChange={(e) => onChange('primaryCorporateAdminName', e.target.value)}
            isRequired
            errorMessage={validationErrors.primaryCorporateAdminName}
            id="primary-corporate-admin-name"
            aria-label="Primary corporate admin name"
          />
          <TextInput
            label="Role"
            placeholder="e.g., CEO, Corporate Admin"
            value={data.role}
            onChange={(e) => onChange('primaryCorporateAdminRole', e.target.value)}
            isRequired
            errorMessage={validationErrors.primaryCorporateAdminRole}
            id="primary-corporate-admin-role"
            aria-label="Primary corporate admin role"
          />
          <TextInput
            label="Email"
            placeholder="e.g., mike_davis@email.com"
            value={data.email}
            onChange={(e) => onChange('primaryCorporateAdminEmail', e.target.value)}
            isRequired
            inputMode="email"
            errorMessage={validationErrors.primaryCorporateAdminEmail}
            id="primary-corporate-admin-email"
            aria-label="Primary corporate admin email"
          />
          <TextInput
            label="Work Phone Number"
            placeholder="e.g., +1 555 123 4567"
            value={data.workPhone}
            onChange={(e) => onChange('primaryCorporateAdminWorkPhone', e.target.value)}
            isRequired
            inputMode="numeric"
            errorMessage={validationErrors.primaryCorporateAdminWorkPhone}
            id="primary-corporate-admin-work-phone"
            aria-label="Primary corporate admin work phone number"
          />
          <TextInput
            label="Cell Phone Number"
            placeholder="e.g., +1 555 123 4567"
            value={data.cellPhone}
            onChange={(e) => onChange('primaryCorporateAdminCellPhone', e.target.value)}
            inputMode="numeric"
            id="primary-corporate-admin-cell-phone"
            aria-label="Primary corporate admin cell phone number"
          />
        </Box>
      </CardContent>
    </Card>
  );
}
