import { Button } from '@/components/ui/button';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  SignUpButton,
  SignOutButton,
} from '@clerk/nextjs';
import React from 'react';

type Props = {};

const AuthButton = (props: Props) => {
  return (
    <Button asChild>
      <SignInButton />
    </Button>
  );
};

export default AuthButton;
