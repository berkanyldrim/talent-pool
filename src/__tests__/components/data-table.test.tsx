import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { DataTable } from "@/components/data-table";

const mockData = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    stage: "New",
    rating: 4.5,
    appliedJob: "Software Engineer",
    resume: "resume.pdf",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    stage: "Interview",
    rating: 4.8,
    appliedJob: "Product Manager",
    resume: "resume.pdf",
  },
];

const mockColumns = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "stage",
    header: "Stage",
  },
  {
    accessorKey: "rating",
    header: "Rating",
  },
  {
    accessorKey: "appliedJob",
    header: "Applied Job",
  },
  {
    accessorKey: "resume",
    header: "Resume",
  },
];

describe("DataTable", () => {
  it("tablo başlıklarını göstermeli", () => {
    render(
      <DataTable columns={mockColumns} data={mockData} isLoading={false} />
    );

    mockColumns.forEach((column) => {
      expect(screen.getByText(column.header)).toBeInTheDocument();
    });
  });

  it("verileri doğru şekilde göstermeli", () => {
    render(
      <DataTable columns={mockColumns} data={mockData} isLoading={false} />
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByText("New")).toBeInTheDocument();
    expect(screen.getByText("4.5")).toBeInTheDocument();
    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
  });

  it("yükleme durumunda skeleton göstermeli", () => {
    render(<DataTable columns={mockColumns} data={[]} isLoading={true} />);

    const skeletonRows = screen.getAllByRole("row").slice(1);
    expect(skeletonRows.length).toBe(8);
  });

  it("arama kutusunu göstermeli ve çalışmalı", async () => {
    const onSearch = vi.fn();
    render(
      <DataTable
        columns={mockColumns}
        data={mockData}
        isLoading={false}
        onSearch={onSearch}
      />
    );

    const searchInput = screen.getByPlaceholderText("Search...");
    expect(searchInput).toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: "John" } });

    await new Promise((resolve) => setTimeout(resolve, 300));
    expect(onSearch).toHaveBeenCalledWith("John");
  });

  it("veri yokken 'No results found' mesajını göstermeli", () => {
    render(<DataTable columns={mockColumns} data={[]} isLoading={false} />);

    expect(screen.getByText("No results found.")).toBeInTheDocument();
  });

  it("Add Talent butonunu göstermeli", () => {
    const onAddTalent = vi.fn();
    render(
      <DataTable
        columns={mockColumns}
        data={mockData}
        isLoading={false}
        onAddTalent={onAddTalent}
      />
    );

    const addButton = screen.getByRole("button", { name: /add talent/i });
    expect(addButton).toBeInTheDocument();

    fireEvent.click(addButton);
    expect(onAddTalent).toHaveBeenCalled();
  });
});
