import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Container, ButtonAction, ButtonPage } from './styles';

export default function Pagination({
  currentPage,
  totalRecords,
  pageLimit,
  pageNeighbours,
  onPageChanged,
}) {
  // const [currentPage, setCurrentPage] = useState(1);

  const LEFT_PAGE = 'LEFT';
  const RIGHT_PAGE = 'RIGHT';
  const totalPages = Math.ceil(totalRecords / pageLimit);

  function gotoPage(page) {
    const _page = Math.max(0, Math.min(page, totalPages));

    const paginationData = {
      currentPage: _page,
      totalPages,
      pageLimit,
      totalRecords,
    };

    onPageChanged(paginationData); // Retorna objeto para o componente

    // setCurrentPage(_page === 0 ? 1 : _page);
  }

  useEffect(() => {
    gotoPage(1);
    // eslint-disable-next-line
  }, []);

  function range(from, to, step = 1) {
    let i = from;
    const r = [];

    while (i <= to) {
      r.push(i);
      i += step;
    }

    return r;
  }

  function handleClick(page, evt) {
    evt.preventDefault();
    gotoPage(page);
  }

  function handleMoveLeft(evt) {
    evt.preventDefault();
    gotoPage(currentPage - pageNeighbours * 2 - 1);
  }

  function handleMoveRight(evt) {
    evt.preventDefault();
    gotoPage(currentPage + pageNeighbours * 2 + 1);
  }

  function fetchPageNumbers() {
    const totalNumbers = pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      let pages = [];

      const leftBound = currentPage - pageNeighbours;
      const rightBound = currentPage + pageNeighbours;
      const beforeLastPage = totalPages - 1;

      const startPage = leftBound > 2 ? leftBound : 2;
      const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;

      pages = range(startPage, endPage);

      const pagesCount = pages.length;
      const singleSpillOffset = totalNumbers - pagesCount - 1;

      const leftSpill = startPage > 2;
      const rightSpill = endPage < beforeLastPage;

      const leftSpillPage = LEFT_PAGE;
      const rightSpillPage = RIGHT_PAGE;

      if (leftSpill && !rightSpill) {
        const extraPages = range(startPage - singleSpillOffset, startPage - 1);
        pages = [leftSpillPage, ...extraPages, ...pages];
      } else if (!leftSpill && rightSpill) {
        const extraPages = range(endPage + 1, endPage + singleSpillOffset);
        pages = [...pages, ...extraPages, rightSpillPage];
      } else if (leftSpill && rightSpill) {
        pages = [leftSpillPage, ...pages, rightSpillPage];
      }

      return [1, ...pages, totalPages];
    }

    return range(1, totalPages);
  }

  if (!totalRecords) return null;

  if (totalPages === 1) return null;

  const pages = fetchPageNumbers();

  return (
    <>
      <nav>
        <Container>
          {pages.map((page, index) => {
            if (page === LEFT_PAGE)
              return (
                <li key={index.toString()}>
                  <ButtonAction type="button" onClick={handleMoveLeft}>
                    <span>&laquo;</span>
                    <span>Anterior</span>
                  </ButtonAction>
                </li>
              );

            if (page === RIGHT_PAGE)
              return (
                <li key={index.toString()}>
                  <ButtonAction type="button" onClick={handleMoveRight}>
                    <span>&raquo;</span>
                    <span>Proximo</span>
                  </ButtonAction>
                </li>
              );

            return (
              <li key={index.toString()}>
                <ButtonPage
                  type="button"
                  active={page === currentPage}
                  onClick={e => handleClick(page, e)}
                >
                  {page}
                </ButtonPage>
              </li>
            );
          })}
        </Container>
      </nav>
    </>
  );
}

Pagination.defaultProps = {
  pageLimit: 20,
  pageNeighbours: 2,
  currentPage: 1,
};

Pagination.propTypes = {
  currentPage: PropTypes.number,
  totalRecords: PropTypes.number.isRequired,
  pageLimit: PropTypes.number,
  pageNeighbours: PropTypes.number,
  onPageChanged: PropTypes.func.isRequired,
};
