import { AudiobookItem } from './AudiobookItem';
import { AUDIOBOOKS } from '@/data/audiobooks';

function Pagination() {
  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
      }}
      aria-label="Pagination"
    >
      {/* Previous button */}
      <a
        href="#"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '32px',
          height: '32px',
          fontSize: '16px',
          color: 'rgb(14, 91, 155)',
          cursor: 'pointer',
          textDecoration: 'none',
        }}
        aria-label="Previous page"
      >
        ‹
      </a>

      {/* Page 1 — current, not a link */}
      <span
        style={{
          fontSize: '14px',
          fontWeight: 700,
          color: 'rgb(1, 14, 25)',
          padding: '4px 8px',
        }}
        aria-current="page"
      >
        1
      </span>

      {/* Page 2 */}
      <a
        href="#"
        style={{
          fontSize: '14px',
          color: 'rgb(14, 91, 155)',
          textDecoration: 'none',
          padding: '4px 8px',
        }}
        className="hover:underline"
      >
        2
      </a>

      {/* Ellipsis */}
      <span
        style={{
          fontSize: '14px',
          color: 'rgb(1, 14, 25)',
          padding: '4px 4px',
        }}
      >
        …
      </span>

      {/* Page 25 */}
      <a
        href="#"
        style={{
          fontSize: '14px',
          color: 'rgb(14, 91, 155)',
          textDecoration: 'none',
          padding: '4px 8px',
        }}
        className="hover:underline"
      >
        25
      </a>

      {/* Next button */}
      <a
        href="#"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '32px',
          height: '32px',
          fontSize: '16px',
          color: 'rgb(14, 91, 155)',
          cursor: 'pointer',
          textDecoration: 'none',
        }}
        aria-label="Next page"
      >
        ›
      </a>
    </nav>
  );
}

function SortBarTop() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '58px',
        borderBottom: '1px solid rgba(1, 14, 25, 0.15)',
        paddingTop: '4px',
        paddingBottom: '4px',
      }}
    >
      {/* Left: result count */}
      <span
        style={{
          fontSize: '14px',
          color: 'rgb(90, 100, 110)',
        }}
      >
        1 - 20 of 500 results
      </span>

      {/* Right: pagination */}
      <Pagination />
    </div>
  );
}

function SortBarBottom() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '58px',
        paddingTop: '4px',
        paddingBottom: '4px',
      }}
    >
      {/* Left: items per page selector */}
      <span
        style={{
          fontSize: '14px',
          color: 'rgb(1, 14, 25)',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <span>Show </span>
        <select
          defaultValue="20"
          style={{
            border: '1px solid rgb(209, 214, 215)',
            borderRadius: '4px',
            padding: '2px 8px',
            fontSize: '14px',
            marginLeft: '4px',
            marginRight: '4px',
          }}
        >
          <option value="20">20</option>
          <option value="30">30</option>
        </select>
        <span> items per page</span>
      </span>

      {/* Right: pagination */}
      <Pagination />
    </div>
  );
}

export function ProductList() {
  return (
    <section
      style={{
        maxWidth: '1000px',
        margin: '0 auto',
        paddingLeft: '20px',
        paddingRight: '20px',
      }}
    >
      <SortBarTop />

      <ol
        className="product-list"
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
        }}
      >
        {AUDIOBOOKS.map((book) => (
          <AudiobookItem key={book.id} {...book} />
        ))}
      </ol>

      <SortBarBottom />
    </section>
  );
}
