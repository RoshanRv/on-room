import React, { ReactNode } from "react"

interface Props {
    headers: string[]
    rows: ReactNode[][]
}

const Table = ({ headers, rows }: Props) => {
    return (
        <table className="w-full divide-y divide-dPri table-fixed text-gray-300 rounded-lg my-4">
            <thead className="bg-dPri/80">
                <tr>
                    {headers.map((head, i) => (
                        <th
                            className="py-3 px-6 text-sm  tracking-widest text-left text-gray-700 uppercase dark:text-gray-200 "
                            key={i}
                            scope={"col"}
                        >
                            {head}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="bg-white divide-y  dark:bg-transparent divide-dPri/50">
                {rows.map((row, rowIndex) => {
                    return (
                        <tr
                            className="hover:bg-gray-50 dark:hover:bg-gray-800"
                            key={rowIndex}
                        >
                            {row.map((col, colIndex) => {
                                return (
                                    <td
                                        className="py-4 px-6 text-sm font-medium text-gray-800 dark:text-gray-300 text-clip break-all"
                                        key={colIndex}
                                    >
                                        {col}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default Table
