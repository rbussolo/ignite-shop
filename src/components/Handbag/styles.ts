import { styled } from "@/styles";

export const Container = styled('div', {
  backgroundColor: '$gray800',

  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,

  width: '30rem',
  overflow: 'hidden',

  display: 'flex',
  flexDirection: 'column',
  zIndex: 999,

  transition: 'all 0.5s',

  '&.isClosed': {
    right: '-30rem'
  }
});

export const CloseContainer = styled('div', {
  display: 'flex',
  justifyContent: 'flex-end',
  padding: '1.5rem',
  color: '$gray300',

  svg: {
    cursor: 'pointer',
    transition: 'color 0.2s',

    '&:hover': {
      color: '$gray100'
    }
  }
});

export const HandbagContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: '3rem',
  paddingRight: '3rem',
  paddingBottom: '3rem',

  flexGrow: 1,

  h3: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    lineHeight: '1.6'
  }
});

export const ProductContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  marginTop: '2rem'
});

export const ProductContent = styled('div', {
  display: 'flex',
  gap: '1.25rem'
})

export const ProductImage = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  borderRadius: 8,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',

  img: {
    objectFit: 'cover'
  }
})

export const ProductDetail = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  span: {
    fontSize: '1.125rem',
    lineHeight: '1.6'
  },

  button: {
    border: 'none',
    backgroundColor: 'transparent',

    fontSize: '1rem',
    fontWeight: 'bold',
    color: '$green500',

    width: 'fit-content',
    marginTop: 'auto',

    cursor: 'pointer',
    transition: 'color 0.2s',

    '&:hover': {
      color: '$green300',
    }
  }
});

export const SummaryAmount = styled('div', {
  marginTop: 'auto',

  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  fontSize: '1rem',
  lineHeight: '1.6',

  'span:last-child': {
    fontSize: '1.125rem'
  }
});

export const SummaryPrice = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  fontSize: '1.125rem',
  fontWeight: 'bold',
  lineHeight: '1.6',

  'span:last-child': {
    fontSize: '1.5rem',
  }
});

export const BuyButton = styled('button', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  padding: '1.25rem',
  marginTop: '3.5rem',
  fontSize: '1.25rem',
  fontWeight: 'bold',
  color: '$white',

  border: 'none',
  borderRadius: 8,

  backgroundColor: '$green500',

  cursor: 'pointer',
  transition: 'background-color 0.2s',

  '&:hover': {
    backgroundColor: '$green300',
  }
});