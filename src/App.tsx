import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/context/AuthContext';
import Layout from '@/components/layout/Layout';

// Pages
import HomePage from '@/pages/HomePage';
import FleetPage from '@/pages/FleetPage';
import VehicleDetailsPage from '@/pages/VehicleDetailsPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import DashboardPage from '@/pages/DashboardPage';
import CheckoutPage from '@/pages/CheckoutPage';
import ConfirmationPage from '@/pages/ConfirmationPage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import FAQPage from '@/pages/FAQPage';
import AdminDashboardPage from '@/pages/AdminDashboardPage';

// Legal Pages (simple placeholders for now)
function TermsPage() {
  return (
    <Layout>
      <div className="bg-navy py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="font-serif text-4xl text-white">Terms & Conditions</h1>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-12 prose">
        <h2>Rental Agreement</h2>
        <p>By completing a reservation with Trio Rental LLC, you agree to the terms and conditions outlined below...</p>
        <h3>1. Rental Requirements</h3>
        <p>Valid driver's license, credit card in renter's name, minimum age 21...</p>
        <h3>2. Insurance & Liability</h3>
        <p>All vehicles include basic liability coverage. Additional coverage options available...</p>
        <h3>3. Fuel Policy</h3>
        <p>Vehicles provided with full tank. Return with full tank or pay refueling fee...</p>
        <h3>4. Late Returns</h3>
        <p>Late fees apply. 4-hour grace period, then hourly/daily charges...</p>
        <h3>5. Cancellation Policy</h3>
        <p>Free cancellation up to 48 hours before pickup. Within 48 hours, one day rental fee applies...</p>
      </div>
    </Layout>
  );
}

function PrivacyPage() {
  return (
    <Layout>
      <div className="bg-navy py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="font-serif text-4xl text-white">Privacy Policy</h1>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-12 prose">
        <h2>Information We Collect</h2>
        <p>We collect personal information such as name, email, phone number, driver's license information, and payment details...</p>
        <h3>How We Use Your Information</h3>
        <p>To process reservations, provide customer support, send promotional communications (with consent)...</p>
        <h3>Data Security</h3>
        <p>We implement industry-standard security measures to protect your information...</p>
        <h3>Your Rights</h3>
        <p>You have the right to access, correct, or delete your personal information...</p>
      </div>
    </Layout>
  );
}

function ForgotPasswordPage() {
  return (
    <Layout>
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl text-navy mb-2">Reset Password</h1>
            <p className="text-gray-600">Enter your email to receive reset instructions</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <p className="text-center text-gray-600">Password reset functionality available upon request.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#0D1B2E',
              color: '#fff',
            },
            success: {
              style: {
                background: '#10B981',
              },
            },
            error: {
              style: {
                background: '#EF4444',
              },
            },
          }}
        />
        <Routes>
          {/* Public Routes with Layout */}
          <Route element={<Layout><Outlet /></Layout>}>
            <Route path="/" element={<HomePage />} />
            <Route path="/fleet" element={<FleetPage />} />
            <Route path="/vehicles/:id" element={<VehicleDetailsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/checkout/:reservationId" element={<CheckoutPage />} />
            <Route path="/confirmation/:reservationId" element={<ConfirmationPage />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/*" element={<AdminDashboardPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
