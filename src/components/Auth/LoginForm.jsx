import React, { useState, useEffect } from 'react';
import { User, Lock, Eye, EyeOff, Hospital, Shield, Globe, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

const LoginForm = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false,
    branch: 'main'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [language, setLanguage] = useState('en');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTimer, setLockTimer] = useState(0);

  // Demo users for different roles
  const demoUsers = [
    { username: 'admin', password: 'admin123', role: 'Administrator', name: 'Admin User', email: 'admin@rama.com' },
    { username: 'manager', password: 'manager123', role: 'Manager', name: 'Branch Manager', email: 'manager@rama.com' },
    { username: 'pharmacist', password: 'pharma123', role: 'Pharmacist', name: 'Head Pharmacist', email: 'pharmacist@rama.com' },
    { username: 'nurse', password: 'nurse123', role: 'Nurse', name: 'Head Nurse', email: 'nurse@rama.com' }
  ];

  const branches = [
    { id: 'main', name: 'Main Hospital', status: 'active' },
    { id: 'pharmacy', name: 'Pharmacy Branch', status: 'active' },
    { id: 'icu', name: 'ICU Branch', status: 'maintenance' },
    { id: 'emergency', name: 'Emergency Department', status: 'active' }
  ];

  useEffect(() => {
    // Check for remembered username
    const rememberedUsername = localStorage.getItem('rememberedUsername');
    if (rememberedUsername) {
      setFormData(prev => ({ ...prev, username: rememberedUsername, rememberMe: true }));
    }

    // Handle account lockout timer
    if (isLocked && lockTimer > 0) {
      const timer = setTimeout(() => {
        setLockTimer(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isLocked && lockTimer === 0) {
      setIsLocked(false);
      setLoginAttempts(0);
    }
  }, [isLocked, lockTimer]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isLocked) {
      setError(`Account locked. Try again in ${lockTimer} seconds.`);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Find matching user
      const matchedUser = demoUsers.find(
        user => user.username === formData.username && user.password === formData.password
      );

      if (matchedUser) {
        // Successful login
        const selectedBranch = branches.find(b => b.id === formData.branch);
        
        const user = {
          id: Date.now(),
          name: matchedUser.name,
          email: matchedUser.email,
          role: matchedUser.role,
          username: matchedUser.username,
          branch: selectedBranch,
          branches: branches.filter(b => b.status === 'active'),
          loginTime: new Date().toISOString(),
          permissions: getPermissionsByRole(matchedUser.role)
        };
        
        if (formData.rememberMe) {
          localStorage.setItem('rememberedUsername', formData.username);
        } else {
          localStorage.removeItem('rememberedUsername');
        }
        
        // Reset login attempts
        setLoginAttempts(0);
        
        onLogin(user);
      } else {
        // Failed login
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);
        
        if (newAttempts >= 3) {
          setIsLocked(true);
          setLockTimer(30); // 30 seconds lockout
          setError('Too many failed attempts. Account locked for 30 seconds.');
        } else {
          setError(`Invalid credentials. ${3 - newAttempts} attempts remaining.`);
        }
      }
    } catch (err) {
      setError('Login failed. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getPermissionsByRole = (role) => {
    const permissions = {
      'Administrator': ['all'],
      'Manager': ['inventory', 'transfers', 'reports', 'suppliers', 'customers'],
      'Pharmacist': ['inventory', 'transfers', 'expiry'],
      'Nurse': ['inventory', 'transfers']
    };
    return permissions[role] || [];
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  const fillDemoCredentials = (userType) => {
    const user = demoUsers.find(u => u.role.toLowerCase().includes(userType.toLowerCase()));
    if (user) {
      setFormData(prev => ({
        ...prev,
        username: user.username,
        password: user.password
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-emerald-600 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <Card className="w-full max-w-md shadow-2xl relative z-10 backdrop-blur-sm bg-white/95">
        <CardHeader className="text-center pb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <Hospital className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Supply Chain Automation
          </CardTitle>
          <p className="text-gray-600 mt-2">Rama Medical Group</p>
          
          {/* Language Toggle */}
          <div className="flex justify-center mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center gap-2"
            >
              <Globe className="w-4 h-4" />
              {language === 'en' ? 'عربي' : 'English'}
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {isLocked && (
              <Alert>
                <Shield className="w-4 h-4" />
                <AlertDescription>
                  Security lockout active. Please wait {lockTimer} seconds before trying again.
                </AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-4">
              {/* Branch Selection */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Select Branch
                </label>
                <select
                  name="branch"
                  value={formData.branch}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {branches.map(branch => (
                    <option 
                      key={branch.id} 
                      value={branch.id}
                      disabled={branch.status !== 'active'}
                    >
                      {branch.name} {branch.status !== 'active' && '(Maintenance)'}
                    </option>
                  ))}
                </select>
              </div>

              {/* Username */}
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="pl-12 h-12"
                  required
                  disabled={isLocked}
                />
              </div>
              
              {/* Password */}
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-12 pr-12 h-12"
                  required
                  disabled={isLocked}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  disabled={isLocked}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({ ...prev, rememberMe: checked }))
                }
                disabled={isLocked}
              />
              <label htmlFor="rememberMe" className="text-sm text-gray-600">
                Remember me
              </label>
            </div>
            
            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white font-semibold"
              disabled={isLoading || isLocked}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing In...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Sign In
                </div>
              )}
            </Button>
          </form>
          
          {/* Demo Credentials */}
          <div className="mt-6 space-y-3">
            <p className="text-sm font-medium text-gray-700 text-center">Demo Accounts:</p>
            <div className="grid grid-cols-2 gap-2">
              {demoUsers.map((user, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => fillDemoCredentials(user.role)}
                  className="text-xs p-2 h-auto"
                  disabled={isLocked}
                >
                  <div className="text-center">
                    <div className="font-medium">{user.role}</div>
                    <div className="text-gray-500">{user.username}</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Security Features */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                <span>Secure Login</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                <span>Multi-Branch Support</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
