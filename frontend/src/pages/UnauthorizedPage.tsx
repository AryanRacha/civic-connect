import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Shield, ArrowLeft } from 'lucide-react';

const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-0">
        <CardHeader className="text-center space-y-4 pb-8">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl flex items-center justify-center shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold text-gray-900">Access Denied</CardTitle>
            <p className="text-gray-600">
              You don't have permission to access this page. Please contact an administrator if you believe this is an error.
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="text-center">
            <Button
              onClick={() => navigate(-1)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </Button>
          </div>
          
          <div className="text-center text-sm text-gray-600">
            <button 
              onClick={() => navigate('/dashboard')} 
              className="text-blue-600 hover:text-blue-700 font-medium underline"
            >
              Return to Dashboard
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UnauthorizedPage;
