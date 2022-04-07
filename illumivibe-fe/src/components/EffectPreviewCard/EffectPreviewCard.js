import React from 'react';
import './EffectPreviewCard.css';
import { Tags } from './Tags';

import { useDispatch } from 'react-redux';
import { SetView } from '../../store/navigation';
import { SetPattern } from '../../store/canvas';
import { useNavigate } from 'react-router-dom';

import { DeleteEffect } from '../../service/lightEffect/DeleteEffect';
import { SetCurrentId } from '../../store/canvas';
import { ShareEffect } from '../../service/lightEffect/ShareEffect';
import { UploadToDevice } from '../../service/device/UploadToDevice';

export const EffectPreviewCard = ({name, pattern, tags, id}) => {
    const dispatch = useDispatch();
	const navigate = useNavigate();

    const handleEdit = () => {    
        dispatch(SetPattern.action(pattern));
        dispatch(SetCurrentId.action(id));

        dispatch(SetView.action('canvas'));
        navigate('/canvas');
    };

    const handleDelete = () => {
        DeleteEffect(id);
    };

    const handleShare = () => {
        ShareEffect(id);
    }

    const handleUpload = () => {
        UploadToDevice(id);
    }

    return (
        <div className='epc-container'>
            <div className='epc-name'>
                {name}
            </div>  
            <div className='epc-patter'>
                {pattern}
            </div>
            <div className='epc-tags'>
                <Tags tagList={tags}/>
            </div>
            <div className='epc-btns'>
                <div className='epc-btn' onClick={handleEdit}>
                    Edit
                </div>
                <div className='epc-btn' onClick={handleUpload}>
                    Upload
                </div>
                <div className='epc-btn' onClick={handleDelete}>
                    Delete
                </div>
                <div className='epc-btn' onClick={handleShare}>
                    Share
                </div>
            </div>
        </div>
    );
}