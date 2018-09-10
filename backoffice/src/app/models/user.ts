import { Photo } from './photo';

export interface User {

    id: number;
    username: string;
    age: string;
    created: Date;
    lastActive: Date;
    profileId: string;
    city: string;
    country: string;
    photos ?: Photo[];
    fullName: string;
    about: string;
    profileIcon: string;
    university: string;
    degree: string;

}
