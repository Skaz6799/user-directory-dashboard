# User Directory Dashboard

A responsive directory built with Next.js and React. It fetches users from the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/users), lets you search by name or email, and opens a Bootstrap modal with each person's contact and address details.

## Features

- Displays each user's name, email, company, and city.
- Search the directory as you type filtered using name and email.
- Shows full profile details, including address, phone, and website.
- Includes loading and error states for the user request.

## Run Locally

Requires Node.js and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To run a production build locally:

```bash
npm run build
npm start
```

## Styling

Bootstrap provides the responsive layout grid and the profile modal. Tailwind utility classes handle component-level styling such as spacing, typography, colors, and hover states; this keeps layout and detail styling responsibilities distinct.

Tailwing and bootstarp are seperated via tailwing.config.js file where  we use prefix: 'tw-',  so for they don't overlap as classes that starts with tw- are tailwing and that do not tsrat with prefix: 'tw-', are of bootstrap

## Tech Stack

- Next.js 16 and React 19
- Bootstrap 5
- Tailwind CSS 3
