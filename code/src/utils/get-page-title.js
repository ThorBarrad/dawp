import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Makelivall'

export default function getPageTitle(pageTitle) {
    if (pageTitle) {
        return `${pageTitle} - ${title}`
    }
    return `${title}`
}