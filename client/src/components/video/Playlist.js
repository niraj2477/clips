import {
   
    Grid,
    makeStyles,
   
  } from "@material-ui/core";
  import React, { useState } from "react";
  import Button from "@material-ui/core/Button";
  import PlaylistPopup from "./PlaylistPopup";
  import CreatePlaylist from "./CreatePlaylist";
  import { addVideoToPlaylist } from "../../apis/UserPlaylist";
  import List from "./List";
  const useStyle = makeStyles((theme) => ({
    root: {
      "& .MuiFormControl-root": {
        width: "80%",
        margin: theme.spacing(1),
      },
      button: {
        margin: theme.spacing(2),
  
        paddingRight: theme.spacing(5),
      },
    },
  }));
  
  export default function Playlist(props) {
    const classes = useStyle();
  
  const [openAddPlaylistPopup, setAddPlaylistPopup] = useState(false);
    const { data,video } = props;
    
    
    const addPlaylist = () => {
        setAddPlaylistPopup(true)
       
      };

    //   const Fruits = [
    //     { name: 'Apple' },
    //     { name: 'Apricot' },
    //     { name: 'Honeyberry' },
    //     { name: 'Papaya' },
    //     { name: 'Jambul' },
    //     { name: 'Plum' },
    //     { name: 'Lemon' },
    //     { name: 'Pomelo' }
    //   ];
    
    return (
    
        <Grid container>
          <PlaylistPopup openPopup={openAddPlaylistPopup} title="Create Playlist" setOpenPopup={setAddPlaylistPopup}>
          <CreatePlaylist setOpenPopup={setAddPlaylistPopup} />
            </PlaylistPopup>
          <Grid item xs={6}>
          <div>
          <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        margin: '0px',
      }}>
      <h4>Select Playlist</h4>
  
      {data.map((data) => {
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              width: '200px',
              margin: '20px',
              backgroundColor: 'lightblue',
              cursor: 'pointer',
            }}
             onClick={()=>{
              addVideoToPlaylist(data._id,video._id)
              .then((result)=>{
                  console.log("successfully added")
                //   close(false)
              })
              .catch((err)=>{
                  console.log("Error")
              })
             }}
           >
              
            <List name={data.name} 
             />
          </div>
        );
      })}
    </div>
        </div>
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              onClick={addPlaylist}
            >
              Add
            </Button>
           
          </Grid>
        </Grid>
      
    );
  }
  