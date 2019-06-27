declare namespace Express {
    export interface Request {
        user?: import("../profile_route_handlers").UserData;
    }
}