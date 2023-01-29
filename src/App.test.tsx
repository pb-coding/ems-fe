import React from 'react'
import { render } from '@testing-library/react'
import App from './Dashboard'

it("renders 'VITE + Tailwind = awesome'", () => {
    const { getByText } = render(<App />)
    const linkElement = getByText("VITE + Tailwind = awesome")
    expect(linkElement).toBeInTheDocument
})