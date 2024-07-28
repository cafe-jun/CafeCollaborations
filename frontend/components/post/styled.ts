import styled from "styled-components";

export const PaginationContainer = styled.div`
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    padding: 0;
    margin: 20px 0;
  }

  .page-item {
    margin: 0 2px;
  }

  .page-link {
    padding: 8px 12px;
    border-radius: 50%;
    color: #1a202c;
    text-decoration: none;
    transition: background-color 0.2s, color 0.2s;

    &:hover {
      background-color: #edf2f7;
    }
  }

  .page-item.active .page-link {
    background-color: #ffd700;
    color: #1a202c;
  }

  .first-item,
  .last-item,
  .prev-item,
  .next-item {
    font-weight: bold;
  }
`;
