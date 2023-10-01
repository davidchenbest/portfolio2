import { useRouter } from 'next/router'
import ActiveLink from '../ActiveLink'

const subNav = {
    '/nba': ['/score', '/standings'],
    // "/projects": ['/blog', '/gallery'],
    "/projects": ['/gallery', {
        name: 'Store', link: 'https://jiachenstore.vercel.app'
    }],
    '/tools': [, '/videoroom', '/weather', '/bill-split', '/countdown'],
    '/concepts': [, '/sierpinski']
}

function format(url) {
    const sameDomain = url.startsWith('/')
    if (!sameDomain) return url
    let name = url.replace(/\//, '')
    let capFirstName = name[0].toUpperCase() + name.slice(1)
    return capFirstName
}

export default function SubNav() {
    const { asPath } = useRouter()
    let paths = asPath.split('/')
    paths = paths.slice(0, paths.length - 1)
    let path = paths.join('/')
    if (!path) path = asPath
    const subs = subNav[path]
    return (
        <>
            {subs && <div className='nav-list sub-nav'>
                {subs.map(sub => {
                    const { name } = sub
                    if (typeof sub !== 'string') sub = sub.link
                    let href = path + sub
                    const sameDomain = sub.startsWith('/')
                    if (!sameDomain) href = sub
                    return <ActiveLink target={!sameDomain ? '_blank' : ''} href={href} name={name || format(sub)} key={sub} />
                }
                )}
            </div>}
        </>
    )
}
