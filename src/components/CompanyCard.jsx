import { memo } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Building2 } from 'lucide-react';
import { CompanyActions } from './corporation-creation/CompanyActions';

function DotSeparator() {
  return (
    <Box
      sx={{
        width: 4,
        height: 4,
        borderRadius: '50%',
        background: 'rgba(100, 157, 172, 1)',
        flexShrink: 0,
      }}
      aria-hidden
    />
  );
}

function CompanyCardInner({ company, onClick, onEdit, onDelete, deleteAriaLabelSuffix = '' }) {
  const displayName = company.name ?? company.companyLegalName ?? 'Company';
  const displayType = company.type ?? '';
  const displayLocation = company.location ?? '';
  const hasActions = typeof onEdit === 'function' || typeof onDelete === 'function';

  const cardContent = (
    <>
      <IconButton
        size="small"
        sx={{
          width: 48,
          height: 48,
          mr: 1.5,
          background: 'rgba(231, 237, 247, 1)',
          borderRadius: 1,
          color: 'rgba(48, 95, 161, 1)',
        }}
        aria-hidden
      >
        <Building2 size={24} strokeWidth={1.5} />
      </IconButton>
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Typography
          variant="subtitle2"
          sx={{
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            fontWeight: 500,
            fontSize: '14px',
            color: 'rgba(47, 65, 74, 1)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {displayName}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            mt: 0.5,
            flexWrap: 'wrap',
          }}
        >
          <Typography
            variant="caption"
            sx={{
              fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
              fontWeight: 400,
              fontSize: '12px',
              color: 'rgba(56, 89, 102, 1)',
            }}
          >
            {displayType}
          </Typography>
          <DotSeparator />
          <Typography
            variant="caption"
            sx={{
              fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
              fontWeight: 400,
              fontSize: '12px',
              color: 'rgba(56, 89, 102, 1)',
            }}
          >
            {displayLocation}
          </Typography>
        </Box>
      </Box>
      {hasActions && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }} onClick={(e) => e.stopPropagation()}>
          <CompanyActions
            companyId={company.id}
            companyName={displayName}
            onEdit={onEdit}
            onDelete={onDelete}
            deleteAriaLabelSuffix={deleteAriaLabelSuffix}
          />
        </Box>
      )}
    </>
  );

  if (typeof onClick === 'function') {
    return (
      <Box
        onClick={() => onClick(company.id)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick(company.id);
          }
        }}
        aria-label={`View details for ${displayName} company`}
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 2,
          background: 'rgba(255, 255, 255, 1)',
          borderRadius: 2,
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
          cursor: 'pointer',
          transition: 'box-shadow 200ms ease-out',
          '&:hover': {
            boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.08)',
          },
        }}
      >
        {cardContent}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 2,
        background: 'rgba(255, 255, 255, 1)',
        borderRadius: 2,
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
      }}
    >
      {cardContent}
    </Box>
  );
}

export const CompanyCard = memo(CompanyCardInner);
