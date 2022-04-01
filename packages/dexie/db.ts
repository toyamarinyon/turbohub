import Dexie, { Table } from "dexie";

export interface ArchiveThread {
  id?: number;
  threadId: number;
  createdAt: Date;
}

export class MySubClassedDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  archiveThreads!: Table<ArchiveThread>;

  constructor() {
    super("myDatabase");
    this.version(1).stores({
      archiveThreads: "++id, threadId, createdAt", // Primary key and indexed props
    });
  }
}

export const db = new MySubClassedDexie();
