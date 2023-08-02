import { useContext } from 'react'
import { ThemeContext } from './App'
function Paragraph() {
    const theme = useContext(ThemeContext)
    
    console.log('Paragraph: ', theme)
    return (
        <p className = {theme}> 
            Content of the paragraph
        </p>
    )
}
export default Paragraph