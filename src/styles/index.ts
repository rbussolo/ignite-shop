import { createStitches } from "@stitches/react";

export const { 
  config,
  css,
  globalCss,
  styled,
  keyframes,
  getCssText,
  theme,
  createTheme
 } = createStitches({
  theme: {
    colors: {
      white: '#FFF',

      gray900: '#121214',
      gray800: '#202024',
      gray700: '#25252b',
      gray300: '#c4c4cc',
      gray100: '#e1e1e6',

      green500: '#00875f',
      green300: '#00b37e',
    }
  }
});

export const Container = styled('div', {
  display: 'flex',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',
  overflowX: 'hidden',
  minHeight: 656
});

export const Product = styled('div', {
  position: 'relative',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',

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
  },

  '&:hover': {
    footer: {
      transform: 'translateY(0%)',
      opacity: 1,
    }
  }
});

export const ProductFooterDetail = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  span: {
    color: '$gray100',
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
})

export const ProductFooterCart = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
})

export const HandBagButton = styled('button', {
  backgroundColor: '$green500',
  borderRadius: 6,
  border: 'none',
  padding: '0.75rem',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  cursor: 'pointer',
  color: '$white',

  '&:hover': {
    backgroundColor: '$green300',
  }
})

