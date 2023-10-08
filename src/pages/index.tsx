import { styled } from "@/styles"

import { useKeenSlider } from 'keen-slider/react';

import camiseta1 from '../../public/assets/camisetas/1.png';
import camiseta2 from '../../public/assets/camisetas/2.png';
import camiseta3 from '../../public/assets/camisetas/3.png';
import camiseta4 from '../../public/assets/camisetas/4.png';
import Image from "next/image";

const Container = styled('div', {
  display: 'flex',
  width: '100%',
  maxWidth: 'calc(1180px + ((100vw - 1180px) / 2))',
  marginLeft: 'auto',
  minHeight: 656
});

const Product = styled('a', {
  position: 'relative',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,

  overflow: 'hidden',
  cursor: 'pointer',

  img: {
    objectFit: 'cover'
  },

  footer: {
    position: 'absolute',
    left: '0.25rem',
    bottom: '0.25rem',
    right: '0.25rem',

    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center',

    padding: '2rem',
    background: 'rgba(0,0,0,0.6)',
    borderRadius: 6,

    transform: 'translateY(110%)',
    opacity: 0,
    transition: 'all 0.2s ease-in-out',

    span: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      lineHeight: '1.6'
    },

    strong: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      lineHeight: '1.4',
      color: '$green300'
    }
  },

  '&:hover': {
    footer: {
      transform: 'translateY(0%)',
      opacity: 1,
    }
  }
});

const images = [camiseta1, camiseta2, camiseta3, camiseta4];

export default function Home() {
  const [keenSliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  })

  return (
    <Container ref={keenSliderRef} className="keen-slider">
      {images.map(image => {
        return (
          <Product key={image.src} className="keen-slider__slide" >
            <Image 
              src={image.src}
              width={520}
              height={480}
              alt=""
            />
            <footer>
              <span>
                Camisa do futuro
              </span>
              <strong>
                R$ 79,90
              </strong>
            </footer>
          </Product>
        )
      })}
    </Container>
  )
}
