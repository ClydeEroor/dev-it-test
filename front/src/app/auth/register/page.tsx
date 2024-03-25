import React, { Suspense } from 'react';
import RegisterForm from '@/components/forms/RegisterForm';

const Register = () => {
  return (
    <div className={'mx-0 my-auto'}>
      <Suspense>
        <RegisterForm />
      </Suspense>
    </div>
  );
};

export default Register;
