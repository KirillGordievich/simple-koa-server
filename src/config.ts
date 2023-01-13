export type Config = {
  api: {
    host: string;
    port: number;
    keys: {
      public: string;
      private: string;
    };
  };
};

/**
 * Parse configuration object in place.
 *
 * Sometimes, it is handier to leave an option as an empty string
 * than to completely delete it from a configuration file,
 * unset it, or remove it from the secret storage. To account for that,
 * falsy values, i.e., empty strings in this case, are removed to make
 * validation run smoother
 *
 * @param configuration Configuration object
 * @returns Parsed configuration object
 */
function parse(configuration) {
  for (const [key, value] of Object.entries(configuration)) {
    // If the property is an object itself, we parse it recursively
    if (typeof value === 'object') {
      parse(value);

      // In case the parsed object is empty, we are free to delete its key
      if (!Object.keys(value).length) {
        delete configuration[key];
      }
    }

    // Otherwise, we check a property for falsiness and delete its key
    // in case it is falsy
    else if (!value) {
      delete configuration[key];
    }
  }

  return configuration;
}

// This config is cast as type Config for convenience ONLY.
// You have to run this object through AJV to validate and coerce it
export const config = parse({
  api: {
    // required
    host: process.env.HOST,
    port: process.env.PORT,
    keys: {
      general: process.env.API_KEY_GENERAL,
      auxiliary: process.env.API_KEY_AUXILIARY,
    },
  },
}) as Config;
