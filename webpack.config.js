const pkg = require("./package.json"),
  fs = require("fs"),
  path = require("path"),
  { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer"),
  CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin"),
  { CleanWebpackPlugin } = require("clean-webpack-plugin"),
  CopyWebpackPlugin = require("copy-webpack-plugin"),
  FaviconsWebpackPlugin = require("favicons-webpack-plugin"),
  FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin"),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  ManifestPlugin = require("webpack-manifest-plugin"),
  MiniCssExtractPlugin = require("mini-css-extract-plugin"),
  OptimizeCssnanoPlugin = require("@intervolga/optimize-cssnano-plugin"),
  PreloadWebpackPlugin = require("preload-webpack-plugin"),
  WorkboxWebpackPlugin = require("workbox-webpack-plugin"),
  {
    EnvironmentPlugin,
    HashedModuleIdsPlugin,
    NamedChunksPlugin
  } = require("webpack");

// Indicate if the build is optimised for production deployment.
const isProduction = process.env.NODE_ENV === "production";

// Indicate if the `webpack-dev-server` should be running with HTTPS.
const isSSLEnabled = process.env.HTTP_SSL_ENABLED === "true";

// Indicate the folder that contains Svelte SPA source code.
const srcDir = "web/src";

// Indicate the folder that contains the optimised build assets.
const distDir = "dist";

// Indicate the folder that contains the public assets which are directly copied over to `distDir`.
const publicDir = "web/public";

// Indicate the SSL key/cert file location which will be used by `webpack-dev-server` when `HTTP_SSL_ENABLED` is
// set to `true`. By default, `HTTP_SSL_CERT_PATH` is set to `./tmp/ssl`.
const ssl = {
  key: `${process.env.HTTP_SSL_CERT_PATH}/key.pem`,
  cert: `${process.env.HTTP_SSL_CERT_PATH}/cert.pem`
};

// Indicate the HTTPS configuration for `webpack-dev-server` to use when `HTTP_SSL_ENABLED` is set to `true`.
const https = (() => {
  return isSSLEnabled && fs.existsSync(ssl.key) && fs.existsSync(ssl.cert)
    ? {
        key: fs.readFileSync(path.resolve(__dirname, ssl.key)),
        cert: fs.readFileSync(path.resolve(__dirname, ssl.cert))
      }
    : false;
})();

// Indicate the server-side rendering routes which is set by appy's `start` and `build` commands so that the service
// worker doesn't handle navigation fallback to `/index.html` when the current route matching 1 of these routes.
const ssrRoutes = (() => {
  let routes = [];

  if (
    process.env.APPY_SSR_ROUTES !== undefined &&
    process.env.APPY_SSR_ROUTES !== ""
  ) {
    routes = routes.concat(process.env.APPY_SSR_ROUTES.split(","));
  }

  return routes;
})();

// Configure the `webpack-dev-server` for local development use.
const devServer = {
  historyApiFallback: true,
  https,
  host: process.env.HTTP_HOST || "0.0.0.0",
  port:
    parseInt(
      isSSLEnabled
        ? process.env.HTTP_SSL_PORT || 3443
        : process.env.HTTP_PORT || 3000
    ) + 1,
  hot: true,
  overlay: {
    warnings: true,
    errors: true
  }
};

module.exports = {
  mode: isProduction ? "production" : "development",
  devServer,
  devtool: isProduction ? "false" : "source-map",
  entry: {
    app: path.resolve(__dirname, srcDir, "main.ts")
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]
      },
      {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 4096,
              fallback: {
                loader: "file-loader",
                options: {
                  name: "images/[name].[contenthash:12].[ext]"
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(svg)(\?.*)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "images/[name].[contenthash:12].[ext]"
            }
          }
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 4096,
              fallback: {
                loader: "file-loader",
                options: {
                  name: "medias/[name].[contenthash:12].[ext]"
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 4096,
              fallback: {
                loader: "file-loader",
                options: {
                  name: "fonts/[name].[contenthash:12].[ext]"
                }
              }
            }
          }
        ]
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader?cacheDirectory=true"
          },
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              happyPackMode: false,
              appendTsxSuffixTo: ["\\.svelte$"]
            }
          }
        ]
      },
      {
        test: /\.svelte$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader?cacheDirectory=true"
          },
          {
            loader: "svelte-loader",
            options: {
              emitCss: isProduction,
              hotReload: !isProduction,
              preprocess: require("./svelte.config").preprocess
            }
          }
        ]
      }
    ]
  },
  output: {
    chunkFilename: isProduction
      ? "scripts/[name].[contenthash:12].js"
      : "scripts/[name].js",
    filename: isProduction
      ? "scripts/[name].[contenthash:12].js"
      : "scripts/[name].js",
    path: path.resolve(__dirname, distDir),
    publicPath: "/"
  },
  plugins: [
    new CleanWebpackPlugin(),
    new EnvironmentPlugin({
      NODE_ENV: process.env.NODE_ENV,
      BASE_URL: "/"
    }),
    new CaseSensitivePathsPlugin(),
    new FriendlyErrorsWebpackPlugin({
      additionalTransformers: [],
      additionalFormatters: []
    }),
    ...(isProduction
      ? [
          new MiniCssExtractPlugin({
            filename: "styles/[name].[contenthash:12].css",
            chunkFilename: "styles/[name].[contenthash:12].css"
          }),
          new OptimizeCssnanoPlugin({
            sourceMap: true,
            cssnanoOptions: {
              preset: [
                "default",
                {
                  mergeLonghand: false,
                  cssDeclarationSorter: false
                }
              ]
            }
          }),
          new HashedModuleIdsPlugin({
            hashDigest: "hex"
          }),
          new NamedChunksPlugin(function() {})
        ]
      : []),
    new HtmlWebpackPlugin({
      title: pkg.name,
      template: path.resolve(__dirname, publicDir, "index.html"),
      minify: isProduction
        ? {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            collapseBooleanAttributes: true,
            removeScriptTypeAttributes: true
          }
        : {}
    }),
    new PreloadWebpackPlugin({
      rel: "preload",
      include: "initial",
      fileBlacklist: [/\.map$/, /hot-update\.js$/]
    }),
    new PreloadWebpackPlugin({
      rel: "prefetch",
      include: "asyncChunks"
    }),
    new CopyWebpackPlugin(
      [
        {
          from: path.resolve(__dirname, publicDir),
          to: path.resolve(__dirname, distDir),
          toType: "dir",
          ignore: [
            {
              glob: "index.html",
              matchBase: false
            }
          ]
        },
        {
          from: path.resolve(__dirname, "assets"),
          to: path.resolve(
            __dirname,
            `${distDir}/[path][name].[contenthash:12].[ext]`
          )
        }
      ],
      { copyUnmodified: true, ignore: [".DS_Store", ".gitkeep"] }
    ),
    new ManifestPlugin({
      map: function(file) {
        file.name = file.name.replace(/(\.[a-z0-9]{12})(\..*)$/i, "$2");

        return file;
      }
    }),
    ...(isProduction
      ? [
          new BundleAnalyzerPlugin({
            analyzerMode: "disabled",
            analyzerHost: devServer.host,
            analyzerPort: parseInt(devServer.port) + 2,
            openAnalyzer: false
          })
        ]
      : []),
    new FaviconsWebpackPlugin({
      cache: !isProduction,
      favicons: Object.assign(
        {},
        (() =>
          Object.assign({}, pkg.pwa, {
            appName: pkg.name,
            appShortName: pkg.name,
            appDescription: pkg.description
          }))(),
        {
          icons: {
            coast: false,
            firefox: false,
            yandex: false
          }
        }
      ),
      inject: true,
      logo: path.resolve(__dirname, `${srcDir}/assets/images/logo.png`),
      prefix: "pwa/"
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      skipWaiting: true,
      clientsClaim: true,
      navigateFallback: "/index.html",
      navigateFallbackBlacklist: ssrRoutes
        .concat(["/service-worker.js"])
        .map(p => new RegExp(p))
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, srcDir),
      svelte: path.resolve(__dirname, "node_modules", "svelte")
    },
    extensions: [".js", ".jsx", ".json", ".mjs", ".svelte", ".ts", ".tsx"],
    mainFields: ["svelte", "browser", "module", "main"]
  },
  stats: isProduction
    ? {
        assets: true,
        assetsSort: "!size",
        builtAt: false,
        children: false,
        colors: true,
        modules: false
      }
    : "minimal"
};
