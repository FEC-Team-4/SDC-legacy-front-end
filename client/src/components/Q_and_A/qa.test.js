import app from '../../../../server/index.js';
import QandA from './Q_AND_A.jsx';
import App from '../App.jsx';
import QuestSearch from './QuestSearch.jsx';

const server = setupServer(
  rest.get('/api/QA', (req, res, ctx) => {
    return res(ctx.json({greeting: 'hello there'}));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());

test('adds 1 + 2', () => {
  expect(1 + 2).toBe(3);
});

test('testing the test suite ', () => {
  render(<App />);

  expect(screen.getByText('hello')).toBeInTheDocument();
})

test('search bar tests ', async () =>  {
  await render(<App />);
  const input = screen.getByPlaceholderText('Have a question? Search for answers...');

  expect(input).toBeInTheDocument();
  fireEvent.change(input, { target: { value: 'where' } });
  expect(input).toHaveValue('where');
})