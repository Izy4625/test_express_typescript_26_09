export interface Beeper {
    id?: Number;
    name?: string;
    status?: 'manufactured' | 'assembled' | 'shipped' | 'deployed' | 'detonated';
    lat?: number;
    lon?: number;
    productionDate?: Date;
    deploymentDate?: Date;
}

export interface Beepers {
    [key: string] : Beeper
}
export type status = "manufactured"|"assembled"|"shipped"|"deployed"|"detonated"