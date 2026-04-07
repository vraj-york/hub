import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardPage } from './pages/DashboardPage';
import { CorporationProfileConfigurationPage } from './pages/CorporationProfileConfigurationPage';
import { EditCorporationPage } from './pages/EditCorporationPage';
import { CorporationsDirectoryPage } from './pages/CorporationsDirectoryPage';
import { CompaniesDirectoryPage } from './pages/CompaniesDirectoryPage';
import { CompanyConfigPage } from './pages/CompanyConfigPage';
import { CompanyEditPage } from './pages/CompanyEditPage';
import { TwoFactorAuthPage } from './pages/TwoFactorAuthPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { LoginPage } from './pages/LoginPage';
import { EmailVerificationPage } from './pages/EmailVerificationPage';
import { EmailVerificationCodeTemplate } from './components/email-templates/EmailVerificationCodeTemplate';
import { AddCompanyPage } from './pages/AddCompanyPage';
import { CorporationsAddRoute } from './pages/CorporationsAddRoute';
import { GlobalToast } from './components/common/GlobalToast';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/corporations" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/corporations" element={<CorporationsDirectoryPage />} />
        <Route path="/corporations/add" element={<CorporationsAddRoute />} />
        <Route path="/corporations/:corporationId/profile" element={<CorporationProfileConfigurationPage />} />
        <Route path="/corporations/:corporationId/edit" element={<EditCorporationPage />} />
        <Route path="/companies" element={<CompaniesDirectoryPage />} />
        <Route path="/companies/add" element={<AddCompanyPage />} />
        <Route path="/companies/:companyId" element={<CompanyConfigPage />} />
        <Route path="/companies/:companyId/edit" element={<CompanyEditPage />} />
        <Route path="/2fa/verify" element={<TwoFactorAuthPage />} />
        <Route path="/2fa/email-preview" element={<EmailVerificationCodeTemplate verificationCode="123456" maskedEmail="ad***@pcsglobal.com" expiryMinutes={10} />} />
        <Route path="/email-verification" element={<EmailVerificationPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/corporations" replace />} />
      </Routes>
      <GlobalToast />
    </BrowserRouter>
  );
}
