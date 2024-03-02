import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Pagination from "../ui/Pagination";

type Props = {
  data: { [x: string]: string | JSX.Element }[];
  columns: {
    accessorKey: string;
    header: string;
    cell: (props: { getValue: () => React.ReactNode }) => React.ReactNode;
  }[];
  isLoading: boolean;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
};

export default function Table({
  data,
  columns,
  isLoading,
  page,
  setPage,
  totalPages,
}: Props) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange",
  });

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-separate border-spacing-y-2">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => (
                <th
                  key={header.id}
                  style={{ width: header.getSize() }}
                  className={`relative p-3 text-left font-semibold bg-gray-200 ${
                    index === 0 ? "border-l rounded-tl-lg rounded-bl-lg" : ""
                  } ${
                    index === headerGroup.headers.length - 1
                      ? "border-r rounded-tr-lg rounded-br-lg"
                      : ""
                  } border-t border-b border-gray-200`}
                >
                  {header.column.columnDef.header as React.ReactNode}
                  <div
                    onMouseDown={header.getResizeHandler()}
                    onTouchStart={header.getResizeHandler()}
                    className={`resizer ${
                      header.column.getIsResizing() ? "isResizing" : ""
                    }`}
                  ></div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={columns.length}>Loading, please wait...</td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length}>There's no data to show</td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell, index) => (
                  <td
                    key={cell.id}
                    style={{ width: cell.column.getSize() }}
                    className={`p-3 font-semibold ${
                      index === 0 ? "border-l rounded-tl-lg rounded-bl-lg" : ""
                    } ${
                      index === row.getVisibleCells().length - 1
                        ? "border-r rounded-tr-lg rounded-br-lg"
                        : ""
                    } border-t border-b border-gray-200`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
          {}
        </tbody>
      </table>
      {data.length > 0 && (
        <div className="flex justify-center items-center">
          <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </div>
      )}
    </div>
  );
}
