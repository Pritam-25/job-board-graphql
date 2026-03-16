export const ERRORS = {
  UNAUTHENTICATED: {
    code: 'UNAUTHENTICATED',
    message: 'Authentication required',
  },
  FORBIDDEN: {
    code: 'FORBIDDEN',
    message: 'Admin access required',
  },
} as const;
