from enum import StrEnum


class IssueType(StrEnum):
    ISSUE = "Выдан"
    TEMPORARY = "Временно выдан"
    WRITE_OFF = "Выписан"
