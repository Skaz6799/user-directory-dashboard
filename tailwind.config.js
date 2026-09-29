/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  // to make suretailwing and bootstarp don't conflict with each other, we can use the prefix option to add a prefix to all tailwind classes
  prefix: 'tw-',
  // avoid using tailwind's preflight to prevent it from overriding bootstrap's styles
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        ink: '#17233b',
        muted: '#64748b',
        brand: '#4f46e5',
      },
    },
  },
  plugins: [],
}

