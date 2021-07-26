import { Form } from 'react-bootstrap'

// This UI component generates JSX(HTML) select
// element consisting of numbers in the range of 
// 1 through given size. When an option is selcted
// the value is sent to the given change function
const SelectListFromNumber = ({value, size, change}) => {
  return (
  <Form.Control as="select"
                defaultValue={value}
                onChange={(e) => {
                  change(Number(e.target.value))
                }}>
                {[...Array(size).keys()].map(x => (
                  <option key={x+1}
                          value={x+1}>{x+1}</option>
                ))}
  </Form.Control>
  )
} 

export default SelectListFromNumber