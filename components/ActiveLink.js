import { useRouter } from 'next/router'
import Link from 'next/link'

export default function ActiveLink({ href, name }) {
    const { asPath } = useRouter()

    return (
        <Link href={href}><a className={href === asPath && 'active'}>{name}</a></Link>
    )
}