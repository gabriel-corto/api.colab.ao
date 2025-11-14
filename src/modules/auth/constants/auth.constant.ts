export const JWT_CONFIG = {
  ACCESS: {
    expiresIn: '1m',
    //maxAge: 5 * 60 * 1000,
  },
  REFRESH: {
    expiresIn: '1d',
    maxAge: 24 * 60 * 60 * 1000,
  },
} as const
