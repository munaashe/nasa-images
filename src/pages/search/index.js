import * as React from 'react'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import { Container } from '@mui/material'

function valuetext(value) {
    return `${value}°C`
}

const Search = () => {
    const [value, setValue] = React.useState([1930, 2023])

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    return (
        <Container maxWidth="md">
            <Box sx={{ width: 400 }}>
                <Slider
                    getAriaLabel={() => 'Temperature range'}
                    min={1900}
                    max={2023}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                />
            </Box>
        </Container>
    )
}
export default Search
