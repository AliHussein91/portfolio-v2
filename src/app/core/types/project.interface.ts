import { ISkill } from "./skill.interface"

export interface IProject {
    _id?: string,
    name: string,
    description: string,
    nameAr: string,
    descriptionAr: string,
    image: string
    status: string
    link?: string
    skills: ISkill[]
    createdAt?: Date
    updatedAt?: Date
}
