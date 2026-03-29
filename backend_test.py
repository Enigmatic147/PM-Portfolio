#!/usr/bin/env python3
"""
Backend API Testing for Pranay Mishra's Portfolio
Tests all backend APIs as requested in the review.
"""

import requests
import json
import sys
from datetime import datetime

# Backend URL from frontend/.env
BASE_URL = "https://pm-portfolio-35.preview.emergentagent.com/api"

class PortfolioAPITester:
    def __init__(self):
        self.base_url = BASE_URL
        self.jwt_token = None
        self.test_results = []
        
    def log_test(self, test_name, success, details="", response_data=None):
        """Log test results"""
        result = {
            "test": test_name,
            "success": success,
            "details": details,
            "timestamp": datetime.now().isoformat()
        }
        if response_data:
            result["response_data"] = response_data
        self.test_results.append(result)
        
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}")
        if details:
            print(f"    {details}")
        if not success and response_data:
            print(f"    Response: {response_data}")
        print()

    def test_public_blog_api(self):
        """Test GET /api/blog - Should return all published blog posts"""
        print("🔍 Testing Public Blog API...")
        
        try:
            response = requests.get(f"{self.base_url}/blog", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                # Check response structure
                if "posts" not in data:
                    self.log_test("Public Blog API - Structure", False, 
                                "Response missing 'posts' field", data)
                    return
                
                posts = data["posts"]
                post_count = len(posts)
                
                # Check we have 4 blog posts
                if post_count == 4:
                    self.log_test("Public Blog API - Post Count", True, 
                                f"Found {post_count} blog posts as expected")
                else:
                    self.log_test("Public Blog API - Post Count", False, 
                                f"Expected 4 posts, got {post_count}")
                
                # Check difficulty levels are "Beginner"
                beginner_count = sum(1 for post in posts if post.get("difficulty") == "Beginner")
                if beginner_count == 4:
                    self.log_test("Public Blog API - Difficulty Levels", True, 
                                "All 4 posts have difficulty set to 'Beginner'")
                else:
                    self.log_test("Public Blog API - Difficulty Levels", False, 
                                f"Expected 4 'Beginner' posts, got {beginner_count}")
                
                # Check response structure has required fields
                if posts and all(key in posts[0] for key in ["title", "slug", "content", "category", "difficulty"]):
                    self.log_test("Public Blog API - Response Structure", True, 
                                "Posts have all required fields")
                else:
                    self.log_test("Public Blog API - Response Structure", False, 
                                "Posts missing required fields")
                    
            else:
                self.log_test("Public Blog API", False, 
                            f"HTTP {response.status_code}: {response.text}")
                
        except requests.exceptions.RequestException as e:
            self.log_test("Public Blog API", False, f"Request failed: {str(e)}")

    def test_blog_post_by_slug(self):
        """Test GET /api/blog/sql-product-decisions - Should return single post"""
        print("🔍 Testing Blog Post by Slug...")
        
        try:
            response = requests.get(f"{self.base_url}/blog/sql-product-decisions", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                # Check response structure
                if "post" not in data:
                    self.log_test("Blog Post by Slug - Structure", False, 
                                "Response missing 'post' field", data)
                    return
                
                post = data["post"]
                
                # Check required fields
                required_fields = ["title", "content", "category", "difficulty", "slug", "excerpt", "readTime"]
                missing_fields = [field for field in required_fields if field not in post]
                
                if not missing_fields:
                    self.log_test("Blog Post by Slug - Fields", True, 
                                "Post has all required fields")
                else:
                    self.log_test("Blog Post by Slug - Fields", False, 
                                f"Missing fields: {missing_fields}")
                
                # Check specific post details
                if post.get("slug") == "sql-product-decisions":
                    self.log_test("Blog Post by Slug - Correct Post", True, 
                                "Retrieved correct post by slug")
                else:
                    self.log_test("Blog Post by Slug - Correct Post", False, 
                                f"Expected slug 'sql-product-decisions', got '{post.get('slug')}'")
                    
            else:
                self.log_test("Blog Post by Slug", False, 
                            f"HTTP {response.status_code}: {response.text}")
                
        except requests.exceptions.RequestException as e:
            self.log_test("Blog Post by Slug", False, f"Request failed: {str(e)}")

    def test_contact_form(self):
        """Test POST /api/contact with test data"""
        print("🔍 Testing Contact Form...")
        
        test_data = {
            "name": "John Smith",
            "email": "john.smith@example.com",
            "subject": "Portfolio Inquiry",
            "message": "I'm interested in learning more about your product management experience."
        }
        
        try:
            response = requests.post(f"{self.base_url}/contact", 
                                   json=test_data, 
                                   headers={"Content-Type": "application/json"},
                                   timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                # Check for success response
                if data.get("success") is True and "message" in data:
                    self.log_test("Contact Form - Success Response", True, 
                                f"Success message: {data['message']}")
                else:
                    self.log_test("Contact Form - Success Response", False, 
                                "Missing success field or message", data)
                    
            else:
                self.log_test("Contact Form", False, 
                            f"HTTP {response.status_code}: {response.text}")
                
        except requests.exceptions.RequestException as e:
            self.log_test("Contact Form", False, f"Request failed: {str(e)}")

    def test_admin_login(self):
        """Test POST /api/admin/login with credentials"""
        print("🔍 Testing Admin Login...")
        
        credentials = {
            "username": "admin",
            "password": "admin123"
        }
        
        try:
            response = requests.post(f"{self.base_url}/admin/login", 
                                   json=credentials,
                                   headers={"Content-Type": "application/json"},
                                   timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                # Check for JWT token
                if "token" in data:
                    self.jwt_token = data["token"]
                    self.log_test("Admin Login - JWT Token", True, 
                                "JWT token received and saved")
                else:
                    self.log_test("Admin Login - JWT Token", False, 
                                "No JWT token in response", data)
                
                # Check for user info
                if "user" in data and "username" in data["user"]:
                    self.log_test("Admin Login - User Info", True, 
                                f"User info received: {data['user']['username']}")
                else:
                    self.log_test("Admin Login - User Info", False, 
                                "Missing user info in response", data)
                    
            else:
                self.log_test("Admin Login", False, 
                            f"HTTP {response.status_code}: {response.text}")
                
        except requests.exceptions.RequestException as e:
            self.log_test("Admin Login", False, f"Request failed: {str(e)}")

    def test_admin_blog_api(self):
        """Test GET /api/admin/blog with Authorization header"""
        print("🔍 Testing Admin Blog API...")
        
        if not self.jwt_token:
            self.log_test("Admin Blog API", False, 
                        "No JWT token available - admin login may have failed")
            return
        
        headers = {
            "Authorization": f"Bearer {self.jwt_token}",
            "Content-Type": "application/json"
        }
        
        try:
            response = requests.get(f"{self.base_url}/admin/blog", 
                                  headers=headers, 
                                  timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                # Check response structure
                if "posts" not in data:
                    self.log_test("Admin Blog API - Structure", False, 
                                "Response missing 'posts' field", data)
                    return
                
                posts = data["posts"]
                post_count = len(posts)
                
                # Should return all posts including unpublished ones
                # Based on seed data, we expect 4 posts (all published in this case)
                if post_count >= 4:
                    self.log_test("Admin Blog API - Post Count", True, 
                                f"Found {post_count} posts (including unpublished)")
                else:
                    self.log_test("Admin Blog API - Post Count", False, 
                                f"Expected at least 4 posts, got {post_count}")
                
                # Check that we can see additional fields that public API might not show
                if posts and "createdAt" in posts[0] and "updatedAt" in posts[0]:
                    self.log_test("Admin Blog API - Admin Fields", True, 
                                "Admin-specific fields present (createdAt, updatedAt)")
                else:
                    self.log_test("Admin Blog API - Admin Fields", False, 
                                "Missing admin-specific fields")
                    
            else:
                self.log_test("Admin Blog API", False, 
                            f"HTTP {response.status_code}: {response.text}")
                
        except requests.exceptions.RequestException as e:
            self.log_test("Admin Blog API", False, f"Request failed: {str(e)}")

    def run_all_tests(self):
        """Run all backend API tests"""
        print("🚀 Starting Backend API Tests for Pranay Mishra's Portfolio")
        print(f"🌐 Base URL: {self.base_url}")
        print("=" * 60)
        
        # Run tests in order
        self.test_public_blog_api()
        self.test_blog_post_by_slug()
        self.test_contact_form()
        self.test_admin_login()
        self.test_admin_blog_api()
        
        # Summary
        print("=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        
        total_tests = len(self.test_results)
        passed_tests = sum(1 for result in self.test_results if result["success"])
        failed_tests = total_tests - passed_tests
        
        print(f"Total Tests: {total_tests}")
        print(f"✅ Passed: {passed_tests}")
        print(f"❌ Failed: {failed_tests}")
        print(f"Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        
        if failed_tests > 0:
            print("\n🔍 FAILED TESTS:")
            for result in self.test_results:
                if not result["success"]:
                    print(f"  • {result['test']}: {result['details']}")
        
        print("\n" + "=" * 60)
        return failed_tests == 0

if __name__ == "__main__":
    tester = PortfolioAPITester()
    success = tester.run_all_tests()
    
    # Exit with appropriate code
    sys.exit(0 if success else 1)