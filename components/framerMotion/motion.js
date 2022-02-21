export const slideDownVariant = {
    initial: {
        y: '-100vh',
    },
    end: {
        y: 0,
        transition: {
            duration: .4,
            delayChildren: .1,
            when: 'beforeChildren',
        }
    },
}
export const fadeVariant = {
    initial: {
        opacity: 0
    },
    end: {
        opacity: 1,
        transition: {
            duration: .3,
        }
    },
}