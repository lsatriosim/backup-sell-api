export const SUCCESS_MESSAGES = {
  REGISTER_USER: 'User registered successfully',
  LOGIN: 'Login successful',
  LOGOUT: 'User logged out successfully',
  GET_USER: 'User profile fetched successfully',
  GET_LIST_USER: 'Users list fetched successfully',
  UPDATE_USER: 'User updated successfully',
  DELETE_USER: 'User deleted successfully',
  CHECK_AUTH: 'User authentication verified',
} as const;

export const ERROR_MESSAGES = {
  REGISTER_USER: 'Failed to register user',
  LOGIN: 'Failed to login user',
  GET_USER: 'Failed to get user profile',
  GET_LIST_USER: 'Failed to get users list',
  UPDATE_USER: 'Failed to update user',
  DELETE_USER: 'Failed to delete user',
  UNAUTHORIZED: 'Unauthorized access',
} as const;