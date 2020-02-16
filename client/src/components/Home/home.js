import React from 'react';
import { Container } from '@material-ui/core';
import CategoryList from '../Category-list/category-list';
import MainSlider from './Main-carousel/main-carousel'

import Carousels from '../Carousel/carousel';

export default function Home() {
  return (
    <>
      <MainSlider />
      <Container maxWidth="xl">
        <CategoryList />
        <Carousels
          autoPlay
          autoplayInterval={2000}
          wrapAround
          slideIndex={0}
          slidesToShow={1}
        />
      </Container>
    </>
  );
}
