import React, { useMemo, useState } from 'react';

import { debounce } from 'lodash';
import ArticlesList from '@/components/ArticlesList';
import Pagination from '@/components/Pagination';
import { useGetArticlesQuery } from '@/store/features/api/apiApp';
import { MdAssignmentAdd } from 'react-icons/md';
import { FaSort } from 'react-icons/fa';
import CreateArticleForm from '@/components/forms/CreateArticleForm';

const ArticlesManagerScreen = ({ forAdmin }: { forAdmin: boolean }) => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [datePub, setDatePub] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const limit = 4;

  const { data } = useGetArticlesQuery(
    { page, limit, search, datePub },
    { refetchOnMountOrArgChange: true },
  );

  const totalPages = useMemo(() => {
    if (!data?.countOfArticles) {
      return -1;
    } else {
      return Math.ceil(Number(data.countOfArticles) / limit);
    }
  }, [data?.countOfArticles]);

  const handleSearch = debounce((query) => {
    setSearch(query);
  }, 300);

  const handleSort = () => {
    setDatePub(!datePub);
  };
  const displayPopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <>
      {isPopupOpen ? (
        <CreateArticleForm setIsPopupOpen={displayPopup} />
      ) : (
        <>
          <div className={'flex w-full justify-between px-10 pt-10'}>
            <button
              onClick={handleSort}
              className={'text-matrix flex align-middle items-center text-[30px] hover:text-pink'}
            >
              Date publish sort
              <FaSort className={'pt-[2px]'} />
            </button>
            {forAdmin && (
              <button
                className={
                  'text-[40px] text-blue hover:text-white flex justify-center items-center'
                }
                onClick={displayPopup}
              >
                <MdAssignmentAdd className={'pt-[2px]'} />
              </button>
            )}
            <input
              className={'bg-black border-[2px] px-3 py-2 rounded-xl border-matrix text-matrix'}
              type='text'
              placeholder={'Search'}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          {data?.items && <ArticlesList articles={data?.items} forAdmin={forAdmin} />}
          {data?.items && (
            <Pagination totalPages={totalPages} currentPage={page} onPageChange={setPage} />
          )}
        </>
      )}
    </>
  );
};

export default ArticlesManagerScreen;
