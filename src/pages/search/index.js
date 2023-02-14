import * as React from 'react'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material'

import logo from '../../assets/logo.png'
import bg from '../../assets/bg.jpg'
import { Link } from 'react-router-dom'

function valuetext(value) {
  return `${value}`
}

const Search = () => {
  const [value, setValue] = React.useState([1930, 2023])
  const [collections, setCollections] = React.useState([])
  const [searchQuery, setSearchQuery] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const handleSearch = () => {
    if (searchQuery) {
      setLoading(true)
      fetch(
        `https://images-api.nasa.gov/search?q=${searchQuery}&year_start=${value[0]}&year_end=${value[1]}&media_type=image`
      )
        .then((response) => response.json())
        .then((data) => {
          setCollections(data.collection.items)
          setLoading(false)
        })
        .catch((error) => {
          console.log(error.message)
          setLoading(false)
        })
    } else {
      alert('Please enter search phrase')
    }
  }

  console.log(collections)

  return (
    <div style={{ minHeight: '100vh', background: '#242c2c' }}>
      <div style={{ background: `url(${bg})` }}>
        <Container maxWidth="md" sx={{ paddingY: '40px' }}>
          <Grid
            flexDirection="row"
            maxWidth="md"
            container
            spacing={3}
            justifyContent="center"
            alignItems="center"
            sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}
          >
            <Grid item>
              <Typography variant="h5" sx={{ color: '#fff' }}>
                NASA Images Library
              </Typography>
            </Grid>
            <Grid item>
              <img src={logo} alt="NASA Logo" width="100px" />
            </Grid>
          </Grid>
          <Box display="flex" flexDirection="row" alignItems="center">
            <Grid item flex="1" sx={{ paddingRight: '8px' }}>
              <TextField
                placeholder="Search For ... (eg: Pluto)"
                name="name"
                variant="outlined"
                fullWidth
                required
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch()
                  }
                }}
                inputProps={{
                  style: {
                    color: '#050543',
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                  },
                }}
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                sx={{ backgroundColor: loading ? '#d3d3d3' : '#0b3d91' }}
                onClick={() => handleSearch()}
              >
                Search
              </Button>
            </Grid>
          </Box>
          <Box sx={{ width: 400, paddingTop: '20px' }}>
            <Typography
              variant="h5"
              sx={{ color: '#fff', paddingBottom: '32px' }}
            >
              Filter By Year of Photograph Capture Range
            </Typography>
            <Slider
              getAriaLabel={() => 'Years Range'}
              min={1900}
              max={2023}
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              sx={{ color: '#fff' }}
            />
          </Box>
        </Container>
      </div>
      <Container sx={{ paddingY: '20px' }}>
        {collections.length > 0 ? (
          <React.Fragment>
            <Typography variant="h6" align="center" sx={{ color: '#fff' }}>
              Results of the Image Search
            </Typography>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {loading ? (
              <Typography variant="h6" align="center" sx={{ color: '#fff' }}>
                Loading Images ...
              </Typography>
            ) : (
              <Typography variant="h6" align="center" sx={{ color: '#fff' }}>
                Search for any space images
              </Typography>
            )}
          </React.Fragment>
        )}
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          spacing={3}
          sx={{ paddingY: '24px' }}
        >
          {collections.length > 0 ? (
            <React.Fragment>
              {collections.map((collection) => (
                <Grid
                  item
                  lg={3}
                  md={3}
                  sm={4}
                  xs={6}
                  key={collection.data[0].nasa_id}
                >
                  <Link
                    to={`/search/${collection.data[0].nasa_id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <Card sx={{ height: '460px', borderRadius: '4px' }}>
                      <CardMedia
                        sx={{ borderRadius: '4px' }}
                        component="img"
                        image={`${collection.links[0].href}?w=248&fit=crop&auto=format`}
                        alt={collection.data[0].title}
                        loading="lazy"
                        height="250px"
                      />
                      <CardContent>
                        <Typography align="center" variant="body1">
                          Title: {collection.data[0].title}
                        </Typography>
                        {collection.data[0].secondary_creator ? (
                          <Typography
                            align="center"
                            variant="subtitle2"
                            sx={{ paddingTop: '2px' }}
                          >
                            Photographer: {collection.data[0].secondary_creator}
                          </Typography>
                        ) : (
                          <Typography
                            align="center"
                            variant="subtitle2"
                            sx={{ paddingTop: '2px' }}
                          >
                            Photographer: N/A
                          </Typography>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                </Grid>
              ))}
            </React.Fragment>
          ) : null}
        </Grid>
      </Container>
    </div>
  )
}
export default Search
