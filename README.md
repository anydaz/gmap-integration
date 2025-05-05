## How to run

1. rename env.example to .env
2. fill the env variable from supabase
3. set NEXT_PUBLIC_BASE_URL="http://localhost:3000"
4. install the required package using `npm install`
5. run migration with npx prisma migrate dev
6. run npx prisma generate
7. Run the development server using `npm run dev`
