// Auth0 configuration
export const auth0Config = {
  domain: process.env.REACT_APP_AUTH0_DOMAIN || 'dev-ou2jc0df2dlaepsd.us.auth0.com',
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID || 'yz2evMTLLaIhcZv51n8KDPYvE7pRyYl4',
  authorizationParams: {
    redirect_uri: window.location.origin,
    audience: process.env.REACT_APP_AUTH0_AUDIENCE || 'https://dev-ou2jc0df2dlaepsd.us.auth0.com/api/v2/',
  },
};

// For development, you can use these test values:
// domain: 'dev-xxxxx.us.auth0.com'
// clientId: 'your-client-id'
// audience: 'https://sports-booking-api'

