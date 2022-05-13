import React, { useState } from "react";
import { ChannelList, useChatContext } from "stream-chat-react";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";

import { ChannelSearch, GroupChannelList, GroupChannelPreview } from "./";

const cookies = new Cookies();

const SideBar = ({ logout }) => {
  return (
    <div className="channel-list__sidebar">
      <div className="channel-list__sidebar__icon1">
        <div className="icon1__inner">
          <img src="/assets/hospital.png" alt="Hospital" width="30" />
        </div>
      </div>

      <div className="channel-list__sidebar__icon2">
        <div className="icon1__inner" onClick={logout}>
          <img src="/assets/logout.png" alt="Logout" width="30" />
        </div>
      </div>
    </div>
  );
};

const CompanyHeader = () => {
  return (
    <div className="channel-list__header">
      <div className="channel-list__header__text">Chat Application</div>
    </div>
  );
};

const customChannelGroupFilter = (channels) => {
  return channels.filter(channel => channel.type === "team")
}

const customChannelMessageFilter = (channels) => {
  return channels.filter(channel => channel.type === "messaging")
}


const ChannelListContent = ({isCreating, setIsCreating, setIsEditing, setCreateType, setToggleContainer}) => {
  const { client } = useChatContext();
  const router = useRouter();
  const logout = () => {
    cookies.remove("username"),
    cookies.remove("userId"),
    cookies.remove("fullName"),
    cookies.remove("phoneNumber"),
    cookies.remove("avatarURL"),
    cookies.remove("hashedPassword");
    cookies.remove("token");

    router.reload();
  };

  const filters = {members : { $in: [client.userID]}};
  return (
    <>
      <SideBar logout={logout} />
      <div className="channel-list__list__wrapper">
        <CompanyHeader />
        <ChannelSearch />
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelMessageFilter}
          List={(listProps) => (
            <GroupChannelList {...listProps} 
            type="messaging"
            isCreating={isCreating}
            setIsCreating={setIsCreating}
            setIsEditing={setIsEditing}
            setCreateType={setCreateType} />
          )}
          Preview={(previewProps) => (
            <GroupChannelPreview {...previewProps}
            setIsCreating={setIsCreating}
            setIsEditing={setIsEditing}
            setToggleContainer={setToggleContainer}
            type="messaging"/>
          )}
        />
        
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelGroupFilter}
          List={(listProps) => <GroupChannelList {...listProps}
           type="team" 
           isCreating={isCreating}
           setIsCreating={setIsCreating}
           setIsEditing={setIsEditing}
           setCreateType={setCreateType}/>}
          Preview={(previewProps) => (
            <GroupChannelPreview {...previewProps} 
            setIsCreating={setIsCreating}
            setIsEditing={setIsEditing}
            setToggleContainer={setToggleContainer}
            type="team" />
          )}
        />
       
      </div>
    </>
  );
};

const ChannelListContainer = ({setCreateType, setIsCreating, setIsEditing}) => {
  const [toggleContainer, setToggleContainer] = useState(false);

  return (
    <>
    <div className="channel-list__container">
      <ChannelListContent
       setIsCreating={setIsCreating}
        setIsEditing={setIsEditing}
        setCreateType={setCreateType}
      />
    </div>

    <div className="channel-list__container-responsive"
    style={{left: toggleContainer ? "0%" : "-89%", backgroundColor : "#005fff"}}>
     <div className="channel-list__container-toggle" onClick={() => setToggleContainer((prevToggleContainer) => !prevToggleContainer)}>
     <ChannelListContent
       setIsCreating={setIsCreating}
        setIsEditing={setIsEditing}
        setCreateType={setCreateType}
        setToggleContainer={setToggleContainer}
      />
     </div>
    </div>
    </>
  )
}

export default ChannelListContainer;
