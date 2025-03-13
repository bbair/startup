const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const app = express();

const authCookieName = 'token';

// The users, colors, and positions are saved in memory and disappear whenever the service is restarted.
let users = [];
let colors = [];
let ships = [];

const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(express.json());

app.use(cookieParser());

app.use(express.static('public'));

let apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await findUser('email', req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await createUser(req.body.email, req.body.password);

    setAuthCookie(res, user.token);
    res.send({ email: user.email });
  }
});

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const user = await findUser('email', req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
      setAuthCookie(res, user.token);
      res.send({ email: user.email });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth logout a user
apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    delete user.token;
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// SetOpponent
apiRouter.post('/opponent', verifyAuth, async (req, res) => {
  await setOpponent(req.body.opponent, req.cookies[authCookieName]);
  res.end();
});

// SaveShipPositions
apiRouter.post('/ships', verifyAuth, async (req, res) => {
  await saveShips(req.body.positions, req.cookies[authCookieName]);
  res.end();
});

// GetShipPositions
apiRouter.get('/ships/player', verifyAuth, async (req, res) => {
  const playerShips = await getShips('user', req.cookies[authCookieName]);
  res.send(playerShips);
});

// GetOpponentPositions
apiRouter.get('/ships/opponent', verifyAuth, async (req, res) => {
  const opponent = await findOpponent('user', req.cookies[authCookieName]);
  const opponentShips = await getShips('user', opponent[authCookieName]);
  res.send(opponentShips);
});

// GetColors
apiRouter.get('/colors', verifyAuth, async (req, res) => {
  const colors = await findUserColors('user', req.cookies[authCookieName]);
  res.send(colors);
});

// SaveColors
apiRouter.post('/colors/update', verifyAuth, (req, res) => {
  updateColors(req.body, req.cookies[authCookieName]);
  res.end();
});

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  users.push(user);

  return user;
}

async function findOpponent(field, value) {
  if (!value) return null;

  return users.find((u) => u[field] === value)['opponent'];
}

async function findUser(field, value) {
  if (!value) return null;

  return users.find((u) => u[field] === value);
}

async function findUserColors(field, value) {
  if (!value) return null;

  return colors.find((c) => c[field] === value);
}

async function getShips(field, value) {
  if (!value) return null;

  return ships.find((s) => s[field] === value)['positions'];
}

async function saveShips(newShips, token) {
  ships.push({
    'token': token,
    'positions': newShips
  })
}

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

async function setOpponent(opponent, user) {
  users.find((u) => u[authCookieName] === user)['opponent'] = opponent;
}

function updateColors(newColors, user) {
  colors.push({ colors: newColors, user: user })
}

// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});