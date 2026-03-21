"use client";

import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { usePagination } from "@/hooks/use-pagination";
import { formatDate } from "@/lib/utils";
import { getStaffMembers } from "@/services/staff/staff.service";
import type { StaffMember } from "@/types/staff";

export function StaffManagement() {
  const [query, setQuery] = useState("");
  const [inviteOpen, setInviteOpen] = useState(false);

  const filteredStaff = useMemo(() => {
    return getStaffMembers().filter((member) => {
      const haystack = `${member.fullName} ${member.email} ${member.jobTitle} ${member.department}`.toLowerCase();
      return haystack.includes(query.toLowerCase());
    });
  }, [query]);

  const pagination = usePagination(filteredStaff, 4);

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
            Staff management
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Searchable table with pagination and an example modal flow for future invites.
          </p>
        </div>
        <Button onClick={() => setInviteOpen(true)}>Invite staff</Button>
      </div>

      <DataTable<StaffMember>
        title="Team directory"
        description="Mock data mirrors the contract you can later back with Firestore."
        columns={[
          {
            key: "person",
            header: "Person",
            render: (member) => (
              <div>
                <p className="font-medium text-slate-950 dark:text-white">{member.fullName}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{member.email}</p>
              </div>
            ),
          },
          {
            key: "role",
            header: "Role",
            render: (member) => (
              <div>
                <p>{member.jobTitle}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{member.department}</p>
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
                {member.status}
              </Badge>
            ),
          },
          {
            key: "joined",
            header: "Joined",
            render: (member) => formatDate(member.joinedAt),
          },
          {
            key: "phone",
            header: "Phone",
            render: (member) => member.phone,
          },
        ]}
        rows={pagination.currentItems}
        searchValue={query}
        onSearchChange={setQuery}
        searchPlaceholder="Search by name, role, or department..."
        page={pagination.page}
        pageCount={pagination.pageCount}
        onPreviousPage={() => pagination.setPage(pagination.page - 1)}
        onNextPage={() => pagination.setPage(pagination.page + 1)}
        canGoPrevious={pagination.canGoPrevious}
        canGoNext={pagination.canGoNext}
        emptyState={
          <div className="text-center">
            <p className="font-medium text-slate-950 dark:text-white">No staff found</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Adjust your search query or seed more mock staff records.
            </p>
          </div>
        }
      />

      <Modal
        open={inviteOpen}
        onClose={() => setInviteOpen(false)}
        title="Invite a new staff member"
        description="This starter modal is ready to connect to a real invite flow later."
      >
        <div className="space-y-4">
          <Input label="Full name" placeholder="Jamie Carter" />
          <Input label="Email" type="email" placeholder="jamie@company.com" />
          <Input label="Job title" placeholder="Support Lead" />
          <Button className="w-full" onClick={() => setInviteOpen(false)}>
            Save mock invite
          </Button>
        </div>
      </Modal>
    </>
  );
}
