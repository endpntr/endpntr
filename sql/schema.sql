CREATE TABLE Endpoints (
  endpoint_id serial PRIMARY KEY,
  endpoint_hash VARCHAR(8) NOT NULL,
  created_at timestamp DEFAULT NOW()
);

CREATE TABLE Requests (
  request_id serial PRIMARY KEY,
  request_hash VARCHAR(16) NOT NULL,
  endpoint_id integer REFERENCES Endpoints(endpoint_id) ON DELETE CASCADE,
  document_id integer,
  http_method VARCHAR(10) NOT NULL,
  http_path TEXT NOT NULL,
  received_at timestamp DEFAULT NOW()
);
