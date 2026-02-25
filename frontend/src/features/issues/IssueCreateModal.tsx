import { useState } from "react";
import { Modal } from "../../ui/Modal";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import { createIssue } from "../../api/endpoints";

export function IssueCreateModal(props: { open: boolean; onClose: () => void; onCreated: () => void }) {
  const [fullName, setFullName] = useState("");
  const [equipmentId, setEquipmentId] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <Modal open={props.open} title="Создать заявку" onClose={props.onClose}>
      <div className="space-y-3">
        <Input label="ФИО сотрудника" value={fullName} onChange={setFullName} placeholder="Иванов Иван Иванович" />
        <Input label="ID оборудования" value={equipmentId} onChange={setEquipmentId} placeholder="Напр. 12" />
        <Input label="Комментарий" value={notes} onChange={setNotes} placeholder="По задаче / на проект / срочно" />

        <div className="text-xs text-slate-400">
          Создание заявки
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="secondary" onClick={props.onClose}>Отмена</Button>
          <Button
            onClick={async () => {
              setLoading(true);
              try {
                await createIssue({
                  full_user_name: fullName,
                  equipment_id: equipmentId,
                  notes
                });
                props.onCreated();
              } finally {
                setLoading(false);
              }
            }}
            disabled={loading || !fullName || !equipmentId}
          >
            Создать
          </Button>
        </div>
      </div>
    </Modal>
  );
}