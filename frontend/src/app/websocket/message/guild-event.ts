import { GuildData } from "../../classes/guild";
import { BaseEnvelope } from "./base/base-envelope";
import { Crud } from "./base/crud";

export interface GuildEvent extends BaseEnvelope {
    crud: Crud
    guildId?: string
    guild?: GuildData
}
