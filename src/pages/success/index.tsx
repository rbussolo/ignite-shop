import { stripe } from "@/lib/stripe";
import { styled } from "@/styles"
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";

const SuccessContainer = styled('main', {
  maxWidth: 590,
  margin: '0 auto',
  height: 656,

  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
  textAlign: 'center',

  flexDirection: 'column',
  gap: '2rem',
  
  h1: {
    fontSize: '2rem',
    lineHeight: '1.4',
    fontWeight: 'bold'
  },

  p: {
    fontSize: '1.5rem',
    lineHeight: '1.4',
  },

  a: {
    fontSize: '1.25rem',
    color: '$green500',
    textDecoration: 'none',
    marginTop: '5.5rem',

    '&:hover': {
      color: '$green300'
    }
  }
});

const ImageContainer = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  height: 145,
  width: 127,
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: '4rem',

  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  padding: '0.25rem',

  img: {
    objectFit: 'cover'
  }
})

type SuccessProps = {
  customerName: string,
  product: {
    name: string,
    imageUrl: string
  }
}

export default function Success({ customerName, product }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <h1>Compra efetuada!</h1>

        <ImageContainer>
          <Image 
            alt="" 
            src={product.imageUrl}
            height={106}
            width={114}
          />
        </ImageContainer>

        <p>Uhuul <strong>{ customerName }</strong>, sua <strong>{ product.name }</strong> já está a caminho da sua casa. </p>

        <Link href={'/'}>Volar ao catálogo</Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const sessionId = String(query.session_id);

  const response = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  });

  const customerName = response.customer_details?.name;
  const product = response.line_items!.data[0].price?.product as Stripe.Product;
  
  return {
    props: {
      customerName,
      product: {
        name: product.name,
        imageUrl: product.images[0]
      }
    }
  }
}