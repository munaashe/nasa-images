import { Container, Grid } from '@mui/material'
import * as React from 'react'
import { useParams } from 'react-router-dom'

const Details = () => {
  const [collection, setCollection] = React.useState()
  const [isLoading, setIsLoading] = React.useState(false)
  const { nasaId } = useParams()

  React.useEffect(() => {
    if (nasaId) {
      setIsLoading(true)
      fetch(`https://images-api.nasa.gov/search?nasa_id=${nasaId}`)
        .then((res) => res.json())
        .then((data) => setCollection(data.collection.items))
      setIsLoading(false)
    }
  }, [nasaId])

  console.log(collection.href[0])
  return (
    <Container maxWidth="md">
      <Grid
        container
        spacing={3}
        sx={{ paddingY: '24px' }}
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="top"
      >
        <Grid item lg={6} md={6} sm={12}>
          mupikicha
        </Grid>
        <Grid item lg={6} md={6} sm={12}>
          description
        </Grid>
      </Grid>
    </Container>
  )
}

export default Details
