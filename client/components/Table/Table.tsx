import React, { ReactNode } from "react"

interface Props {
    headers: string[]
    rows: ReactNode[][]
}

const Table = ({ headers, rows }: Props) => {
    return (
        <table className="w-full divide-y divide-dPri table-fixed text-gray-300 rounded-lg">
            <thead className="bg-dPri/80">
                {headers.map((head, i) => (
                    <th
                        className="py-3 px-6 text-sm  tracking-widest text-left text-gray-700 uppercase dark:text-gray-200 "
                        key={i}
                        scope={"col"}
                    >
                        {head}
                    </th>
                ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:bg-transparent dark:divide-dPri/50">
                {rows.map((row, rowIndex) => {
                    return (
                        <tr
                            className="hover:bg-blue-50 dark:hover:bg-gray-700"
                            key={rowIndex}
                        >
                            {row.map((col, colIndex) => {
                                return (
                                    <td
                                        className="py-4 px-6 text-sm font-medium text-gray-900 dark:text-white"
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
