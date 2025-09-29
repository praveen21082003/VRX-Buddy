from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import time
from langchain_google_genai.chat_models import ChatGoogleGenerativeAI


llm = ChatGoogleGenerativeAI(
    google_api_key = "AIzaSyD2RuJtzWK-ReecEHRZHFaYAbcuPmoCSiQ",
    temperature = 0.7,
    model = "gemini-2.5-flash-lite",
    max_tokens = 600
)


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserQuestion(BaseModel):
    question: str

class Form(BaseModel):
    fullname: str
    email: str
    country_code: str
    phone: int
    interest: str
    message: str
    
async def llm_answer(question: str):
    async for event in llm.astream_events(question, version = "v2"):
        if event["event"] == "on_chat_model_stream":
            yield event["data"]["chunk"].content


@app.post("/save_user_data")
async def save_form(form: Form):
    # You can process or store the form data here
    time.sleep(2)
    print(form)
    return {"message" : " can also check our FAQ for quick answers.", "userId": "VRXUSER-123456"}

@app.post("/bot")
async def get_answer(question: UserQuestion):
    return StreamingResponse(
        content = llm_answer(question.question),
        media_type = "text/event-stream",
    )