import React, {useRef, useState, useContext} from 'react';
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Commentbox from '../Commentbox';
import '../commentbox.css'

const showReply = React.createContext();

export function useOpenReply() {
    return useContext(showReply);
}



function Message(props) {

    const likeIcon = useRef();
    const numLikes = useState();

    const [openReply, setopenReply] = useState(false);

    //toggal when cancale and reply is pressed;

    const changeOpenReply = () => {
        setopenReply(prevState => prevState = !prevState);
    }

    //like message
    let toglike = false;
    let likes = props.likes;
    const likeComment = () => {
        toglike = !toglike;
        if(toglike){
            likes++;
            likeIcon.current.style.color = "#4688de"
        }else{
            likes--;
            likeIcon.current.style.color = "gray";
        }
        numLikes.current.innerHTML = likes;
    }
    

    return ( 
        <>
        <section className="messageContainer">
            <div className="messageUser">{props.user}</div>
            <AccountCircleIcon className="messuser"/>
            <div className="messageText">{props.Message}</div>
            <section className="messageIconeContainer" ref={likeIcon} onClick={likeComment} >
                <FavoriteBorderIcon fontSize="small"/>
                <div ref={numLikes}>{props.likes}</div>

            </section>
            <showReply.Provider value={changeOpenReply}>
                {openReply && <Commentbox 
                  autoFocus={true} />}
            </showReply.Provider>
            
        </section>
        
        </>
     );
}

export default (Message);