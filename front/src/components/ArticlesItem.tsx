'use client';
import React from 'react';
import Link from 'next/link';
import { Article } from '@/types';
import moment from 'moment';
import { MdDelete } from 'react-icons/md';
import { AiFillEdit } from 'react-icons/ai';
import { useDeleteArticleByIdMutation } from '@/store/features/api/apiApp';
import { useRouter } from 'next/navigation';

type ArticlesItemProp = {
  article: Article;
  forAdmin: boolean;
  forUpdate?: boolean;
};

const ArticlesItem = (articleItem: ArticlesItemProp) => {
  const [deleteArticleById] = useDeleteArticleByIdMutation();
  const date = moment(articleItem.article.pubDate).format('DD.MM.YYYY');
  const router = useRouter();

  const handleDelete = () => {
    deleteArticleById({ id: articleItem.article.id });
  };
  const handleChangeArticle = () => {
    router.push(`admin/articles/${articleItem.article.id}`);
  };

  return (
    <div
      className={`hover:border-solid ${articleItem.forUpdate ? '' : 'hover:border-matrix hover:border-[2px]'} px-[5px]`}
    >
      <div className={'flex justify-between'}>
        <div className={'flex flex-col align-middle'}>
          <Link
            className={'text-white font-bold  fit-text max-w-[80%]'}
            href={articleItem.article.link}
          >
            <div className={'flex items-center font-bold'}>
              <p className={'text-purple pr-9 font-bold break-normal'}>Title:</p>
              {articleItem.article.title}
            </div>
            <div className={'flex font-normal '}>
              <span className={'text-gray pr-3 break-normal'}>Content:</span>
              <p>{articleItem.article.content}</p>

            </div>
          </Link>
          <p className={'text-yellow w-full flex-row'}>Published: {date}</p>
        </div>
        {articleItem.forAdmin && (
          <div className={'min-w-[10%] px-2 flex justify-between'}>
            <button onClick={handleDelete}>
              <MdDelete className={'text-[40px] text-error hover:text-white'} />
            </button>
            <button onClick={handleChangeArticle}>
              <AiFillEdit className={'text-[40px] text-purple hover:text-white'} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticlesItem;
