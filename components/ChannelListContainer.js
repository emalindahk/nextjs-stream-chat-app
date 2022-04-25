import React from "react";
import { ChannelList, useChatContext } from "stream-chat-react";

import { ChannelSearch, GroupChannelList, GroupChannelPreview } from "./";

const SideBar = () => {
  return (
    <div className="channel-list__sidebar">
      <div className="channel-list__sidebar__icon1">
        <div className="icon1__inner">
          <img src="/assets/hospital.png" alt="Hospital" width="30" />
        </div>
      </div>
      <div className="channel-list__sidebar__icon2">
        <div className="icon1__inner">
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

const ChannelListContainer = () => {
  return (
    <>
      <SideBar />
      <div className="channel-list__list__wrapper">
        <CompanyHeader />
        <ChannelSearch />
        <ChannelList
          filters={{}}
          channelRenderFilterFn={() => {}}
          List={(listProps) => (
            <GroupChannelList {...listProps}
            type="team"/>
          )}
          Preview={(previewProps) => (
            <GroupChannelPreview {...previewProps}
            type="team"/>
          )}
        />
         <ChannelList
          filters={{}}
          channelRenderFilterFn={() => {}}
          List={(listProps) => (
            <GroupChannelList {...listProps}
            type="messaging"/>
          )}
          Preview={(previewProps) => (
            <GroupChannelPreview {...previewProps}
            type="messaging"/>
          )}
        />
      </div>
    </>
  );
};

export default ChannelListContainer;
