import { useRouter } from 'next/router'
import Link from 'next/link'

export default function ActiveLink({ href, name, target }) {
    const { asPath } = useRouter()

    return <Link href={href} target={target} className={href === asPath ? 'active' : null}>{name}</Link>;
}