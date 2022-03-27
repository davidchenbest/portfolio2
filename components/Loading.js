import React from 'react'
import { motion } from 'framer-motion'

export default function Loading() {
    return (
        <div style={{textAlign:'center'}}>
            <motion.p
                        animate={{
                            scale: 1.1,
                            transition: {
                                duration: 0.3,
                                yoyo: Infinity
                            }
                        }}
                    >Loading...</motion.p>
        </div>
    )
}
