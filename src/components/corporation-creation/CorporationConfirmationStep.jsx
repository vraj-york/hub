import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { ProgressBar } from '../company-creation/ProgressBar';
import { FormCard } from '../company-creation/FormCard';
import { ReviewDataDisplayRow } from './ReviewDataDisplayRow';
import { CompanyReviewCard } from './CompanyReviewCard';
import { CorporationLogoDisplay } from './CorporationLogoDisplay';

const sectionHeaderSx = {
  fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
  fontSize: '12px',
  fontWeight: 500,
  color: 'rgba(56, 89, 102, 1)',
  mb: 1,
};

export function CorporationConfirmationStep({ confirmationData, onConfirm, onPrevious, onCancel, isQuickSetup = false }) {
  const [logoUrl, setLogoUrl] = useState(null);
  const logoFile = confirmationData?.branding?.logoFile ?? null;

  useEffect(() => {
    if (logoFile && typeof logoFile === 'object' && typeof URL.createObjectURL === 'function') {
      const url = URL.createObjectURL(logoFile);
      setLogoUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setLogoUrl(null);
  }, [logoFile]);

  const corp = confirmationData?.corporation ?? {};
  const exec = confirmationData?.executiveSponsor ?? {};
  const companies = confirmationData?.companies ?? [];
  const companyDetails = confirmationData?.companyDetails ?? {};
  const keyContacts = confirmationData?.keyContacts ?? {};
  const adminUser = confirmationData?.adminUser ?? {};
  const progressPercent = isQuickSetup ? 66 : 80;

  const trackBg = isQuickSetup ? 'rgba(248, 247, 251, 1)' : undefined;
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <ProgressBar progress={progressPercent} labelText={`${progressPercent}% Complete`} trackBackground={trackBg} />
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
        Confirmation
      </Typography>
      <Typography sx={{ fontSize: '14px', color: 'rgba(73, 130, 145, 1)', mb: 2 }}>
        Review all the details that has been added.
      </Typography>

      <FormCard>
        <Typography component="h3" sx={sectionHeaderSx}>Corporation Info.</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}><ReviewDataDisplayRow label="Corporation Legal Name" value={corp.legalName} /></Box>
            <Box sx={{ flex: 1 }}><ReviewDataDisplayRow label="DBA Name" value={corp.dbaName} /></Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}><ReviewDataDisplayRow label="Region (Data Residency)" value={corp.region} /></Box>
            <Box sx={{ flex: 1 }}><ReviewDataDisplayRow label="Industry" value={corp.industry} /></Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}><ReviewDataDisplayRow label="Corporate Phone No." value={corp.phone} /></Box>
            <Box sx={{ flex: 1 }}><ReviewDataDisplayRow label="Website URL" value={corp.website} /></Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}><ReviewDataDisplayRow label="Address" value={corp.address} /></Box>
            <Box sx={{ flex: 1 }}><ReviewDataDisplayRow label="Time Zone" value={corp.timeZone} /></Box>
          </Box>
        </Box>
      </FormCard>

      <FormCard>
        <Typography component="h3" sx={sectionHeaderSx}>Executive Sponsor</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}><ReviewDataDisplayRow label="Executive Sponsor" value={exec.name} /></Box>
            <Box sx={{ flex: 1 }}><ReviewDataDisplayRow label="Role" value={exec.role} /></Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}><ReviewDataDisplayRow label="Email" value={exec.email} /></Box>
            <Box sx={{ flex: 1 }}><ReviewDataDisplayRow label="Work Phone No." value={exec.workPhone} /></Box>
          </Box>
          <Box sx={{ flex: 1 }}><ReviewDataDisplayRow label="Cell Phone No." value={exec.cellPhone} /></Box>
        </Box>
      </FormCard>

      <FormCard>
        <Typography component="h3" sx={sectionHeaderSx}>Company Details</Typography>
        {isQuickSetup ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box sx={{ flex: 1 }}><ReviewDataDisplayRow label="Company Legal Name" value={companyDetails.companyLegalName} /></Box>
              <Box sx={{ flex: 1 }}><ReviewDataDisplayRow label="Company Type" value={companyDetails.companyType} /></Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box sx={{ flex: 1 }}><ReviewDataDisplayRow label="Office Type" value={companyDetails.officeType} /></Box>
              <Box sx={{ flex: 1 }}><ReviewDataDisplayRow label="State/ Province" value={companyDetails.stateProvince} /></Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box sx={{ flex: 1 }}><ReviewDataDisplayRow label="City" value={companyDetails.city} /></Box>
              <Box sx={{ flex: 1 }}><ReviewDataDisplayRow label="ZIP/ Postal Code" value={companyDetails.zipPostalCode} /></Box>
            </Box>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {companies.length
              ? companies.map((c, i) => (
                  <CompanyReviewCard
                    key={i}
                    companyName={c.name}
                    companyType={c.type}
                    location={c.location}
                  />
                ))
              : (
                  <Typography sx={{ fontSize: '14px', color: 'rgba(56, 89, 102, 1)' }}>
                    N/A
                  </Typography>
                )}
          </Box>
        )}
      </FormCard>

      {isQuickSetup && (
        <FormCard>
          <Typography component="h3" sx={sectionHeaderSx}>Admin User</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box sx={{ flex: 1 }}><ReviewDataDisplayRow label="Admin Name" value={adminUser.adminName} /></Box>
              <Box sx={{ flex: 1 }}><ReviewDataDisplayRow label="Company Admin Email" value={adminUser.companyAdminEmail} /></Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box sx={{ flex: 1 }}><ReviewDataDisplayRow label="No. of Employees" value={adminUser.numberOfEmployees} /></Box>
              <Box sx={{ flex: 1 }}><ReviewDataDisplayRow label="Security Posture" value={adminUser.securityPosture} /></Box>
            </Box>
          </Box>
        </FormCard>
      )}

      {!isQuickSetup && (
        <>
          <FormCard>
            <Typography component="h3" sx={sectionHeaderSx}>Branding</Typography>
            <ReviewDataDisplayRow
              label="Brand Logo"
              value={logoUrl ? 'Uploaded' : null}
            />
            <Box sx={{ mt: 1 }}>
              <CorporationLogoDisplay
                logoUrl={logoUrl}
                altText="Uploaded corporation logo"
              />
            </Box>
          </FormCard>

          <FormCard>
            <Typography component="h3" sx={sectionHeaderSx}>Key Contacts</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              <ReviewDataDisplayRow
                label="Primary Corporate Admin"
                value={keyContacts.primaryAdminName}
              />
              <ReviewDataDisplayRow
                label="Billing/ Finance Contact"
                value={keyContacts.billingFinanceName}
              />
              <ReviewDataDisplayRow
                label="Legal/ Compliance Contact"
                value={keyContacts.legalComplianceName}
              />
            </Box>
          </FormCard>
        </>
      )}
    </Box>
  );
}
