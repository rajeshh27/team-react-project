import { NavLink } from 'react-router-dom'

function Sidebar() {
  const sports = [
    { name: 'Running' },
    { name: 'Football' },
    { name: 'Basketball' },
    { name: 'Cricket' },
    { name: 'Soccer' },
    { name: 'Training' },
  ]

  const categories = [
    { name: 'Shoes' },
    { name: 'Equipment' },
    { name: 'Apparel' },
    { name: 'Accessories' },
  ]

  return (
    <aside className="sidebar">
      <div className="filter-group">
        <h3>Filter by Sport</h3>
        <ul className="filter-list">
          {sports.map((s) => (
            <li key={s.name}>
              <NavLink to={`/products?sport=${s.name}`} className={({ isActive }) => isActive ? 'active' : ''}>
                {s.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="filter-group">
        <h3>Product Category</h3>
        <ul className="filter-list">
          {categories.map((c) => (
            <li key={c.name}>
              <NavLink to={`/products?category=${c.name}`} className={({ isActive }) => isActive ? 'active' : ''}>
                {c.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="filter-group">
        <h3>Price Range</h3>
        <div className="price-inputs">
          <input type="number" placeholder="Min" className="price-input" />
          <span>-</span>
          <input type="number" placeholder="Max" className="price-input" />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .sidebar {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          padding: 1.5rem;
          background: #fff;
          border-radius: 1.5rem;
          border: 1px solid #e2e8f0;
          height: fit-content;
        }
        .filter-group h3 {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #64748b;
          margin-bottom: 1rem;
        }
        .filter-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .filter-list a {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.6rem 1rem;
          border-radius: 0.75rem;
          color: #334155;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.2s;
        }
        .filter-list a:hover {
          background: #f1f5f9;
          color: #3b82f6;
        }
        .filter-list a.active {
          background: #eff6ff;
          color: #3b82f6;
          font-weight: 700;
        }
        .filter-list .icon {
          font-size: 1.1rem;
        }
        .price-inputs {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .price-input {
          width: 100%;
          padding: 0.5rem;
          border-radius: 0.5rem;
          border: 1px solid #cbd5e1;
          font-size: 0.9rem;
        }
      `}} />
    </aside>
  )
}

export default Sidebar

