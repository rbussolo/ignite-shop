import { GetStaticProps } from "next";
import Image from "next/image";

import { styled } from "@/styles"
import { useKeenSlider } from 'keen-slider/react';

import { stripe } from "@/lib/stripe";
import Stripe from "stripe";


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

type HomeProps = {
  products: {
    id: string,
    name: string,
    imageUrl: string,
    price: number
  }[]
}

export default function Home({ products }: HomeProps) {
  const [keenSliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  })

  return (
    <Container ref={keenSliderRef} className="keen-slider">
      {products.map(product => {
        return (
          <Product key={product.id} className="keen-slider__slide" >
            <Image 
              src={product.imageUrl}
              width={520}
              height={480}
              alt=""
            />
            <footer>
              <span>
                {product.name}
              </span>
              <strong>
                {product.price}
              </strong>
            </footer>
          </Product>
        )
      })}
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  });

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(price.unit_amount! / 100)
    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2
  }
}
