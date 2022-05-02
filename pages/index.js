import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { StreamChat } from 'stream-chat'
import { ChannelList, Chat } from 'stream-chat-react'
import Cookies from 'universal-cookie'

import { ChannelListContainer, ChannelContainer, Auth } from '../components'

import 'stream-chat-react/dist/css/index.css';

const cookies = new Cookies();

const apiKey = process.env.STREAM_API_KEY;

const client = StreamChat.getInstance(apiKey);


export default function Home() {
  const [authToken, setAuthToken] = useState('');
  const [createType, setCreateType] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    setAuthToken(cookies.get('token'));
  }, [authToken]);

if(authToken) {
  client.connectUser({
    name: cookies.get("username"),
    id: cookies.get("userId"),
    fullName: cookies.get("fullName"),
    phoneNumber: cookies.get("phoneNumber"),
    image: cookies.get("avatarURL"),
    hashedPassword: cookies.get("hashedPassword"),
  }, authToken);
}


  if (!authToken) return <Auth/>
  return (
    <div className='app__wrapper'>
      <Head>
        <title>Chat App</title>
        <meta name="description" content="NextJS Chat App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Chat client={client} theme="team light">
        <ChannelListContainer
        isCreating={isCreating}
        setIsCreating={setIsCreating}
        setIsEditing={setIsEditing}
        setCreateType={setCreateType}/>

        <ChannelContainer 
        isCreating={isCreating}
        isEditing={isEditing}
        setIsCreating={setIsCreating}
        setIsEditing={setIsEditing}
        createType={createType}/>
      </Chat>
      </div>
  )
}
