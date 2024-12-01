import React from 'react';
import Header from './_components/header';

type Props = {
  children: React.ReactNode;
};

const LayoutMain = ({ children }: Props) => {
  return (
    <div className="w-full flex flex-col items-center">
      <Header />
      <div className="mt-[60px]">{children}</div>
    </div>
  );
};

export default LayoutMain;
