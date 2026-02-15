import { Indentifiable } from "../cache/indentifiable";
import { ChannelType } from "../enums/channel-type";
import { User } from "./user";

export class Channel implements Indentifiable {
    id!: string
    name!: string
    channelType!: ChannelType;
    members!: User[]
    activeMembers?: User[]

    getId(): string {
        return this.id;
    }
}

export interface ChannelIdDTO {
    id: string
}
