export const metadata = {
  title: '15-Min Full Body Workout Trainer',
  description: 'Simple full body workout with 5kg dumbbells for muscle growth and strength',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
