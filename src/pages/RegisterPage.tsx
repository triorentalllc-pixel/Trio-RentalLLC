import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import toast from 'react-hot-toast';
import supabase from '@/lib/supabase';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.first_name.trim()) newErrors.first_name = 'First name is required';
    if (!formData.last_name.trim()) newErrors.last_name = 'Last name is required';

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      const { error: signUpError } = await signUp(formData.email, formData.password, {
        first_name: formData.first_name,
        last_name: formData.last_name,
      });

      if (signUpError) {
        setErrors({ submit: signUpError.message });
        return;
      }

      // Wait a moment for auth to process, then create customer profile
      setTimeout(async () => {
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
          await supabase.from('customers').insert({
            id: user.id,
            first_name: formData.first_name,
            last_name: formData.last_name,
            phone: formData.phone || null,
          });
        }
      }, 1000);

      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (err: any) {
      setErrors({ submit: err.message || 'An unexpected error occurred' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl text-navy mb-2">Create Account</h1>
            <p className="text-gray-600">Join Trio Rental for the best car rental experience</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {errors.submit && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{errors.submit}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  value={formData.first_name}
                  onChange={(e) => handleChange('first_name', e.target.value)}
                  error={errors.first_name}
                  required
                />
                <Input
                  label="Last Name"
                  value={formData.last_name}
                  onChange={(e) => handleChange('last_name', e.target.value)}
                  error={errors.last_name}
                  required
                />
              </div>

              <Input
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                error={errors.email}
                required
              />

              <Input
                label="Phone Number"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="(optional)"
              />

              <Input
                label="Password"
                type="password"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                error={errors.password}
                helperText="At least 8 characters"
                required
              />

              <Input
                label="Confirm Password"
                type="password"
                value={formData.confirm_password}
                onChange={(e) => handleChange('confirm_password', e.target.value)}
                error={errors.confirm_password}
                required
              />

              <div className="pt-2">
                <Button type="submit" fullWidth size="lg" isLoading={loading}>
                  Create Account
                </Button>
              </div>
            </form>

            <p className="mt-6 text-center text-gray-600 text-sm">
              By creating an account, you agree to our{' '}
              <Link to="/terms" className="text-gold hover:text-gold-light transition-colors">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-gold hover:text-gold-light transition-colors">
                Privacy Policy
              </Link>
            </p>

            <p className="mt-4 text-center text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-gold hover:text-gold-light font-medium transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
