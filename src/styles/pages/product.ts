import { styled } from "..";

export const ProductContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  alignItems: 'stretch',
  gap: '4.5rem',

  maxWidth: 1180,
  margin: '0 auto'
});

export const ProductImage = styled('div', {
  width: '100%',
  maxWidth: 576,
  height: 'calc(656px - 0.5rem)',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  padding: '0.25rem',

  img: {
    objectFit: 'cover'
  }
});

export const ProductDetail = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',

  h2: {
    fontSize: '2rem',
    fontWeight: 'bold',
    lineHeight: '1.4',
    color: '$gray300'
  },

  h3: {
    fontSize: '2rem',
    lineHeight: '1.4',
    color: '$green300'
  },

  p: {
    marginTop: '2.5rem',
    fontSize: '1.125rem',
    lineHeight: '1.6',
    color: '$gray300'
  },

  button: {
    border: 'none',
    borderRadius: 8,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    width: '100%',

    marginTop: 'auto',
    paddingTop: '1.25rem',
    paddingBottom: '1.25rem',

    color: '$white',
    backgroundColor: '$green500',
    cursor: 'pointer',

    transition: 'background-color 0.2s',

    fontSize: '1.125rem',
    fontWeight: 'bold',
    lineHeight: '1.6',

    '&:disabled': {
      opacity: '0.6',
      cursor: 'not-allowed'
    },

    '&:not(disabled):hover': {
      backgroundColor: '$green300',
    }
  }
});