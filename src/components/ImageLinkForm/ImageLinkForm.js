import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onImageSubmit }) => {
    return (
        <div>
            <p className='f3'>
                {'This Magic Brain will detect faces in your picture. Give it a try.'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input
                        className='f4 pa2 w-70 center'
                        type='text'
                        placeholder='Enter image URL.'
                        onChange={onInputChange}
                    />
                    <button
                        className='w-30 grow pa4 f4 link center pv2 dib white bg-light-purple'
                        onClick={onImageSubmit}
                    >Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;
