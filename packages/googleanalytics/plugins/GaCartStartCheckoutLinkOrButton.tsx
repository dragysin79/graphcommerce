import { CartStartCheckoutLinkOrButtonProps } from '@graphcommerce/magento-cart'
import { PluginProps } from '@graphcommerce/next-config'
import { gtagBeginCheckout } from '../events/gtagBeginCheckout/gtagBeginCheckout'

export const component = 'CartStartCheckoutLinkOrButton'
export const exported = '@graphcommerce/magento-cart'
export const ifConfig: IfConfig = 'googleAnalyticsId'

export function GaCartStartCheckoutLinkOrButton(
  props: PluginProps<CartStartCheckoutLinkOrButtonProps>,
) {
  const { Prev, onStart, ...rest } = props

  useEffect(
    () =>
      gtagViewCart({
        items: rest.items,
        prices: rest.prices,
      }),
    // We're disabling eslint rule to prevent this event from being triggerd on every rerender
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  return (
    <Prev
      {...rest}
      onStart={(e, cart) => {
        gtagBeginCheckout(cart)
        return onStart?.(e, cart)
      }}
    />
  )
}

export const Plugin = GaCartStartCheckoutLinkOrButton
