import { User } from "./user.ts";

declare global {
    namespace Express {
        export interface Request{
            user?: User | null;
        }
    }
}