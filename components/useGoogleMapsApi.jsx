import { useEffect, useState, useCallback } from 'react'
import loadScript from 'load-script'
import each from 'lodash/each'

var googleMapsApi
var loading = false
var callbacks = []

const useGoogleMapsApi = () => {
  const [, setApi] = useState()

  const callback = useCallback(() => {
    setApi(window.google.maps)
  }, [])

  useEffect(() => {
    if (loading) {
      callbacks.push(callback)
    } else {
      if (!googleMapsApi) {
        loading = true
        loadScript(
          `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`,
          { async: true },
          () => {
            loading = false
            googleMapsApi = window.google.maps
            setApi(window.google.maps)
            each(callbacks, init => init())
            callbacks = []
          })
      }
    }
  }, [])

  return googleMapsApi
}

export default useGoogleMapsApi