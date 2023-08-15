import { FC } from 'react'

import { IMedia } from '../model/types'
import { MediaType } from '../model/mediaType'
import { imageLoader } from '@shared/lib'

interface IMediaImageSliderProps {
  files: [IMedia];
}

export const MediaFile: FC<IMediaImageSliderProps> = ({ files }) => {
  files = files.filter((media) => media.type == MediaType.FILE)

  const getFileName = (path: string) => {
    const pathArray = path.split('/')
    return pathArray[pathArray.length - 1]
  }

  return (
    <div>
      {files.map((file) => (
        <a
          href={imageLoader({ src: file.file })}
          download={getFileName(file.file)}
        >
          {file.file}
        </a>
      ))}
    </div>
  )
}
