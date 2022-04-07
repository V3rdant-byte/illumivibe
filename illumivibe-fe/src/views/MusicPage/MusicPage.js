import React, {useState} from 'react';
import './MusicPage.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { TextField } from '@mui/material';
import { Button } from '@material-ui/core';

export const MusicPage = () => {
	var state = useSelector((state) => state);

	const [musicName, setMusicName] = useState("");
	const [musicList, setMusicList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isGenerating, setIsGenerating] = useState(false);

	const handleNameUpdate = (e) => {
		setMusicName(e.target.value);
	};
	
	const handleSearch = () => {
		setIsLoading(true);

		var config = {
			method: 'get',
			url: 'https://illumivibe.cf/api/user/spotify/search?track=' + musicName,
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
			setMusicList(res.data);
			setMusicName('');
		})
		.catch(function (error) {
			console.log(error);
		});
		setIsLoading(false);
	};

	const handleGenerate = (trackId) => {
		setIsGenerating(true);

		var config = {
			method: 'post',
			url: 'https://illumivibe.cf/api/user/spotify/generate?trackId=' + trackId,
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
			console.log(res);
			setIsGenerating(false);
			alert("Effect generated!");
		})
		.catch(function (error) {
			setIsGenerating(false);
			console.log(error);
		});
	};

	const buildMusicItem = (name, artist, trackId) => {
		return (
			<div className='music-item' key={trackId}>
				<div className='music-item-name'>{name}</div>
				<div className='music-item-artist'>{artist}</div>
				<Button 
					variant="outlined"
					onClick={() => handleGenerate(trackId)}
					style={{"marginRight": "30px"}}
				>
					Generate
				</Button>
			</div>
		);
	};

	const buildMusicList = () => {
		const musicListTmp = [];
		musicList.forEach((music) => {
			musicListTmp.push(buildMusicItem(music.name, music.artist, music.id));
		});
        return musicListTmp;
	};

	return (
		<div className='music-container'>
			<div className='music-search'>
				<div className='music-title'>
					Search music to generate effect for
				</div>
				<div className='music-entry'>
					<TextField 
						id="effect-name" 
						label="Search song" 
						variant="outlined"
						value={musicName}
						onChange={(e)=>handleNameUpdate(e)}
						style={{"marginRight": "30px", "width": "25em"}}
					/>
					<Button 
                        variant="outlined"
                        onClick={handleSearch}
                    >
                        Search
                    </Button>
				</div>
			</div>
			{isLoading ? <div className='music-info'>
				Searching...
			</div> : isGenerating ? <div className='music-info'>
				Generating Effect...
			</div> : (musicList && musicList.length > 0) ? <div className='music-list'>
				{buildMusicList()}
			</div> : <div className='music-info'>
				No results available
			</div>}
			
		</div>
	);
}
