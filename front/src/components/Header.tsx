'use client';
import React from 'react';
import Link from 'next/link';
import { pagesPath } from '@/utils/$path';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { logout } from '@/store/features/auth/authSlice';
import { useLogOutCallApiMutation } from '@/store/features/api/apiApp';

const Header = () => {
  const currentPath = usePathname();
  const dispatch = useDispatch();
  const [logOutCallApi] = useLogOutCallApiMutation();
  const { push } = useRouter();

  const handleLogOut = async () => {
    logOutCallApi();
    dispatch(logout());
    push(pagesPath.auth.$url().pathname);
  };

  const DynamicLinks = () => (
    <div>
      {currentPath === pagesPath.auth.$url().pathname && (
        <Link
          className={'hover:text-purple text-matrix'}
          href={pagesPath.auth.register.$url().pathname}
        >
          Register
        </Link>
      )}
      {currentPath === pagesPath.admin.$url().pathname && (
        <button className={'text-matrix'} type={'submit'} onClick={handleLogOut}>
          LogOut
        </button>
      )}
      {currentPath === pagesPath.auth.register.$url().pathname && (
        <Link className={'text-matrix hover:text-purple'} href={pagesPath.auth.$url().pathname}>
          Sign In
        </Link>
      )}
      {currentPath === pagesPath.$url().pathname && (
        <Link className={'text-matrix hover:text-purple'} href={pagesPath.auth.$url().pathname}>
          Sign In
        </Link>
      )}
    </div>
  );

  return (
    <header
      className={
        'flex px-10 py-5 text-4xl text-white border-matrix border-b-[4px] border-solid justify-between'
      }
    >
      <div className={'flex gap-x-6'}>
        <Link className={'hover:text-purple text-matrix'} href={pagesPath.$url().pathname}>
          Home
        </Link>
        <Link className={'hover:text-purple text-matrix'} href={pagesPath.admin.$url().pathname}>
          Admin Panel
        </Link>
      </div>
      <DynamicLinks />
    </header>
  );
};

export default Header;
