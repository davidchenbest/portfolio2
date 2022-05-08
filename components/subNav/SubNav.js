import { useRouter } from 'next/router'
import ActiveLink from '../ActiveLink'

const subNav = {
    '/nba': ['/score', '/standings'],
    "/projects": ['/blog', '/gallery', '/videoroom', '/weather']
}

function format(url) {
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
                {subs.map(sub =>
                    <ActiveLink href={path + sub} name={format(sub)} key={sub} />
                )}
            </div>}
        </>
    )
}
