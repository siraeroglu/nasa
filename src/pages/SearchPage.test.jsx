// SearchPage için iki temel davranışı test eden basit test dosyası:
// 1) boş arama → hata mesajı
// 2) geçersiz kelime → "no results found"

import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import SearchPage from "./SearchPage";

// nasa api'yi fake hale getiriyoruz (şimdilik boş liste döndürsün)
vi.mock("../services/nasaApi", () => ({
  searchNasaImages: vi.fn().mockResolvedValue([]),
}));

describe("SearchPage", () => {

  test("boş arama yapıldığında uyarı mesajı gösteriliyor", () => {
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/search for nasa media/i);
    const button = screen.getByRole("button", { name: /search/i });

    fireEvent.change(input, { target: { value: "   " } });
    fireEvent.click(button);

    expect(
      screen.getByText(/please type something to search/i)
    ).toBeInTheDocument();
  });

  test("sonuç olmayan bir kelime aranınca 'no results found' gösteriliyor", async () => {
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/search for nasa media/i);
    const button = screen.getByRole("button", { name: /search/i });

    fireEvent.change(input, { target: { value: "asdfghjkl" } });
    fireEvent.click(button);

    expect(
      await screen.findByText(/no results found/i)
    ).toBeInTheDocument();
  });

});
