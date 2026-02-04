import { ChannelType } from "../enums/channel-type";
import { User } from "./user";

export class Channel {
    id!: string
    name!: string
    channelType!: ChannelType;
    members!: User[]
}
