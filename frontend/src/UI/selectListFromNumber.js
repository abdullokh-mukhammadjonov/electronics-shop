import { Form } from 'react-bootstrap'

const SelectListFromNumber = ({value, size, change}) => {
  return (
  <Form.Control as="select"
                defaultValue={value}
                onChange={(e) => {
                  // console.log(e.target.value)
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