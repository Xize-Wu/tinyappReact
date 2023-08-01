import React from 'react';

export default function Remove(props) {
    return (
        <div className='confirm_delete-container'>
            <p>Delete this short Url?</p>
            <div className="buttons">
                <button onClick={() => { }}>Delete</button >
                <button onClick={() => props.setRemove(false)}>Cancel</button>
            </div>

        </div>
    )
}