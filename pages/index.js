import Head from 'next/head'
import Image from 'next/image'

import { StreamChat } from 'stream-chat'
import { ChannelList, Chat } from 'stream-chat-react'
import Cookies from 'universal-cookie/es6'

import { ChannelListContainer, ChannelContainer } from '../components'

const apiKey = 'nx992gy5zp29'

const client = StreamChat.getInstance(apiKey)

export default function Home() {
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
