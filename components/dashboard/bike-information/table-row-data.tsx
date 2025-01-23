import { TableCell, TableRow } from "@/components/ui/table";
import { ReactNode } from "react";

const TableRowData = ({
  label,
  value,
  className = "",
}: {
  label: string;
  value: ReactNode;
  className?: string;
}) => (
  <TableRow>
    <TableCell>{label}</TableCell>
    <TableCell className={className}>{value}</TableCell>
  </TableRow>
);

export default TableRowData;
