import { styled } from "@stitches/react";

export const HeaderContainer = styled('div', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',

  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
});

export const HandBagButton = styled('div', {
  backgroundColor: '$gray800',
  borderRadius: 6,
  border: 'none',
  padding: '0.75rem',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  color: '$gray300',

  cursor: 'pointer',
  transition: 'color 0.2s',

  position: 'relative',

  '&:hover': {
    backgroundColor: '$gray700',
  }
});

export const HandBagAmount = styled('div', {
  position: 'absolute',

  top: 'calc(-1.5rem / 2)',
  right: 'calc(-1.5rem / 2)',

  width: '1.5rem',
  height: '1.5rem',
  borderRadius: '1.5rem',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  backgroundColor: '$green500',
});