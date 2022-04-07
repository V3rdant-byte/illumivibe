import React, { useState, useEffect } from "react";
import axios from 'axios';
import Multiselect from 'multiselect-react-dropdown';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import './DashboardPage.css';
import { SetCurrentId, SetEffect, SetPattern } from "../../store/canvas";
import { EffectPreviewCard } from '../../components/EffectPreviewCard/EffectPreviewCard';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { SetView } from "../../store/navigation";

import { GetActiveDevice } from "../../service/device/GetActiveDevice";
import { CopyEffect } from "../../service/lightEffect/CopyEffect";

import { tagsOption } from '../../config/constants';

export const DashboardPage = () => {
	var state = useSelector((state) => state);
	var currentActiveDevice = state.device === undefined ? {name:"undefined", id: "???"} : state.device.activeDevice;

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(true);
	const [effectList, setEffectList] = useState([]);
	const [selectedTags, setSelectedTags] = useState([]);
	const [shareCode, setShareCode] = useState("");

	const handleEffectEdit = (pattern) => {	 //flashing, static, shifting
		dispatch(SetEffect.action({}));
		dispatch(SetPattern.action(pattern));
		dispatch(SetView.action("canvas"));
		dispatch(SetCurrentId.action(""));
        navigate('/canvas');
	}

	const handleShareCodeUpdate = (e) => {
        setShareCode(e.target.value);
    }

	const handleTagUpdate = (selectedList) => {
		setSelectedTags(selectedList);
	}

	const handleCopyEffect = () => {
		CopyEffect(shareCode);
		setShareCode("");
	}

	const buildPreviewCard = (name, pattern, tags, id) => {
		return (
			<div className='dashbord-grid-item' key={id}>
				<EffectPreviewCard name={name} pattern={pattern} tags={tags} id={id} />
			</div>
		);
	}

	const buildPreviewCardTable = () => {
		let ret = [];
		if (!isLoading) {
			effectList.forEach(effect => {
				ret.push(buildPreviewCard(effect.name, effect.pattern, effect.tags, effect.id));
			});
		}
		return ret;
	}

	useEffect(() => {
		console.log("[Dashboard] Retriving data");
		setIsLoading(true);
		GetActiveDevice();
		var data = selectedTags.length === 0 ? undefined : JSON.stringify({
			"tags": selectedTags.map((e)=>{return e.name})
		});
		var config = {
			method: 'post',
			url: 'https://illumivibe.cf/api/user/light-effect/query',
			headers: { 
				'Content-Type': 'application/json', 
				'Accept': 'application/json',
				'Authorization': state.account.accessToken
			},
			data: data
		};
		
		let res = '';
		axios(config)
		.then(function (response) {
			res=response;
			setEffectList(res.data.lighteffects);
			setIsLoading(false);
		})
		.catch(function (error) {
			console.log(error);
			setIsLoading(false);
		});
    }, [state.canvas.currentEffectList, selectedTags, state.account.accessToken]);

	return (
		<div className='dashboard-container'>
			<div className='dashboard-heading'>
				<div className='dashboard-heading-row'>
					<div className='dashboard-title'>
						Your Light Effects
					</div>
					<div className='dashboard-select-tag'>
						<Multiselect
							options={tagsOption}
							selectedValues={selectedTags}
							onSelect={(e)=> {handleTagUpdate(e)}}
							onRemove={(e)=> {handleTagUpdate(e)}}
							placeholder="Search effect by tags"
							displayValue="name"
							showArrow={true}
						/>
					</div>
				</div>
				<div className='dashboard-heading-row2'>
					<div className='dashboard-subtitle'>
						Current active device: {currentActiveDevice.name}
					</div>
					<div className='dashboard-share-code'>
						<TextField 
							id="effect-name" 
							label="Enter Effect Share Code" 
							variant="outlined"
							size="small"
							value={shareCode}
							onChange={(e)=>handleShareCodeUpdate(e)}
							style={{"marginLeft": "25px"}}
						/>
						<Button
							size="medium"
							color="secondary"
							variant="outlined"
							style={{"marginLeft": "20px"}}
							onClick={handleCopyEffect}
						>
							Add by share code
						</Button>
					</div>
				</div>
			</div>
			{isLoading ? <div className='dashboard-grid'>Loading...</div> :
			<div className='dashboard-grid'>
				<div className="dashbord-grid-item dashboard-new-effect">
					<div className="dashboard-new-effect-title">
						Create New Effect
					</div>
					<div className="dashboard-new-effect-sub-title">
						Choose a pattern to create effect from
					</div>
					<div className="dashboard-choose-pattern">
						<div className="dashboard-pattern-choice" onClick={()=>handleEffectEdit("static")}>
							static
						</div>
						<div className="dashboard-pattern-choice dashboard-choice-border" onClick={()=>handleEffectEdit("shifting")}>
							shifting
						</div>
						<div className="dashboard-pattern-choice" onClick={()=>handleEffectEdit("flashing")}>
							flashing
						</div>
					</div>
				</div>
				{buildPreviewCardTable()}
			</div>
			}
      </div>
	);

	// if (!isLoading)
	// {
	// 	return (
	// 	<div className='dashboard-container'>
	// 		<div className='dashboard-heading'>
	// 			<div className='dashboard-heading-row'>
	// 				<div className='dashboard-title'>
	// 					Your Light Effects
	// 				</div>
	// 				<div className='dashboard-select-tag'>
	// 					<Multiselect
	// 						options={options}
	// 						selectedValues={selectedTags}
	// 						onSelect={(e)=> {handleTagUpdate(e)}}
	// 						onRemove={(e)=> {handleTagUpdate(e)}}
	// 						placeholder="Search by tags"
	// 						displayValue="name"
	// 						showArrow={true}
	// 					/>
	// 				</div>
	// 			</div>
	// 			<div className='dashboard-heading-row'>
	// 				<TextField 
	// 					id="effect-name" 
	// 					label="Enter Effect Share Code" 
	// 					variant="outlined"
	// 					value={shareCode}
	// 					onChange={(e)=>handleShareCodeUpdate(e)}
	// 					style={{"marginLeft": "25px"}}
	// 				/>
	// 				<Button 
	// 					size="small"
	// 					color="secondary"
	// 					variant="outlined"
	// 					style={{"marginLeft": "20px"}}
	// 					onClick={() => {}}
	// 				>
	// 					Add by share code
	// 				</Button>
	// 			</div>
	// 		</div>
	// 		<div className='dashboard-grid'>
	// 			<div className="dashbord-grid-item dashboard-new-effect">
	// 				<div className="dashboard-new-effect-title">
	// 					Create New Effect
	// 				</div>
	// 				<div className="dashboard-new-effect-sub-title">
	// 					Choose a pattern to create effect from
	// 				</div>
	// 				<div className="dashboard-choose-pattern">
	// 					<div className="dashboard-pattern-choice" onClick={()=>handleEffectEdit("static")}>
	// 						static
	// 					</div>
	// 					<div className="dashboard-pattern-choice dashboard-choice-border" onClick={()=>handleEffectEdit("shifting")}>
	// 						shifting
	// 					</div>
	// 					<div className="dashboard-pattern-choice" onClick={()=>handleEffectEdit("flashing")}>
	// 						flashing
	// 					</div>
	// 				</div>
	// 			</div>
	// 			{buildPreviewCardTable()}
	// 		</div>
    //   </div>
  	// );
	// }
  	// else {
	// 	return(<div className='dashboard-container'>
	// 		Loading...
	// 	</div>);
  	// }
}
