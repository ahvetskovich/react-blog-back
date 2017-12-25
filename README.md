## Description
API to get news feeds, specific post pages with comments.

## Launch
1. Install dependencies - `npm install`
2. Run - `psql -U postgres -f src/db/init.sql`
3. Run the development server - `npm start`

# API
1. Login as test user.
Endpoint `POST /login` with following json
```
{
	"login": "test_user@gmail.com",
	"password": "test_user"
}
```
2. Get post stream `GET /postStream`
3. To access endpoints with auth - Use `token` from `POST /login` endpoint and pass it to `Authorization` header as
 `Bearer token`  
 Endpoints requiring auth: `GET /postPage/${postId}`