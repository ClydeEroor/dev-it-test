'use client';
import React from 'react';
import { useGetArticleByIdQuery, useUpdateArticlesMutation } from '@/store/features/api/apiApp';
import { Field, Form, Formik } from 'formik';
import { createOrUpdateArticleSchema } from '@/helpers/validationFormSchema';
import ArticlesItem from '@/components/ArticlesItem';
import { useRouter } from 'next/navigation';

import { IoMdArrowRoundBack } from 'react-icons/io';
import { pagesPath } from '@/utils/$path';

type ArticleByIdProp = {
  params: { id: string };
  searchParams: NonNullable<unknown>;
};

const ArticleByIdItem = (prop: ArticleByIdProp) => {
  const router = useRouter();
  const { id } = prop.params;
  const {data} = useGetArticleByIdQuery(id);
  const [updateArticles, { error, isSuccess }] = useUpdateArticlesMutation();

  const adminRedirect = () => {
    router.push(pagesPath.admin.$url().pathname);
  };

  return (
    <>
      {data ? (
        <>
          <div className={"flex"}>
            <ArticlesItem forUpdate={true} article={data} forAdmin={false} />
          </div>
          <div className='w-full h-full flex justify-center items-center mx-0 my-auto'>
            <div className='bg-blue-500 flex justify-center flex-col pb-7 min-w-[600px] rounded-xl bg-black border-4 border-solid border-matrix'>
              <div className='flex w-full items-center py-2 px-12 rounded-t-[6px] text-[24px] font-medium bg-matrix'>
                <button onClick={adminRedirect}>
                  <IoMdArrowRoundBack className={'text-[50px] text-black hover:text-white'} />
                </button>
                <p className='text-black text-center w-full pr-10'>UpdateArticle</p>
              </div>
              <Formik
                initialValues={{
                  id: data.id,
                  title: '',
                  link: '',
                  content: '',
                  videoLink: '',
                }}
                validationSchema={createOrUpdateArticleSchema}
                onSubmit={async (values, { resetForm }) => {
                  updateArticles(values);
                  resetForm();
                }}
              >
                {({ errors, touched }) => (
                  <Form className='flex flex-col px-14 mt-[20px] bg-black'>
                    <Field
                      className={`rounded-full py-[5px] px-[10px] text-matrix bg-black border-[2px] font-bold border-matrix border-solid ${
                        touched.title && errors.title && '!border-error'
                      }`}
                      id='title'
                      name='title'
                      placeholder='title'
                    />
                    {errors.title && touched.title ? (
                      <span className='text-error'>{errors.title}</span>
                    ) : null}
                    <Field
                      className={`mt-[12px] rounded-full py-[5px] px-[10px] text-matrix bg-black border-[2px] font-bold border-matrix border-solid ${
                        touched.link && errors.link && '!border-error'
                      }`}
                      id='link'
                      name='link'
                      placeholder='link'
                      type='link'
                    />
                    {touched.link && errors.link ? (
                      <span className='text-error'>{errors.link}</span>
                    ) : null}
                    <Field
                      className={`mt-[12px]  py-[5px] px-[10px] max-h-[250px] min-h-[250px] text-matrix bg-black border-[2px] font-bold border-matrix border-solid ${
                        touched.content && errors.content && '!border-error'
                      }`}
                      as={'textarea'}
                      id='content'
                      name='content'
                      placeholder='content'
                      type='content'
                    />
                    {touched.content && errors.content ? (
                      <span className='text-error'>{errors.content}</span>
                    ) : null}
                    <Field
                      className={`mt-[12px]  py-[5px] px-[10px] text-matrix bg-black border-[2px] font-bold border-matrix border-solid ${
                        touched.videoLink && errors.videoLink && '!border-error'
                      }`}
                      id='videoLink'
                      name='videoLink'
                      placeholder='videoLink'
                      type='videoLink'
                    />
                    {touched.videoLink && errors.videoLink ? (
                      <span className='text-error'>{errors.videoLink}</span>
                    ) : null}
                    <button
                      className='flex mt-3 justify-center text-matrix rounded-full border-solid border-[2px] py-2 bg-black font-medium hover:bg-matrix hover:text-black'
                      type='submit'
                    >
                      SUBMIT
                    </button>
                    {error && <p className={'text-error text-center pt-2'}>Something went wrong</p>}
                    {isSuccess && (
                      <p className={'text-yellow text-center pt-2'}>Article update successfully</p>
                    )}
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </>
      ) : (
        <>
          <p className={'text-matrix text-[36px] mx-auto my-auto'}>Article Not Found 404</p>
        </>
      )}
    </>
  );
};

export default ArticleByIdItem;
