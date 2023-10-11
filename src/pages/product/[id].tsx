import { stripe } from "@/lib/stripe";
import { ProductContainer, ProductDetail, ProductImage } from "@/styles/pages/product";
import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Stripe from "stripe";

type ProductProps = {
  product: {
    id: string,
    name: string,
    imageUrl: string,
    price: string,
    description: string,
    defaultPriceId: string,
  }
}

export default function Product({ product }: ProductProps) {
  const [isCheckoutIsCreating, setIsCheckoutIsCreating] = useState(false);
  const { isFallback } = useRouter();

  if (isFallback) {
    return <p>Carregando...</p>
  }

  async function handleBuyProduct() {
    setIsCheckoutIsCreating(true);

    try {
      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId
      });

      const { url } = response.data;

      window.location.href = url;
    } catch (err) {
      setIsCheckoutIsCreating(false);
      alert("Ocorreu um erro ao continuar com a compra!");
    }
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

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
          <h3>{product.price}</h3>
          <p>{product.description}</p>
          <button 
            type="button" 
            onClick={handleBuyProduct}
            disabled={isCheckoutIsCreating}
          >
              Comprar agora
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
        price: new Intl.NumberFormat('pt-BR', {
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