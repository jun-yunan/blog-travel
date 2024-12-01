import React from 'react';

type Props = {
  children: React.ReactNode;
};

const LayoutAuth = ({ children }: Props) => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      {children}
    </div>
  );
};

export default LayoutAuth;
