const fs = require('fs')
const SpotifyWebApi = require('spotify-web-api-node');
const token ="BQA57LAiqUffUF1zhYpLQX5UAbEkL-Ljk3es99x1dfI3JfgDXYK66Ud5Kes2W9btNu1fDTP3BuEZAQjSlQki_3yGrydlaxogzSvHcmpKp4GKVGj3WlffTL3tZ5HLdspjIaG9CrePpIEJkSBUrGXaLdNnGiAgFIWPfiDIxELYjPPzMiE8mkU1rjeNHcRAFEQIyEKdHTZGTljo2nxL_f5Oudl017dBK_nRIMaWlvYNo54zyqLKCnUsQzly6WjuVWpuJ3GJHz6xKQY5vhOc9xrHoNZTlmysDHrixfp7TruO_LxC7Cf8jcl8";
const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);

//input: nameof the song as string
async function getSearchResult (song){

    const data = await spotifyApi.search(song,['track'],  {
        offset: 1,
        limit: 10
      });

      let Names = [];
      let Artists=[];
      let Tags=[];
      let ID=[];
  
  for (let track_obj of data.body.tracks.items) {
    const name = track_obj.name;
    const artist=track_obj.artists;
    const reference=track_obj.href;
    const track_id=track_obj.id;
 

    for (let artist_obj of artist) {
        // console.log("artist: "+ artist_obj.name +"\n");
        Artists.push(artist_obj.name );
    }

    Names.push(name);
    ID.push(track_id);
  }
  console.log(ID);

  //merge two list together
  var merged_nameArtist =
  Names.map(function(e, i) {
    return {
      Name: e,
      Artist: Artists[i]
    };
  })
  console.log(merged_nameArtist);

  

  //after the front end give me the correcponding song,search for index which one is the correct one
 //then get the tag
  const feature_data=await spotifyApi.getAudioFeaturesForTrack("7vguMCv8uVuZLiQJ156u3Z"); //this is the sample id, should be replaced by id returned froom front end
  const tag=feature_data.body.danceability;
  console.log(tag);



// console.log(merged_nameArtist);
console.log("---------------+++++++++++++++++++++++++");
  }




getSearchResult('PLAY');
