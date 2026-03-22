import { UserData } from "../user/user.types";

export interface RequestData {
    _id: string;
    sourceData: UserData;
}
