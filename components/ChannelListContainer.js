import React from "react";
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

const ChannelListContainer = () => {
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
  return (
    <>
      <SideBar logout={logout} />
      <div className="channel-list__list__wrapper">
        <CompanyHeader />
        <ChannelSearch />
        <ChannelList
          filters={{}}
          channelRenderFilterFn={() => {}}
          List={(listProps) => <GroupChannelList {...listProps} type="team" />}
          Preview={(previewProps) => (
            <GroupChannelPreview {...previewProps} type="team" />
          )}
        />
        <ChannelList
          filters={{}}
          channelRenderFilterFn={() => {}}
          List={(listProps) => (
            <GroupChannelList {...listProps} type="messaging" />
          )}
          Preview={(previewProps) => (
            <GroupChannelPreview {...previewProps} type="messaging" />
          )}
        />
      </div>
    </>
  );
};

export default ChannelListContainer;
