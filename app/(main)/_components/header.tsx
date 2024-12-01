'use client';

import React from 'react';
import { Nav } from './nav';
import { Account } from './account';
import Logo from './logo';
import AuthButton from './auth-button';
import { useConvexAuth } from 'convex/react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

type Props = {};

const Header = (props: Props) => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <div className="fixed z-50 flex h-[60px] items-center justify-around w-full shadow-md light:bg-white">
      <Logo />
      <Nav />
      {isLoading ? (
        <Avatar className="animate-pulse bg-violet-200">
          <AvatarImage src="" alt="@shadcn" />
        </Avatar>
      ) : isAuthenticated ? (
        <Account />
      ) : (
        <AuthButton />
      )}
    </div>
  );
};

export default Header;
