export default () => ({
  secret: process.env.JWT_SECRET,
  DB_HOST: process.env.DB_HOST,
});
