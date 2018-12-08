import React from 'react';
import { Container, Form, FormGroup, Label, Input, Button} from 'reactstrap';

const Search = (props) => {
  return (
    <Container fluid>
      <Form onSubmit={props.loadWeather} inline>
        <FormGroup>
          <Label for="city" hidden>City</Label>
          <Input style={{ background: 'transparent', borderColor: 'white'}} type="text" name="city" placeholder="City..." />
        </FormGroup>
        <FormGroup>
          <Label for="country" hidden>Country</Label>
          <Input style={{ background: 'transparent', borderColor: 'white'}} type="text" name="country" placeholder="Country..." />
        </FormGroup>
        <Button  style={{borderColor: 'white'}} color="info">Get Weather</Button>
      </Form>
    </Container>
  )
}
export default Search;