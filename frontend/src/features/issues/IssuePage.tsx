import { useEffect, useState } from "react";
import type { EquipmentIssue } from "../../api/types";
import { listIssues, confirmIssue, closeIssue } from "../../api/endpoints";
import { Table } from "../../ui/Table";
import { Button } from "../../ui/Button";
import { Badge } from "../../ui/Badge";
import { IssueCreateModal } from "./IssueCreateModal";
import { Loading } from "../../ui/Loading";

export function IssuesPage() {
  const [items, setItems] = useState<EquipmentIssue[] | null>(null);
  const [open, setOpen] = useState(false);

  const reload = () => listIssues().then(setItems);

  useEffect(() => {
    reload().catch(() => setItems([]));
  }, []);

  if (!items) return <Loading />;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Заявки</h1>
        <Button onClick={() => setOpen(true)}>Создать заявку</Button>
      </div>

      <Table
        columns={[
          { key: "id", title: "ID" },
          { key: "full_user_name", title: "Сотрудник" },
          { key: "equipment", title: "Оборудование", render: (r) => r.equipment?.name ?? "-" },
          { key: "status", title: "Статус", render: (r) => <Badge text={r.status} /> },
          { key: "confirmed", title: "Подтверждено", render: (r) => (r.confirmed ? "Да" : "Нет") },
          {
            key: "actions",
            title: "Действия",
            render: (r) => (
              <div className="flex gap-2">
                {!r.confirmed && (
                  <Button
                    variant="secondary"
                    onClick={async () => {
                      await confirmIssue(r.id);
                      await reload();
                    }}
                  >
                    Подтвердить
                  </Button>
                )}
                {r.status !== "CLOSED" && (
                  <Button
                    variant="danger"
                    onClick={async () => {
                      await closeIssue(r.id);
                      await reload();
                    }}
                  >
                    Закрыть
                  </Button>
                )}
              </div>
            )
          }
        ]}
        rows={items}
      />

      <IssueCreateModal
        open={open}
        onClose={() => setOpen(false)}
        onCreated={async () => {
          setOpen(false);
          await reload();
        }}
      />
    </div>
  );
}