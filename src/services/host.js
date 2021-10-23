const host = process.env.NODE_ENV === 'development'
  ? 'http://localhost:7777'
  : '';

export default host;
