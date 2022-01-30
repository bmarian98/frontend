import { Shelter } from "../shelter/shelter";

export class Pet{
    id!: number;
    name!: string;
    species!: string;
    dateBirth!: string;
    imageUrl!: string;
    sex!: string;
    shelter!: Shelter;
}