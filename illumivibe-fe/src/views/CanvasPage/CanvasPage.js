import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './CanvasPage.css';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SetView } from "../../store/navigation";

import { TextField } from '@mui/material';
import { HexColorPicker } from "react-colorful";
import Multiselect from 'multiselect-react-dropdown';
import { Button } from '@material-ui/core';

import { CreateEffect } from '../../service/lightEffect/CreateEffect';
import { UpdateEffect } from '../../service/lightEffect/UpdateEffect';

import { defaultColorArray, tagsOption } from '../../config/constants';

export const CanvasPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(true);

	const state = useSelector((state) => state);
	const effect = state.canvas === undefined ? {name:'unknown'} : state.canvas.currentEffect;
	const newEffect = state.canvas.currentId === '' ? true : false;
	const pattern = state.canvas === undefined ? {name:'unknown'} : state.canvas.currentPattern;
	const id = state.canvas === undefined ? '' : state.canvas.currentId;

	const [effectName, setEffectName] = useState(effect.name === undefined ? "" : effect.name);

	const [selectedTags, setSelectedTags] = useState([]);
	const [color, setColor] = useState("#000000");
	const [colorArr1, setColorArr1] = useState(defaultColorArray);
	const [colorArr2, setColorArr2] = useState(defaultColorArray);
	const [period, setPeriod] = useState(effect.period === undefined ? 1000 : effect.period);

	const getPatternPrompt = () => {
		let prompt = "";
		if (pattern === "static") {
			prompt = "Your color effect will be static, repeated every meter on your LED strip.";
		}
		else if (pattern === "shifting") {
			prompt = "Your color effect will be shifting from start to end of your LED strip.";
		}
		else if (pattern === "flashing") {
			prompt = "Your color effect will be flashing between effect 1 and effect 2 every second";
		}
		return prompt;
	}

	const handleNameUpdate = (e) => {
		setEffectName(e.target.value)
	}

	const handlePeriodUpdate = (e) => {
		if (isNaN(e.target.value)) {
			alert("period must be an integer");
		}
		else if (e.target.value > 3600) {
			alert("period cannot be bigger than 3600 seconds");
		}
		else {
			setPeriod(e.target.value);
		}
	}

	const generateColorContent = () => {
		var content = [];
		content.push(colorArr1);
		if (pattern === "flashing") {
			content.push(colorArr2);
		}
		return content;
	}

	const handleSave = () => {
		if (effectName === "") {
			alert("Effect name cannot be empty");
			return;
		}
		var effectData = {
			id: newEffect ? "" : id,
			name: effectName,
			tags: selectedTags.map(e=>{return e.name}),
			period: period,
			pattern: pattern,
			content: generateColorContent()
		}

		if(newEffect) {
			CreateEffect(effectData);
			alert("Effect Created!");
			dispatch(SetView.action('dashboard'));
        	navigate('/dashboard');
		}
		else {
			UpdateEffect(effectData);
			alert("Effect Change Saved!");
			dispatch(SetView.action('dashboard'));
        	navigate('/dashboard');
		}
	}

	const handleCancel = () => {
		dispatch(SetView.action('dashboard'));
        navigate('/dashboard');
	}

	const handleTagUpdate = (selectedList) => {
		setSelectedTags(selectedList);
	}

	const updateArr = (arrIndex, index) => {
		if (arrIndex === 1) {
			let tmp = [...colorArr1];
			tmp[index] = color;
			setColorArr1(tmp);
		}
		else {
			let tmp = [...colorArr2];
			tmp[index] = color;
			setColorArr2(tmp);
		}
	}

	const buildEffectArr = (arrIndex) => {
		let effectArr = '';
		if (arrIndex === 1) {
			effectArr = colorArr1.map((color, index) => {
				return (
					<div 
						className='canvas-grid-item'
						style={{"backgroundColor": colorArr1[index]}}
						onClick={() => updateArr(1, index)}>
					</div>
				);
			});
		}
		else {
			effectArr = colorArr1.map((color, index) => {
				return (
					<div 
						className='canvas-grid-item'
						style={{"backgroundColor": colorArr2[index]}}
						onClick={() => updateArr(2, index)}>
					</div>
				);
			});
		}
		return effectArr;
	}

	useEffect(() => {
		if(!newEffect) {
			var config = {
				method: 'get',
				url: 'https://illumivibe.cf/api/user/light-effect/' + id + "/detail",
				headers: { 
					'Content-Type': 'application/json', 
					'Accept': 'application/json',
					'Authorization': state.account.accessToken
				}
			};
			
			let res = '';
			axios(config)
			.then(function (response) {
				res=response;
				setEffectName(res.data.name);

				setSelectedTags(res.data.tags.map(e=>{return {
					name: e,
					id: e
				}}));
				setPeriod(res.data.period);
				setColorArr1(res.data.content['0']);
				setColorArr2(res.data.content['1']);
				setIsLoading(false);
			})
			.catch(function (error) {
				console.log(error);
			});
		}
		else {
			setIsLoading(false);
		}
	}, [id, newEffect, state.account.accessToken]);

	const generateCanvas = () => {
		return(
			<div className='canvas-main'>
				<div className='canvas-heading'>
					<div className='canvas-title'>
						{newEffect ? "Create New Effect" : "Edit Effect"}
					</div>
				</div>
				<div className='canvas-body'>
					<div className='canvas-main-prompt canvas-padding'>
						{getPatternPrompt()}
					</div>
					<div className='canvas-name canvas-padding'>
						<TextField 
							id="effect-name" 
							label="Effect Name" 
							variant="outlined"
							placeholder={effectName}
							value={effectName}
							onChange={(e)=>handleNameUpdate(e)}
							style={{"paddingRight": "30px"}}
						/>
						<TextField 
							id="effect-name" 
							label="Effect Pattern" 
							variant="outlined"
							disabled
							placeholder={pattern}
							value={pattern}
						/>
					</div>
					<div className='canvas-tags canvas-padding'>
						<div className='canvas-main-guide'>
							Tags
						</div>
						<Multiselect
							options={tagsOption}
							selectedValues={selectedTags}
							onSelect={(e)=> {handleTagUpdate(e)}}
							onRemove={(e)=> {handleTagUpdate(e)}}
							placeholder="Search by tags"
							displayValue="name"
							showArrow={true}
							style={{"height":"100px"}}
						/>
					</div>
					<div className='canvas-main-guide canvas-padding'>
						Effect Color (every row is a set of effect):
					</div>
					<div className='canvas-grid canvas-padding'>
						{buildEffectArr(1)}
						{pattern === "flashing" ? buildEffectArr(2) : ""}
					</div>
					{ pattern === "flashing" || pattern === "shifting" ? 
						<div className='canvas-name canvas-padding'>
							<TextField 
								id="effect-name" 
								label="Flashing Period" 
								variant="outlined"
								placeholder={period}
								value={period}
								onChange={(e)=>handlePeriodUpdate(e)}
							/> 
						</div>	
						: ""
					}
				</div>
			</div>
		);
	};

	if (!isLoading) {
		return (
			<div className='canvas-container'>
				{generateCanvas()}
				<div className='canvas-color'>
					<div className='canvas-heading'>
						<div className='canvas-title'>
							Color Picker
						</div>
					</div>
					<div className='canvas-color-guide'>
						1. Choose a color here
					</div>
					<div className='canvas-color-guide'>
						2. Click a square to fill
					</div>
					<div className='canvas-color-guide'>
						Current color chosen:
					</div>
					<div className='canvas-color-preview' style={{"backgroundColor": color}}>
						
					</div>
					<div className='canvas-color-picker'>
						<HexColorPicker color={color} onChange={setColor} />
					</div>
					<div className='canvas-btn'>
						<Button 
							variant="contained"
							color="primary"
							onClick={handleSave}
						>
							{newEffect ? "Create" : "Save"}
						</Button>
					</div>
					<div className='canvas-btn'>
						<Button 
							variant="contained"
							onClick={handleCancel}
						>
							Cancel
						</Button>
					</div>
				</div>
			</div>
		);
	}
	else {
		return(
			<div className='canvas-container'>
				Loading...
			</div>
		)
	}
	
}
