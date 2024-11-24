# Final assignment v2.2

## Start project

Copy .env.example to .env and update values  
docker-compose up -d  
npm install  
npx drizzle-kit push  
npm run seed  
npm run dev  

## Big picture plan<img width="1062" alt="Screenshot 2024-11-24 at 20 46 23" src="https://github.com/user-attachments/assets/959502cf-ff10-48d8-99a1-15ebd836e05b">


It took me some time grasp the assignment, so even when I had my big picture plan in place, I wasn't entirely sure the program would end up looking the way I envisioned it once it was finished. One thing I did stick to was the idea of having the different representatives as circles that users can vote on and the election page also looks and behaves quite similarly to the big picture plan. I ran into some issues with getting the database schema right, so I spent a lot of time on that, even though I started with the mockup—maybe I jumped into that a bit too early. I didn’t manage to fully implement the feature where every public voter can cast a choice. Right now, they can only select a representative, who can then choose one of the options. It might not be super clear but at /representative you choose who to vote for. 

## Project Board
https://github.com/users/berglund10/projects/4
