import React from 'react'
import {Channel, useChatContext} from "stream-chat-react";

import {ChannelInner, CreateChannel, EditChannel, GroupMessage} from "./";

const ChannelContainer = ({ isCreating, isEditing, setIsCreating, setIsEditing, createType}) => {

  if(isCreating) {
    return (
      <div className='channel__container'>
        <CreateChannel setIsCreating={setIsCreating}  createType={createType}/>
      </div>
    )
  }

  if(isEditing) {
    return (
      <div className='channel__container'>
        <EditChannel setIsEditing={setIsEditing}/>
      </div>
    )
  }

  const EmptyState = () =>(
    <div className='channel-empty__container'>
      <p className='channel-empty__first'></p>
      <p className='channel-empty__secons'></p>
    </div>
  )
  return (
    <div className='channel__container'>
      <Channel
      />
      </div>
  )
}

export default ChannelContainer