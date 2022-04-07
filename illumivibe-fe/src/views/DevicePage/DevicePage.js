import React, {useState, useEffect} from "react";
import './DevicePage.css';
import { DeviceCard } from "../../components/DeviceCard/DeviceCard";
import { TextField } from '@mui/material';
import { Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { PutDevice } from "../../service/device/PutDevice";
import { GetDeviceList } from "../../service/device/GetDeviceList";
import { GetActiveDevice } from "../../service/device/GetActiveDevice";

export const DevicePage = () => {
    const state = useSelector((state) => state);
    var currentActiveDevice = state.device === undefined ? {name:"undefined", id: "???"} : state.device.activeDevice.name;
    var deviceList = state.device === undefined ? [] : state.device.deviceList;

    const [deviceName, setDeviceName] = useState("");
    const [uuid, setUuid] = useState("");

    const handleNameUpdate = (e) => {
        setDeviceName(e.target.value);
    }

    const handleUuidUpdate = (e) => {
        setUuid(e.target.value);
    }

    const handleCancel = () => {
        setDeviceName("");
        setUuid("");
    }

    const handleRegister = () => {
        if (deviceName === "") {
            alert("[Registration Failed] Device name cannot be empty");
        }

        if (uuid.length !== 8) {
            alert("[Registration Failed] Please enter a valid 8 digit UUID");
        }

        PutDevice(uuid, deviceName);
        setDeviceName('');
        setUuid('');
    }

    const buildDeviceCards = () => {
        const deviceCards = deviceList.map((device, index) => {
            return (
                <DeviceCard
                    key={index}
                    deviceName={device.name}
                    deviceId={device.id}
                />
            );
        });
        return deviceCards;
    }

    useEffect(() => {
        GetDeviceList();
        GetActiveDevice();
    },[]);
    
    return (
        <div className='device-container'>
            <div className='device-registration'>
                <div className='device-title'>
                    Register a new device
                </div>
                <div className="device-items">
                    <TextField 
                        id="effect-name" 
                        label="Enter Device Name" 
                        variant="outlined"
                        placeholder={deviceName}
                        value={deviceName}
                        onChange={(e)=>handleNameUpdate(e)}
                        style={{"marginRight": "30px"}}
                    />
                    <TextField 
                        id="effect-name" 
                        label="Enter 8 Digit Device ID" 
                        variant="outlined"
                        placeholder={uuid}
                        value={uuid}
                        onChange={(e)=>handleUuidUpdate(e)}
                    />
                </div>
                <div className="device-btns">
                    <Button 
                        variant="outlined"
                        style={{"marginRight": "30px"}}
                        onClick={handleRegister}
                    >
                        Register
                    </Button>
                    <Button 
                        variant="outlined"
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
            <div className="device-active">
                <div className="device-title">
                    Current Active Device: 
                </div>
                <div className="device-sub-title">
                    {" " + currentActiveDevice}
                </div>
            </div>
            <div className='device-grid'>
                {buildDeviceCards()}
            </div>
        </div>
    );
}