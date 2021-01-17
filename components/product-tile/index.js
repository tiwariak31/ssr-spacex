import React from 'react'
import { StyledProductWrapper } from './styles'
import NoImage from '../svg/no-visual'

function ProductTile ({ details }) {
  const {
    flight_number,
    mission_name,
    mission_id,
    launch_year,
    launch_success,
    links,
    rocket
  } = details
  const imageurl = links.mission_patch_small
  const land_success = rocket.first_stage.cores[0].land_success
  return (
    <StyledProductWrapper tabIndex='0'>
      {!imageurl ? (
        <NoImage />
      ) : (
        <img src={imageurl} alt='no-mission' className='mission-image' />
      )}
      <div className='product_text'>
        <span className='title'>
          {mission_name} #{flight_number}
        </span>
        <span className='detail-label' data-testid={`product-mission_id`}>
          Mission Ids:
          <ul>
            <li className='detail-value'>{mission_id ? mission_id : 'NA'}</li>
          </ul>
        </span>
        <span className='detail-label'>
          Launch Year: <span className='detail-value'>{launch_year}</span>
        </span>
        <span className='detail-label'>
          Successful Launch:{' '}
          <span className='detail-value'>
            {launch_success ? 'true' : 'false'}
          </span>
        </span>
        <span className='detail-label'>
          Successful Landing:{' '}
          <span className='detail-value'>
            {land_success ? 'true' : 'false'}
          </span>
        </span>
      </div>
    </StyledProductWrapper>
  )
}

export default ProductTile
