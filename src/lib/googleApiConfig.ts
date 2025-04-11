
// Google Mail API configuration
export const googleApiConfig = {
  web: {
    client_id: "1091312306713-6s4cp92k98c9a1riqv6m8m5ve0o81diu.apps.googleusercontent.com",
    project_id: "agent-456506",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_secret: "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"
  }
};

// Helper functions for Google API authentication
export const saveGoogleCredentials = () => {
  localStorage.setItem('googleApiCredentials', JSON.stringify(googleApiConfig));
};

export const getGoogleCredentials = () => {
  const credentials = localStorage.getItem('googleApiCredentials');
  return credentials ? JSON.parse(credentials) : googleApiConfig;
};

// Initialize by saving credentials to localStorage on first load
saveGoogleCredentials();
