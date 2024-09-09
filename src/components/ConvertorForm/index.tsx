import { FormEvent } from "react";

interface IConvertorForm {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

export const ConvertorForm = ({ onSubmit, isLoading }: IConvertorForm) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="col-span-full">
        <label
          htmlFor="about"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Text to convert
        </label>
        <div className="mt-2">
          <textarea
            name="textToConvert"
            rows={3}
            className="resize-none block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Write a text you want to convert to pdf format.
        </p>
      </div>
      <button
        disabled={isLoading}
        type="submit"
        className="font-semibold border-2 bg-slate-300 w-full rounded-lg h-10 mt-4 hover:bg-slate-500 hover:text-white"
      >
        Convert to PDF
      </button>
    </form>
  );
};
