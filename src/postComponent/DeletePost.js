import React, { useState } from "react";

 export function DeletePost({ titles }) {
    const [selectedOpt, setSelectedOpt] = useState('')
    const deletePostByTitle = () => {
        fetch(`http://localhost:3000/api/blog/${selectedOpt}`, { method: 'DELETE' }).then(
            window.location.reload()
        ).catch(err => console.log(err));
            
    }
    return (
        <div>
            <div>Delete based on title</div>
            <select value={selectedOpt} onChange={(e) => setSelectedOpt(e.target.value)}>
                {titles.map((title, index) => <option value={title} key={`ti${index}`}>{title}</option>)}
            </select>
            <button onClick={deletePostByTitle} >Delete</button>
        </div>
    )
}