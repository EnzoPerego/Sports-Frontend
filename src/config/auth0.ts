// Auth0 configuration
export const auth0Config = {
  domain: process.env.REACT_APP_AUTH0_DOMAIN || 'your-domain.auth0.com',
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID || 'your-client-id',
  authorizationParams: {
    redirect_uri: window.location.origin,
    audience: process.env.REACT_APP_AUTH0_AUDIENCE || 'your-api-identifier',
  },
};

// For development, you can use these test values:
// domain: 'dev-xxxxx.us.auth0.com'
// clientId: 'your-client-id'
// audience: 'https://sports-booking-api'
