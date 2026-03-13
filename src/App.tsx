import { Routes, Route } from 'react-router-dom'
import { CompanyDirectoryViewDetails } from '@/pages/CompanyDirectoryViewDetails'

function App() {
  return (
    <Routes>
      <Route path="/" element={<CompanyDirectoryViewDetails />} />
      <Route path="/company-directory/:companyId" element={<CompanyDirectoryViewDetails />} />
    </Routes>
  )
}

export default App
