export interface IPublication {
    title: string,
    slug: string
}

export interface IUser {
    description: string,
    avatar: string,
    header_image: string,
    slug: string,
    username: string,
    first_name: string,
    last_name: string,
    publications:[IPublication]
}
