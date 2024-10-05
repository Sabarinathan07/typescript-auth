import { Request } from 'express';
export interface customRequest extends Request {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user?: any;
}

export interface DecodedToken {
    id: string;
    any: any;
    // Add other properties if needed
}
