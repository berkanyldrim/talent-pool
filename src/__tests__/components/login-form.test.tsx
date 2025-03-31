import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { LoginForm } from "@/components/login-form";
import userEvent from "@testing-library/user-event";

const mockUseLogin = vi.fn(() => ({
  mutate: vi.fn(),
  isPending: false,
}));

vi.mock("@/hooks/use-login", () => ({
  useLogin: () => mockUseLogin(),
}));

describe("LoginForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("form elemanlarını göstermeli", () => {
    render(<LoginForm />);

    // Başlık ve alt başlık kontrolü
    const heading = screen.getByRole("heading", { name: "Sign In" });
    expect(heading).toBeInTheDocument();
    expect(
      screen.getByText(/don't have an account yet\?/i)
    ).toBeInTheDocument();

    // Input alanları kontrolü
    expect(screen.getByPlaceholderText("Email Address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();

    // Butonlar kontrolü
    expect(screen.getByText("Continue with Google")).toBeInTheDocument();
    const signInButton = screen.getByRole("button", { name: /sign in/i });
    expect(signInButton).toBeInTheDocument();

    // Diğer linkler kontrolü
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
    expect(screen.getByText("Forgot your password?")).toBeInTheDocument();
  });

  it("varsayılan değerleri göstermeli", () => {
    render(<LoginForm />);

    const emailInput = screen.getByPlaceholderText(
      "Email Address"
    ) as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText(
      "Password"
    ) as HTMLInputElement;

    expect(emailInput.value).toBe("admin20@hireg.com");
    expect(passwordInput.value).toBe("123123");
  });

  it("geçersiz email için hata göstermeli", async () => {
    render(<LoginForm />);

    const emailInput = screen.getByPlaceholderText("Email Address");
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });

    const submitButton = screen.getByRole("button", { name: /sign in/i });
    fireEvent.click(submitButton);

    expect(
      await screen.findByText("Must be a valid email")
    ).toBeInTheDocument();
  });

  it("kısa şifre için hata göstermeli", async () => {
    render(<LoginForm />);

    const passwordInput = screen.getByPlaceholderText("Password");
    fireEvent.change(passwordInput, { target: { value: "12345" } });

    const submitButton = screen.getByRole("button", { name: /sign in/i });
    fireEvent.click(submitButton);

    expect(
      await screen.findByText("Password must be at least 6 characters")
    ).toBeInTheDocument();
  });

  it("form gönderilirken loading durumunu göstermeli", () => {
    mockUseLogin.mockReturnValue({
      mutate: vi.fn(),
      isPending: true,
    });

    render(<LoginForm />);
    const loadingText = screen.getByText("Signing In...");
    expect(loadingText).toBeInTheDocument();
  });

  it("başarılı form gönderimi yapabilmeli", async () => {
    const mockMutate = vi.fn();
    mockUseLogin.mockReturnValue({
      mutate: mockMutate,
      isPending: false,
    });

    render(<LoginForm />);

    const user = userEvent.setup();
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    // Form submit
    await user.click(submitButton);

    expect(mockMutate).toHaveBeenCalledWith(
      {
        email: "admin20@hireg.com",
        password: "123123",
      },
      expect.any(Object)
    );
  });
});
