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
  GET_DETAIL_POST: 'Detail post fetched successfully',
  UPDATE_POST: 'Post updated successfully',
  UPDATE_POST_STATUS: 'Post status updated successfully',
  DELETE_POST: 'Post deleted successfully',

  GET_OFFER_LIST: 'Offer list fetched successfully',
  CREATE_OFFER: 'Offer created successfully',
  UPDATE_OFFER: 'Offer updated successfully',
  DELETE_OFFER: 'Offer deleted successfully',

  GET_CITIES_BY_REGION: 'Cities by region fetched successfully',
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
  GET_DETAIL_POST: 'Failed to get detail post',
  UPDATE_POST: 'Failed to update post',
  UPDATE_POST_STATUS: 'Failed to update post status',
  DELETE_POST: 'Failed to delete post',

  GET_OFFER_LIST: 'Failed to get offer list',
  CREATE_OFFER: 'Failed to create offer',
  UPDATE_OFFER: 'Failed to update offer',
  DELETE_OFFER: 'Failed to delete offer',

  GET_CITIES_BY_REGION: 'Failed to get cities by region',
} as const;