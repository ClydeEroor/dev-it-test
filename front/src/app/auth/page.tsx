import React, { Suspense } from 'react';
import AuthForm from '@/components/forms/AuthForm';

const Auth = () => {
  return (
    <div className={'mx-0 my-auto'}>
      <Suspense>
        <AuthForm />
      </Suspense>
    </div>
  );
};

export default Auth;
