import * as _chain from "as-chain";
import { Table } from 'proton-tsc';



export class GlobalDB extends _chain.MultiIndex<Global> {

}

@table('global', singleton, nocodegen)

export class Global implements _chain.MultiIndexValue {
    
    constructor(
        public id: u64 = 0,
        public poolName: string = '',
        public refreshRateInHours: i32 = 0
    ) {
        
    }

    @primary
    get primary(): u64 {
        return this.id;
    }

    pack(): u8[] {
        let enc = new _chain.Encoder(this.getSize());
        enc.packNumber<u64>(this.id);
        enc.packString(this.poolName);
        enc.packNumber<i32>(this.refreshRateInHours);
        return enc.getBytes();
    }
    
    unpack(data: u8[]): usize {
        let dec = new _chain.Decoder(data);
        this.id = dec.unpackNumber<u64>();
        this.poolName = dec.unpackString();
        this.refreshRateInHours = dec.unpackNumber<i32>();
        return dec.getPos();
    }

    getSize(): usize {
        let size: usize = 0;
        size += sizeof<u64>();
        size += _chain.Utils.calcPackedStringLength(this.poolName);
        size += sizeof<i32>();
        return size;
    }

    static get tableName(): _chain.Name {
        return _chain.Name.fromU64(0x6468734400000000);
    }

    static tableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[] {
        const idxTableBase: u64 = this.tableName.N & 0xfffffffffffffff0;
        const indices: _chain.IDXDB[] = [
        ];
        return indices;
    }

    getTableName(): _chain.Name {
        return Global.tableName;
    }

    getTableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[] {
        return Global.tableIndexes(code, scope);
    }

    getPrimaryValue(): u64 {
        return _chain.Name.fromU64(0x6468734400000000).N;
    }

    getSecondaryValue(i: i32): _chain.SecondaryValue {
        _chain.check(false, "no secondary value!");
        return new _chain.SecondaryValue(_chain.SecondaryType.U64, new Array<u64>(0));
    }
    
    setSecondaryValue(i: i32, value: _chain.SecondaryValue): void {
        _chain.check(false, "no secondary value!");
    }


    static new(code: _chain.Name, scope: _chain.Name = _chain.EMPTY_NAME): _chain.Singleton<Global> {
        return new _chain.Singleton<Global>(code, scope, this.tableName);
    }
}



export class PoolsDB extends _chain.MultiIndex<Pools> {

}

@table('pools', nocodegen)

export class Pools implements _chain.MultiIndexValue {
    
    constructor(
        public poolNumber: u64 = 0,
        public poolName: string = '',
        public refreshRateInHours: i32 = 0
    ) {
        
    }

    @primary
    get primary(): u64 {
        return this.poolNumber;
    }

    pack(): u8[] {
        let enc = new _chain.Encoder(this.getSize());
        enc.packNumber<u64>(this.poolNumber);
        enc.packString(this.poolName);
        enc.packNumber<i32>(this.refreshRateInHours);
        return enc.getBytes();
    }
    
    unpack(data: u8[]): usize {
        let dec = new _chain.Decoder(data);
        this.poolNumber = dec.unpackNumber<u64>();
        this.poolName = dec.unpackString();
        this.refreshRateInHours = dec.unpackNumber<i32>();
        return dec.getPos();
    }

    getSize(): usize {
        let size: usize = 0;
        size += sizeof<u64>();
        size += _chain.Utils.calcPackedStringLength(this.poolName);
        size += sizeof<i32>();
        return size;
    }

    static get tableName(): _chain.Name {
        return _chain.Name.fromU64(0xAD291C0000000000);
    }

    static tableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[] {
        const idxTableBase: u64 = this.tableName.N & 0xfffffffffffffff0;
        const indices: _chain.IDXDB[] = [
        ];
        return indices;
    }

    getTableName(): _chain.Name {
        return Pools.tableName;
    }

    getTableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[] {
        return Pools.tableIndexes(code, scope);
    }

    getPrimaryValue(): u64 {
        return this.primary
    }

    getSecondaryValue(i: i32): _chain.SecondaryValue {
        _chain.check(false, "no secondary value!");
        return new _chain.SecondaryValue(_chain.SecondaryType.U64, new Array<u64>(0));
    }
    
    setSecondaryValue(i: i32, value: _chain.SecondaryValue): void {
        _chain.check(false, "no secondary value!");
    }


    static new(code: _chain.Name, scope: _chain.Name  = _chain.EMPTY_NAME): PoolsDB {
        return new PoolsDB(code, scope, this.tableName, this.tableIndexes(code, scope));
    }
}
