import { Header } from "@/components/Header";
import { ShoppingContext } from "@/context/ShoppingContext";
import { stripe } from "@/lib/stripe";
import { ProductContainer, ProductDetail, ProductImage } from "@/styles/pages/product";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useContext, useState } from "react";
import Stripe from "stripe";

type ProductProps = {
  product: {
    id: string,
    name: string,
    imageUrl: string,
    price: number,
    priceFormatted: string,
    description: string,
    defaultPriceId: string,
  }
}

export default function Product({ product }: ProductProps) {
  const { addProduct } = useContext(ShoppingContext);
  
  if (!product) return <></>

  function handleBuyProduct() {
    addProduct(product, 1);
  }

  return (
    <>
      <Head>
        <title>{`${product.name} | Ignite Shop`}</title>
      </Head>

      <Header />

      <ProductContainer>
        <ProductImage>
          <Image 
            alt=""
            src={product.imageUrl}
            width={520}
            height={480}
          />
        </ProductImage>
        <ProductDetail>
          <h2>{product.name}</h2>
          <h3>{product.priceFormatted}</h3>
          <p>{product.description}</p>
          <button 
            type="button" 
            onClick={handleBuyProduct}
          >
              Colocar na sacola
          </button>
        </ProductDetail>
      </ProductContainer>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params!.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  });
  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: price.unit_amount! / 100,
        priceFormatted: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(price.unit_amount! / 100),
        description: product.description,
        defaultPriceId: price.id
      }
    },
    revalidate: 60 * 60 * 1 // 1 Hora
  }
}