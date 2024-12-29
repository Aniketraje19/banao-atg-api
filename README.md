# Banao API Documentation

This document describes the API endpoints for the **Banao** application.

## Base URL
Replace `{{server}}` with the actual server URL, e.g., `https://api.example.com`.

---

## User Endpoints

### 1. Register
**Endpoint:** `POST {{server}}/user/register`

**Request Body:**
```json
{
    "username": "aniket2",
    "email": "aniket2@gmail.com",
    "password": "verysecret"
}
```

### 2. Login
**Endpoint:** `POST {{server}}/user/login`

**Request Body:**
```json
{
    "email": "aniket2@gmail.com",
    "password": "verysecret"
}
```

### 3. Forget Password
**Endpoint:** `POST {{server}}/user/forget-password`

**Request Body:**
```json
{
    "email": "aniket2@gmail.com",
    "newPassword": "verysecret"
}
```

---

## Posts Endpoints

### 1. Create Post
**Endpoint:** `POST {{server}}/posts/`

**Headers:**
- Authorization: Bearer `<token>`

**Request Body:**
```json
{
    "content": "Hello World ffffff!"
}
```

### 2. Toggle Like Post
**Endpoint:** `POST {{server}}/posts/{postId}/like`

**Headers:**
- Authorization: Bearer `<token>`

**Request Body:** None

### 3. Add Comment
**Endpoint:** `POST {{server}}/posts/{postId}/comment`

**Headers:**
- Authorization: Bearer `<token>`

**Request Body:**
```json
{
    "text": "Bye!"
}
```

### 4. Get All Posts
**Endpoint:** `GET {{server}}/posts/`

**Headers:**
- Authorization: Bearer `<token>` (Optional)

**Request Body:** None

### 5. Update Post
**Endpoint:** `PUT {{server}}/posts/{postId}`

**Headers:**
- Authorization: Bearer `<token>`

**Request Body:**
```json
{
    "content": "The content is Changed!"
}
```

### 6. Delete Post
**Endpoint:** `DELETE {{server}}/posts/{postId}`

**Headers:**
- Authorization: Bearer `<token>`

**Request Body:** None
