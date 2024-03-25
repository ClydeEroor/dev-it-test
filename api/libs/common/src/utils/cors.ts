import * as process from 'process';

export const corsOrigin = {
  origin: `${process.env.CLIENT_URL || 'http://localhost:3000'}`,
  credentials: true,
  optionSuccessStatus: 200,
};
