<!-- Automatically generated from Config.graphqls -->
# GraphCommerce configuration system

Global GraphCommerce configuration can be configured in your `graphcommerce.config.js` file
in the root of your project and are automatically validated on startup.

## Configuring with the configuration file.

The configuration file is a javascript file that exports a `GraphCommerceConfig` object. See graphcommerce.config.js.example for an example.

## Using configuration

Configuration can be accessed in your project with the `import.meta.graphCommerce` object.

```tsx
import { i18nAll, i18nConfig, i18nConfigDefault, useI18nConfig } from '@graphcommerce/next-ui'

// Accessing a global value
const globalConf = import.meta.graphCommerce.cartDisplayPricesInclTax

function MyComponent() {
  // Configuration configured per i18n locale.
  const scopedConfig = useI18nConfig().cartDisplayPricesInclTax

  // Creating a fallback system
  const scopedConfigWithFallback = scopedConfig ?? globalConf

  // Or as single line
  const scopedConfigWithFallback2 =
    useI18nConfig().cartDisplayPricesInclTax ?? import.meta.graphCommerce.cartDisplayPricesInclTax

  return <div>{googleRecaptchaKey}</div>
}
```

## Environment variables to override configuration

Configuration values can be overwriten by environment variables, with the following rules:
- Convert from camelCase to `SCREAMING_SNAKE_CASE`
- Prefix with `GC_`
- Arrays can be indexed with _0, _1, _2, etc.
- Objects can be accessed with _<key>.

Examples:
- `limitSsg` -> `GC_LIMIT_SSG="1"`
- `i18n[0].locale` -> `GC_I18N_0_LOCALE="en"`
- `debug.pluginStatus` -> `GC_DEBUG_PLUGIN_STATUS="1"`


## Exporting current configuration to environment variables

You can export configuration by running `yarn graphcommerce export-config`

## Extending the configuration in your  project

Create a graphql/Config.graphqls file in your project and extend the GraphCommerceConfig, GraphCommerceI18nConfig inputs to add configuration.

```graphql
extend input GraphCommerceConfig {
  myOptionalBoolean: Boolean
  myRequiredBoolean: Boolean!
  myOptionalString: String
  myRequiredString: String!
  myOptionalInt: Int
  myRequiredInt: Int!
  myOptionalFloat: Float
  myRequiredFloat: Float!
}
extend input GraphCommerceI18nConfig {
  myField: Boolean
}
```

## All configuration values

Below is a list of all possible configurations that can be set by GraphCommerce.

### GraphCommerceConfig

#### `canonicalBaseUrl: String!`

The canonical base URL is used for SEO purposes.

Examples:
- https://example.com
- https://example.com/en
- https://example.com/en-US

#### `hygraphEndpoint: String!`

The HyGraph endpoint.

Project settings -> API Access -> High Performance Read-only Content API

#### `i18n: [[GraphCommerceI18nConfig](#GraphCommerceI18nConfig)!]!`

All i18n configuration for the project

#### `magentoEndpoint: String!`

GraphQL Magento endpoint.

Examples:
- https://magento2.test/graphql

#### `cartDisplayPricesInclTax: Boolean`

Due to a limitation of the GraphQL API it is not possible to determine if a cart should be displayed including or excluding tax.

When Magento's StoreConfig adds this value, this can be replaced.

#### `customerRequireEmailConfirmation: Boolean`

Due to a limitation in the GraphQL API of Magento 2, we need to know if the
customer requires email confirmation.

This value should match Magento 2's configuration value for
`customer/create_account/confirm` and should be removed once we can query

#### `debug: [GraphCommerceDebugConfig](#GraphCommerceDebugConfig)`

Debug configuration for GraphCommerce

#### `demoMode: Boolean`

Enables some demo specific code that is probably not useful for a project:

- Adds the "BY GC" to the product list items.
- Adds "dominant_color" attribute swatches to the product list items.
- Creates a big list items in the product list.

#### `googleAnalyticsId: String`

See https://support.google.com/analytics/answer/9539598?hl=en

Provide a value to enable Google Analytics for your store.

To enable only for a specific locale, override the value in the i18n config.

#### `googleRecaptchaKey: String`

Google reCAPTCHA key, get from https://developers.google.com/recaptcha/docs/v3

This value is required even if you are configuring different values for each locale.

#### `googleTagmanagerId: String`

The Google Tagmanager ID to be used on the site.

This value is required even if you are configuring different values for each locale.

#### `legacyProductRoute: Boolean`

On older versions of GraphCommerce products would use a product type specific route.

This should only be set to true if you use the /product/[url] AND /product/configurable/[url] routes.

@deprecated Will be removed in a future version. [migration](../upgrading/graphcommerce-5-to-6.md#product-routing-changes)

#### `limitSsg: Boolean`

Limit the static generation of SSG when building

#### `previewSecret: String`

To enable next.js' preview mode, configure the secret you'd like to use.

#### `productFiltersPro: Boolean`

Product filters with better UI for mobile and desktop.

@experimental This is an experimental feature and may change in the future.

#### `productRoute: String`

By default we route products to /p/[url] but you can change this to /product/[url] if you wish.

Default: '/p/'
Example: '/product/'

#### `robotsAllow: Boolean`

Allow the site to be indexed by search engines.
If false, the robots.txt file will be set to disallow all.

#### `wishlistHideForGuests: Boolean`

Hide the wishlist functionality for guests.

#### `wishlistIgnoreProductWishlistStatus: Boolean`

Ignores wether a product is already in the wishlist, makes the toggle an add only.

### GraphCommerceDebugConfig

Debug configuration for GraphCommerce

#### `pluginStatus: Boolean`

Reports which plugins are enabled or disabled.

#### `webpackCircularDependencyPlugin: Boolean`

Cyclic dependencies can cause memory issues and other strange bugs.
This plugin will warn you when it detects a cyclic dependency.

When running into memory issues, it can be useful to enable this plugin.

#### `webpackDuplicatesPlugin: Boolean`

When updating packages it can happen that the same package is included with different versions in the same project.

Issues that this can cause are:
- The same package is included multiple times in the bundle, increasing the bundle size.
- The Typescript types of the package are not compatible with each other, causing Typescript errors.

### GraphCommerceI18nConfig

All i18n configuration for the project

#### `locale: String!`

Must be a locale string https://www.unicode.org/reports/tr35/tr35-59/tr35.html#Identifiers

#### `magentoStoreCode: String!`

Magento store code.

Stores => All Stores => [Store View] => Store View Code

Examples:
- default
- en-us
- b2b-us

#### `canonicalBaseUrl: String`

The canonical base URL is used for SEO purposes.

Examples:
- https://example.com
- https://example.com/en
- https://example.com/en-US

#### `cartDisplayPricesInclTax: Boolean`

Due to a limitation of the GraphQL API it is not possible to determine if a cart should be displayed including or excluding tax.

#### `defaultLocale: Boolean`

There can only be one entry with defaultLocale set to true.
- If there are more, the first one is used.
- If there is none, the first entry is used.

#### `domain: String`

Domain configuration, must be a domain https://tools.ietf.org/html/rfc3986

#### `googleAnalyticsId: String`

Configure different Google Analytics IDs for different locales.

To disable for a specific locale, set the value to null.

#### `googleRecaptchaKey: String`

Locale specific google reCAPTCHA key.

#### `googleTagmanagerId: String`

The Google Tagmanager ID to be used per locale.

#### `hygraphLocales: [String!]`

Add a gcms-locales header to make sure queries return in a certain language, can be an array to define fallbacks.

#### `linguiLocale: String`

Specify a custom locale for to load translations.