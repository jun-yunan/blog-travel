import Link from 'next/link';
import React from 'react';

type Props = {};

const Logo = (props: Props) => {
  return (
    <Link href="/dashboard">
      <p className="text-base font-semibold">NAKIET</p>
    </Link>
  );
};

export default Logo;
