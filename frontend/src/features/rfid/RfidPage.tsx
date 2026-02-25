import { useEffect, useState } from "react";
import { listRfidCards, assignRfidToUser } from "../../api/endpoints";
import { Table } from "../../ui/Table";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import { Loading } from "../../ui/Loading";

export function RfidPage() {
  const [cards, setCards] = useState<any[] | null>(null);
  const [userId, setUserId] = useState("");
  const [cardId, setCardId] = useState("");

  const reload = () => listRfidCards().then(setCards);

  useEffect(() => {
    reload().catch(() => setCards([]));
  }, []);

  if (!cards) return <Loading />;

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">RFID карты</h1>

      <div className="flex gap-2">
        <Input placeholder="ID карты" value={cardId} onChange={setCardId} />
        <Input placeholder="ID пользователя" value={userId} onChange={setUserId} />
        <Button
          onClick={async () => {
            await assignRfidToUser(cardId, userId);
            await reload();
          }}
        >
          Назначить
        </Button>
      </div>

      <Table
        columns={[
          { key: "id", title: "ID" },
          { key: "code", title: "Код карты" },
          { key: "user_id", title: "Пользователь" }
        ]}
        rows={cards}
      />
    </div>
  );
}