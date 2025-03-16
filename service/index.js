const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const app = express();

const authCookieName = 'token';

// The users and colors are saved in memory and disappear whenever the service is restarted.
let users = [];
let colors = [];

const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(express.json());

app.use(cookieParser());

app.use(express.static('public'));

let apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

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
    opponent: null,
  };
  users.push(user);

  // set colors to default
  colors.push({
    'user': user.token,
    'colors': {
      'gridColor': '#008000',
      'hitColor': '#FF0000',
    }
  })

  return user;
}

async function findUser(field, value) {
  if (!value) return null;

  return users.find((u) => u[field] === value);
}

async function findUserColors(field, value) {
  if (!value || !colors) return null;

  return colors.find((c) => c[field] === value).colors;
}

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

function updateColors(newColors, user) {
  colors.find((c) => c['user'] === user).colors = newColors;
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});