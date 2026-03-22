"use client";

import { useMemo, useState } from "react";

import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Select } from "@/components/ui/select";
import { usePagination } from "@/hooks/use-pagination";
import { formatDate } from "@/lib/utils";
import { getStaffMembers } from "@/services/staff/staff.service";
import type { StaffMember } from "@/types/staff";

const statusOptions = [
  { label: "All status", value: "all" },
  { label: "Active", value: "active" },
  { label: "On leave", value: "on_leave" },
  { label: "Inactive", value: "inactive" },
] as const;

function formatStatusLabel(status: StaffMember["status"]) {
  if (status === "on_leave") {
    return "On leave";
  }

  return status[0].toUpperCase() + status.slice(1);
}

export function StaffManagement() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<(typeof statusOptions)[number]["value"]>("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [inviteOpen, setInviteOpen] = useState(false);

  const staffMembers = useMemo(() => getStaffMembers(), []);
  const departments = useMemo(
    () => ["all", ...new Set(staffMembers.map((member) => member.department))],
    [staffMembers],
  );

  const filteredStaff = useMemo(() => {
    return staffMembers.filter((member) => {
      const haystack =
        `${member.fullName} ${member.email} ${member.jobTitle} ${member.department}`.toLowerCase();
      const matchesQuery = haystack.includes(query.trim().toLowerCase());
      const matchesStatus =
        statusFilter === "all" ? true : member.status === statusFilter;
      const matchesDepartment =
        departmentFilter === "all" ? true : member.department === departmentFilter;

      return matchesQuery && matchesStatus && matchesDepartment;
    });
  }, [departmentFilter, query, staffMembers, statusFilter]);

  const pagination = usePagination(filteredStaff, 4);
  const summary = useMemo(
    () => ({
      total: staffMembers.length,
      active: staffMembers.filter((member) => member.status === "active").length,
      onLeave: staffMembers.filter((member) => member.status === "on_leave").length,
    }),
    [staffMembers],
  );

  return (
    <div className="space-y-5">
      <PageHeader
        title="Staff Management"
        description="Manage team members, roles, and status across your CRM workspace with a clear, reusable management pattern."
        action={<Button onClick={() => setInviteOpen(true)}>Invite Staff</Button>}
      />

      <div className="grid gap-3.5 md:grid-cols-3">
        <Card className="p-4.5">
          <p className="text-sm text-muted">Total team members</p>
          <p className="mt-2.5 text-[1.9rem] font-semibold text-slate-950 dark:text-white">
            {summary.total}
          </p>
        </Card>
        <Card className="p-4.5">
          <p className="text-sm text-muted">Active right now</p>
          <p className="mt-2.5 text-[1.9rem] font-semibold text-slate-950 dark:text-white">
            {summary.active}
          </p>
        </Card>
        <Card className="p-4.5">
          <p className="text-sm text-muted">On leave</p>
          <p className="mt-2.5 text-[1.9rem] font-semibold text-slate-950 dark:text-white">
            {summary.onLeave}
          </p>
        </Card>
      </div>

      <DataTable<StaffMember>
        title="Team directory"
        description="Search, filter, and review mock staff records using the same list-management pattern future CRM modules can reuse."
        toolbar={
          <>
            <div className="w-full md:max-w-[180px]">
              <Select
                aria-label="Filter by status"
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(
                    event.target.value as (typeof statusOptions)[number]["value"],
                  )
                }
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </div>
            <div className="w-full md:max-w-[200px]">
              <Select
                aria-label="Filter by department"
                value={departmentFilter}
                onChange={(event) => setDepartmentFilter(event.target.value)}
              >
                {departments.map((department) => (
                  <option key={department} value={department}>
                    {department === "all" ? "All departments" : department}
                  </option>
                ))}
              </Select>
            </div>
          </>
        }
        columns={[
          {
            key: "person",
            header: "Person",
            render: (member) => (
              <div>
                <p className="font-medium text-slate-950 dark:text-white">{member.fullName}</p>
                <p className="text-sm text-muted">{member.email}</p>
              </div>
            ),
          },
          {
            key: "role",
            header: "Role",
            render: (member) => (
              <div>
                <p className="font-medium text-slate-800 dark:text-slate-100">
                  {member.jobTitle}
                </p>
                <p className="text-sm text-muted">{member.department}</p>
              </div>
            ),
          },
          {
            key: "status",
            header: "Status",
            render: (member) => (
              <Badge
                tone={
                  member.status === "active"
                    ? "positive"
                    : member.status === "on_leave"
                      ? "warning"
                      : "neutral"
                }
              >
                {formatStatusLabel(member.status)}
              </Badge>
            ),
          },
          {
            key: "joined",
            header: "Joined",
            render: (member) => (
              <span className="text-sm text-muted">{formatDate(member.joinedAt)}</span>
            ),
          },
          {
            key: "phone",
            header: "Phone",
            render: (member) => (
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-muted">{member.phone}</span>
                <button
                  type="button"
                  className="rounded-[12px] px-2 py-1 text-xs font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                >
                  View
                </button>
              </div>
            ),
          },
        ]}
        rows={pagination.currentItems}
        searchValue={query}
        onSearchChange={setQuery}
        searchPlaceholder="Search by name, email, role, or department..."
        page={pagination.page}
        pageCount={pagination.pageCount}
        onPreviousPage={() => pagination.setPage(pagination.page - 1)}
        onNextPage={() => pagination.setPage(pagination.page + 1)}
        canGoPrevious={pagination.canGoPrevious}
        canGoNext={pagination.canGoNext}
        footerLabel={`Showing ${pagination.currentItems.length} of ${filteredStaff.length} matching team members`}
        emptyState={
          <div className="text-center">
            <p className="font-medium text-slate-950 dark:text-white">No staff found</p>
            <p className="mt-2 text-sm text-muted">
              Try a different search term or reset the current filters.
            </p>
          </div>
        }
      />

      <Modal
        open={inviteOpen}
        onClose={() => setInviteOpen(false)}
        title="Invite a new staff member"
        description="Keep this flow small and trustworthy in v1, then connect it to a real invite system later."
      >
        <div className="space-y-4">
          <Input label="Full name" placeholder="Jamie Carter" />
          <Input label="Email" type="email" placeholder="jamie@company.com" />
          <Select label="Department" defaultValue="Support">
            {departments
              .filter((department) => department !== "all")
              .map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
          </Select>
          <Input label="Job title" placeholder="Support Lead" />
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setInviteOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setInviteOpen(false)}>Save mock invite</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
