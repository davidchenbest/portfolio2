import React, { useEffect, useState } from 'react'
import capFirst from '../../modules/capitalizeFirstLetter'
import PhotosCon from './PhotosCon'
import Loading from '../Loading'
import Navigator from './Navigator'
// import '../../css/gallery.css'

export default function InsaPosts({ albums }) {
    const [folders, setFolders] = useState([])
    const [loading, setLoading] = useState(true)
    const [singleMode, setSingleMode] = useState(false)
    const [currentPhoto, setCurrentPhoto] = useState({})
    useEffect(() => {
        if (albums) {
            setFolders(albums)
            setLoading(false)
        }
    }, [albums])

    const folderClick = (e, folderObj) => {
        console.log(99);
        // console.log(e.target, folderObj);
    }

    const photoClick = (e, folderObj, photoObj, i) => {
        console.log(i);
        setSingleMode(!singleMode)
        console.log(photoObj);
        setCurrentPhoto({ folderObj, photoObj })
    }

    return (
        <>
            {loading ? <Loading />
                :
                <div className='galleryCon'>
                    {
                        folders.length === 0 ? null :
                            folders.map((element) =>
                                <div key={element._id} className='folderCon'>
                                    <div className='folderTitle'>
                                        <h1>{capFirst(element.location)}</h1>
                                    </div>

                                    {/* <p>{element.description}</p> */}
                                    <PhotosCon folderState={{ folders, setFolders }} folderObj={element} photos={element.photos} photoClick={photoClick}></PhotosCon>
                                </div>
                            )
                    }
                </div>
            }
            {singleMode &&
                <Navigator currentPhoto={currentPhoto} folderState={{ folders, setFolders }} singleState={{ singleMode, setSingleMode }} />
            }


        </>
    )
}
