import React from "react";

export function Table<T extends Record<string, any>>(props: {
  columns: { key: string; title: string; render?: (row: T) => React.ReactNode }[];
  rows: T[] | any;
}) {
  const rows: T[] = Array.isArray(props.rows) ? props.rows : [];

  return (
    <div className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-slate-900/70">
          <tr>
            {props.columns.map((c) => (
              <th key={c.key} className="text-left px-4 py-3 text-slate-300 font-medium">
                {c.title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td className="px-4 py-6 text-slate-500" colSpan={props.columns.length}>
                Нет данных
              </td>
            </tr>
          ) : (
            rows.map((r, idx) => (
              <tr key={idx} className="border-t border-slate-800">
                {props.columns.map((c) => (
                  <td key={c.key} className="px-4 py-3 text-slate-200">
                    {c.render ? c.render(r) : String(r[c.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}