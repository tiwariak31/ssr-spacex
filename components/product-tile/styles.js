import styled from 'styled-components'

export const StyledProductWrapper = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  min-height: 340px;
  background: white;
  border-radius: 6px
  text-align: left;
  margin-bottom: 25px;
  cursor: pointer;
  border-radius: 9px;
  &:hover {
    box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.15);
  }
  .img {
    text-align: center;
    min-height: 240px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      max-width: 100%;
      max-height: 240px;
      border-radius: 6px;
      object-fit: cover;
    }
    svg {
      width: 100%;
      height: 100%;
    }
  }
  .product_text {
    display: flex;
    flex-direction: column;
    color: black
  }
  .title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #63659f;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    margin-top: 16px;
  }
  .details-card {
    width: 18rem;
    padding: 1rem;
    margin-bottom: 15px;
  }

  .mission-image {
    background-color: #f2f2f2;
  }

  .detail-label {
    color: #181818;
    font-size: 16px;
    font-weight: 600;
    ul { margin-bottom: 0px;}
  }

  .detail-value {
    color: #63659f;
    font-weight: 400;
  }
`
