from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from models.blog_post import BlogPost
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

router = APIRouter(prefix="/api/blog", tags=["blog"])

@router.get("")
async def get_all_posts(
    category: Optional[str] = None,
    difficulty: Optional[str] = None,
    limit: int = Query(100, ge=1, le=100),
    skip: int = Query(0, ge=0)
):
    """Get all published blog posts"""
    query = {"published": True}
    
    if category:
        query["category"] = category
    if difficulty:
        query["difficulty"] = difficulty
    
    # Get total count
    total = await db.blog_posts.count_documents(query)
    
    # Get posts sorted by date descending
    posts_cursor = db.blog_posts.find(query).sort("date", -1).skip(skip).limit(limit)
    posts = await posts_cursor.to_list(length=limit)
    
    # Convert ObjectId to string
    for post in posts:
        post["_id"] = str(post["_id"])
        post["id"] = post["_id"]
    
    return {
        "posts": posts,
        "total": total,
        "skip": skip,
        "limit": limit
    }

@router.get("/{slug}")
async def get_post_by_slug(slug: str):
    """Get a single blog post by slug"""
    post = await db.blog_posts.find_one({"slug": slug, "published": True})
    
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    
    post["_id"] = str(post["_id"])
    post["id"] = post["_id"]
    
    return {"post": post}