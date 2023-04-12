import React from "react";
import { Button, ListGroup } from "react-bootstrap";
import { useStateContext } from "context/StateContext";

function People() {
  const {
    actions: { handleLoadMore },
    state: { selectedPlanet, people, peopleLoading, getTotalPage, currentPage },
  } = useStateContext();

  return (
    <div className="mt-3">
      <ListGroup>
        {people.map((person = {}) => (
          <ListGroup.Item key={person.name}>{person.name}</ListGroup.Item>
        ))}
      </ListGroup>
      {peopleLoading ? (
        <span>Loading...</span>
      ) : (
        people.length > 0 &&
        getTotalPage > currentPage && (
          <div className="mt-3">
            <Button variant="primary" onClick={handleLoadMore}>
              Load more
            </Button>
          </div>
        )
      )}

      {people.length === 0 && selectedPlanet && !peopleLoading && (
        <p>No Result Found!</p>
      )}
    </div>
  );
}

export default People;
