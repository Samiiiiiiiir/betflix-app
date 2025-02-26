import React from 'react';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Link, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router';
import Slider from 'react-slick';

import useMoviesQuery from '../../../hooks/useMoviesQuery';
import ErrorMessage from '../../ui/ErrorMessage/ErrorMessage';
import MoviesSkeleton from './MoviesSkeleton';

export const Movies = () => {
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const {
    isLoading,
    hasError,
    responsePopular,
    responseBest,
    responseFilms,
    responseSerials,
    responseCartoons,
  } = useMoviesQuery();

  if (isLoading) return <MoviesSkeleton />;

  if (hasError) return <ErrorMessage />;

  const serializeDataForCarousel = (data) => {
    return data.map((item) => {
      console.log(item);

      return (
        <div key={item.kinopoiskId}>
          <RouterLink to={`/movies/${item.kinopoiskId}`}>
            <img src={item.posterUrlPreview} alt={item.nameRu} height={400} />
          </RouterLink>
        </div>
      );
    });
  };

  const carouselArr = [
    {
      title: 'Популярные фильмы',
      url: '/popular',
      data: serializeDataForCarousel(responsePopular.data.items),
    },
    {
      title: 'Лучшие фильмы',
      url: '/best',
      data: serializeDataForCarousel(responseBest.data.items),
    },
    {
      title: 'Фильмы',
      url: '/films',
      data: serializeDataForCarousel(responseFilms.data.items),
    },
    {
      title: 'Сериалы',
      url: '/serials',
      data: serializeDataForCarousel(responseSerials.data.items),
    },
    {
      title: 'Мультфильмы',
      url: '/cartoons',
      data: serializeDataForCarousel(responseCartoons.data.items),
    },
  ];

  return (
    <div>
      {/* </Swiper> */}
      {carouselArr.map((item) => (
        <Stack key={item.url}>
          <Link
            component={RouterLink}
            to={item.url}
            variant="h6"
            alignSelf="start"
            sx={{ marginBlock: '10px' }}
          >
            {item.title}
          </Link>
          <Slider {...settings}>{item.data}</Slider>
        </Stack>
      ))}
    </div>
  );
};
