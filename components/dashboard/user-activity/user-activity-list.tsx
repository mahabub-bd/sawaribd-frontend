import { TableCell, TableRow } from "@/components/ui/table";
import type { UserActivityTypes } from "@/types";
import { formatDateTime } from "@/utils/helper";

export default function UserActivityList({
  userId,
  action,
  createdAt,
  path,
  actionIcon,
}: UserActivityTypes) {
  return (
    <TableRow>
      <TableCell>{userId?.name}</TableCell>
      <TableCell className="capitalize">{userId?.role}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          {actionIcon}
          <span className="capitalize">{action}</span>
        </div>
      </TableCell>
      <TableCell className="capitalize">{path}</TableCell>
      <TableCell className="text-right">{formatDateTime(createdAt)}</TableCell>
    </TableRow>
  );
}
