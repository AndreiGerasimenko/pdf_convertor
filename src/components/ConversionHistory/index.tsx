import { Dispatch, SetStateAction, useEffect, useState } from "react";

import Storage from "../../services/StorageService";
import { HistoryItemType } from "../../type/history";

interface IConversionHistory {
  setPdfUrl: Dispatch<SetStateAction<string>>;
}

export const ConversionHistory = ({ setPdfUrl }: IConversionHistory) => {
  const [history, setHistory] = useState<HistoryItemType[]>(
    () => Storage.getList() ?? []
  );

  useEffect(() => {
    Storage.subscribe((updatedHistory) => setHistory(updatedHistory));
  }, []);

  return (
    <>
      <h3 className="text-center mb-1 font-semibold text-xl">
        Conversions history
      </h3>
      <ul className="divide-y divide-gray-100">
        {history.map((item) => {
          return (
            <li
              onClick={() => setPdfUrl(item.fileUrl)}
              key={item.id}
              className="flex justify-between rounded-lg gap-x-6 py-3 px-2 cursor-pointer hover:bg-slate-300"
            >
              <div className="w-[190px] max-w-[190px] truncate text-sm font-semibold leading-6 text-gray-900">
                {item.text}
              </div>

              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">
                  {new Date(+item.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};
