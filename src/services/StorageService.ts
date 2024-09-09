import { HistoryItemType } from "../type/history";

export class StorageService {
  key = "pdf_convertor_list";
  subscribers: Array<(arg: HistoryItemType[]) => void> = [];

  subscribe = (subs: (arg: HistoryItemType[]) => void) => {
    this.subscribers.push(subs);
  };

  saveItem = (value: HistoryItemType) => {
    const list = this.getList() ?? [];

    localStorage.setItem(this.key, JSON.stringify([...list, value]));

    const changedList = this.getList();

    this.subscribers.forEach((subs) => subs(changedList));
  };

  getList = (): HistoryItemType[] => {
    const value = JSON.parse(localStorage.getItem(this.key) as string);

    return value;
  };
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new StorageService();
