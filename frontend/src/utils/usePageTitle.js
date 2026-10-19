import { useEffect } from 'react'

const SUFFIX = 'Open Source Club'

/**
 * Sets `document.title` for the current screen, always suffixed with
 * " | Open Source Club". Restores the default title on unmount.
 *
 * @param {string} [title] page-specific title, e.g. a session title
 */
export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | ${SUFFIX}` : SUFFIX
    return () => {
      document.title = SUFFIX
    }
  }, [title])
}
