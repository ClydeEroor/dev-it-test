'use client';
import React, { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectCurrentUser } from '@/store/features/auth/authSlice';
import {
  useCheckAuthMutation,
  useLogOutCallApiMutation,
  useUpdateAccessTokenMutation,
} from '@/store/features/api/apiApp';
import { useRouter } from 'next/navigation';
import ArticlesManagerScreen from '@/components/ArticlesManagerScreen';
import { pagesPath } from '@/utils/$path';

const Admin = () => {
  const router = useRouter();
  const [checkAuth] = useCheckAuthMutation();
  const [logOutCallApi] = useLogOutCallApiMutation();
  const [updateAccessToken] = useUpdateAccessTokenMutation();

  const user = useSelector(selectCurrentUser);
  const [auth, setAuth] = useState(false);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const handleCheckIsAuth = async () => {
      try {
        await checkAuth().unwrap();
        setAuth(true);
      } catch (error) {
        try {
          await updateAccessToken().unwrap();
          const secondCheck = await checkAuth().unwrap();
          if (!secondCheck || secondCheck) {
            await updateAccessToken().unwrap();
          }
          setAuth(true);
        } catch (error) {
          logOutCallApi();
          dispatch(logout());
          router.push(pagesPath.auth.$url().pathname);
        }
      }
    };
    handleCheckIsAuth();
  }, []);

  return (
    auth && (
      <>
        <p className={'text-white text-right text-[30px] px-10 pt-5'}>Admin: {user?.email}</p>
        <ArticlesManagerScreen forAdmin={true} />
      </>
    )
  );
};

export default Admin;
