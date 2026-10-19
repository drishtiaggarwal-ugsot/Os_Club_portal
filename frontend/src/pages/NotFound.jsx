import { Link } from 'react-router-dom'
import { usePageTitle } from '../utils/usePageTitle.js'

export default function NotFound() {
  usePageTitle('Page not found')
  return (
    <section className="page page--narrow">
      <h1>Page not found</h1>
      <p>The page you're looking for doesn't exist or was moved.</p>
      <Link to="/" className="button">Go to sessions</Link>
    </section>
  )
}
