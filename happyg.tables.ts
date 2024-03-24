import { Table } from 'proton-tsc';

@table('global', singleton)
export class Global extends Table {
    constructor(
        public id: u64 = 0,
        public poolName: string = '',
        public refreshRateInHours: i32 = 0
    ) {
        super();
    }

    @primary
    get primary(): u64 {
        return this.id;
    }
}

@table('pools')
export class Pools extends Table {
    constructor(
        public poolNumber: u64 = 0,
        public poolName: string = '',
        public refreshRateInHours: i32 = 0
    ) {
        super();
    }

    @primary
    get primary(): u64 {
        return this.poolNumber;
    }
}
