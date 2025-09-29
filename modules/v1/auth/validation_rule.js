export const validatorRules = {
  signupValidation: {
    name: "required|string",
    email: "required|email",
    phone: "required|string|min:8",
    password: "required|string|min:6",
    role: "required|string|in:user,chef",
    social_id: "required|string",
  },
  loginValidation: {
    // For normal login
    email: "email",
    password: "string|min:6",

    // For social login
    login_type: "string|in:n,f,t,a", // N=Normal, F=Facebook, T=Twitter, A=Apple
    social_id: "string",
  },
  forgotPasswordValidation: {
    email: "required|email",
  },
  resetPasswordValidation: {
    email: "required|email",
    new_password: "required|string|min:6",
    otp: "required|string|min:4",
  },
  profilevalidation: {
    name: "required|string",
    phone: "required|string|min:8",
    bio: "required|string",
  },
  updateAddressValidation: {
    type: "required|string|in:home,office",
    street: "required|string",
    city: "required|string",
    state: "required|string",
    country: "required|string",
    zip: "required|string",
  },
  newrestaurant: {
    name: "required|string",
    address: "required|string",
    opening_hours: "required|string",
    closing_hours: "required|string",
    status: "string|in:active,inactive,closed",
  },
  addfoodvalidation: {
    restaurant_id: "required|integer",
    item_name: "required|string",
    price: "required|numeric",
    description: "string",
    category: "string",
    subcategory: "string",
    img_url: "string",
    is_available: "boolean",
  },
  addToCart: {
    menu_id: "required|integer",
    quantity: "required|integer|min:1",
  },
  updateCartItem: {
    user_id: "required|integer",
    menu_id: "required|integer",
    quantity: "required|integer|min:1",
  },
  userIdParam: {
    user_id: "required|integer",
  },
  addToCart: {
    menu_id: "required|integer",
    quantity: "required|integer|min:1",
  },
  removeFromCart: { menu_id: "required|integer" },
  updateCartItem: {
    menu_id: "required|integer",
    quantity: "required|integer|min:1",
  },
};
