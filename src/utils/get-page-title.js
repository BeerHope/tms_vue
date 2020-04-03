
import i18n from '@/lang'

const title = i18n.t('documentTitle')

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${i18n.t(`routes.${pageTitle}`)} - ${title}`
  }
  return `${title}`
}
