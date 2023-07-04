# Basic Game

1. Create a new endpoint that returns an empty board `GET /game`.

For now, we will use a 2d array to represent the board.

```json
[
  ["", "", ""],
  ["", "", ""],
  ["", "", ""]
]
```

2. Create a new endpoint that allow a user to tick a box `POST /game/move`.

The request body should contain the coordinates of the box to tick.

For example, to tick the top left box, the request body should be:

```json
{
  "x": 0,
  "y": 0
}
```

Don't forget to add the `json` middleware to express:

```javascript
app.use(express.json());
```

_Note:_ for the following steps, you can use the `./make-a-game.sh` script to
run a whole game.

3. Handle the following cases:

- The box is already ticked
- The coordinates are invalid

4. Alternate between X and O

5. Add a function to check if there is a winner

6. Add a delete route to reset the game `DELETE /game`.
