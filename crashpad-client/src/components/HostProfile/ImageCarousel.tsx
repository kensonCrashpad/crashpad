import React, { useState } from 'react';
import { CardMedia, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import styled from 'styled-components';


const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: auto;
  overflow: hidden;
`;

const ArrowButton = styled(IconButton)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: white;
  z-index: 100;

  &:first-child {
    left: 10px;
  }

  &:last-child {
    right: 10px;
  }
`;

const ImageSlide = styled.div<{ isActive: boolean }>`
  display: ${props => (props.isActive ? 'block' : 'none')};
`;

interface ImageCarouselProps {
  images: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const length = images.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(images) || images.length <= 0) {
    return null;
  }

  return (
    <CarouselContainer>
      <ArrowButton onClick={prevSlide}>
        <ArrowBackIosNewIcon />
      </ArrowButton>
      {images.map((image, index) => (
        <ImageSlide key={index} isActive={index === current}>
          <CardMedia component="img" height="320" image={image} alt={`Property image ${index + 1}`} sx={{ objectFit: 'fill', width: '100%' }}/>
        </ImageSlide>
      ))}
      <ArrowButton onClick={nextSlide}>
        <ArrowForwardIosIcon />
      </ArrowButton>
    </CarouselContainer>
  );
};

export default ImageCarousel;
