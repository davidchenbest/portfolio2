import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
// import './../../css/photosCon.css'

export default function PhotosCon({ folderObj, photos, photoClick }) {

    return (
        <div className='photosCon'>
            {
                photos.length === 0 ? <div>There are no photos available</div> :
                    photos.map((element, i) =>
                        <motion.div whileHover={{ scale: 1.05 }} key={element._id || i} className='eachPhoto' >
                            <Image src={element.photoLink} alt={element.photoLink} width={300} height={300} className='galleryPhoto'
                                onClick={(e) => photoClick(e, folderObj, element, i)} />
                        </motion.div>
                    )
            }
        </div>
    )
}
