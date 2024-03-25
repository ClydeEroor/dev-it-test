'use client';
import React from 'react';
import ArticlesItem from '@/components/ArticlesItem';
import { Article } from '@/types';

type ArticlesListProp = {
  articles: Article[] | [];
  forAdmin: boolean;
};

const ArticlesList = (articlesList: ArticlesListProp) => {
  return (
    <div className={'flex text-wrap flex-col gap-y-2 p-10'}>
      {articlesList.articles.map((elem, idx) => (
        <ArticlesItem
          key={`vacation-item-${idx}`}
          article={elem}
          forAdmin={articlesList.forAdmin}
        />
      ))}
    </div>
  );
};

export default ArticlesList;
