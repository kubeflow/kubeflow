const matchMedia = require('../src');

test('Should match max-height if valid', () => {
  const result = matchMedia(
    { '@media max-height: 700': { color: 'green' } },
    { height: 100 },
  );

  expect(result).toEqual({ color: 'green' });
});

test('Should not match max-height if invalid', () => {
  const result = matchMedia(
    { '@media max-height: 700': { color: 'green' } },
    { height: 800 },
  );

  expect(result).toEqual({});
});

test('Should match min-height if valid', () => {
  const result = matchMedia(
    { '@media min-height: 700': { color: 'green' } },
    { height: 800 },
  );

  expect(result).toEqual({ color: 'green' });
});

test('Should not match min-height if invalid', () => {
  const result = matchMedia(
    { '@media min-height: 700': { color: 'green' } },
    { height: 100 },
  );

  expect(result).toEqual({});
});

test('Should match max-width if valid', () => {
  const result = matchMedia(
    { '@media max-width: 700': { color: 'green' } },
    { width: 100 },
  );

  expect(result).toEqual({ color: 'green' });
});

test('Should not match max-width if invalid', () => {
  const result = matchMedia(
    { '@media max-width: 700': { color: 'green' } },
    { width: 800 },
  );

  expect(result).toEqual({});
});

test('Should match min-width if valid', () => {
  const result = matchMedia(
    { '@media min-width: 700': { color: 'green' } },
    { width: 800 },
  );

  expect(result).toEqual({ color: 'green' });
});

test('Should not match min-width if invalid', () => {
  const result = matchMedia(
    { '@media min-width: 700': { color: 'green' } },
    { width: 100 },
  );

  expect(result).toEqual({});
});

test('Should match orientation if valid', () => {
  const result = matchMedia(
    { '@media orientation: landscape': { color: 'green' } },
    { orientation: 'landscape' },
  );

  expect(result).toEqual({ color: 'green' });
});

test('Should not match orientation if invalid', () => {
  const result = matchMedia(
    { '@media orientation: landscape': { color: 'green' } },
    { orientation: 'portrait' },
  );

  expect(result).toEqual({});
});

test('Should match and operator if valid', () => {
  const result = matchMedia(
    {
      '@media (max-height: 700) and (orientation: landscape)': {
        color: 'green',
      },
    },
    { height: 100, orientation: 'landscape' },
  );

  expect(result).toEqual({ color: 'green' });
});

test('Should not match and operator if invalid', () => {
  const result = matchMedia(
    {
      '@media (max-height: 700) and (orientation: landscape)': {
        color: 'green',
      },
    },
    { height: 800, orientation: 'landscape' },
  );

  expect(result).toEqual({});
});

test('Should match or operator if valid', () => {
  const result = matchMedia(
    {
      '@media (max-height: 700), (orientation: landscape)': { color: 'green' },
    },
    { orientation: 'landscape' },
  );

  expect(result).toEqual({ color: 'green' });
});

test('Should not match or operator if invalid', () => {
  const result = matchMedia(
    {
      '@media (max-height: 700), (orientation: landscape)': { color: 'green' },
    },
    { orientation: 'portrait', height: 800 },
  );

  expect(result).toEqual({});
});

test('Should match several queries', () => {
  const result = matchMedia(
    {
      '@media min-height: 700': { cursor: 'pointer' },
      '@media max-height: 700': { color: 'green' },
      '@media orientation: landscape': { background: 'red' },
    },
    { height: 100, orientation: 'landscape' },
  );

  expect(result).toEqual({ color: 'green', background: 'red' });
});
