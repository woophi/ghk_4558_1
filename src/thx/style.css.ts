import { style } from '@vanilla-extract/css';

const container = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0 1rem',
  textAlign: 'center',
});

const box = style({
  marginTop: '9rem',

  width: '80px',
  height: '80px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '24px',
  backgroundColor: '#F3F4F5',
});

export const thxSt = {
  container,
  box,
};
