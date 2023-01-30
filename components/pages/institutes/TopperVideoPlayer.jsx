import { PlayCircleFilled } from '@ant-design/icons'
import React, { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import useElementOnScreen from './hooks/visibleHook'
import {
  Player,
  ControlBar,
  ReplayControl,
  ForwardControl,
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton,
  VolumeMenuButton,
} from 'video-react'
export default function TopperVideoPlayer({
  thumbnailURL,
  playing = true,
  videoURL,
  loop,
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
  const isVisible = useElementOnScreen(options, videoRef)
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3,
  }
  const onVideoClick = () => {
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
      if (!played) {
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
    <div className='aspect-video'>
      <video
        onContextMenu={(e) => e.preventDefault()}
        controlsList='nodownload'
        poster={thumbnailURL}
        onClick={onVideoClick}
        style={{ maxWidth: '100%', width: '100%', margin: '0 auto' }}
        playsInline
        webkit-playsInline
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
