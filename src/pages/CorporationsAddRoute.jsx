import { useLocation } from 'react-router-dom';
import { CorporationSetupSelectionPage } from './CorporationSetupSelectionPage';
import { AddCorporationPage } from './AddCorporationPage';

/**
 * Renders /corporations/add:
 * - No flow or invalid flow -> CorporationSetupSelectionPage (Choose Setup Type)
 * - flow=quick or flow=advance -> AddCorporationPage (multi-step onboarding)
 */
export function CorporationsAddRoute() {
  const location = useLocation();
  const search = typeof location.search === 'string' ? location.search : '';
  const flow = new URLSearchParams(search).get('flow');

  if (flow === 'quick' || flow === 'advance') {
    return <AddCorporationPage />;
  }

  return <CorporationSetupSelectionPage />;
}

