import { ReactNode } from 'react';

const Typography1 = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <h1
      className={`scroll-m-20 text-4xl font-extrabold tracking-tight text-balance mb-3 ${className}`}
    >
      {children}
    </h1>
  );
};

export default Typography1;
