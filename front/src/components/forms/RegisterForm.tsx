'use client';
import React from 'react';
import { Field, Form, Formik } from 'formik';
import { authSchema } from '@/helpers/validationFormSchema';
import { useRegisterMutation } from '@/store/features/api/apiApp';

const RegisterForm = () => {
  const [register, { data, error }] = useRegisterMutation();

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='bg-blue-500 flex justify-center flex-col pb-7 max-w-[400px] rounded-xl bg-black border-4 border-solid border-matrix'>
        <div className='flex w-full justify-center items-center py-2 flex-col rounded-t-[6px] text-[24px] font-medium bg-matrix'>
          <p className='text-black'>Register</p>
        </div>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={authSchema}
          onSubmit={async (values, { resetForm }) => {
            await register(values);
            resetForm();
          }}
        >
          {({ errors, touched }) => (
            <Form className='flex flex-col px-14 mt-[20px] bg-black'>
              <Field
                className={`rounded-full py-[5px] px-[10px] text-matrix bg-black border-[2px] font-bold border-matrix border-solid ${
                  touched.email && errors.email && '!border-error'
                }`}
                id='email'
                name='email'
                placeholder='email'
              />
              {errors.email && touched.email ? (
                <span className='text-error'>{errors.email}</span>
              ) : null}
              <Field
                className={`mt-[12px] rounded-full py-[5px] px-[10px] text-matrix bg-black border-[2px] font-bold border-matrix border-solid ${
                  touched.password && errors.password && '!border-error'
                }`}
                id='password'
                name='password'
                placeholder='password'
                type='password'
              />
              {touched.password && errors.password ? (
                <span className='text-error'>{errors.password}</span>
              ) : null}
              <button
                className='flex mt-3 justify-center text-matrix rounded-full border-solid border-[2px] py-2 bg-black font-medium hover:bg-matrix hover:text-black'
                type='submit'
              >
                SUBMIT
              </button>
              {error && <p className={'text-error text-center pt-2'}>This email already exists</p>}
              {data && (
                <p className={'text-yellow text-center pt-2'}>
                  Registration completed successfully
                </p>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterForm;
