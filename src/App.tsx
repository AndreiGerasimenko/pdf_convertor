import { FormEvent, useState } from "react";

import { usePdfConvert } from "./hooks/pdf-convert.hook";
import { ConvertorForm } from "./components/ConvertorForm";
import { PdfPreview } from "./components/PdfPreview";
import { ConversionHistory } from "./components/ConversionHistory";

function App() {
  const { request, loading } = usePdfConvert();
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const [sourceText, setSourceText] = useState<string>("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let textToConvert = formData.get("textToConvert") as string;

    if (!textToConvert) return;

    try {
      const fileUrl = await request(textToConvert);

      setPdfUrl(fileUrl);
      setSourceText(textToConvert);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <main className="max-w-[1200px] mx-auto">
      <header className="text-2xl text-center my-4">PDF convertor</header>
      <section className="flex gap-4">
        <div className="flex-grow">
          <ConvertorForm onSubmit={handleSubmit} isLoading={loading} />
          <PdfPreview pdfUrl={pdfUrl} text={sourceText} />
        </div>
        <div className="flex-grow-0 w-[300px] min-h-screen bg-slate-100 px-2">
          <ConversionHistory setPdfUrl={setPdfUrl} />
        </div>
      </section>
    </main>
  );
}

export default App;
