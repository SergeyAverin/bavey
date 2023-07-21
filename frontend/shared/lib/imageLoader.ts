const NEXT_PUBLIC_IMAGE_SERVER = process.env['NEXT_PUBLIC_IMAGE_SERVER']

export function imageLoader(src: string) {
  return `${NEXT_PUBLIC_IMAGE_SERVER}${src}`
}
