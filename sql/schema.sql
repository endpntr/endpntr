CREATE TABLE endpoints (
  endpoint_id serial PRIMARY KEY,
  endpoint_hash varchar(8) NOT NULL,
  endpoint_name text NOT NULL,
  created_at timestamp DEFAULT NOW()
);

CREATE TABLE requests (
  request_id serial PRIMARY KEY,
  request_hash varchar(16) NOT NULL,
  endpoint_id integer REFERENCES Endpoints(endpoint_id) ON DELETE CASCADE,
  document_id integer,
  http_method varchar(10) NOT NULL,
  http_path text NOT NULL,
  received_at timestamp DEFAULT NOW()
);
