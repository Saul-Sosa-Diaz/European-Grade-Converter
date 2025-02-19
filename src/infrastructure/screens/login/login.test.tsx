/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the unit tests for the login screen.
 *
 * @date February 19, 2025
 * @description This file defines the unit tests for the login screen used in the application.
 * @author Saul Sosa
 */

import { signIn, useSession } from "next-auth/react";
import { Login } from "./login";
import { fireEvent, render, waitFor } from "@/tests/app-test-utils";

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    prefetch: () => null,
  }),
}));

jest.mock("next-auth/react");

describe("Login", () => {
  const mockUseSession = useSession as jest.Mock;
  const mockSignIn = signIn as jest.Mock;

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders loading spinner when status is loading", () => {
    mockUseSession.mockReturnValue({ data: null, status: "loading" });
    const screen = render(<Login />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("renders login form when status is not loading", () => {
    mockUseSession.mockReturnValue({ data: null, status: "unauthenticated" });
    const screen = render(<Login />);
    expect(screen.getByPlaceholderText("username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("password")).toBeInTheDocument();
  });

  it("redirects to /admin when session exists", () => {
    mockUseSession.mockReturnValue({ data: { user: { name: "test" } }, status: "authenticated" });
    render(<Login />);
    expect(mockPush).toHaveBeenCalledWith("/admin");
  });

  it("displays error message on invalid credentials", async () => {
    mockUseSession.mockReturnValue({ data: null, status: "unauthenticated" });
    mockSignIn.mockResolvedValue({ error: "Invalid credentials" });
    const screen = render(<Login />);
    fireEvent.change(screen.getByPlaceholderText("username"), { target: { value: "testuser" } });
    fireEvent.change(screen.getByPlaceholderText("password"), { target: { value: "wrongpassword" } });
    fireEvent.click(screen.getByText("Log In"));

    await waitFor(() => {
      expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
    });
  });

  it("redirects to /admin on successful login", async () => {
    mockUseSession.mockReturnValue({ data: null, status: "unauthenticated" });
    mockSignIn.mockResolvedValue({ url: "/admin" });

    const screen = render(<Login />);
    fireEvent.change(screen.getByPlaceholderText("username"), { target: { value: "testuser" } });
    fireEvent.change(screen.getByPlaceholderText("password"), { target: { value: "correctpassword" } });
    fireEvent.click(screen.getByText("Log In"));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/admin");
    });
  });
});