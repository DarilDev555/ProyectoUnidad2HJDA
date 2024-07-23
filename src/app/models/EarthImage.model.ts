export interface EarthImage {
    identifier: string;
    caption: string;
    image: string;
    version: string;
    date: string;
    lunar_j2000_position: {
        x: number;
        y: number;
        z: number;
    };
    sun_j2000_position: {
        x: number;
        y: number;
        z: number;
    };
}