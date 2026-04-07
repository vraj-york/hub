import { Box, CardContent, Collapse, IconButton, Typography } from '@mui/material';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { TextInput } from '../company-creation/TextInput';

const PRIMARY_ADMIN_CARD_CONTENT_ID = 'primary-admin-card-content';

export function PrimaryCorporateAdminEditCard({
  formData = {},
  onFieldChange,
  validationErrors = {},
  isCollapsed = false,
  onToggleCollapse,
}) {
  const data = {
    name: formData.name ?? '',
    role: formData.role ?? '',
    email: formData.email ?? '',
    workPhoneNo: formData.workPhoneNo ?? '',
    cellPhoneNo: formData.cellPhoneNo ?? '',
  };

  return (
    <Box
      component="div"
      role="region"
      aria-labelledby="primary-corporate-admin-edit-card-title"
      sx={{
        background: 'rgba(255, 255, 255, 1)',
        borderRadius: '8px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
        overflow: 'hidden',
      }}
    >
      <Box
        component="div"
        role="button"
        tabIndex={0}
        aria-expanded={!isCollapsed}
        aria-controls={PRIMARY_ADMIN_CARD_CONTENT_ID}
        onClick={onToggleCollapse}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggleCollapse?.();
          }
        }}
        sx={{
          px: 2,
          py: 1.5,
          borderBottom: '1px solid rgba(221, 217, 235, 1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          '&:hover': { background: 'rgba(248, 247, 251, 0.5)' },
        }}
      >
        <Typography
          id="primary-corporate-admin-edit-card-title"
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
        <IconButton
          component="span"
          onClick={(e) => {
            e.stopPropagation();
            onToggleCollapse?.();
          }}
          aria-label="Toggle Primary Corporate Admin details"
          sx={{
            background: 'rgba(248, 247, 251, 1)',
            borderRadius: 2,
            color: 'rgba(73, 130, 145, 1)',
            '&:hover': { background: 'rgba(241, 240, 247, 1)' },
          }}
        >
          {isCollapsed ? (
            <ChevronRight size={20} aria-hidden />
          ) : (
            <ChevronDown size={20} aria-hidden />
          )}
        </IconButton>
      </Box>
      <Collapse in={!isCollapsed}>
        <CardContent
          id={PRIMARY_ADMIN_CARD_CONTENT_ID}
          sx={{ p: 2, pt: 2 }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextInput
              label="Name"
              placeholder="e.g., Mike Davis"
              value={data.name}
              onChange={(e) => onFieldChange?.('name', e.target.value)}
              isRequired
              errorMessage={validationErrors.name}
              id="name-input"
              aria-label="Primary corporate admin name"
              valueTextColor="rgba(47, 65, 74, 1)"
              inputBackground="rgba(255, 255, 255, 1)"
            />
            <TextInput
              label="Role"
              placeholder="e.g., CEO, Corporate Admin"
              value={data.role}
              onChange={(e) => onFieldChange?.('role', e.target.value)}
              isRequired
              errorMessage={validationErrors.role}
              id="role-input"
              aria-label="Primary corporate admin role"
              valueTextColor="rgba(47, 65, 74, 1)"
              inputBackground="rgba(255, 255, 255, 1)"
            />
            <TextInput
              label="Email"
              placeholder="e.g., mike_davis@email.com"
              value={data.email}
              onChange={(e) => onFieldChange?.('email', e.target.value)}
              isRequired
              inputMode="email"
              errorMessage={validationErrors.email}
              id="email-input"
              aria-label="Primary corporate admin email"
              valueTextColor="rgba(47, 65, 74, 1)"
              inputBackground="rgba(255, 255, 255, 1)"
            />
            <TextInput
              label="Work Phone No."
              placeholder="e.g., +1 555 123 4567"
              value={data.workPhoneNo}
              onChange={(e) => onFieldChange?.('workPhoneNo', e.target.value)}
              isRequired
              inputMode="numeric"
              errorMessage={validationErrors.workPhoneNo}
              id="work-phone-input"
              aria-label="Primary corporate admin work phone number"
              valueTextColor="rgba(47, 65, 74, 1)"
              inputBackground="rgba(255, 255, 255, 1)"
            />
            <TextInput
              label="Cell Phone No."
              placeholder="e.g., +1 555 123 4567"
              value={data.cellPhoneNo}
              onChange={(e) => onFieldChange?.('cellPhoneNo', e.target.value)}
              inputMode="numeric"
              errorMessage={validationErrors.cellPhoneNo}
              id="cell-phone-input"
              aria-label="Primary corporate admin cell phone number"
              valueTextColor="rgba(47, 65, 74, 1)"
              inputBackground="rgba(255, 255, 255, 1)"
            />
          </Box>
        </CardContent>
      </Collapse>
    </Box>
  );
}
