import { useEffect, useState } from "react";
import { listEquipment, createEquipment, updateEquipment } from "../../api/endpoints";
import type { Equipment } from "../../api/types";
import { Table } from "../../ui/Table";
import { Button } from "../../ui/Button";
import { Input } from "../../ui/Input";
import { Modal } from "../../ui/Modal";
import { Loading } from "../../ui/Loading";

export function EquipmentPage() {
  const [items, setItems] = useState<Equipment[] | null>(null);
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [inventory, setInventory] = useState("");

  const [source, setSource] = useState("");
  const [receivedAt, setReceivedAt] = useState("");
  const [warrantyUntil, setWarrantyUntil] = useState("");

  const reload = () => listEquipment().then(setItems);

  useEffect(() => {
    reload().catch(() => setItems([]));
  }, []);

  if (!items) return <Loading />;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Оборудование</h1>
        <Button onClick={() => setOpen(true)}>Добавить</Button>
      </div>

      <Table
        columns={[
          { key: "id", title: "ID" },
          { key: "name", title: "Название" },
          { key: "inventory_number", title: "Инвентарный №" },
          { key: "status", title: "Статус" },
          {
            key: "actions",
            title: "Действия",
            render: (r) => (
              <select
                value={r.status}
                onChange={async (e) => {
                  await updateEquipment(r.id, { status: e.target.value as any });
                  await reload();
                }}
                className="bg-slate-950 border border-slate-800 rounded px-2 py-1"
              >
                <option value="AVAILABLE">AVAILABLE</option>
                <option value="GIVEN">GIVEN</option>
                <option value="REPAIR">REPAIR</option>
                <option value="BROKEN">BROKEN</option>
              </select>
            )
          }
        ]}
        rows={items}
      />

      <Modal open={open} title="Новое оборудование" onClose={() => setOpen(false)}>
        <div className="space-y-3">
          <Input label="Название" value={name} onChange={setName} />
          <Input label="Инвентарный номер" value={inventory} onChange={setInventory} />
          <Input label="Источник" value={inventory} onChange={setInventory} />
          <Input label="Дата получения" type="date"  value={receivedAt} onChange={setReceivedAt} />
          <Input label="Гарантия до" type="date" value={warrantyUntil} onChange={setWarrantyUntil} />
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={() => setOpen(false)}>Отмена</Button>
            <Button
              onClick={async () => {
                await createEquipment({ name, inventory_number: inventory });
                setOpen(false);
                setName("");
                setInventory("");
                await reload();
              }}
            >
              Добавить
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}