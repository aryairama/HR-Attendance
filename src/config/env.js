const jsonParse = (envValue, defaultValue, parse = true) => {
  try {
    if (envValue === null || envValue === '' || typeof envValue === 'undefined') {
      return defaultValue;
    } else {
      if (parse) {
        return JSON.parse(envValue);
      } else if (parse === false) {
        return envValue;
      }
    }
  } catch (error) {
    return defaultValue;
  }
};

const env = () => {
  return {
    BACKEND_API_URL: jsonParse(import.meta.env.VITE_APP_API_URL, '', false),
  };
};
export default env;
