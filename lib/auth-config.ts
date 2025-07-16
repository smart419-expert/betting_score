// Dynamic OAuth configuration for different environments
export function getAuthConfig() {
  // Check if we're in development or production
  const isDevelopment = process.env.NODE_ENV === 'development'
  const isLocalhost = typeof window !== 'undefined' && window.location.hostname === 'localhost'
  
  // Determine the base URL
  let baseUrl: string
  
  if (isDevelopment || isLocalhost) {
    // Local development
    baseUrl = 'http://localhost:3000'
  } else {
    // Production - use the actual domain
    baseUrl = 'https://gambino-ten.vercel.app'
  }
  
  return {
    redirectTo: `${baseUrl}/auth/callback`,
    baseUrl
  }
}

// Get the current environment for debugging
export function getEnvironment() {
  if (typeof window !== 'undefined') {
    return {
      hostname: window.location.hostname,
      protocol: window.location.protocol,
      port: window.location.port,
      fullUrl: window.location.href
    }
  }
  return {
    nodeEnv: process.env.NODE_ENV,
    hostname: process.env.VERCEL_URL || 'unknown'
  }
} 