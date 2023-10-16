import { GetStaticProps } from "next";
import Image from "next/image";

import { useKeenSlider } from 'keen-slider/react';

import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import Link from "next/link";
import Head from "next/head";
import { Header } from "@/components/Header";
import { Handbag } from "@phosphor-icons/react";
import { ShoppingContext } from "@/context/ShoppingContext";
import { useContext } from "react";
import { Container, HandBagButton, Product, ProductFooterCart, ProductFooterDetail } from "@/styles";

type Product = {
  id: string,
  name: string,
  imageUrl: string,
  price: number,
  priceFormatted: string,
  defaultPriceId: string,
}

type HomeProps = {
  products: Product[]
}

export default function Home({ products }: HomeProps) {
  const [keenSliderRef] = useKeenSlider({
    slides: {
      perView: 2,
      spacing: 48
    }
  });

  const { addProduct } = useContext(ShoppingContext);

  function handleAddProduct(event: React.MouseEvent<HTMLElement>, product: Product) {
    event.preventDefault();

    addProduct(product, 1);
  }

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <Header />

      <Container ref={keenSliderRef} className="keen-slider">
        {products.map(product => {
          return (
            <Link href={`/product/${product.id}`} key={product.id} prefetch={false}>
              <Product className="keen-slider__slide" >
                <Image 
                  src={product.imageUrl}
                  width={520}
                  height={480}
                  alt=""
                />
                <footer>
                  <ProductFooterDetail>
                    <span>
                      {product.name}
                    </span>
                    <strong>
                      {product.priceFormatted}
                    </strong>
                  </ProductFooterDetail>
                  <ProductFooterCart>
                    <HandBagButton type="button" onClick={(event) => handleAddProduct(event, product)}>
                      <Handbag weight="bold" size={32} />
                    </HandBagButton>
                  </ProductFooterCart>
                </footer>
              </Product>
            </Link>
          )
        })}
      </Container>
    </>
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
      price: price.unit_amount! / 100,
      priceFormatted: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(price.unit_amount! / 100),
      defaultPriceId: price.id
    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2
  }
}
