import React, {useRef, useState, useContext} from 'react';
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import Commentbox from '../Commentbox';
import Submessage from '../Submessage/Submessage';
import '../commentbox.css'

const showReply = React.createContext();

export function useOpenReply() {
    return useContext(showReply);
}



function Message(props) {

    const likeIcon = useRef();
    const numLikes = useState();

    const [arrowup, setarrowup]= useState(false);
    const [openReply, setopenReply] = useState(false);

    //toggal when cancale and reply is pressed;

    const changeOpenReply = () => {
        setopenReply(prevState => prevState = !prevState);
    }

    //toggal arrow up down

    let arrow = <ArrowDropDownIcon />

    const changeArrow = () => {
        setarrowup(prevState => prevState = !prevState);
    }
    if(arrowup){
        arrow =  <ArrowDropDownIcon />;
    }else{
        arrow = <ArrowDropUpIcon/>;
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
                {openReply && <Commentbox 
                  autoFocus={true} />}
            </showReply.Provider>
            <section className="arrowReplies" onClick={changeArrow}>
                <div>{arrow}View 4 Replies</div>
            </section>
            { arrowup && (
            <section className="subMessage">
                    <Submessage user="Niraj" Message="niraj is a good boy" likes={2} />
            </section>
            )}
        </section>
        
        </>
     );
}

export default (Message);