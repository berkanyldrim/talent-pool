import { describe, it, expect, vi, beforeAll, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Sidebar } from "@/components/sidebar";
import { MemoryRouter } from "react-router-dom";

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

const mockLogout = vi.fn();
vi.mock("@/contexts/auth-context", () => ({
  useAuth: () => ({
    user: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@hrpanda.co",
    },
    logout: mockLogout,
  }),
}));

describe("Sidebar", () => {
  const renderWithRouter = () => {
    return render(
      <MemoryRouter initialEntries={["/overview"]}>
        <Sidebar />
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("organizasyon adını ve butonunu göstermeli", () => {
    renderWithRouter();
    const orgButton = screen.getByRole("button", {
      name: /toggle organization menu/i,
    });
    expect(orgButton).toBeInTheDocument();
    expect(screen.getByText("Hrpanda")).toBeInTheDocument();
  });

  it("tüm navigasyon öğelerini göstermeli", () => {
    renderWithRouter();
    const navItems = [
      "Overview",
      "Jobs",
      "Talent Pool",
      "Inbox",
      "Support",
      "Settings",
    ];

    navItems.forEach((item) => {
      const link = screen.getByText(item);
      expect(link).toBeInTheDocument();
    });
  });

  it("kullanıcı bilgilerini göstermeli", () => {
    renderWithRouter();
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("john.doe@hrpanda.co")).toBeInTheDocument();
  });

  it("kullanıcı profil butonunu göstermeli", () => {
    renderWithRouter();
    const userMenuButton = screen.getByRole("button", {
      name: /toggle user menu/i,
    });
    expect(userMenuButton).toBeInTheDocument();
  });

  it("kullanıcı profil fotoğrafını göstermeli", () => {
    renderWithRouter();
    const profileImage = screen.getByAltText("Olivia Rhye");
    expect(profileImage).toBeInTheDocument();
    expect(profileImage).toHaveAttribute(
      "src",
      "https://randomuser.me/api/portraits/women/44.jpg"
    );
  });
});
