import { PageView } from "../enums/page-view";

export class PageHolder {
    type!: PageView
    id: string | null

    constructor(pageView: PageView, id: string | null) {
        this.type = pageView
        this.id = id
    }
}
