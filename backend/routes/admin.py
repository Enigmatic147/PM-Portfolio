from fastapi import APIRouter, HTTPException, Depends, Header
from typing import Optional, List
from models.admin import AdminLogin, AdminResponse
from models.blog_post import BlogPostCreate, BlogPostUpdate
from models.contact import ContactStatusUpdate
from utils.auth import verify_password, create_access_token, verify_token
from utils.slug import generate_slug
from datetime import datetime
import os
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
ROOT_DIR = Path(__file__).parent.parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

router = APIRouter(prefix="/api/admin", tags=["admin"])

# Dependency to verify JWT token
async def verify_admin_token(authorization: Optional[str] = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid authorization header")
    
    token = authorization.replace("Bearer ", "")
    payload = verify_token(token)
    
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    
    return payload

@router.post("/login")
async def admin_login(credentials: AdminLogin):
    """Admin login endpoint"""
    admin = await db.admin_users.find_one({"username": credentials.username})
    
    if not admin or not verify_password(credentials.password, admin["password"]):
        raise HTTPException(status_code=401, detail="Invalid username or password")
    
    # Create access token
    token = create_access_token(data={"sub": admin["username"], "email": admin["email"]})
    
    return {
        "token": token,
        "user": {
            "username": admin["username"],
            "email": admin["email"]
        }
    }

# Blog Management Routes
@router.get("/blog")
async def get_all_admin_posts(admin: dict = Depends(verify_admin_token)):
    """Get all blog posts (including unpublished)"""
    posts_cursor = db.blog_posts.find().sort("date", -1)
    posts = await posts_cursor.to_list(length=1000)
    
    for post in posts:
        post["_id"] = str(post["_id"])
        post["id"] = post["_id"]
    
    return {"posts": posts}

@router.post("/blog")
async def create_blog_post(post_data: BlogPostCreate, admin: dict = Depends(verify_admin_token)):
    """Create a new blog post"""
    # Generate slug if not provided or regenerate from title
    slug = generate_slug(post_data.title)
    
    # Check if slug already exists
    existing = await db.blog_posts.find_one({"slug": slug})
    if existing:
        # Append a number to make it unique
        counter = 1
        while existing:
            new_slug = f"{slug}-{counter}"
            existing = await db.blog_posts.find_one({"slug": new_slug})
            counter += 1
        slug = new_slug
    
    # Get the highest number for sequential numbering
    last_post = await db.blog_posts.find_one(sort=[("number", -1)])
    if last_post and last_post.get("number"):
        try:
            last_num = int(last_post["number"])
            next_num = str(last_num + 1).zfill(2)
        except:
            next_num = "01"
    else:
        next_num = "01"
    
    post_dict = post_data.dict()
    post_dict["slug"] = slug
    post_dict["number"] = next_num
    post_dict["date"] = datetime.utcnow()
    post_dict["createdAt"] = datetime.utcnow()
    post_dict["updatedAt"] = datetime.utcnow()
    
    result = await db.blog_posts.insert_one(post_dict)
    
    if result.inserted_id:
        post_dict["_id"] = str(result.inserted_id)
        post_dict["id"] = post_dict["_id"]
        return {"post": post_dict}
    else:
        raise HTTPException(status_code=500, detail="Failed to create blog post")

@router.put("/blog/{post_id}")
async def update_blog_post(
    post_id: str,
    post_data: BlogPostUpdate,
    admin: dict = Depends(verify_admin_token)
):
    """Update a blog post"""
    if not ObjectId.is_valid(post_id):
        raise HTTPException(status_code=400, detail="Invalid post ID")
    
    update_dict = {k: v for k, v in post_data.dict().items() if v is not None}
    
    # If title is updated, regenerate slug
    if "title" in update_dict:
        update_dict["slug"] = generate_slug(update_dict["title"])
    
    update_dict["updatedAt"] = datetime.utcnow()
    
    result = await db.blog_posts.update_one(
        {"_id": ObjectId(post_id)},
        {"$set": update_dict}
    )
    
    if result.modified_count > 0 or result.matched_count > 0:
        updated_post = await db.blog_posts.find_one({"_id": ObjectId(post_id)})
        updated_post["_id"] = str(updated_post["_id"])
        updated_post["id"] = updated_post["_id"]
        return {"post": updated_post}
    else:
        raise HTTPException(status_code=404, detail="Blog post not found")

@router.delete("/blog/{post_id}")
async def delete_blog_post(post_id: str, admin: dict = Depends(verify_admin_token)):
    """Delete a blog post"""
    if not ObjectId.is_valid(post_id):
        raise HTTPException(status_code=400, detail="Invalid post ID")
    
    result = await db.blog_posts.delete_one({"_id": ObjectId(post_id)})
    
    if result.deleted_count > 0:
        return {"success": True, "message": "Blog post deleted successfully"}
    else:
        raise HTTPException(status_code=404, detail="Blog post not found")

# Contact Management Routes
@router.get("/contacts")
async def get_all_contacts(admin: dict = Depends(verify_admin_token)):
    """Get all contact form submissions"""
    contacts_cursor = db.contact_submissions.find().sort("submittedAt", -1)
    contacts = await contacts_cursor.to_list(length=1000)
    
    for contact in contacts:
        contact["_id"] = str(contact["_id"])
        contact["id"] = contact["_id"]
    
    return {"contacts": contacts}

@router.put("/contacts/{contact_id}")
async def update_contact_status(
    contact_id: str,
    status_update: ContactStatusUpdate,
    admin: dict = Depends(verify_admin_token)
):
    """Update contact submission status"""
    if not ObjectId.is_valid(contact_id):
        raise HTTPException(status_code=400, detail="Invalid contact ID")
    
    result = await db.contact_submissions.update_one(
        {"_id": ObjectId(contact_id)},
        {"$set": {"status": status_update.status}}
    )
    
    if result.modified_count > 0 or result.matched_count > 0:
        updated_contact = await db.contact_submissions.find_one({"_id": ObjectId(contact_id)})
        updated_contact["_id"] = str(updated_contact["_id"])
        updated_contact["id"] = updated_contact["_id"]
        return {"contact": updated_contact}
    else:
        raise HTTPException(status_code=404, detail="Contact submission not found")