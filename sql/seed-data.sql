INSERT INTO endpoints(endpoint_hash, endpoint_name) VALUES
  ('q0Y06dR8', 'default1'),
  ('Qf8yrY5f', 'default2'),
  ('PTVeEMLQ', 'default3'),
  ('super-gobbler-robust', 'default4'),
  ('hawk-proven-curiously', 'default5'),
  ('painfully-singular-chow', 'default6');

INSERT INTO requests(request_hash, endpoint_id, endpoint_hash, http_method, http_path) VALUES 
  ('AickKFLV0ILYhffE', 1, 'q0Y06dR8', 'GET', '/request1'),
  ('DyqFQDwoUzWDaDbW', 1, 'q0Y06dR8', 'POST', '/request2'),
  ('vQBC6W3g6KDc4JIE', 2, 'Qf8yrY5f', 'GET', '/request3'),
  ('0Ni28ss1ZsoEqZcE', 2, 'Qf8yrY5f', 'POST', '/request4'),
  ('3ttdvdlOZTD6aOxj', 3, 'PTVeEMLQ', 'GET', '/request5'),
  ('Lo6pl0Rsb7IV7iBY', 3, 'PTVeEMLQ', 'POST', '/request6');
