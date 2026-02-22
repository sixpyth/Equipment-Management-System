from fastapi import FastAPI
from app.api.api import api_router

app = FastAPI()


@app.get("/")
def health_check():
    return "ok"


app.include_router(api_router)
