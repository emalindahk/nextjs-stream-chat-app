import React from "react";
import { Channel, useChatContext, MessageTeam , MessageInput} from "stream-chat-react";

import { ChannelInner, CreateChannel, EditChannel, GroupMessage } from "./";

const ChannelContainer = ({
  isCreating,
  isEditing,
  setIsCreating,
  setIsEditing,
  createType,
}) => {
  const {channel} = useChatContext();
  if (isCreating) {
    return (
      <div className="channel__container">
        <CreateChannel setIsCreating={setIsCreating} createType={createType} />
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="channel__container">
        <EditChannel setIsEditing={setIsEditing} />
      </div>
    );
  }

  const EmptyState = () => (
    <div className="channel-empty__container">
      <p className="channel-empty__first">
        This is the beginning of your chat history
      </p>
      <p className="channel-empty__secons">
        {" "}
        Send messages, attachments, links, emojis and more!
      </p>
    </div>
  );

  return (
    <div className="channel__container">
      <Channel
        EmptyStateIndicator={EmptyState}
        Message={(messageProps, i) => (
          <MessageTeam {...messageProps} key={i} />
        )}
      >
        <ChannelInner setIsEditing={setIsEditing} />
      </Channel>
    </div>
  );
};

export default ChannelContainer;
