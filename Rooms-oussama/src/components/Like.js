import React from "react";
import likeimage from "../images/like.png"

export default function Like() {
    return(
        <>
            <img className="post-like" src={likeimage} width="20px" />
        </>
    )
}