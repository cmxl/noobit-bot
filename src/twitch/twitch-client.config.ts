export interface TwitchConnection {
    cluster: string;
    reconnect: boolean;
}

export interface TwitchIdentity {
    username: string;
    password: string;
}

export interface TwitchOptions {
    debug: boolean;
}

export interface TwitchConfig {
    options: TwitchOptions;
    connection: TwitchConnection;
    identity: TwitchIdentity;
    channels: string[];
}
