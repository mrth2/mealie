import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  // Global page headers: https://go.nuxtjs.dev/config-head
  // target: "static",
  ssr: false,
  future: {
    compatibilityVersion: 3,
  },
  app: {
    baseURL: process.env.SUB_PATH || "",

    head: {
      title: "Mealie",
      meta: [
        { hid: "og:type", property: "og:type", content: "website" },
        { hid: "og:title", property: "og:title", content: "Mealie" },
        { hid: "og:site_name", property: "og:site_name", content: "Mealie" },
        {
          hid: "og:description",
          property: "og:description",
          content: "Mealie is a recipe management app for your kitchen.",
        },
        {
          hid: "og:image",
          property: "og:image",
          content:
            "https://raw.githubusercontent.com/mealie-recipes/mealie/9571816ac4eed5beacfc0abf6c03eff1427fd0eb/frontend/static/icons/android-chrome-512x512.png",
        },
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: "Mealie is a recipe management app for your kitchen.",
        },
      ],
      link: [
        { hid: "favicon", rel: "icon", type: "image/x-icon", href: "/favicon.ico", "data-n-head": "ssr" },
        { hid: "shortcut icon", rel: "shortcut icon", type: "image/png", href: "/icons/icon-x64.png", "data-n-head": "ssr" },
        { hid: "apple-touch-icon", rel: "apple-touch-icon", type: "image/png", href: "/icons/apple-touch-icon.png", "data-n-head": "ssr" },
        { hid: "mask-icon", rel: "mask-icon", href: "/icons/safari-pinned-tab.svg", "data-n-head": "ssr" }
      ],
    },

    /* viewTransition: {
      name: "layout",
      mode: "out-in",
    }, */
    viewTransition: true,
  },


  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/css/main.css", "~/assets/css/main.css", "~/assets/style-overrides.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["~/plugins/globals.ts", "~/plugins/axios.ts", "~/plugins/theme.ts", "~/plugins/dark-mode.client.ts"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [// https://go.nuxtjs.dev/pwa
    // ...(process.env.NODE_ENV === "production" ? ["@nuxtjs/pwa"] : []),

    // https://i18n.nuxtjs.org/setup
    "@nuxtjs/i18n",

    // https://auth.nuxtjs.org/guide/setup
    // "@nuxtjs/auth-next",

    // https://github.com/nuxt-community/proxy-module
    /* [
      "@nuxtjs/proxy",
      {
        logProvider: () => {
          const provider = {
            log: console.log,
            debug: console.log,
            info: console.info,
            warn: console.warn,
            error: console.error,
          };

          return provider;
        },
        logLevel: "debug",
      },
    ], */

    // https://google-fonts.nuxtjs.org/setup
    "@nuxtjs/google-fonts",

    "vuetify-nuxt-module"
  ],

  googleFonts: {
    fontsPath: "/assets/fonts",
    download: true,
    families: {
      Roboto: [100, 300, 400, 500, 700, 900],
    },
  },

  /* auth: {
    redirect: {
      login: "/login",
      logout: "/login",
      callback: "/login",
      home: "/",
    },
    cookie: {
      prefix: "mealie.auth.",
      options: {
        expires: 7,
        path: "/",
      },
    },
    rewriteRedirects: false,
    // Options
    strategies: {
      local: {
        resetOnError: true,
        token: {
          property: "access_token",
          global: true,
          // required: true,
          // type: 'Bearer'
        },
        user: {
          property: "",
          autoFetch: true,
        },
        endpoints: {
          login: {
            url: "api/auth/token",
            method: "post",
            propertyName: "access_token",
          },
          refresh: { url: "api/auth/refresh", method: "post" },
          logout: { url: "api/auth/logout", method: "post" },
          user: { url: "api/users/self", method: "get" },
        },
      },
      oidc: {
        scheme: "local",
        resetOnError: true,
        token: {
          property: "access_token",
          global: true,
        },
        user: {
          property: "",
          autoFetch: true,
        },
        endpoints: {
          login: {
            url: "api/auth/oauth/callback",
            method: "get",
          },
          logout: { url: "api/auth/logout", method: "post" },
          user: { url: "api/users/self", method: "get" },
        },
      },
    },
  }, */

  i18n: {
    vueI18n: './i18n.config.ts',
  },

  runtimeConfig: {
    public: {
      GLOBAL_MIDDLEWARE: process.env.GLOBAL_MIDDLEWARE || undefined,
      SUB_PATH: process.env.SUB_PATH || "",
      // ==============================================
      // Theme Runtime Config
      useDark: Boolean(process.env.THEME_USE_DARK) || false,
      themes: {
        dark: {
          primary: process.env.THEME_DARK_PRIMARY || "#E58325",
          accent: process.env.THEME_DARK_ACCENT || "#007A99",
          secondary: process.env.THEME_DARK_SECONDARY || "#973542",
          success: process.env.THEME_DARK_SUCCESS || "#43A047",
          info: process.env.THEME_DARK_INFO || "#1976d2",
          warning: process.env.THEME_DARK_WARNING || "#FF6D00",
          error: process.env.THEME_DARK_ERROR || "#EF5350",
          background: "#1E1E1E",
        },
        light: {
          primary: process.env.THEME_LIGHT_PRIMARY || "#E58325",
          accent: process.env.THEME_LIGHT_ACCENT || "#007A99",
          secondary: process.env.THEME_DARK_SECONDARY || "#973542",
          success: process.env.THEME_DARK_SUCCESS || "#43A047",
          info: process.env.THEME_LIGHT_INFO || "#1976d2",
          warning: process.env.THEME_LIGHT_WARNING || "#FF6D00",
          error: process.env.THEME_LIGHT_ERROR || "#EF5350",
        },
      },
    }
  },

  /* proxy: {
    // See Proxy section
    [`${process.env.SUB_PATH || ""}api`]: {
      pathRewrite: {
        [`${process.env.SUB_PATH || ""}api`]: "/api", // rewrite path
      },
      changeOrigin: true,
      target: process.env.API_URL || "http://localhost:9000",
      xfwd: true,
    },
    "/api": {
      changeOrigin: true,
      target: process.env.API_URL || "http://localhost:9000",
      xfwd: true,
    },
    "/docs": {
      changeOrigin: true,
      target: process.env.API_URL || "http://localhost:9000",
      xfwd: true,
    },
    "/openapi.json": {
      changeOrigin: true,
      target: process.env.API_URL || "http://localhost:9000",
      xfwd: true,
    },
  }, */

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  // pwa: {
  //   meta: {
  //     /* meta options */
  //     name: "Mealie",
  //     description: "Mealie is a recipe management and meal planning app",
  //     theme_color: process.env.THEME_LIGHT_PRIMARY || "#E58325",
  //     ogSiteName: "Mealie",
  //   },
  //   manifest: {
  //     start_url: "/",
  //     scope: "/",
  //     lang: "en",
  //     dir: "auto",
  //     name: "Mealie",
  //     short_name: "Mealie",
  //     crossorigin: "use-credentials",
  //     id: "mealie",
  //     description: "Mealie is a recipe management and meal planning app",
  //     theme_color: process.env.THEME_LIGHT_PRIMARY || "#E58325",
  //     background_color: "#FFFFFF",
  //     display: "standalone",
  //     display_override: [
  //       "standalone",
  //       "minimal-ui",
  //       "browser",
  //       "window-controls-overlay"
  //     ],
  //     share_target: {
  //       action: "/r/create/url",
  //       method: "GET",
  //       params: {
  //         /* title and url are not currently used in Mealie. If there are issues
  //            with sharing, uncommenting those lines might help solve the puzzle. */
  //         // "title": "title",
  //         "text": "recipe_import_url",
  //         // "url": "url",
  //       },
  //     },
  //     icons: [
  //       {
  //         src: "/icons/android-chrome-192x192.png",
  //         sizes: "192x192",
  //         type: "image/png",
  //         purpose: "any",
  //       },
  //       {
  //         src: "/icons/android-chrome-512x512.png",
  //         sizes: "512x512",
  //         type: "image/png",
  //         purpose: "any",
  //       },
  //       {
  //         src: "/icons/android-chrome-maskable-192x192.png",
  //         sizes: "192x192",
  //         type: "image/png",
  //         purpose: "maskable",
  //       },
  //       {
  //         src: "/icons/android-chrome-maskable-512x512.png",
  //         sizes: "512x512",
  //         type: "image/png",
  //         purpose: "maskable",
  //       },
  //     ],
  //     screenshots: [
  //       {
  //         "src": "/screenshots/home-narrow.png",
  //         "sizes": "1600x2420",
  //         "form_factor": "narrow",
  //         "label": "Home Page"
  //       },
  //       {
  //         "src": "/screenshots/recipe-narrow.png",
  //         "sizes": "1600x2420",
  //         "form_factor": "narrow",
  //         "label": "Recipe Page"
  //       },
  //       {
  //         "src": "/screenshots/editor-narrow.png",
  //         "sizes": "1600x2420",
  //         "form_factor": "narrow",
  //         "label": "Editor Page"
  //       },
  //       {
  //         "src": "/screenshots/parser-narrow.png",
  //         "sizes": "1600x2420",
  //         "form_factor": "narrow",
  //         "label": "Parser Page"
  //       },
  //       {
  //         "src": "/screenshots/home-wide.png",
  //         "sizes": "2560x1460",
  //         "form_factor": "wide",
  //         "label": "Home Page"
  //       },
  //       {
  //         "src": "/screenshots/recipe-wide.png",
  //         "sizes": "2560x1460",
  //         "form_factor": "wide",
  //         "label": "Recipe Page"
  //       },
  //       {
  //         "src": "/screenshots/editor-wide.png",
  //         "sizes": "2560x1460",
  //         "form_factor": "wide",
  //         "label": "Editor Page"
  //       },
  //       {
  //         "src": "/screenshots/parser-wide.png",
  //         "sizes": "2560x1460",
  //         "form_factor": "wide",
  //         "label": "Parser Page"
  //       }
  //     ],
  //     "shortcuts": [
  //       {
  //         "name": "Shopping Lists",
  //         "short_name": "Shopping Lists",
  //         "description": "Open the shopping lists",
  //         "url": "/shopping-lists",
  //         "icons": [
  //           {
  //             "src": "/icons/mdiFormatListChecks-192x192.png",
  //             "sizes": "192x192",
  //           },
  //           {
  //             "src": "/icons/mdiFormatListChecks-96x96.png",
  //             "sizes": "96x96",
  //           }
  //         ]
  //       },
  //       {
  //         "name": "Meal Planner",
  //         "short_name": "Meal Planner",
  //         "description": "Open the meal planner",
  //         "url": "/household/mealplan/planner/view",
  //         "icons": [
  //           {
  //             "src": "/icons/mdiCalendarMultiselect-192x192.png",
  //             "sizes": "192x192",
  //           },
  //           {
  //             "src": "/icons/mdiCalendarMultiselect-96x96.png",
  //             "sizes": "96x96",
  //           }
  //         ]
  //       },
  //     ],
  //     prefer_related_applications: false,
  //     handle_links: "preferred",
  //     categories: [
  //       "food"
  //     ],
  //     launch_handler: {
  //       "client_mode": ["focus-existing", "auto"]
  //     },
  //     edge_side_panel: {
  //       "preferred_width": 400
  //     }
  //   },
  //   icon: false, // disables the icon module
  // },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  // vuetify: {
  //   optionsPath: "./vuetify.options.js",
  // },
  vuetify: {
    moduleOptions: {},
    vuetifyOptions: {
      icons: {
        defaultSet: "mdi-svg"
      },
      theme: {
        // Theme Config set at runtime by /plugins/theme.ts
        // This config doesn't do anything.
        themes: {
          dark: {
            dark: true,
            colors: {
              primary: "#E58325",
              accent: "#007A99",
              secondary: "#973542",
              success: "#43A047",
              info: "#1976d2",
              warning: "#FF6D00",
              error: "#EF5350",
            },
          },
          light: {
            dark: false,
            colors: {
              primary: "#E58325",
              accent: "#007A99",
              secondary: "#973542",
              success: "#43A047",
              info: "#1976d2",
              warning: "#FF6D00",
              error: "#EF5350",
            },
          },
        },
      },
      locale: {
        locale: "en-US",
        fallback: "en-US",
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-build
    analyze: false,
    /* babel: {
      plugins: [
        ["@babel/plugin-proposal-private-property-in-object", { loose: true }],
      ],
    }, */
    transpile: process.env.NODE_ENV !== "production" ? [/@vue[\\/]composition-api/] : [],
  },

  compatibilityDate: "2025-02-27",
});
