export enum Role {
    USER = 'user',
    MODEL = 'model',
}

export interface Attachment {
    name: string;
    type: string;
    data: string; // base64 data URL for rendering
}

export interface Message {
    role: Role;
    content: string;
    attachment?: Attachment;
}