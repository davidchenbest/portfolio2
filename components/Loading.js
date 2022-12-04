import React from 'react'
import { motion } from 'framer-motion'

export default function Loading({ name }) {
    return (
        <div style={{ textAlign: 'center', overflow: 'hidden' }}>
            <motion.p
                animate={{
                    scale: 1.1,
                    transition: {
                        duration: 0.3,
                        yoyo: Infinity
                    }
                }}
            >{name ? name : 'Loading'}...</motion.p>
        </div>
    )
}
