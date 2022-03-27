import React, { useEffect, useState } from 'react'
import capFirst from '../../modules/capitalizeFirstLetter'
import PhotosCon from './PhotosCon'
import Loading from '../Loading'
import Navigator from './Navigator'
// import '../../css/gallery.css'

export default function Gallery({ data }) {
    const [folders, setFolders] = useState([])
    const [loading, setLoading] = useState(true)
    const [singleMode, setSingleMode] = useState(false)
    const [currentPhoto, setCurrentPhoto] = useState({})
    useEffect(() => {
        if (data) {
            setFolders(data)
            setLoading(false)
        }
    }, [data])

    const folderClick = (e, folderObj) => {

        // console.log(e.target, folderObj);
    }

    const photoClick = (e, folderObj, photoObj) => {
        setSingleMode(!singleMode)
        e.stopPropagation()
        setCurrentPhoto({ folderObj, photoObj })
    }

    return (
        <>
            {loading ? <Loading />
                :
                <div className='galleryCon'>
                    {
                        folders.length === 0 ? <div>There are no photos available</div> :
                            folders.map((element) =>
                                <div key={element._id} onClick={(e) => folderClick(e, element)} className='folderCon'>
                                    <div className='folderTitle'>
                                        <h1>{capFirst(element.title)}</h1>
                                    </div>

                                    <p>{element.description}</p>
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
