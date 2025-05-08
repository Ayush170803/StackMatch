import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice';
import Card from './Card';
const Feed = () => {
  const feed = useSelector((store)=>store.feed);

  const dispatch = useDispatch();
  const getfeed = async () =>
  {
    try
    {
    if(feed) return;
    const res = await axios.get("http://localhost:3000/feed",{withCredentials:true});
      dispatch(addFeed(res.data));
    }
    catch(er)
    {
      console.log(er.message);
    }
  }

  useEffect(()=>{
    getfeed()
  },[])
  
  if(!feed) return;
  if(feed.length==0) return <h1>No Feed exist</h1>
  return feed && (
    <div id='feedcard'>
    <Card user={feed[0]} />
    </div>
  )
}

export default Feed
