import { useEffect, useState } from "react";
import { listUsers, createUser, terminateUser } from "../../api/endpoints";
import type { User } from "../../api/types";
import { Table } from "../../ui/Table";
import { Button } from "../../ui/Button";
import { Input } from "../../ui/Input";
import { Modal } from "../../ui/Modal";
import { Loading } from "../../ui/Loading";

export function UsersPage() {
  const [items, setItems] = useState<User[] | null>(null);
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const reload = () => listUsers().then(setItems);

  useEffect(() => {
    reload().catch(() => setItems([]));
  }, []);

  if (!items) return <Loading />;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Пользователи</h1>
        <Button onClick={() => setOpen(true)}>Добавить</Button>
      </div>

      <Table
        columns={[
          { key: "id", title: "ID" },
          { key: "surname", title: "Фамилия" },
          { key: "name", title: "Имя" },
          { key: "status", title: "Статус" },
          {
            key: "actions",
            title: "Действия",
            render: (r) => (
              <Button
                variant="danger"
                disabled={r.status === "FIRED"}
                onClick={async () => {
                  await terminateUser(`${r.surname} ${r.name}`);
                  await reload();
                }}
              >
                Уволить
              </Button>
            )
          }
        ]}
        rows={items}
      />

      <Modal open={open} title="Новый пользователь" onClose={() => setOpen(false)}>
        <div className="space-y-3">
          <Input label="Имя" value={name} onChange={setName} />
          <Input label="Фамилия" value={surname} onChange={setSurname} />

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={() => setOpen(false)}>Отмена</Button>
            <Button
              onClick={async () => {
                await createUser({ name, surname });
                setOpen(false);
                setName("");
                setSurname("");
                await reload();
              }}
            >
              Создать
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}