import Head from 'next/head'
import Image from 'next/image'

import { StreamChat } from 'stream-chat'
import { ChannelList, Chat } from 'stream-chat-react'
import Cookies from 'universal-cookie'

import { ChannelListContainer, ChannelContainer, Auth } from '../components'

const apiKey = 'nx992gy5zp29'

const client = StreamChat.getInstance(apiKey)

const authToken = false;

export default function Home() {
  if (!authToken) return <Auth/>
  return (
    <div className='app__wrapper'>
      <Head>
        <title>Chat App</title>
        <meta name="description" content="NextJS Chat App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Chat client={client} theme="team dark">
        <ChannelListContainer/>
        <ChannelContainer/>
      </Chat>
      </div>
  )
}
