import { useState, useCallback } from "react";

export const usePdfConvert = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const request = useCallback(async (text: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/create-pdf?apiKey=${process.env.REACT_APP_API_KEY}`,
        {
          method: "POST",
          body: JSON.stringify({
            text,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        return "";
      }

      const data = await response.arrayBuffer();

      const blob = new Blob([data], {
        type: "application/pdf",
      });

      if (!blob) return "";

      const fileUrl = URL.createObjectURL(blob);

      setLoading(false);

      return fileUrl;
    } catch (e: any) {
      setLoading(false);
      throw e;
    }
  }, []);

  return { loading, request };
};
