import Head from 'next/head'
import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Card, Button, Row, Col } from 'react-bootstrap'
import ProductTile from '../components/product-tile'
import { withRouter } from 'next/router'
// import queryString from 'query-string'

const API_BASE_URL = 'https://api.spacexdata.com/v3/launches?limit=100'

export default function Home ({ data }) {
  const [data1, setData] = useState(data)
  const [isLoaded, setIsLoaded] = useState(false)
  const [filters, setFilters] = useState({
    limit: 150,
    launch_year: undefined,
    launch_success: undefined,
    land_success: undefined
  })
  const uniqueLaunchYears = new Array(16)
    .fill(0)
    .map((_, index) => 2006 + index)

  const getUpdatedApiUrl = (filters = {}) => {
    return API_BASE_URL + querystring.stringify({ ...filters })
  }

  const fetchAPI = filters => {
    const URL = getUpdatedApiUrl(filters)
    setFilters(filters)
    setIsLoaded(true)
    fetch(URL)
      .then(response => response.json())
      .then(data => {
        setData(data)
        setIsLoaded(false)
      })
  }
  const updateApiFilters = (type, value) => {
    debugger
    if (filters[type] === value) {
      value = undefined
    }

    const appliedFilters = {
      ...appliedFilters,
      [type]: value
    }

    fetchAPI(appliedFilters)
  }
  return (
    <div>
      <Head>
        <title>SSR SPACEX App</title>
      </Head>
      {isLoaded ? (
        <div className='loader-container'>
          <div className='loader-box'>
            <img src='/loadRocket.gif' alt='loading...' />
          </div>
        </div>
      ) : (
        <div className='App'>
          <h1 className='header'>SpaceX Launch Programs</h1>
          <Container fluid>
            <Row>
              <Col xs={12} sm={12} md={6} lg={3}>
                <Card className='filter-card'>
                  <Card.Body>
                    <Card.Title className='filter-header'>Filters</Card.Title>
                    <Card.Text className='filter-heading-launch-year'>
                      Launch Year
                    </Card.Text>
                    <hr className='filters-hr' />
                    <Row>
                      <div className='filter-button-container'>
                        {uniqueLaunchYears.map(year => {
                          return (
                            <Button
                              key={year}
                              className='filter-button'
                              variant={
                                filters.launch_year === year.toString()
                                  ? 'success'
                                  : 'outline-success'
                              }
                              value={year}
                              onClick={e =>
                                updateApiFilters('launch_year', e.target.value)
                              }
                            >
                              {year}
                            </Button>
                          )
                        })}
                      </div>
                    </Row>

                    <Card.Text className='filter-heading'>
                      Successful Launch
                    </Card.Text>
                    <hr className='filters-hr' />

                    <div className='filter-button-container'>
                      <Button
                        className='filter-button'
                        variant={
                          filters.launch_success === 'true'
                            ? 'success'
                            : 'outline-success'
                        }
                        onClick={e =>
                          updateApiFilters('launch_success', e.target.value)
                        }
                        value='true'
                      >
                        True
                      </Button>

                      <Button
                        className='filter-button'
                        variant={
                          filters.launch_success === 'false'
                            ? 'success'
                            : 'outline-success'
                        }
                        onClick={e =>
                          updateApiFilters('launch_success', e.target.value)
                        }
                        value='false'
                      >
                        False
                      </Button>
                    </div>

                    <Card.Text className='filter-heading'>
                      Successful Landing
                    </Card.Text>
                    <hr className='filters-hr' />
                    <div className='filter-button-container'>
                      <Button
                        className='filter-button'
                        variant={
                          filters.land_success === 'true'
                            ? 'success'
                            : 'outline-success'
                        }
                        onClick={e =>
                          updateApiFilters('land_success', e.target.value)
                        }
                        value='true'
                      >
                        True
                      </Button>

                      <Button
                        className='filter-button'
                        variant={
                          filters.land_success === 'false'
                            ? 'success'
                            : 'outline-success'
                        }
                        onClick={e =>
                          updateApiFilters('land_success', e.target.value)
                        }
                        value='false'
                      >
                        False
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col xs={12} sm={12} md={6} lg={9}>
                <Row>
                  {data.map(details => {
                    return (
                      <Col
                        xsm={12}
                        sm={12}
                        md={6}
                        xl={3}
                        key={details.mission_name}
                      >
                        <ProductTile details={details}></ProductTile>
                      </Col>
                    )
                  })}
                </Row>
              </Col>
            </Row>
            <div>
              <h5 className='Developers-name'>
                Developed by : Ashutosh Kumar Tiwari
              </h5>
            </div>
          </Container>
        </div>
      )}
    </div>
  )
}

Home.getInitialProps = async ctx => {
  const res = await fetch(API_BASE_URL)
  const json = await res.json()
  console.log('json', json)
  return { data: json }
}
