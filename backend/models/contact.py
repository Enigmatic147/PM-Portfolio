from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import datetime
from bson import ObjectId

class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

class ContactSubmission(ContactCreate):
    id: Optional[str] = Field(None, alias="_id")
    status: str = "new"  # "new", "read", "replied"
    submittedAt: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True

class ContactStatusUpdate(BaseModel):
    status: str