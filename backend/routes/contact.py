from fastapi import APIRouter, HTTPException
from models.contact import ContactCreate, ContactSubmission
from datetime import datetime
import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
ROOT_DIR = Path(__file__).parent.parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

router = APIRouter(prefix="/api/contact", tags=["contact"])

@router.post("")
async def submit_contact_form(contact: ContactCreate):
    """Submit a contact form"""
    contact_dict = contact.dict()
    contact_dict["status"] = "new"
    contact_dict["submittedAt"] = datetime.utcnow()
    
    result = await db.contact_submissions.insert_one(contact_dict)
    
    if result.inserted_id:
        return {
            "success": True,
            "message": "Thank you for your message! I'll get back to you soon."
        }
    else:
        raise HTTPException(status_code=500, detail="Failed to submit contact form")