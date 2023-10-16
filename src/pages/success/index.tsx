import { stripe } from "@/lib/stripe";
import { styled } from "@/styles"
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";

import logoImg from '../../../public/assets/logo.svg';

const HeaderContainer = styled('div', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});

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
    fontWeight: 'bold',
    color: '$green500',
    textDecoration: 'none',
    marginTop: '5.5rem',

    '&:hover': {
      color: '$green300'
    }
  }
});

const ImageList = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: '4rem',
})

const ImageContainer = styled('div', {
  height: 145,
  width: 95,

  div: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    width: 145,
    height: 145,

    marginLeft: 'calc((95px - 145px) / 2)',

    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
    borderRadius: 250,

    filter: 'drop-shadow(0px 0px 10px #000000)',

    img: {
      objectFit: 'cover'
    }
  }
})

type SuccessProps = {
  customerName: string,
  products: {
    name: string;
    amount: number;
    imageUrl: string;
  }[]
}

export default function Success({ customerName, products }: SuccessProps) {
  if (!products) return <></>;

  const amount = products.reduce((acc, cur) => acc + cur.amount, 0);

  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>

      <HeaderContainer>
        <Image src={logoImg.src} width={130} height={52} alt="" />
      </HeaderContainer>

      <SuccessContainer>
        <ImageList>
          {products.map(product => {
            return (
              <ImageContainer key={product.name}>
                <div>
                  <Image
                    
                    alt=""
                    src={product.imageUrl}
                    height={140}
                    width={130}
                  />
                </div>
              </ImageContainer>
            )
          })}
        </ImageList>

        <h1>Compra efetuada!</h1>

        <p>Uhuul <strong>{customerName}</strong>, sua compra de { amount } camisetas já está a caminho da sua casa. </p>

        <Link href={'/'}>Voltar ao catálogo</Link>
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
  const products = response.line_items!.data.map(item => {
    const product = item.price?.product as Stripe.Product;

    return {
      name: product.name,
      amount: item.quantity,
      imageUrl: product.images[0]
    }
  })
  
  return {
    props: {
      customerName,
      products: products
    }
  }
}