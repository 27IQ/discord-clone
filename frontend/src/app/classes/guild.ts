import { Channel } from "./channel"
import { User } from "./user"

export class Guild {
    id!: string
    name!: string
    channels!: Channel[]
    members!: User[]
}

export interface GuildSummeryEntry {
    id: string
    name: string
}
