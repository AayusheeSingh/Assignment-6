// pages/search.js
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { addToHistory } from "@/lib/userData"; 

function AdvancedSearch() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const submitForm = async (data) => { 
    let queryString ="";

    queryString += "q=";

    if (data.q) {
      queryString += `${data.q}&`;
    }

    queryString += "searchBy=";

    if (data.searchBy) {
      queryString += `${data.searchBy}&`;
    }

    queryString += "geoLocation=";

    if (data.geoLocation) {
      queryString += `${data.geoLocation}&`;
    }

    queryString += "medium=";

    if (data.medium) {
      queryString += `${data.medium}&`;
    }

    if (data.isOnView) {
      queryString += `isOnView=true&`;
    }

    if (data.isHighlight) {
      queryString += `isHighlight=true&`;
    }
    setSearchHistory(await addToHistory(queryString)); 
    router.push(`/artwork?${queryString}`);

    
  }

  return (
    <Form onSubmit={handleSubmit(submitForm)}>
      <Form.Group className="mb-3" controlId="q">
        <Form.Label>Search Query</Form.Label>
        <Form.Control type="text" placeholder="Search Query" {...register("q", { required: true })} className={errors.q && "is-invalid"} />
        {errors.q && <div className="invalid-feedback">This field is required</div>}
      </Form.Group>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="searchBy">
            <Form.Label>Search By</Form.Label>
            <Form.Select {...register("searchBy")}>
              <option value="title">Title</option>
              <option value="tags">Tags</option>
              <option value="artistCulture">Artist or Culture</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="geoLocation">
            <Form.Label>Geo Location</Form.Label>
            <Form.Control type="text" placeholder="Geo Location (e.g., Europe|France|Paris|New york|China)" {...register("geoLocation")} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="medium">
            <Form.Label>Medium</Form.Label>
            <Form.Control type="text" placeholder="Medium (e.g., Ceramics|Furniture|Paintings|Sculpture|Textiles)" {...register("medium")} />
          </Form.Group>
        </Col>
      </Row>
      <Form.Group className="mb-3" controlId="isOnView">
        <Form.Check type="checkbox" label="Currently on view" {...register("isOnView")} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="isHighlight">
        <Form.Check type="checkbox" label="Highlighted" {...register("isHighlight")} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default AdvancedSearch;
