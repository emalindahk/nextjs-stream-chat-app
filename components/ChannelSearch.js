import React, {useState, useEffect} from 'react'
import { useChatContext } from 'stream-chat-react'
import { ResultsDropdown } from '.'
import { SearchIcon } from '../public/assets/SearchIcon'


const ChannelSearch = ({setToggleContainer}) => {
    const [query, setQuery] = useState('')
    const [loading, setLoading] = useState(false)
    const {client, setActiveClient} = useChatContext()
    const [groupChannels, setGroupChannels] = useState([])
    const [directChannels, setDirectChannels] = useState([])

    useEffect(() => {
        if(!query){
            setGroupChannels([])
            setDirectChannels([])
        }
    }, [query])

    const getChannels = async (text) => {
        try {
           const channelRes = client.queryChannels({
               type: 'team',
               name: { $autocomplete: text},
               members: { $in : [client.userID]}
           })

           const userRes = client.queryUsers({
               id: { $ne : client.userID},
               name: { $autocomplete: text}
           })

           const [channels, {users}] = await Promise.all([channelRes, userRes])

           if(channels.length) setGroupChannels(channels);
           if(users.length) setDirectChannels(users);

        } catch (error) {
            setQuery('')
        }
    }

    const onSearch = (e) => {
        e.preventDefault()

        setLoading(true)
        setQuery(e.target.value)
        getChannels(e.target.value)
    }

    const setChannel = (channel) => {
        setQuery('')
        setActiveClient(channel)
    }

  return (
    <div className='channel-search__container'>
        <div className='channel-search__input__wrapper'>
            <div className='channel-search__input__icon'>
                <SearchIcon/>
            </div>
            <input className='channel-search__input__text' 
            placeholder='Search for a channel'
            type="text"
            value={query}
            onChange={onSearch}
            />
        </div>
        {query && (
            <ResultsDropdown
            groupChannels={groupChannels}
            directChannels={directChannels}
            loading={loading}
            setChannel={setChannel}
            setQuery={setQuery}
            setToggleContainer={setToggleContainer}
            />
        )}
    </div>
  )
}

export default ChannelSearch