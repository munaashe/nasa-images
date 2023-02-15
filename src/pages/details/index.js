import { Container, Grid, Box, Typography, Button } from '@mui/material'
import * as React from 'react'
import { Link, useParams } from 'react-router-dom'

const Details = () => {
  const [collection, setCollection] = React.useState()
  const [images, setImages] = React.useState([])
  const { nasaId } = useParams()

  React.useEffect(() => {
    if (nasaId) {
      fetch(`https://images-api.nasa.gov/search?nasa_id=${nasaId}`)
        .then((res) => res.json())
        .then((data) => setCollection(data.collection.items))
    }
  }, [nasaId])

  React.useEffect(() => {
    if (nasaId) {
      fetch(`https://images-api.nasa.gov/asset/${nasaId}`)
        .then((res) => res.json())
        .then((data) => setImages(data.collection.items))
    }
  }, [nasaId])

  return collection ? (
    <Container maxWidth="lg">
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        sx={{ paddingY: '24px' }}
      >
        <Grid item flex="1" sx={{ paddingRight: '8px' }}>
          <Typography align="center" variant="h3" sx={{ fontWeight: 'bold' }}>
            {collection[0].data[0].title}
          </Typography>
        </Grid>
        <Grid item>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button variant="contained" sx={{ borderRadius: '8px' }}>
              Back to Search
            </Button>
          </Link>
        </Grid>
      </Box>
      <Grid
        container
        spacing={3}
        sx={{ paddingY: '24px' }}
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item lg={6} md={6} sm={12}>
          <img
            src={images[0]?.href}
            alt={collection[0].data[0].title}
            style={{ maxWidth: '100%' }}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={12}>
          <Typography
            align="center"
            variant="h5"
            sx={{ fontWeight: 'bold', paddingY: '20px' }}
          >
            Collection Details
          </Typography>
          <Typography align="center" variant="h6" sx={{ fontWeight: 'bold' }}>
            Title: {collection[0].data[0].title}
          </Typography>
          <Typography align="center" variant="h6">
            Photographer: {collection[0].data[0].center}
          </Typography>

          <Typography
            align="center"
            variant="subtitle2"
            sx={{ fontStyle: 'italic' }}
          >
            {new Date(collection[0].data[0].date_created).toDateString()}
          </Typography>
          <br />
          <Typography
            align="center"
            variant="body1"
            sx={{ paddingBottom: '40px' }}
          >
            Description: {collection[0].data[0].description}
          </Typography>
          <Typography
            align="left"
            variant="h6"
            sx={{ fontWeight: 'bold', paddingLeft: '20px' }}
          >
            Keywords:
          </Typography>
          {collection[0].data[0].keywords.map((keyword) => (
            <Typography
              align="left"
              variant="body1"
              sx={{ paddingLeft: '20px' }}
            >
              {keyword}
            </Typography>
          ))}
        </Grid>
      </Grid>
    </Container>
  ) : (
    <Typography align="center" variant="h3" sx={{ fontWeight: 'bold' }}>
      Loading ...
    </Typography>
  )
}

export default Details
