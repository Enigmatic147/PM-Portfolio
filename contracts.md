# API Contracts & Backend Integration Plan

## Overview
Build a backend system with MongoDB for blog management and contact form functionality, plus an admin panel for easy content management.

## 1. Database Models

### BlogPost Model
```python
{
  "_id": ObjectId,
  "title": str,
  "slug": str (unique, auto-generated from title),
  "excerpt": str,
  "content": str (markdown format),
  "category": str,
  "difficulty": str (enum: "Beginner", "Intermediate", "Advanced"),
  "readTime": str,
  "date": datetime,
  "number": str (auto-generated based on order),
  "published": bool (default: True),
  "createdAt": datetime,
  "updatedAt": datetime
}
```

### ContactSubmission Model
```python
{
  "_id": ObjectId,
  "name": str,
  "email": str,
  "subject": str,
  "message": str,
  "status": str (enum: "new", "read", "replied"),
  "submittedAt": datetime
}
```

### Admin User Model (Simple Auth)
```python
{
  "_id": ObjectId,
  "username": str (unique),
  "password": str (hashed),
  "email": str,
  "createdAt": datetime
}
```

## 2. API Endpoints

### Public Blog APIs
- `GET /api/blog` - List all published blog posts (sorted by date desc)
  - Query params: category, difficulty, limit, skip
  - Response: { posts: [...], total: int }

- `GET /api/blog/:slug` - Get single blog post by slug
  - Response: { post: {...} }

### Contact Form API
- `POST /api/contact` - Submit contact form
  - Body: { name, email, subject, message }
  - Response: { success: true, message: "..." }

### Admin APIs (Protected with JWT)
- `POST /api/admin/login` - Admin login
  - Body: { username, password }
  - Response: { token: "...", user: {...} }

- `GET /api/admin/blog` - List all posts (including unpublished)
  - Response: { posts: [...] }

- `POST /api/admin/blog` - Create new blog post
  - Body: { title, excerpt, content, category, difficulty, readTime }
  - Response: { post: {...} }

- `PUT /api/admin/blog/:id` - Update blog post
  - Body: { title, excerpt, content, category, difficulty, readTime, published }
  - Response: { post: {...} }

- `DELETE /api/admin/blog/:id` - Delete blog post
  - Response: { success: true }

- `GET /api/admin/contacts` - List all contact submissions
  - Response: { contacts: [...] }

- `PUT /api/admin/contacts/:id` - Mark contact as read/replied
  - Body: { status }
  - Response: { contact: {...} }

## 3. Frontend-Backend Integration

### Current Mock Data Usage (to be replaced)
- `/app/frontend/src/mock.js` → blogPostsData
  - Replace with API call: `GET /api/blog`
  
- `/app/frontend/src/mock.js` → submitContactForm
  - Replace with API call: `POST /api/contact`

### New Components to Create
1. **Admin Login Page** (`/app/frontend/src/pages/AdminLoginPage.jsx`)
   - Route: `/admin/login`
   - Form with username/password
   - Store JWT token in localStorage

2. **Admin Dashboard** (`/app/frontend/src/pages/AdminDashboard.jsx`)
   - Route: `/admin/dashboard`
   - Protected route (check JWT)
   - Show stats: total posts, contact submissions

3. **Admin Blog Management** (`/app/frontend/src/pages/AdminBlogPage.jsx`)
   - Route: `/admin/blog`
   - List all blog posts with edit/delete actions
   - "Create New Post" button

4. **Admin Blog Editor** (`/app/frontend/src/pages/AdminBlogEditor.jsx`)
   - Route: `/admin/blog/new` or `/admin/blog/edit/:id`
   - Form fields:
     - Title (auto-generates slug)
     - Category
     - Difficulty (dropdown: Beginner, Intermediate, Advanced)
     - Read time
     - Excerpt
     - Content (textarea with markdown support)
     - Published checkbox
   - Preview option

5. **Admin Contact Submissions** (`/app/frontend/src/pages/AdminContactsPage.jsx`)
   - Route: `/admin/contacts`
   - List all contact form submissions
   - Mark as read/replied

### Files to Update
1. `/app/frontend/src/components/Writing.jsx`
   - Replace: `import { blogPostsData } from '../mock'`
   - With: `useEffect(() => { fetch('/api/blog') })`

2. `/app/frontend/src/pages/BlogPostPage.jsx`
   - Replace: `blogPostsData.find()`
   - With: `fetch('/api/blog/:slug')`

3. `/app/frontend/src/components/Contact.jsx`
   - Replace: `submitContactForm(formData)` from mock
   - With: `axios.post('/api/contact', formData)`

4. `/app/frontend/src/App.js`
   - Add admin routes:
     ```jsx
     <Route path="/admin/login" element={<AdminLoginPage />} />
     <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
     <Route path="/admin/blog" element={<ProtectedRoute><AdminBlogPage /></ProtectedRoute>} />
     <Route path="/admin/blog/new" element={<ProtectedRoute><AdminBlogEditor /></ProtectedRoute>} />
     <Route path="/admin/blog/edit/:id" element={<ProtectedRoute><AdminBlogEditor /></ProtectedRoute>} />
     <Route path="/admin/contacts" element={<ProtectedRoute><AdminContactsPage /></ProtectedRoute>} />
     ```

## 4. Implementation Steps

### Phase 1: Backend Setup
1. Create MongoDB models in `/app/backend/models/`
2. Implement public blog APIs
3. Implement contact form API
4. Test with curl

### Phase 2: Admin Backend
1. Implement JWT authentication
2. Create admin APIs for blog CRUD
3. Create admin APIs for contact management
4. Seed initial admin user

### Phase 3: Frontend Integration
1. Create API service layer (`/app/frontend/src/services/api.js`)
2. Update existing components to use real APIs
3. Create admin pages
4. Add protected routes

### Phase 4: Admin Panel UI
1. Build admin login page
2. Build blog editor with markdown preview
3. Build blog management page
4. Build contact submissions page

## 5. Authentication Flow
1. Admin logs in → receives JWT token
2. Token stored in localStorage
3. Protected routes check for token
4. API requests include token in Authorization header
5. Backend validates token for admin APIs

## 6. Data Migration
- Current mock blog posts will be seeded into MongoDB
- Admin user will be created with default credentials (to be shared with user)

## 7. Environment Variables
- `JWT_SECRET` - Secret key for JWT signing
- `ADMIN_USERNAME` - Initial admin username
- `ADMIN_PASSWORD` - Initial admin password (will be hashed)

## Success Criteria
✅ Contact form sends emails/stores in DB
✅ Public blog pages fetch from MongoDB
✅ Admin can login securely
✅ Admin can create/edit/delete blog posts
✅ Admin can set difficulty levels (Beginner, Intermediate, Advanced)
✅ Admin can view contact form submissions
✅ All existing mock data migrated to database
