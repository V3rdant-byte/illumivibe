import React from 'react';
import './DeviceCard.css';
import { Button } from '@material-ui/core';

import { DeleteDevice } from '../../service/device/DeleteDevice';
import { ActivateDevice } from '../../service/device/ActivateDevice';

export const DeviceCard = ({deviceName, deviceId}) => {

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this device?") === true) {
            DeleteDevice(deviceId);
        }
    };
    const handleSetActive = () => {
        ActivateDevice({
            name: deviceName,
            id: deviceId
        });
    }
    return (
        <div className='dc-container'>
            <div className='dc-title'>
                {deviceName}
            </div>
            <div className='dc-subtitle'>
                {deviceId}
            </div>
            <div className='dc-btns'>
                <div className='dc-btn'>
                    <Button 
                        variant="outlined"
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                    <Button 
                        variant="outlined"
                        onClick={handleSetActive}
                        style={{"marginLeft":"20px"}}
                    >
                        Set as Active
                    </Button>
                </div>
            </div>
        </div>
    );
}