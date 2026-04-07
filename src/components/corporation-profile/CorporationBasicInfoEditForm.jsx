import { useMemo, useCallback, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { CorporationBasicsCard } from '../corporation-creation/CorporationBasicsCard';
import { CorporationAddressCard } from '../corporation-creation/CorporationAddressCard';
import { ExecutiveSponsorCard } from '../corporation-creation/ExecutiveSponsorCard';
import { ActionButtonsGroup } from '../company-creation/ActionButtonsGroup';

function corporationToFormData(corporation) {
  if (!corporation) return {};
  const addr = corporation.address || {};
  const sponsor = corporation.executiveSponsor || {};
  return {
    corporationLegalName: corporation.legalName ?? '',
    dbaName: corporation.dbaName ?? '',
    regionDataResidency: corporation.regionDataResidency ?? '',
    industry: corporation.industry ?? '',
    corporatePhoneNo: corporation.corporatePhoneNo ?? '',
    websiteUrl: corporation.websiteUrl ?? '',
    addressLine: addr.street ?? '',
    stateProvince: addr.state ?? '',
    city: addr.city ?? '',
    country: addr.country ?? '',
    zipPostalCode: addr.zip ?? '',
    timeZone: corporation.timeZone ?? '',
    executiveSponsorName: sponsor.name ?? '',
    executiveSponsorRole: sponsor.role ?? '',
    executiveSponsorEmail: sponsor.email ?? '',
    executiveSponsorWorkPhoneNo: sponsor.workPhoneNo ?? '',
    executiveSponsorCellPhoneNo: sponsor.cellPhoneNo ?? '',
  };
}

export function CorporationBasicInfoEditForm({
  corporation,
  onSave,
  onCancel,
  isSaving = false,
}) {
  const initialFormData = useMemo(() => corporationToFormData(corporation), [corporation]);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const handleFieldChange = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, [errors]);

  const validate = useCallback(() => {
    const next = {};
    if (!(formData.corporationLegalName || '').trim()) next.corporationLegalName = 'Required';
    if (!(formData.regionDataResidency || '').trim()) next.regionDataResidency = 'Required';
    if (!(formData.industry || '').trim()) next.industry = 'Required';
    if (!(formData.corporatePhoneNo || '').trim()) next.corporatePhoneNo = 'Required';
    if (!(formData.websiteUrl || '').trim()) next.websiteUrl = 'Required';
    if (!(formData.addressLine || '').trim()) next.addressLine = 'Required';
    if (!(formData.stateProvince || '').trim()) next.stateProvince = 'Required';
    if (!(formData.city || '').trim()) next.city = 'Required';
    if (!(formData.country || '').trim()) next.country = 'Required';
    if (!(formData.timeZone || '').trim()) next.timeZone = 'Required';
    if (!(formData.executiveSponsorName || '').trim()) next.executiveSponsorName = 'Required';
    if (!(formData.executiveSponsorRole || '').trim()) next.executiveSponsorRole = 'Required';
    if (!(formData.executiveSponsorEmail || '').trim()) next.executiveSponsorEmail = 'Required';
    if (!(formData.executiveSponsorWorkPhoneNo || '').trim()) next.executiveSponsorWorkPhoneNo = 'Required';
    setErrors(next);
    return Object.keys(next).length === 0;
  }, [formData]);

  const handleSave = useCallback(() => {
    if (!validate()) return;
    const basicInfoPayload = {
      legalName: formData.corporationLegalName,
      dbaName: formData.dbaName,
      regionDataResidency: formData.regionDataResidency,
      industry: formData.industry,
      corporatePhoneNo: formData.corporatePhoneNo,
      websiteUrl: formData.websiteUrl,
      address: {
        street: formData.addressLine,
        state: formData.stateProvince,
        city: formData.city,
        country: formData.country,
        zip: formData.zipPostalCode,
      },
      timeZone: formData.timeZone,
      executiveSponsor: {
        name: formData.executiveSponsorName,
        role: formData.executiveSponsorRole,
        email: formData.executiveSponsorEmail,
        workPhoneNo: formData.executiveSponsorWorkPhoneNo,
        cellPhoneNo: formData.executiveSponsorCellPhoneNo,
      },
    };
    onSave(basicInfoPayload);
  }, [formData, validate, onSave]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography
          component="h2"
          sx={{
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            fontSize: '20px',
            fontWeight: 600,
            color: 'rgba(47, 65, 74, 1)',
            mb: 0.5,
          }}
        >
          Basic Info.
        </Typography>
        <Typography
          sx={{
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            fontSize: '14px',
            fontWeight: 400,
            color: 'rgba(73, 130, 145, 1)',
          }}
        >
          View and edit corporation basic details, address, and executive sponsor.
        </Typography>
      </Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
        <CorporationBasicsCard formData={formData} onFieldChange={handleFieldChange} errors={errors} />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <CorporationAddressCard formData={formData} onFieldChange={handleFieldChange} errors={errors} />
          <ExecutiveSponsorCard formData={formData} onFieldChange={handleFieldChange} errors={errors} collapsible />
        </Box>
      </Box>
      <ActionButtonsGroup
        onCancel={onCancel}
        onNext={handleSave}
        nextLabel="Save & Update"
        cancelLabel="Cancel"
        isNextDisabled={isSaving}
        isNextLoading={isSaving}
        loadingLabel="Saving..."
      />
    </Box>
  );
}
