import { fireEvent, render, screen } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import App from "./App";

test("pdf should not be generated without text", () => {
  const { getByRole, queryByRole } = render(<App />);
  const convertButton = screen.getByRole("button", { name: "Convert to PDF" });
  fireEvent.click(convertButton);

  const saveButton = screen.queryByRole("button", { name: "Save file" });
  expect(saveButton).not.toBeInTheDocument();
});

const server = setupServer(
  http.post(
    `${process.env.REACT_APP_BASE_URL}/create-pdf?apiKey=${process.env.REACT_APP_API_KEY}`,
    async () => {
      const buffer = await fetch(`/test-file.pdf`, {
        headers: {
          "Content-Type": "application/pdf",
        },
      }).then((response) => response.arrayBuffer());

      return HttpResponse.arrayBuffer(buffer, {
        headers: {
          "Content-Type": "application/pdf",
        },
      });
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("pdf should be generated after clicking generate button", async () => {
  const { getByRole, queryByRole, findByRole } = render(<App />);
  const convertButton = screen.getByRole("button", { name: "Convert to PDF" });
  fireEvent.click(convertButton);

  await screen.findByRole("button", { name: "Save file" });

  const saveButton = screen.findByRole("button", { name: "Save file" });
  expect(saveButton).toBeInTheDocument();
});
