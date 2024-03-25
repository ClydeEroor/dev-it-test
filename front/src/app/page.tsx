'use client';
import React from 'react';
import ArticlesManagerScreen from '@/components/ArticlesManagerScreen';

const Articles = () => {
  return (
    <>
      <ArticlesManagerScreen forAdmin={false} />
    </>
  );
};

export default Articles;
