import React, {useRef, useState, useContext} from 'react';
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import Subcommentbox from '../Message/Subcommentbox/Subcommentbox';

const showReply = React.createContext();

export function useOpenReply() {
    return useContext(showReply);
}


function Submessage(props) {

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
    const deleteMessage = () => {}
    

    return ( 
        <>
        <section className="messageContainer">
            <div className="messageUser">{props.user}</div>
            <AccountCircleIcon className="messuser"/>
            <div className="messageText">{props.Message}</div>
            <section className="messageIconeContainer" ref={likeIcon} onClick={likeComment} >
                <FavoriteBorderIcon fontSize="small"/>
                <div ref={numLikes}>{props.likes}</div>
                <ThumbDownIcon fontSize="small" />
                {
                    !props.editable ? (
                        <div onClick={changeOpenReply}
                         style={{cursor:"pointer"}}>Reply</div>
                    ) : (
                        <div onClick={deleteMessage}
                        style={{cursor:"pointer"}}>Delete</div>
                    )
                }
            </section>
            <showReply.Provider value={changeOpenReply}>
                {openReply && <Subcommentbox 
                  autoFocus={true} />}
            </showReply.Provider>
        </section>
        </>
     );
}

export default (Submessage);