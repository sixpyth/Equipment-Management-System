from enum import StrEnum


class UserStatus(StrEnum):
    ACTIVE = "ACTIVE"
    TEMPORARY_BLOCKED = "TEMPRORARY_BLOCKED"
    FIRED = "FIRED"


class UserType(StrEnum):
    USER = "USER"
    HEAD_DEPARTMENT = "HEAD_DEPARTMENT"
    IT_ADMIN = "IT_ADMIN"
    SUPER_ADMIN = "SUPER_ADMIN"
