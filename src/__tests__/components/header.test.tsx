import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Header } from "@/components/header";
import { DashboardContext } from "@/components/dashboard-layout";

// Mock useAuth hook
const mockLogout = vi.fn();
vi.mock("@/contexts/auth-context", () => ({
  useAuth: () => ({
    user: {
      firstName: "John",
      lastName: "Doe",
    },
    logout: mockLogout,
  }),
}));

describe("Header", () => {
  const mockOpenSidebar = vi.fn();

  const renderWithContext = (count?: number) => {
    return render(
      <DashboardContext.Provider value={{ openSidebar: mockOpenSidebar }}>
        <Header count={count} />
      </DashboardContext.Provider>
    );
  };

  it("başlığı doğru şekilde göstermeli", () => {
    renderWithContext();
    expect(screen.getByText("Talent Pool")).toBeInTheDocument();
  });

  it("alt başlığı doğru şekilde göstermeli", () => {
    renderWithContext();
    expect(
      screen.getByText("Keep track of the applicants")
    ).toBeInTheDocument();
  });

  it("aday sayısını doğru şekilde göstermeli", () => {
    const count = 42;
    renderWithContext(count);
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("varsayılan aday sayısı 0 olmalı", () => {
    renderWithContext();
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("Add Talent butonuna tıklandığında sheet açılmalı", () => {
    renderWithContext();
    const addButton = screen.getByText("Add Talent");
    fireEvent.click(addButton);
    expect(screen.getByText("Add New Talent")).toBeInTheDocument();
  });

  it("mobil menü butonuna tıklandığında openSidebar çağrılmalı", () => {
    renderWithContext();
    const menuButton = screen.getByLabelText("Open Menu");
    fireEvent.click(menuButton);
    expect(mockOpenSidebar).toHaveBeenCalled();
  });

  it("kullanıcı profil fotoğrafını göstermeli", () => {
    renderWithContext();
    const profileImage = screen.getByAltText("John Doe");
    expect(profileImage).toBeInTheDocument();
    expect(profileImage).toHaveAttribute(
      "src",
      "https://randomuser.me/api/portraits/women/44.jpg"
    );
  });
});
