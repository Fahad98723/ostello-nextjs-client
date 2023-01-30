import { PlayCircleFilled } from '@ant-design/icons'
import React, { useEffect, useRef, useState } from 'react'
import useElementOnScreen from './hooks/visibleHook'
import moment from 'moment'
import {
  postUserAnalytics,
  selectUserAnalytics,
  setWatchingVideos,
} from '../redux/slices/UserAnalytics'
import { useDispatch, useSelector } from 'react-redux'
import { authSelector } from '../redux/slices/authSlice'

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3,
}
export default function VideoPlayer({
  thumbnailURL,
  playing = true,
  videoURL,
  className,
  loop,
  item,
  id,
  ip,
  name,
  playIcon = (
    <PlayCircleFilled
      className='
                            text-black/90
                            md:text-6xl text-4xl cursor-pointer active:opacity-75 hover:scale-110 duration-300'
    />
  ),
}) {
  const videoRef = useRef(null)
  const [played, setPlayed] = useState(false)
  const { watchingVideos, userLocation } = useSelector(selectUserAnalytics)
  const { userData, isAuthenticated } = useSelector(authSelector)
  const dispatch = useDispatch()
  const isVisible = useElementOnScreen(options, videoRef)
  const [clickedVideo, setClickedVideo] = useState(false)

  const onVideoClick = () => {
    setClickedVideo(!clickedVideo)
    if (played) {
      videoRef.current.pause()
      setPlayed(!played)
    } else {
      videoRef.current.play()
      setPlayed(!played)
    }
  }
  useEffect(() => {
    if (isVisible) {
      let currentTime = moment().format()
      let previousTime = moment(watchingVideos?.timeStamps)
      let diff = moment(currentTime).diff(previousTime, 'seconds')
      const data = {
        activity_type: 'watch_videos',
        payload: {
          instituteid: id,
          ipaddress: ip,
          video: {
            ...item,
          },
          institute_name: name, 
        },
      }
      if (isAuthenticated) {
        data.payload.userid = userData?.id
        data.payload.user_name = userData?.name
      }
      if (userLocation?.latitude !== '') {
        data.location = {
          longitude: userLocation?.longitude?.toString(),
          latitude: userLocation?.latitude?.toString(),
        }
      } else {
        data.location = null
      }
      console.log(data)
      if (watchingVideos?.videoUrl === videoURL && diff > 10) {
        dispatch(
          setWatchingVideos({ videoUrl: videoURL, timeStamps: currentTime })
        )
        dispatch(postUserAnalytics(data))
      } else {
        dispatch(postUserAnalytics(data))
        dispatch(
          setWatchingVideos({ videoUrl: videoURL, timeStamps: currentTime })
        )
      }
      if (!played && clickedVideo) {
        videoRef.current.play()
        setPlayed(true)
      }
    } else {
      if (played) {
        videoRef.current.pause()
        setPlayed(false)
      }
    }
  }, [isVisible, played])
  return (
    <div className={`aspect-video ${className}`}>
      <video
        onContextMenu={(e) => e.preventDefault()}
        controlsList='nodownload'
        poster={thumbnailURL}
        onClick={onVideoClick}
        style={{ maxWidth: '100%', width: '100%', margin: '0 auto' }}
        playsInline
        webkit-playsinline
        loop
        muted
        playIcon
        preload='true'
        controls
        alt='Ostello'
        src={videoURL}
        ref={videoRef}
      />
    </div>
  )
}
