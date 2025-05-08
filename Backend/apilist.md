# StackMatch Apis

# authRouter
- POST /signup
- POST /login
- POST /logout

# ProfileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

# UserRouter
- GET user/feed   // sends all profiles
- GET user/requests/received
- GET /user/connections


# ConnectionRouter status: ignored, interested, accepted, rejected.

/request/send/:status/:toUserId
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId


- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

