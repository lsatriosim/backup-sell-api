export const SUCCESS_MESSAGES = {
  REGISTER_USER: 'User registered successfully',
  LOGIN: 'Login successful',
  LOGOUT: 'User logged out successfully',
  GET_USER: 'User profile fetched successfully',
  GET_LIST_USER: 'Users list fetched successfully',
  UPDATE_USER: 'User updated successfully',
  DELETE_USER: 'User deleted successfully',
  CHECK_AUTH: 'User authentication verified',

  GET_POST_LIST: 'Post list fetched successfully',
  CREATE_POST: 'Post created successfully',
  GET_MY_POST: 'My posts fetched successfully',
  UPDATE_POST: 'Post updated successfully',
  UPDATE_POST_STATUS: 'Post status updated successfully',
  DELETE_POST: 'Post deleted successfully',

  GET_OFFER_LIST: 'Offer list fetched successfully',
  CREATE_OFFER: 'Offer created successfully',
} as const;

export const ERROR_MESSAGES = {
  REGISTER_USER: 'Failed to register user',
  LOGIN: 'Failed to login user',
  LOGOUT: 'Failed to logout',
  GET_USER: 'Failed to get user profile',
  GET_LIST_USER: 'Failed to get users list',
  UPDATE_USER: 'Failed to update user',
  DELETE_USER: 'Failed to delete user',
  UNAUTHORIZED: 'Unauthorized access',

  GET_POST_LIST: 'Failed to get post list',
  CREATE_POST: 'Failed to create post',
  GET_MY_POST: 'Failed to get my posts',
  UPDATE_POST: 'Failed to update post',
  UPDATE_POST_STATUS: 'Failed to update post status',
  DELETE_POST: 'Failed to delete post',

  GET_OFFER_LIST: 'Failed to get offer list',
  CREATE_OFFER: 'Failed to create offer',
} as const;