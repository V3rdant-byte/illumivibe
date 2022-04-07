import React from 'react';
import './Tags.css';
import tagIcon from '../../assets/tag.png';

export const Tags = ({tagList}) => {

    const buildTag = (tag) => {
        return (
            <span className='epc-tag' key={tag}>
                <img src={tagIcon} alt="tag-icon" className='tag-icon' /> 
                <div className='tag-name'>
                    {tag}
                </div>
            </span>
        );
    };

    const buildTags = () => {
        let ret = [];
        if (!tagList) {
            return;
        }
        tagList.forEach(tag => {
            ret.push(buildTag(tag));
        });
        return ret;
    }

    return (
        <div className='tags-container'>
            {buildTags()}
        </div>
    );
}