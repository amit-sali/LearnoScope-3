import React from 'react';
import { useEffect, useState } from 'react';
import '../Styles/VideoWatchSection.css';
import { useContext } from 'react';
import LoggedInStatusContext from '../Context/LoggedInStatus/LoggedInStatusContext';
import ApplicationModeContext from '../Context/ApplicationMode/ApplicationModeContext';
import UserDataContext from '../Context/UserData/UserDataContext';
import Vedionote from './Vedionote'
import ReminderCard from '../Components/ReminderCard'


export default function VideoWatchSection() {
  const applicationMode = useContext(ApplicationModeContext);
    const is_loggedin = useContext(LoggedInStatusContext);
    const userData = useContext(UserDataContext);
    const [currTimeSec, setCurrTime] = useState(0);
    useEffect(() => {
        if (applicationMode.mode === "light") {
            document.getElementById("Video_metadata").style.color = "#282828";
            document.getElementById("accordion_item").style.backgroundColor = "white";
            document.getElementById("accordion_item").style.borderColor = "#282828";
            document.getElementById("accordian_body").style.color = "#282828";
            document.getElementById("notes").style.color = "#282828";
            document.getElementById("notes").style.borderColor = "#282828";
        }
        else {
            document.getElementById("Video_metadata").style.color = "white";
            document.getElementById("accordion_item").style.backgroundColor = "#282828";
            document.getElementById("accordion_item").style.borderColor = "white";
            document.getElementById("accordian_body").style.color = "white";  
            document.getElementById("notes").style.color = "gray";
            document.getElementById("notes").style.borderColor = "white";
        }
        if (localStorage.getItem("userEmail") !== null) {
            is_loggedin.setLoggedin(true);
        }

        if (userData.currentVideoChannelName === "") {
            userData.setCurrentVideoLink(localStorage.getItem("CurrentVideoLink"));
            userData.setCurrentVideoTitle(localStorage.getItem("CurrentVideoTitle"));
            userData.setCurrentVideoChannelName(localStorage.getItem("CurrentVideoChannelName"));
            userData.setCurrentVideoLikes(localStorage.getItem("CurrentVideoLikes"));
            userData.setCurrentSno(localStorage.getItem("CurrentSno"));
            userData.setCurrentVideoDesc(localStorage.getItem("CurrentVideoDesc"));
            userData.setCurrentVideoNotes(localStorage.getItem("CurrentVideoNotes"));
            userData.setCurrentVideoChannelPhoto(localStorage.getItem("CurrentVideoChannelPhoto"));
        }
    })

    const increaseLikeCount = () => {
        likeVideo(userData.currentSno);
    }

    async function likeVideo(sno) {
        let userObject = {
            "sno": sno,
            "email": localStorage.getItem("userEmail")
        }
        await fetch(`${userData.backendApi}/likeVideo/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userObject),
        }).then(response => response.json()).then((data) => {
            if (data.status === 200) {
                document.getElementById("likeBtnSvg").style.color = "rgb(19, 124, 237)";
                userData.setCurrentVideoLikes((userData.currentVideoLikes) + 1);
            }
            else {
            }
        })
    }

    let setReminder = () => {
        console.log("clicked reminder btn");
        document.getElementById("VideoWatchSection").style.display = "none";
        document.getElementById("ReminderCard").style.display = "block";
    }

   let reportVideo = ()=>{
       console.log("clicked report btn");
       asyncReportVideo(userData.currentSno);
   }

   async function asyncReportVideo(sno) {
    let userObject = {
        "sno": sno,
        "email": localStorage.getItem("userEmail")
    }
    await fetch(`${userData.backendApi}/reportVideo/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userObject),
    }).then(response => response.json()).then((data) => {
        if (data.status === 200) {
         alert(data.response);
        }
        else {
         alert(data.response);
        }
    })
}
    //Functions for handling hover effect for like, share ...btns
    const DisplayLikeText = () => {
        document.getElementById("likeBtnText").style.display = "block";
    }
    const HideLikeText = () => {
        document.getElementById("likeBtnText").style.display = "none";
    }

    // const DisplayShareText = () => {
    //     document.getElementById("shareBtnText").style.display = "block";
    // }
    // const HideShareText = () => {
    //     document.getElementById("shareBtnText").style.display = "none";
    // }

    const DisplayWatchLaterText = () => {
        document.getElementById("wlBtnText").style.display = "block";
    }
    const HideWatchLaterText = () => {
        document.getElementById("wlBtnText").style.display = "none";
    }

    const DisplayReportText = () => {
        document.getElementById("reportBtnText").style.display = "block";
    }
    const HideReportText = () => {
        document.getElementById("reportBtnText").style.display = "none";
    }
    const setTimeHere = () => {
        setCurrTime(document.getElementById('ActualVideo').currentTime)
    }
    return (
        <>
            <div id="VideoWatchSection" className="VideoWatchSection">
                <div className='VideoPlaySection my-4'>
                    <div className="VideoPlayer">
                        <div className="Video">
                            <video id="ActualVideo" controlsList="nodownload" src={userData.currentVideoLink} className="VideoTag" type="video/mp4" controls>
                            </video>
                        </div>

                        <div className="VideoMetaData" id="Video_metadata">
                            <div className="VideoTitle" >
                                {userData.currentVideoTitle}
                            </div>

                            <div className="LikeShareWatchLaterReportBtns">
                                <span style={{ display: "flex", flexDirection: "column" }}>
                                    {/* likebutton */}

                                    <div id="likeBtnDiv" onClick={increaseLikeCount}>
                                        <svg id="likeBtnSvg" xmlns="http://www.w3.org/2000/svg" style={{ height: "35px", width: "35px", margin: "5px 10px" }} onMouseEnter={DisplayLikeText} onMouseLeave={HideLikeText} fill="currentColor" className=" VideoMetaBtn bi bi-hand-thumbs-up-fill" viewBox="0 0 16 16" >
                                            <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" />
                                        </svg>
                                    </div>
                                    <p className="likeCountText" id="likeBtnText">{userData.currentVideoLikes} Likes</p>
                                </span>

                                {/* <span style={{ display: "flex", flexDirection: "column" }}>
                                    sharebutton 
                                    <svg xmlns="http://www.w3.org/2000/svg" onMouseEnter={DisplayShareText} onMouseLeave={HideShareText} style={{ height: "35px", width: "35px", margin: "5px 10px" }} fill="currentColor" className="VideoMetaBtn bi bi-send-fill" viewBox="0 0 16 16">
                                        <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                                    </svg>
                                    <p id="shareBtnText">Share</p>
                                    </span> */}

                                <span onClick={setReminder} style={{ display: "flex", flexDirection: "column" }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" onMouseEnter={DisplayWatchLaterText} onMouseLeave={HideWatchLaterText} style={{ height: "35px", width: "35px", margin: "5px 10px" }} fill="currentColor" className="VideoMetaBtn bi bi-watch" viewBox="0 0 16 16">
                                        <path d="M8.5 5a.5.5 0 0 0-1 0v2.5H6a.5.5 0 0 0 0 1h2a.5.5 0 0 0 .5-.5V5z" />
                                        <path d="M5.667 16C4.747 16 4 15.254 4 14.333v-1.86A5.985 5.985 0 0 1 2 8c0-1.777.772-3.374 2-4.472V1.667C4 .747 4.746 0 5.667 0h4.666C11.253 0 12 .746 12 1.667v1.86a5.99 5.99 0 0 1 1.918 3.48.502.502 0 0 1 .582.493v1a.5.5 0 0 1-.582.493A5.99 5.99 0 0 1 12 12.473v1.86c0 .92-.746 1.667-1.667 1.667H5.667zM13 8A5 5 0 1 0 3 8a5 5 0 0 0 10 0z" />
                                    </svg>
                                    <p id="wlBtnText">Remind me</p></span>
                              
                                <span onClick={reportVideo} style={{ display: "flex", flexDirection: "column" }}>
                                    {/* reportbutton */}
                                    <svg xmlns="http://www.w3.org/2000/svg" onMouseEnter={DisplayReportText} onMouseLeave={HideReportText} style={{ height: "35px", width: "35px", margin: "5px 10px" }} fill="currentColor" className="VideoMetaBtn bi bi-shield-fill-exclamation" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm-.55 8.502L7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0zM8.002 12a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                                    </svg>
                                    <p id="reportBtnText">Report</p></span>
                            </div>
                        </div>

                        <div className="accordion" id="accordionExample" >
                            <div id="accordion_item" className="accordion-item" style={{"border":"none"}}>
                                <h2 className="accordion-header">
                                    <button id="ChannelInfo" className="accordion-button ChannelInfo" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" style={{"backgroundColor":"white"}}>
                                        <div className="ChannelPic"><img src={userData.currentVideoChannelPhoto} style={{ borderRadius: "50%" }} height="50px" width="50px" alt=".." /></div>
                                        <div className="ChannelName">{userData.currentVideoChannelName}</div>
                                    </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                    <div id="accordian_body" className="accordion-body">
                                        <strong>Description : </strong>
                                        <br />
                                        {userData.currentVideoDesc}
                                        <br />
                                        <br />
                                        <strong> <a target="blank" href={userData.currentVideoNotes}>Access Notes File</a></strong>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div id="notes" className="my-2 QuizSection">
                        <h3 style={{ padding: "8px" }} >Add Your Notes Here : </h3>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Vedionote cuTime={currTimeSec} setTime={setTimeHere} />
                        </div>
                    </div>

                </div>
            </div>

            <div className='d-flex justify-content-center my-4'>
                <ReminderCard />
            </div>

        </>

    )
}
