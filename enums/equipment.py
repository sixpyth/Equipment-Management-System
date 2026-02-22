from enum import StrEnum


class EquipmentStatus(StrEnum):
    IN_STOCK = "На складе"
    GIVEN = "Выдан"
    RESERVED = "Зарезервирован"


class EquipmentCategory(StrEnum):
    COMPUTER_SET = "Комплект компьютера"
    PRINTERS_MFU = "Принтеры и МФУ"
    PHONES = "Телефоны"
    EXTERNAL_STORAGE = "Внешние носители информации"
    COMPONENTS = "Комплектующие компьютера"
    MONITORS = "Мониторы"
    TELEVISIONS = "Телевизоры"
    TV_BOXES = "ТВ-приставки"
    SOFTWARE_INSTALLATION = "Установка программного обеспечения"
    CONSUMABLES = "Расходные материалы"
    TABLETS = "Планшеты"
    LAPTOPS = "Ноутбуки"


class EquipmentIdentity(StrEnum):
    SERIAL_NUMBER = "Серийный_Номер"
    INVENTARY_NUMBER = "Инвентарный_Номер"


class EquipmentSource(StrEnum):
    PURCHACE = "Закупка"
    TRANSFER = "Передача"