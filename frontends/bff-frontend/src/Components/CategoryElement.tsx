import React, { FC } from 'react';

interface TitleProps {
  name: string;
  image: string;
}

const CategoryElement: FC<TitleProps> = ({ name, image }) => {
  return (
    <>
      <h1>{name}</h1>
      <h2>{image}</h2>
    </>
  );
};

export default CategoryElement;