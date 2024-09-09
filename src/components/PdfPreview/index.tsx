import Storage from "../../services/StorageService";

interface IPdfPreview {
  pdfUrl: string;
  text: string;
}

export const PdfPreview = ({ pdfUrl, text }: IPdfPreview) => {
  const onSaveHandler = () => {
    Storage.saveItem({
      id: String(Date.now()),
      timestamp: Date.now(),
      fileUrl: pdfUrl,
      text,
    });
  };

  return (
    <>
      {!!pdfUrl && (
        <>
          <embed
            src={`${pdfUrl}`}
            width={500}
            height={700}
            type="application/pdf"
            className="mx-auto mt-5"
          />
          <button
            onClick={onSaveHandler}
            type="button"
            className="font-semibold border-2 bg-blue-200 w-full rounded-lg h-10 my-4 hover:bg-blue-800 hover:text-white"
          >
            Save file
          </button>
        </>
      )}
    </>
  );
};
