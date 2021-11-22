import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({ imageUrl, box }) => {
    const boxArray = box.map((box, index) => {
        return (
            <div className='bounding-box' key={index} style={{
                top: box.topRow,
                right: box.rightCol,
                bottom: box.bottomRow,
                left: box.leftCol}}>
            </div>
        )
    })
    
    return (
        <div className='center ma'>
            <div className='absolute pa3'>
                <img
                    id='inputImage'
                    alt=''
                    src={imageUrl}
                    width='500px'
                    height='auto'
                 />
                {boxArray}
            </div>
        </div>
    );
}

export default FaceRecognition
