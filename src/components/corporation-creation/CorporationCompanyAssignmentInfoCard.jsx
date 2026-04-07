import { InfoAlertCard } from '../company-creation/InfoAlertCard';

const DEFAULT_TITLE = 'Company Assignment & Modification';
const DEFAULT_DESCRIPTION = 'Created companies will be assigned to the corporation in the subsequent steps.';

/**
 * InfoAlertCard variant for Add New Corporation - Step 2 (Company Setup).
 */
export function CorporationCompanyAssignmentInfoCard({ title = DEFAULT_TITLE, description = DEFAULT_DESCRIPTION }) {
  return <InfoAlertCard title={title} description={description} />;
}
