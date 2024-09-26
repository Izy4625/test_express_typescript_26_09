export interface Beeper {
    id?: Number,
    name: string,
    status: status,
    created_at: Date,
    detonated_at?: Date,
    latitude?:Number,
    longitude?: Number
}

export interface Beepers {
    [key: string] : Beeper
}
export type status = "manufactured"|"assembled"|"shipped"|"deployed"|"detonated"