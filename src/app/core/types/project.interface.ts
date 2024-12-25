import { ISkill } from "./skill.interface"

export interface IProject {
    _id?: string,
    name: string,
    description: string,
    image: string
    link?: string
    skills: ISkill[]
    createdAt?: Date
    updatedAt?: Date
}
