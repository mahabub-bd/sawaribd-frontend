import { TableCell, TableRow } from "@/components/ui/table";
import { UserActivityTypes } from "@/types";
import { formatDateTime } from "@/utils/helper";

export default function UserActivityList({
  userId,
  action,
  createdAt,
  path,
}: UserActivityTypes) {
  return (
    <TableRow>
      <TableCell>{userId?.name}</TableCell>
      <TableCell className=" capitalize">{userId?.role}</TableCell>
      <TableCell className=" capitalize">{action}</TableCell>
      <TableCell className=" capitalize">{path}</TableCell>
      <TableCell className="text-right">{formatDateTime(createdAt)}</TableCell>
    </TableRow>
  );
}
