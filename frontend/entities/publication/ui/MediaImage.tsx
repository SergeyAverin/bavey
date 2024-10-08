import React, { useState, useEffect } from 'react'
import Image from 'next/image'

import {
  MediaImageButton,
  MediaImageNumbers,
  PublicationMediaImagesStyled,
  MediaImage
} from './styled'
import { IMedia } from '../model/types'
import { Flex, Margin } from '@shared/ui'
import { imageLoader } from '@shared/lib'

interface IMediaImageSliderProps {
  images: [IMedia];
}

export const MediaImageSlider: React.FC<IMediaImageSliderProps> = ({
  images
}) => {
  images = images.filter((media) => media.type == 'image')
  const [imageNumber, setImageNumber] = useState(0)
  let pageCount = 0
  pageCount = images.length
  let image = images[imageNumber]

  useEffect(() => {
    image = images[imageNumber]
  }, [imageNumber])

  const nextImage = (event: React.MouseEvent) => {
    setImageNumber((prev) => {
      if (prev + 1 < images.length) {
        return prev + 1
      }
      return prev
    })
  }
  const previousImage = (event: React.MouseEvent) => {
    setImageNumber((prev) => {
      if (prev - 1 >= 0) {
        return prev - 1
      }
      return prev
    })
  }
  return (
    <div>
      {pageCount > 1 && (
        <Margin mb={15}>
          <Flex justifyContent="space-between" alignItems="center">
            <MediaImageNumbers>{`${
              imageNumber + 1
            } / ${pageCount}`}</MediaImageNumbers>

            <Flex justifyContent="flex-start" alignItems="center">
              <MediaImageButton onClick={previousImage}>←</MediaImageButton>
              <MediaImageButton onClick={nextImage}>→</MediaImageButton>
            </Flex>
          </Flex>
        </Margin>
      )}
      {images.length > 0 && (
        <PublicationMediaImagesStyled>
          <MediaImage isActive={true} src={imageLoader({ src: image.image })} />
        </PublicationMediaImagesStyled>
      )}
    </div>
  )
}
//  { images.map((image) => <MediaImage isActive={false} src={imageLoader({src:image.image})} />) }
